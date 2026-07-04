# Dealer-demo — annonseoptimalisering for bilforhandlere

Pipeline som lager «før/etter»-demoer av forhandleres egne FINN-annonser og
klargjør personlig cold-outreach. Ingenting sendes automatisk — alle utkast
gjennomgås manuelt.

## Flyt

```
1. Plukk annonser        →  data/demo-listings.json  (fra FINN-søk, manuelt utvalg)
2. node enhance.mjs      →  images/enhanced/          (auto-levels, beskjæring, skarphet)
3. Skriv/juster tekst    →  data/copy.json            (ny tittel, salgstekst, prisverdikt)
4. node generate.mjs     →  output/<forhandler>.html  (selvstendig før/etter-side, bilder innbakt)
5. node prospects.mjs    →  data/prospects.json       (Brreg: alle bilforhandlere i Oslo, NACE 47.810)
6. node emails.mjs       →  data/prospects-emails.json (e-post fra forhandlernes nettsider)
7. node outreach.mjs     →  output/emails/*.txt       (personlige utkast, IKKE sendt)
```

## Viktige rammer

- **Demo-sidene deles kun med forhandleren de gjelder** — bildene er deres.
- **Skraping av FINN i skala bryter FINNs vilkår.** Utvalget her er en håndfull
  annonser for demonstrasjon; selve produktet skal bruke forhandlerens egne
  bilder (opplasting), ikke FINN-data.
- **Markedsføringsloven:** utsendelse kun til firmaadresser (post@/salg@),
  alltid med opt-out. `emails.mjs` prioriterer generiske adresser.
- Sending skjer manuelt eller via bevisst tilkoblet SMTP — aldri automatisk.

## Neste steg mot produkt

- Regnr → spesifikasjoner (Statens vegvesen API) for automatisk salgstekst
- Generativ bildebehandling (bakgrunnsbytte, showroom-look)
- Dashboard for forhandler: hele lagerbeholdningen, batch-kjøring
- Prisanalyse-motor med solgt-data per modell
