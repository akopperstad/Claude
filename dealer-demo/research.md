# Hva kjennetegner forhandlerne som selger mest bil på FINN?

Empirisk studie, juli 2026. Datagrunnlag: 394 aktive annonser fra seks
avdelinger hos Norges største bruktbilaktører (Birger N. Haug, Bilia,
Bertel O. Steen, Sulland) sammenlignet med tre mindre Oslo-forhandlere,
pluss FINNs egne publiserte analyser (155 000 annonser) og eksperttips.

## 1. Slik er en FINN-bilannonse faktisk bygget opp

- **Overskrift**: genereres automatisk av FINN fra merke + modell.
  Forhandler styrer den ikke.
- **Modellbeskrivelse (spec-linjen)**: eneste frie tittelfelt,
  **maks 55 tegn**. Vises rett under overskriften og i søkeresultatet.
- **Nøkkelinfo**: strukturerte felter (årsmodell, km, drivstoff, gir,
  effekt). Fylles fra regnummer.
- **Utstyr**: en egen, strukturert seksjon lenger ned på siden, atskilt
  fra beskrivelsen. Fylles fra bilens registrerte data og vises som en
  søkbar liste (typisk 20-50 punkter). Dette er grunnen til at en bil kan
  ha 50 utstyrspunkter selv med en kort beskrivelse. Verktøyet henter
  denne verifiserte listen direkte fra annonsen.
- **Beskrivelse**: fritekstfelt. Støtter kun ren tekst, fet skrift og
  punktlister. Ingen farger, skrifttyper eller emoji.
- **Bilder**: første bilde = søkeresultatbildet.

All tittel-optimalisering skjer altså i én linje på 55 tegn.

## 2. Spec-linjen: hva topselgerne gjør

Målt på tvers av 283 annonser fra storaktørene:

| Funn | Storaktører | Små forhandlere |
|---|---|---|
| Snittlengde spec-linje | 44-52 av 55 tegn | 34 tegn (Storm Auto) |
| Store bokstaver (andel) | 18-40 % | opptil 99 % (CARHOUSE) |
| Struktur | motor/utstyrsnivå først, så 3-6 utstyrsord | tilfeldig |

Formelen som går igjen hos Bilia, Sulland og Bertel O. Steen:

```
<motorisering/utstyrsnivå> <effekt>, <3-6 søkbare utstyrsord>
Eks: "150HK tdi 4x4 El.skinnseter Led-Matrix Webasto R-kamera"
Eks: "xDrive25e, M-Sport, HeadUp, Rattvarme, Ryggekamera"
```

Prinsipper:
1. Bruk 45-55 av de 55 tegnene. Tomme tegn er tapt søketreff.
2. Normal skriftstørrelse med stor forbokstav per ord. Hele linjer i
   caps ser useriøst ut og brukes ikke av merkevareforhandlerne.
3. Velg utstyrsord folk faktisk søker på. Frekvens i studien:
   ryggekamera, hengerfeste/krok, ACC/adaptiv, skinn, panorama,
   Webasto, head-up, LED/Matrix.
4. Oppgi effekt (hk) og for elbil: reell rekkevidde i km.
5. Aldri skrivefeil, aldri samme ord to ganger.

## 3. Førstebildet: tydeligste fellestrekk av alle

Alle de seks storaktørene gjør det samme:

1. **Skrå forfra (trekvart vinkel)**, bilen fyller rammen.
2. **Merkevarebygget ramme**: logobanner i topp eller bunn av bildet
   (Birger N. Haug «Bruktbil PLUSS», Sulland-stripe, BOS-logo).
   Hele lagerbeholdningen ser enhetlig ut i søkeresultatene.
3. **Ensartet bakgrunn**: samme fotovegg/fotoplass for alle biler.
   Ikke kunstige kulisser, men konsekvent presentasjon.
4. Ren, nyvasket bil. Skilt synlig.

Konklusjon for produktet: ikke bytt ut bakgrunner med KI-genererte
kulisser. Optimaliser ekte bilder (lys, beskjæring, rekkefølge) og
legg på forhandlerens egen logoramme. Det er dette som skiller
proffene fra resten, og det er ærlig.

## 4. Beskrivelsen: hva topselgerne faktisk skriver

Studie av fulle annonsetekster fra ti annonser hos storaktørene
(Birger N. Haug, Bilia, Bertel O. Steen, Sulland). Snittlengde **3 099
tegn**, altså vesentlig lengre og mer komplett enn hos de mindre
forhandlerne. Andel som inneholder hvert element:

| Element | Storaktører | Små forhandlere |
|---|---|---|
| Kontakt med navn + telefon | 100 % | 100 % |
| Garantidetaljer (navn, varighet) | 100 % | 80 % |
| Velkommen / oppfordring | 100 % | 100 % |
| Innbytte | 90 % | 100 % |
| Full utstyrsliste (alt navngitt) | 90 % | 40 % |
| Finansiering med vilkår | 80 % | 100 % |
| «Hvorfor kjøpe hos oss» | 80 % | 0 % |
| Rekkevidde (km) | 70 % | 40 % |
| Ladetider | 70 % | 60 % |
| Frakt / levering | 60 % | 40 % |

Fellesnevneren, i rekkefølge, er en fast mal:

```
1. KJEKT Å VITE (punktliste: rekkevidde, tilhengervekt, lading, garanti)
2. Fortellende innledning (hva bilen er, tilstand, hvorfor attraktiv)
3. FULL UTSTYRSLISTE (alt navngitt, ikke oppsummert)
4. TILSTAND OG HISTORIKK (service, EU, eiere, hjulsett, ærlig om slitasje)
5. GARANTI (navn på program, varighet)
6. FINANSIERING (konkrete vilkår: 0 egenkapital, X år, bankpartner)
7. INNBYTTE
8. FRAKT OG LEVERING
9. KONTAKT (navngitt selger + telefon)
10. Sted og org.nr, velkommen
```

Viktigste forskjell fra de små: storaktørene **navngir alt utstyr** og
**dokumenterer tilstand og historikk**. De små komprimerer, og taper
poeng på nettopp det kjøperne rangerer høyest (se punkt 6).

## 5. Internasjonalt (Blocket.se, proof of concept)

Blocket er Sveriges FINN. Deres og bransjens funn:

- **65 % oppgir at «transparent informasjon om bilens tilstand og
  historikk» er den viktigste faktoren for å gjennomføre kjøpet.**
  Dette er det enkeltfunnet som betyr mest for produktet vårt.
- 9 bilder er optimalt (mot FINNs 10-29), godt kamera slår mobil.
- Beskriv bilens egenskaper, ikke alle kjøpere kjenner modellforskjeller.
- Rask respons på telefon, e-post og SMS. Treghet flytter interessen til
  neste bil.
- Bilene som selger raskest: høyere bakkeklaring og firehjulsdrift, ofte
  200 000-300 000 kr. VW T-Cross topper (44 % solgt innen en uke).

## 6. FINNs egne tall (deres publiserte analyser)

- 93 % av bilkjøpere ser på bildene først.
- 10-29 bilder gir raskest salg. Færre enn 5 skader salget.
- Beste bilde først, kontrollert på mobil.
- Forklar utstyret, ikke ram opp koder («ACC» skal forklares).
- Svar på det kjøpere lurer på: vinteregenskaper, hengerfeste,
  barneseter, innbytte.
- Tillitselementer (servicehistorikk, garanti, bytterett): brukere som
  klikker på dem kontakter selger i 28 % av tilfellene.
- En bil på lager koster ca. 300 kr dagen.
- Riktig priset og komplett annonse: salg på 14-21 dager.

## 5. Anbefalt annonsestandard (produktets regelsett)

1. Spec-linje: 45-55 tegn etter formelen over.
2. Førstebilde: trekvart forfra, optimalisert lys, logoramme.
3. 15-25 bilder i fast rekkefølge: eksteriør rundt bilen, interiør
   (dashbord, seter, bagasjerom), detaljer (felger, feste, skjerm).
4. Beskrivelse: kort innledning, utstyr med forklaring, praktisk-info
   (vinter, tilhenger, innbytte), tillitspunkter, oppfordring.
5. Pris: markedsjustert ukentlig; kutt ved fallende visninger/favoritter.
6. Republiser ved synkende plassering.

Kilder: FINN bedriftskunde («Bildebruk som selger», analyse av 155 000
bilannonser; «Ekspertens beste tips til bilannonser på FINN»); FINN
bilguiden og hjelpesenter; Blocket / mestmotor.se / carup.se; og egne
uttrekk av 394 + 15 aktive annonser per juli 2026.
