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

// Dealers that have a demo page generated (from generate.mjs)
const listings = JSON.parse(readFileSync("data/demo-listings.json", "utf8"));
const byDealer = {};
for (const d of Object.values(listings)) {
  (byDealer[d.organisation_name] ||= []).push(d);
}

mkdirSync("output/emails", { recursive: true });

for (const [dealer, cars] of Object.entries(byDealer)) {
  const car = cars[0];
  const subject = `${car.make} ${car.model}-annonsen deres på FINN — vi gjorde den bedre (gratis demo)`;
  const body = `Hei!

FINNs egen analyse av 155 000 bilannonser viser at 93 % av kjøperne
ser på bildene først — og at en bil som står usolgt koster forhandler
rundt 300 kr dagen.

Vi hjelper bilforhandlere å selge raskere på FINN: profesjonelle
bilder, komplett salgstekst generert fra regnummeret, og prisanalyse
mot markedet.

For å vise hva vi mener tok vi ${cars.length === 1 ? "en av deres annonser" : cars.length + " av deres annonser"} og
optimaliserte ${cars.length === 1 ? "den" : "dem"} — se vedlagt demo (kun delt med dere):

    → Vedlagt: demo for ${dealer}

Det tok under 5 minutter per bil. Tenk hele lagerbeholdningen,
automatisk, hver gang dere legger ut en bil.

Uforpliktende pilot: vi optimaliserer 5 av deres aktive annonser
gratis. Liker dere resultatet, snakker vi videre.

Interessert? Svar på denne e-posten.

Vennlig hilsen
${SENDER.name}${SENDER.phone ? `\n${SENDER.phone}` : ""}
${SENDER.email}

--
Denne henvendelsen er sendt til firmaadressen deres som en
bedriftshenvendelse. Ønsker dere ikke flere e-poster fra oss,
svar «stopp» så fjerner vi dere umiddelbart.`;

  const file = `output/emails/${slug(dealer)}.txt`;
  writeFileSync(
    file,
    `TO: (fylles fra data/prospects-emails.json eller manuelt)\nSUBJECT: ${subject}\nATTACHMENT: output/${slug(dealer)}.html\n\n${body}\n`
  );
  console.log("wrote", file);
}
console.log("\nReview the drafts, fill sender details (SENDER_NAME etc.), then send manually or wire up SMTP.");
