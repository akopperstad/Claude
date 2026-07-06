# Reference 2: seawise.no — "Seawise — Maritime software, built at sea"

Captured 2026-07-05, desktop 1440x1000 + mobile 390x844.
Screenshots: `/tmp/claude-0/-home-user-Claude/c2def4f7-3bfa-52d8-b4c6-ff42140f796b/scratchpad/revamp-shots/ref-sea-*.png` (00 = hero … 08 = footer, `ref-sea-mobile-top.png`).
Computed styles: `revamp-shots/seawise-info.json`; CSS bundle: `revamp-shots/seawise-bundle.css` (34 KB, Tailwind + shadcn tokens).

This is the founder's own company site (Seawise AS, Fosnavåg — Arne Kopperstad). One-page site, dark theme by default with a light/dark toggle and an EN/NO language toggle. Stack: Vite SPA, Tailwind, shadcn HSL variables, Google Fonts.

## Type system

- **Display / headings: Space Grotesk at weight 400** — regular weight, never bold. Tracking −0.025em, line-height 1.0 exactly (48/48, 72/72). Per-section sizes on the homepage: 72 (platform "Nautech"), 60 (counsel), 52 (contact), 48 (work intro), 40 (pilot).
- Headlines are full sentences in sentence case, ending with a period: "Software and maritime advisory." / "Built to be the only system on board." — editorial, declarative tone.
- **Card/list headings: Space Grotesk 500**, 30/36 (offer cards) and 24/32 (practice rows).
- **Body: DM Sans 400, 16/24**; secondary copy at ~70% opacity or muted-foreground. Weights 300–700 + italic loaded.
- **Eyebrow micro-labels**: uppercase, 11–12px, weight 500–600, letter-spacing 0.18em–0.32em (measured in bundle), muted blue-gray. Grammar: "THE WORK", "THE PLATFORM", "THE MODULES", "COUNSEL", "PILOT · 2026", "WRITE TO US", "OR WRITE DIRECTLY", "SUPPORTED BY", "FOUNDED 2025", and numbered variants "01 · SOFTWARE".
- Nav links: 13px, weight 500, +0.025em, foreground at 70% opacity.
- No font-size jumps inside body copy; the whole hierarchy is size + opacity + tracking, not weight.

## Palette

Zero accent hue. Everything is one navy axis (hue 210–222) from near-black to off-white. shadcn HSL tokens, two themes:

Dark (default):
- Background `hsl(222 47% 6%)` = `#080C16` — near-black navy, not pure black
- Foreground `hsl(210 30% 98%)` = `#F8FAFB`
- Card `hsl(222 44% 9%)` ≈ `#0D1321`; surface/muted `hsl(222 30% 14%)` ≈ `#191F2E`
- Muted foreground `hsl(215 16% 62%)` = `#8F9CAE` (all eyebrows, labels, secondary text)
- Border `hsl(222 22% 18%)` = `#242A38`, almost always used at **40% opacity** (`border/40`) → true hairlines
- "Primary" = near-white `hsl(210 20% 96%)` `#F3F5F7` (the EN pill, theme icon) — the only "filled" element on the page
- Custom vars: `--ocean-deep`, `--ocean-surface`, `--ocean-glow` (same values, semantic naming)

Light theme (`:root`): bg `#F8FAFB`, fg `hsl(222 47% 8%)` ≈ `#0B111E`, muted-fg `hsl(222 16% 42%)` ≈ `#5A627C`, border `hsl(222 16% 86%)` ≈ `#D6D9E1`, card white. Same structure inverted.

Radius: `--radius: 0.5rem` exists but is essentially unused — the page is all 0-radius hairlines except pill-shaped language/theme toggles (9999px).

## Section anatomy (one-pager, 6992px total at 1440)

1. **Cover / brand intro** (0–1000, `min-h-[100svh]`): no header logo, no headline — just the big wordmark PNG (517px wide) centered, "FOUNDED 2025" tracked-out beneath, "CONTINUE ↓" tracked-out at the bottom. Background: slow-drifting radial glows (inline `@keyframes auth-drift-*`) + faint topographic contour lines. A title page, not a hero pitch.
2. **The work** (1000–1932): eyebrow left, **right-aligned** 48px headline + right-aligned intro paragraph (asymmetry as a gesture). Below: 2-up grid of offer cards ("01 · SOFTWARE / Nautech", "02 · ADVISORY / Maritime advisory") separated by hairlines only — no card backgrounds, no shadows.
3. **The platform** (1932–3107): eyebrow, 72px "Nautech", 20px subhead ("Built to be the only system on board."), one honest paragraph incl. pricing model. Then "THE MODULES": 12 numbered items in a 3-col list (01–12, name + ↗), each a hairline-underlined row. Closing note: pilot teaser.
4. **Pilot** (3107–3921): whole block indented to ~30% from left. "PILOT · 2026" eyebrow, 40px "Looking for partners, not customers — yet.", two paragraphs, underlined text-link CTA "Write to the team →". No button.
5. **Counsel / advisory** (3921–5423): 60px headline over 4 numbered rows (01 Regulatory … 04 Implementation): number+title in left column, description in right column, hairline between rows. CTA "Bring a question to us →".
6. **Contact** (5423–6690): 52px "Tell us where you're at." + form that is only hairlines — NAME / EMAIL / NOTE labels (tracked uppercase micro) above bottom-border-only inputs, "Send →" underlined text link. Then "OR WRITE DIRECTLY": two people with name, role, email, phone. Then "SUPPORTED BY Innovation Norway · ÅKP · hoppid.no".
7. **Footer** (6690–end): see below.

Every section separated by `border-t border/40` hairline — the page reads as a ruled document.

## Spacing

- Section padding `py-28 sm:py-36 md:py-44` → **176px top and bottom** on desktop; with sparse content, sections breathe at 800–1500px tall.
- Content container ≈ **1072px** centered (~184px side margins at 1440).
- Cover section is exactly `100svh`.
- Grids gap via hairlines rather than gutter color; list rows ~110–170px tall with the divider carrying the rhythm.
- Density is extremely low: rarely more than a headline + 2 paragraphs per viewport.

## Imagery use

- **None.** No photography, no illustration, no screenshots of the product. The only raster asset is the wordmark PNG (used twice: header small, cover large).
- Atmosphere is generated: slow-drifting dark radial glows + hairline topographic/wave contour lines in the cover, subtly suggesting sea charts.
- Typographic devices act as the imagery: big numbered indices (01–12), arrows ↗ (module links) and → (actions), tracked-out labels.
- Result: complete visual quiet; the near-black navy field and the type carry everything.

## Navigation

- Cover state: transparent header — nav links (Nautech, Advisory, Contact), EN|NO pill toggle (active = white pill, inactive = muted), sun icon for theme. No logo until you scroll.
- Scrolled state: fixed full-width bar in background color, small wordmark left, same right cluster.
- One-pager: links smooth-scroll to sections.
- Fixed right-edge scroll indicator: 3–4 tiny horizontal dashes at mid-right marking section progress — quiet, no numbers.
- Mobile (390px): hamburger + EN|NO pill + theme icon; cover scales the wordmark down cleanly; "CONTINUE ↓" retained.

## Footer

- Hairline top border, same page background (no color block).
- Three columns: **Seawise AS** + "Fosnavåg, Norway" + a single ghost-outline LinkedIn icon button | "NAVIGATE" (tracked eyebrow) with the 3 nav links | "GET IN TOUCH" with email + phone.
- Bottom row after another hairline: "© 2026 Seawise AS" left, "IP notice" right. 13–14px, muted.
- Total footer height ~310px. No newsletter, no social wall, no legal-link soup.

## What makes it feel designed, not generated

1. **Regular-weight display type at line-height 1.0.** Space Grotesk 400 at 40–72px with −0.025em tracking and full-sentence headlines ending in periods — confidence through scale and voice instead of boldness. Generated sites default to 700/800 weights and title case.
2. **One-hue discipline with no accent color at all.** Navy-black → blue-gray → off-white; hierarchy done purely with size, opacity (70%, 62%-lightness muted), and 0.2em+ tracking. The only saturated thing on the page is nothing.
3. **A title page instead of a hero.** The first viewport sells nothing — wordmark, "FOUNDED 2025", "CONTINUE ↓". The page paces itself like a printed brochure with a cover, which no template does.
4. **A repeated index grammar.** Every section: tracked uppercase eyebrow → numbered items (01 · SOFTWARE … 12 Finance, 01 Regulatory … 04 Implementation) → hairline dividers at 40% opacity. The whole site is one consistent ruled-document system, including the form (labels + bottom borders only, no input boxes).
5. **Copy that admits things + link-only CTAs.** "Looking for partners, not customers — yet.", "priced per module, so a fleet only pays for the work it actually runs", real names/phones of the two founders — paired with underlined text links ("Write to the team →") instead of a single filled button anywhere. Restraint in the UI matches honesty in the voice.

## Notes vs. Vøling's locked decisions

Directly reusable: hairline-ruled section system, eyebrow grammar, regular-weight display type, low density, honest voice, link-style CTAs, EN/NO-style bilingual care (Vøling is bokmål-only). Diverge on: Vøling is warm (D7) and has one accent (deep spruce green, A13) — Seawise is cold navy with zero accent; and Vøling's default should be light/warm rather than dark-first.
