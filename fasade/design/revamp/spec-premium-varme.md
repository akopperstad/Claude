# Spec: «Premium varme» — Vøling revamp direction

Author: senior product design, 2026-07-05.
Angle: **Jotun/Bolia/Vipps-adjacent premium warmth** — photography-led, soft depth,
tactile paper, calm confident bokmål. Luxury without coldness.
Inputs honored: `ref-pilhammer.md`, `ref-seawise.md`, `ref-current.md`, `DECISIONS.md`
(D7 scandi premium minimal · A13 vøling wordmark + spruce accent · A11 name · beta, payment deferred).
Hard constraints honored: next/font/google build-time only; single tokens.css layer;
light + dark first-class; 390px; no gradients-purple/glass/emoji/fake-proof/stock vibes.

---

## 1. Design stance

Vøling sells a feeling before it sells a render: *your home, in caring hands*. So the
site behaves like a beautifully printed paint catalogue, not a SaaS dashboard. One warm
ivory paper, photographs mounted like prints (soft radius, inset hairline, warm shadow),
a serif display voice that speaks in calm full sentences ending with a period, and one
deep spruce accent used the way Jotun uses a brand color — sparingly on paper, generously
once, as the full-bleed footer field. Depth is soft and physical (card stock, not glass);
texture is a whisper of paper grain, never a gradient. It beats "just another AI website"
because it refuses every AI-site reflex: no bold-800 title-case hype, no gradient hero,
no glassmorphism — instead craft details (Norwegian type, honest captions under our own
photography, warm-tinted shadows) that generators never bother with.

---

## 2. Token sheet

All tokens live in `app/tokens.css`. **Existing variable names are kept** (ref-current §3);
new tokens are additive. Three theme blocks stay: `:root`, `@media (prefers-color-scheme: dark)`,
`:root[data-theme="dark"]`, `:root[data-theme="light"]` — dark values must be duplicated
in both dark blocks, as today.

### 2.1 Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#faf6ee` | `#171511` | Canvas. Warm ivory, never white; dark = warm ember-black, never blue. |
| `--paper-deep` **(new)** | `#f3ecdf` | `#1d1a14` | Deeper paper band cradling photography sections (Stiler, result area). |
| `--card` | `#fffdf8` | `#211e17` | Card stock. Slightly warmer than pure white. |
| `--ink` | `#20241d` | `#ece7da` | Primary text. Green-cast warm near-black. |
| `--muted` | `#6f6b5e` | `#9a927e` | Secondary text, captions. Warm olive-grey, AA on paper. |
| `--line` | `#e6dfd0` | `#302b20` | Hairlines, card borders. |
| `--gran` | `#2e4a3b` | `#9dbfa4` | Brand spruce. Logo, CTA fill, links, selected states. (A13 — do not drift hue.) |
| `--gran-hover` | `#243c2f` | `#b3d0ba` | CTA hover. |
| `--gran-lys` | `#e8efe5` | `#233729` | Calm spruce wash: selected chips, badges, quiet panels. |
| `--gran-ink` | `#2b4d37` | `#accdb4` | Text on `--gran-lys`; eyebrow color. |
| `--gran-dyp` **(new)** | `#233b2e` | `#1c2b22` | Full-bleed spruce field (footer, share card). Text on it = `--paper` light value. |
| `--leire` **(new)** | `#a9542c` | `#d08a63` | Clay. ONE gesture per page: the hand-drawn marker under a hero word, nothing else. |
| `--varsel-bg` | `#f4e8d3` | `#3a3021` | Warning hint background (`.hint`). |
| `--varsel-ink` | `#7a5a24` | `#d9b36a` | Warning text. |
| `--overlay` **(new)** | `rgba(32,36,29,.55)` | `rgba(10,9,6,.72)` | Lightbox backdrop. |

Rules: no other hue ever appears. `::selection { background: var(--gran); color: var(--paper); }`
(use the light-paper literal `#faf6ee` in dark so selection stays legible).
Photography is never tinted or duotoned — the renders are the truth we sell.

### 2.2 Typography

Fonts via `next/font/google` in `layout.tsx` (build-time bundled, `display: "swap"`),
exposed as CSS variables consumed by tokens.css:

- `--font-display` → **Fraunces** (variable; axes `opsz` 9–144, `wght` 400–600, `SOFT 50`).
  The warm, slightly soft serif = the "printed catalogue" voice.
- `--font` → **Schibsted Grotesk** (400/500/600). A Norwegian-designed grotesque —
  provenance is part of the brand story. Replaces the Helvetica stack.
- `--font-mono` → unchanged system stack (`ui-monospace, "Cascadia Mono", "Roboto Mono", Menlo, monospace`).
  Used only for tabular figures in the cost table.

| Role | Family / weight | Size | LH | Tracking | Case |
|---|---|---|---|---|---|
| `--fs-display` (hero h1, `.display`) | Fraunces 520, opsz auto | `clamp(38px, 5.6vw, 72px)` | 1.06 | −0.015em | Sentence case, ends with «.» |
| `--fs-h2` (section `.sekttl`) | Fraunces 500 | `clamp(28px, 3.6vw, 44px)` | 1.12 | −0.01em | Sentence case, ends with «.» |
| `--fs-h3` **(new)** (card titles, `.niva h3`, `.kort h3`) | Schibsted Grotesk 600 | 19px | 1.3 | −0.005em | Sentence case |
| `--fs-lede` **(new)** (`.lede`, `.blokklede`) | Schibsted Grotesk 400 | `clamp(17px, 1.4vw, 19px)` | 1.6 | 0 | Sentence, color `--muted`, max-width 52ch |
| `--fs-body` (body, `.rad p`, `.stiltekst span`) | Schibsted Grotesk 400 | 16.5px | 1.65 | 0 | Sentence |
| `--fs-small` (captions, `.illu`, `.poengnote`, footer) | Schibsted Grotesk 400 | 14px | 1.55 | +0.005em | Sentence |
| Eyebrow (`.eyebrow`, `.seklabel`, `.label`) | Schibsted Grotesk 500 | 12px | 1.2 | `--track-label` = **0.14em** | UPPERCASE, color `--gran-ink` |
| Button label (`.btn`) | Schibsted Grotesk 500 | 15px (`.stor`: 16px) | 1 | +0.01em | Sentence |
| Nav links | Schibsted Grotesk 500 | 14.5px | 1 | +0.01em | Sentence, `--ink` at 78% |
| Price amount (`.amount`) | Fraunces 500 | 34px | 1 | −0.01em | `small` unit: Schibsted 400 14px `--muted` |
| Process/step numerals (`.radnr`, `.stegnr`) | Fraunces **italic** 450 | 34px (`.radnr`), 22px (`.stegnr`) | 1 | 0 | color `--gran` |
| Cost table figures (`.kost td`) | `--font-mono` 400, `font-variant-numeric: tabular-nums` | 14.5px | 1.5 | 0 | — |
| Chips (`.chip-farge`) | Schibsted Grotesk 500 | 14px | 1 | +0.01em | Sentence |
| Slider tags (`.taglabel`) | Schibsted Grotesk 600 | 11px | 1 | +0.12em | UPPERCASE |
| Logo wordmark (`.logo`) | Schibsted Grotesk 600 | 22px (nav) / 64px (footer) | 1 | −0.01em | lowercase «vøling», color `--gran` |

Differentiation note: the tracked-mono-uppercase eyebrow is pilhammer's signature —
ours is tracked **sans** in spruce, and the numerals are *serif italic*, not mono. Warmer, ours.

### 2.3 Spacing

Base `--gap: 8px`, strict multiples. Named steps (use as mental scale, write px in CSS):

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- Section rhythm (`.sek`): `padding: 96px 0` desktop, `64px 0` ≤ 860px.
- Section label → h2: 16px. h2 → blokklede: 20px. Blokklede → content: 48px.
- Card padding (`.kort`, `.price`, `.panel .del`): 24px (32px on `.panel .del` desktop).
- Grid gutter: 32px desktop, 20px ≤ 860px.
- `--maxw: 1120px` (raise from 1080), `.wrap` side padding 24px (16px ≤ 480px).
- Density target: one idea per viewport on landing; workbench may be denser but each
  steg-seksjon gets 56px top margin.

### 2.4 Radii

- `--radius: 10px` — buttons, inputs, chips-rect, hints.
- `--radius-lg` **(new)**: `16px` — cards, panels, dropzone, **all photography frames** (`.cmp`, `.stilbilde`, finn thumbs, lightbox image).
- `--radius-pill` **(new)**: `999px` — badges (`.anbefalt`, `.tag`), toggle, FØR/ETTER tags.
- Never mix: a component is 10, 16 or pill — no 12/14 one-offs.

### 2.5 Shadows (soft depth — the tactile layer)

Warm-tinted (from `--ink`’s brown-green, never pure black), always paired tight + wide:

- `--skygge-1` **(new)**: `0 1px 2px rgba(32,30,20,.05), 0 3px 10px rgba(32,30,20,.05)` — resting cards.
- `--skygge-2` **(new)**: `0 2px 6px rgba(32,30,20,.06), 0 14px 36px rgba(32,30,20,.09)` — photo frames, featured price, lightbox.
- `--skygge-lyft` **(new)**: `0 3px 8px rgba(32,30,20,.07), 0 22px 48px rgba(32,30,20,.11)` — hover lift.
- Dark theme: shadows are nearly invisible on ember-black; set all three to
  `0 0 0 1px rgba(236,231,218,.07)` equivalents via a subtle lighter `--card` + `--line`
  border instead — depth in dark = value steps, not shadow.

### 2.6 Borders & texture

- Hairline: `1px solid var(--line)` — card edges, `.panel .del` separators, table rows, nav bottom (on scroll only).
- Photo mount: every image frame gets `box-shadow: inset 0 0 0 1px rgba(32,36,29,.08)`
  layered over the image (`rgba(236,231,218,.10)` in dark) — the "mounted print" edge.
- Paper grain **(new `.grain`)**: inline data-URI SVG `feTurbulence fractalNoise
  baseFrequency=0.9`, 180px tile, as `::after; opacity:.04 (light) / .06 (dark);
  pointer-events:none; position:absolute; inset:0`. Applied ONLY to the hero band and
  the spruce footer — not body-wide (perf), no `mix-blend-mode` (paint cost).

---

## 3. Per-page blueprints

All copy below is final-quality bokmål, ready to paste. Layout patterns named precisely.
Grid = CSS grid on `.wrap` content, 12 columns, 32px gutter, collapsing at 860px unless noted.

### 3.1 `/` Landing

**S1 — Nav** · *Pattern: single-row flex, space-between, sticky.*
Sticky top, background `--paper` (solid, no blur), `border-bottom: 1px solid transparent`
→ `var(--line)` after 8px scroll. Height 68px. Left: `.logo` (spruce, 22px). Right `.links`:
«Stiler» «Slik virker det» «Pris» + `.btn` **«Prøv gratis»** → `/ny`.
≤ 640px: anchor links hidden, logo + CTA remain.

**S2 — Hero** · *Pattern: 12-col grid; text col 1–6 vertically centered, media col 7–12; stacks media-below at ≤ 860px.* Band gets `.grain`.
- `.seklabel`: **«GRATIS I BETA»**
- `h1.display`: **«Se hva hjemmet ditt kan bli.»** — `.marker` clay hand-drawn underline
  (inline SVG stroke, `--leire`) under «kan bli». This is the page's only clay.
- `p.lede`: **«Last opp ett bilde av huset, velg hvor langt du vil gå — fra ny farge til
  full forvandling. Vøling viser resultatet som fotografi, ikke skisse. Ferdig på et par
  minutter.»**
- `.btn.stor`: **«Prøv med ditt hus»** · ghost beside: **«Se stilene»** (anchor `#stiler`).
- `.trust` (3 items, thin 1.5px spruce SVG check, NOT emoji): **«Gratis i beta» ·
  «Ingen konto nødvendig» · «Bygget for norske hus»**
- Media: `CompareSlider` (`base.jpg` vs `sort-minimalisme.jpg`) in mounted-print frame
  (`--radius-lg`, `--skygge-2`, inset hairline). Caption beneath, `.illu`:
  **«Sort minimalisme, nivå 2 — generert av Vøling. Dra i linjen.»**

**S3 — `#stiler` Stiler** · *Pattern: full-bleed `--paper-deep` band; inside, header row (label col 1–4, h2+lede col 5–12), then full-width StyleStrip below at 48px.*
- `.seklabel`: **«STILER»** (numbering dropped on landing — flow numbers live in the workbench).
- `h2.sekttl`: **«Farger og materialer som hører hjemme her.»**
- `.blokklede`: **«Fra sørlandshvit til sort minimalisme — hver stil er satt sammen med
  utgangspunkt i norsk byggeskikk. Trykk på et bilde for å se det nærmere.»**
- `StyleStrip` browse-only (contract §7): cards 320×400 desktop, scroll-snap, mounted-print
  frames. Microcopy under strip, `.illu`: **«Alle bildene er generert av Vøling på samme hus.»**
  (honest, and shows the product's consistency).

**S4 — `#slik` Slik virker det** · *Pattern: header row as S3; then `.radliste` — three full-width rows, hairline-separated, each row grid: numeral col 1–2, title col 3–5, text col 6–11.*
- `.seklabel`: **«SLIK VIRKER DET»** · `h2.sekttl`: **«Fra mobilbilde til ferdig illustrasjon.»**
- Rows (`.rad` = `.radnr` Fraunces italic spruce + `b` + `p`):
  1. **Last opp ett bilde** — «Et vanlig mobilbilde holder. Ta det rett forfra, i dagslys,
     med hele fasaden i ruta.»
  2. **Velg nivå og stil** — «Fra ny farge til full arkitektonisk forvandling — du bestemmer
     hvor langt vi går. Skriv gjerne egne ønsker.»
  3. **Se før og etter** — «Dra i skyvelinjen, juster med egne ord, og last ned resultatet.
     Alt er illustrasjon — inspirasjon, ikke tilbud.»

**S5 — `#priser` Priser + venteliste** · *Pattern: header row; `.prices` 4-col grid (2-col ≤ 1024px, 1-col ≤ 640px); `.ventelinje` centered row 64px below.*
- `.seklabel`: **«PRIS»** · `h2.sekttl`: **«Gratis mens vi er i beta.»**
- `.blokklede`: **«Alle får 10 gratis render-poeng om dagen. Betalte planer kommer når
  betaen er ferdig — bli varslet under.»**
- Cards (copy proposal; free tier keeps live `.btn` → `/ny`, paid keep `.btn.ghost.kommer`):
  1. **Beta** — `0 kr` /dag · «10 poeng hver dag», «Alle fire nivåer», «Før/etter og nedlasting» · CTA **«Kom i gang»**
  2. **Boligjakt** *(`.feat`, `.anbefalt` «ANBEFALT»)* — `99 kr` /mnd · «For deg som ser på boliger», «Ubegrenset nivå 1», «40 poeng i måneden» · **«Kommer snart»**
  3. **Prosjekt** — `399 kr` engangs · «Ett hus, hele stigen», «Fargerapport», «Kostnadsestimat» · **«Kommer snart»**
  4. **Proff** — `Ta kontakt` · «For meglere og håndverkere», «Volum og deling» · **«Kommer snart»**
- Fine print under grid, `.illu`: **«Prisene er foreløpige. Ingen betaling i betaperioden.»**
- `.ventelinje`: **«Vil du vite når vi lanserer?»** + `Waitlist` — placeholder
  **«din@epost.no»**, knapp **«Hold meg oppdatert»**, `.ventetakk`: **«Takk! Vi sier fra
  når det er klart.»**

**S6 — Footer** · *Pattern: full-bleed `--gran-dyp` field with `.grain`; inner grid: wordmark col 1–5 (64px, paper color), text cluster col 6–12; bottom bar full-width, hairline `rgba(paper,.2)` above.*
The page's one generous accent moment — the spruce field.
- Large lowercase **«vøling»** wordmark (same CSS-ø construction, scaled).
- Line: **«Vøling viser hva hjemmet ditt kan bli — som illustrasjon, ikke som tilbud.»**
- Disclaimer (`--fs-small`, paper @ 75%): **«Alle bilder er illustrasjoner. Større tiltak
  kan være søknadspliktige — sjekk alltid med kommunen.»**
- Bottom bar: **«© 2026 Vøling · Laget i Norge»**

### 3.2 `/ny` — Start

*Pattern: single centered column, max-width 640px; nav as landing but `.links` shows only `.eyebrow` «STEG 1 AV 3».*

1. Header (migrate inline styles → `.side-hode` class): `.eyebrow` **«STEG 1 AV 3»**,
   `h1` (Fraunces 500, 36px): **«Start med ett bilde.»**, `p.lede`:
   **«Rett forfra, i dagslys, med hele fasaden i ruta — da blir resultatet best.»**
2. **Dropzone** `.drop`: card-stock surface (`--card`, `--radius-lg`, `--skygge-1`), inner
   `1.5px dashed var(--line)` inset 10px (rounded 12px). Centered: house-outline SVG 40px
   in `--gran` (replaces nothing — additive), `b`: **«Slipp bildet her, eller trykk for å velge»**,
   under: **«JPG eller PNG, inntil 15 MB»**. `.dragover`: border → `--gran`, wash `--gran-lys`,
   scale 1.005. Busy: `.spinner` **«Laster opp …»**.
3. **Tips** `.tips` — REPLACE the three emoji spans with dot-marked micro-lines
   (5px spruce dot `::before`): **«Ta bildet rett forfra» · «Bruk dagslys» ·
   «Unngå biler og folk foran huset»**.
4. **Finn-import** `.finnimport` card (`--card`, `--radius-lg`, hairline, 24px padding):
   `.label` **«HAR DU FUNNET ET HUS PÅ FINN?»**, form: `.felt` placeholder
   **«Lim inn lenken til annonsen»** + `.btn` **«Hent bilder»**. Checkbox `.finnbekreft`
   legal text unchanged (A27 gate — keep exact behavior). After fetch: `.finntittel` bold,
   `.finnvelg` **«Velg bildet du vil ta utgangspunkt i:»**, thumbs in mounted-print
   mini-frames (radius 10px), `.illu` disclaimer unchanged.
5. **Demo** `.analyse` (migrate inline margin → class): **«Vil du bare se hvordan det
   virker?»** + `.btn.ghost` **«Prøv med eksempelhus»**.

### 3.3 `/prosjekt/[id]` — Workbench

*Pattern: single column max-width `--maxw`; each `.steg-seksjon` opens with `h2` = `.stegnr` (Fraunces italic spruce circle-free numeral) + title. Result area sits on a full-bleed `--paper-deep` band.*

- Loading: `.spinner` **«Henter prosjekt …»** (unchanged contract).
- **Analyse-hode** `.prosjekt-hode`: `.eyebrow` **«ANALYSERT»**, `h1` = buildingType
  (Fraunces 500 32px), meta `p` i `--muted` med «·»-skilletegn (kledning · tak · vinduer).
- **Steg 1** — `h2`: **«1 · Hvor langt vil du gå?»** `.nivaer` 4-col grid (2-col ≤ 1024,
  1-col ≤ 640). `.niva` = card (`--card`, `--radius-lg`, `--skygge-1`, 20px padding):
  `span.num` (Fraunces italic 24px spruce), `h3` 19/600, `p` 14.5 muted, `span.tag` pill
  (`--gran-lys`/`--gran-ink`): **«1 poeng · gratis i beta»** osv. `.valgt`: 2px `--gran`
  ring (box-shadow, ikke border — unngå layout-shift), `--gran-lys` wash, tag inverterer
  til `--gran`/paper. Card copy (proposal, NIVAER const):
  1. **Farge** — «Ny farge på kledningen. Alt annet står urørt.»
  2. **Overflater** — «Ny kledning, takflate, lister og dør — huset beholder formen.»
  3. **Oppgradering** — «Nye vinduer, inngangsparti, platting og beplantning — huset er
     fortsatt seg selv.»
  4. **Visjon** — «Full arkitektonisk forvandling. Se hva tomten egentlig rommer.»
- **Steg 2** — `h2`: **«2 · Gjør det til ditt.»** `.panel` = one card (`--card`,
  `--radius-lg`, `--skygge-1`); `.del` blocks 24/32px padding, hairline separators.
  Labels: **«FARGE»** (chips + `.felt` placeholder «Egen farge, f.eks. NCS S 7005-G20Y»),
  **«STIL»** (StyleStrip selectable — contract §7 intact), **«EGNE ØNSKER»** (textarea,
  placeholder nivåavhengig som i dag), **«INSPIRASJONSBILDE»** (nivå ≥ 3; `.btn.ghost`
  **«Velg bilde»**, `.filnavn`, `.fjern` ×), **«RYDD OG VASK»** — toggle + `.brytertekst`:
  **«Vis huset nyvasket og ryddet»** + small **«Merkes i resultatet»**.
- **Steg 3** — `h2`: **«3 · Lag illustrasjonen.»** `.cta`: `.btn.stor`
  **«Lag illustrasjon»** + `.poengnote` **«Bruker {n} av dagens 10 gratis poeng»**.
  Søknadsplikt-hint (nivå ≥ 3, `.hint`): **«Nivå 3–4 kan foreslå tiltak som er
  søknadspliktige. Illustrasjonen er inspirasjon — ikke byggeteknisk vurdert.»**
  Progress: se komponentspes §4.9; stage-strenger uendret (kontrakt §11).
- **Resultat** `.resgrid` (kolonner 8 + 4, stack ≤ 1024) på `--paper-deep`-bånd:
  - Kol 1: `CompareSlider` i stor mounted-print-ramme; `.illu`-linje uendret betinget
    innhold (kontrakt §23); `.juster-kort`: `.eyebrow` **«JUSTER VIDERE»**, kjede-chips
    (kontrakt §14), form `.felt` placeholder **«F.eks. ‘gjør døren eikegrønn’»** + `.btn`
    **«Juster»**; `.label` **«POPULÆRE IDEER»** + idé-chips (kontrakt §15).
  - Kol 2: palett-`.kort` (`.eyebrow` **«FARGEPALETT»**), estimat-`.kort` (`.eyebrow`
    **«GROVT KOSTNADSESTIMAT»**, `.kost`-tabell mono tabular-nums, `.illu` **«Ikke et
    tilbud — grove anslag basert på norske prisguider.»**), `.handling` (3 knapper:
    **«Få tilbud fra håndverkere i nærheten»** primær, **«Last ned bildet»** ghost,
    **«Del før/etter»** ghost), e-post-`.kort` (`.eyebrow` **«FÅ RAPPORTEN PÅ E-POST»**,
    knapp **«Send»**, takk: **«Takk! Rapporten er på vei.»**).

---

## 4. Component specs

**4.1 Nav (`nav.site`)** — 68px, sticky, `--paper`, bottom hairline fades in on scroll
(JS class or `scroll-timeline` fallback: always-on hairline is acceptable). Links 14.5/500
`--ink`@78%, hover → `--gran` (color only, 160ms). Logo per A13 — pseudo-element ø is
STRUCTURAL: restyle only `font-family` (Schibsted Grotesk 600), size, color `--gran`.

**4.2 Footer (`footer.site`)** — landing: full-bleed `--gran-dyp` + `.grain` (spec §3.1 S6).
Workbench: quiet variant — `--paper`, top hairline, one line © + disclaimer, 14px muted.

**4.3 Buttons (`.btn`)** — radius `--radius`, padding 12px 20px (`.stor`: 15px 28px),
15/500. **Primary**: fill `--gran`, text `#fff` (dark theme: text `#14201a` on the lifted
spruce), hover `--gran-hover` + translateY(−1px) + `--skygge-1`. **Ghost** (`.btn.ghost`):
transparent, 1px `--line` border, text `--ink`; hover border `--gran`, text `--gran`.
**Kommer** (`.btn.kommer`): ghost skin, `--muted` text, `cursor: default`, no hover motion —
visibly inert. **Disabled**: opacity .45, no shadow/transform (gates depend on visible
distinctness — kontrakt). **`.w100`**: full width, content space-between when icon present.

**4.4 Chips (`.chip-farge`)** — pill? No: radius `--radius`, 8px 14px padding, `--card` bg,
1px `--line`, 14/500. `.dot` 14px circle, inline background (paintable swatch — keep),
1px inset hairline. Hover: border `--gran`. `.valgt`: bg `--gran-lys`, border `--gran`,
text `--gran-ink`. Chain chips (`.stegrekke`) same skin, active step `.valgt`.
Idea chips prefix «+ » in `--gran`.

**4.5 Cards (`.kort`, `.panel`, `.niva`, `.price`)** — `--card`, `--radius-lg`,
1px `--line`, `--skygge-1`, 24px padding. Dark theme: border carries the depth
(shadow ≈ 0). Never nest shadows: a card inside a band gets shadow, a card inside
a card gets hairline only.

**4.6 Style strip + lightbox (`.stilstripe`, `.lysboks`)** — strip: horizontal
scroll-snap (STRUCTURAL — keep mechanics), cards 280×360 (320×400 landing), gap 20px,
mounted-print frames, `.zoom` glyph = 28px circle `--paper`@90 with thin spruce
magnifier SVG, bottom-right 12px inset. `.stil.valgt`: 2px `--gran` ring + `.velg` label
swaps to «Valgt ✓» (thin SVG check). `.stiltekst`: `b` 16/600, `span` 14 muted, on
`--card` footer strip inside the card. Lightbox: backdrop `--overlay`; `.lysboks-innhold`
max 82vh image, `--radius-lg`, `--skygge-2`; `.lysboks-tekst` card below image with
`.btn` **«Velg denne stilen»**; arrows 44px circular ghost buttons `--paper`@92; close ×
top-right same skin. Keyboard/aria contract intact (kontrakt §7).

**4.7 Compare slider (`.cmp`)** — mechanics STRUCTURAL (`--pos`, clip-path, hidden range).
Skin: frame `--radius-lg` + `--skygge-2` + inset mount hairline. `.divider` 2px `--paper`@90
with 1px `--ink`@15 edges; `.handle` 40px circle, `--card`, `--skygge-1`, two thin chevrons
in `--gran`; active (`:active` on range): scale 1.06. `.taglabel` FØR/ETTER: pill,
`--ink`@78 backdrop → text `--paper` (solid rgba, no blur), 11/600/+0.12em, 12px inset.

**4.8 Progress (`.progress`)** — track 6px pill `--gran-lys`; `.fill` `--gran`, inline
width from JS (STRUCTURAL), `transition: width .9s linear`; `.stage` 14px muted italic
(Fraunces italic 450 — the one playful voice moment), 12px under bar.
`role=status aria-live=polite` unchanged. Reduced-motion block kept (kills transition).

**4.9 Toggle (`.brytervalg`)** — geometry STRUCTURAL (`.bryter`/`.knott`/`.på` — non-ASCII
class name exact). Skin: 44×26 pill track `--line`; `.på`: track `--gran`. `.knott` 20px
`--card` circle, `--skygge-1`, 180ms transform. Label `b` 15/500 + 13px muted second line.

**4.10 Forms (`.felt`, `.justerform`, `.venteliste`, `.finnbekreft`)** — inputs: `--card`,
1px `--line`, radius `--radius`, 12px 14px, 15px; placeholder `--muted`@80.
`:focus`: border `--gran` + `box-shadow: 0 0 0 3px var(--gran-lys)` (soft halo, not glow).
Textarea same. `.justerform`: input + button on one row, gap 10px, stacks ≤ 480px.
Checkbox (`.finnbekreft`): native input scaled 1.15, `accent-color: var(--gran)`;
label text 13px muted — must stay a real clickable gate (kontrakt).

**4.11 Price cards (`.price`)** — card skin + top: tier name Fraunces 500 22px;
`.amount` Fraunces 500 34px + `small` 14 muted; `ul` 14.5px, 10px row gap, thin spruce
check `::before` (SVG mask, not emoji); CTA bottom, full width. `.feat`: `--skygge-2`,
2px `--gran` top border-image line, desktop `translateY(−8px)`. `.anbefalt` badge: pill
`--gran` fill, `--paper`-value text, 11/600/+0.12em UPPERCASE, absolute top −12px.

**4.12 Badges & labels** — `.tag`/quota pills: `--gran-lys` bg, `--gran-ink` text, pill,
12/500. `.eyebrow`/`.seklabel`/`.label`: §2.2 eyebrow row. `.hint`: `--varsel-bg` bg,
`--varsel-ink` text, radius `--radius`, 12px 16px, 14px — no icon, calm words carry it.
`.illu` captions: 13.5px `--muted`, no border.

---

## 5. Motion & interaction

Doctrine: **movement = material response, never decoration.** Everything ≤ 220ms except
scroll-reveal. All under `@media (prefers-reduced-motion: reduce) { transition: none;
animation: none; transform: none }` — extend the existing block to cover new rules.

- Hover lift (buttons primary, `.niva`, `.price`, `.stil`): `translateY(-1px)` +
  shadow step-up, `160ms cubic-bezier(.2,.7,.2,1)`. Links/chips: color/border only.
- Focus: `:focus-visible { outline: 2px solid var(--gran); outline-offset: 2px }`
  globally (keep the existing rule, retune color). Inputs use the halo instead (§4.10).
- Scroll-reveal: **landing only**, one IntersectionObserver, class `.avslør`:
  `opacity 0→1, translateY(14px)→0, 500ms` same bezier, `once: true`, applied per
  section child (label, h2, lede, content) with 60ms stagger. Never on /ny or workbench —
  a tool must not perform. Falls back to visible (class default when JS off).
- Lightbox: enter `opacity 0→1` backdrop 160ms + content `scale(.98)→1` 200ms.
- Slider handle: `transform 120ms`; grain, images: no animation ever.
- Progress: width transition only (§4.8). Nothing loops except the stage text swap
  (opacity crossfade 200ms optional).
- No parallax, no marquee, no scroll-jacking, no hover video.

---

## 6. Implementation notes (mapping onto ref-current §3)

**tokens.css** — retune every value per §2, keep all existing names. ADD:
`--paper-deep, --gran-dyp, --leire, --overlay, --skygge-1, --skygge-2, --skygge-lyft,
--radius-lg, --radius-pill, --font-display, --fs-h3, --fs-lede`. Change `--track-label`
0.12em → 0.14em, `--maxw` 1080 → 1120, `--radius` 6 → 10. Duplicate dark values into
BOTH dark blocks (media query + `[data-theme=dark]`), mirror light block.

**layout.tsx** — add `next/font/google`: `Fraunces({ axes: ['opsz','SOFT'] })` +
`Schibsted_Grotesk`, wire `variable:` class names to `--font-display` / `--font`
(tokens.css then references the vars). Build-time only — satisfies the no-CDN constraint.

**globals.css restyle (safe layer)** — nav, buttons, hero, sections, pricing, upload,
levels, result cards, chips, forms, finn grid, footer, the whole "editorial pass" layer
(`.display .marker .seklabel .sek .sekttl .radliste .rad .anbefalt`): reskin per §3–4.
`.marker` becomes the clay SVG underline (background-image data-URI, `--leire` stroke).

**Structural — skin only, do not touch mechanics**: `.cmp` stack (`--pos`, clip-path,
hidden range), `.logo .o` pseudo-ø, `.bryter/.knott/.på`, `.progress .fill` inline width,
`.lysboks` overlay, `.stilstripe` scroll-snap, `.drop` target. JS-driven class names
stay byte-exact: `dragover`, `valgt`, `på`, `tom`, `kommer`.

**ADD classes**: `.grain`, `.avslør`, `.side-hode` (/ny header — absorbs inline styles),
`.paper-deep` band wrapper, footer-spruce styles, `.trust` SVG-check treatment.

**RETIRE (verify unused, then delete)**: `section.block`, `.steps`, `.step`, `.step .n`,
`.swatches`, `.sw`, `.valg`.

**TSX touch-ups (visual only, contract intact)**: strip the three emoji in `/ny` `.tips`
→ text spans with CSS dots; migrate inline styles (/ny header + demo margin, workbench
palette/email paragraphs, spinner paddings, «Populære ideer» label margin) into classes;
landing seklabels drop «01 /» numbering. Share-card canvas (kontrakt §21): update
hardcoded `#faf9f6 → #faf6ee`, `#2e4636 → #2e4a3b`, `#5c6660 → #6f6b5e`, and paint the
footer strip `--gran-dyp #233b2e` with paper wordmark so the shared PNG matches the new
footer — deliberate, flow untouched.

**Dark scheme QA list**: photo mount hairlines flip to light rgba; shadows → borders;
primary button text flips to dark-on-lifted-spruce; `::selection` uses light-paper
literal; grain opacity .06; `.hint` and `.tag` contrast ≥ 4.5:1 (values in §2.1 pass).

**390px QA list**: hero stacks (slider below text, full-bleed minus 16px), `.prices`
1-col, `.nivaer` 1-col, `.resgrid` stacks, strip cards 240×320, nav = logo + CTA,
section padding 64px, `--fs-display` floor 38px fits «Se hva hjemmet ditt kan bli.»
on three lines.
