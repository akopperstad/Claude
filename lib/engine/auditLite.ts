import { getProxyDispatcher } from "../proxyFetch";

export interface LiteAudit {
  hasSite: boolean;
  reachable: boolean;
  status: number | null;
  https: boolean;
  title: string | null;
  meta: boolean; // has meta description
  viewport: boolean; // mobile-friendly signal
  h1: boolean;
  words: number;
  generator: string | null; // detected site builder/CMS
  score: number; // 0-100; LOW = weak site = better lead
  error: string | null;
}

const BUILDERS: [RegExp, string][] = [
  [/wix\.com|_wixCssoModules|wixstatic/i, "Wix"],
  [/squarespace/i, "Squarespace"],
  [/wp-content|wordpress/i, "WordPress"],
  [/webflow/i, "Webflow"],
  [/shopify/i, "Shopify"],
  [/joomla/i, "Joomla"],
  [/drupal/i, "Drupal"],
  [/godaddy|websitebuilder/i, "GoDaddy"],
  [/framer\.(com|website)/i, "Framer"],
];

function detectBuilder(html: string): string | null {
  for (const [re, name] of BUILDERS) if (re.test(html)) return name;
  return null;
}

// Tier-1: a single HTTP fetch + regex parse. Milliseconds, ~free, no browser —
// run this across the whole registry. Reserve Chromium/AI for the shortlist.
export async function auditLite(rawUrl: string | null): Promise<LiteAudit> {
  if (!rawUrl || rawUrl.trim().length < 3) {
    // No website at all = maximum opportunity.
    return { hasSite: false, reachable: false, status: null, https: false, title: null, meta: false, viewport: false, h1: false, words: 0, generator: null, score: 0, error: null };
  }
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl.trim() : `https://${rawUrl.trim()}`;
  try {
    const resp = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; PilhammerBot/0.1; +https://pilhammer.no)" },
      // @ts-expect-error undici dispatcher
      dispatcher: getProxyDispatcher(),
      signal: AbortSignal.timeout(12000),
    });
    const finalUrl = resp.url || url;
    const html = (await resp.text()).slice(0, 600_000);

    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || null;
    const meta = /<meta[^>]+name=["']description["'][^>]*>/i.test(html);
    const viewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html);
    const h1 = /<h1[\b>]/i.test(html) || /<h1\s/i.test(html);
    const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter((w) => w.length > 1).length;
    const https = finalUrl.startsWith("https://");
    const generator = detectBuilder(html);

    // Score: start high, dock for each weakness. Low score => weak site => hot lead.
    let score = 100;
    if (!https) score -= 25;
    if (!viewport) score -= 22;
    if (!title) score -= 15;
    if (!meta) score -= 10;
    if (!h1) score -= 10;
    if (words < 120) score -= 12;
    if (!resp.ok) score -= 20;
    score = Math.max(0, Math.min(100, score));

    return { hasSite: true, reachable: true, status: resp.status, https, title, meta, viewport, h1, words, generator, score, error: null };
  } catch (e: any) {
    // Listed a site but it won't load — broken/parked = strong opportunity.
    return { hasSite: true, reachable: false, status: null, https: false, title: null, meta: false, viewport: false, h1: false, words: 0, generator: null, score: 10, error: e?.message?.slice(0, 120) || "fetch failed" };
  }
}
