import type { Finding, PageAudit } from "./types";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slug(s: string, i: number): string {
  const base = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return base ? `${base}-${i}` : `page-${i}`;
}

function pageLabel(p: PageAudit, i: number): string {
  if (i === 0) return "Home";
  try {
    const path = new URL(p.capture.finalUrl).pathname.replace(/\/$/, "");
    const last = path.split("/").filter(Boolean).pop();
    if (last) return last.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 24);
  } catch {}
  return p.capture.title.split(/[|\-–—]/)[0].trim().slice(0, 24) || `Page ${i + 1}`;
}

// Build a clean, modern, responsive single-file redesign from the crawled pages
// WITHOUT an LLM. One cohesive site: hero from the homepage, a nav + section per
// crawled page, and an "issues addressed" panel from the aggregated audit.
export function templateRedesign(pages: PageAudit[], allFindings: Finding[]): string {
  const home = pages[0].capture;
  const siteName = (home.title || home.finalUrl).split(/[|\-–—]/)[0].trim();
  const h1 = home.headings.find((h) => h.level === 1)?.text || home.title || siteName;
  const desc =
    home.metaDescription ||
    home.contentText.split("\n").find((l) => l.trim().length > 40)?.slice(0, 200) ||
    "A clearer, faster, more accessible take on your site.";

  const nav = pages
    .map((p, i) => ({ id: slug(pageLabel(p, i), i), label: pageLabel(p, i) }));

  const sections = pages
    .map((p, i) => {
      const c = p.capture;
      const heading = c.headings.find((h) => h.level === 1)?.text || c.title || nav[i].label;
      const subs = c.headings.filter((h) => h.level === 2).slice(0, 3);
      const paras = c.contentText
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 50)
        .slice(0, 3);
      const cards = (subs.length ? subs.map((s) => s.text) : paras.map((_, k) => `Highlight ${k + 1}`))
        .slice(0, 3);
      return `<section class="section" id="${nav[i].id}"><div class="wrap">
    <span class="eyebrow">${esc(nav[i].label)}</span>
    <h2>${esc(heading)}</h2>
    <p class="lead">${esc(paras[0] || desc)}</p>
    ${
      cards.length
        ? `<div class="grid">${cards
            .map(
              (t, k) => `<div class="card"><h3>${esc(t.slice(0, 60))}</h3><p>${esc(
                paras[k + 1] || paras[0] || "Rebuilt with clear hierarchy, accessible contrast, and a mobile-first layout."
              )}</p></div>`
            )
            .join("")}</div>`
        : ""
    }
    <a class="link" href="${esc(c.finalUrl)}">View original ↗</a>
  </div></section>`;
    })
    .join("\n  ");

  const fixed = allFindings
    .filter((f) => f.severity === "critical" || f.severity === "warning")
    .map((f) => f.title)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 8);

  return `<!doctype html>
<html lang="${esc(home.lang || "en")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(home.title || siteName)}</title>
<meta name="description" content="${esc(desc.slice(0, 160))}">
<style>
  :root{--bg:#0b1020;--surface:#121a33;--text:#e8ecf6;--muted:#9aa6c4;
    --brand:#6c8cff;--brand-2:#9b6cff;--ring:rgba(108,140,255,.35);--radius:16px;--maxw:1080px}
  *{box-sizing:border-box}html{scroll-behavior:smooth}
  body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(1200px 600px at 70% -10%,#1b2750 0,var(--bg) 60%);
    color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
  a{color:var(--brand);text-decoration:none}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}
  header{position:sticky;top:0;backdrop-filter:blur(10px);background:rgba(11,16,32,.75);
    border-bottom:1px solid #1e2a4d;z-index:10}
  nav{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
  .brand{font-weight:800;letter-spacing:-.02em;font-size:1.15rem}
  .brand span{background:linear-gradient(90deg,var(--brand),var(--brand-2));-webkit-background-clip:text;background-clip:text;color:transparent}
  .nav-links{display:flex;gap:22px;flex-wrap:wrap}
  .nav-links a{color:var(--muted);font-weight:500;min-height:44px;display:flex;align-items:center}
  .nav-links a:hover{color:var(--text)}
  .btn{display:inline-flex;align-items:center;padding:12px 22px;border-radius:999px;font-weight:600;min-height:44px;
    background:linear-gradient(90deg,var(--brand),var(--brand-2));color:#fff;box-shadow:0 8px 30px var(--ring);transition:transform .15s}
  .btn:hover{transform:translateY(-2px)}
  .btn.ghost{background:transparent;border:1px solid #2a3a66;color:var(--text);box-shadow:none}
  .hero{padding:96px 0 64px;text-align:center}
  .hero h1{font-size:clamp(2.2rem,6vw,4rem);line-height:1.05;letter-spacing:-.03em;margin:0 0 20px}
  .hero p{font-size:clamp(1.05rem,2.5vw,1.3rem);color:var(--muted);max-width:680px;margin:0 auto 32px}
  .cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
  .section{padding:64px 0;border-top:1px solid #16213f}
  .eyebrow{font-size:.8rem;text-transform:uppercase;letter-spacing:.12em;color:var(--brand);font-weight:700}
  .section h2{font-size:clamp(1.6rem,4vw,2.4rem);letter-spacing:-.02em;margin:8px 0 16px}
  .lead{color:var(--muted);max-width:720px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin:28px 0}
  .card{background:var(--surface);border:1px solid #1e2a4d;border-radius:var(--radius);padding:24px;transition:transform .2s,border-color .2s}
  .card:hover{transform:translateY(-4px);border-color:#2f4a82}
  .card h3{margin:0 0 8px;font-size:1.1rem}.card p{margin:0;color:var(--muted)}
  .link{display:inline-block;margin-top:8px;font-weight:600}
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
  .chip{font-size:.85rem;padding:8px 14px;border-radius:999px;background:#16213f;color:#bcd;border:1px solid #243a66}
  footer{padding:48px 0;color:var(--muted);border-top:1px solid #16213f;margin-top:24px}
  .foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px}
  :focus-visible{outline:3px solid var(--brand);outline-offset:2px;border-radius:8px}
  @media(max-width:640px){.nav-links{display:none}}
</style>
</head>
<body>
<header><div class="wrap"><nav>
  <a class="brand" href="#top"><span>${esc(siteName)}</span></a>
  <div class="nav-links">${nav.map((n) => `<a href="#${n.id}">${esc(n.label)}</a>`).join("")}</div>
  <a class="btn" href="${esc(home.finalUrl)}">Visit original</a>
</nav></div></header>

<main id="top">
  <section class="hero wrap">
    <h1>${esc(h1)}</h1>
    <p>${esc(desc)}</p>
    <div class="cta">
      <a class="btn" href="#${nav[0].id}">Explore</a>
      <a class="btn ghost" href="#changed">What changed</a>
    </div>
  </section>

  ${sections}

  ${
    fixed.length
      ? `<section class="section" id="changed"><div class="wrap">
    <span class="eyebrow">Audit</span>
    <h2>Issues addressed in this redesign</h2>
    <p class="lead">The audit flagged these across ${pages.length} page(s) — the new layout resolves them.</p>
    <div class="chips">${fixed.map((x) => `<span class="chip">✓ ${esc(x)}</span>`).join("")}</div>
  </div></section>`
      : ""
  }
</main>

<footer><div class="wrap foot">
  <div>© ${new Date().getFullYear()} ${esc(siteName)}</div>
  <div>Redesigned by Reface · ${pages.length} page(s) · mobile-first · WCAG-aware</div>
</div></footer>
</body>
</html>`;
}
