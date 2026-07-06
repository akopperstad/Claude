# spec-konvertering.md — Vøling revamp, retning «Konverteringshåndverk»

Forfattet 2026-07-05. Bygger på ref-pilhammer.md, ref-seawise.md, ref-current.md, DECISIONS.md.
Respekterer låst merkevare (A11/A13: lowercase «vøling», dyp grangrønn, ø-streken som eneste
gest; D7: scandi premium minimal, varm og ærlig) og hele funksjonskontrakten i ref-current §2.

---

## 1. Design stance

Every viewport must answer one question: **«hvorfor prøve dette akkurat nå?»** — and the answer
is always the same artifact: our own before/after photography. The slider is not a feature demo;
it is the recurring hero motif on every page, framed like print photography on warm paper.
Structure is editorial (hairline rules, mono index labels, sentence-case headlines that end in
periods), never card-soup. One accent — the locked spruce green — is rationed to exactly the
things we want clicked, so the eye's path to the CTA is unambiguous. Social proof is only what
we can back: real product mechanics (best-of-3 geometry ranking), real numbers (quota, levels,
telemetry counts), real fine print. That honesty *is* the conversion strategy in Norway.
It beats «just another AI website» because it has zero AI-site tells — no gradients, no glass,
no fake quotes — just a ruled Norwegian document that happens to sell extremely hard.

---

## 2. Token sheet

Keep every existing variable NAME in `tokens.css` (ref-current §3: renaming sweeps globals.css
+ inline TSX uses). Retune values; add the new tokens marked ✚. Three theme blocks as today
(`:root`, `@media (prefers-color-scheme: dark)`, `:root[data-theme="dark"]`, plus
`:root[data-theme="light"]` mirror).

### 2.1 Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#f7f4ec` | `#161511` | Canvas. Warmer than today's `#faf8f4` so photos and white cards get relief. Never pure white/black. |
| `--card` | `#fffdf8` | `#1e1c17` | Panels, price columns, result cards. |
| `--ink` | `#1c1a15` | `#ece8dc` | Primary text. |
| `--muted` | `#6f6a5c` | `#a49d8a` | Secondary text. Darkened from `#837e73` — old value was ~3.4:1 on paper; new is ≥4.6:1 (AA). |
| `--line` | `#e5dfd2` | `#2d2a23` | Hairlines: 1px rules everywhere. |
| ✚ `--line-sterk` | `#cfc8b6` | `#4a4433` | Emphasized hairline (column dividers, table sum rule). |
| ✚ `--regel-ink` | `rgba(28,26,21,.75)` | `rgba(236,232,220,.65)` | 1px «opening rule» above lists/price columns (Pilhammer pattern: hierarchy by rule weight). |
| `--gran` | `#2e4a3b` (locked) | `#8fb49c` | Brand accent: logo, primary CTA, links, selected states, `::selection`. |
| `--gran-hover` | `#253d30` | `#a5c6b1` | Hover on `--gran` fills. |
| ✚ `--gran-kontrast` | `#f5f8f4` | `#12231a` | Text/icons ON `--gran` fills (dark-scheme gran is light, so its text is near-black — do not hardcode `#fff` in buttons). |
| `--gran-lys` | `#e6ede5` | `#22352a` | Calm tinted surfaces: selected card fill, badges, poeng chips. |
| `--gran-ink` | `#2b5138` | `#a9cfb5` | Text on `--gran-lys`. |
| ✚ `--gran-dyp` | `#1e3428` | `#122019` | The one full-bleed accent material: final CTA band + footer. Flat color, no gradient. |
| ✚ `--gran-dyp-ink` | `#edf2ea` | `#e6ece3` | Headline text on `--gran-dyp`. |
| ✚ `--gran-dyp-mute` | `#a8bcab` | `#93a897` | Secondary text on `--gran-dyp`; also alpha hairlines there: `rgba(237,242,234,.22)`. |
| `--varsel-bg` | `#f4ead7` | `#37301f` | `.hint` warnings (søknadsplikt, quota, errors). |
| `--varsel-ink` | `#74551f` | `#d8b46c` | Text in `.hint`. |
| ✚ `--fokus` | `#2e4a3b` | `#8fb49c` | Focus ring color (2px outline, offset 2px). |
| ✚ `--tag-bg` | `rgba(20,19,15,.78)` | `rgba(0,0,0,.66)` | FØR/ETTER pills on imagery. |
| ✚ `--tag-ink` | `#f7f4ec` | `#f7f4ec` | Text in FØR/ETTER pills. |
| ✚ `--skygge-rgb` | `28 26 21` | `0 0 0` | RGB triplet for shadow alphas. |

`::selection { background: var(--gran); color: var(--gran-kontrast); }` — branded selection, add globally.

### 2.2 Type

**Family.** One text face + system mono. Load **Schibsted Grotesk** via `next/font/google`
(build-time bundling only), weights 400/500/600, `subsets: ['latin','latin-ext']` (ø/å/æ),
`display: 'swap'`, `variable: '--font-sans'`. It is a Nordic grotesk — geometric-humanist,
kins with the A13 wordmark, and nobody's AI template ships it. In tokens.css:
`--font: var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif);`
`--font-mono: ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", Menlo, monospace;` (unchanged — zero download weight; mono is labels/numerals only).

**Scale.** Every text element snaps to one of these roles — no in-between sizes.

| Role | Family | Size | Weight | Tracking | LH | Case |
|---|---|---|---|---|---|---|
| Display (`.display`, hero h1) | Grotesk | `clamp(38px, 6.4vw, 72px)` → update `--fs-display` | 500 | −0.025em | 1.04 | Sentence case, ends with period |
| Section h2 (`.sekttl`) | Grotesk | `clamp(28px, 3.6vw, 42px)` → update `--fs-h2` | 500 | −0.02em | 1.1 | Sentence case, period |
| Card/level/price title (`.niva h3`, `.kort h3`, price name) | Grotesk | 20px | 600 | −0.01em | 1.3 | Sentence case |
| Lede (`.lede`, `.blokklede`) | Grotesk | `clamp(17px, 1.5vw, 19px)` | 400 | 0 | 1.55 | Sentence; color `--muted`; `max-width: 56ch` |
| Body (`--fs-body`) | Grotesk | 16px | 400 | 0 | 1.6 | — |
| Small (`--fs-small`, `.illu`, fine print) | Grotesk | 13.5px | 400 | 0 | 1.5 | Color `--muted` |
| Eyebrow / mono label (`.seklabel`, `.eyebrow`, `.label`) | Mono | 11.5px | 500 | +0.18em → update `--track-label` | 1 | UPPERCASE, color `--muted`; index number in `--gran` |
| Price amount (`.amount`) | Mono | 30px | 500 | −0.01em | 1 | `font-variant-numeric: tabular-nums`; suffix `small` 13.5px muted, NOT tracked |
| Big numerals (`.radnr`, `.stegnr`, `.niva .num`) | Mono | `.radnr` 40px / `.stegnr` 15px / `.num` 13px | 500 | −0.01em | 1 | `--gran` |
| Button label (`.btn`) | Grotesk | 15px (`.stor`: 16.5px) | 600 | +0.01em | 1 | Sentence case |
| Nav link | Grotesk | 14px | 500 | +0.02em | 1 | Sentence case, `--ink` at 78% opacity → 100% hover |
| FØR/ETTER tag (`.taglabel`) | Mono | 10.5px | 600 | +0.14em | 1 | UPPERCASE |

Rules: headlines are full declarative sentences with periods (Seawise lesson) — confidence by
voice, not bold weight. UPPERCASE exists ONLY at mono-label scale. Body copy width-capped
(`max-width: 60ch`). `text-wrap: balance` on `.display` and `.sekttl`.

### 2.3 Spacing

Base 4px system; `--gap: 8px` stays. Named steps used in this spec: 4, 8, 12, 16, 24, 32, 48,
64, 96. Section rhythm:

- `--maxw: 1120px` (up from 1080); side padding 20px mobile / 32px ≥860px.
- Section padding: `64px 0` mobile → `96px 0` ≥860px. (Deliberately tighter than Pilhammer's
  160px — a conversion page keeps the next answer within half a scroll.)
- Kicker → h2: 16px. h2 → lede: 16px. Lede → content block: 40px.
- Grid gutter: 32px desktop, 20px mobile. Column dividers: `border-left: 1px var(--line)` + 32px padding-left.
- List rows (`.rad`, price features): 12px internal gap; rows separated by hairline + 24px padding.

### 2.4 Radii

| Token ✚ | Value | Use |
|---|---|---|
| `--radius` (keep name) | 8px | Buttons, inputs (`.felt`), `.hint`, dropzone |
| ✚ `--radius-kort` | 12px | Cards, panels, level cards, lightbox |
| ✚ `--radius-bilde` | 14px | Photo frames: `.cmp`, style-strip thumbs, finn thumbs |
| ✚ `--radius-chip` | 999px | Chips, badges, poeng tags, FØR/ETTER pills, toggle |

### 2.5 Shadows

Shadow is reserved for **photography and floating layers** — never on flat text cards
(hairlines carry those). Dark scheme relies on borders; shadows go near-invisible naturally
via `--skygge-rgb: 0 0 0`.

| Token ✚ | Value |
|---|---|
| `--skygge-bilde` | `0 1px 2px rgb(var(--skygge-rgb) / .05), 0 16px 40px -20px rgb(var(--skygge-rgb) / .25)` |
| `--skygge-flyt` | `0 8px 24px -8px rgb(var(--skygge-rgb) / .18)` (lightbox arrows, sticky bar uses top variant `0 -8px 24px -8px …`) |
| `--skygge-lysboks` | `0 24px 64px -16px rgb(var(--skygge-rgb) / .35)` |

### 2.6 Borders

- Hairline: `1px solid var(--line)` — section separators, rows, card edges, column dividers.
- Strong: `1px solid var(--line-sterk)` — table sum rule, dividers that must read at a glance.
- Opening rule: `1px solid var(--regel-ink)` — the darker rule that OPENS a list or price
  column (Pilhammer's hierarchy-by-rule-weight).
- Photos on dark paper get `outline: 1px solid rgb(255 255 255 / .08)` inset so they don't bleed.
- Every section on the landing page: `border-top: 1px solid var(--line)` (ruled-document feel).

---

## 3. Per-page blueprints

All copy below is final bokmål copy, not lorem. Layout patterns are named once and reused:

- **KANT**: 12-col grid, `--maxw` container, 32px gutter.
- **KICKER-SKINNE**: section header on KANT — mono label in cols 1–3 (`01 / Stiler`, index
  numeral in `--gran`, `/` at 50% opacity), h2 + lede in cols 4–12. Collapses to stacked at ≤860.
- **REGELLISTE**: rows opened by a `--regel-ink` top rule, separated by `--line` hairlines;
  row grid = mono numeral (col 1) · title (cols 2–5) · description (cols 6–12).
- **SØYLER**: N equal columns each opened by its own top rule (`--regel-ink`), no card
  backgrounds — used for prices and the honesty section.

### 3.1 `/` — Landing

Section order is the conversion argument: show → prove → explain → price → ask.

**1. Nav (`nav.site`)** — sticky top, `position: sticky; top: 0`, paper background at
`rgb/.92` + `backdrop-filter: none` (no glass — solid enough), bottom hairline appears
only after 8px scroll (class toggle or `border-color: transparent → var(--line)`).
Left: `Logo` (unchanged markup — the CSS-ø is structural). Right `.links`:
`Stiler · Slik virker det · Priser` + `.btn` **«Prøv gratis»** → `/ny`.
The nav CTA is the only filled element above the fold besides the hero CTA.

**2. Hero (`.hero`)** — KANT: text cols 1–5, `CompareSlider` cols 6–12, top-aligned.
≤860: stacked, slider immediately after the CTA (the motif must be on the first mobile screen).

- `.seklabel`: `GRATIS BETA · NORSK BOLIGVISUALISERING`
- `h1.display`: **«Se huset ditt ferdig oppusset — før du begynner.»** The word «ferdig»
  carries `.marker`: restyled as a single hand-set spruce underline stroke (inline SVG,
  `--gran`, slight rotate −1.5°) — the ø-stroke gesture at page scale. One per page, max.
- `p.lede`: «Last opp ett bilde av boligen. Vøling viser fasaden i ny farge, ny kledning —
  eller som noe helt nytt. Ferdig på et par minutter.»
- `Link.btn.stor`: **«Prøv med ditt eget bilde»** → `/ny`. Under it, text link
  (14px, `--gran`, arrow →): «…eller se stilene først ↓» → `#stiler`.
- `.trust` (3 spans, ✓ before each, `--gran` check, 13.5px muted): «Uten konto» ·
  «10 gratis poeng hver dag» · «Klart på 1–2 minutter».
- Slider: `base.jpg` vs `sort-minimalisme.jpg`, framed per §4.7. Caption under
  (`.illu`, mono index style): «Nivå 4 · Sort minimalisme — generert med Vøling fra fotoet til venstre.»
  (Our own generated photography, credited as such: the imagery IS the social proof.)

**3. Tallrekke (✚ new, `.tallrekke`)** — investor-legible metrics band. Full-width strip
between two hairlines, 4 equal columns (2×2 at ≤560): mono label over Grotesk 20px/600 value.
Only true product facts, no invented stats:

| label | value |
|---|---|
| `NIVÅER` | «4 — fra ny farge til full visjon» |
| `STILER` | «7, kuratert for norske hus» |
| `GEOMETRI` | «Beste av 3 kandidater vinner» |
| `PRIS I BETA` | «0 kr — 10 poeng per dag» |

Rule: if a live telemetry counter ships («N visualiseringer generert i beta», from
telemetry.jsonl via a tiny `/api/stats`), it replaces column 2. Never show a number we
don't measure.

**4. `#stiler` (`section.sek`)** — KICKER-SKINNE, label `01 / STILER`.
- `h2.sekttl`: «Syv stiler som kler norske hus.»
- `p.blokklede`: «Kuratert for norsk byggeskikk og norsk lys — fra sørlandshvit til sort
  minimalisme. Alle eksemplene er generert med Vøling fra samme foto.»
- `StyleStrip` (browse-only as today). Under the strip, right-aligned text link:
  «Prøv en stil på ditt hus →» → `/ny`.

**5. Nivåer (✚ new landing section)** — KICKER-SKINNE, label `02 / NIVÅER`.
- `h2.sekttl`: «Fire nivåer. Du bestemmer hvor langt du vil gå.»
- 4 SØYLER (2×2 at ≤860, 1-col ≤480), each: mono numeral, 20px title, one promise line,
  poeng badge (§4.10):
  1. **Farge** — «Ny farge på kledningen. Alt annet står urørt.» — `1 poeng`
  2. **Overflater** — «Ny kledning, nytt tak, nye lister — huset er fortsatt huset.» — `1 poeng`
  3. **Oppgradering** — «Nye vinduer, inngangsparti og beplantning — med en fargepalett
     valgt for akkurat ditt hus.» — `2 poeng`
  4. **Visjon** — «Full arkitektonisk omtenkning. Se hva huset kunne vært.» — `3 poeng`
- Microcopy under (13.5px muted): «Poeng er dagskvoten i gratis-betaen. En render koster
  nivåets vekt — kvoten nullstilles hver dag.» (Quota transparency = pricing model preview.)

**6. `#slik` — Slik virker det** — KICKER-SKINNE, label `03 / SLIK VIRKER DET`, then REGELLISTE:
  1. **Last opp ett bilde** — «Ta bildet rett forfra i dagslys — eller prøv eksempelhuset først.»
  2. **Velg nivå og stil** — «Fra forsiktig ny farge til full visjon. Skriv egne ønsker om du vil.»
  3. **Sammenlign og juster** — «Dra i før/etter-skyveren, og be om endringer til det sitter:
     ‘mal den rød’, ‘fjern hekken’.»
- After the list, centered CTA pair: `.btn.stor` «Start med ditt bilde» + `.btn.ghost`
  «Prøv eksempelhuset» (both → `/ny`; the ghost anchors the demo affordance there).

**7. Ærlighet (✚ new)** — KICKER-SKINNE, label `04 / ÆRLIGHET`. This is the social-proof
section for a product with no customers yet: provable mechanics instead of testimonials.
- `h2.sekttl`: «Ærlige bilder. Ærlige tall.»
- 3 SØYLER:
  1. **Geometri rangert.** «På nivå 1–2 genererer vi tre kandidater og måler hver mot
     originalfotoet. Du får den som ligner mest på huset ditt.»
  2. **Alltid merket illustrasjon.** «Alt Vøling lager er visualisering — samme spilleregler
     som prospektet fra megleren. Kostnadstall er grove estimater, ikke tilbud.»
  3. **Ingen sporing.** «Ingen konto, ingen cookies for annonser. Vi teller sidevisninger —
     det er alt.»

**8. `#priser`** — KICKER-SKINNE, label `05 / PRISER`.
- `h2.sekttl`: «Gratis nå. Ryddig prising når betaling åpner.»
- `p.blokklede`: «Betaen er åpen og gratis. Prisene under er planen — ikke en overraskelse
  som kommer senere.»
- `.prices`: 4 SØYLER (price cards per §4.11). Content:
  1. **Beta** — `0 kr` `/i dag` — «Alt du trenger for å prøve.» — features: «10 poeng hver dag»,
     «Alle fire nivåer», «Alle stiler», «Før/etter-deling», «Grovt kostnadsestimat» —
     `Link.btn` **«Kom i gang»** → `/ny` (the ONLY live price CTA).
  2. **Boligjakt** — `99 kr` `/mnd` — «For deg som ser på boliger.» — «Ubegrenset nivå 1»,
     «Månedlig renderkvote», «Visualiser boliger fra annonser», «Avslutt når du vil» —
     `span.btn.ghost.kommer` «Kommer snart».
  3. **Prosjekt** (`.feat`, `span.anbefalt` «ANBEFALT») — `399 kr` `/engangs` — «For huset du
     eier.» — «Hele nivåstigen», «Fargerapport», «Kostnadsestimat», «Full oppløsning på alle
     render» — «Kommer snart».
  4. **Proff** — `Ta kontakt` — «For meglere og håndverkere.» — «Volum og API», «Egne stiler»,
     «Prioritert kø» — «Kommer senere».
- Footnote (13.5px muted): «Priser er veiledende til betaling åpner. Vipps og kort.»
- `.ventelinje`: «Få beskjed når betaling og full versjon åpner.» + `Waitlist` form —
  placeholder `din@epost.no`, button «Hold meg oppdatert»; `p.ventetakk`: «Takk — du hører
  fra oss når det åpner.»

**9. Sluttappell (✚ new, `.band`)** — full-bleed `--gran-dyp` panel, KANT inside; text
cols 1–6, small before/after pair (two stacked thumbs FØR/ETTER, or reuse `CompareSlider`)
cols 8–12. All hairlines inside use `--gran-dyp-mute` alpha.
- `h2.sekttl` in `--gran-dyp-ink`: «Huset ditt har flere muligheter enn du tror.»
- `.btn` inverted (paper fill, `--gran-dyp` text): **«Prøv gratis nå»** → `/ny`
- micro under (mono, `--gran-dyp-mute`): `ETT BILDE · TO MINUTTER · TI GRATIS POENG HVER DAG`
This is the single full-bleed accent moment — the spruce «material» committed once, flat,
no gradient, no grain.

**10. Footer (`footer.site`)** — sits INSIDE the `--gran-dyp` band (band + footer read as one
inverted block, Pilhammer pattern). Top hairline (`--gran-dyp-mute` alpha). Left: wordmark +
«Vøling viser norske boliger hva de kan bli.» Right: link column (Stiler, Slik virker det,
Priser, Personvern). Bottom bar, mono 11.5px: «© 2026 Vøling — Bygget i Norge» left; right:
«Alle bilder er illustrasjoner. Tiltak kan være søknadspliktige — sjekk med kommunen.»

**Sticky CTA logic (landing, ✚ `.klistre-cta`)** — mobile only (≤860px): fixed bottom bar,
paper background, top hairline, `--skygge-flyt` (top variant), safe-area padding. Contains
`.btn` «Prøv gratis» + inline micro «10 poeng/dag · uten konto». Shown (class `.synlig`) by an
IntersectionObserver when the hero CTA leaves the viewport; hidden again when the footer/band
enters. Desktop never gets it — the sticky nav CTA covers desktop. Never covers the waitlist
form focus (hide while an input in viewport bottom third has focus).

### 3.2 `/ny` — Upload

Goal: zero hesitation between arrival and a photo in the pipeline. Three entries, ranked:
upload (hero), demo (one click, prominent), finn (present, unpromoted per A27).

- **Nav**: logo + right side `.eyebrow` restyled as ✚ `.stegviser`: three 6px dots joined by
  hairlines, dot 1 filled `--gran`, label «Steg 1 av 3 — Last opp». (Same component shows on
  /prosjekt with dot 2/3 active.)
- **Header** (migrate inline styles → classes ✚ `.side-hode`): `.eyebrow` `NYTT PROSJEKT`,
  h1 (h2-scale): «Ett bilde er alt som skal til.», lede: «Last opp et foto av fasaden — rett
  forfra, i dagslys, med hele huset i bildet.»
- **Dropzone (`.drop`)**: large card, 2px dashed `--line-sterk`, `--radius-kort`,
  `--card` fill, min-height 260px, centered. Idle: bold line «Slipp bildet her, eller klikk
  for å velge», small «JPG eller PNG · inntil 15 MB». `.dragover` (JS class, keep name):
  border → solid `--gran`, fill → `--gran-lys`. Busy: `p.spinner` «Analyserer bildet …».
  Below, one trust line (13.5px muted): «Bildet brukes kun til visualiseringen din.»
- **Tips (`.tips`)** — REPLACE the emoji spans (constraint: no emoji bullets) with mono-indexed
  items on one hairline row: `01` Hele fasaden i bildet · `02` Dagslys, ikke motlys ·
  `03` Stå rett foran huset.
- **Demo (`.analyse`)** — promote: its own hairline-framed row directly under tips, text
  «Vil du bare se hvordan det virker?» + `.btn.ghost` «Prøv eksempelhuset». One click to a
  full result flow — the cheapest conversion in the product.
- **Error**: `div.hint` unchanged mechanics, restyled per §4.12.
- **Finn-import (`.finnimport`)** — below a hairline, visually quieter (no card, just the
  opening-rule list style). `span.label`: `HAR DU EN FINN-ANNONSE?` Form: `.felt` placeholder
  «Lim inn lenken til annonsen», `.btn` «Hent bilder». `.finnbekreft` checkbox (real, clickable
  gate — A27): «Bildene tilhører annonsens fotograf og megler. Jeg henter dem kun til privat
  vurdering av boligen.» After fetch: `.finntittel` (listing title, 16px/600), `.finnvelg`
  «Velg bildet som viser fasaden best.», `.finnbilder` grid (3-col, `--radius-bilde`, hover
  ring `--gran`), `p.illu` legal line kept verbatim.
- No footer (as today). No sticky bar — the whole page is the CTA.

### 3.3 `/prosjekt/[id]` — Workbench

Goal: the three steps read as one visible ladder; the render CTA states its price; the result
is a reward screen that immediately offers the next action (juster / del / rapport).

- **Nav**: logo + `.stegviser` (dot 2 active: «Steg 2 av 3 — Tilpass»; after result: dot 3,
  label swaps to «Illustrasjon» per existing conditional). If/when the render API returns
  remaining quota, add ✚ `.poengsaldo` chip in nav: mono, `--gran-lys` pill, «7 av 10 poeng
  igjen i dag». Until then, do NOT fake it — the `.poengnote` at steg 3 carries cost.
- **Analyse header (`.prosjekt-hode`)**: `.eyebrow` `ANALYSERT`, h1 = buildingType (h2 scale),
  facts line restyled as ✚ `.fakta` chips row (outline pills, mono 11.5px): kledning · tak ·
  vinduer. Reads as «we actually looked at your house» — analysis as proof.
- **Steg-seksjoner**: each `section.steg-seksjon` opens with the REGELLISTE opening rule;
  `h2` = `.stegnr` (20px circle, hairline ring; filled `--gran` + `--gran-kontrast` numeral
  when its step is «done»: nivå valgt / render finnes) + title 20px/600.
- **Steg 1 «Velg nivå» (`.nivaer`)**: 4 level cards, grid `repeat(4, 1fr)` → 2×2 ≤ 1000px →
  1-col ≤ 560px. Card spec §4.5. Copy = landing nivå copy (identical wording — recognition from
  landing to product). Tag: «1 poeng · gratis i beta».
- **Steg 2 «Tilpass» (`.panel`)**: one `--card` panel, `--radius-kort`, hairline-separated
  `.del` blocks (keep structure):
  - Farge (nivå ≤2): `.label` `FARGE PÅ KLEDNINGEN`; `.chips` color chips (§4.4);
    `.felt` placeholder «Egen farge — f.eks. ‘dempet salviegrønn’».
  - Stil (nivå ≥2): `.label` `VELG STIL`; `StyleStrip` selectable (§4.6).
  - Ønsker: `.label` `EGNE ØNSKER`; textarea placeholders — nivå ≤2: «F.eks. ‘behold
    dørfargen’, ‘litt lysere enn dette’» / nivå ≥3: «F.eks. ‘større vinduer mot hagen’,
    ‘skifertak’».
  - Inspirasjon (nivå ≥3): `.label` `INSPIRASJONSBILDE (VALGFRITT)`; `.btn.ghost` «Velg bilde»,
    `.filnavn` + `.fjern` kept.
  - Staging: `.brytervalg` toggle (§4.9), text: **«Vis huset nyvasket og ryddet»** +
    «Fjerner rot, skitt og parabol — og merkes alltid i resultatet.»
- **Steg 3 «Se resultatet» (`.cta`)**: `.btn.stor` label is dynamic and price-transparent:
  **«Generer visualisering — 2 poeng»** (poeng from `NIVAER`); `.poengnote` «av 10 gratis
  poeng i dag». On mobile (≤860) `.cta` gets `position: sticky; bottom: 0` with paper fill +
  top hairline while `!result && !busy` — the ask never scrolls away mid-configuration.
  Busy: `.progress` (§4.8) — stage strings unchanged (JS contract). Hints (`.hint`):
  søknadsplikt copy: «Nivå 3–4 kan foreslå tiltak som er søknadspliktige. Illustrasjon —
  ikke byggeteknisk vurdert.»
- **Result (`.resgrid`)** — 12-col: slider column cols 1–8, side cards cols 9–12; stacks ≤980px.
  - Above the slider, ✚ `.merke` badge row: «Geometri rangert — beste av 3» (only when
    candidates > 1, existing conditional) + «Inkluderer rydding og vask» when staged. Badges
    per §4.10.
  - `CompareSlider` framed per §4.7 — the reward moment; on reveal the divider does one
    150ms nudge (§5).
  - `p.illu` caption kept (all conditional fragments preserved).
  - `.juster-kort`: eyebrow `JUSTER VIDERE`; chain chips (`.stegrekke`) as numbered pills;
    `.justerform` `.felt` placeholder «Beskriv endringen — ‘mal den rød’, ‘fjern hekken’» +
    `.btn` «Juster»; `.label` `POPULÆRE IDEER` + 7 idea chips «+ bålpanne» etc. (IDEER const
    untouched).
  - Side cards (`.kort`): Palett — eyebrow `FARGEPALETT`; Estimat — eyebrow
    `GROVT KOSTNADSESTIMAT`, `.kost` table (mono tabular numerals, sum row over `--line-sterk`
    rule), `.illu` «Ikke et tilbud — grove anslag basert på norske prisguider.»;
    `.handling`: `a.btn.w100` «Få tilbud fra håndverkere i nærheten» (dead link kept),
    `a.btn.ghost.w100` «Last ned bildet», `button.btn.ghost.w100` **«Del før/etter-bildet»**
    (share card is the pre-payment growth engine, A25 — it sits directly under the håndverker
    CTA, always visible without scroll inside the card column on desktop); E-post —
    eyebrow `FÅ RAPPORTEN PÅ E-POST`, `.felt` + `.btn` «Send», thanks: «Sendt — sjekk innboksen.»
- **Footer**: compact variant — hairline, © line + illustrasjon disclaimer, on `--paper`
  (the gran-dyp band is landing-only).

---

## 4. Component specs

**4.1 Nav (`nav.site`)** — 64px tall, sticky, paper fill, bottom hairline on scroll. Links
14px/500 ink-78%; hover → ink + 1px `--gran` underline (text-underline-offset 6px). Logo
markup untouched (structural ø); size 22px, weight 600, color `--gran` in light / `--gran` in
dark (token handles it). `.btn` in nav = primary, compact (padding 8px 16px).

**4.2 Footer (`footer.site`)** — landing: inside `--gran-dyp` band per §3.1.10; app pages:
plain hairline-topped paper footer, 13.5px muted, two lines.

**4.3 Buttons (`.btn`)** — all variants share: `--radius`, 15px/600, padding 12px 20px,
inline-flex, gap 8px, 1px transparent border (keeps geometry across variants), transition
per §5. Arrow: when a button/link points forward (`→`), use one drafted inline-SVG arrow
(14×14, `M1 7h12M8 2l5 5-5 5`, stroke 1.5, square caps) — never an icon font.
- **Primary**: fill `--gran`, text `--gran-kontrast`; hover `--gran-hover`; active
  translateY(1px).
- **`.ghost`**: transparent, border `--line-sterk`, text `--ink`; hover border `--gran`,
  text `--gran`.
- **`.stor`**: padding 16px 28px, 16.5px.
- **`.w100`**: full-width, content space-between (label left, arrow right).
- **Inverted** (on `--gran-dyp`): fill `--paper`, text `--gran-dyp`; hover fill `#fff`.
- **`:disabled`**: opacity .45, cursor not-allowed, no hover — must stay visibly distinct
  (gates depend on it).
- **`.kommer`** (span, not link): ghost look at 60% opacity, no hover, cursor default,
  label «Kommer snart».

**4.4 Chips (`.chip-farge`, idea chips, `.stegrekke` chips, ✚ `.fakta`)** — pill
(`--radius-chip`), 13.5px/500, padding 6px 12px, border `--line-sterk`, `--card` fill.
`.dot` = 12px circle, inline background (JS-painted — keep), hairline ring. Hover: border
`--gran`. `.valgt` (JS class, keep name): fill `--gran-lys`, border `--gran`, text
`--gran-ink`. Chain chips add mono index «1.», «2.». Idea chips prefix a real «+» glyph
(text, not icon). `.fakta` = non-interactive outline pill, mono 11.5px uppercase.

**4.5 Cards** —
- `.kort` / `.panel`: `--card` fill, 1px `--line` border, `--radius-kort`, padding 24px,
  NO shadow. `.kort h3` 20px/600.
- `.niva` (level card): same base; `span.num` mono 13px `--gran`; h3 20px/600; p 14.5px muted;
  `span.tag` = poeng badge (§4.10) pinned bottom. Hover: border `--line-sterk`. `.valgt`:
  border `--gran` (1px, plus inset `box-shadow: 0 0 0 1px var(--gran)` for 2px optical weight),
  fill `--gran-lys`, tag inverts to `--gran`/`--gran-kontrast`. Selection must survive
  dark scheme identically (tokens do the work).

**4.6 Style strip + lightbox (`.stilstripe`, `.lysboks`)** — mechanics untouched (scroll-snap,
fixed overlay, key handling). Skin: cards 240px wide, image `--radius-bilde` with
`--skygge-bilde`; `.zoom` affordance = 28px circle, `--tag-bg` fill, drafted expand glyph.
`.stiltekst` b 16px/600 + span 13.5px muted; `.velg` link-style in `--gran` with arrow.
`.stil.valgt`: 2px `--gran` ring around image + «Valgt» badge (§4.10) top-left on the photo.
Lightbox: backdrop `rgb(20 19 15 / .8)`; content `--card`, `--radius-kort`,
`--skygge-lysboks`; caption block includes style name, one-line description, and `.btn`
«Velg denne stilen»; arrows = 44px circles, paper fill, hairline, `--skygge-flyt`.

**4.7 Slider frame (`.cmp`)** — mechanics untouched (`--pos`, clip-path, hidden range input).
Skin: `--radius-bilde`, overflow hidden, `--skygge-bilde`, 1px `--line` border (plus the
dark-scheme outline rule §2.6). Divider: 2px solid `#fff` at 92% opacity with a hairline of
`rgb(0 0 0 / .2)` on each side (reads on any photo). Handle: 40px circle, paper fill,
hairline border, two drafted chevrons ‹ ›, `--skygge-flyt`. `.taglabel` FØR/ETTER: pills,
`--tag-bg`/`--tag-ink`, mono 10.5px +0.14em, 12px inset from corners. Focus-visible on the
range input: 2px `--fokus` ring around the whole frame.

**4.8 Progress (`.progress`)** — keep width-mechanics + `role="status"`. Track: 6px tall,
`--gran-lys`, pill. `.fill`: `--gran`, pill, `transition: width .9s linear` (matches the JS
tick; reduced-motion override to none stays). `.stage`: 13.5px muted, mono, single line,
`aria-live` untouched. No shimmer, no stripes.

**4.9 Toggle (`.bryter`)** — keep geometry + `.på` class name (non-ASCII, JS-driven).
Track 40×22px pill, `--line-sterk` fill; `.på`: `--gran` fill. `.knott` 18px circle, white
(`#fff` both schemes — sits on colored track), 1px shadow. `.brytertekst b` 15px/600, span
13.5px muted. Focus-visible ring on the label wrapper.

**4.10 Badges (✚ `.merke`, `span.tag`, `.anbefalt`, poeng)** — one system: pill,
mono 11.5px/500 +0.14em uppercase, padding 4px 10px.
- Poeng: `--gran-lys` fill, `--gran-ink` text — «2 POENG».
- Trust («GEOMETRI RANGERT — BESTE AV 3», «INKLUDERER RYDDING OG VASK», «VALGT»):
  `--card` fill, hairline border, ink text; leading 6px `--gran` dot.
- `.anbefalt`: `--gran` fill, `--gran-kontrast` text.
- Never more than two badges visible on one artifact.

**4.11 Price cards (`.prices .price`)** — SØYLER, not boxes: transparent background, each
column opens with 1px `--regel-ink` top rule + 24px padding-top; gutter 32px. Inside:
`.seklabel` tier name (mono, uppercase — tier names are labels, not headlines) →
`.amount` mono 30px + `small` suffix («/mnd», «/engangs») → one-line audience sentence
(15px muted) → feature list 14.5px, 10px gaps, NO check icons (plain lines, Pilhammer
pattern) → `.btn.w100` bottom-aligned. `.feat` (Prosjekt): top rule becomes 2px `--gran`,
`.anbefalt` badge sits on the rule, column gets `--gran-lys` wash at 40% (subtle, not a box).
Columns equal-height via grid; ≤860px: 2-col; ≤560px: 1-col with hairlines between.

**4.12 Forms (`.felt`, `.venteliste`, `.justerform`, `.finnbekreft`)** — inputs: `--card`
fill, 1px `--line-sterk` border, `--radius`, padding 12px 14px, 16px text (≥16px prevents
iOS zoom at 390px); focus: border `--gran` + 2px `--fokus` ring at 25% alpha. Labels above
inputs use `.label` mono style. `::placeholder` = `--muted` at 80%. Checkbox
(`.finnbekreft`): native input scaled 18px, `accent-color: var(--gran)`; label text 13.5px
muted; the checkbox stays a real clickable gate. Inline form pattern (waitlist, juster,
finn): input flex-1 + button, gap 8px; stacks at ≤480px.

---

## 5. Motion & interaction rules

Whole budget: opacity, transform, color/border — nothing else animates. Global:
`@media (prefers-reduced-motion: reduce)` kills every rule below (existing progress override
stays).

1. **Micro-transitions**: `.btn, .chip-farge, .niva, .price, a` →
   `transition: background-color .15s, border-color .15s, color .15s, transform .15s ease`.
   Hover lift is dead (retire the current translateY lifts on cards); only buttons move:
   active state translateY(1px). Arrows in links/buttons nudge `translateX(2px)` on hover.
2. **Scroll-reveal (landing only)** ✚ `.avsloring`: opacity 0 → 1 + translateY(14px) → 0,
   `.55s cubic-bezier(.2,.7,.2,1)`, IntersectionObserver (threshold .15, unobserve after
   fire). Applied per element (kicker, h2, lede, each row/column) with 60ms stagger via
   `transition-delay` steps. Not used on /ny or /prosjekt — app pages never make the user
   wait for UI.
3. **Slider reveal nudge**: when a result first mounts, `--pos` eases 50 → 46 → 50 over
   450ms (one CSS keyframe on `.cmp.nylig`, class removed on first input) — teaches the
   interaction without a tooltip. Skipped under reduced motion.
4. **Sticky bar** (`.klistre-cta.synlig`): translateY(100%) → 0, .25s ease-out.
5. **Nav**: border-color transition .2s on scroll state.
6. **Lightbox**: backdrop opacity .2s; content scale .98 → 1 + opacity, .2s. No spring.
7. **Focus**: every interactive element gets `:focus-visible { outline: 2px solid
   var(--fokus); outline-offset: 2px; }` — visible in both schemes, never removed.
8. **Toggle knott**: `left .18s ease` (existing geometry).
No parallax, no marquee, no scroll-jacking, no hover-scale on photos.

---

## 6. Implementation notes (mapping to ref-current §3)

**tokens.css** — keep all variable names; retune per §2; ADD: `--line-sterk`, `--regel-ink`,
`--gran-kontrast`, `--gran-dyp`, `--gran-dyp-ink`, `--gran-dyp-mute`, `--fokus`, `--tag-bg`,
`--tag-ink`, `--skygge-rgb`, `--radius-kort`, `--radius-bilde`, `--radius-chip`,
`--skygge-bilde`, `--skygge-flyt`, `--skygge-lysboks`. Mirror every addition in all four
theme blocks. `--font` becomes `var(--font-sans, <current stack>)`.

**layout.tsx** — add `next/font/google` Schibsted Grotesk (400/500/600, latin + latin-ext,
`variable: '--font-sans'`), className on `<html>`. `Beacon` stays mounted.

**Structural — do not touch mechanics** (ref-current): `.cmp` stack (`--pos`, clip-path,
hidden range), `.logo .o` pseudo-ø, `.bryter/.knott/.på`, `.progress .fill` inline width,
`.lysboks` overlay, `.stilstripe` scroll-snap, `.drop` target, all JS-driven class names
(`dragover`, `valgt`, `på`, `tom`), aria attributes, stage strings, fetch contracts.

**Restyle in place**: nav, hero, `.sek/.seklabel/.sekttl/.blokklede`, `.radliste/.rad`,
`.prices/.price/.amount/.anbefalt`, `.drop/.tips`, `.nivaer/.niva`, `.panel/.del/.label`,
`.chips/.chip-farge`, `.felt`, `.cta/.poengnote`, `.resgrid/.kort/.kost`, `.hint`,
`.stilstripe/.lysboks` skins, `.venteliste`, `.finnimport/.finnbilder/.finnbekreft`,
`footer.site`, `.spinner`, `.illu`.

**Add (new classes)**: `.tallrekke` (landing metrics band), `.band` (gran-dyp panel),
`.klistre-cta` (+ `.synlig`; small client component or inline script with
IntersectionObserver), `.stegviser` (nav progress dots on /ny and /prosjekt), `.fakta`
(analysis chips), `.merke` (badge system, replaces ad-hoc badge styling), `.avsloring`
(reveal), `.side-hode` (/ny header — absorbs its inline styles), landing nivå section
(reuses `.niva` visuals as static `div`s, no button semantics).

**Retire**: dead CSS after verification — `section.block`, `.steps`, `.step`, `.step .n`,
`.swatches`, `.sw`, `.valg`; the emoji spans in `/ny` `.tips` (markup change, emoji removed);
hover translateY lifts on cards/prices; any hardcoded `#fff` text in `.btn` (→
`--gran-kontrast`).

**Migrate inline styles → classes**: /ny header + demo margin, workbench palette/email card
paragraphs, spinner paddings, `.label` margin on «Populære ideer».

**Deliberate updates flagged by ref-current**: share-card canvas colors (contract item 21)
update to the new palette — bg `#f7f4ec`, wordmark `#2e4a3b`, tagline `#6f6a5c`; keep flow
identical. Steg-3 `.btn.stor` label becomes dynamic («Generer visualisering — N poeng») —
copy change only, payload untouched. `.poengsaldo` nav chip and `/api/stats` counter are
BLOCKED on API support; ship without them rather than faking numbers.

**Copy files**: all bokmål strings in §3 are final and live in the TSX; no i18n layer.
