import fs from "node:fs";
import path from "node:path";
import type { Browser, BrowserContext, Page } from "playwright";
import type { CaptureResult } from "./types";
import { getProxyDispatcher, hasProxy } from "./proxyFetch";

// Chrome's own background chatter that we never want to fetch through the proxy.
const BLOCK =
  /(clients2?\.google\.com|accounts\.google\.com|www\.google\.com\/(async|gen_204)|optimizationguide|safebrowsing|update\.googleapis|gstatic\.com\/generate_204|google\.com\/gen_204)/i;

// Resolve the system-installed Chromium shipped in this environment instead of
// downloading one. Globs for chromium-<build>/chrome-linux/chrome so a Playwright
// version bump still resolves.
function resolveChromium(): string | undefined {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    const entries = fs
      .readdirSync(base)
      .filter((d) => d.startsWith("chromium-"))
      .sort();
    for (const dir of entries) {
      const candidate = path.join(base, dir, "chrome-linux", "chrome");
      if (fs.existsSync(candidate)) return candidate;
    }
  } catch {
    /* let Playwright try its own resolution */
  }
  return undefined;
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

async function launchBrowser(): Promise<Browser> {
  const { chromium } = await import("playwright");
  return chromium.launch({
    headless: true,
    executablePath: resolveChromium(),
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-sync",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-features=DnsOverHttps,OptimizationHints,Translate,MediaRouter",
    ],
  });
}

// Build a context whose requests are all fetched in Node (proxied + CA-trusted),
// so Chromium never needs network of its own. No-op path when there's no proxy.
async function newInterceptedContext(browser: Browser): Promise<BrowserContext> {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 Reface/0.2",
  });

  if (hasProxy()) {
    const dispatcher = getProxyDispatcher();
    await context.route("**/*", async (route) => {
      const req = route.request();
      const url = req.url();
      if (!/^https?:/i.test(url)) return route.continue();
      if (BLOCK.test(url)) return route.abort();
      try {
        const headers = { ...req.headers() };
        delete headers["host"];
        delete headers["accept-encoding"];
        const method = req.method();
        const body =
          method !== "GET" && method !== "HEAD"
            ? req.postDataBuffer() ?? undefined
            : undefined;
        const resp = await fetch(url, {
          method,
          headers,
          body: body as any,
          redirect: "follow",
          // @ts-expect-error Node fetch accepts an undici dispatcher
          dispatcher,
          signal: AbortSignal.timeout(20000),
        });
        const buf = Buffer.from(await resp.arrayBuffer());
        const respHeaders: Record<string, string> = {};
        resp.headers.forEach((v, k) => {
          if (!/^(content-encoding|content-length|transfer-encoding)$/i.test(k))
            respHeaders[k] = v;
        });
        await route.fulfill({ status: resp.status, headers: respHeaders, body: buf });
      } catch {
        try {
          await route.abort();
        } catch {
          /* already handled */
        }
      }
    });
  }
  return context;
}

// Capture a single already-open page navigated to `url`.
async function capturePage(page: Page, url: string): Promise<CaptureResult> {
  const start = Date.now();
  let finalUrl = url;
  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    finalUrl = resp?.url() || page.url();
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    finalUrl = page.url();
  }
  const loadMs = Date.now() - start;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);

  const origin = new URL(finalUrl).origin;
  const data = await page.evaluate((origin) => {
    const text = (el: Element | null) => (el?.textContent || "").trim();

    const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
      .slice(0, 60)
      .map((h) => ({ level: Number(h.tagName.substring(1)), text: text(h).slice(0, 120) }));

    const imgs = Array.from(document.querySelectorAll("img"));
    const imagesNoAlt = imgs.filter(
      (i) => !i.getAttribute("alt") || i.getAttribute("alt")!.trim() === ""
    ).length;

    const inputs = Array.from(document.querySelectorAll("input,select,textarea")).filter(
      (i) => (i as HTMLInputElement).type !== "hidden"
    );
    const inputsNoLabel = inputs.filter((i) => {
      const id = i.getAttribute("id");
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const aria = i.getAttribute("aria-label") || i.getAttribute("aria-labelledby");
      return !hasLabel && !aria && !i.closest("label");
    }).length;

    const fontSet = new Set<string>();
    let lowContrast = 0;
    const parseRgb = (s: string): [number, number, number] | null => {
      const m = s.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(",").map((x) => parseFloat(x));
      return [p[0], p[1], p[2]];
    };
    const lum = ([r, g, b]: [number, number, number]) => {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    };
    const bodyBgStyle = getComputedStyle(document.body).backgroundColor;
    const bodyBg = parseRgb(bodyBgStyle) || [255, 255, 255];

    const textEls = Array.from(
      document.querySelectorAll("p,span,a,li,h1,h2,h3,h4,h5,h6,button")
    ).slice(0, 400);
    let primaryText: string | null = null;
    for (const el of textEls) {
      const cs = getComputedStyle(el);
      if (cs.fontFamily)
        fontSet.add(cs.fontFamily.split(",")[0].replace(/["']/g, "").trim());
      if (!text(el)) continue;
      const fg = parseRgb(cs.color);
      if (!fg) continue;
      if (!primaryText) primaryText = cs.color;
      const ratio = (Math.max(lum(fg), lum(bodyBg)) + 0.05) / (Math.min(lum(fg), lum(bodyBg)) + 0.05);
      if (ratio < 4.5 && text(el).length > 1) lowContrast++;
    }

    // Same-origin internal links, deduped, excluding files/anchors.
    const links = Array.from(new Set(
      Array.from(document.querySelectorAll("a[href]"))
        .map((a) => {
          try { return new URL((a as HTMLAnchorElement).href, location.href).href.split("#")[0]; }
          catch { return ""; }
        })
        .filter((h) => h.startsWith(origin) && !/\.(pdf|zip|png|jpe?g|gif|svg|mp4|webp|css|js|ico|xml|json|woff2?)($|\?)/i.test(h))
    )).slice(0, 50);

    const metaName = (n: string) =>
      document.querySelector(`meta[name="${n}"]`)?.getAttribute("content") || null;

    return {
      title: document.title || "",
      lang: document.documentElement.getAttribute("lang"),
      metaDescription: metaName("description"),
      viewportMeta: metaName("viewport"),
      charset: document.characterSet || null,
      favicon: !!document.querySelector('link[rel~="icon"],link[rel="shortcut icon"]'),
      fonts: Array.from(fontSet).filter(Boolean).slice(0, 12),
      headings,
      links,
      counts: {
        images: imgs.length,
        imagesNoAlt,
        links: document.querySelectorAll("a[href]").length,
        buttons: document.querySelectorAll("button,[role=button],input[type=submit]").length,
        forms: document.querySelectorAll("form").length,
        inputs: inputs.length,
        inputsNoLabel,
        scripts: document.querySelectorAll("script[src]").length,
        stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
        domNodes: document.querySelectorAll("*").length,
        wordCount: (document.body.innerText || "").split(/\s+/).filter(Boolean).length,
      },
      landmarks: {
        nav: !!document.querySelector("nav,[role=navigation]"),
        main: !!document.querySelector("main,[role=main]"),
        header: !!document.querySelector("header,[role=banner]"),
        footer: !!document.querySelector("footer,[role=contentinfo]"),
        h1Count: document.querySelectorAll("h1").length,
      },
      lowContrastSamples: lowContrast,
      bodyBg: bodyBgStyle,
      primaryText,
      contentText: (document.body.innerText || "").replace(/\n{3,}/g, "\n\n").slice(0, 6000),
    };
  }, origin);

  const desktopShot = (await page.screenshot({ fullPage: true, type: "png" })).toString("base64");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const smallTapTargets = await page.evaluate(() => {
    const targets = Array.from(document.querySelectorAll("a[href],button,[role=button],input,select"));
    let small = 0;
    for (const t of targets.slice(0, 300)) {
      const r = (t as HTMLElement).getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.width < 44 || r.height < 44) small++;
    }
    return small;
  });
  const mobileShot = (await page.screenshot({ fullPage: false, type: "png" })).toString("base64");

  return {
    url,
    finalUrl,
    https: finalUrl.startsWith("https://"),
    loadMs,
    smallTapTargets,
    desktopShot: `data:image/png;base64,${desktopShot}`,
    mobileShot: `data:image/png;base64,${mobileShot}`,
    ...data,
  };
}

// Crawl up to `maxPages` same-origin pages starting at `rawUrl` (homepage first).
export async function crawlSite(rawUrl: string, maxPages = 1): Promise<CaptureResult[]> {
  const root = normalizeUrl(rawUrl);
  const browser = await launchBrowser();
  try {
    const context = await newInterceptedContext(browser);
    const page = await context.newPage();

    const results: CaptureResult[] = [];
    const home = await capturePage(page, root);
    results.push(home);

    if (maxPages > 1) {
      const seen = new Set([home.finalUrl.split("#")[0], root.split("#")[0]]);
      // Prefer nav-like links: shorter paths first (about, pricing, contact…).
      const candidates = home.links
        .filter((l) => !seen.has(l))
        .sort((a, b) => a.length - b.length);
      for (const link of candidates) {
        if (results.length >= maxPages) break;
        if (seen.has(link)) continue;
        seen.add(link);
        try {
          results.push(await capturePage(page, link));
        } catch {
          /* skip unreachable subpage */
        }
      }
    }
    return results;
  } finally {
    await browser.close();
  }
}

// Back-compat single-page capture.
export async function captureSite(rawUrl: string): Promise<CaptureResult> {
  return (await crawlSite(rawUrl, 1))[0];
}
