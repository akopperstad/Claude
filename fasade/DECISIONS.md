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
     lighting, landscaping; house stays recognizably itself. (Validated twice:
     e2 refresh in bucket 1 and the founder's friend asking for exactly this.)
  4. **Visjon** — full architectural reimagining.
- **A6 — Global visuals disclaimer.** Everything the product outputs is
  labeled as visualization ("illustrasjon"), the pattern Norwegian consumers
  already know from prospekter. No buildability vetting anywhere; level 3–4
  additive elements get a contextual "tiltak kan være søknadspliktige" hint.
  Renders are inspiration, not engineering.
