// Composes personalized cold-outreach emails for dealers with a generated
// demo page. Writes previews to output/emails/*.txt — NOTHING IS SENT.
// Sending happens only after human review, via your own mail client or an
// SMTP step added deliberately.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

const SENDER = {
  name: process.env.SENDER_NAME || "Arne Kopperstad",
  phone: process.env.SENDER_PHONE || "",
  email: process.env.SENDER_EMAIL || "post@pilhammer.no",
};

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Verified/candidate recipient addresses per dealer. Company addresses only.
const RECIPIENTS = {
  "Car4Sale AS": "post@car4sale.no",
  // carhouse.no (Carhouse Bilformidling, Oslo) lists this address — verify
  // it is the same CARHOUSE AS (Rugveien 44, Manglerud) before sending:
  "CARHOUSE AS": "post@manglerudbil.no (VERIFISER FØR SENDING)",
  "Storm Auto AS": "(ikke funnet automatisk, slå opp manuelt)",
};

// Dealers that have a demo page generated (from generate.mjs)
const listings = JSON.parse(readFileSync("data/demo-listings.json", "utf8"));
const byDealer = {};
for (const d of Object.values(listings)) {
  (byDealer[d.organisation_name] ||= []).push(d);
}

mkdirSync("output/emails", { recursive: true });

for (const [dealer, cars] of Object.entries(byDealer)) {
  const car = cars[0];
  const subject = `Vi forbedret ${car.make} ${car.model}-annonsen deres på FINN (gratis demo vedlagt)`;
  const body = `Hei ${dealer}!

FINNs egen analyse av 155 000 bilannonser viser at 93 % av kjøperne ser på bildene først, og at en bil som står usolgt koster forhandler rundt 300 kr dagen. Med bedre annonser selger dere raskere.

Vi hjelper bilforhandlere med nettopp dette på FINN: profesjonelle bilder, komplett og søkeoptimalisert salgstekst, og en spec-linje og prisanalyse bygget på hva de mest solgte forhandlerne faktisk gjør.

For å vise hva vi mener, tok vi ${cars.length === 1 ? "en av deres egne annonser" : cars.length + " av deres egne annonser"} og optimaliserte ${cars.length === 1 ? "den" : "dem"}. Den vedlagte demoen (kun delt med dere) viser før og etter, med en poengscore på hvor annonsen står i dag mot hva den kan bli.

Det tok under fem minutter. Tenk samme løft på hele lagerbeholdningen, hver gang dere legger ut en bil.

Vi tilbyr en uforpliktende pilot: vi optimaliserer fem av deres aktive annonser gratis. Liker dere resultatet, tar vi praten videre.

Er dette interessant? Svar på denne e-posten, så avtaler vi en kort prat.

Vennlig hilsen
${SENDER.name}
${SENDER.email}${SENDER.phone ? `\n${SENDER.phone}` : ""}

Denne henvendelsen er sendt til firmaadressen deres som en bedriftshenvendelse. Ønsker dere ikke flere e-poster fra oss, svar «stopp», så fjerner vi dere umiddelbart.`;

  const file = `output/emails/${slug(dealer)}.txt`;
  writeFileSync(
    file,
    `TO: ${RECIPIENTS[dealer] || "(fylles manuelt)"}\nSUBJECT: ${subject}\nATTACHMENT: output/${slug(dealer)}.html\n\n${body}\n`
  );
  console.log("wrote", file);
}
console.log("\nReview the drafts, fill sender details (SENDER_NAME etc.), then send manually or wire up SMTP.");
