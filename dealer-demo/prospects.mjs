// Builds a prospect list of used-car dealers in Oslo from Brønnøysund's
// public Enhetsregisteret API (no key needed). Output: data/prospects.json
// with name, orgnr, address and website where registered.
//
// NACE 47.810 (SN2025): Detaljhandel med motorvogner.
import { writeFileSync } from "fs";

const KOMMUNE = process.env.KOMMUNE || "0301"; // Oslo
const NACE = "47.810"; // SN2025: Detaljhandel med motorvogner

const prospects = [];
let page = 0;
while (true) {
  const url =
    `https://data.brreg.no/enhetsregisteret/api/enheter` +
    `?naeringskode=${NACE}&kommunenummer=${KOMMUNE}&konkurs=false` +
    `&size=100&page=${page}`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`brreg ${res.status}`);
  const json = await res.json();
  const units = json._embedded?.enheter || [];
  for (const u of units) {
    prospects.push({
      name: u.navn,
      orgnr: u.organisasjonsnummer,
      website: u.hjemmeside || null,
      address: u.forretningsadresse
        ? `${(u.forretningsadresse.adresse || []).join(" ")}, ${u.forretningsadresse.postnummer} ${u.forretningsadresse.poststed}`
        : null,
      employees: u.antallAnsatte ?? null,
    });
  }
  if (page >= (json.page?.totalPages ?? 1) - 1) break;
  page++;
}

writeFileSync("data/prospects.json", JSON.stringify(prospects, null, 1));
console.log(`prospects: ${prospects.length} (kommune ${KOMMUNE})`);
console.log(`with website: ${prospects.filter((p) => p.website).length}`);
