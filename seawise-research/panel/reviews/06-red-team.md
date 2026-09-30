# Review 06: Red team on PLAN.md and 20-synthesis-and-verdict.md

**Reviewer:** Red team
**Date:** 30 Sept 2026
**Inputs:**
- `PLAN.md`
- `20-synthesis-and-verdict.md`, including the "Founder answers"
- `02-segmentation-and-thresholds.md`
- `panel/03-technical-superintendent.md`
- `01-competitors.md`
- the new facts: the trawlers run class-approved PMS; PreMaster costs about NOK 16k per vessel per month plus a yearly fee; TM Master costs about NOK 100k per vessel per year; Arne owns sales; the kill rule is accepted.

## Verdict: AGREE WITH CHANGES

The plan fixes most of what I attacked in round 1: one job instead of 12 modules, paid pilots, a kill rule, a named sales owner and truthful marketing. The direction is right.

**But the class-PMS answer breaks the plan's internal logic, and nobody has re-plumbed it.**
- The price evidence comes from the classed trawlers.
- The software wedge can only be sold to *unclassed* vessels.
- The Stage 1 ARR target assumes classed-trawler prices applied to unclassed vessels.

These three parts no longer fit together.

**P(NOK 5M ARR by end-2028) under this plan: about 7% (range 5–10%).** That is down from the 12–18% I gave for "adjusted plan" in round 1. The reason: the class fact pushes the highest-value vessels (classed ≥ 28 m trawlers, and the small OSVs in Stage 2) behind DNV-CP-0206 type approval. Realistically that approval comes in 2028–29, because the superintendent memo says DNV needs "at least two reference vessels with a year of clean history". That leaves too few years of selling to classed vessels before end-2028.
- P(≥ NOK 2M ARR by end-2028): about 30%.
- P(≥ NOK 600k ARR by end-2027, the first quit gate): about 35–40%.

---

## 1. Does the class-PMS fact undermine the beachhead? Yes, partially. It must be resolved in Gate 1

1. **The beachhead definition is now a guess about a population nobody has counted.**
   - Synthesis §4 defines the beachhead as "fishing vessels *without* a class-approved PMS arrangement… that includes many ocean-going trawlers".
   - The founders now say the trawlers they know *do* run class-approved PMS.
   - Nobody knows how many of the 264 vessels ≥ 28 m (70 in Møre og Romsdal and 75 in Vestland) are on PMS(M)/PMS.A or CMS-via-PMS. If it is most of the 153 vessels in the core licence fleet, the Møre/Vestland non-arrangement beachhead may be only about 40–100 vessels, or roughly 30–70 buyers.
2. **The "founders' expertise is deepest here" argument now points at the segment you cannot sell PMS to until 2028+.** Arne's home turf is classed whitefish trawlers, which is also his employer's competitive set.
3. **The remaining unclassed segment is a different customer.**
   - It is mostly 15–28 m coastal vessels. 70 of those 175 are in Nordland, not Møre.
   - The fleet is older (median build year 1988) and cost-sensitive.
   - It is often served through consultants: Sirkel bundles its safety management system (SMS) with PreMaster on 100+ vessels.
   - PreMaster 3.0, now cloud and backed by Longship/Star, launched at Nor-Fishing 2026.
4. **What rescues it:** the superintendent's shore-side "compliance control tower" works on *classed* trawlers too. It covers class survey windows, certificates, deviations and the critical-equipment log. It sits *beside* PreMaster/TM Master and does not replace it, so it needs no type approval. This should be the explicit wedge into classed vessels, and PMS replacement should be sold only to vessels without a survey arrangement.
   - **The catch:** a complement product is priced as a complement, around NOK 1–3k per vessel per month, not 9–12k.

## 2. Price vs wedge vs beachhead: the three numbers don't reconcile

| Element | What the plan says | Problem |
|---|---|---|
| Price anchor | PreMaster ~16k/month + yearly fee; TM Master ~100k/year | Both are invoices from **classed trawler operators**, the segment you cannot sell PMS to yet. There is no price evidence from unclassed 15–40 m vessels |
| Our list price | 9–12k per vessel per month | Plausible *only* as a PMS replacement on large vessels. It is too high for a shore-side complement, and probably too high for unclassed coastal boats |
| Stage 1 target | "10 customers / 30 vessels, NOK 3–4M ARR, 2026–27" | 30 × 9–12k × 12 = 3.2–4.3M assumes **full list price on every vessel**. But the first 3–5 customers are at the pioneer price (~50% off, locked for 24 months). A realistic mix gives **NOK 1.5–2.5M**, and 30 vessels by the end of **2027** is not realistic with first pilots in Jan 2027 and 90-day parallel runs |
| Stage 2 | "Aquaculture service + small offshore; DNV type approval, 60+ vessels, 2027–28" | Small OSVs (Havila, Sanco) are classed and on PMS arrangements. That is the same type-approval gate as the trawlers, so "small offshore" cannot come before approval |
| Kill rule | "20 qualified meetings, zero paid commitments" | Selling 2 "Sdir-klar" reviews at 25–40k would count as paid commitments and pass the rule **without any evidence that anyone will buy the software**. There is also no deadline |

## 3. Weakest remaining assumptions

1. **"Enough non-arrangement vessels exist in Møre/Vestland at list price."** Nobody has counted them or priced them. This is the #1 risk and it can be checked in 2 weeks: DNV Vessel Register and survey-arrangement status, plus the question in every interview.
2. **"Arne can own sales while employed at Lerøy Havfisk."**
   - Sales happens in customers' weekday hours. If Arne is on rotation, the sales owner is absent about half the weeks.
   - Selling to Havfisk's direct peers while employed is the duty-of-loyalty risk the lawyer check must clear first.
   - Nothing in the plan measures his availability.
3. **"Pilots convert in 90 days."** The superintendent requires the incumbent to stay the system of record for at least 3 months, and ideally a full survey cycle. Conversion happens at the earliest in Apr–May 2027.
4. **"PreMaster stays expensive and legacy."** It is now PE-backed and cloud-based, and it will match price for any named account under threat.
5. **"The product is ready for pilots by 29 Nov."** M4 includes migrating off Lovable to an owned stack, tenant isolation, a full importer and offline sign-off, all in 7 weeks, and with a DNV-CP-0206-compatible architecture (versioning, MAD export). It is doable only if the scope is cut ruthlessly. The security gate must not slip to make the date.

## 4. Unrealistic dates and missing milestones

- **M0 (11 Oct):** written IP waivers from two employers, holding companies and a shareholder agreement in one week is not realistic. Employers' legal departments do not reply in 5 days.
- **M5 and M6 (13 Dec, 3 Jan):** these land in Christmas and the start of the winter season. The skrei season and the capelin/herring fisheries run Jan–Mar, when owners and technical staff are busiest. Commit to a firm date of **28 Feb 2027**, with 3 Jan as a stretch.
- **M10 (type approval decision, Q2 2027):** this is too late. Since the home segment is classed, the TA decision is on the critical path. Start an informal DNV Ålesund dialogue in Nov 2026 and decide in Feb 2027.

**Missing milestones:**
- a class-status census,
- a DNV dialogue,
- pilot-to-annual conversion,
- recruiting a commercial advisor (it is in synthesis §8 but not in PLAN.md),
- the security gate as its own gate before any real data,
- a written weekday-availability commitment from the sales owner.

---

## 5. Required edits to PLAN.md

**E1 (line 12, Stage 1 target):**
> `| 1 | Norwegian fishing fleet | 10 customers / 30 vessels, NOK 3–4M ARR | 2026–27 |`

Replace with:
> `| 1 | Norwegian fishing fleet: PMS for vessels without a class survey arrangement + shore-side compliance tower for classed vessels | 10 customers / 30 vessels, NOK 1.5–2.5M ARR (pioneer pricing included) | Oct 2026 – mid 2028 |`

**E2 (line 13, Stage 2):**
> `| 2 | Norwegian aquaculture service + small offshore; DNV type approval | 60+ vessels | 2027–28 |`

Replace with:
> `| 2 | Norwegian aquaculture service vessels (mostly unclassed/no PMS arrangement). Classed fishing + small offshore ONLY after DNV-CP-0206 type approval (2 reference vessels × 12 months clean history) | 60+ vessels | 2028–29 |`

**E3 (line 24, M2 Gate 1):**
> `| M2 | **Gate 1:** beachhead, persona, TAM, top-3 pains quantified | 2, 4, 5 | Arne + Claude | 8 Nov 2026 | ⬜ |`

Replace with:
> `| M2 | **Gate 1:** beachhead, persona, TAM, top-3 pains quantified, **plus a class census: number of target vessels in Møre/Vestland ≥15 m on PMS(M)/PMS.A/CMS vs none, and PMS spend from ≥5 non-arrangement vessels. If fewer than 60 non-arrangement vessels, the wedge becomes the compliance tower** | 2, 4, 5 | Arne + Claude | 15 Nov 2026 | ⬜ |`

**E4 (line 34, kill rule):**
> `**Kill rule (accepted):** 20 qualified meetings with zero paid commitments means stop and re-plan.`

Replace with:
> `**Kill rule (accepted):** if by **28 Feb 2027** 20 qualified meetings (owner, CEO or technical manager; not employer-related) have produced zero *software* commitments (paid pilot or priced conditional LOI), stop and re-plan. Sdir-klar reviews do not count toward passing the rule.`

**E5 (line 50, price):**
> `- **Our list price:** NOK 9–12k per vessel per month. **Pioneer price:** about 5–6k. **Paid pilot:** NOK 45k.`

Replace with:
> `- **Our list price (hypothesis, test in M1–M3):** PMS replacement (no class arrangement) NOK 9–12k per vessel per month; compliance tower alongside an incumbent PMS NOK 1.5–3k; pioneer ~50% off for 24 months. **Paid pilot:** NOK 45k. Price evidence so far comes only from classed trawlers; get ≥5 data points from the target segment.`

**E6 (line 51, class):**
> `- **Class:** large trawlers run class-approved PMS, so DNV type approval is needed there. Validate first.`

Replace with:
> `- **Class:** large trawlers run class-approved PMS. Do NOT pitch PMS replacement to vessels on PMS(M)/PMS.A/CMS; pitch the compliance tower. Type approval needs 2 reference vessels × 12 months of clean history, so the earliest realistic date is 2028.`

**E7 (line 32, M10):**
> `| M10 | Decision on DNV type approval (if 2–3 conditional LOIs from classed vessels) | 24 | Kristian | Q2 2027 | ⬜ |`

Replace with:
> `| M10 | Informal DNV Ålesund meeting (scope, MAD interface, cost) by 30 Nov 2026 → TA go/no-go (if 2–3 conditional LOIs) | 24 | Kristian | 28 Feb 2027 | ⬜ |`

**E8 (lines 27–28, M5/M6):** change the due dates to `31 Jan 2027` for M5 and `28 Feb 2027 (stretch: 3 Jan)` for M6.

**E9 (line 22, M0):** split it.
- M0a, due 11 Oct: website, trademark search, lawyer booked.
- M0b, due 15 Nov: written employer waivers, including selling to employer competitors; holding companies; shareholder agreement with vesting and deadlock.

**E10 (add after line 32):** new milestones.
- `| M11 | Pilot → annual contract conversion, ≥2 customers, ≥6 vessels | 23 | Arne | 31 May 2027 | ⬜ |`
- `| M12 | Security gate passed (tenant isolation, invite-only, cross-tenant tests, EU region) before any real customer data | — | Kristian | before first pilot migration | ⬜ |`
- `| M13 | Part-time commercial advisor/board member signed (1–5 % with vesting) | — | Arne | 31 Jan 2027 | ⬜ |`

**E11 (line 44, scoreboard header):** add the columns `Arne weekday hours available | Software commitments (excl. advisory) | Vessels with class status known`.

**E12 (line 8, end goal):** add a sentence after it: `Near-term ARR ceiling without type approval is set by the number of non-arrangement vessels; revisit after M2.`

## Top 3 edits
E3 (class census in Gate 1), E4 (kill rule with a date and software-only commitments), E1/E5 (rebase the Stage 1 ARR and split pricing into PMS replacement vs compliance tower).
