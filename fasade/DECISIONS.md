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

_(none yet)_
