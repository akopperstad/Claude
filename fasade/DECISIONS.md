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

### 2026-07-05 — Bucket 4 field-finding: render backend (A14)

- **A14 — Production generative renders run on Google's Gemini API** (the
  nano banana family maker-direct; key from aistudio.google.com, free tier
  covers validation). Field-tested during founder's local setup: Higgsfield's
  platform API exposes no image-edit models (Soul/DoP/Popcorn only — auth
  and request pattern verified live, model catalog confirmed by founder), so
  the consumer-app model we validated in buckets 1–2 is unreachable there.
  Higgsfield stays the prototyping lab via the chat connector.

### 2026-07-05 — Bucket 5 kickoff

- **A15 — Beta-first launch.** Vøling ships as a free, quota-limited beta as
  soon as bucket 5-light + deploy are done; payment (Vipps + Stripe live)
  switches on when org.nr exists. Rationale: founder field-testing surfaced
  four real bugs in hours; beta users multiply that learning while the
  paperwork grinds. Revenue timing is gated on org.nr either way.

### 2026-07-05 — Bucket 2 checkpoint: A7 ratified with modification

- **A7 ratified.** Segmentation-based nivå 1–2, generative nivå 3–4,
  best-of-3 interim — approved by founder.
- **A8 — Ghost overlays are internal QA only.** Founder verdict: dizzying,
  not customer material. Customer-facing trust = the before/after slider
  (already the product's core interaction) plus a simple "geometri
  kontrollert" badge backed by the internal checks. Overlays live in the
  eval pipeline and checkpoint reports only.

### 2026-07-05 — Interview round 2: goal review (new session)

Full app + goal review conducted; founder re-interviewed in three rounds.
Priorities re-locked as follows.

- **A16 — Definition of done, exterior (founder's own list):**
  1. All four nivåer render as their cards promise.
  2. The free-text prompt field is operational across the flow.
  3. **Iterative editing:** a follow-up instruction ("paint it red" → "…and
     remove the bushes") edits the *previous render*, not the original photo
     — render chain, not restart. This is the headline gap.
  4. finn.no listing import works (paste listing URL → photos into project).

  Acceptance = **founder field test**: 3–5 real houses end-to-end without
  apologizing. Everything else from the code review (report download,
  håndverker lead flow, render gallery) is backlog, not blocking.
- **A17 — finn.no import un-deferred.** The v1 deferral ("legal/ToS review
  first") is overridden by founder for local beta use: user pastes a finn
  URL, listing photos are fetched into their project. Flag stands: a proper
  ToS/legal review is still required before this ships on a public URL —
  listing photos carry photographer/broker copyright.
- **A18 — Pricing model: homedesigns.ai reference.** Founder wants tiers
  "along the same lines": subscription tiers with monthly render quotas +
  yearly discount. Replaces the A9/A12 three-card layout on the pricing
  page; buttons say "kommer snart" / join waitlist. Payment rails are
  explicitly deferred until the app is otherwise fully operational
  (supersedes A15's beta-payment timing; org.nr still pending, only Gemini
  API billing is in place).
- **A19 — Launch posture: local until done.** No public URL yet; field
  testing on localhost. Geometry stance for the beta: ship honest — best-of-3
  interim per A7, and the unbacked "geometri kontrollert" claim is softened
  until segmentation exists.
- **A20 — Roadmap order after exterior is done:**
  deploy (public beta) → interior restyling → payment.
  Floor plan optimization stays deferred (stage three). This re-times D1's
  stage two but does not change the sequence: exterior completes first.

### 2026-07-05 — Staging rules (founder + COO discussion)

- **A21 — "Rydd & vask" staging ladder, tiered and toggleable, never
  silent.** Founder's initial idea (always-on global rules: remove satellite
  dishes, clean junk, powerwash surfaces) was challenged and refined: silent
  edits would break the nivå 1–2 "alt annet urørt" promise and the slider
  trust anchor (A8), and inject drift by design (bucket 2 lesson). Locked
  model instead:
  - **S1 Rydd** — movable junk away (bins, hoses, tarps, trailers).
  - **S2 Vask** — visual powerwash: roof, cladding, driveway.
  - **S3 Stell** — lawn mowed, hedges trimmed.
  - **S4 Fjern installasjoner** — parabol, visible cables, old antennas
    (rides inside the same toggle, founder decision).
  One customer-facing toggle at every level ("Vis huset nyvasket og ryddet"):
  default ON at nivå 3–4, default OFF at nivå 1–2. When applied, the result
  is labeled ("Inkluderer rydding og vask") so the before/after comparison
  stays honest. Staging operations map to real services → cost-estimate
  lines (A10) and håndverker lead types. Build lands in Bucket 7.

### 2026-07-05 — Bucket 6 checkpoint PASSED + tier/style decisions

Founder field verdict on the render chain: "honestly works amazing."
Founder observation confirmed by code audit: nivå 3 and nivå 4 shared the
same change sentence, which locks "exact building volumes, rooflines and
proportions" — Visjon was forbidden by its own prompt from doing what its
card sells. Nivå 2's prompt only swapped cladding while the card promises
roof surface, frames and doors.

- **A22 — Per-tier prompt recipes.** Each nivå gets its own change recipe:
  1. *Farge* — unchanged (repaint only, hard negatives).
  2. *Overflater* — enumerated surface package: user picks cladding; the
     palette engine harmonizes roof surface, frames and doors around it
     (founder choice: AI-harmonized package, not per-element pickers).
  3. *Oppgradering* — explicit upgrade list (windows in existing openings,
     entrance, platting, lighting, landscaping) + AI palette.
  4. *Visjon* — **two-pass architect brief**: Claude drafts a bespoke, bold
     vision for THIS house (roof form, window walls, tilbygg, garage
     integration, solar...) from the analysis + owner wishes + chosen style;
     Gemini renders the brief. No volume-preservation clause — only
     same-plot/same-viewpoint anchors.
- **A23 — Quota weights 1/1/2/3.** A render costs its nivå's weight against
  the daily free quota. Protects the API bill, mirrors future pricing,
  makes tier value legible.
- **A24 — Style inputs: gallery + inspiration photo + free text.**
  Curated Norwegian style gallery (nivå 2–4), inspiration-photo upload
  (nivå 3–4, second image to the render model), free text everywhere, the
  chain for refinement. The swipe-based style-discovery funnel REMAINS
  deferred to post-deploy (per original D-list) — pre-traffic it is a demo,
  not discovery.

### 2026-07-05 — A7 interim mitigation built (pre-deploy trust gate)

- **A26 — Best-of-3 live at nivå 1–2.** Founder chose to close the geometry
  worry before the finn.no bucket. Nivå 1–2 renders generate three
  candidates in parallel; a TypeScript port of the bucket-2 edge-dice
  metric (validated here: identical 1.00, same-house restyle 0.73–0.83,
  unrelated house 0.28) ranks them against the source and the best wins.
  Scores + candidate counts go to render records and telemetry. Result is
  labeled "Geometri rangert — beste av N" — the honest form of A8's badge.
  Nivå 1–2 COGS triples at beta scale; accepted until A7 segmentation.
  Remaining worries parked deliberately: ugly-photo stress test folds into
  the finn-import checkpoint; distribution + org.nr/domener are founder
  homework in parallel.

### 2026-07-05 — Engagement mechanics (founder "trending prompts" idea, refined)

- **A25 — Honest engagement, consumption later.** Founder proposed
  "trending prompts" to provoke token usage. COO challenge accepted: with
  payment off, renders are pure COGS, and fake "trending" without users is
  fake social proof. Locked instead:
  - **«Populære ideer» chips** on the chain field — editorially curated
    one-tap follow-ups (bålpanne, utekjøkken, basseng, garasje...),
    honestly labeled. Becomes data-driven trending when real traffic exists.
  - **Anonymous local telemetry** — append-only jsonl per render event:
    level, style, staging, chained/chip source, instruction text. No photos,
    no identity beyond the quota cookie. Feeds trending, product learning,
    pricing decisions.
  - **Share card** — before/after image with Vøling watermark, one-tap
    download. Pre-payment the K-factor beats token counts.
  - Seasonal chip packs: noted, not now. Consumption-maximizing mechanics
    re-evaluated when payment lands (they become the upsell engine).
