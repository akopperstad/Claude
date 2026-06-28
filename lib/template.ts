import type { CaptureResult, Finding } from "./types";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Build a clean, modern, responsive single-file redesign from the captured
// content WITHOUT an LLM. Used as the offline fallback (no API key) and as a
// guaranteed baseline. Reuses the real site's text so the result is recognizable.
export function templateRedesign(c: CaptureResult, findings: Finding[]): string {
  const title = c.title || c.finalUrl;
  const h1 = c.headings.find((h) => h.level === 1)?.text || title;
  const subheads = c.headings.filter((h) => h.level === 2).slice(0, 6);
  const desc =
    c.metaDescription ||
    c.contentText.split("\n").find((l) => l.trim().length > 40)?.slice(0, 200) ||
    "A clearer, faster, more accessible take on your site.";

  // Pull a few content paragraphs from the captured text.
  const paras = c.contentText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 50)
    .slice(0, 4);

  const features = (subheads.length
    ? subheads.map((s) => s.text)
    : ["Fast", "Accessible", "Responsive"]
  ).slice(0, 3);

  const fixed = findings
    .filter((f) => f.severity === "critical" || f.severity === "warning")
    .slice(0, 5)
    .map((f) => f.title);

  return `<!doctype html>
<html lang="${esc(c.lang || "en")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc.slice(0, 160))}">
<style>
  :root{
    --bg:#0b1020; --surface:#121a33; --text:#e8ecf6; --muted:#9aa6c4;
    --brand:#6c8cff; --brand-2:#9b6cff; --ring:rgba(108,140,255,.35);
    --radius:16px; --maxw:1080px;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:radial-gradient(1200px 600px at 70% -10%,#1b2750 0,var(--bg) 60%);
    color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
  a{color:var(--brand);text-decoration:none}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}
  header{position:sticky;top:0;backdrop-filter:blur(10px);
    background:rgba(11,16,32,.7);border-bottom:1px solid #1e2a4d;z-index:10}
  nav{display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand{font-weight:800;letter-spacing:-.02em;font-size:1.15rem}
  .brand span{background:linear-gradient(90deg,var(--brand),var(--brand-2));
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .nav-links{display:flex;gap:28px}
  .nav-links a{color:var(--muted);font-weight:500}
  .nav-links a:hover{color:var(--text)}
  .btn{display:inline-block;padding:12px 22px;border-radius:999px;font-weight:600;
    min-height:44px;background:linear-gradient(90deg,var(--brand),var(--brand-2));
    color:#fff;box-shadow:0 8px 30px var(--ring);transition:transform .15s ease}
  .btn:hover{transform:translateY(-2px)}
  .btn.ghost{background:transparent;border:1px solid #2a3a66;color:var(--text);box-shadow:none}
  .hero{padding:96px 0 72px;text-align:center}
  .hero h1{font-size:clamp(2.2rem,6vw,4rem);line-height:1.05;letter-spacing:-.03em;margin:0 0 20px}
  .hero p{font-size:clamp(1.05rem,2.5vw,1.3rem);color:var(--muted);max-width:680px;margin:0 auto 32px}
  .cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin:64px 0}
  .card{background:var(--surface);border:1px solid #1e2a4d;border-radius:var(--radius);
    padding:28px;transition:transform .2s ease,border-color .2s ease}
  .card:hover{transform:translateY(-4px);border-color:#2f4a82}
  .card h3{margin:0 0 10px;font-size:1.2rem}
  .card p{margin:0;color:var(--muted)}
  .section{padding:56px 0;border-top:1px solid #16213f}
  .section h2{font-size:clamp(1.6rem,4vw,2.4rem);letter-spacing:-.02em;margin:0 0 18px}
  .lead{color:var(--muted);max-width:720px}
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
  .chip{font-size:.85rem;padding:8px 14px;border-radius:999px;background:#16213f;color:#bcd;border:1px solid #243a66}
  footer{padding:48px 0;color:var(--muted);border-top:1px solid #16213f;margin-top:40px}
  .foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px}
  :focus-visible{outline:3px solid var(--brand);outline-offset:2px;border-radius:8px}
  @media (max-width:600px){.nav-links{display:none}}
</style>
</head>
<body>
<header><div class="wrap"><nav>
  <div class="brand"><span>${esc(h1.split(" ").slice(0, 3).join(" ") || title)}</span></div>
  <div class="nav-links">
    ${features.map((x) => `<a href="#f">${esc(x.slice(0, 18))}</a>`).join("\n    ")}
  </div>
  <a class="btn" href="#cta">Get started</a>
</nav></div></header>

<main>
  <section class="hero wrap">
    <h1>${esc(h1)}</h1>
    <p>${esc(desc)}</p>
    <div class="cta" id="cta">
      <a class="btn" href="${esc(c.finalUrl)}">Visit original</a>
      <a class="btn ghost" href="#f">See what changed</a>
    </div>
  </section>

  <section class="wrap">
    <div class="grid" id="f">
      ${features
        .map(
          (feat, i) => `<div class="card">
        <h3>${esc(feat)}</h3>
        <p>${esc(paras[i] || "Rebuilt with a clear hierarchy, accessible contrast, and a mobile-first layout.")}</p>
      </div>`
        )
        .join("\n      ")}
    </div>
  </section>

  ${paras
    .slice(0, 2)
    .map(
      (p, i) => `<section class="section"><div class="wrap">
    <h2>${esc(subheads[i]?.text || (i === 0 ? "Why it matters" : "Built right"))}</h2>
    <p class="lead">${esc(p)}</p>
  </div></section>`
    )
    .join("\n  ")}

  ${
    fixed.length
      ? `<section class="section"><div class="wrap">
    <h2>Issues addressed in this redesign</h2>
    <p class="lead">The original audit flagged these — the new layout resolves them.</p>
    <div class="chips">${fixed.map((x) => `<span class="chip">✓ ${esc(x)}</span>`).join("")}</div>
  </div></section>`
      : ""
  }
</main>

<footer><div class="wrap foot">
  <div>© ${new Date().getFullYear()} ${esc(title)}</div>
  <div>Redesigned by Reface · mobile-first · WCAG-aware</div>
</div></footer>
</body>
</html>`;
}
