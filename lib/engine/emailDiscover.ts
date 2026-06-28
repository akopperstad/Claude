import { getProxyDispatcher } from "../proxyFetch";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const ROLE_PRIORITY = ["post@", "firmapost@", "kontakt@", "hei@", "mail@", "info@"];

async function fetchText(url: string): Promise<string> {
  const resp = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; PilhammerBot/0.1)" },
    // @ts-expect-error undici dispatcher
    dispatcher: getProxyDispatcher(),
    signal: AbortSignal.timeout(10000),
  });
  return (await resp.text()).slice(0, 400_000);
}

// Best-effort: find a contact email on a company's own website (homepage +
// common contact paths). Prefers role addresses (post@, kontakt@) over personal
// ones — both for deliverability and to reduce personal-data exposure.
export async function discoverEmail(website: string | null): Promise<string | null> {
  if (!website) return null;
  const base = /^https?:\/\//i.test(website) ? website.trim() : `https://${website.trim()}`;
  let origin = base;
  try { origin = new URL(base).origin; } catch { /* keep base */ }

  const pages = [base, `${origin}/kontakt`, `${origin}/kontakt-oss`, `${origin}/contact`, `${origin}/om-oss`];
  const found = new Set<string>();
  for (const p of pages) {
    try {
      const html = await fetchText(p);
      const matches = html.match(EMAIL_RE) || [];
      for (const m of matches) {
        const e = m.toLowerCase();
        // Drop obvious asset/no-reply noise.
        if (/\.(png|jpg|jpeg|gif|webp|svg|css|js)$/.test(e)) continue;
        if (/example\.|sentry|wixpress|\.png|noreply/.test(e)) continue;
        found.add(e);
      }
      if (found.size && p !== base) break; // contact page hit is enough
    } catch {
      /* try next path */
    }
  }
  if (!found.size) return null;
  const list = [...found];
  for (const role of ROLE_PRIORITY) {
    const hit = list.find((e) => e.startsWith(role));
    if (hit) return hit;
  }
  return list[0];
}
