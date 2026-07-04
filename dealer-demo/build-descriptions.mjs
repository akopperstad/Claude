// Assembles COMPLETE, FINN-authentic descriptions following the structure the
// top-performing dealers use. FINN descriptions support only: paragraphs,
// bold (strong), line breaks, and plain bullet lists. No colour, no emoji, no
// custom fonts. Output markup convention consumed by generate.mjs:
//   "## text"  -> bold header line
//   "- text"   -> bullet item
//   other      -> paragraph
import { readFileSync, writeFileSync } from "fs";

// Verified equipment (exact structured FINN "Utstyr" section per listing).
const equipment = JSON.parse(readFileSync("data/equipment.json", "utf8"));

const cars = {
  "468888593": {
    facts: [
      "Symmetrisk firehjulsdrift (AWD)",
      "Hengerfeste følger med",
      "119 200 km, lav kjørelengde for årsmodellen",
      "Nylig EU-godkjent og klargjort fra forhandler",
      "Skinnseter, navigasjon og ryggekamera",
    ],
    intro:
      "Praktisk og driftssikker kompakt-SUV med Subarus anerkjente symmetriske firehjulsdrift. Subaru XV er kjent for god fremkommelighet, høy komfort og driftssikkerhet, og passer like godt til bykjøring som til lengre turer. Med firehjulsdrift og god bakkeklaring er den et trygt valg for norske vintre.",
    condition:
      "Bilen fremstår som pen både innvendig og utvendig. 119 200 km er lav kjørelengde for årsmodellen. Leveres nylig EU-godkjent og klargjort fra forhandler. Plass til to barneseter i baksetet (Isofix). Både sommer- og vinterdekk på aluminiumsfelg følger med.",
    dealer: "storm",
  },
  "468887247": {
    facts: [
      "xDrive firehjulsdrift, 190 hk dieselmotor",
      "Automatgir",
      "Avtagbart hengerfeste",
      "Elektrisk soltak og panorama glasstak",
      "Skinninteriør og M Sport-pakke",
    ],
    intro:
      "Velholdt BMW X1 xDrive20d i sportslig M Sport-utførelse. En komfortabel SUV med sterk og drivstoffgjerrig 2,0-liters dieselmotor, automatgir og xDrive firehjulsdrift, en bil som passer like godt til hverdagskjøring som på vinterføre.",
    condition:
      "Pen og velholdt bil med servicehistorikk. Romslig bagasjerom gjør den familieklar. xDrive firehjulsdrift gir trygg fremkommelighet vinterstid. Både sommer- og vinterdekk følger med.",
    dealer: "storm",
  },
  "468885618": {
    facts: [
      "487 hk, firehjulsdrift (AWD)",
      "Rekkevidde inntil 500 km (WLTP)",
      "Hurtiglading 10 til 80 prosent på cirka 35 minutter",
      "Kun 24 600 km, fremstår som ny",
      "Resterende nybilgaranti følger bilen",
    ],
    intro:
      "Sjelden Ford Mustang Mach-E Rally, toppmodellen med rallyinspirert oppsett, hevet understell og et særpreget design inspirert av rallysport. En sportslig og eksklusiv elbil med firehjulsdrift, høy ytelse og unik grønn metallic-lakk. Nå har du muligheten til å sikre deg en av de mest spesielle utgavene av Mustang Mach-E.",
    condition:
      "Bilen fremstår som svært pen og godt vedlikeholdt. Ingen kjente feil eller mangler. Kun 24 600 km. Selges med resterende nybilgaranti.",
    dealer: "storm",
  },
  "468883172": {
    facts: [
      "170 hk hybrid, forbruk fra 0,38 l/mil",
      "1 eier, norsksolgt, førstegangsregistrert 30.12.2019",
      "To sett hjul følger med",
      "Nylig utført service, nye bremser foran",
      "Leveres EU-godkjent for 2 nye år",
    ],
    intro:
      "Toyota Corolla 1.8 Hybrid Touring Sports Active, markedets mest driftssikre hybrid, med lave driftskostnader og romslig bagasjeplass. En utrolig romslig bil med god kjørekomfort, praktisk og økonomisk familiebil som passer ypperlig til både sommer og vinter. Hybrid uten ladekabel, den lader seg selv under kjøring.",
    condition:
      "1-eiers norsksolgt bil, førstegangsregistrert 30.12.2019. Foreligger servicehistorikk. Nylig utført service og byttet bremser foran. Medfølger to sett hjul. Leveres ferdig EU-godkjent for 2 nye år.",
    dealer: "carhouse",
  },
  "468886883": {
    facts: [
      "Fri Supercharging som følger bilen",
      "Rekkevidde 506 km (NEDC), Motor.no testet til over 400 km",
      "Kjøpt ny i Norge, kun 1 eier",
      "Sist service utført juni 2026, EU-godkjent til juni 2028",
      "Panorama glasstak",
    ],
    intro:
      "Tesla Model S 85 med den ettertraktede fordelen fri Supercharging, lad gratis på Teslas hurtigladenettverk så lenge bilen lever. Gjennom Teslas Superlader-nettverk kommer du deg enkelt og sømløst rundt i både Norge og Europa. En godt utstyrt Model S til svært tilgjengelig pris, hvor fri lading alene gjør regnestykket interessant.",
    condition:
      "Kjøpt ny i Norge med kun 1 eier og komplett historikk. Sist service utført juni 2026. EU-godkjent, neste frist juni 2028. Tesla oppgir rekkevidde på 506 km etter NEDC-standarden, Motor.no har testet bilen til å gi over 400 km reell rekkevidde.",
    dealer: "car4sale",
  },
};

const dealers = {
  storm: {
    name: "Storm Auto AS",
    location: "Stålfjæra 12, 0975 Oslo",
    warranty: "Bruktbilgaranti følger med. Ta kontakt for detaljer om dekning.",
    financing:
      "Vi samarbeider med Santander Consumer Bank og tilbyr 100 % finansiering til gunstige betingelser. Forsikring ordnes via våre samarbeidspartnere.",
    tradein:
      "Vi tar innbytte og kan også selge din bil i kommisjon. Har vi ikke drømmebilen på lager, skaffer vi den via vårt kontaktnett i Norge eller utlandet.",
    delivery: null,
  },
  carhouse: {
    name: "CARHOUSE AS",
    location: "Rugveien 44, 0679 Oslo",
    warranty: "Bruktbilgaranti kan tegnes. Spør oss om garanti på din neste bil.",
    financing: "Vi tilbyr finansiering og forsikring via våre samarbeidspartnere.",
    tradein: "Vi tar innbytte, ta kontakt for en rask vurdering av din bil.",
    delivery: "Vi tilbyr gratis frakt over hele landet.",
  },
  car4sale: {
    name: "Car4Sale AS",
    location: "Visningssted Lambertseter, Oslo. Ta kontakt på forhånd for visning.",
    warranty:
      "Utvidet garanti tilbys i inntil 3 år for biler under 300 000 km eller under 20 år.",
    financing:
      "Car4Sale er godkjent låne- og forsikringsagent, og samarbeider blant annet med Nordea. Vi tilbyr finansiering helt ned i kr 0 i egenkapital med lav rente.",
    tradein: "Ta kontakt med oss for å få vite raskt hva vi kan tilby deg i innbytte.",
    delivery: "Vi tilbyr frakt i hele landet.",
    phone: "Telefon 994 99 996, telefontid 10:00 til 21:00.",
  },
};

function build(id) {
  const c = cars[id];
  const d = dealers[c.dealer];
  const eq = equipment[id] || [];
  const L = [];

  L.push("## Kjekt å vite om denne bilen");
  c.facts.forEach((f) => L.push("- " + f));
  L.push("");
  L.push(c.intro);
  L.push("");
  L.push("## Tilstand og historikk");
  L.push(c.condition);
  L.push("");
  L.push("## Utstyr");
  eq.forEach((e) => L.push("- " + e));
  L.push("");
  L.push("## Garanti");
  L.push(d.warranty);
  L.push("");
  L.push("## Finansiering og forsikring");
  L.push(d.financing);
  L.push("");
  L.push("## Innbytte");
  L.push(d.tradein);
  if (d.delivery) {
    L.push("");
    L.push("## Frakt og levering");
    L.push(d.delivery);
  }
  L.push("");
  L.push("## Kontakt");
  if (d.phone) L.push(d.phone);
  L.push(`${d.name}, ${d.location}`);
  L.push("Ta kontakt for visning og prøvekjøring. Velkommen til en trygg og hyggelig handel.");
  return L.join("\n");
}

const out = {};
for (const id of Object.keys(cars)) out[id] = build(id);
writeFileSync("data/full-descriptions.json", JSON.stringify(out, null, 1));
for (const id of Object.keys(out)) {
  console.log(id, out[id].length, "tegn,", (equipment[id] || []).length, "utstyr");
}
