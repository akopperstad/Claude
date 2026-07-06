# Vøling — brief for Lovable mockup

Paste-ready context for prompting Lovable. Goal: design the VISUAL LANGUAGE
and page layouts. This is a mockup only — the real product (Next.js, own
backend, AI pipeline) already exists and the design will be ported back by
hand. Use static placeholder data everywhere; no backend, no auth, no forms
that need to work.

## What Vøling is

Vøling is a Norwegian consumer web product: upload one photo of your house,
and AI shows the facade renovated — photorealistically — at four ambition
levels, from a simple repaint to a full architectural reimagining. Think
"see your house finished, before you start." The name is old Norwegian for
repairing/maintaining a house. Everything is in Norwegian bokmål.

Who it's for: homeowners planning maling/kledning/oppussing, and house
hunters visualizing homes from finn.no listings. It must feel trustworthy
enough that someone hands over a photo of the thing they love most.

Business state: free quota-limited beta (10 points per day, no account).
Paid plans come later and are shown transparently on the pricing section as
"kommer snart". The site must impress both consumers and investors.

## The product flow (3 steps, must be legible in the design)

1. **Last opp** (/ny): drop one photo, or paste a finn.no listing link and
   pick the facade photo, or try the example house.
2. **Tilpass** (workbench): choose nivå 1–4, optionally a style, own wishes
   in free text, an inspiration photo, and a "vis huset nyvasket og ryddet"
   toggle. Generate costs points (1/1/2/3 per level).
3. **Se resultatet**: before/after slider, then ITERATE — a "juster videre"
   field ("mal den rød", "fjern hekken") plus one-tap idea chips (bålpanne,
   utekjøkken, basseng...). Each adjustment builds on the previous image.
   Side panel: recommended color palette with reasoning, rough cost
   estimate table, "få tilbud fra håndverkere" CTA, download/share.

## The four levels (core product concept, copy is final)

- **Nivå 1 · Farge** (1 poeng): Ny farge på kledningen. Alt annet står urørt.
- **Nivå 2 · Overflater** (1 poeng): Ny kledning, nytt tak og nye lister. Huset beholder formen.
- **Nivå 3 · Oppgradering** (2 poeng): Nye vinduer, inngangsparti og beplantning. Huset er fortsatt seg selv.
- **Nivå 4 · Visjon** (3 poeng): Full arkitektonisk omtenkning. Se hva huset kunne vært.

## The seven styles (visual proof objects)

Same house rendered in seven Norwegian exterior styles: Sørlandshvit,
Moderne kontrast, Lys skandinavisk, Sort minimalisme, Naturnær lerk,
Fjellstil, Herskapelig klassisk. Show ALL styles at once in a grid — never
a horizontal scroll carousel. Clicking a style should lead somewhere
(preview + "prøv denne stilen på ditt hus"), never a dead end.
(Ask me for the showcase images; use warm Norwegian house photos as
placeholders otherwise.)

## Brand (locked — do not reinvent)

- Wordmark: lowercase **vøling**, the ø-stroke is the single brand gesture.
- Color: deep spruce green `#2e4a3b` as THE accent, rationed to CTAs and
  one deep-green closing band; warm paper background `#f7f4ec` (never pure
  white); ink `#1d1b17`; muted `#837e73`; hairlines `#e7e2d8`.
- Type: Schibsted Grotesk (Norwegian-designed, Google Fonts) for everything,
  sentence-case headlines that end in periods. A system monospace for tiny
  uppercase labels, numerals, prices, section kickers (01 / STILER).
- Tone: warm, honest, concrete Norwegian. Headlines like «Se huset ditt
  ferdig oppusset, før du begynner.» — never hype, never anglicisms.
- Honesty is the brand: every AI image is labeled «Illustrasjon», estimates
  say «ikke et tilbud», no fake testimonials, no invented numbers. The
  trust section sells provable mechanics (geometry ranking best-of-3,
  no tracking, always-labeled images) instead of quotes.

## Landing page structure (current, works — improve, don't discard)

1. Nav: wordmark + Stiler / Slik virker det / Priser + «Prøv gratis» CTA.
2. Hero: big headline, lede, CTA pair, and the before/after slider as the
   hero image (drag handle, FØR/ETTER tags). Photography carries the page.
3. Stat strip: 4 nivåer · 7 stiler · Geometri: beste av 3 · 0 kr, 10 poeng/dag.
4. Stiler: the 7-style grid.
5. Nivåer: the four level cards.
6. Slik virker det: three numbered rows.
7. Ærlighet: three trust columns (provable mechanics).
8. Priser: Beta (0 kr) / Boligjakt (99 kr/mnd) / Prosjekt (399 kr engangs,
   anbefalt) / Proff (ta kontakt) — paid ones say «Kommer snart» + waitlist.
9. Closing band in deep green: last CTA + waitlist + footer.

## Hard rules (break these and the mockup is unusable)

- NO purple/blue gradients, no glassmorphism, no emoji bullets, no stock
  photos of smiling people, no fake counters or testimonials.
- NO em-dashes (—) in copy. Periods, commas, middots (·).
- NO horizontal scroll sections.
- Norwegian bokmål everywhere; keep ø/å/æ.
- Before/after photography is the hero motif — the design should frame
  images like mounted prints (thin inset border, warm shadow), and the
  compare-slider concept must be visible on every page concept.
- Mobile (390px) must be first-class; sticky CTA on mobile is fine.
- Light AND dark theme if cheap to show; light is primary.

## What to ask Lovable for, concretely

"Design a 3-page marketing + product mockup for Vøling (spec above):
landing page, upload page, and the workbench (configure + result view with
before/after slider, adjustment chips, palette + cost estimate side panel).
Static data, no backend. Focus on typography, spacing rhythm, and making
the before/after photography the hero."
