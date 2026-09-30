# Review 01: vertical-SaaS CEO on PLAN.md and 20-synthesis-and-verdict.md

**Verdict: AGREE WITH CHANGES.**

The plan is now a sales plan rather than a build plan, and I back it. My objection is to one internal contradiction that the new facts make worse:

> **The plan prices at class-trawler levels (NOK 9–12k, anchored on PreMaster and TM Master invoices), but it defines the beachhead as vessels *without* class PMS, which are exactly the vessels that don't pay those prices.**

Fix that, and add a non-PMS entry point for the founders' home segment. Otherwise the plan is sound.

---

## 1. On the overrules

**Beachhead: "no class PMS arrangement" instead of 15–40 m. I concede the boundary.**
- Regulatory status is the right cut. My memo already said class status was the deciding variable. Length was a proxy for it.
- **But the founders' answer undercuts the synthesis's own rationale.**
  - §4 says the non-class segment "includes many ocean-going trawlers… where the founders' expertise is deepest".
  - The founders now report that the trawlers they know *do* run class-approved PMS.
- The founders' deepest domain is therefore largely **outside** the beachhead as defined. The non-class segment is weighted toward:
  - coastal vessels of 15–28 m
  - purse seiners and autoliners that are not under a Machinery PMS arrangement.
- The "~120–180 real buyers" and "57 ≥ 28 m on Sunnmøre" figures are counted by length, not class arrangement. **Re-count them.**
- "Classed" does not mean "Machinery PMS survey arrangement". Many classed vessels run the standard continuous machinery survey (CMS) and need no approved software. The status is per vessel. Check each prospect in the DNV Vessel Register (survey-arrangement field) and log it in the CRM.

**Price: NOK 9–12k instead of my 1.5k. Partly conceded.**
- On the invoice evidence, NOK 1.5k was too low for ≥28 m vessels. PreMaster is about NOK 16k per month plus a yearly fee, and TM Master about NOK 100k a year (≈ NOK 8.3k per month).
- **But both data points come from class-PMS trawlers**, the segment the plan says it will *not* sell to in 2026–27.
  - The synthesis itself says "paper and Excel pass" for the non-class segment. Those buyers' reference point is NOK 0 plus an engineer's evenings, not NOK 16k.
  - Pricing a 20 m coastal vessel at NOK 108–144k a year will stall.
- **Required:** tier the price by segment, and test it in the first 20 interviews:
  - **≥ 28 m, non-class-PMS:** list NOK 6–9k per month
  - **15–28 m:** NOK 2–4k per month
  - **Class-PMS vessels (after type approval):** NOK 9–12k per month
  - Pioneer discount: 50%.
- **Verify the PreMaster invoice line.** NOK 16k per vessel per month (≈ NOK 190k+ a year) is high against PreMas's reported ~NOK 21M revenue. Check whether the NOK 16k is per vessel or fleet-level, and whether it includes procurement modules and satellite-sync fees.
- Consequence: the Stage 1 target of "30 vessels, NOK 3–4M ARR" assumes full list price on large vessels. With pioneer discounts and a smaller-vessel mix, **NOK 1.5–2.5M ARR** is the realistic end-2027 number. The quit gates are not affected.

## 2. Does class-PMS change the wedge? Yes, for the home segment.

**What type approval means**
- On class-PMS trawlers, replacing PreMaster means the vessel loses its Machinery PMS survey credit unless the replacement is type-approved under DNV-CP-0206 ([Kongsberg TA certificate](https://kongsberg.com/globalassets/kongsberg-maritime/documents/certificates/product/k-fleet-maintenance-system-for-machinery/dnv-gl/tapms000001x.pdf), [BASSnet TA](https://www.bassnet.no/wp-content/uploads/2026/04/TAPMS000002V.pdf)).
- It is doable for small vendors (DeepBlue did it: [SuperyachtNews](https://www.superyachtnews.com/operations/deepblue-secures-dnv-type-approval-for-maintenance-software)), but it is a 2027+ project.
- **Ask DNV Ålesund** two questions:
  1. Is there a vessel-specific approval route?
  2. What does reverting to CMS cost the owner?

**The fix: a two-track wedge**
1. **Non-class-PMS vessels:** full PMS replacement, as planned.
2. **Class-PMS trawlers (founders' home turf):** a *compliance layer that sits beside PreMaster, not a replacement for it.*
   - What it covers: certificates and surveys, Sdir safety management (deviations, drills, document control), and drydock and yard projects (the VesselMan model).
   - How it connects: it reads PreMaster exports; no type approval is needed.
   - Why it matters: it lands paying logos in the segment the founders know best, builds the conditional letters of intent for M10, and puts Seawise in position to replace PreMaster once type-approved.

## 3. Sales owner = Arne: accept, with a guardrail

Arne is employed by Lerøy Havfisk and is now selling to Lerøy's direct peers. The duty-of-loyalty check in M0 must be a **hard precondition** for any fishing outreach, not a parallel task. The lawyer's advice must be in writing.

His rotation calendar also decides when interviews can happen. Put his available weekdays on the scoreboard.

---

## Required edits to PLAN.md

**E1. Key facts, class line**
> `- **Class:** large trawlers run class-approved PMS, so DNV type approval is needed there. Validate first.`

Replace with:
> `- **Class:** trawlers on a DNV *Machinery PMS* survey arrangement need DNV-CP-0206 type-approved software, or they lose survey credit. "Classed" is not the same as "Machinery PMS": many classed vessels run continuous machinery survey (CMS) and need no approved software. Check each prospect's survey arrangement in the DNV Vessel Register and log it in the CRM. Ask DNV Ålesund about vessel-specific approval and the cost of reverting to CMS.`

**E2. Key facts, price line**
> `- **Our list price:** NOK 9–12k per vessel per month. **Pioneer price:** about 5–6k. **Paid pilot:** NOK 45k.`

Replace with:
> `- **Our list price (hypothesis, test in M1):** ≥28 m non-class-PMS: 6–9k per vessel per month; 15–28 m: 2–4k; class-PMS vessels (after type approval): 9–12k. **Pioneer:** 50% off, locked 24 months. **Paid pilot:** NOK 45k (≥28 m) / 20k (<28 m). Incumbent invoices (PreMaster, TM Master) are class-trawler anchors. Verify whether the PreMaster NOK 16k line is per vessel.`

**E3. Stage 1 row (end-goal table)**
> `| 1 | Norwegian fishing fleet | 10 customers / 30 vessels, NOK 3–4M ARR | 2026–27 |`

Replace with:
> `| 1 | Norwegian fishing fleet: (a) vessels without Machinery PMS: full maintenance system; (b) class-PMS trawlers: compliance layer beside PreMaster (certificates, Sdir safety management, drydock) | 10 customers / 30 vessels, NOK 1.5–2.5M ARR (pioneer pricing) | 2026–27 |`

**E4. M1 row: add price and class discovery**
> `| M1 | 20 discovery interviews (users, the people who choose, the people who pay) | 1, 3 | Arne | 1 Nov 2026 | ⬜ |`

Replace with:
> `| M1 | 20 discovery interviews (users, the people who choose, the people who pay). Each one records the vessel's survey arrangement (Machinery PMS / CMS / unclassed), current maintenance-system cost, and a price-sensitivity question | 1, 3, 16 | Arne | 1 Nov 2026 | ⬜ |`

**E5. M10 row: make the class track produce revenue before type approval**
> `| M10 | Decision on DNV type approval (if 2–3 conditional LOIs from classed vessels) | 24 | Kristian | Q2 2027 | ⬜ |`

Replace with:
> `| M10 | Decision on DNV type approval: requires 2–3 conditional letters of intent from Machinery-PMS vessels **and** at least 1 of those owners already paying for the compliance layer. Get DNV Ålesund's cost/time estimate by Jan 2027 | 24 | Kristian | Q2 2027 | ⬜ |`

**E6. This week: duty of loyalty is a gate, not a parallel task**
> `- [ ] Book 10 interviews from the prospect database (M1)`

Replace with:
> `- [ ] Book 10 interviews from the prospect database (M1). **No outreach to fishing companies until the lawyer's written duty-of-loyalty advice for Arne (employed at Lerøy Havfisk) is in hand.** Start with non-fishing or Kristian-led contacts if it is delayed`

**E7. Kill rule: define "qualified"**
> `**Kill rule (accepted):** 20 qualified meetings with zero paid commitments means stop and re-plan.`

Replace with:
> `**Kill rule (accepted):** 20 qualified meetings (owner or technical manager, at a vessel with no Machinery PMS arrangement, or a class-PMS owner offered the compliance layer) with zero paid commitments (pilot, "Sdir-klar" review or pioneer contract) means stop and re-plan.`
