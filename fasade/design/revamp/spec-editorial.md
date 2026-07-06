# spec-editorial.md — Vøling revamp: «Editorial confidence»

Direction spec, 2026-07-05. Angle: the pilhammer editorial system — massive typographic
hierarchy, mono micro-labels, numbered spines, hairline grids — translated into Vøling
warmth: spruce green, warm paper, our own before/after photography.
Inputs honored: `ref-pilhammer.md`, `ref-seawise.md`, `ref-current.md`, `DECISIONS.md`
(D7 scandi premium minimal; A13 lowercase vøling wordmark + spruce accent; A11 name;
free quota beta; bokmål). The functional contract in `ref-current.md §2` survives intact.

---

## 1. Design stance

1. Vøling should read like a serious Norwegian design studio built it — print, not UI kit.
2. Two typographic extremes and nothing between: 104 px uppercase grotesk display against 11 px mono labels tracked +0.22em. That tension is the visual brand.
3. Structure comes from rules, not boxes: 1 px hairlines, and rule *weight* carries hierarchy. Zero shadows, zero card backgrounds on marketing surfaces, 2 px radii.
4. The whole site is an index of itself: sections 01–03, steps 01–03, styles 01–07, nivåer 1–4. Numbering telegraphs process — which IS the product (a level ladder).
5. One accent, rationed: spruce `--gran` appears tiny (numbers, tags, focus) and full-bleed only once per page as the «granmørke» material (deep spruce + faint film grain — no gradients, no light sweeps).
6. Photography is the second voice: our own before/after renders in thin frames — the only imagery. The compare slider is the hero image.
7. Warmth comes from paper (#f6f3ec, never white), ochre for the single hand-drawn marker gesture, and copy that admits things («Ikke et tilbud», «Kommer snart», illustrasjon-disclaimers as design elements).
8. Why it beats «just another AI website»: AI sites default to bold title-case, purple gradients, glass cards, emoji, fake testimonials. This is the exact inverse — medium-weight uppercase, one hue, hairlines, mono data, honest fine print. Nothing here can be mistaken for a template.
9. Every text element snaps to one of 11 named roles with per-role optical tracking. No middle ground, no ad-hoc sizes.
10. The app pages (/ny, workbench) get the same grammar at lower amplitude — the workbench is a technical document, not a dashboard.

---

## 2. Token sheet

Single source: `app/tokens.css`. **Keep every existing variable name** (renames sweep
globals.css + inline TSX uses). Retune values; add the tokens marked *new*.

### 2.1 Color

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#f6f3ec` | `#161915` | Canvas. Warm paper / green-warm near-black. Never pure white/black. |
| `--paper-dyp` *(new)* | `#ede9dd` | `#1b1f1a` | Deeper passive panel (tips strip, ventelinje band if not inverted). |
| `--card` | `#fffefa` | `#1d221d` | Rare true surfaces only: lightbox sheet, dropzone hover fill. |
| `--ink` | `#191d18` | `#eae8dc` | Text. Near-black with green undertone. |
| `--muted` | `#5f6659` | `#a0a695` | Secondary text. Darkened from today's `#837e73` — editorial body must pass AA. |
| `--line` | `#ddd7c9` | `#2d332c` | Hairlines: row dividers, column dividers, frames. |
| `--line-sterk` *(new)* | `rgba(25,29,24,.75)` | `rgba(234,232,220,.7)` | Dark 1 px rules that OPEN a list/column (hierarchy by rule weight). |
| `--gran` | `#2e4a3b` (keep) | `#93b49f` | Brand accent: section numbers, links, primary buttons, focus, `::selection`. |
| `--gran-hover` | `#24382d` | `#a8c6b3` | Hover states of the above. |
| `--gran-lys` | `#e6ece2` | `#21332a` | Quiet tinted fills: selected niva, dragover, chip-valgt. |
| `--gran-ink` | `#2c5238` | `#abcfb7` | Text on `--gran-lys`. |
| `--gran-dyp` *(new)* | `#20362b` | `#182720` | The «granmørke» material — inverted bands (footer, venteliste). Vøling's answer to pilhammer's ink panels: we invert to spruce, not black. |
| `--pa-gran` *(new)* | `#f2efe6` | `#e7eadf` | Text on `--gran-dyp`. Secondary on gran: same at 70 % alpha. |
| `--oker` *(new)* | `#b0762c` | `#d2a45c` | ONE use: the hand-drawn marker swash under one hero word. Never UI. |
| `--varsel-bg` | `#f3e9d8` (keep) | `#3a3021` | Søknadsplikt / quota hints. |
| `--varsel-ink` | `#7a5a24` (keep) | `#d9b36a` | Text in hints. |

Global rules: `::selection { background: var(--gran); color: var(--paper); }`.
Borders on `--gran-dyp` use `--pa-gran` at 25 % alpha. No other colors exist.
Banned forever: purple/blue gradients, glass blur, drop-shadow cards, emoji glyphs,
stock photography. Imagery = our generated before/after renders only.

### 2.2 Type

Families via `next/font/google` (build-time bundling, no runtime CDN):

- **Schibsted Grotesk** (variable 400–900) → `--font`. Display + body. A Norwegian-designed grotesk — provenance is part of the story. Fallback: `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- **JetBrains Mono** (400, 500) → `--font-mono`. Labels, numerals, prices, data. Fallback: `ui-monospace, "Cascadia Mono", Menlo, monospace`.

Load both in `layout.tsx` with `variable:` option; map the CSS vars in tokens.css so
globals.css keeps working unchanged.

Eleven roles — every text element on the site is exactly one of these:

| Role | Family/Weight | Size | Tracking | Case | Line-h | Used for |
|---|---|---|---|---|---|---|
| `display-xl` | Grotesk 500 | `clamp(2.6rem, 7.4vw, 6.5rem)` (41.6→104px) | −0.025em | UPPERCASE | 0.96 | Landing hero h1 only. `max-width: 15ch`. |
| `display-lg` | Grotesk 500 | `clamp(1.85rem, 4.6vw, 3.5rem)` (29.6→56px) | −0.02em | UPPERCASE | 1.02 | Landing section h2. `max-width: 20ch`. |
| `display-md` | Grotesk 500 | `clamp(1.6rem, 3vw, 2.25rem)` (25.6→36px) | −0.02em | UPPERCASE | 1.05 | App-page h1 (/ny header, prosjekt-hode). |
| `title-lg` | Grotesk 500 | `clamp(1.625rem, 2.4vw, 2rem)` (26→32px) | −0.02em | Sentence | 1.1 | Price tier names, «slik»-row titles. |
| `title` | Grotesk 500 | 19px | −0.015em | Sentence | 1.25 | Niva h3, kort h3, stil names, palette cladding. |
| `lede` | Grotesk 400 | `clamp(1.0625rem, 1.4vw, 1.1875rem)` (17→19px) | 0 | Sentence | 1.55 | Hero lede, section intros. Color `--muted`, `max-width: 34em`. |
| `body` | Grotesk 400 | 16px | 0 | Sentence | 1.6 | Paragraphs, descriptions. |
| `body-sm` | Grotesk 400 | 14.5px | 0 | Sentence | 1.5 | Feature lists, niva body, chip labels, form legal text. |
| `fine` | Grotesk 400 | 13.5px | 0 | Sentence | 1.5 | `.illu`, footnotes, disclaimers. Color `--muted`. |
| `mono-label` | Mono 500 | 11px (hero kicker 11.5px) | +0.22em (kicker +0.24em) | UPPERCASE | 1.2 | THE signature: section kickers `01 / STILER`, `.label`, `.eyebrow`, form labels, FØR/ETTER tags (10.5px +0.18em), stat labels, footer bar, badges. Color `--muted`; the number span in kickers is `--gran`. |
| `mono-num` | Mono 500 | `clamp(2.5rem, 5vw, 4rem)` (40→64px) | −0.02em | — | 1.0 | Giant numerals: `.radnr` on landing, `.stegnr` on workbench. Color `--gran` on paper, `--pa-gran` on granmørke. |
| `mono-data` | Mono 400 | 13px (price `.amount`: 15px, weight 500) | 0 | as-written, never tracked | 1.5 | Prices («99 kr/mnd»), poeng («2 poeng»), estimate table numerals, analysis line, chain chips, file names, progress stage. |

Plus two UI micro-roles: nav links Grotesk 500 13.5px +0.01em; button labels Grotesk 500
14px +0.02em. `font-feature-settings: "tnum"` on all mono-data tables.

### 2.3 Spacing

4 px base grid. Named steps (add as tokens or use literals consistently):
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- Section vertical padding: **64px mobile → 128px desktop** (`clamp(64px, 10vw, 128px)`). Confident air, slightly denser than pilhammer's 160 because we carry a product below.
- Kicker → h2: 24px. h2 → lede: 20px. Section header → content block: 48px mobile / 80px desktop.
- Grid: 12 columns, gutter 40px desktop / 20px mobile. `--maxw: 1200px` (up from 1080). Page padding: 20px (390px viewport) / 40px desktop.
- List row padding: 32px mobile / 48px desktop vertical. Feature-list line gap: 10px.
- Nav height 64px. Footer bottom bar padding 24px.

### 2.4 Radii, shadows, borders

- `--radius: 2px` (down from 6). Buttons, chips, inputs, toggle, badges: 2px — near-square, drafted.
- `--radius-bilde` *(new)*: 4px. Photography frames only: slider, style strip images, finn thumbnails, lightbox image.
- Shadows: **none** on cards/buttons/sections. Exactly two exceptions: slider handle `0 1px 4px rgba(20,24,18,.25)`; lightbox sheet sits on a scrim (`rgba(25,29,24,.88)`), not a shadow.
- Borders: 1px `--line` everywhere; 1px `--line-sterk` to open lists/columns/tiers; column dividers are `border-left: 1px solid var(--line)` + 40px padding-left. Never 2px+ decorative borders.

---

## 3. Per-page blueprints

Layout pattern names used below:
- **kicker-grid (4/8)**: 12-col grid; cols 1–4 = mono-label kicker `NN / NAVN` (number in `--gran`, `/` at 60 % opacity); cols 5–12 = display-lg h2 + lede. Repeated identically for every landing section. Mobile: stacked, kicker above.
- **rule-list (1/4/7)**: list opened by a `--line-sterk` top rule; each row a 12-col grid — col 1 numeral, cols 2–5 title, cols 6–12 description; rows divided by `--line` hairlines.
- **tariff-columns**: N equal columns, 40px gutter, each opened by its own `--line-sterk` top rule; no boxes, no backgrounds.
- **granmørke band**: full-bleed `--gran-dyp` section; text `--pa-gran`; borders `--pa-gran`/25 %; optional SVG `feTurbulence` grain overlay at 0.35 `mix-blend-mode: overlay` (the one committed texture; omit on dark theme if muddy).

### 3.1 Landing `/`

Every section: `border-bottom: 1px solid var(--line)`; padding per §2.3.

**Nav** — 64px, hairline bottom, transparent over paper (sticky, gains `background: var(--paper)` after 8px scroll). Left: wordmark (existing `.logo`, 20px). Right: `Stiler · Slik virker det · Priser` (nav-link role) + primary btn **«Prøv gratis»**. At ≤560px: links hidden, logo + CTA only.

**Hero** — 12-col split: cols 1–7 text, cols 8–12 the CompareSlider behind a `border-left: 1px solid var(--line)` + 40px padding. Min-height ~84vh desktop. Mobile: stacked, slider after text.
- Kicker (mono-label, +0.24em): **`GRATIS BETA · VISUALISERING AV BOLIG`**
- h1 (display-xl): **«SE HUSET FERDIG — FØR DU BEGYNNER.»** — the word «FERDIG» carries the single ochre hand-drawn SVG marker swash (`.marker`, `--oker`, drawn as an inline-SVG underline stroke, 500ms rise on load).
- Lede: **«Last opp ett bilde av boligen. Velg hvor langt du vil gå — fra ny farge til full forvandling — og få et fotorealistisk svar på et par minutter.»** (honest: renders take 1–2 min; drop today's «på sekunder».)
- CTA row: primary `.btn.stor` **«Start med et bilde →»** + text link **«Se de syv stilene ↓»** (underlined, arrow nudges on hover).
- Bottom stat strip (replaces `.trust` ✓-spans): `border-top: 1px solid var(--line)`, padding-top 32px, 4 columns of mono-label + body-sm value:
  `SAMMENLIGNING / Ærlig før og etter` · `NIVÅER / Fire — fra farge til visjon` · `ESTIMAT / Grovt kostnadsbilde` · `PRIS / Gratis i beta`. Mobile: 2×2.
- Slider: before `/styles/base.jpg`, after `/styles/sort-minimalisme.jpg` (unchanged), skinned per §4.6.

**01 / STILER** (`#stiler`) — kicker-grid (4/8).
- Kicker: `01 / STILER` · h2: **«ETT HUS. SYV RETNINGER.»**
- Lede: **«Samme bolig gjennom syv norske stiler — fra sørlandshvit til sort minimalisme. Trykk på et bilde for å se det stort.»**
- Content: StyleStrip full-width below (mt 48/80), horizontal scroll-snap retained. Card captions become mono-label + fine: `01 · SØRLANDSHVIT`, `02 · MODERNE KONTRAST`, `03 · LYS SKANDINAVISK`, `04 · SORT MINIMALISME`, `05 · NATURNÆR LERK`, `06 · FJELLSTIL`, `07 · HERSKAPELIG` (order = `EXTERIOR_STYLES`). Spec §4.5.

**02 / SLIK VIRKER DET** (`#slik`) — kicker-grid (4/8) + rule-list (1/4/7).
- h2: **«TRE STEG. FERDIG PÅ MINUTTER.»**
- Rows (`.radliste`/`.rad` restyled): `--line-sterk` opening rule; `.radnr` = mono-num giant numerals `01 02 03` in `--gran` (the biggest thing in the section); titles title-lg; descriptions body, `--muted`, max-width 34em:
  1. **Last opp ett bilde** — «Hele fasaden i dagslys. Mobilbilde er godt nok.»
  2. **Velg nivå og stil** — «Fra kun ny farge til arkitektonisk visjon — du bestemmer hvor langt vi går.»
  3. **Se, juster, planlegg** — «Sammenlign før og etter, juster med egne ord, og få fargepalett og grovt kostnadsestimat.»

**03 / PRISER** (`#priser`) — kicker-grid (4/8) + tariff-columns ×4.
- h2: **«GRATIS NÅ. ÆRLIG PRISET ETTERPÅ.»**
- Lede: **«Hele betaperioden er gratis — 10 poeng per dag, ingen konto. Betalte planer kommer når produktet fortjener det.»**
- `.prices` → 4 tariff columns (2×2 at ≤900px, 1-col at ≤560px). Each `.price`: `border-top: 1px solid var(--line-sterk)` + padding-top 24px; NO background, NO side borders, NO radius. Anatomy top→down: tier name (title-lg) — `.price.feat` gets rule and name in `--gran` plus right-aligned mono-label **`ANBEFALT`** in `--gran`; `.amount` mono-data 15px/500 (`0 kr`, `99 kr/mnd`, `199 kr/mnd`, `399 kr`); feature list body-sm, plain text lines, 10px gaps, **no icons, no bullets**; full-width CTA `justify-content: space-between` with drafted arrow: free tier primary **«Prøv nå →»**, paid tiers `.btn.ghost.kommer` **«Kommer snart»** (muted, no arrow, no hover).
- Tier copy (kept from current, tightened): Gratis beta: 10 poeng hver dag / Alle fire nivåer / Ingen konto nødvendig. Basis 99 kr/mnd: 50 poeng per måned / Perfekt til boligjakten / Avslutt når du vil. Pro 199 kr/mnd (ANBEFALT): 150 poeng per måned / Prioritert kø og høyere oppløsning / −20 % ved årlig betaling. Prosjekt 399 kr: Hele nivåstigen for én bolig / Fargerapport og kostnadsestimat / Del med håndverker.
- Footnote (fine, below columns): **«Prisene er veiledende frem til lansering. Ett poeng ≈ én enkel visualisering; høyere nivåer koster flere poeng.»**
- `.ventelinje` → **granmørke band** inside the section (full-bleed via negative margins or a wrapper): mono-label **`VENTELISTE`** in `--pa-gran`/70 %, line (title): **«Få beskjed når betalte planer lanseres.»**, Waitlist form: bottom-border-only input (border `--pa-gran`/50 %, focus 100 %), placeholder **«din@epost.no»**, primary button inverted (bg `--pa-gran`, text `--gran-dyp`) **«Meld meg på →»**. Success `p.ventetakk`: **«Takk — vi sier ifra når det er klart.»**

**Footer** (`footer.site`) — granmørke band, replaces the one-liner.
- Row 1 (12-col): cols 1–6 wordmark in `--pa-gran` (24px) + line **«Se boligen ferdig — før du begynner.»**; cols 7–9 mono-label `NAVIGASJON` + links Stiler / Slik virker det / Priser / Nytt prosjekt; cols 10–12 mono-label `MERKNAD` + fine-role lines **«Alle bilder er visualiseringer (illustrasjon).» «Tiltak kan være søknadspliktige.»**
- Bottom bar: `border-top: 1px solid` `--pa-gran`/25 %, mono-label 11px +0.18em: **`© 2026 VØLING · DESIGNET OG BYGGET I NORGE`** left, **`GRATIS BETA — 10 POENG PER DAG`** right. Mobile: stacked.

### 3.2 `/ny` — nytt prosjekt

Same nav; right slot shows `.eyebrow` as mono-label **`STEG 1 AV 3`**. No footer (unchanged).
Page header (migrate inline styles to classes): kicker **`NYTT PROSJEKT`**, h1 display-md **«START MED ETT BILDE.»**, body `--muted` max-width 34em: **«Hele fasaden i bildet, helst i dagslys. Vi analyserer huset og foreslår hva det kan bli.»**

Section order and pattern (single column, max-width 760px for the flow, page keeps 12-col frame):
1. **Dropzone** `.drop`: min-height 280px, 1px solid `--line`, radius 2px, transparent bg, content centered. Idle: body 500 **«Slipp bildet her»** + body-sm `--muted` **«eller trykk for å velge»** + mono-label **`JPG ELLER PNG · MAKS 15 MB`**. `.dragover` (JS class, keep name): border-color `--gran`, bg `--gran-lys`. Busy: `.spinner` **«Analyserer bildet …»**. No dashed border (genericism).
2. **Tips strip** `.tips` — REPLACES the emoji spans (hard constraint): 3 hairline-divided columns on a `--paper-dyp` band, each mono-label number + body-sm: `01 Hele fasaden i bildet` · `02 Dagslys funker best` · `03 Mobilbilde er godt nok`.
3. **Finn-import** `.finnimport`: opens with `--line-sterk` top rule + mono-label **`VURDERER DU EN BOLIG PÅ FINN?`**. Form: `.felt` bottom-border-only (§4.9), placeholder **«Lim inn lenken til annonsen …»**, button **«Hent bilder →»** / busy **«Henter …»**. `.finnbekreft` checkbox: 16px square, 2px radius, checked = `--gran` fill + paper check; legal text body-sm — wording kept EXACTLY (A27 gate). After fetch: `.finntittel` title role; `.finnvelg` body **«Velg bildet av fasaden:»**; `.finnbilder` grid (min 120px cells), thumbnails 1px `--line` frame, radius 4px, hover/focus border `--gran`; `.illu` fine disclaimer kept verbatim.
4. **Demo house** `.analyse`: hairline-topped row — mono-label **`HAR DU IKKE BILDE FOR HÅNDEN?`**, body **«Prøv med eksempelhuset vårt.»**, ghost button **«Bruk eksempelhus →»**.
5. Errors: `div.hint` per §4.11.

### 3.3 `/prosjekt/[id]` — workbench

Nav eyebrow: **`NYTT PROSJEKT`** / **`ILLUSTRASJON`** (existing logic). Loading: `.spinner` **«Henter prosjekt …»** centered, mono-data.

**Analyse header** `.prosjekt-hode`: mono-label kicker **`ANALYSERT`** (in `--gran`), h1 display-md = buildingType (uppercase via CSS), analysis line as **mono-data** joined by `·`: e.g. `trepanel · saltak med betongstein · hvite vinduer`. Bottom hairline closes the header.

**Steps** — each `.steg-seksjon` opens with a `--line-sterk` rule; h2 = `.stegnr` as mono-num giant numeral in `--gran` (TSX text `1/2/3` → `01/02/03`) baseline-aligned with 20px Grotesk 500 uppercase step title:
- **`01 / VELG NIVÅ`** — `.nivaer` 4-col grid (2×2 ≤900px, 1-col ≤560px). `.niva` tile: 1px `--line`, radius 2px, transparent, padding 20px; `span.num` mono-label **`NIVÅ 1`**; h3 title role (Farge / Overflater / Oppgradering / Visjon — copy from `NIVAER` unchanged); p body-sm `--muted`; `.tag` mono-data **`1 poeng · gratis i beta`**. `.valgt` (JS class, keep name): border-color `--gran`, bg `--gran-lys`, tag color `--gran-ink`. Hover (non-valgt): border-color `--line-sterk`. No lifts, no shadows.
- **`02 / TILPASS`** — `.panel` loses its card skin: transparent, no border, no radius; each `.del` is a hairline-topped row (first `.del` none), padding 24px 0; `.label` = mono-label. Labels: **`FARGE PÅ KLEDNINGEN`** (chips per §4.4 — paint-sample squares), custom color `.felt` placeholder **«…eller skriv en egen farge»**; **`STIL`** (StyleStrip §4.5); **`EGNE ØNSKER`** (textarea §4.9); **`INSPIRASJONSBILDE`** (ghost btn **«Velg bilde»**, `.filnavn` mono-data, `.fjern` ghost ×); staging toggle §4.8 with text **«Vis huset nyvasket og ryddet»** + body-sm `--muted` **«Rot bort, overflater vasket, plen klippet — merkes alltid i resultatet.»**
- **`03 / SE RESULTATET`** — `.cta`: `.btn.stor` **«Lag illustrasjonen →»**, `.poengnote` mono-data **`koster 2 poeng · 10 gratis hver dag`**. Progress §4.7 (stage strings unchanged — they are contract-adjacent). Søknadsplikt hint (varsel, level ≥3): **«Illustrasjon — ikke byggeteknisk vurdert. Tiltak på nivå 3–4 kan være søknadspliktige.»**

**Result** `.resgrid` — 12-col: slider cols 1–7; rail cols 8–12 behind `border-left: 1px solid var(--line)` + 40px padding (stacks ≤900px). All `.kort` cards lose backgrounds/shadows → hairline-topped blocks with mono-label headers:
- Under slider: `.illu` fine caption (conditional fragments kept verbatim: «Geometri rangert — beste av N», «Inkluderer rydding og vask», demo notice). `.juster-kort`: mono-label **`JUSTER VIDERE`**; chain chips (`.stegrekke`) mono-data numbered `1. sort kledning`-style, active `.valgt` = `--gran-lys` + `--gran-ink`; `.justerform` input placeholder **«F.eks. ‘mal døren i rørosrød’»** + button **«Juster →»**; mono-label **`POPULÆRE IDEER`** + `+`-prefixed chips (IDEER list unchanged).
- Rail: **`FARGEPALETT`** block (cladding title role, reasoning body-sm `--muted`); **`GROVT KOSTNADSESTIMAT`** block — `table.kost` with mono-data tnum numerals right-aligned, hairline row rules, `tr.sum` opened by `--line-sterk` and 500 weight, `.illu` **«Ikke et tilbud — grove anslag basert på norske prisguider.»**; `.handling` stacked full-width CTAs: primary **«Få tilbud fra håndverkere i nærheten →»**, ghost **«Last ned bildet»**, ghost **«Del før/etter-kort»**; **`FÅ RAPPORTEN PÅ E-POST`** block — email `.felt` + **«Send →»**, sent-state **«Takk — vi sender rapporten så snart den er klar.»**

Share-card canvas (contract §21): update hardcoded colors to the new sheet — bg `#f6f3ec`, wordmark `#2e4a3b`, tag pills `#191d18`, tagline `#5f6659`. FØR/ETTER tags there mirror §4.6.

---

## 4. Component specs

**4.1 Nav** `nav.site` — 64px; `border-bottom: 1px solid var(--line)`; sticky, bg `--paper` on scroll (150ms). Logo: keep the pseudo-element ø mechanics untouched (STRUCTURAL); size 20px, weight 600, color `--ink`, ø-stroke `--gran`. Links: nav-link role, `--ink` at 72 %, hover 100 % (color only). Eyebrow slot (`/ny`, workbench): mono-label.

**4.2 Footer** `footer.site` — granmørke band per §3.1. On `--gran-dyp`, links underlined on hover, focus outline `--pa-gran`.

**4.3 Buttons** — all: radius 2px, Grotesk 500 14px +0.02em, padding 10px 18px, `transition: background-color .15s, border-color .15s, color .15s`. NO transform lifts, NO shadows.
- **Primary `.btn`**: bg `--gran`, text `--paper` (dark theme: bg `--gran` [light spruce], text `#14251c`). Hover: `--gran-hover`. Carries the drafted arrow (14×14 SVG `M1 7h12M8 2l5 5-5 5`, stroke 1.5, square caps, miter joins); arrow `translate-x: 2px` on hover.
- **`.btn.stor`**: padding 14px 24px, 15px.
- **`.btn.ghost`**: transparent, 1px `--line-sterk`, text `--ink`. Hover: border + text `--gran`.
- **`.btn.kommer`**: ghost skin, text `--muted`, border `--line`, `cursor: default`, no hover, no arrow.
- **`.btn.w100`**: full width, `display: flex; justify-content: space-between` — label left, arrow right (pilhammer tariff CTA pattern).
- **`:disabled`**: bg `--line`, text `--muted`, border transparent — must stay visibly distinct (gates depend on it).
- Focus (all interactives): `:focus-visible { outline: 2px solid var(--gran); outline-offset: 2px; }` (`--pa-gran` on granmørke).

**4.4 Chips** `.chip-farge` — height 32px, radius 2px, 1px `--line`, transparent, body-sm label, padding 0 12px, gap 8px. `.dot`: 12×12 **square** swatch, radius 2px, 1px inset hairline — paint-sample, inline bg kept paintable (contract). `.valgt`: border `--gran`, bg `--gran-lys`, text `--gran-ink`. Idea chips: `+` prefix in `--gran`. Chain chips (`.stegrekke`): mono-data 12.5px, numbered. Hover: border `--line-sterk`. Disabled: opacity .45.

**4.5 Style strip + lightbox** `.stilstripe` — keep scroll-snap + fixed-overlay mechanics (STRUCTURAL). `.stil`: width 240px; `.stilbilde` img radius 4px, 1px `--line` frame; `.zoom` affordance: mono-label 10px `SE STORT` bottom-right on a `rgba(25,29,24,.72)` strip (no icon-font magnifier). `.stiltekst`: mono-label `01 · SØRLANDSHVIT` + fine desc + `.velg` text-link **«Velg →»** (selectable contexts only). `.valgt`: 1px `--gran` frame + mono-label `VALGT` in `--gran`. Lightbox `.lysboks`: scrim `rgba(25,29,24,.88)`; `.lysboks-innhold` bg `--card`, radius 4px, image bleeds to edges; `.lysboks-tekst`: mono-label style number + title + fine desc + primary **«Velg denne stilen →»**; `.lysboks-pil`/`.lysboks-lukk`: 40px square ghost buttons, 1px `--pa-gran`/40 border, drafted arrows/×. Keyboard + aria contract untouched.

**4.6 Compare slider** `.cmp` — keep `--pos`/clip-path/hidden-range mechanics (STRUCTURAL). Skin: 1px `--line` frame, radius 4px, overflow hidden. `.divider`: 1px `--paper` line. `.handle`: 28×28 square, radius 2px, bg `--paper`, 1px `--line-sterk`, shadow `0 1px 4px rgba(20,24,18,.25)`, two drafted chevrons `‹ ›` in `--ink`. `.taglabel` FØR/ETTER: mono 10.5px 500 +0.18em uppercase, bg `rgba(25,29,24,.78)`, text `#f6f3ec`, padding 4px 8px, radius 2px, 12px from corners. Identical in dark theme (tags sit on photos, not on theme).

**4.7 Progress** `.progress` — `.bar`: 2px tall, bg `--line`, no radius; `.fill`: `--gran`, inline width kept (STRUCTURAL), `transition: width .9s linear`. `.stage`: mono-data 12.5px `--muted`, min-height reserved to prevent jump. `role="status"` kept.

**4.8 Toggle** `.brytervalg` — keep knott-offset mechanics + `.på` class name (non-ASCII, STRUCTURAL). Skin: track 36×20, radius 2px, bg `--line`; `.knott` 14×14, radius 1px, bg `--paper`, 1px `--line-sterk`; `.på`: track `--gran`, knott `--paper`. Deliberately rectangular — a drafted switch, not an iOS pill. `.brytertekst` b: body-sm 500.

**4.9 Forms** — `.felt` (inputs): transparent bg, no side borders, `border-bottom: 1px solid var(--line)`, radius 0, padding 10px 2px, 15px Grotesk; focus: `border-bottom-color: var(--gran)` + `box-shadow: 0 1px 0 var(--gran)` (2px optical, no layout shift); placeholder `--muted`. Labels above: mono-label. Exception — `textarea.felt`: full 1px `--line` border, radius 2px (multiline needs a field). Checkbox (`.finnbekreft`): §3.2. Waitlist (`.venteliste`): granmørke variant per §3.1. `.justerform`: input + button on one hairline row, button ghost-sized.

**4.10 Price columns** — §3.1 «03 / PRISER» is normative: rule-opened columns, no boxes. `.feat` differentiation = `--gran` rule + `ANBEFALT` mono tag only; **no raised card, no scale transform**.

**4.11 Badges & hints** — `.anbefalt`: mono-label 10.5px `--gran`, no background. `.niva .tag` / `.poengnote`: mono-data. `div.hint` (errors + søknadsplikt): bg `--varsel-bg`, text `--varsel-ink`, 1px border `color-mix(in srgb, var(--varsel-ink) 30%, transparent)`, radius 2px, fine role, padding 12px 14px. `.eyebrow` = mono-label (alias, keep class).

---

## 5. Motion & interaction

Principle: **color and rules move; boxes never do.** Total motion budget per page ≤ what's listed here.

1. **Scroll reveal** (landing only): `.reveal` — `opacity 0→1`, `translateY(14px)→0`, `0.6s cubic-bezier(0.2, 0.7, 0.2, 1)`, staggered 60ms within a section (kicker → h2 → lede → rows). One small `'use client'` `<Reveal>` wrapper using IntersectionObserver (`threshold: 0.15`, unobserve after fire). Not used on /ny or workbench (task pages must be instant).
2. **Marker swash**: hero-only, 500ms ease-out draw/rise on load. Once, never re-triggers.
3. **Hover**: links/buttons `transition-colors 150ms`; drafted arrow `translateX(2px) 150ms`; image frames border-color to `--gran` 150ms. **Retire** today's `translateY` hover lifts on `.btn/.chip-farge/.niva/.price`.
4. **Focus**: `:focus-visible` 2px `--gran` outline, offset 2px, everywhere (contract requires visible focus).
5. **Nav**: background/border 150ms on scroll threshold.
6. **Lightbox**: 150ms opacity in; no scale/zoom animations.
7. **Progress fill**: width .9s linear (matches the 900ms tick).
8. **Reduced motion**: `@media (prefers-reduced-motion: reduce)` — `.reveal` renders visible immediately, marker static, progress fill `transition: none` (keep the existing override block), arrow nudge off. Nothing on the site *requires* motion to be understood.
9. Never: parallax, marquee, scroll-jacking, hover scale on photos, skeleton shimmer, spinners beyond the existing text `.spinner` (restyle as mono-data + steady 3-dot ellipsis animation, opacity only).

---

## 6. Implementation notes (mapping to `ref-current.md §3`)

**tokens.css** — retune all values per §2 keeping names; ADD: `--paper-dyp, --line-sterk, --gran-dyp, --pa-gran, --oker, --radius-bilde`; CHANGE: `--radius: 2px`, `--maxw: 1200px`, `--track-label: 0.22em`, `--fs-display/--fs-h2` per §2.2; add `--fs-num`, `--fs-lede` if helpful. Mirror every new token in all three theme blocks (`prefers-color-scheme: dark`, `[data-theme=dark]`, `[data-theme=light]`).

**Fonts** — `layout.tsx`: `next/font/google` Schibsted_Grotesk + JetBrains_Mono with `variable`, wire to `--font`/`--font-mono` (names unchanged → globals.css untouched by the font swap). Delete the Helvetica-first stack from tokens (it becomes the fallback inside the font var).

**globals.css, restyle in place** (classes keep names): `.wrap` (maxw/padding), `nav.site`, `.btn` family, `.eyebrow`, `.hero` (12-col split + stat strip), `.seklabel/.sek/.sekttl/.blokklede` (kicker-grid), `.radliste/.rad/.radnr` (rule-list + giant numerals), `.prices/.price/.feat/.amount/.anbefalt` (tariff columns), `.ventelinje/.venteliste/.ventetakk` (granmørke), `footer.site` (granmørke), `.drop/.tips/.analyse`, `.finnimport` family, `.nivaer/.niva/.num/.tag`, `.panel/.del/.label`, `.chips/.chip-farge/.dot`, `.felt`, `.brytervalg/.bryter/.knott`, `.cta/.poengnote`, `.progress` family, `.resgrid/.kort/.kost/.illu`, `.stilstripe`+`.lysboks` families, `.hint`, `.spinner`, `.justerform/.stegrekke/.handling/.w100/.filnavn/.fjern`, `.marker` (ochre SVG swash), `.display`.

**Do NOT touch mechanics** (contract): `.cmp` stack (`--pos`, clip-path, hidden range), `.logo .o` pseudo-ø, `.bryter/.knott/.på` geometry hooks, `.progress .fill` inline width, `.lysboks` overlay behavior, `.stilstripe` scroll-snap, `.drop` as click/drop target; JS-driven class names `dragover, valgt, på, tom` exact.

**Visually retire**: hover lifts + card shadows (shared transition block), `.trust span::before` ✓ glyphs (stat strip instead), card backgrounds on `.price/.kort/.panel/.niva` (rules instead), 6px radii, dashed anything.

**Delete after verify** (dead CSS): `section.block, .steps, .step, .step .n, .swatches, .sw, .valg`.

**TSX edits (copy/markup only, zero logic)**: new copy per §3 (hero, sections, /ny header, step titles `01/02/03`, labels, CTA strings); replace `.tips` emoji spans with numbered spans (constraint); migrate inline styles on /ny header, demo-button margin, workbench kort paragraphs and spinner paddings into classes; add stat-strip markup in hero; wrap landing sections in `<Reveal>`; update `shareCard()` hex constants (`#faf9f6→#f6f3ec`, wordmark `#2e4636→#2e4a3b`, tagline `#5c6660→#5f6659`).

**QA gates**: both themes at 390/768/1440; AA on `--muted`/`--paper` and `--pa-gran`/`--gran-dyp`; keyboard walk of lightbox/slider/toggle/forms; `prefers-reduced-motion` pass; the five ban-list items (gradients, glass, emoji, testimonials, stock vibes) grep-and-eyeball zero.
