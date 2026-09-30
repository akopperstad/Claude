# Review 07: Brand and marketing seat, on PLAN.md and 20-synthesis

**Verdict: AGREE WITH CHANGES**

The plan keeps the "Seawise only" brand decision and the truthful-website fix. It has three gaps:
1. **The product name should change.** "Seawise Vedlikehold & Samsvar" is the wrong name.
2. **The website rebuild and brand consolidation are missing from PLAN.md.** They exist only in the synthesis (§6 item 1, weeks 4–5).
3. **The content-to-interview engine is missing entirely.** Interviews are booked only by outbound calls from the prospect database, with no inbound channel and no content supporting that outbound.

I also found a new naming risk: **"Sdir-klar"** (see edit 5).

## 1. The product name

Don't launch as "Seawise Vedlikehold & Samsvar".
- **"Samsvar" (compliance) reads as a promise.** It implies the product makes the vessel compliant. That is exactly the kind of claim markedsføringsloven § 3 (documentation) and § 6 (misleading claims) catch, and the kind I flagged on the current site ("Compliant with IHM…", "klare for inspeksjon"). It also invites a liability expectation after a failed Sdir audit.
- **Nobody searches for "samsvar".** Buyers search *vedlikeholdssystem*, *PMS* and *planlagt vedlikehold*. A category word belongs in the descriptor, where search engines and AI assistants read it, not in a product name.
- **"&" in a product name breaks consistency.** It gets written as "og", "and" or "&amp;", and the name gets shortened differently everywhere. The name must be spelled the same everywhere to build one entity.
- **One brand means one name.** A second-level product name recreates the Nautech split on a smaller scale.

**Recommendation:**
- The product is **Seawise**.
- The fixed descriptor (used in the H1, the SoftwareApplication `applicationSubCategory`, and the LinkedIn tagline) is **"vedlikeholdssystem for fiskeflåten"** / "planned maintenance system for fishing fleets".
- Compliance becomes a benefit line, not a name: *"bygd for revisjon etter 1770 § 9 og ISM"* ("built for audits under 1770 § 9 and ISM").
- Module labels are plain nouns inside the app (Vedlikehold, Sertifikater, Mannskap, Fangst). They are never marketed as separate names.

## 2. Required edits to PLAN.md

**Edit 1: M0 row** (make the website task concrete and include the brand consolidation)
- Quote: `| M0 | Foundation: truthful website, IP waivers, trademark search, holding companies + shareholder agreement | — | Arne | 11 Oct 2026 | ⬜ |`
- Replace: `| M0 | Foundation: false claims removed (48 h); trademark search SEAWISE cl. 9/42/35 NO/EU/WIPO → file NO mark if clean; nautech.no 301 → seawise.no; IP waivers + employer social-media policy check; holding companies + shareholder agreement | — | Arne | 11 Oct 2026 | ⬜ |`

**Edit 2: new milestone row after M0** (the rebuild and the entity work currently have no owner or due date)
- Insert: `| M0b | Website rebuilt, SSR/prerendered (passes curl -A GPTBot test): nb default + /en, /plattform, /designpartner, /om-oss, /sikkerhet, /innsikt, /sporsmal; JSON-LD Organization (org.nr, sameAs Brreg/LinkedIn/ÅKP) + SoftwareApplication + FAQPage per panel/07; founders' LinkedIn profiles updated | — | Claude agents (Kristian reviews) | 1 Nov 2026 | ⬜ |`

**Edit 3: new milestone row** (the content-to-interview engine)
- Insert: `| M1b | Founder-led content engine live: each founder 2 LinkedIn posts/week + 20 min/day commenting; 1 /innsikt article per 2 weeks; monthly newsletter "Frå maskinrommet"; lead magnet "KS-1260 forklart"; every piece ends with an interview CTA; ≥10 of the 30 interviews sourced inbound | 1, 3 | Arne (fishing), Kristian (ETS/class) | from 12 Oct, review 3 Jan 2027 | ⬜ |`

**Edit 4: "This week" list** (add two items)
- After `- [ ] Remove the false website claims (M0)`, insert:
  - `- [ ] Redirect nautech.no → seawise.no; stop using "Nautech™" (M0)`
  - `- [ ] Publish first LinkedIn post (topic: "Why every chief engineer keeps an Excel next to the PMS") with interview CTA (M1b)`

**Edit 5: M5 row** (a naming risk that the plan created)
- Quote: `| M5 | 2 "Sdir-klar" reviews sold | 15 | Arne | 13 Dec 2026 | ⬜ |`
- Replace: `| M5 | 2 "1770-sjekk" (maintenance & audit readiness reviews) sold | 15 | Arne | 13 Dec 2026 | ⬜ |`
- *Why:* "Sdir-klar" uses a government agency's name in a product label. It implies approval by Sdir (Sjøfartsdirektoratet), which is misleading under markedsføringsloven § 6. It also invites a complaint from the agency itself. Name the service after the regulation, not the regulator.

**Edit 6: Scoreboard header** (measure whether content is pulling its weight)
- Quote: `| Week | Interviews | Decision-makers met | Pilot proposals | Paid pilots | NOK contracted |`
- Replace: `| Week | Interviews (of which inbound) | Decision-makers met | Pilot proposals | Paid pilots | NOK contracted |`

**Edit 7: product naming** (add under "End goal", or in the synthesis §5 line 76)
- Quote (synthesis): `**Product at launch:** *Seawise Vedlikehold & Samsvar* (maintenance and compliance) for fishing vessels.`
- Replace: `**Product at launch:** *Seawise* — "vedlikeholdssystem for fiskeflåten" (planned maintenance system for fishing fleets), built for audit under 1770 § 9 and ISM. No sub-brand; module names are plain nouns inside the app.`

## 3. What is adequately covered
- False claims removed first, and the trademark search in week 1. ✔
- One brand, with a rename before the first contract if SEAWISE is blocked. ✔
- The build list (synthesis §6) includes the website, the demo tenant and "never employer data". ✔
- Local-first prospecting and the Fiskebåt Vest meeting. ✔ (This is consistent with my advice to walk the floor rather than exhibit.)
