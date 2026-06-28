import { STYLES, type StyleTokens } from "../styles";
import { detectSector, sectorById } from "../sector";

export interface ShowcaseLead {
  orgnr: string;
  navn: string;
  kommune?: string | null;
  nace_desc?: string | null;
  website?: string | null;
  has_website?: number;
  audit_https?: number | null;
  audit_viewport?: number | null;
  audit_generator?: string | null;
  reasons?: string[];
}

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function rgba(hex: string, a: number): string {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

// Sector-flavoured service cards. Keyed loosely off the NACE description.
function services(naceDesc: string): { t: string; d: string }[] {
  const n = (naceDesc || "").toLowerCase();
  const pick = (arr: { t: string; d: string }[]) => arr;
  if (/bygg|tømring|maling|anlegg|oppføring|rør|elektr/.test(n))
    return pick([
      { t: "Prosjekter & referanser", d: "Vis fram fullførte bygg og oppdrag med bilder som bygger tillit." },
      { t: "Be om befaring", d: "Enkelt kontaktskjema så kunder kan be om tilbud direkte fra mobilen." },
      { t: "Tjenester & fagområder", d: "Tydelig oversikt over hva dere tar på dere — fra småjobb til totalentreprise." },
    ]);
  if (/handel|butikk|detalj|fisk|mat|kafe|restaurant/.test(n))
    return pick([
      { t: "Sortiment & meny", d: "Frist fram varer eller retter med appetittvekkende bilder og priser." },
      { t: "Åpningstider & kart", d: "La kundene finne dere raskt — med kart, tider og kontakt øverst." },
      { t: "Bestilling & kontakt", d: "Gjør det enkelt å bestille, reservere eller ta kontakt." },
    ]);
  if (/helse|fysio|tann|klinikk|terapi|lege/.test(n))
    return pick([
      { t: "Bestill time", d: "Online timebestilling reduserer telefontid og fyller kalenderen." },
      { t: "Behandlinger", d: "Forklar tilbudet trygt og forståelig, optimalisert for søk." },
      { t: "Om oss & team", d: "Bygg tillit med presentasjon av behandlere og kompetanse." },
    ]);
  if (/advokat|juridisk|regnskap|konsulent|rådgiv/.test(n))
    return pick([
      { t: "Fagområder", d: "Strukturert oversikt over tjenester som rangerer på Google." },
      { t: "Ta kontakt", d: "Lavterskel kontakt for en uforpliktende samtale." },
      { t: "Erfaring & resultater", d: "Vis kompetanse og resultater som skiller dere fra konkurrentene." },
    ]);
  return pick([
    { t: "Tjenester", d: "Tydelig presentasjon av hva dere tilbyr, bygget for konvertering." },
    { t: "Kontakt & tilbud", d: "Gjør det enkelt for kunder å nå dere og be om tilbud." },
    { t: "Om bedriften", d: "Fortell historien deres på en måte som bygger tillit." },
  ]);
}

// Map audit findings to "what Pilhammer improves" bullets.
function improvements(lead: ShowcaseLead): string[] {
  const out: string[] = [];
  if (!lead.has_website) out.push("Helt ny, moderne nettside (dere har ingen i dag)");
  else {
    if (!lead.audit_viewport) out.push("Mobiltilpasset design — fungerer perfekt på telefon");
    if (!lead.audit_https) out.push("Sikker tilkobling (HTTPS) — ingen «ikke sikker»-advarsel");
    if (lead.audit_generator) out.push(`Bort fra ${lead.audit_generator}-mal til skreddersydd design`);
    out.push("Raskere lasting og bedre brukeropplevelse");
  }
  out.push("Synlig på Google — søkemotoroptimalisering (SEO)");
  out.push("Tydelige kontaktpunkter som gir flere henvendelser");
  return out.slice(0, 6);
}

function pickStyle(lead: ShowcaseLead): StyleTokens {
  const det = detectSector([{ title: lead.navn, headings: [], contentText: `${lead.navn} ${lead.nace_desc || ""}` } as any]);
  const sid = sectorById(det.id).styles[0];
  return STYLES[sid] || STYLES["clean-light"];
}

// Build a polished, sector-styled "proposal" site for a lead — no browser, fast.
// This is what Pilhammer shows the prospect: a concrete preview of their new site.
export function generateShowcaseHtml(lead: ShowcaseLead): string {
  const s = pickStyle(lead);
  const bransje = lead.nace_desc ? titleCase(lead.nace_desc) : "Din bedrift";
  const sted = lead.kommune ? titleCase(lead.kommune.toLowerCase()) : "Norge";
  const svc = services(lead.nace_desc || "");
  const imp = improvements(lead);
  const heroGrad = s.mode === "dark"
    ? `radial-gradient(1100px 560px at 72% -10%, ${s.bgAccent} 0, ${s.bg} 60%)`
    : `linear-gradient(180deg, ${s.bgAccent} 0, ${s.bg} 360px)`;

  return `<!doctype html>
<html lang="no"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(lead.navn)} — forslag til ny nettside</title>
<meta name="description" content="${esc(lead.navn)} — ${esc(bransje)} i ${esc(sted)}. Forslag til ny nettside utarbeidet av Pilhammer.">
<style>
  :root{--bg:${s.bg};--surface:${s.surface};--text:${s.text};--muted:${s.muted};--brand:${s.brand};--brand2:${s.brand2};--border:${s.border};--radius:${s.radius}}
  *{box-sizing:border-box}html{scroll-behavior:smooth}
  body{margin:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:${heroGrad};background-repeat:no-repeat;color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
  h1,h2,h3{font-family:${s.headingFont};color:var(--text)}
  a{color:var(--brand);text-decoration:none}
  .ribbon{background:linear-gradient(90deg,var(--brand),var(--brand2));color:#fff;text-align:center;font-size:.85rem;font-weight:600;padding:8px 16px}
  .wrap{max-width:1060px;margin:0 auto;padding:0 24px}
  header{position:sticky;top:0;z-index:10;backdrop-filter:blur(10px);background:${rgba(s.bg, 0.8)};border-bottom:1px solid var(--border)}
  nav{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
  .brand{font-weight:800;font-family:${s.headingFont};letter-spacing:-.02em;font-size:1.15rem}
  .nav-links{display:flex;gap:22px}.nav-links a{color:var(--muted);font-weight:500;min-height:44px;display:flex;align-items:center}
  .btn{display:inline-flex;align-items:center;padding:12px 22px;border-radius:999px;font-weight:600;min-height:44px;background:linear-gradient(90deg,var(--brand),var(--brand2));color:#fff;box-shadow:0 8px 26px ${rgba(s.brand, 0.3)}}
  .btn.ghost{background:transparent;border:1px solid var(--border);color:var(--text);box-shadow:none}
  .hero{padding:90px 0 60px;text-align:${s.heroAlign === "left" ? "left" : "center"}}
  .kick{font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:.8rem;color:var(--brand)}
  .hero h1{font-size:clamp(2.3rem,6vw,4rem);line-height:1.04;letter-spacing:-.03em;margin:14px 0 16px}
  .hero p{font-size:clamp(1.05rem,2.4vw,1.3rem);color:var(--muted);max-width:680px;margin:${s.heroAlign === "left" ? "0 0 28px" : "0 auto 28px"}}
  .cta{display:flex;gap:14px;flex-wrap:wrap;justify-content:${s.heroAlign === "left" ? "flex-start" : "center"}}
  section{padding:60px 0;border-top:1px solid var(--border)}
  .eyebrow{font-size:.8rem;text-transform:uppercase;letter-spacing:.12em;color:var(--brand);font-weight:700}
  h2{font-size:clamp(1.6rem,4vw,2.4rem);letter-spacing:-.02em;margin:8px 0 18px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:26px}
  .card h3{margin:0 0 10px;font-size:1.2rem}.card p{margin:0;color:var(--muted)}
  .imp{list-style:none;padding:0;margin:18px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
  .imp li{display:flex;gap:10px;align-items:flex-start;color:var(--muted)}
  .imp .dot{flex:0 0 auto;width:22px;height:22px;border-radius:50%;background:${rgba(s.brand, 0.16)};color:var(--brand);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.8rem}
  footer{padding:42px 0;border-top:1px solid var(--border);color:var(--muted);font-size:.9rem}
  @media(max-width:640px){.nav-links{display:none}}
</style></head>
<body>
<div class="ribbon">Forslag til ny nettside · utarbeidet av Pilhammer for ${esc(lead.navn)}</div>
<header><div class="wrap"><nav>
  <span class="brand">${esc(lead.navn)}</span>
  <div class="nav-links"><a href="#tjenester">Tjenester</a><a href="#om">Om oss</a><a href="#kontakt">Kontakt</a></div>
  <a class="btn" href="#kontakt">Kontakt oss</a>
</nav></div></header>
<main>
  <section class="hero" style="border-top:0"><div class="wrap">
    <span class="kick">${esc(bransje)} i ${esc(sted)}</span>
    <h1>${esc(lead.navn)}</h1>
    <p>Profesjonell ${esc(bransje.toLowerCase())} i ${esc(sted)}. Slik kan en moderne, mobilvennlig nettside se ut — bygget for å gi dere flere kunder.</p>
    <div class="cta"><a class="btn" href="#kontakt">Be om tilbud</a><a class="btn ghost" href="#tjenester">Se tjenester</a></div>
  </div></section>

  <section id="tjenester"><div class="wrap">
    <span class="eyebrow">Tjenester</span><h2>Det dere tilbyr — tydelig presentert</h2>
    <div class="grid">${svc.map((c) => `<div class="card"><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div>`).join("")}</div>
  </div></section>

  <section id="om"><div class="wrap">
    <span class="eyebrow">Slik løfter Pilhammer dere</span><h2>Hva en ny nettside gir ${esc(lead.navn)}</h2>
    <ul class="imp">${imp.map((x) => `<li><span class="dot">✓</span><span>${esc(x)}</span></li>`).join("")}</ul>
  </div></section>

  <section id="kontakt"><div class="wrap">
    <span class="eyebrow">Kontakt</span><h2>Klar for en ny nettside?</h2>
    <p style="color:var(--muted);max-width:620px">Dette er et uforpliktende utkast laget av Pilhammer. Vi tilpasser alt — tekst, bilder og farger — til ${esc(lead.navn)}.</p>
    <div class="cta" style="justify-content:flex-start;margin-top:18px"><a class="btn" href="mailto:">Ta kontakt</a></div>
  </div></section>
</main>
<footer><div class="wrap">Utkast · ${esc(lead.navn)} · ${esc(sted)} · Laget av Pilhammer</div></footer>
</body></html>`;
}
