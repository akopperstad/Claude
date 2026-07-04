// Generates one before/after demo page per dealer from data/demo-listings.json
// + data/copy.json. Output: output/<dealer-slug>.html (self-contained, images
// embedded as base64 so the file can be attached or hosted anywhere).
import { readFileSync, writeFileSync, readdirSync } from "fs";

const listings = JSON.parse(readFileSync("data/demo-listings.json", "utf8"));
const copy = JSON.parse(readFileSync("data/copy.json", "utf8"));
const realDesc = JSON.parse(readFileSync("data/real-descriptions.json", "utf8"));

const img64 = (path) =>
  `data:image/jpeg;base64,${readFileSync(path).toString("base64")}`;

const nok = (n) => n.toLocaleString("nb-NO") + " kr";
const km = (n) => n.toLocaleString("nb-NO") + " km";
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const byDealer = {};
for (const [id, d] of Object.entries(listings)) {
  (byDealer[d.organisation_name] ||= []).push({ id, ...d });
}

for (const [dealer, cars] of Object.entries(byDealer)) {
  const blocks = cars
    .map((car) => {
      const c = copy[car.id];
      const oldSpec = car.model_specification || "";
      const newSpec = c.specLine;
      const specs = [
        car.year,
        km(car.mileage),
        car.fuel,
        car.transmission,
      ].filter(Boolean);
      const specBlock = (spec, cls) => `
            <div class="finnstruct">
              <div class="fieldlabel">Overskrift (genereres av FINN)</div>
              <h3 class="adheading">${car.make} ${car.model}</h3>
              <div class="fieldlabel">Modellbeskrivelse, maks 55 tegn
                <span class="charcount ${spec.length > 55 ? "over" : cls}">${spec.length}/55 tegn</span>
              </div>
              <p class="specline ${cls}">${spec || "<em>(tom)</em>"}</p>
            </div>`;
      const s = c.score;
      const scoreBlock = s
        ? `
        <div class="scorebox">
          <div class="scoreheads">
            <div><span class="scorenum bad-n">${s.before}</span><span class="scorelbl">i dag</span></div>
            <div class="scorearrow">→</div>
            <div><span class="scorenum good-n">${s.after}</span><span class="scorelbl">optimalisert</span></div>
            <div class="scoremax">av 100 poeng</div>
          </div>
          <div class="scorebars">
            ${s.breakdown
              .map(
                (r) => `
            <div class="scorerow">
              <span class="scorecat">${r.label}</span>
              <span class="bar"><i class="fill-b" style="width:${(r.b / 20) * 100}%"></i></span>
              <span class="barv">${r.b}</span>
              <span class="bar"><i class="fill-a" style="width:${(r.a / 20) * 100}%"></i></span>
              <span class="barv">${r.a}</span>
            </div>`
              )
              .join("")}
            <div class="scorerow scorekey"><span class="scorecat"></span><span class="keylbl">i dag</span><span></span><span class="keylbl">optimalisert</span><span></span></div>
          </div>
        </div>`
        : "";
      const before = (realDesc[car.id] || "").trim();
      const beforeDescBlock = before
        ? `
            <div class="fieldlabel" style="margin-top:10px">Beskrivelsen deres i dag (${before.length} tegn)</div>
            <div class="desc desc-before">${before.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")}</div>`
        : "";
      return `
      <section class="car">
        <h2>${car.make} ${car.model}${car.regno ? ` <span class="reg">(${car.regno})</span>` : ""}</h2>
        ${scoreBlock}
        <div class="grid">
          <div class="col before">
            <div class="tag tag-before">Slik ser annonsen ut i dag</div>
            <img src="${img64(`images/original/${car.id}-0.jpg`)}" alt="">
            ${specBlock(oldSpec, "bad")}
            <p class="price">${nok(car.price.amount)}</p>
            <ul class="problems">
              ${c.beforeProblems.map((p) => `<li>✗ ${p}</li>`).join("")}
            </ul>
            ${beforeDescBlock}
          </div>
          <div class="col after">
            <div class="tag tag-after">Slik kan den se ut</div>
            <img src="${img64(`images/enhanced/${car.id}-0-branded.jpg`)}" alt="">
            ${specBlock(newSpec, "good")}
            <p class="price">${nok(car.price.amount)} <span class="verdict">✓ ${c.priceVerdict}</span></p>
            <div class="chips">${specs.map((s) => `<span>${s}</span>`).join("")}</div>
            ${c.trust ? `<div class="trust">${c.trust.map((t) => `<span>✓ ${t}</span>`).join("")}</div>` : ""}
            <div class="desc">${c.newDescription.replace(/\n/g, "<br>")}</div>
            <div class="thumbs">
              <img src="${img64(`images/enhanced/${car.id}-1.jpg`)}" alt="">
              <img src="${img64(`images/enhanced/${car.id}-2.jpg`)}" alt="">
            </div>
            <p class="photoplan">📸 ${c.photoPlan}</p>
          </div>
        </div>
      </section>`;
    })
    .join("\n");

  const html = `<!doctype html>
<html lang="nb"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Demo for ${dealer}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif; color:#26262d; background:#f6f6f6; }
  header { background:#fff; border-bottom:1px solid #dedee3; padding:28px 24px; text-align:center; }
  header h1 { font-size:26px; }
  header p { color:#47474f; margin-top:6px; }
  .wrap { max-width:1100px; margin:0 auto; padding:24px; }
  .car { background:#fff; border:1px solid #dedee3; border-radius:10px; padding:24px; margin-bottom:28px; }
  .car > h2 { margin-bottom:16px; font-size:20px; }
  .reg { color:#84848f; font-weight:400; font-size:14px; }
  .grid { display:grid; grid-template-columns:1fr 1.2fr; gap:24px; }
  @media (max-width:800px){ .grid{ grid-template-columns:1fr; } }
  .col img { width:100%; border-radius:8px; display:block; }
  .tag { display:inline-block; font-size:12px; font-weight:700; padding:4px 10px; border-radius:99px; margin-bottom:10px; }
  .tag-before { background:#ffefef; color:#d91f0a; }
  .tag-after { background:#e3fcf3; color:#059e6f; }
  .finnstruct { margin:12px 0 4px; }
  .fieldlabel { font-size:11px; color:#84848f; text-transform:uppercase; letter-spacing:.4px; margin-bottom:2px; }
  .adheading { font-size:18px; margin-bottom:8px; }
  .charcount { font-size:11px; font-weight:700; text-transform:none; letter-spacing:0; padding:1px 7px; border-radius:99px; margin-left:6px; }
  .charcount.bad { background:#fff5e8; color:#b8860b; }
  .charcount.good { background:#e3fcf3; color:#059e6f; }
  .charcount.over { background:#ffefef; color:#d91f0a; }
  .specline { font-size:15px; font-weight:600; margin-bottom:8px; }
  .specline.bad { color:#8a2b20; }
  .specline.good { color:#0d203f; }
  .photoplan { font-size:12.5px; color:#47474f; background:#f1f9ff; border-radius:8px; padding:10px 12px; margin-top:10px; line-height:1.45; }
  .price { font-size:18px; font-weight:700; margin:4px 0 10px; }
  .verdict { font-size:12px; font-weight:600; color:#059e6f; background:#e3fcf3; padding:3px 8px; border-radius:99px; margin-left:6px; }
  .problems { list-style:none; font-size:13px; color:#d91f0a; display:flex; flex-direction:column; gap:5px; }
  .chips span { display:inline-block; background:#f1f9ff; color:#0063fb; font-size:12px; font-weight:600; padding:4px 10px; border-radius:99px; margin:0 6px 10px 0; }
  .trust span { display:inline-block; background:#e3fcf3; color:#059e6f; font-size:12px; font-weight:600; padding:4px 10px; border-radius:99px; margin:0 6px 10px 0; }
  .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; max-width:1100px; margin:0 auto; padding:18px 24px 0; }
  @media (max-width:800px){ .stats{ grid-template-columns:repeat(2,1fr); } }
  .stat { background:#fff; border:1px solid #dedee3; border-radius:10px; padding:14px; text-align:center; }
  .stat b { display:block; font-size:20px; color:#0063fb; }
  .stat small { color:#47474f; font-size:11.5px; line-height:1.35; display:block; margin-top:3px; }
  .stats-src { text-align:center; font-size:11px; color:#84848f; margin-top:8px; }
  .desc { font-size:14px; line-height:1.55; color:#26262d; background:#fafafa; border:1px solid #eee; padding:14px; border-radius:8px; }
  .desc-before { max-height:220px; overflow-y:auto; color:#47474f; font-size:12.5px; }
  .scorebox { border:1px solid #dedee3; border-radius:10px; padding:16px 18px; margin-bottom:18px; background:#fafafa; }
  .scoreheads { display:flex; align-items:baseline; gap:14px; margin-bottom:12px; }
  .scorenum { font-size:34px; font-weight:800; }
  .bad-n { color:#d91f0a; } .good-n { color:#059e6f; }
  .scorelbl { font-size:11px; color:#84848f; display:block; text-align:center; }
  .scorearrow { font-size:22px; color:#84848f; }
  .scoremax { margin-left:auto; font-size:12px; color:#84848f; }
  .scorerow { display:grid; grid-template-columns:170px 1fr 26px 1fr 26px; gap:8px; align-items:center; margin-bottom:5px; }
  .scorecat { font-size:12px; color:#47474f; }
  .bar { height:8px; background:#ececf0; border-radius:99px; overflow:hidden; display:block; }
  .bar i { display:block; height:100%; border-radius:99px; }
  .fill-b { background:#d91f0a; opacity:.75; }
  .fill-a { background:#059e6f; }
  .barv { font-size:11px; font-weight:700; color:#47474f; text-align:right; }
  .keylbl { font-size:10.5px; color:#84848f; text-align:center; }
  .thumbs { display:flex; gap:10px; margin-top:10px; }
  .thumbs img { width:calc(50% - 5px); border-radius:6px; }
  footer { background:#0d203f; color:#fff; padding:36px 24px; text-align:center; margin-top:16px; }
  footer h2 { font-size:20px; margin-bottom:8px; }
  footer p { color:#c9d4e5; font-size:14px; max-width:560px; margin:0 auto; line-height:1.5; }
  .note { text-align:center; font-size:12px; color:#84848f; padding:14px; }
</style></head>
<body>
<header>
  <h1>Hei ${dealer} 👋</h1>
  <p>Vi tok ${cars.length === 1 ? "en av annonsene deres" : cars.length + " av annonsene deres"} på FINN og viste hva 5 minutter med verktøyet vårt gjør.</p>
</header>
<div class="stats">
  <div class="stat"><b>93 %</b><small>av bilkjøpere ser på bildene først</small></div>
  <div class="stat"><b>10–29</b><small>bilder gir raskest salg, færre enn 5 skader salget</small></div>
  <div class="stat"><b>300 kr</b><small>daglig lagerkostnad per bil som står usolgt</small></div>
  <div class="stat"><b>14–21</b><small>dager til salg for riktig priset, komplett annonse</small></div>
</div>
<div class="stats-src">Kilde: FINNs egen analyse av 155 000 bilannonser og FINNs eksperttips for forhandlere</div>
<div class="wrap">
${blocks}
</div>
<footer>
  <h2>Bedre bilder. Bedre tekst. Riktig pris. Raskere salg.</h2>
  <p>Automatisk annonseoptimalisering for bilforhandlere: profesjonelle bilder, komplett salgstekst fra regnummer, og prisanalyse mot markedet — for hele lagerbeholdningen.</p>
  <p style="margin-top:12px"><strong style="color:#fff">Regnestykket:</strong> selger bilen 10 dager raskere, sparer dere ~3 000 kr i lagerkostnad — per bil. Svar på e-posten for en uforpliktende pilot på 5 biler.</p>
</footer>
<div class="note">Demonstrasjon basert på deres offentlige FINN-annonser. Kun delt med dere. Bilder og annonser tilhører ${dealer}.</div>
</body></html>`;

  const file = `output/${slug(dealer)}.html`;
  writeFileSync(file, html);
  console.log("wrote", file, Math.round(html.length / 1024) + "kB");
}
