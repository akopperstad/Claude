# DESIGN-SPEC.md — Vøling revamp, FINAL (single source of truth)

Fastsatt 2026-07-05. Dette dokumentet erstatter de tre retningsspesifikasjonene
(spec-editorial.md, spec-premium-varme.md, spec-konvertering.md). Grunnmuren er
«Konverteringshåndverk» (juryens vinner); alle salvage-punkter fra begge juryrundene er
innarbeidet og alle konflikter er avgjort her. Det finnes ingen valgfrihet i dette dokumentet —
alt er endelig.

Låst merkevare (DECISIONS.md): D7 scandi premium minimal, varm og ærlig · A13 lowercase
«vøling»-ordmerke, dyp grangrønn aksent, ø-streken som eneste merkegest · A11 navnet Vøling ·
gratis kvotebegrenset beta, betaling utsatt · bokmål. Funksjonskontrakten i ref-current.md §2
overlever uendret — kopiert inn som §9 «DO NOT BREAK».

---

## 1. Design stance

Hvert viewport skal besvare ett spørsmål: **«hvorfor prøve dette akkurat nå?»** — og svaret er
alltid det samme artefaktet: vår egen før/etter-fotografering. Skyveren er ikke en feature-demo;
den er det gjentakende heltemotivet på hver side, innrammet som montert trykk på varmt papir.

Strukturen er redaksjonell: hårlinjer, mono-indeksetiketter, setnings-overskrifter som slutter
med punktum. Hierarki bæres av linjetykkelse (regelvekt), aldri av bokser eller skygger på flate
tekstflater. Én aksent — den låste grangrønne — rasjoneres til nøyaktig det vi vil ha klikket,
slik at øyets vei til CTA er entydig. Sosialt bevis er bare det vi kan bevise: ekte
produktmekanikk (beste-av-3 geometri), ekte tall (kvote, nivåer), ekte finskrift. Den
ærligheten ER konverteringsstrategien i Norge.

Varmen kommer fra papiret (aldri hvitt), fra fotomonteringen (innfelt hårlinje + varm skygge på
fotografiet — bildene er produktet og fortjener rammen), og fra stemmen i teksten: rolige, hele
setninger som snakker til en boligeier («Gjør det til ditt.», «huset er fortsatt seg selv»).

Håndhevet disiplin: **hvert eneste tekstelement på nettstedet er nøyaktig én av de 13 navngitte
typerollene i §2.2** — ingen ad-hoc-størrelser, ingen mellomting. Det er denne regelen som gjør
at en énpass-revamp forblir koherent.

Null AI-site-tells: ingen gradienter, ikke glass, ikke emoji, ingen falske sitater, ingen
hover-løft på kort, ingen skeleton-shimmer. Et linjert norsk dokument som selger ekstremt hardt.

---

## 2. Tokens

Alle eksisterende variabelNAVN i `tokens.css` beholdes (omdøping feier gjennom globals.css +
inline TSX-bruk). Verdier retunes; tokens merket ✚ er nye. Fire temablokker som i dag:
`:root`, `@media (prefers-color-scheme: dark)`, `:root[data-theme="dark"]`,
`:root[data-theme="light"]` — hver ny token speiles i alle fire.

### 2.1 Farge

| Token | Lys | Mørk | Rolle |
|---|---|---|---|
| `--paper` | `#f7f4ec` | `#161511` | Lerret. Varmere enn dagens `#faf8f4` så foto og kort får relieff. Aldri rent hvitt/svart. |
| `--card` | `#fffdf8` | `#1e1c17` | Paneler, resultatkort. I mørkt tema er `--card` bevisst LYSERE enn `--paper` — verdisteget bærer dybden (se §2.5). |
| `--ink` | `#1c1a15` | `#ece8dc` | Primærtekst. |
| `--muted` | `#6f6a5c` | `#a49d8a` | Sekundærtekst. Mørknet fra `#837e73` (~3.4:1) til ≥4.6:1 (AA) på papir. |
| `--line` | `#e5dfd2` | `#2d2a23` | Hårlinjer: 1px-regler overalt. |
| ✚ `--line-sterk` | `#cfc8b6` | `#4a4433` | Fremhevet hårlinje (kolonnedelere, sumlinje i tabell). |
| ✚ `--regel-ink` | `rgba(28,26,21,.75)` | `rgba(236,232,220,.65)` | 1px «åpningsregel» over lister/prissøyler (hierarki via regelvekt). |
| `--gran` | `#2e4a3b` (låst) | `#8fb49c` | Merkeaksent: logo, primær-CTA, lenker, valgt-tilstand, `::selection`. |
| `--gran-hover` | `#253d30` | `#a5c6b1` | Hover på `--gran`-fyll. |
| ✚ `--gran-kontrast` | `#f5f8f4` | `#12231a` | Tekst/ikoner PÅ `--gran`-fyll (mørk-gran er lys, så teksten der er nesten svart — aldri hardkodet `#fff` i knapper). |
| `--gran-lys` | `#e6ede5` | `#22352a` | Rolige tonede flater: valgt kort, poeng-chips. |
| `--gran-ink` | `#2b5138` | `#a9cfb5` | Tekst på `--gran-lys`. |
| ✚ `--gran-dyp` | `#1e3428` | `#122019` | Det ENE fullbredde-aksentmaterialet: sluttappell-bånd + footer. Flat farge, ingen gradient, ingen grain. |
| ✚ `--gran-dyp-ink` | `#edf2ea` | `#e6ece3` | Overskriftstekst på `--gran-dyp`. |
| ✚ `--gran-dyp-mute` | `#a8bcab` | `#93a897` | Sekundærtekst på `--gran-dyp`; hårlinjer der: `rgba(237,242,234,.22)`. |
| `--varsel-bg` | `#f4ead7` | `#37301f` | `.hint` (søknadsplikt, kvote, feil). |
| `--varsel-ink` | `#74551f` | `#d8b46c` | Tekst i `.hint`. |
| ✚ `--fokus` | `#2e4a3b` | `#8fb49c` | Fokusring (2px outline, offset 2px). |
| ✚ `--tag-bg` | `rgba(20,19,15,.78)` | `rgba(0,0,0,.66)` | FØR/ETTER-pillene på bilder. |
| ✚ `--tag-ink` | `#f7f4ec` | `#f7f4ec` | Tekst i FØR/ETTER-piller. |
| ✚ `--overlay` | `rgba(20,19,15,.8)` | `rgba(8,7,4,.82)` | Lysboks-bakteppe. Aldri hardkodet rgba i globals.css. |
| ✚ `--fotokant` | `rgba(32,36,29,.08)` | `rgba(236,231,218,.10)` | «Montert trykk»-hårlinjen innfelt over alle fotorammer (§4.7-anatomi). |
| ✚ `--skygge-rgb` | `28 26 21` | `0 0 0` | RGB-triplet for skyggealfaer. |

Globalt: `::selection { background: var(--gran); color: var(--gran-kontrast); }`.

### 2.2 Typografi — de 13 rollene (håndhevet)

**Familie.** Én tekstfont + system-mono. **Schibsted Grotesk** via `next/font/google`
(build-time bundling, ingen runtime-CDN), vekter 400/500/600, `subsets: ['latin','latin-ext']`
(ø/å/æ), `display: 'swap'`, `variable: '--font-sans'`. Norsktegnet grotesk — proveniensen er
del av historien, og ingen AI-mal shipper den. I tokens.css:
`--font: var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif);`
`--font-mono: ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", Menlo, monospace;`
(uendret — null nedlastingsvekt; mono er kun etiketter/tall).

**Regel: hvert tekstelement er nøyaktig én av disse rollene.** Denne tabellen ER
implementasjonssjekklisten — gå gjennom hvert DOM-tekstelement og bind det til én rad.

| # | Rolle | Familie | Størrelse | Vekt | Tracking | LH | Case |
|---|---|---|---|---|---|---|---|
| 1 | Display (`.display`, hero-h1) | Grotesk | `clamp(38px, 6.4vw, 72px)` → `--fs-display` | 500 | −0.025em | 1.04 | Setning, slutter med punktum |
| 2 | Seksjons-h2 (`.sekttl`) | Grotesk | `clamp(28px, 3.6vw, 42px)` → `--fs-h2` | 500 | −0.02em | 1.1 | Setning, punktum |
| 3 | Kort-/nivå-/pristittel (`.niva h3`, `.kort h3`, prisnavn-tittel) | Grotesk | 20px | 600 | −0.01em | 1.3 | Setning |
| 4 | Lede (`.lede`, `.blokklede`) | Grotesk | `clamp(17px, 1.5vw, 19px)` | 400 | 0 | 1.55 | Setning; `--muted`; `max-width: 56ch` |
| 5 | Body (`--fs-body`) | Grotesk | 16px | 400 | 0 | 1.6 | — ; `max-width: 60ch` |
| 6 | Small (`--fs-small`, `.illu`, finskrift) | Grotesk | 13.5px | 400 | 0 | 1.5 | `--muted` |
| 7 | Eyebrow / mono-etikett (`.seklabel`, `.eyebrow`, `.label`, `.tallrekke`-etiketter, badge-tekst) | Mono | 11.5px | 500 | +0.18em → `--track-label` | 1 | UPPERCASE, `--muted`; indekstall i `--gran` |
| 8 | Prisbeløp (`.amount`) | Mono | 30px | 500 | −0.01em | 1 | `font-variant-numeric: tabular-nums`; suffiks `small` 13.5px muted, ALDRI tracket |
| 9 | Kjempenumeraler (`.radnr`) | Mono | `clamp(2.5rem, 5vw, 4rem)` (40→64px) | 500 | −0.02em | 1 | `--gran` — seksjonens største element, landingens ene selvsikre typografiske øyeblikk |
| 10 | Små numeraler (`.stegnr` 15px i ring, `.niva .num` 13px) | Mono | 15px / 13px | 500 | −0.01em | 1 | `--gran` |
| 11 | Knappetikett (`.btn`) | Grotesk | 15px (`.stor`: 16.5px) | 600 | +0.01em | 1 | Setning |
| 12 | Nav-lenke | Grotesk | 14px | 500 | +0.02em | 1 | Setning, `--ink` @78% → 100% hover |
| 13 | FØR/ETTER-tag (`.taglabel`) | Mono | 10.5px | 600 | +0.14em | 1 | UPPERCASE |

Regler: overskrifter er hele deklarative setninger med punktum (Seawise-lærdommen) —
selvsikkerhet gjennom stemme, ikke fet vekt. UPPERCASE finnes KUN i mono-etikettskala.
`text-wrap: balance` på `.display` og `.sekttl`. `font-feature-settings: "tnum"` på alle
mono-tall i tabeller.

### 2.3 Spacing

4px-base; `--gap: 8px` beholdes. Navngitte steg: 4, 8, 12, 16, 24, 32, 48, 64, 96.

- `--maxw: 1120px` (opp fra 1080); sidepadding 20px mobil / 32px ≥860px.
- Seksjonspadding: `64px 0` mobil → `96px 0` ≥860px (bevisst tettere enn Pilhammers 160 —
  en konverteringsside holder neste svar innenfor en halv scroll).
- Kicker → h2: 16px. h2 → lede: 16px. Lede → innholdsblokk: 40px.
- Grid-gutter: 32px desktop, 20px mobil. Kolonnedelere: `border-left: 1px var(--line)` + 32px padding-left.
- Listerader (`.rad`, prisfeatures): 12px internt gap; rader delt av hårlinje + 24px padding.

### 2.4 Radier

| Token | Verdi | Bruk |
|---|---|---|
| `--radius` (behold navn) | 8px | Knapper, felter (`.felt`), `.hint`, dropzone |
| ✚ `--radius-kort` | 12px | Kort, paneler, nivåkort, lysboks |
| ✚ `--radius-bilde` | 14px | Fotorammer: `.cmp`, stilstripe-thumbs, finn-thumbs |
| ✚ `--radius-chip` | 999px | Chips, badges, poeng-tags, FØR/ETTER-piller, bryter |

### 2.5 Skygger + mørk dybde-doktrine

Skygge er reservert **fotografi og flytende lag** — aldri på flate tekstkort (hårlinjer bærer
dem).

| Token ✚ | Verdi |
|---|---|
| `--skygge-bilde` | `0 1px 2px rgb(var(--skygge-rgb) / .05), 0 16px 40px -20px rgb(var(--skygge-rgb) / .25)` |
| `--skygge-flyt` | `0 8px 24px -8px rgb(var(--skygge-rgb) / .18)` (lysboks-piler; klistre-CTA bruker toppvariant `0 -8px 24px -8px …`) |
| `--skygge-lysboks` | `0 24px 64px -16px rgb(var(--skygge-rgb) / .35)` |

**Mørk dybde-doktrine (håndhevet QA-regel):** i mørkt tema kollapser skyggene til ~0
(via `--skygge-rgb: 0 0 0` på nesten-svart papir) — og det som ERSTATTER dem er verdisteg:
`--card` er ett hakk lysere enn `--paper` (`#1e1c17` mot `#161511`) og hver flate holder sin
1px `--line`-kant. Dybde i mørkt = verdisteg + kant, aldri skygge. Foto på mørkt papir får i
tillegg fotokanten (§2.6) i lys rgba så himmelen i før-bilder ikke blør ut i lerretet.
Uten dette shipper mørkt tema flatt — dette er en release-blokker, ikke et ønske.

### 2.6 Kanter og fotomontering

- Hårlinje: `1px solid var(--line)` — seksjonsdelere, rader, kortkanter, kolonnedelere.
- Sterk: `1px solid var(--line-sterk)` — sumlinje i tabell, delere som må leses på et blikk.
- Åpningsregel: `1px solid var(--regel-ink)` — den mørkere regelen som ÅPNER en liste eller
  prissøyle (hierarki via regelvekt).
- Hver seksjon på landingssiden: `border-top: 1px solid var(--line)` (linjert-dokument-følelse).
- **Montert trykk (alle fotorammer):** hver ramme (`.cmp`, `.stilbilde`, `.finnbilder` thumbs,
  lysboks-bilde, båndets før/etter-par) får `position: relative` + `::after { content:'';
  position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  box-shadow: inset 0 0 0 1px var(--fotokant); }` — den innfelte hårlinjen som gjør et bilde
  til et montert trykk. Én CSS-regel, ren håndverk; beskytter lyse himler mot varmt papir i
  begge temaer.

---

## 3. Layoutmønstre (navngis én gang, gjenbrukes)

- **KANT**: 12-kolonners grid, `--maxw`-container, 32px gutter.
- **KICKER-SKINNE**: seksjonshode på KANT — mono-etikett i kol 1–3 (`01 / STILER`,
  indekstall i `--gran`, `/` @50% opasitet), h2 + lede i kol 4–12. Stables ved ≤860.
- **REGELLISTE**: rader åpnet av `--regel-ink`-toppregel, delt av `--line`-hårlinjer;
  radgrid = mono-numeral (kol 1) · tittel (kol 2–5) · beskrivelse (kol 6–12).
- **SØYLER**: N like kolonner, hver åpnet av egen toppregel (`--regel-ink`), ingen
  kortbakgrunner — brukes til priser og ærlighetsseksjonen.
- **BÅND**: fullbredde `--gran-dyp`-flate, KANT inni; all tekst `--gran-dyp-ink` /
  `--gran-dyp-mute`; hårlinjer `rgba(237,242,234,.22)`.

---

## 4. Sideblåkopier (endelig bokmålstekst — ikke lorem)

### 4.1 `/` — Landing

Seksjonsrekkefølgen er konverteringsargumentet: vis → bevis → forklar → pris → be.

**1. Nav (`nav.site`)** — sticky topp, solid papirbakgrunn `var(--paper)` uten blur
(full dekning — underliggende innhold skal aldri leses gjennom baren), bunnhårlinje
vises først etter 8px scroll (border-color transparent → `var(--line)`). Venstre: `Logo`
(markup urørt — CSS-ø-en er strukturell). Høyre `.links`: `Stiler · Slik virker det · Priser`
+ `.btn` **«Prøv gratis»** → `/ny`. Nav-CTA-en er eneste fylte element over folden ved siden
av hero-CTA-en. ≤560px: ankerlenker skjult, logo + CTA står.

**2. Hero (`.hero`)** — KANT: tekst kol 1–5, `CompareSlider` kol 6–12, topp-justert.
≤860: stablet, skyver rett etter CTA (motivet skal på første mobilskjerm).

- `.seklabel`: `GRATIS BETA · NORSK BOLIGVISUALISERING`
- `h1.display`: **«Se huset ditt ferdig oppusset — før du begynner.»** Ordet «ferdig» bærer
  `.marker`: én håndsatt gran-understrek (inline SVG, `--gran`, rotert −1.5°) — ø-strek-gesten
  i sideskala. Maks én per side. (Ingen oker/leire — grønn er eneste aksentfarge, A13.)
- `p.lede`: «Last opp ett bilde av boligen. Vøling viser fasaden i ny farge, ny kledning —
  eller som noe helt nytt. Ferdig på et par minutter.»
- `Link.btn.stor`: **«Prøv med ditt eget bilde»** → `/ny`. Under: tekstlenke (14px, `--gran`,
  tegnet pil →): «…eller se stilene først ↓» → `#stiler`.
- `.trust` (3 spans, 13.5px muted): **hakene er tynne 1.5px gran-SVG-haker** (CSS-mask eller
  inline data-URI på `::before` — IKKE tekstglyfen «✓»; skarpere ved 13px og lik på alle
  plattformer): «Uten konto» · «10 gratis poeng hver dag» · «Klart på 1–2 minutter».
- Skyver: `base.jpg` mot `sort-minimalisme.jpg`, rammet per §5.7. Bildetekst under
  (`.illu`): **«Sort minimalisme — generert av Vøling fra originalfotoet. Dra i linjen.»**
  Setningen «Dra i linjen.» lærer bort interaksjonen i tekst — derfor finnes det INGEN
  animert skyver-nudge (se §6, avgjort).

**3. Tallrekke (✚ `.tallrekke`)** — datastripe med stat-strip-anatomi: fullbredde stripe
mellom to hårlinjer, hver kolonne åpnet av hårlinje-topp med 16px padding-top, 4 like
kolonner (2×2 ved ≤560). Anatomi per kolonne: **mono-etikett (rolle 7) ØVERST, kort verdi
under i Grotesk 17px/600, −0.01em** — etikett-over-verdi gjør at innholdet leses som data,
ikke markedsføring. Verdiene er korte; forklaringen bor i etiketten:

| etikett | verdi |
|---|---|
| `NIVÅER — FRA FARGE TIL VISJON` | «4» |
| `STILER FOR NORSKE HUS` | «7» |
| `GEOMETRI` | «Beste av 3» |
| `PRIS I BETA` | «0 kr · 10 poeng/dag» |

Regel: vis aldri et tall vi ikke måler. Hvis en levende teller shipper («N visualiseringer
i beta», fra telemetry.jsonl via `/api/stats`), erstatter den kolonne 3. Inntil da: bare
produktfakta.

**4. `#stiler` (`section.sek`)** — KICKER-SKINNE, etikett `01 / STILER`.
- `h2.sekttl`: «Syv stiler som kler norske hus.»
- `p.blokklede`: «Kuratert for norsk byggeskikk og norsk lys — fra sørlandshvit til sort
  minimalisme.»
- `StyleStrip` (kun browsing, som i dag). Kortenes bildetekst er mono-nummerert (§5.6):
  `01 · SØRLANDSHVIT` … `07 · HERSKAPELIG` — nettstedet er en indeks over seg selv, og
  nummereringen speiler nivåstigen i produktet.
- Under stripen, `.illu`: **«Alle bildene er generert av Vøling på samme hus.»**
  (produktbevis forkledd som bildetekst). Høyrestilt tekstlenke: «Prøv en stil på ditt hus →»
  → `/ny`.

**5. Nivåer (✚ ny landingsseksjon)** — KICKER-SKINNE, etikett `02 / NIVÅER`.
- `h2.sekttl`: «Fire nivåer. Du bestemmer hvor langt du vil gå.»
- 4 SØYLER (2×2 ved ≤860, 1-kol ≤480), hver: mono-numeral, 20px tittel, én løftesetning,
  poeng-badge (§5.10). Teksten er IDENTISK med nivåkortene i verkbenken (gjenkjennelse fra
  landing til produkt):
  1. **Farge** — «Ny farge på kledningen. Alt annet står urørt.» — `1 poeng`
  2. **Overflater** — «Ny kledning, nytt tak, nye lister — huset beholder formen.» — `1 poeng`
  3. **Oppgradering** — «Nye vinduer, inngangsparti og beplantning — huset er fortsatt
     seg selv.» — `2 poeng`
  4. **Visjon** — «Full arkitektonisk omtenkning. Se hva huset kunne vært.» — `3 poeng`
- Mikrotekst under (13.5px muted): «Poeng er dagskvoten i gratis-betaen. En render koster
  nivåets vekt — kvoten nullstilles hver dag.» (Kvotetransparens = forhåndsvisning av
  prismodellen.)

**6. `#slik` — Slik virker det** — KICKER-SKINNE, etikett `03 / SLIK VIRKER DET`, så
REGELLISTE. `.radnr` bruker rolle 9 — kjempenumeraler `01 02 03` i `--gran`,
`clamp(2.5rem, 5vw, 4rem)`, seksjonens største element:
  1. **Last opp ett bilde** — «Ta bildet rett forfra i dagslys — eller prøv eksempelhuset først.»
  2. **Velg nivå og stil** — «Fra forsiktig ny farge til full visjon. Skriv egne ønsker om du vil.»
  3. **Sammenlign og juster** — «Dra i før/etter-skyveren, og be om endringer til det sitter:
     ‘mal den rød’, ‘fjern hekken’.»
- Etter listen, sentrert CTA-par: `.btn.stor` «Start med ditt bilde» + `.btn.ghost`
  «Prøv eksempelhuset» (begge → `/ny`; ghost-en forankrer demo-affordansen der).

**7. Ærlighet (✚ ny)** — KICKER-SKINNE, etikett `04 / ÆRLIGHET`. Sosialt-bevis-seksjonen for
et produkt uten kunder ennå: beviselig mekanikk i stedet for testimonials.
- `h2.sekttl`: «Ærlige bilder. Ærlige tall.»
- 3 SØYLER:
  1. **Geometri rangert.** «På nivå 1–2 genererer vi tre kandidater og måler hver mot
     originalfotoet. Du får den som ligner mest på huset ditt.»
  2. **Alltid merket illustrasjon.** «Alt Vøling lager er visualisering — samme spilleregler
     som prospektet fra megleren. Kostnadstall er grove estimater, ikke tilbud.»
  3. **Ingen sporing.** «Ingen konto, ingen cookies for annonser. Vi teller sidevisninger —
     det er alt.»

**8. `#priser`** — KICKER-SKINNE, etikett `05 / PRISER`.
- `h2.sekttl`: «Gratis nå. Ryddig prising når betaling åpner.»
- `p.blokklede`: «Betaen er åpen og gratis. Prisene under er planen — ikke en overraskelse
  som kommer senere.»
- `.prices`: 4 SØYLER (priskort per §5.11):
  1. **Beta** — `0 kr` `/i dag` — «Alt du trenger for å prøve.» — «10 poeng hver dag» ·
     «Alle fire nivåer» · «Alle stiler» · «Før/etter-deling» · «Grovt kostnadsestimat» —
     `Link.btn` **«Kom i gang»** → `/ny` (ENESTE levende pris-CTA).
  2. **Boligjakt** — `99 kr` `/mnd` — «For deg som ser på boliger.» — «Ubegrenset nivå 1» ·
     «Månedlig renderkvote» · «Visualiser boliger fra annonser» · «Avslutt når du vil» —
     `span.btn.ghost.kommer` «Kommer snart».
  3. **Prosjekt** (`.feat`, `span.anbefalt` «ANBEFALT») — `399 kr` `/engangs` — «For huset du
     eier.» — «Hele nivåstigen» · «Fargerapport» · «Kostnadsestimat» · «Full oppløsning på
     alle render» — «Kommer snart».
  4. **Proff** — `Ta kontakt` — «For meglere og håndverkere.» — «Volum og API» · «Egne stiler» ·
     «Prioritert kø» — «Kommer senere».
- Featurelister er rene tekstlinjer UTEN haker/ikoner (regelvekt-mønsteret). Ingen hevet
  `.feat`-boks, ingen translateY — `.feat` markeres kun med 2px `--gran`-toppregel +
  ANBEFALT-badge + 40% `--gran-lys`-vask.
- Fotnote (13.5px muted): «Priser er veiledende til betaling åpner. Vipps og kort.»
- Ventelisten bor IKKE her — den flyttes til båndet (seksjon 9), der den hører hjemme
  («si ifra når betaling åpner» rett ved siden av prisplanen er argumentets slutt).

**9. Sluttappell (✚ `.band`)** — BÅND (fullbredde `--gran-dyp`), KANT inni; tekst kol 1–6,
lite før/etter-par (to stablede thumbs FØR/ETTER med fotokant) kol 8–12.
- `h2.sekttl` i `--gran-dyp-ink`: «Huset ditt har flere muligheter enn du tror.»
- `.btn` invertert (papirfyll, `--gran-dyp`-tekst): **«Prøv gratis nå»** → `/ny`
- mikrolinje under (mono, `--gran-dyp-mute`): `ETT BILDE · TO MINUTTER · TI GRATIS POENG HVER DAG`
- **`.ventelinje` (flyttet hit):** under en `--gran-dyp-mute`-hårlinje — mono-etikett
  `VENTELISTE` (i `--gran-dyp-mute`), linje: «Få beskjed når betaling og full versjon åpner.»
  + `Waitlist`-komponenten. **Skjemafeltet i båndet er kun-bunnlinje:** transparent bakgrunn,
  ingen sidekanter, `border-bottom: 1px solid rgba(237,242,234,.5)`, fokus → `rgba(...,1)` +
  `box-shadow: 0 1px 0` samme farge (2px optisk, ingen layout-shift); plassholder
  `din@epost.no` i `--gran-dyp-mute`; knapp invertert (papirfyll) «Hold meg oppdatert».
  `p.ventetakk`: «Takk — du hører fra oss når det åpner.» (Boksede `--card`-felter ville sett
  ut som lyse lapper klistret på det mørke båndet — derfor bunnlinje her, og KUN her; alle
  andre felter følger §5.12.)
Dette er det ene fullbredde-aksentmomentet — granmaterialet brukt én gang, flatt.

**10. Footer (`footer.site`)** — ligger INNI `--gran-dyp`-båndet (bånd + footer leses som én
invertert blokk). Topphårlinje (`--gran-dyp-mute`-alfa). 12-kol:
- Kol 1–6: **ordmerket «vøling» i display-skala — 64px, lowercase, i papirfarge
  (`--gran-dyp-ink`), samme CSS-ø-konstruksjon skalert opp** (kun font-size på `.logo`-klonen;
  pseudo-element-mekanikken er urørt). Under: «Vøling viser norske boliger hva de kan bli.»
- Kol 7–9: mono-etikett `NAVIGASJON` + lenker Stiler / Slik virker det / Priser / Nytt prosjekt.
- Kol 10–12: mono-etikett `MERKNAD` + small-rolle-linjer: «Alle bilder er illustrasjoner.» ·
  «Tiltak kan være søknadspliktige — sjekk med kommunen.» · «Personvern».
- Bunnlinje over `--gran-dyp-mute`-hårlinje, mono 11.5px: «© 2026 Vøling — Bygget i Norge»
  venstre; «Gratis beta · 10 poeng per dag» høyre. Mobil: stablet.

**Klistre-CTA (landing, ✚ `.klistre-cta`)** — kun mobil (≤860px): fast bunnstripe,
papirbakgrunn, topphårlinje, `--skygge-flyt` (toppvariant), safe-area-padding. Innhold:
`.btn` «Prøv gratis» + inline-mikro «10 poeng/dag · uten konto». Vises (klasse `.synlig`) av
én IntersectionObserver når hero-CTA-en forlater viewport; skjules når `.band` entrer
viewport. **Ingen fokus-heuristikk** — ventelisten bor i båndet, og båndet skjuler stripa;
det er hele regelen (den skjøre «input i nederste tredjedel har fokus»-sjekken er strøket).
Desktop får den aldri — sticky nav-CTA dekker desktop.

### 4.2 `/ny` — Last opp

Mål: null nøling mellom ankomst og et foto i pipelinen. Tre innganger, rangert: opplasting
(hero), demo (ett klikk, fremhevet), finn (til stede, udyttet per A27).

- **Nav**: logo + høyreside `.eyebrow` restylet som ✚ `.stegviser`: tre 6px-prikker bundet av
  hårlinjer, prikk 1 fylt `--gran`, etikett «Steg 1 av 3 — Last opp». (Samme komponent på
  /prosjekt med prikk 2/3 aktiv.)
- **Hode** (inline-stiler → klasse ✚ `.side-hode`): `.eyebrow` `NYTT PROSJEKT`, h1 (h2-skala):
  «Ett bilde er alt som skal til.», lede: «Last opp et foto av fasaden — rett forfra, i
  dagslys, med hele huset i bildet.»
- **Dropzone (`.drop`)**: stort kort, **1px solid `--line-sterk`** (ingen stiplede kanter noe
  sted — stiplet er genre-tell), `--radius-kort`, `--card`-fyll, min-height 260px, sentrert.
  Sentrert innhold: **husomriss-SVG 40px i `--gran`** (tynn 1.5px-strek, tegnet, ikke
  ikonfont), fet linje «Slipp bildet her, eller klikk for å velge», small «JPG eller PNG ·
  inntil 15 MB». `.dragover` (JS-klasse, behold navn): border → solid `--gran`, fyll →
  `--gran-lys` — farge flytter seg, boksen gjør det ikke (ingen scale). Opptatt: `p.spinner`
  «Analyserer bildet …». Under, én tillitslinje (13.5px muted): «Bildet brukes kun til
  visualiseringen din.»
- **Tips (`.tips`)** — ERSTATT emoji-spans (krav: ingen emoji) med mono-indekserte punkter på
  én hårlinjerad: `01` Hele fasaden i bildet · `02` Dagslys, ikke motlys · `03` Stå rett
  foran huset.
- **Demo (`.analyse`)** — fremhevet: egen hårlinjerammet rad rett under tips, tekst «Vil du
  bare se hvordan det virker?» + `.btn.ghost` «Prøv eksempelhuset». Ett klikk til full
  resultatflyt — produktets billigste konvertering.
- **Feil**: `div.hint` uendret mekanikk, restylet per §5.13.
- **Finn-import (`.finnimport`)** — under en hårlinje, visuelt roligere (ingen kortbakgrunn,
  bare åpningsregel-stil). `span.label`: `HAR DU EN FINN-ANNONSE?` Skjema: `.felt` plassholder
  «Lim inn lenken til annonsen», `.btn` «Hent bilder». `.finnbekreft`-avkrysning (ekte,
  klikkbar port — A27): «Bildene tilhører annonsens fotograf og megler. Jeg henter dem kun
  til privat vurdering av boligen.» Etter henting: `.finntittel` (16px/600), `.finnvelg`
  «Velg bildet som viser fasaden best.», `.finnbilder`-grid (3-kol, `--radius-bilde`,
  fotokant-hårlinje, hover-ring `--gran`), `p.illu` juridisk linje beholdt ordrett.
- Ingen footer (som i dag). Ingen klistre-stripe — hele siden er CTA-en.

### 4.3 `/prosjekt/[id]` — Verkbenk

Mål: de tre stegene leses som én synlig stige; render-CTA-en oppgir prisen sin; resultatet er
en belønningsskjerm som umiddelbart tilbyr neste handling (juster / del / rapport).

- **Nav**: logo + `.stegviser` (prikk 2 aktiv: «Steg 2 av 3 — Tilpass»; etter resultat:
  prikk 3, etikett «Illustrasjon» per eksisterende betingelse). Hvis/når render-APIet
  returnerer gjenstående kvote: ✚ `.poengsaldo`-chip i nav (mono, `--gran-lys`-pille,
  «7 av 10 poeng igjen i dag»). Inntil da: IKKE fake det — `.poengnote` ved steg 3 bærer
  kostnaden.
- **Analysehode (`.prosjekt-hode`)**: `.eyebrow` `ANALYSERT`, h1 = buildingType (h2-skala),
  faktalinjen restylet som ✚ `.fakta`-chiprad (outline-piller, mono 11.5px): kledning · tak ·
  vinduer. Leses som «vi så faktisk på huset ditt» — analyse som bevis.
- **Stegseksjoner**: hver `section.steg-seksjon` åpner med REGELLISTE-åpningsregel; `h2` =
  `.stegnr` (20px sirkel, hårlinjering; fylt `--gran` + `--gran-kontrast`-tall når steget er
  «gjort»: nivå valgt / render finnes) + tittel 20px/600. **Stegtitlene bruker
  boligeier-stemmen:**
- **Steg 1 «Hvor langt vil du gå?» (`.nivaer`)**: 4 nivåkort, grid `repeat(4, 1fr)` → 2×2
  ≤1000px → 1-kol ≤560px. Kortspesifikasjon §5.5. Tekst = landingens nivåtekst ordrett
  (gjenkjennelse). Tag: «1 poeng · gratis i beta».
- **Steg 2 «Gjør det til ditt.» (`.panel`)**: ett `--card`-panel, `--radius-kort`,
  hårlinjedelte `.del`-blokker (struktur beholdt):
  - Farge (nivå ≤2): `.label` `FARGE PÅ KLEDNINGEN`; `.chips` fargechips (§5.4);
    `.felt` plassholder **«Egen farge — f.eks. ‘dempet salviegrønn’ eller NCS S 7005-G20Y»**
    (NCS-koden er malingskatalog-literacy Jotun-skolerte boligeiere leser som kompetanse).
  - Stil (nivå ≥2): `.label` `VELG STIL`; `StyleStrip` valgbar (§5.6).
  - Ønsker: `.label` `EGNE ØNSKER`; textarea-plassholdere — nivå ≤2: «F.eks. ‘behold
    dørfargen’, ‘litt lysere enn dette’» / nivå ≥3: «F.eks. ‘større vinduer mot hagen’,
    ‘skifertak’».
  - Inspirasjon (nivå ≥3): `.label` `INSPIRASJONSBILDE (VALGFRITT)`; `.btn.ghost` «Velg bilde»,
    `.filnavn` + `.fjern` beholdt.
  - Staging: `.brytervalg`-bryter (§5.9), tekst: **«Vis huset nyvasket og ryddet»** +
    «Fjerner rot, skitt og parabol — og merkes alltid i resultatet.»
- **Steg 3 «Lag illustrasjonen.» (`.cta`)**: `.btn.stor` med dynamisk, pristransparent
  etikett: **«Generer visualisering — 2 poeng»** (poeng fra `NIVAER`); `.poengnote` «av 10
  gratis poeng i dag». På mobil (≤860) får `.cta` `position: sticky; bottom: 0` med papirfyll
  + topphårlinje mens `!result && !busy` — spørsmålet scroller aldri bort midt i
  konfigureringen. Opptatt: `.progress` (§5.8) — stage-strenger uendret (JS-kontrakt).
  Hint (`.hint`): «Nivå 3–4 kan foreslå tiltak som er søknadspliktige. Illustrasjon —
  ikke byggeteknisk vurdert.»
- **Resultat (`.resgrid`)** — 12-kol: skyverkolonne kol 1–8, sidekort kol 9–12; stables ≤980px.
  - Over skyveren, ✚ `.merke`-badgerad: «Geometri rangert — beste av 3» (kun når
    candidates > 1, eksisterende betingelse) + «Inkluderer rydding og vask» ved staging.
    Badges per §5.10.
  - `CompareSlider` rammet per §5.7 — belønningsøyeblikket. Ingen reveal-nudge (§6);
    `.illu`-bildeteksten avsluttes med **«Dra i linjen.»** i tillegg til de betingede
    fragmentene (alle beholdt ordrett).
  - `.juster-kort`: eyebrow `JUSTER VIDERE`; kjede-chips (`.stegrekke`) som nummererte
    piller; `.justerform` `.felt` plassholder «Beskriv endringen — ‘mal den rød’, ‘fjern
    hekken’» + `.btn` «Juster»; `.label` `POPULÆRE IDEER` + 7 idé-chips «+ bålpanne» osv.
    (IDEER-konstanten urørt).
  - Sidekort (`.kort`): Palett — eyebrow `FARGEPALETT`; Estimat — eyebrow
    `GROVT KOSTNADSESTIMAT`, `.kost`-tabell (mono tabular-nums, sumrad over
    `--line-sterk`-regel), `.illu` «Ikke et tilbud — grove anslag basert på norske
    prisguider.»; `.handling`: `a.btn.w100` «Få tilbud fra håndverkere i nærheten» (død lenke
    beholdt), `a.btn.ghost.w100` «Last ned bildet», `button.btn.ghost.w100`
    **«Del før/etter-bildet»** (delingskortet er vekstmotoren før betaling, A25 — alltid
    synlig uten scroll i kortkolonnen på desktop); E-post — eyebrow `FÅ RAPPORTEN PÅ
    E-POST`, `.felt` + `.btn` «Send», takk: «Sendt — sjekk innboksen.»
- **Footer**: kompakt variant — hårlinje, ©-linje + illustrasjonsdisclaimer, på `--paper`
  (gran-dyp-båndet er kun landing).

---

## 5. Komponentspesifikasjoner

**5.1 Nav (`nav.site`)** — 64px høy, sticky, solid papirfyll (`var(--paper)`, aldri
gjennomskinnelig), bunnhårlinje ved scroll. Lenker
14px/500 ink-78%; hover → ink + 1px `--gran`-understrek (text-underline-offset 6px).
Logo-markup urørt (strukturell ø); størrelse 22px, vekt 600, farge `--gran` (token håndterer
begge temaer). `.btn` i nav = primær, kompakt (padding 8px 16px).

**5.2 Footer (`footer.site`)** — landing: inni `--gran-dyp`-båndet per §4.1.10 (med
64px-ordmerket og NAVIGASJON/MERKNAD-kolonnene); app-sider: enkel hårlinjetoppet papirfooter,
13.5px muted, to linjer.

**5.3 Knapper (`.btn`)** — felles: `--radius`, 15px/600, padding 12px 20px, inline-flex,
gap 8px, 1px transparent kant (lik geometri på tvers av varianter), transition per §6.
Pil: når en knapp/lenke peker fremover (→), brukes én tegnet inline-SVG-pil (14×14,
`M1 7h12M8 2l5 5-5 5`, strøk 1.5, firkantede ender) — aldri ikonfont.
- **Primær**: fyll `--gran`, tekst `--gran-kontrast`; hover `--gran-hover`; aktiv
  translateY(1px).
- **`.ghost`**: transparent, kant `--line-sterk`, tekst `--ink`; hover kant `--gran`,
  tekst `--gran`.
- **`.stor`**: padding 16px 28px, 16.5px.
- **`.w100`**: full bredde, innhold space-between (etikett venstre, pil høyre).
- **Invertert** (på `--gran-dyp`): fyll `--paper`, tekst `--gran-dyp`; hover fyll `#fff`.
- **`:disabled`**: opasitet .45, cursor not-allowed, ingen hover — må forbli synlig distinkt
  (porter avhenger av det).
- **`.kommer`** (span, ikke lenke): ghost-utseende @60% opasitet, ingen hover, cursor
  default, etikett «Kommer snart».

**5.4 Chips (`.chip-farge`, idé-chips, `.stegrekke`-chips, ✚ `.fakta`)** — pille
(`--radius-chip`), 13.5px/500, padding 6px 12px, kant `--line-sterk`, `--card`-fyll.
**`.dot` = 12px KVADRAT malingsprøve-brikke: 2px radius, innfelt hårlinje
(`box-shadow: inset 0 0 0 1px var(--fotokant)`)** — produkttro (fargeprøver for et
husfarge-produkt), ikke en generisk sirkel; inline-background beholdes malbar (JS-kontrakt).
Hover: kant `--gran`. `.valgt` (JS-klasse, behold navn): fyll `--gran-lys`, kant `--gran`,
tekst `--gran-ink`. Kjede-chips får mono-indeks «1.», «2.». Idé-chips prefikses ekte
«+»-glyf (tekst, ikke ikon). `.fakta` = ikke-interaktiv outline-pille, mono 11.5px uppercase.

**5.5 Kort** —
- `.kort` / `.panel`: `--card`-fyll, 1px `--line`-kant, `--radius-kort`, padding 24px,
  INGEN skygge. `.kort h3` 20px/600.
- `.niva` (nivåkort): samme base; `span.num` mono 13px `--gran`; h3 20px/600; p 14.5px muted;
  `span.tag` = poeng-badge (§5.10) festet i bunn. Hover: kant `--line-sterk` (fargeendring,
  aldri løft). `.valgt`: kant `--gran` (1px + innfelt `box-shadow: 0 0 0 1px var(--gran)` for
  2px optisk vekt), fyll `--gran-lys`, tag inverterer til `--gran`/`--gran-kontrast`. Valget
  må overleve mørkt tema identisk (tokens gjør jobben).

**5.6 Stilstripe + lysboks (`.stilstripe`, `.lysboks`)** — mekanikk urørt (scroll-snap, fast
overlay, tastaturhåndtering). Skinn: kort 240px brede, bilde `--radius-bilde` +
`--skygge-bilde` + fotokant (§2.6); `.zoom`-affordanse = 28px sirkel, `--tag-bg`-fyll, tegnet
utvid-glyf. **`.stiltekst`: linje 1 = mono-etikett `01 · SØRLANDSHVIT` (indekstall i
`--gran`; rekkefølge = `EXTERIOR_STYLES`: 01 sørlandshvit, 02 moderne kontrast, 03 lys
skandinavisk, 04 sort minimalisme, 05 naturnær lerk, 06 fjellstil, 07 herskapelig)**;
linje 2 = small-beskrivelse muted; `.velg` lenkestil i `--gran` med pil (kun valgbare
kontekster). `.stil.valgt`: 2px `--gran`-ring rundt bildet + «VALGT»-badge (§5.10) øverst
til venstre på fotoet. Lysboks: bakteppe `var(--overlay)` (token, aldri hardkodet rgba);
innhold `--card`, `--radius-kort`, `--skygge-lysboks`, bilde med fotokant; tekstblokk med
mono-etikett (stilnummer), stilnavn, én beskrivelseslinje og `.btn` «Velg denne stilen»;
piler = 44px sirkler, papirfyll, hårlinje, `--skygge-flyt`. Tastatur/aria-kontrakt intakt.

**5.7 Skyverramme (`.cmp`)** — mekanikk urørt (`--pos`, clip-path, skjult range-input).
Skinn: `--radius-bilde`, overflow hidden, `--skygge-bilde`, 1px `--line`-kant + fotokant
(§2.6 — den innfelte hårlinjen beskytter lyse før-himler i begge temaer). Deler: 2px solid
`#fff` @92% med hårlinje `rgb(0 0 0 / .2)` på hver side (leses på alle foto). Håndtak: 40px
sirkel, papirfyll, hårlinjekant, to tegnede vinkler ‹ ›, `--skygge-flyt`. `.taglabel`
FØR/ETTER: piller, `--tag-bg`/`--tag-ink`, mono 10.5px +0.14em, 12px inn fra hjørnene.
Focus-visible på range-inputen: 2px `--fokus`-ring rundt hele rammen. **Ingen animasjon av
`--pos` noensinne** (custom properties interpolerer ikke uten @property-registrering, og
klasselogikk i CompareSlider er fredet) — bildeteksten «Dra i linjen.» bærer opplæringen.

**5.8 Fremdrift (`.progress`)** — behold breddemekanikk + `role="status"`. Spor: 6px høyt,
`--gran-lys`, pille. `.fill`: `--gran`, pille, `transition: width .9s linear` (matcher
JS-tikken; reduced-motion-overstyring til none beholdes). `.stage`: 13.5px muted, mono, én
linje med reservert min-height (ingen hopp), `aria-live` urørt. Ingen shimmer, ingen striper.

**5.9 Bryter (`.bryter`)** — behold geometri + `.på`-klassenavnet (ikke-ASCII, JS-drevet).
Spor 40×22px pille, `--line-sterk`-fyll; `.på`: `--gran`-fyll. `.knott` 18px sirkel, hvit
(`#fff` i begge temaer — ligger på farget spor), 1px skygge. `.brytertekst b` 15px/600, span
13.5px muted. Focus-visible-ring på label-wrapperen.

**5.10 Badges (✚ `.merke`, `span.tag`, `.anbefalt`, poeng)** — ett system: pille,
mono 11.5px/500 +0.14em uppercase, padding 4px 10px.
- Poeng: `--gran-lys`-fyll, `--gran-ink`-tekst — «2 POENG».
- Tillit («GEOMETRI RANGERT — BESTE AV 3», «INKLUDERER RYDDING OG VASK», «VALGT»):
  `--card`-fyll, hårlinjekant, ink-tekst; ledende 6px `--gran`-prikk.
- `.anbefalt`: `--gran`-fyll, `--gran-kontrast`-tekst.
- Aldri mer enn to badges synlig på ett artefakt.

**5.11 Priskort (`.prices .price`)** — SØYLER, ikke bokser: transparent bakgrunn, hver
kolonne åpner med 1px `--regel-ink`-toppregel + 24px padding-top; gutter 32px. Innhold:
`.seklabel` tiernavn (mono, uppercase — tiernavn er etiketter, ikke overskrifter) →
`.amount` mono 30px + `small`-suffiks («/mnd», «/engangs») → én målgruppesetning
(15px muted) → featureliste 14.5px, 10px gap, INGEN hake-ikoner (rene linjer) →
`.btn.w100` bunnjustert. `.feat` (Prosjekt): toppregelen blir 2px `--gran`,
`.anbefalt`-badgen sitter på regelen, kolonnen får `--gran-lys`-vask @40% (subtil, ikke en
boks). **Ingen hevet card, ingen skala-transform, ingen skygge** — det hevede
ANBEFALT-kortet er bransjens største mal-tell og er bannlyst. Kolonner i lik høyde via grid;
≤860px: 2-kol; ≤560px: 1-kol med hårlinjer mellom.

**5.12 Skjemaer (`.felt`, `.venteliste`, `.justerform`, `.finnbekreft`)** — standardfelter
(på papir/kort): `--card`-fyll, 1px `--line-sterk`-kant, `--radius`, padding 12px 14px, 16px
tekst (≥16px hindrer iOS-zoom ved 390px); fokus: kant `--gran` + 2px `--fokus`-ring @25%
alfa. **Unntak: felter på `--gran-dyp`-båndet (ventelisten) er kun-bunnlinje per §4.1.9.**
Etiketter over felter bruker `.label`-mono-stilen. `::placeholder` = `--muted` @80%.
Avkrysning (`.finnbekreft`): native input skalert 18px, `accent-color: var(--gran)`;
etikettekst 13.5px muted; avkrysningen forblir en ekte klikkbar port. Inline-skjemamønster
(venteliste, juster, finn): felt flex-1 + knapp, gap 8px; stables ved ≤480px.

**5.13 Hint (`div.hint`)** — `--varsel-bg`-fyll, `--varsel-ink`-tekst, 1px kant
`color-mix(in srgb, var(--varsel-ink) 30%, transparent)`, `--radius`, small-rolle, padding
12px 14px. Ingen ikon — rolige ord bærer det.

---

## 6. Bevegelses- og interaksjonsregler

**Doktrine: farge og linjer flytter seg; bokser gjør det aldri.** Hele budsjettet: opacity,
transform, color/border — ingenting annet animeres. Globalt:
`@media (prefers-reduced-motion: reduce)` dreper hver regel under (eksisterende
progress-overstyring beholdes).

1. **Mikrotransisjoner**: `.btn, .chip-farge, .niva, .price, a` →
   `transition: background-color .15s, border-color .15s, color .15s, transform .15s ease`.
   Hover-løft er dødt (fjern dagens translateY-løft på kort/priser); bare knapper flytter
   seg: aktiv tilstand translateY(1px). Piler i lenker/knapper nudger `translateX(2px)` på
   hover.
2. **Scroll-avsløring (kun landing)** ✚ `.avsloring`: opacity 0 → 1 + translateY(14px) → 0,
   `.55s cubic-bezier(.2,.7,.2,1)`, IntersectionObserver (threshold .15, unobserve etter
   fyring). Per element (kicker, h2, lede, hver rad/kolonne) med 60ms stagger via
   `transition-delay`. Brukes ALDRI på /ny eller /prosjekt — app-sider lar aldri brukeren
   vente på UI. Fallback: synlig uten JS.
3. **Skyver**: INGEN reveal-nudge, ingen `--pos`-keyframe (strøket — se §5.7; bildeteksten
   «Dra i linjen.» gjør jobben uten UX-tap og uten @property-fellen).
4. **Klistre-stripe** (`.klistre-cta.synlig`): translateY(100%) → 0, .25s ease-out.
5. **Nav**: border-color-transisjon .2s ved scrolltilstand.
6. **Lysboks**: bakteppe-opacity .2s; innhold scale .98 → 1 + opacity, .2s. Ingen fjæring.
7. **Fokus**: hvert interaktivt element får `:focus-visible { outline: 2px solid
   var(--fokus); outline-offset: 2px; }` — synlig i begge temaer, fjernes aldri.
8. **Bryterknott**: `left .18s ease` (eksisterende geometri).

**Bannlyst (grep-og-øye-QA-port, §7):** parallax, marquee, scroll-jacking, hover-scale på
foto, hover-løft på kort, skeleton-shimmer, gradienter, glass/blur, emoji-glyfer, falskt
sosialt bevis, stock-foto-vibb. Null treff er kravet.

---

## 7. QA-porter (release-blokkere)

1. **Kontrast**: AA (≥4.5:1 tekst) i BEGGE temaer ved 390/768/1440 — spesielt
   `--muted`/`--paper`, `--gran-dyp-mute`/`--gran-dyp`, `--varsel-ink`/`--varsel-bg`,
   `--gran-kontrast`/`--gran`.
2. **Tastaturvandring**: lysboks (Escape/piler/velg), skyver (range-input med synlig
   fokusramme), bryter, alle skjemaer, klistre-stripe hopper ikke fokusrekkefølgen.
3. **Reduced motion-pass**: alt i §6 dødt; siden fullt forståelig uten bevegelse.
4. **Ban-liste-grep**: søk + øye på gradient/blur/emoji/box-shadow-på-tekstkort/
   translateY-hover — null treff.
5. **Mørk dybde**: hver flate i mørkt tema skiller seg fra papiret via verdisteg + 1px kant
   (§2.5-doktrinen); ingen flate «flyter» skyggeløst og kantløst.
6. **Typerolle-revisjon**: hvert tekstelement bindes til én rad i §2.2-tabellen; avvik er feil.
7. **390px**: hero stables med skyver på første skjerm, `.prices` 1-kol, `.nivaer` 1-kol,
   `.resgrid` stables, felter ≥16px (ingen iOS-zoom), klistre-stripe respekterer safe-area.
8. **Ærlighetsregel**: ingen tall på siden som ikke måles eller er produktfakta;
   `.poengsaldo` og `/api/stats` shipper IKKE uten backend.

---

## 8. Implementasjonsplan (fil for fil)

### 8.1 `app/tokens.css`
Behold alle variabelnavn; retune per §2. LEGG TIL: `--line-sterk`, `--regel-ink`,
`--gran-kontrast`, `--gran-dyp`, `--gran-dyp-ink`, `--gran-dyp-mute`, `--fokus`, `--tag-bg`,
`--tag-ink`, `--overlay`, `--fotokant`, `--skygge-rgb`, `--radius-kort`, `--radius-bilde`,
`--radius-chip`, `--skygge-bilde`, `--skygge-flyt`, `--skygge-lysboks`. Endre: `--maxw` 1080
→ 1120, `--track-label` → 0.18em, `--fs-display`/`--fs-h2` per §2.2, `--font` →
`var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif)`. Speil HVER ny token i
alle fire temablokker (`:root`, media-dark, `[data-theme=dark]`, `[data-theme=light]`).

### 8.2 `app/layout.tsx`
Legg til `next/font/google` Schibsted Grotesk (400/500/600, `latin` + `latin-ext`,
`display:'swap'`, `variable:'--font-sans'`), className på `<html>`. `Beacon` forblir montert.
Ingen andre endringer.

### 8.3 `app/globals.css`
**Restyle på plass (klassenavn beholdes):** `.wrap` (maxw/padding), `nav.site` + `.links`,
`.btn`-familien (+ ny invertert variant), `.eyebrow`, `.hero` (KANT-splitt), `.trust`
(SVG-haker), `.seklabel/.sek/.sekttl/.blokklede` (KICKER-SKINNE), `.radliste/.rad/.radnr`
(REGELLISTE + kjempenumeraler), `.prices/.price/.feat/.amount/.anbefalt` (SØYLER),
`.ventelinje/.venteliste/.ventetakk` (bånd-variant, bunnlinjefelt), `footer.site`
(bånd-footer + app-variant), `.drop/.tips/.analyse`, `.finnimport`-familien,
`.nivaer/.niva/.num/.tag`, `.panel/.del/.label`, `.chips/.chip-farge/.dot`
(kvadrat-brikke), `.felt`, `.brytervalg/.bryter/.knott`, `.cta/.poengnote` (+ mobil-sticky),
`.progress`-familien, `.resgrid/.kort/.kost/.illu`, `.stilstripe`+`.lysboks`-skinnene
(mono-nummererte bildetekster, `--overlay`), `.hint`, `.spinner`,
`.justerform/.stegrekke/.handling/.w100/.filnavn/.fjern`, `.marker` (gran-SVG-understrek),
`.display`, `.cmp`-skinnet (ramme/deler/håndtak/tags + fotokant).
**Legg til (nye klasser):** `.tallrekke` (stat-strip-anatomi), `.band` (gran-dyp),
`.klistre-cta` (+ `.synlig`), `.stegviser`, `.fakta`, `.merke`, `.avsloring`, `.side-hode`,
fotokant-`::after`-regelen (felles selektor for alle fotorammer), `::selection`-regelen.
**Fjern (etter verifisering av at de er døde):** `section.block`, `.steps`, `.step`,
`.step .n`, `.swatches`, `.sw`, `.valg`; hover-translateY-løftene på kort/priser;
hardkodet `#fff`-tekst i `.btn` (→ `--gran-kontrast`); hardkodede rgba-bakteppeverdier
(→ `--overlay`).

### 8.4 `app/page.tsx` (landing)
Ny tekst per §4.1 (hero, seksjoner, priser). Nye seksjoner i markup: `.tallrekke`,
Nivåer-seksjonen (gjenbruker `.niva`-visualene som statiske `div`-er, ingen
knappesemantikk), Ærlighet, `.band` (med flyttet `<Waitlist/>` — komponenten er uendret,
bare flyttet fra pris-seksjonen inn i båndet), utvidet footer inni båndet,
`.klistre-cta` (liten klientkomponent eller inline-script med én IntersectionObserver).
CTA-par etter «Slik virker det». `.avsloring`-klasser på landing-seksjonsbarn.
Hero-bildetekst med «Dra i linjen.»

### 8.5 `app/ny/page.tsx`
Inline-stiler → `.side-hode`-klasser. `.tips`-emoji-spans erstattes med mono-indekserte
spans (kun markup — ingen logikk). Demo-raden får ny ramme + tekst. Nav-eyebrow → 
`.stegviser`-markup. Dropzone-innhold: husomriss-SVG + ny tekst. All mekanikk (onFile,
dragover, finn-flyt, checkbox-port) urørt.

### 8.6 `app/prosjekt/[id]/page.tsx`
Stegtitler → «Hvor langt vil du gå?» / «Gjør det til ditt.» / «Lag illustrasjonen.»
(tekstbytte). `.btn.stor`-etikett → dynamisk «Generer visualisering — {poeng} poeng» (kun
tekst; payload urørt). Faktalinje → `.fakta`-chips (markup). `.merke`-badgerad over
skyveren (gjenbruker eksisterende betingelser). NCS-plassholder i farge-feltet.
`.illu`-bildetekst + «Dra i linjen.» (betingede fragmenter beholdt ordrett).
Inline-stiler (palett/e-post-avsnitt, spinner-padding, «Populære ideer»-margin) → klasser.
**`shareCard()`-canvas (kontrakt §21, bevisst oppdatering):** bg `#faf9f6` → `#f7f4ec`,
ordmerke `#2e4636` → `#2e4a3b`, tagline `#5c6660` → `#6f6a5c`; flyt identisk.

### 8.7 `components/*`
- `CompareSlider.tsx`: urørt logikk; skinn via CSS. Ingen nye klasser i komponenten.
- `StyleStrip.tsx`: bildetekst-markup får mono-indeksspan (`01 ·` …) — rent visuelt;
  filter/valg/lysboks-logikk urørt.
- `Logo.tsx`: urørt (kun CSS-størrelse per kontekst; footer-instansen skaleres til 64px).
- `Waitlist.tsx`: urørt (flyttes i page.tsx; bunnlinje-skinnet er CSS i bånd-kontekst).
- `Beacon.tsx`: urørt.
- Ny liten klientkomponent for `.klistre-cta` + `.avsloring`-observer (én fil, én observer).

### 8.8 Blokkert inntil API-støtte
`.poengsaldo`-chip i nav og `/api/stats`-teller i `.tallrekke`: shippes IKKE uten ekte
backend-tall. Aldri fake.

---

## 9. DO NOT BREAK — funksjonskontrakt (kopiert fra ref-current.md §2)

Revampen kan restyle alt under, men må ikke endre: state-kobling, event-handlere,
fetch-payloads/endepunkter, betinget renderingslogikk, klassebaserte tilstandstogglinger
JS-en driver (`.dragover`, `.valgt`, `.på`, `--pos`, `.fill`-bredde), eller aria-attributter.

### /ny — `app/ny/page.tsx`
1. **Fotoopplasting (dra + klikk).** State: `busy`, `drag`, `error`; ref `fileInput`.
   `div.drop` onClick → `fileInput.current.click()`; onDragOver/Leave/Drop toggler `drag`
   (klasse `dragover`); drop eller filinput-endring → `onFile` → FormData `photo=<file>` →
   `createProject(form)` → `POST /api/prosjekt` (multipart) → ved ok
   `router.push('/prosjekt/'+data.id)`. Accept `image/jpeg,image/png`; server capper 15 MB.
   Busy viser `p.spinner`; feil lander i `div.hint`.
2. **Demohus-knapp.** `button.btn.ghost` → `createProject({demo:true})` →
   `POST /api/prosjekt` (JSON `{demo:true}`) → redirect. Disabled mens `busy`.
3. **finn.no-import, portet av privatbruk-avkrysning.** State: `finnUrl`, `finnBusy`,
   `finnImages: string[]`, `finnTitle`, `finnBekreft` (A27-port). Submit-knapp disabled med
   mindre `finnUrl.trim() && finnBekreft && !finnBusy`; form onSubmit dobbeltsjekker begge.
   `hentFinn()` → `POST /api/finn` JSON `{url}` → `{images: string[], title?}` (server
   validerer finn.no-host, returnerer finncdn 1600w-URLer, maks 24; feil er norske strenger).
   Klikk på thumbnail → `createProject({finnImageUrl: src})` → `POST /api/prosjekt` JSON
   (server aksepterer kun `https://images.finncdn.no/dynamic/`-prefikser). Begge
   juridisk-tekst-blokkene (checkbox-etikett + `p.illu` under grid) må bestå.

### /prosjekt/[id] — `app/prosjekt/[id]/page.tsx`
Statevariabler (komplett liste): `project`, `level` (1|2|3|4), `farge`, `egenFarge`,
`wishes`, `busy`, `progress`, `stage`, `result`, `error`, `email`, `emailState`
('idle'|'sent'), `juster`, `styleId`, `stagingChoice` (boolean|null), `insp`
({base64,mime,name}|null); avledet `staging = stagingChoice ?? level >= 3`; refs
`resultRef`; avledet `beforeUrl` (`project.photoPath` hvis demo ellers `/api/bilde/{id}`),
`poeng`, `chain` (parentId-vandring, eldst først).

4. **Prosjektlast.** `useEffect` → `GET /api/prosjekt/{id}` → `setProject`; siste render
   (`p.renders.at(-1)`) blir `result` og setter `level`. Laste-UI = spinnerside.
5. **Nivå 1–4-valg med kvotepoeng.** `NIVAER`-konstant (poeng 1/1/2/3). Klikk setter
   `level` og nuller `styleId` hvis valgt stils `minLevel > level` (stiler fra
   `EXTERIOR_STYLES`, `@pipeline/presets`: sorlandshvit, moderne-kontrast, lys-skandinavisk,
   sort-minimalisme, naturnaer-lerk, fjellstil, herskapelig; minLevel 2 typisk).
   `.valgt`-klasse på aktiv; `poengnote` viser kostnad fra `NIVAER`.
6. **Fargechips + egen farge (kun nivå ≤ 2).** Chip-klikk toggler `farge` (re-klikk
   avvelger → null) og nuller `egenFarge`; skriving i `egenFarge` nuller `farge`.
   Payload bruker `egenFarge.trim() || farge` som `target`, sendes kun når `level <= 2`.
7. **Stilstripe (kun nivå ≥ 2).** `StyleStrip maxLevel={level} selectedId={styleId}
   onSelect={setStyleId}`. Kontrakt i komponenten: filter `minLevel <= maxLevel`;
   bildeklikk åpner lysboks på indeks; tekstknapp toggler valg (null ved re-klikk); lysboks
   er `role="dialog" aria-modal`, bakteppeklikk lukker, `stopPropagation` på innhold,
   tastatur Escape/ArrowRight/ArrowLeft (window keydown-lytter mens åpen), piler wrapper
   modulo, «Velg denne stilen» velger + lukker. Landing bruker den uten `onSelect`
   (tekstklikk åpner lysboks i stedet). Bilder fra `/styles/{id}.jpg`, brutte imgs skjules
   via onError.
8. **Ønsker-textarea.** `textarea.felt` maxLength 400 → `wishes`; sendes som `wishes` når
   ikke-tom. Plassholdertekst varierer med nivå (≤2 vs ≥3).
9. **Inspirasjonsfoto (kun nivå ≥ 3).** Skjult filinput i `label.btn.ghost`; FileReader →
   dataURL → `insp = {base64 (etter komma), mime (png|jpeg), name}`; `button.fjern` nuller.
   Sendes som `inspirationBase64`+`inspirationMime` kun når `level >= 3 && insp`.
10. **Rydd & vask-bryter (A21 per-nivå-defaults).** `stagingChoice` starter null = følg
    default (på ved 3–4, av ved 1–2); skjult checkbox checked = `staging`; endring setter
    eksplisitt `stagingChoice`. Visuell = `span.bryter` + `.på`-klasse + `span.knott`.
    NB: klassenavnet er `på` (ikke-ASCII) — behold eksakt.
11. **Render-CTA + fremdrift.** `render()` → `POST /api/prosjekt/{id}/render` JSON.
    Fersk payload: `{level, staging, target? (level≤2 && farge), styleId? (level≥2 &&
    styleId), wishes?, inspirationBase64?/inspirationMime? (level≥3)}`.
    Kjedet payload: `{baseRenderId, instruction, source: 'chip'|'text'}`.
    Fremdrift: setInterval 900 ms; easer mot maks 90% på en 110 s-klokke, 100% kun ved ekte
    respons; stage-strenger: «Leser bildet …» (<3 s), «Analyserer fasade og omgivelser …»
    (<8 s), «Genererer — tar vanligvis 1–2 minutter» (<15 s), deretter roterer 11 FUN-linjer
    hvert 7. s. `div.progress` har `role="status" aria-live="polite"`. Respons parses via
    `res.text()` så JSON.parse (tåler tom body). Suksess: setResult, append til
    `project.renders`, nullstill `juster` ved edit, smooth-scroll `resultRef` via
    requestAnimationFrame. Kvotefeil viser servermelding (429: «Dagens N gratis
    render-poeng er brukt opp …») i `div.hint`. Kjedede edits koster 1 poeng server-side.
12. **Feilhint.** To `div.hint`-bruk i steg 3: søknadspliktvarsel (level ≥3 && !busy) og
    `error`. Samme klasse brukes på /ny for opplastings-/finn-feil.
13. **Resultat før/etter-skyver.** `CompareSlider before={beforeUrl}
    after={result.imageUrl}`. Kontrakt: `pos`-state 0–100 driver CSS-var `--pos` på
    `div.cmp`; usynlig fullflate-`input[type=range]` (aria-label «Sammenlign før og etter»)
    er kontrollen; `clip-path` på `.beforeWrap`, `.divider`+`.handle` posisjonert ved
    `--pos`; FØR/ETTER `span.taglabel.tl-l/.tl-r`. Brukes også i landing-hero.
14. **Kjedesteg-chips (A16.3).** `chain` bygges ved å vandre `parentId` via Map av renders
    med id-er; vises når lengde > 1; klikk `setResult(r)` (neste justering bygger på vist
    steg); aktivt steg får `.valgt`; etikett `{i+1}. {instruction ?? target}`.
15. **«Populære ideer»-ett-trykks-chips (A25).** `IDEER`-konstant (7 strenger); klikk →
    `render({baseRenderId: result.id, instruction: idee, source:'chip'})`; disabled mens
    busy. Rendres kun når `result.id` finnes (som juster-skjemaet).
16. **Juster-videre-skjema.** `form.justerform` onSubmit → kjedet render med
    `juster.trim()`, source 'text'; knapp disabled når busy eller tom; felt nulles ved
    suksess.
17. **Palettkort.** Betinget på `result.palette`; viser `palette.cladding` (h3) +
    `palette.reasoning`.
18. **Kostnadsestimat-tabell.** `result.estimate.lines[]`-rader via `kr()`-formatterer
    (`Math.round(n/1000)` + " 000 kr"), `tr.sum` totaler `totalLowNok`–`totalHighNok`;
    `p.illu` «Ikke et tilbud»-disclaimer.
19. **Håndverker-CTA.** `a.btn.w100 href="#"` «Få tilbud fra håndverkere i nærheten»
    (plassholderlenke — behold som død CTA).
20. **Nedlasting.** `a.btn.ghost.w100 href={result.imageUrl} download`.
21. **Delingskort-canvas (A25).** `shareCard()`: laster beforeUrl + result.imageUrl inn i
    Images, canvas H=900 + 110 px footer, bredder fra sideforhold, FØR/ETTER-tags (mørke
    piller), «vøling»-ordmerke + tagline, toBlob → nedlasting `voling-for-etter.png`.
    Hardkodede farger her er merkevare-bærende — oppdateres BEVISST til ny palett (§8.6:
    bg `#f7f4ec`, ordmerke `#2e4a3b`, tagline `#6f6a5c`), flyten brytes ikke.
22. **E-postrapport-skjema.** `POST /api/interesse` JSON `{email, projectId}` → ved ok
    `emailState='sent'` bytter skjema mot takketekst.
23. **Resultat-illu-bildetekst.** Må beholde betingede fragmenter: candidates > 1
    («Geometri rangert — beste av N»), staging («Inkluderer rydding og vask»),
    demoSubstituted («Demo-modus: eksempelrender vist …»).

### Globalt
24. **Venteliste-skjema (landing).** `Waitlist`-komponent: `POST /api/interesse` JSON
    `{email}` (uten projectId) → `sent` bytter til `p.ventetakk`. Krever gyldig e-post
    server-side. (Flyttes til båndet — komponenten selv er uendret.)
25. **Sidevisnings-beacon.** `Beacon` i layout: ved hver `usePathname()`-endring →
    `POST /api/hendelse` JSON `{path}` med `keepalive:true`, feil svelges. Server
    normaliserer `/prosjekt/<id>` → `/prosjekt/:id`. Må forbli montert i layout.
26. **Logo (A13).** `a.logo href="/"`: literal tekst `v` + `span.o>span>o` + `ling`;
    ø-streken er ren CSS (`.logo .o::after` rotert stolpe, `::before` tegner o-en på nytt,
    indre span skjult). Enhver markup-endring må bevare tilgjengelig tekst «voling»/
    ø-rendering.

### Endepunktsammendrag
| Endepunkt | Metode | Brukes av | Payload → respons |
|---|---|---|---|
| `/api/prosjekt` | POST | /ny (alle 3 innganger) | multipart `photo` \| `{demo:true}` \| `{finnImageUrl}` → Project `{id,…}` |
| `/api/finn` | POST | /ny | `{url}` → `{images[], title?}` |
| `/api/prosjekt/[id]` | GET | verkbenk-last | → Project (analyse + renders[]) |
| `/api/prosjekt/[id]/render` | POST | render + juster + idé-chips | fersk eller kjedet payload → RenderRecord (+`demoSubstituted`); 429 kvote |
| `/api/bilde/[id]` | GET | beforeUrl (ikke-demo) | bildebytes |
| `/api/interesse` | POST | Waitlist + e-postrapport | `{email, projectId?}` → `{ok:true}` |
| `/api/hendelse` | POST | Beacon | `{path}` → `{ok:true}` |
| `/api/render/[name]` | GET | render-imageUrls | serverer genererte renderfiler |

**JS-drevne klassenavn som må beholde eksakt navn:** `dragover`, `valgt`
(niva/chip/stil/kjede), `på` (ikke-ASCII), `tom`; pluss inline-stil-kroker (`--pos`,
`.fill`-bredde, `.dot`-background).

**Strukturelt — behold mekanikk, restyle kun skinn:** `.cmp`-stakken (`--pos`, clip-path,
skjult range), `.logo .o`-pseudo-ø, `.bryter/.knott/.på`-bryteren, `.progress .fill`
inline-bredde, `.lysboks` fast overlay + stopPropagation-layout, `.stilstripe` horisontal
scroll-snap, `.drop` som klikk/slipp-mål.

---

## Vedlegg A — avgjorte konflikter (kun for sporbarhet; teksten over er endelig)

1. Skyver-nudgen (`--pos`-keyframe) er STRØKET; bildeteksten «Dra i linjen.» erstatter den.
2. `.chip-farge .dot` er KVADRAT malingsprøve (12px, 2px radius, innfelt hårlinje) — ikke sirkel.
3. `.radnr` er kjempenumeral `clamp(2.5rem, 5vw, 4rem)` — ikke 40px fast.
4. Ventelisten er FLYTTET fra pris-seksjonen inn i `.band`; felt der er kun-bunnlinje;
   klistre-CTA-ens fokus-heuristikk er dermed strøket (båndet skjuler stripa).
5. `.tallrekke` bruker stat-strip-anatomien (etikett over kort verdi) — ikke setningsverdier.
6. Ingen hevet/skygget `.feat`-priskort; kun 2px gran-regel + badge + vask.
7. Dropzone: 1px solid — ingen stiplede kanter i hele systemet; husomriss-SVG lagt til.
8. Trust-haker og stil-«Valgt»: tynne 1.5px gran-SVG-er, aldri tekstglyf/emoji.
9. Én fontfamilie (Schibsted Grotesk) + system-mono; ingen serif, ingen JetBrains-nedlasting.
10. Én aksentfarge (gran); ingen oker/leire — ø-streken/gran-understreken er eneste gest (A13).
11. Footer-ordmerket på 64px display-skala inni gran-dyp-båndet; NAVIGASJON/MERKNAD-kolonner.
12. Lysboks-bakteppe via `--overlay`-token; fotokant via `--fotokant`-token på alle rammer.
13. Mørk dybde-doktrine (verdisteg + kant, ikke skygge) er eksplisitt QA-port §7.5.
