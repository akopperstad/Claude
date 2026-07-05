# Decision Log — Exterior AI Redesign (working name: "Fasade")

This file is the drift anchor. Every bucket checkpoint verifies new work against
these decisions. Changing a decision requires an explicit entry in the
Amendments section — never a silent drift.

## Locked decisions (interview, 2026-07-05)

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| D1 | Vertical order | **Exterior first, interior stage two** | Simpler tech (facades = flat planes, one hero shot), fatter monetization (lead-gen potential), Jotun/paint culture fit. Interior follows with plantegning moat. |
| D2 | Project goal | **Real company** | Decisions optimize for market, not personal use. Foundation built to carry demand validation at stage two. |
| D3 | Core decision for first release | **Tech proof + demand-ready foundation** | Prove renders convince, built so the pipeline drops straight into a website for stage-two demand validation. Commitment is real; kill-test is on quality, not on the idea. |
| D4 | First payer | **Homeowner (enebolig)** | Owner planning maling/kledning/terrasse. Consumer, exterior-first fit. Megler/håndverker/buyer segments deferred. |
| D5 | Resources | **Serious time, 10–50k NOK budget** | Real design polish and paid AI pipeline testing are affordable; burn still matters. |
| D6 | Payment model | **Pay-per-project** | E.g. 249–499 NOK per house project (N renders + color report + product list). Credits under the hood. No subscription — repaint cycle too long for subs. |
| D7 | Design language | **Scandi premium minimal** | Airy, muted palette, generous whitespace, photography-led. Jotun/Bolia/Vipps-adjacent trust. |
| D8 | Stack | **Custom code, this repo** | Next.js + Tailwind, own subdirectory (`fasade/`). Full control over pipeline, payment, design. No builder ceiling. |
| D9 | Tech proof bar | **Founder + real houses** | 5–10 real Norwegian enebolig photos through pipeline. Pass = founder would pay for the result. |

## Deferred (explicitly NOT now)

- Interior vertical, style-discovery funnel, plantegning parsing — stage two.
- Full 3D reconstruction — likely never; 2.5D via floor plan extrusion if ever.
- Product affiliate + håndverker lead-gen — after payment model proves.
- finn.no automated ingestion — legal/ToS review first; manual photo upload for v1.
- Product name — "Fasade" is a placeholder until the brand bucket.

## Bucket plan

| Bucket | Scope | Checkpoint |
|--------|-------|------------|
| 1 | Tech proof: render pipeline prototype, before/after gallery on real houses | Founder judges vs D9 |
| 2 | Pipeline hardening: style/color presets, consistency, cost-per-render economics | 3 styles × N houses reliable; unit cost known |
| 3 | Brand + design system: name, identity, tokens, key-screen mockups | Founder approves direction |
| 4 | Website core flow: upload → style/color pick → render job → before/after results | End-to-end clickable demo |
| 5 | Payment: pay-per-project checkout (Vipps + card) | Test purchase completes |
| 6 | Launch: Norwegian copy, landing, analytics, deploy | Live URL + stage-two validation plan |

## Amendments

### 2026-07-05 — Bucket 1 checkpoint: PASSED (D9)

Founder verdict: "I would pay for this service once it was fully operational.
No doubt." Renders convince; tech proof stands. Additions locked at checkpoint:

- **A1 — Two product modes.** *Presis modus*: geometry-locked edits (paint,
  cladding, window frames, roof surface) that map to buyable products and
  leads. *Visjonsmodus*: explicitly aspirational architectural reimagining
  (window placement, roof form, solar, patio, garage, tilbygg) sold as "what
  it could be" — drives dream conversion and arkitekt/håndverker leads.
  Additive/structural changes live ONLY in visjonsmodus with a clear
  "illustrasjon — ikke byggeteknisk vurdert, tiltak kan være søknadspliktige"
  framing.
- **A2 — Color input is dual.** User picks exact color OR asks for AI
  suggestions ("overrask meg"). Both are first-class in the product flow.
- **A3 — Showcase strategy: fixer-uppers.** Marketing showcases use dated
  houses (oppussingsobjekt) transformed dramatically, not new builds.
  Window-replacement/possibility renders are the highlight ("dealbreaker"
  feature per founder).
- **A4 — Real-photo stress test pending.** Founder supplies real phone photos;
  bucket 1 test set was photorealistic demo assets.

### 2026-07-05 — Real-photo stress test + four-level model

Stress test on a real finn listing (finnkode 462003966): visjonsmodus
convinced immediately; the precise repaint drifted (roof form, window layout
re-imagined) — geometry lock on real photos is bucket 2 goal #1.

- **A5 — Four transformation levels** replace the two-mode split (A1's modes
  become the ends of a ladder). Drift tolerance, technical strategy, and
  pricing all scale with level:
  1. **Farge** — repaint only; geometry sacred.
  2. **Overflater** — materials swap (kledning, roof surface, frames, doors);
     no new elements.
  3. **Oppgradering** — new windows in existing openings, entrance, patio,
     lighting, landscaping; house stays recognizably itself — same foundation,
     AND an AI-optimized color scheme: the analysis step picks a harmonized
     palette (cladding, trim, door, roof) from the house's light, surroundings
     and neighborhood instead of keeping or arbitrarily choosing colors.
     (Validated twice: e2 refresh in bucket 1 and the founder's friend asking
     for exactly this.)
  4. **Visjon** — full architectural reimagining.
- **A6 — Global visuals disclaimer.** Everything the product outputs is
  labeled as visualization ("illustrasjon"), the pattern Norwegian consumers
  already know from prospekter. No buildability vetting anywhere; level 3–4
  additive elements get a contextual "tiltak kan være søknadspliktige" hint.
  Renders are inspiration, not engineering.

### 2026-07-05 — Bucket 2: nivå 1–2 technique change (A7, pending ratification)

- **A7 — Nivå 1–2 renders move to segmentation-based recoloring.** Bucket 2
  eval on real photos falsified both fix hypotheses for generative editing
  (prompt tuning ≈ naive; model swap ≈ no better; 2k resolution helps
  sometimes, certifies nothing). Nivå 1–2 promises geometry fidelity, so the
  cladding gets segmented and recolored deterministically; generative models
  remain for nivå 3–4 where drift tolerance is part of the definition.
  Interim beta mitigation: best-of-3 generation ranked by drift score. Full
  evidence in BUCKET-2-REPORT.md.

### 2026-07-05 — Founder additions during bucket 3

- **A9 — Two payment lanes** (refines D6, founder-proposed): *Boligjakt* —
  monthly subscription for house hunters visualizing finn candidates
  (short-lived subscriptions expected and fine; that's the use case), and
  *Prosjekt* — one-off pay-per-project for owners upgrading their home.
  Market reference: US competitors run credits (RoomGPT $9–29) and
  subscriptions (InteriorAI $49–199/mo, HomeDesignsAI $17–29/mo); nobody
  splits by life situation. The split is the differentiator.
- **A10 — Rough cost estimates on renders** (founder-proposed): each change
  element gets a price range ("kledningsbytte: ca 150–250 000 kr") from a
  per-element rate table (Norwegian sources: Byggstart-class price guides) ×
  rough quantities from the vision analysis. Wide ranges, clearly labeled
  "grovt estimat". Doubles as budget-qualification for håndverker lead-gen.
  Build in bucket 4/5.
- **Naming scope widened:** brand must carry exterior + interior + floor
  plans later — transformation words, not facade words. Candidate list under
  evaluation with founder.
- **A11 — Brand name: Vøling.** Founder decision. Domains to register:
  vøling.no (IDN) + voling.no (ASCII twin, canonical for e-post/utland) —
  both showed no DNS; verify and register at Norid ASAP. Repo directory
  stays `fasade/` until a rename is worth the churn.
- **A13 — Logo: direction 1.** Lowercase "vøling" wordmark, clean geometric
  sans, deep spruce green, the ø-stroke as the single brand gesture. Founder
  pick ("by far the best"). Spruce green becomes the brand accent across the
  design system.
- **A12 — Payment details delegated to Claude** within A9's two lanes.
  Working numbers (finalized in the payment bucket): free tier = 3 instant
  nivå-1 recolors; Boligjakt ≈ 99 kr/mnd (unlimited nivå-1 + monthly
  generative render quota); Prosjekt ≈ 399 kr one-off (full level ladder +
  fargerapport + kostnadsestimat). Vipps + kort. Undercuts US tools ($17–49)
  because our nivå-1 COGS is near zero.

### 2026-07-05 — Bucket 2 checkpoint: A7 ratified with modification

- **A7 ratified.** Segmentation-based nivå 1–2, generative nivå 3–4,
  best-of-3 interim — approved by founder.
- **A8 — Ghost overlays are internal QA only.** Founder verdict: dizzying,
  not customer material. Customer-facing trust = the before/after slider
  (already the product's core interaction) plus a simple "geometri
  kontrollert" badge backed by the internal checks. Overlays live in the
  eval pipeline and checkpoint reports only.
