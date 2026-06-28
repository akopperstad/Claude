import fs from "node:fs";
import path from "node:path";
import type { CaptureResult } from "./types";
import { getProxyDispatcher, hasProxy } from "./proxyFetch";

// Chrome's own background chatter that we never want to fetch through the proxy.
const BLOCK =
  /(clients2?\.google\.com|accounts\.google\.com|www\.google\.com\/(async|gen_204)|optimizationguide|safebrowsing|update\.googleapis|gstatic\.com\/generate_204|google\.com\/gen_204)/i;

// Resolve the system-installed Chromium shipped in this environment instead of
// downloading one. PLAYWRIGHT_BROWSERS_PATH points at /opt/pw-browsers; the
// actual binary lives at chromium-<build>/chrome-linux/chrome. We glob for it so
// a Playwright version bump (different build number) still resolves.
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
    /* fall through — let Playwright try its own resolution */
  }
  return undefined;
}

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export async function captureSite(rawUrl: string): Promise<CaptureResult> {
  const url = normalizeUrl(rawUrl);
  // Dynamic import keeps Playwright out of the build graph until runtime.
  const { chromium } = await import("playwright");
  const executablePath = resolveChromium();

  // We do NOT point Chromium at the proxy. Instead it runs with no network of
  // its own and every request is intercepted and fetched in Node (see below),
  // which proxies + trusts the CA reliably.
  const browser = await chromium.launch({
    headless: true,
    executablePath,
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

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: true,
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 Reface/0.1",
    });

    // Route every request through Node's fetch (proxied + CA-trusted). Without a
    // proxy this is a no-op path (continue), so behavior is unchanged locally.
    const dispatcher = getProxyDispatcher();
    if (hasProxy()) {
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
            // Body is already decompressed by fetch — drop encoding/length so the
            // browser doesn't try to re-decode it.
            if (!/^(content-encoding|content-length|transfer-encoding)$/i.test(k))
              respHeaders[k] = v;
          });
          await route.fulfill({
            status: resp.status,
            headers: respHeaders,
            body: buf,
          });
        } catch {
          try {
            await route.abort();
          } catch {
            /* request already handled */
          }
        }
      });
    }

    const page = await context.newPage();

    const start = Date.now();
    let finalUrl = url;
    try {
      const resp = await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      finalUrl = resp?.url() || page.url();
    } catch {
      // networkidle can hang on chatty sites; fall back to DOM ready.
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      finalUrl = page.url();
    }
    const loadMs = Date.now() - start;

    // Give late content/animations a beat to settle.
    await page.waitForTimeout(1200);

    const data = await page.evaluate(() => {
      const text = (el: Element | null) => (el?.textContent || "").trim();

      const headings = Array.from(
        document.querySelectorAll("h1,h2,h3,h4,h5,h6")
      )
        .slice(0, 60)
        .map((h) => ({
          level: Number(h.tagName.substring(1)),
          text: text(h).slice(0, 120),
        }));

      const imgs = Array.from(document.querySelectorAll("img"));
      const imagesNoAlt = imgs.filter(
        (i) => !i.getAttribute("alt") || i.getAttribute("alt")!.trim() === ""
      ).length;

      const inputs = Array.from(
        document.querySelectorAll("input,select,textarea")
      ).filter((i) => (i as HTMLInputElement).type !== "hidden");
      const inputsNoLabel = inputs.filter((i) => {
        const id = i.getAttribute("id");
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const aria =
          i.getAttribute("aria-label") || i.getAttribute("aria-labelledby");
        const wrapped = i.closest("label");
        return !hasLabel && !aria && !wrapped;
      }).length;

      // Sample fonts + contrast from visible text nodes.
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
        if (cs.fontFamily) fontSet.add(cs.fontFamily.split(",")[0].replace(/["']/g, "").trim());
        if (!text(el)) continue;
        const fg = parseRgb(cs.color);
        if (!fg) continue;
        if (!primaryText) primaryText = cs.color;
        const l1 = lum(fg);
        const l2 = lum(bodyBg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (ratio < 4.5 && text(el).length > 1) lowContrast++;
      }

      const metaName = (n: string) =>
        document
          .querySelector(`meta[name="${n}"]`)
          ?.getAttribute("content") || null;

      return {
        title: document.title || "",
        lang: document.documentElement.getAttribute("lang"),
        metaDescription: metaName("description"),
        viewportMeta: metaName("viewport"),
        charset:
          document.characterSet ||
          document.querySelector("meta[charset]")?.getAttribute("charset") ||
          null,
        favicon: !!document.querySelector(
          'link[rel~="icon"],link[rel="shortcut icon"]'
        ),
        fonts: Array.from(fontSet).filter(Boolean).slice(0, 12),
        headings,
        counts: {
          images: imgs.length,
          imagesNoAlt,
          links: document.querySelectorAll("a[href]").length,
          buttons: document.querySelectorAll(
            "button,[role=button],input[type=submit]"
          ).length,
          forms: document.querySelectorAll("form").length,
          inputs: inputs.length,
          inputsNoLabel,
          scripts: document.querySelectorAll("script[src]").length,
          stylesheets: document.querySelectorAll('link[rel="stylesheet"]')
            .length,
          domNodes: document.querySelectorAll("*").length,
          wordCount: (document.body.innerText || "").split(/\s+/).filter(Boolean)
            .length,
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
        contentText: (document.body.innerText || "")
          .replace(/\n{3,}/g, "\n\n")
          .slice(0, 6000),
      };
    });

    const desktopShot = (
      await page.screenshot({ fullPage: true, type: "png" })
    ).toString("base64");

    // Mobile pass: emulate a phone, re-shoot, and count small tap targets.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);
    const smallTapTargets = await page.evaluate(() => {
      const targets = Array.from(
        document.querySelectorAll("a[href],button,[role=button],input,select")
      );
      let small = 0;
      for (const t of targets.slice(0, 300)) {
        const r = (t as HTMLElement).getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.width < 44 || r.height < 44) small++;
      }
      return small;
    });
    const mobileShot = (
      await page.screenshot({ fullPage: false, type: "png" })
    ).toString("base64");

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
  } finally {
    await browser.close();
  }
}
