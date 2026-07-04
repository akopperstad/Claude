# Konkurranseanalyse: hva de beste bilforhandlerne på FINN gjør

Formål: forstå nøyaktig hva de mest solgte forhandlerne gjør i annonsene
sine, slik at verktøyet vårt kan bringe en hvilken som helst forhandler
opp på samme nivå, eller over. Basert på fulle annonsetekster fra
Birger N. Haug, Bilia, Bertel O. Steen og Sulland (juli 2026), samt FINNs
egne analyser og Blocket-data fra Sverige.

## Slik er en FINN-bilannonse bygget (hva forhandler faktisk styrer)

| Felt | Hvem styrer | Grense |
|---|---|---|
| Overskrift (merke + modell) | FINN, automatisk | — |
| Modellbeskrivelse (spec-linje) | Forhandler | 55 tegn |
| Nøkkelinfo (år, km, effekt) | Fra regnummer | strukturert |
| **Utstyr** | Fra regnummer/registrering | strukturert liste |
| Beskrivelse (fritekst) | Forhandler | bold + punktliste |
| Bilder | Forhandler | rekkefølge fritt |

Viktig funn: **utstyrslisten er et eget, strukturert felt** på FINN
(«Utstyr»-seksjonen), atskilt fra beskrivelsen. Den fylles fra bilens
registrerte data. Det er derfor man ser 37-50 utstyrspunkter på en bil
selv når beskrivelsen er kort. Verktøyet vårt henter denne verifiserte
listen direkte, ikke gjettede punkter.

Beskrivelsen støtter kun ren tekst, fet skrift og punktlister. Ingen
farger, ingen egne skrifttyper, ingen emoji. Alle toppforhandlerne holder
seg til dette.

## De tre mesterne, dekonstruert

### Birger N. Haug (gullstandarden)
1. **«Kjekt å vite om denne bilen»** som fet overskrift, så en punktliste
   med de viktigste fakta: rekkevidde WLTP, tilhengervekt, ladetider (med
   NAF-testtall), garanti.
2. **Fortellende avsnitt som selger opplevelsen**, ikke bare data. Google
   infotainment forklart med konkrete eksempler («Hey Google, skru på
   setevarme»).
3. **Forklarer utstyrspakker i klartekst** (Plus- og Pilot-pakken listes
   med hva de faktisk inneholder), aldri bare kodenavn.
4. **GARANTI** som egen seksjon (CarProtect, 1 år).
5. **«Kan trekke frem»**: et kuratert høydepunkt-utvalg av det beste
   utstyret.
6. **Beliggenhet** med full adresse.
7. **Innbytte med konkret oppskrift**: be kjøper oppgi regnr, km,
   utstyrsnivå, prisforventning.
8. **Finansiering** (Santander, inntil 10 år, 100 %), **forsikring**,
   **registrering** (Autoreg-forhandler, ordner alt selv).

### Bertel O. Steen
1. **«Hvorfor kjøpe bruktbil hos Bertel O. Steen?»** selger tillit med
   tall: over 15 000 biler årlig, en av Norges største og mest erfarne.
2. **Finans** (lån uten egenkapital, inntil 10 år).
3. **Innbytte** med lenke til egen prosess.
4. **Frakt og levering i hele Norge.**
5. **Navngitte selgere med telefonnummer.**
6. **Org.nr** og velkomsthilsen.

### Bilia
1. **Personlig åpner**: «Vi på Bilia Skøyen har nå fått inn ...»
2. **Navngitte kontaktpersoner med telefon tidlig** i teksten.
3. **Modellhistorie**: hvorfor nettopp denne modellen er bra.
4. **«Bilia Complete»** garanti med presise vilkår (20 000 km / 24 mnd).
5. **«Autorisert merkeforhandler og -verksted»** som tillitsmarkør.
6. **Beliggenhet** (E-18 mellom Lysaker og Skøyen) og **åpningstider**.
7. **Ærlighetsnotat**: åpent om at interiør kan være kunstskinn av
   miljøhensyn. Dette er transparens satt i system.

## Fellesnevnere hos vinnerne (malen verktøyet skal treffe)

1. Fakta først (Kjekt å vite / spec-sammendrag).
2. Forklar, ikke kod: utstyr og pakker beskrives med kjøperfordel.
3. Tillitsseksjon: hvorfor kjøpe hos oss (størrelse, autorisasjon, år).
4. Garanti: navngitt program + varighet.
5. Finansiering: konkret (bank, 0 egenkapital, antall år).
6. Innbytte: gjerne med prosess.
7. Frakt og levering: landsdekkende.
8. Navngitt kontaktperson + telefon, ikke anonym.
9. Beliggenhet + åpningstider + org.nr.
10. Ærlighet om tilstand og materialer. Blocket: **65 % oppgir at
    transparent informasjon om tilstand og historikk er den viktigste
    faktoren for å fullføre kjøpet.**
11. Velkomsthilsen som avslutning.

## Der de mindre forhandlerne taper (våre demo-caser)

| Svakhet | Storm Auto | CARHOUSE | Car4Sale |
|---|---|---|---|
| Spec-linje under 55 tegn / caps | ja | ja (99 % caps) | delvis |
| Utstyr ikke løftet i beskrivelsen | ja | ja | nei |
| Mangler tillits-/hvorfor-oss-seksjon | ja | ja | delvis |
| Skrivefeil i spec-linjen | nei | nei | ja («Gratisk») |
| Uryddig bildestart uten enhetlig ramme | ja | ja | ja |
| Førsteinntrykk på mobil | svakt | svakt | middels |

De har ofte de riktige elementene (finansiering, innbytte, garanti), men
presenterer dem uten struktur, uten fet seksjonsinndeling, og med spec-
linjer og bilder som ikke matcher storaktørene. Det er nettopp gapet
verktøyet lukker.

## Hva «best of the best» betyr for produktet

Verktøyet skal, per bil, produsere:
1. Spec-linje på 45-55 tegn etter vinnernes formel.
2. Førstebilde: trekvart forfra, lysoptimalisert, enhetlig logoramme.
3. Beskrivelse etter vinnermalen: Kjekt å vite, fortelling, komplett og
   verifisert utstyr, tilstand og historikk, garanti, finansiering,
   innbytte, frakt, navngitt kontakt, beliggenhet, velkomst.
4. Alt i FINN-godkjent format: ren tekst, fet skrift, punktlister.
5. Ærlighet om tilstand, fordi det er kjøpernes viktigste faktor.

Måltall: bringe en gjennomsnittlig liten-forhandler-annonse fra rundt
40-50 av 100 opp til over 90, målt på spec-linje, førstebilde,
beskrivelse, tillitselementer og komplett informasjon.

Kilder: egne uttrekk av aktive annonser fra Birger N. Haug, Bilia,
Bertel O. Steen og Sulland; FINN bedriftskunde og bilguiden; Blocket /
mestmotor.se / carup.se. Juli 2026.
