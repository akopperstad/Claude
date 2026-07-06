# Design archaeology: pilhammer.no

Reference study for the Vøling revamp. Extracted 2026-07-05 from the live site
(HTML + CSS bundle `/_next/static/chunks/3rnx269wsajgq.css`) and verified against
1440×1000 screenshots (`scratchpad/revamp-shots/ref-pil-*.png`).
Stack: Next.js App Router + Tailwind v4, single landing page, Norwegian bokmål.

---

## 1. Typefaces

| Role | Family | Notes |
|---|---|---|
| Display + body | **Inter Tight** | `font-feature-settings: "ss01", "cv11"` (open digits, alt a); antialiased; `text-rendering: optimizelegibility` |
| Micro-labels, numerals, prices | **JetBrains Mono** | fallback `ui-monospace, "Courier New"` |
| (loaded but unused by the theme) | Geist / Geist Mono | Next.js defaults, superseded by `.ph-site` vars |

One display face + one mono. No serif, no third voice.

## 2. Type scale (exact values)

### Display
- **`headline-xl`** (hero h1): `clamp(2.6rem, 8.4vw, 7.25rem)` → **41.6→116px**, weight **600**, **UPPERCASE**, tracking **-0.035em**, line-height **0.94**. Width-capped in `ch`: `max-w-[16ch]`.
- **`headline-lg`** (section h2): `clamp(2rem, 5.6vw, 4.25rem)` → **32→68px**, weight **600**, **UPPERCASE**, tracking **-0.03em**, line-height **0.98**. `max-w-[18–24ch]`.
- Base h1/h2 rule: tracking -0.028em, weight 600, lh 1.02. h3/h4: tracking -0.02em, weight 600, lh 1.1.
- **Giant process numerals**: JetBrains Mono, weight 500, `clamp(3rem, 6vw, 5rem)` (48→80px), `leading-none tracking-tight` — "01 02 03" as the biggest thing in the section.

### Mid
- Card/service/FAQ titles: `text-2xl lg:text-3xl` (24→30px), weight **500** (`font-medium`), `tracking-tight` (-0.025em) — sentence case.
- Pricing tier names: `text-3xl lg:text-4xl` (30→36px), weight 500, tracking-tight.

### Body
- Intro paragraphs: `text-base lg:text-lg` (16→18px), `leading-relaxed` (1.625), color muted.
- Service descriptions: 16→17px (`lg:text-[17px]`); list items **15px**; pricing feature items **14.5px**; fine print **14px**; nav links **13.5px**; button labels 13–14px medium.
- Body copy is always width-capped: `max-w-2xl` / `max-w-sm`.

### The mono micro-label pattern (the signature)
```
font-mono text-[10.5px]–text-[11px] uppercase tracking-[0.22em]  ← standard
hero kicker: 11px tracking-[0.24em]   footer bar: 11px tracking-[0.18em]
color: text-muted-foreground (light bg) / text-background/75–85 (dark bg)
```
Used for: section kickers, column labels ("SLIK JOBBER VI", "STACK"), form labels,
stat labels, day-ranges ("DAG 2–6"), footer headings, "ANBEFALT" tag, © line.
**Prices are mono but NOT uppercase/tracked**: `font-mono text-[13px]` → "fra 29 000 kr".

## 3. Color palette (hex)

| Token | Value | Use |
|---|---|---|
| `--background` | **#f7f7f4** | warm paper off-white, main canvas |
| `--surface` | **#f1f0ec** | slightly deeper panel (post-launch pricing section) |
| `--foreground` | **#090e0f** | near-black ink; also full inverted sections |
| `--muted-foreground` | **#515a5b** | secondary text, green-grey undertone |
| `--border` | **#cad3d3** | hairlines, cool grey-green |
| `--accent` | **#265d5a** | deep spruce/teal — section numbers, tags, hover, `::selection`, hero wash base |
| `--accent-foreground` | **#fcfcfc** | text on accent |
| marker orange | **#e85d3a** | ONE hand-drawn highlight swash behind one hero word |

- Dark sections don't introduce new colors: they swap `bg-foreground text-background`
  and use alpha borders (`border-background/20–30`) and alpha text (`text-background/70–90`).
- `::selection { background: accent; color: accent-foreground; }` — even text selection is branded.
- Radii: `--radius-sm: 2px; md: 4px; lg: 8px`. Buttons are `rounded-sm` (2px) — near-square.

## 4. Section anatomy (the editorial system)

- Container: `max-w-[1280px] px-6 lg:px-10` (header `max-w-[1360px]`, h-72px, fixed, transparent → solid on scroll).
- Every section: `border-b border-border` + `py-16 lg:py-40` (64px mobile / **160px desktop** — huge, confident air).
- **Numbered kicker + headline grid**, repeated identically 7 times:
  ```
  grid grid-cols-12 lg:gap-x-10
    col-span-4:  <p class="font-mono text-[11px] uppercase tracking-[0.22em]">
                   <span class="text-accent">01</span><span class="mx-2 opacity-60">/</span>Studio
                 </p>
    col-span-8:  <h2 class="headline-lg max-w-[24ch]">…</h2>
                 <p class="mt-8 max-w-2xl text-muted-foreground text-base lg:text-lg">…</p>
  ```
  Sections run **00/Manifest → 06/Kontakt**. Content block follows at `mt-12 lg:mt-24`.
- **Hierarchy by rule weight, not boxes**: list groups open with a darker rule
  (`border-t border-foreground/80` or `border-foreground`), rows separated by light
  hairlines (`border-b border-border`). Zero shadows, zero card backgrounds.
- **Columns divided by hairlines**: `md:pl-12 md:border-l md:border-border` — first column has no border.

### Services rows (02/Tjenester)
```
border-t border-foreground/80          ← dark top rule for the whole list
row: grid-cols-12, py-10 lg:py-14, border-b border-border
  col-1  mono 11px numeral "01" (pt-2 for optical baseline alignment)
  col-4  title 24→30px font-medium tracking-tight
  col-7  description muted 16→17px max-w-2xl
```

### Pricing (03/Pakker) — columns, not cards
```
3 cols, gap-x-10. Each: border-t border-foreground (dark 1px) + pt-8
  tier name 30→36px medium  |  mono 10px uppercase tracking-[0.22em] text-accent "ANBEFALT"
  mt-4  mono 13px  "fra 69 000 kr"
  mt-6  description muted 15px  ·  mt-4 "Passer for…" 13.5px
  mt-10 feature list, 14.5px, gap-2.5 — plain text lines, NO check icons
  mt-12 full-width CTA: justify-between, rounded-sm, border (default) or
        bg-foreground text-background (recommended tier), arrow →
Recommended middle column raised: md:-mt-4 md:pt-4
Footnote below: 14px muted (what's NOT included — honesty in fine print)
```

### Process (04) — inverted panel
`bg-foreground text-background`; 3 cols with `border-t border-background/25 pt-8`;
giant mono numerals (48–80px) + small arrow glyph; mono kicker "DAG 2–6"; title 24→30px;
sum row at the bottom between hairlines: mono label left, "≈ 5–10 dager" right.

### FAQ (05) — rule list accordion
Mono numeral (w-6/8) + question 18→24px medium + plus icon that rotates 45° when open
(open icon `text-accent`). Answer animates via `grid-template-rows 0fr→1fr` (300ms),
indented `pl-10 lg:pl-14` to align under the question, not the numeral.

### Hero + Kontakt — the "grain-wash" material
- `.grain-wash`: base `background-color: var(--accent)` + layered gradients:
  105deg white light-sweep (`transparent 22% → #fff 38–58% at 0.3–0.62 alpha → transparent 72%`),
  two white radial ellipses (top-left 0.4, top-right 0.22), dark `--foreground`
  vignette ellipse from the bottom, flat accent underlay. `isolation: isolate; color: #fff`.
- `.grain-noise::after`: inline-SVG `feTurbulence fractalNoise baseFrequency=0.92`,
  240px tile, `opacity: 0.55; mix-blend-mode: overlay` — real film grain.
- Result: a photographic-feeling deep-green material with a soft diagonal light streak. All hero text uses `--background`/white on top of it.
- Hero: `min-h-[100vh]`, 12-col split — 7 cols text, 5 cols aside behind `lg:border-l border-background/20` with a mono-labeled SVG node-graph diagram ("FRA FRAGMENTER TIL SYSTEM": scattered boxes Web/SEO/Ads/GA4… joined by thin lines).
- One word in the hero paragraph gets the **orange (#e85d3a) hand-drawn SVG marker swash** + white underline stroke, `word-fade` 500ms entrance.
- Hero bottom: stat strip `border-t border-background/30 pt-10`, 4 cols of mono-kicker + value ("Første utkast / Dag 1").
- Kontakt reuses grain-wash + an extra `bg-foreground/45` scrim; form inputs are
  transparent with **bottom-border only** (`border-b border-background/50 → focus:border-background`), mono uppercase labels above each field.

### Buttons & arrows
Rectangular (2px radius), `px-4–5 py-2–3`, 13–14px medium. Primary: ink fill,
`hover:bg-accent`. Secondary: 1px border, `hover:border-foreground`.
Every CTA carries the same 14×14 arrow SVG: `M1 7h12M8 2l5 5-5 5`,
`stroke-width 1.5, square caps, miter joins` — a technical, drafted arrow, not a rounded icon-font one. On link hover the arrow nudges `translate-x-0.5`.

### Footer
Inverted ink panel; logo + one-liner (6 cols), three mono-kicker link columns (2 cols each);
bottom bar `border-t border-background/25`, mono 11px uppercase tracking-[0.18em]:
"© 2026 Pilhammer — Designet og bygget in-house · Oslo".

## 5. Spacing rhythm

- Section padding: **py-16 → lg:py-40** (160px). Header-to-content: `mt-12 lg:mt-24` (96px).
- Inside blocks: kicker → title `mt-6/mt-8`; title → body `mt-5/mt-8`; body → list `mt-8/mt-10`; list → CTA `mt-12`.
- List item gaps: `gap-2.5` (10px, dense pricing) / `gap-3.5` (14px, principles).
- Grid gutter: `lg:gap-x-10` (40px) everywhere; column dividers get `md:pl-12`.
- The rhythm is a strict 4px system with only two "big" jumps (24, 40 in Tailwind units) — no ad-hoc values except optical text sizes.

## 6. Motion

- **`.reveal`**: scroll-triggered entrance — `opacity 0 → 1`, `translateY(18px) → 0`,
  `0.7s cubic-bezier(0.2, 0.7, 0.2, 1)`; applied per element (kicker, title, paragraph,
  each row) so sections build in cascade. Full `prefers-reduced-motion` opt-out.
- `word-fade`: 500ms ease-out rise of the highlighted hero word (0.12em translate).
- Header: `transition-[background-color,border-color] duration-200` transparent → solid.
- FAQ: `transition-[grid-template-rows] duration-300`; plus icon `rotate-45`.
- Micro: `transition-colors` on all links/buttons; arrow `group-hover:translate-x-0.5`.
- Nothing else moves. No parallax, no marquee, no scroll-jacking.

---

## What makes it feel designed, not generated

- **Two typographic extremes, nothing in between.** 116px compressed uppercase Inter Tight at -0.035em/0.94 collides with 11px JetBrains Mono at +0.22em; that tension IS the brand. Every text element snaps to one of ~8 exact sizes with per-size optical tracking and `ch`-based line-length caps — no vague "text-xl-ish" middle ground.
- **Hairlines instead of cards.** One paper background (#f7f7f4); structure comes from 1px rules whose *weight* carries hierarchy (dark `foreground/80` top rules open a list, light #cad3d3 rules separate rows, `border-l` divides columns). Zero shadows, zero rounded boxes, 2px button radii — the page reads as print, not UI kit.
- **Editorial numbering as spine.** Sections 00–06, service rows 01–04, FAQ 01–07, giant 80px process numerals — the site is an index of itself. Numbering telegraphs process and rigor, and gives the mono font a structural job rather than a decorative one.
- **One accent, rationed; one texture, committed.** Spruce #265d5a appears at tiny scale (section numbers, ANBEFALT, selection color) but at full bleed only as a *material* — the grain-wash: accent base + diagonal light sweep + vignette + SVG turbulence grain at 0.55 overlay. It looks like lit photographic paper, not a CSS gradient trend.
- **Controlled imperfection against the grid.** A single hand-drawn orange marker swash behind one word, a scattered node-graph with mono-labeled boxes, film grain — small analog gestures that break the strictness exactly once per screen, plus craft details nobody "generates": `ss01/cv11` features, drafted square-cap arrows, `pt-2` optical baseline nudges, branded `::selection`, honest fine print under pricing.
