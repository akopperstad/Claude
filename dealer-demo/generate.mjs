// Generates one before/after demo page per dealer from data/demo-listings.json
// + data/copy.json. Output: output/<dealer-slug>.html (self-contained, images
// embedded as base64 so the file can be attached or hosted anywhere).
import { readFileSync, writeFileSync, readdirSync } from "fs";

const listings = JSON.parse(readFileSync("data/demo-listings.json", "utf8"));
const copy = JSON.parse(readFileSync("data/copy.json", "utf8"));

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
      const beforeTitle = `${car.heading} ${car.model_specification || ""}`.trim();
      const specs = [
        car.year,
        km(car.mileage),
        car.fuel,
        car.transmission,
      ].filter(Boolean);
      return `
      <section class="car">
        <h2>${car.make} ${car.model}${car.regno ? ` <span class="reg">(${car.regno})</span>` : ""}</h2>
        <div class="grid">
          <div class="col before">
            <div class="tag tag-before">Slik ser annonsen ut i dag</div>
            <img src="${img64(`images/original/${car.id}-0.jpg`)}" alt="">
            <h3 class="title-before">${beforeTitle}</h3>
            <p class="price">${nok(car.price.amount)}</p>
            <ul class="problems">
              ${c.beforeProblems.map((p) => `<li>✗ ${p}</li>`).join("")}
            </ul>
          </div>
          <div class="col after">
            <div class="tag tag-after">Slik kan den se ut</div>
            <img src="${img64(`images/enhanced/${car.id}-0.jpg`)}" alt="">
            <h3 class="title-after">${c.newTitle}</h3>
            <p class="price">${nok(car.price.amount)} <span class="verdict">✓ ${c.priceVerdict}</span></p>
            <div class="chips">${specs.map((s) => `<span>${s}</span>`).join("")}</div>
            <div class="desc">${c.newDescription.replace(/\n/g, "<br>")}</div>
            <div class="thumbs">
              <img src="${img64(`images/enhanced/${car.id}-1.jpg`)}" alt="">
              <img src="${img64(`images/enhanced/${car.id}-2.jpg`)}" alt="">
            </div>
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
  .title-before { font-size:15px; margin:10px 0 4px; color:#47474f; font-weight:600; }
  .title-after { font-size:17px; margin:12px 0 4px; }
  .price { font-size:18px; font-weight:700; margin:4px 0 10px; }
  .verdict { font-size:12px; font-weight:600; color:#059e6f; background:#e3fcf3; padding:3px 8px; border-radius:99px; margin-left:6px; }
  .problems { list-style:none; font-size:13px; color:#d91f0a; display:flex; flex-direction:column; gap:5px; }
  .chips span { display:inline-block; background:#f1f9ff; color:#0063fb; font-size:12px; font-weight:600; padding:4px 10px; border-radius:99px; margin:0 6px 10px 0; }
  .desc { font-size:14px; line-height:1.55; color:#26262d; background:#fafafa; border:1px solid #eee; padding:14px; border-radius:8px; }
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
  <p>Vi tok ${cars.length === 1 ? "en av annonsene deres" : cars.length + " av annonsene deres"} på FINN — og viste hva 5 minutter med verktøyet vårt gjør.</p>
</header>
<div class="wrap">
${blocks}
</div>
<footer>
  <h2>Bedre bilder. Bedre tekst. Riktig pris. Raskere salg.</h2>
  <p>Automatisk annonseoptimalisering for bilforhandlere: profesjonelle bilder, komplett salgstekst fra regnummer, og prisanalyse mot markedet — for hele lagerbeholdningen. Svar på e-posten for en uforpliktende pilot på 5 biler.</p>
</footer>
<div class="note">Demonstrasjon basert på deres offentlige FINN-annonser. Kun delt med dere. Bilder og annonser tilhører ${dealer}.</div>
</body></html>`;

  const file = `output/${slug(dealer)}.html`;
  writeFileSync(file, html);
  console.log("wrote", file, Math.round(html.length / 1024) + "kB");
}
