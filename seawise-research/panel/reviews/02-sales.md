# Review 02: enterprise sales — PLAN.md

**Reviewer:** Panel member 02, enterprise sales
**Date:** 30 Sep 2026
**Verdict:** **AGREE WITH CHANGES**

## What I accept (and where I changed my mind)

- **Price.** I accept a list price of NOK 9–12k per vessel per month and a Pioneer price of about 5–6k.
  - My earlier Pioneer range of 3.5–5k was anchored on the founders' unverified NOK 25–45k claim. The invoice evidence changes that: PreMaster is about 16k per vessel per month plus a yearly fee.
  - 5–6k is still a saving of more than 60% against PreMaster, so there is no reason to go cheaper.
  - A NOK 45k pilot for 3 vessels over 90 days works out at 5k per vessel per month, which is consistent.
- **Arne as sales owner.** This is right: one name on the pipeline.
  - Arne's sea rotation is now the single biggest risk to the plan (see below).
- **Procurement in the core.** Agreed. A PreMaster customer loses requisitions and purchase orders if they switch to maintenance only. That is a hidden switching barrier and the reason you would lose the deal.
  - Keep it minimal: spare parts linked to components, then requisition, approval, purchase order, and receipt that updates stock.
  - No supplier portal or invoice matching in stage 1.
  - This adds build scope, so M4 needs to move (see below).

## Realism check: M1–M6 with one employed founder selling

The plan assumes Arne is ashore and free in weekday office hours. A trawler engineer on rotation is not.
- **While at sea:** no in-person meetings, poor connectivity for calls, and teknisk sjefer only answer on weekdays.
- **Realistic output ashore:** about 4–6 discovery meetings a week while on land, and about 1–2 a week (phone or Teams) while at sea.
- **Buyer side:** family rederier need 1–4 months from first contact to signature, plus a demo on a working product.
- **The calendar:** the product is only ready on 29 Nov. Christmas is a dead period, and the skrei (winter cod) and winter pelagic seasons start in January, when owners are busiest.

| ID | Plan | My assessment | Realistic |
|---|---|---|---|
| M1 | 20 interviews by 1 Nov | Only possible if Arne is ashore most of October, and interviews haven't been booked yet (week 41 = 0) | 20 by **15 Nov**. Kristian takes 30% (offshore/aquaculture and Sunnmøre evenings) |
| M2 | Gate 1 by 8 Nov | Depends on M1 | **22 Nov** |
| M3 | Next-10 and DMU by 22 Nov | Tight but OK once M2 moves | **6 Dec** |
| M4 | Pilot-ready by 29 Nov | Now includes procurement and offline mode | **13 Dec**, with procurement as a v1 in the pilot. It must not delay offline sign-off |
| M5 | 2 Sdir-klar reviews by 13 Dec | December is busy; 1 is realistic | **1 by 20 Dec, 2 by 31 Jan** |
| M6 | 2 paid pilots by 3 Jan | Very unlikely: product ready 29 Nov, then Christmas | **1 signed by 15 Jan, 2 by 28 Feb.** The pilots start in port or at the yard, not during the skrei season |
| M8 | 3–5 paying by Apr 2027 | Follows from M6 plus 90 days | **3 by 31 May 2027**; 5 by Aug 2027 |

**Class-approved PMS affects the targets, not just the dates.**
- Large trawlers under a PMS survey arrangement cannot drop PreMaster until Seawise has DNV type approval.
- A pilot on those vessels can only be a **shadow run** (PreMaster stays the system of record), and it converts to a conditional LOI, not revenue.
- So M6 and M8 revenue must come from vessels **not** on a class PMS arrangement:
  - coastal and medium vessels, 15–40 m
  - non-classed ringnot and autoline vessels
  - service vessels.
- Add a field to the prospect database: "on a class PMS arrangement? Y/N".

## Required edits to PLAN.md

1. **Stage 1 target**
   - Current: `| 1 | Norwegian fishing fleet | 10 customers / 30 vessels, NOK 3–4M ARR | 2026–27 |`
   - Replace with: `| 1 | Norwegian fishing fleet (vessels not on a class PMS arrangement first; classed trawlers via conditional LOI) | 10 customers / 30 vessels, NOK 2–2.5M ARR (Pioneer prices), 3–4M at list | 2026–27 |`
   - Why: 30 vessels at Pioneer price (5–6k) is about NOK 1.8–2.2M, not 3–4M.

2. **M1**
   - Current: `| M1 | 20 discovery interviews (users, the people who choose, the people who pay) | 1, 3 | Arne | 1 Nov 2026 | ⬜ |`
   - Replace with: `| M1 | 20 discovery interviews (users, the people who choose, the people who pay); at least 6 by Kristian | 1, 3 | Arne (Kristian 30%) | 15 Nov 2026 | ⬜ |`

3. **M2**
   - Current: `| M2 | **Gate 1:** beachhead, persona, TAM, top-3 pains quantified | 2, 4, 5 | Arne + Claude | 8 Nov 2026 | ⬜ |`
   - Replace with: the same row, with the date changed to `22 Nov 2026`.

4. **M3**
   - Current: `| M3 | Next-10 customers named and confirmed; DMU mapped | 9, 12 | Arne | 22 Nov 2026 | ⬜ |`
   - Replace with: `| M3 | Next-10 customers named and confirmed; DMU mapped; incumbent, renewal month and class PMS status recorded | 9, 12 | Arne | 6 Dec 2026 | ⬜ |`

5. **M4**
   - Current: `| M4 | Product ready for pilots: own stack, tenant isolation, PreMaster/Excel importer, offline sign-off, demo tenant | 7, 22 | Kristian + Claude | 29 Nov 2026 | ⬜ |`
   - Replace with: `| M4 | Product ready for pilots: own stack, tenant isolation, PreMaster/Excel importer (including spare parts), offline sign-off, basic procurement (requisition → PO → receipt → stock), demo tenant | 7, 22 | Kristian + Claude | 13 Dec 2026 | ⬜ |`

6. **M5**
   - Current: `| M5 | 2 "Sdir-klar" reviews sold | 15 | Arne | 13 Dec 2026 | ⬜ |`
   - Replace with: `| M5 | 1 "Sdir-klar" review sold by 20 Dec; 2 by 31 Jan 2027 | 15 | Arne | 31 Jan 2027 | ⬜ |`

7. **M6**
   - Current: `| M6 | 2 paid pilots signed | 13, 16, 23 | Arne | 3 Jan 2027 | ⬜ |`
   - Replace with: `| M6 | 1 paid pilot signed by 15 Jan, 2 by 28 Feb 2027 (vessels not on a class PMS arrangement; classed trawlers = shadow run + conditional LOI) | 13, 16, 23 | Arne | 28 Feb 2027 | ⬜ |`

8. **M8**
   - Current: `| M8 | 3–5 paying customers; value quantified; first case study | 8, 17, 19, 23 | Arne | Apr 2027 | ⬜ |`
   - Replace with: `| M8 | 3 paying customers (5 by Aug); value quantified; first case study | 8, 17, 19, 23 | Arne | 31 May 2027 | ⬜ |`

9. **Kill rule**
   - Current: `**Kill rule (accepted):** 20 qualified meetings with zero paid commitments means stop and re-plan.`
   - Replace with: `**Kill rule (accepted):** 20 qualified meetings with zero paid commitments means stop and re-plan. "Qualified" means a meeting with an economic buyer, held after discovery, where a paid pilot or a Sdir-klar review was offered. Discovery interviews do not count.`
   - Why: without the definition, the rule triggers wrongly after 20 Mom Test interviews, which deliberately don't sell.

10. **This week: add these lines**
    - `- [ ] Arne: put the sea/land rotation calendar for Oct 2026 – Mar 2027 in the plan; book meetings in land periods, calls and LinkedIn at sea (M1)`
    - `- [ ] Lawyer: confirm that cold email to named work addresses is allowed under markedsføringsloven § 15; until then, phone and LinkedIn first (M1)`
    - `- [ ] CRM: add a conflict flag (competitor or customer of Lerøy Havfisk / DeepOcean) and a class PMS arrangement Y/N field (M1)`

11. **Key facts, class line**
    - Current: `- **Class:** large trawlers run class-approved PMS, so DNV type approval is needed there. Validate first.`
    - Replace with: `- **Class:** large trawlers run class-approved PMS, so DNV type approval is needed there, and those vessels cannot convert to paying customers in stage 1. Sell first to vessels not on a class PMS arrangement; on classed trawlers, run in shadow and collect conditional LOIs. Validate the share of classed vessels in the prospect database.`

12. **Key facts, core line: add**
    - `- **Core scope:** maintenance + certificates/surveys + defects + documents + **basic procurement** (parity with PreMaster's maintenance + procurement + basics).`
