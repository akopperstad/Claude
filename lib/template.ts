import type { Finding, PageAudit } from "./types";
import type { StyleTokens } from "./styles";

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
    if (last)
      return last.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 24);
  } catch {}
  return p.capture.title.split(/[|\-–—]/)[0].trim().slice(0, 24) || `Page ${i + 1}`;
}

function hexToRgba(hex: string, a: number): string {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// Theme-driven, single-file, responsive multi-section redesign built from the
// crawled pages and styled by `s`. Same structure for every preset; only the
// tokens change, which is what makes the snapshots feel like distinct designs.
export function templateRedesign(
  pages: PageAudit[],
  allFindings: Finding[],
  s: StyleTokens
): string {
  const home = pages[0].capture;
  const siteName = (home.title || home.finalUrl).split(/[|\-–—]/)[0].trim();
  const h1 = home.headings.find((h) => h.level === 1)?.text || home.title || siteName;
  const desc =
    home.metaDescription ||
    home.contentText.split("\n").find((l) => l.trim().length > 40)?.slice(0, 200) ||
    "A clearer, faster, more accessible take on your site.";

  const nav = pages.map((p, i) => ({ id: slug(pageLabel(p, i), i), label: pageLabel(p, i) }));

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
      const cards = (subs.length ? subs.map((x) => x.text) : paras.map((_, k) => `Highlight ${k + 1}`)).slice(0, 3);
      return `<section class="section" id="${nav[i].id}"><div class="wrap">
    <span class="eyebrow">${esc(nav[i].label)}</span>
    <h2>${esc(heading)}</h2>
    <p class="lead">${esc(paras[0] || desc)}</p>
    ${
      cards.length
        ? `<div class="grid">${cards
            .map(
              (t, k) =>
                `<div class="card"><h3>${esc(t.slice(0, 60))}</h3><p>${esc(
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

  const ring = hexToRgba(s.brand, 0.32);
  const heroGrad =
    s.mode === "dark"
      ? `radial-gradient(1200px 600px at 70% -10%, ${s.bgAccent} 0, ${s.bg} 60%)`
      : `linear-gradient(180deg, ${s.bgAccent} 0, ${s.bg} 320px)`;
  const tu = s.uppercaseHeads ? "text-transform:uppercase;letter-spacing:-.01em;" : "";
  const heroTextAlign = s.heroAlign === "left" ? "left" : "center";
  const heroCtaJustify = s.heroAlign === "left" ? "flex-start" : "center";

  return `<!doctype html>
<html lang="${esc(home.lang || "en")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(home.title || siteName)}</title>
<meta name="description" content="${esc(desc.slice(0, 160))}">
<style>
  :root{--bg:${s.bg};--surface:${s.surface};--text:${s.text};--muted:${s.muted};
    --brand:${s.brand};--brand2:${s.brand2};--border:${s.border};--ring:${ring};
    --radius:${s.radius};--maxw:1080px;--body:${s.bodyFont};--head:${s.headingFont}}
  *{box-sizing:border-box}html{scroll-behavior:smooth}
  body{margin:0;font-family:var(--body);background:${heroGrad};background-attachment:fixed;
    color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
  h1,h2,h3{font-family:var(--head)}
  a{color:var(--brand);text-decoration:none}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}
  header{position:sticky;top:0;backdrop-filter:blur(10px);background:${hexToRgba(s.bg, 0.8)};
    border-bottom:1px solid var(--border);z-index:10}
  nav{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
  .brand{font-weight:800;letter-spacing:-.02em;font-size:1.15rem;font-family:var(--head);${tu}}
  .brand span{color:var(--brand)}
  .nav-links{display:flex;gap:22px;flex-wrap:wrap}
  .nav-links a{color:var(--muted);font-weight:500;min-height:44px;display:flex;align-items:center}
  .nav-links a:hover{color:var(--text)}
  .btn{display:inline-flex;align-items:center;padding:12px 22px;border-radius:999px;font-weight:600;min-height:44px;
    background:linear-gradient(90deg,var(--brand),var(--brand2));color:#fff;box-shadow:0 8px 30px var(--ring);transition:transform .15s}
  .btn:hover{transform:translateY(-2px)}
  .btn.ghost{background:transparent;border:1px solid var(--border);color:var(--text);box-shadow:none}
  .hero{padding:96px 0 64px;text-align:${heroTextAlign}}
  .hero h1{font-size:clamp(2.2rem,6vw,4rem);line-height:1.05;letter-spacing:-.03em;margin:0 0 20px;${tu}}
  .hero p{font-size:clamp(1.05rem,2.5vw,1.3rem);color:var(--muted);max-width:680px;margin:${s.heroAlign === "left" ? "0 0 32px" : "0 auto 32px"}}
  .cta{display:flex;gap:14px;justify-content:${heroCtaJustify};flex-wrap:wrap}
  .section{padding:64px 0;border-top:1px solid var(--border)}
  .eyebrow{font-size:.8rem;text-transform:uppercase;letter-spacing:.12em;color:var(--brand);font-weight:700}
  .section h2{font-size:clamp(1.6rem,4vw,2.4rem);letter-spacing:-.02em;margin:8px 0 16px;${tu}}
  .lead{color:var(--muted);max-width:720px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin:28px 0}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;transition:transform .2s,box-shadow .2s}
  .card:hover{transform:translateY(-4px);box-shadow:0 12px 40px ${hexToRgba(s.brand, 0.15)}}
  .card h3{margin:0 0 8px;font-size:1.1rem}.card p{margin:0;color:var(--muted)}
  .link{display:inline-block;margin-top:8px;font-weight:600}
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
  .chip{font-size:.85rem;padding:8px 14px;border-radius:999px;background:var(--surface);color:var(--muted);border:1px solid var(--border)}
  footer{padding:48px 0;color:var(--muted);border-top:1px solid var(--border);margin-top:24px}
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
  <div>${esc(s.name)} · Reface · ${pages.length} page(s) · mobile-first</div>
</div></footer>
</body>
</html>`;
}
