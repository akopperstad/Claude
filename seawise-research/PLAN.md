# Seawise master plan: tracker (v2, after panel review 2026-09-30)

This is the single source of truth. Every task maps to a milestone here. Update it every Friday.
- **Reasoning:** `20-synthesis-and-verdict.md`
- **Reviews:** `panel/reviews/`
- **Prospects:** `prospects-fishing.csv`
- **Method:** Aulet's 24 steps, Cheek's *Startup Tactics*, ÅKP/FølgOpp (SODUS)

**Panel verdict on v1:** 8 of 8 "agree with changes". This version incorporates the changes. Red team probability of NOK 5M ARR by end-2028: about 7%. Only execution moves that number.

## End goal (staged)
| Stage | Market | Target | Window |
|---|---|---|---|
| 1 | **Provisional:** Norwegian fishing vessels ≥ 15 m (two tracks, see below). **Confirmed or replaced at Gate 1 (M2) on interview evidence** | 10+ customers / 30 vessels, NOK 1.5–2.5M ARR | 2026–28 |
| 2 | DNV type approval, then class-PMS trawlers; Norwegian aquaculture service; small offshore | 60+ vessels | 2028–29 |
| 3 | Nordic and North Atlantic fishing | 150+ vessels | 2029–30 |
| 4 | All vessels over 15 m, full platform | Global | 2030+ |

## Stage 1: two tracks
- **Track A: maintenance system (PMS + basic procurement + certificates)** for vessels **without** a class-approved PMS arrangement.
  - Many of these run Excel or paper today.
  - No type approval needed.
- **Track B: "compliance tower"** for class-PMS trawlers, sold beside PreMaster or TM Master.
  - Covers certificates, surveys, the Sdir safety management system, deviations and drydock.
  - No type approval needed.
  - It is the path into the founders' home segment.
- **Gate 1 decides the mix.** Count class-PMS vs non-class-PMS vessels in Møre and Vestland (DNV Vessel Register). If fewer than 60 non-class-PMS vessels, lead with Track B.

## Offer and prices (HYPOTHESIS, to be tested in interviews, MIT step 16)
| | NOK per vessel per month |
|---|---|
| Track A, 15–28 m | 2–4k |
| Track A, ≥ 28 m | 6–9k |
| Track B, compliance tower | 1.5–3k |
| Class-PMS replacement (after DNV approval) | 9–12k |

- **Pioneer:** 50% off for 12 months, then list price minus 15%. Maximum 3 customers or 10 vessels.
- **Paid pilot:** NOK 45k, 90 days, up to 3 vessels, credited against year 1. Converts automatically if the success criteria are met; refunded if Seawise misses its own obligations.
- **"1770-sjekk":** a fixed-price maintenance-system review against FOR-2016-12-16-1770, NOK 25–40k.
- **Evidence (confidential):** PreMaster about NOK 16k per month per vessel plus a yearly fee; TM Master about NOK 100k per vessel per year.

## Funding status
- **Innovation Norway:** NOK 250k granted, for validating demand (= Phase 1 interviews). The further NOK 750k is a **verbal** promise only [ASSUMPTION: not secured until in writing]. Adviser confirmed by phone (30 Sep): multiple signed LOIs from target buyers are required; one is not enough. Target: at least 5 (M7). LOI template: `LOI-mal.md`.
- **hoppid.no:** backing (amount: fill in).
- **ÅKP:** ScaleUp programme. Use the monthly ÅKP sessions as MIT gate reviews.

## Milestones (Stage 1)
| ID | Milestone | MIT steps | Owner | Due | Status |
|---|---|---|---|---|---|
| M0 | Foundation: remove false website claims; written IP waivers + written duty-of-loyalty advice (**before any fishing outreach**); trademark search; holding companies + shareholder agreement (vesting, deadlock); redirect nautech.no; confirm cash and runway | — | Kristian | 11 Oct 2026 | ⬜ |
| M0b | Website rebuilt as pre-rendered "Seawise – vedlikeholdssystem for fiskeflåten", with JSON-LD (`panel/07`) | — | Kristian + Claude | 1 Nov 2026 | ⬜ |
| M1 | 24 discovery interviews per `03-all-segments-scored.md`: purse seiners 3, whitefish trawlers (non-Lerøy) 3, autoliners 3, coastal fishing 15–28 m 3, wellboats 3, aquaculture service 3, short-sea 2, ship managers 2, Redningsselskapet 1, offshore 1. Cover users, the people who choose and the people who pay; at least 30% by Kristian. Record class-PMS status, current system and price for each vessel | 1, 3 | Arne | 15 Nov 2026 | ⬜ |
| M1b | Content engine: 2 LinkedIn posts a week each, every post ending with an interview request; at least 10 interviews inbound | — | Arne + Kristian | ongoing | ⬜ |
| M2 | **Gate 1:** beachhead + track mix, end-user profile, TAM for non-class-PMS vs class-PMS, persona, top-3 pains quantified | 2, 4, 5 | Arne + Claude | 22 Nov 2026 | ⬜ |
| M2b | Key-assumption register plus one cheap test per assumption | 20, 21 | Kristian + Claude | 22 Nov 2026 | ⬜ |
| M3 | Next 10 customers named; DMU mapped; full life-cycle use case; value quantified; core defined; competitive position; acquisition process mapped | 6, 8, 9, 10, 11, 12, 13 | Arne | 6 Dec 2026 | ⬜ |
| M4a | Security hygiene: own GitHub + EU Supabase, tenant isolation (`tenant_id`, invite-only, cross-tenant tests), admin MFA, server-side audit log, DPA + subprocessor list, backup/restore drill, demo tenant with synthetic data | 7 | Kristian + Claude | 29 Nov 2026 | ⬜ |
| M4b | Pilot product scoped by Gate 1: offline sign-off, basic procurement, per-vessel data export, external security review. PreMaster importer **only if ≥ 5 prospects use PreMaster** | 7, 22 | Kristian + Claude | 20 Dec 2026 | ⬜ |
| M5 | 2 "1770-sjekk" reviews sold | 15 | Arne | 13 Dec 2026 | ⬜ |
| M6 | 1 paid pilot by 15 Jan 2027; 2 by 28 Feb 2027 | 13, 16, 23 | Arne | 28 Feb 2027 | ⬜ |
| M7 | **Innovation Norway NOK 750k unlocked:** at least 5 signed LOIs plus paid pilots as proof of market acceptance | — | Arne | Mar 2027 | ⬜ |
| M8 | 3–5 paying customers; value proven; first case study; LTV and COCA calculated | 8, 17, 18, 19, 23 | Arne | Jun 2027 | ⬜ |
| M9 | Pre-seed NOK 2.5–3.5M: launch May 2027 if M8 is on track (otherwise no raise; stay grant-plus-revenue funded); close Q3 2027 | 15 | Arne | Q3 2027 | ⬜ |
| M10a | Type-approval readiness: DNV-CP-0206 requirement map (1 Nov); audit trail, versioning, data export built in | 24 | Kristian | Jan 2027 | ⬜ |
| M10b | DNV pre-application meeting | 24 | Kristian | Dec 2026 | ⬜ |
| M10c | Apply for type approval **only if** 2 class-PMS operators pay for a parallel run or place a deposit (LOIs alone don't count) | 24 | Arne | Mar 2027 | ⬜ |

## Rules
- **Kill rule (accepted):**
  - A qualified meeting is one where a **priced offer** was made. Discovery interviews don't count.
  - If 20 qualified meetings, or the deadline of 28 Feb 2027, pass with zero *software* commitments (a paid pilot or a deposit; advisory and LOIs don't count), stop and re-plan.
- **Quit gates (ARR means signed subscriptions only, no pilots or advisory):**
  - **Founder 1:** NOK 600k ARR plus NOK 800k cash plus at least 2 paying customers, **or** NOK 300k ARR plus a closed pre-seed of at least NOK 3M. Take unpaid leave first.
  - **Founder 2:** NOK 1.8M ARR plus at least 6 months of cash, **or** NOK 800k ARR plus at least NOK 3M cash.
  - CFO base case: about Nov 2027 / Apr 2028 bootstrapped, earlier with the pre-seed. The IN grant is not yet in the model.
- **Time:**
  - Plan on 25 hours a week each of human time.
  - Founder attention on building: at most 4 hours a week. Claude agents do the building.
  - Build only M4a, M4b and M10a items.
- **Meetings:**
  - No demo in the first meeting (discovery with the laptop closed).
  - SODUS notes in the CRM the same day.
  - Every decision goes in the decision log below.
- **Conflicts:**
  - No selling to Lerøy group companies (flagged in `prospects-fishing.csv`) or DeepOcean while employed there.
  - Decide how to treat Møgster-linked owners, e.g. Hardhaus.
  - Never use employer data.
- **Cold email:** get a legal check (markedsføringsloven § 15). Default order: phone, then LinkedIn, then a 1:1 email.

## Open items (check at every step; the oldest waiting item is raised first)
| # | Item | Waiting on | Since |
|---|---|---|---|
| O1 | Website Part A (pre-rendering, GEO, speed): preview at geo-technical.seawise-web.pages.dev | **Arne: approve** → Claude publishes to seawise.no + runs IndexNow | 30 Sep |
| O2 | Website Part B (copy: hero, founders, FAQ, "Fosnavåg" → Gurskøy/Herøy, module claims, privacy page) | Claude drafts → Arne approves | after O1 |
| O3 | seawise.no without www: https certificate at Domeneshop | Claude checks | 30 Sep |
| O4 | Unpublish the old Lovable project once the new site is confirmed | Arne (after O1) | 30 Sep |
| O5 | Cloudflare Web Analytics token + founders' LinkedIn URLs | Arne | 30 Sep |
| O6 | Master outreach list + panel review of the order | Claude (running) | 30 Sep |
| O7 | Holding companies + shareholder agreement | Arne/Kristian with the lawyer | 30 Sep |
| O8 | Confirm cash position (for the quit model) | Arne | 30 Sep |

## This week (5–11 Oct 2026)
- [x] Remove the false website claims (done 30 Sep: new site on Cloudflare Pages)
- [x] Lawyer booked (brief: `M0-advokat-brief.md`) (M0)
- [x] Trademark SEAWISE filed at Patentstyret, classes 9 + 42 (NOK 4,800), 30 Sep (M0)
- [ ] Holding companies + shareholder agreement: take to the lawyer meeting (M0)
- [ ] Arne: share the rotation calendar; pick 15 Tier A prospects (non-conflict) from `prospects-fishing.csv`; book 10 interviews **after** the written loyalty advice (M1)
- [ ] Both: confirm cash, IN grant terms (what counts as "market acceptance") and the hoppid amount (M0, M7)
- [ ] Claude: DNV-CP-0206 requirement map draft (M10a); DNV register class-PMS lookup plan for Tier A vessels (M2); interview guide v2 with class-PMS/system/price questions (M1)

## Scoreboard (every Friday)
| Week | Interviews (of which inbound) | Decision-makers met | Priced offers | LOIs | Paid pilots | NOK contracted |
|---|---|---|---|---|---|---|
| 41 | 0 (0) | 0 | 0 | 0 | 0 | 0 |

## Decision log
| Date | Decision | Why |
|---|---|---|
| 2026-09-30 | Lawyer: the founders' approach is sufficient clearance; no further action needed toward Lerøy Havfisk or DeepOcean (IP/employer) | [EVIDENCE: lawyer's advice, per Arne] |
| 2026-09-30 | Fishing outreach opened: Arne may contact and sell to Lerøy Havfisk's competitors, provided no Lerøy information or knowledge is used. Selling to Lerøy group itself remains off-limits while employed | [EVIDENCE: lawyer's advice, per Arne] |
| 2026-09-30 | M1 = 24 interviews across 10 segments | Founders approved; [EVIDENCE: 03-all-segments-scored.md, QA-passed] |
| 2026-09-30 | Beachhead = fishing (provisional); final choice at Gate 1 from interviews across 4 segments | Founders objected to the presumption; MIT step 1 requires primary research across segments |
| 2026-09-30 | Arne owns sales; Kristian owns product, delivery and M0 | Founders |
| 2026-09-30 | Kill rule accepted | Founders |
| 2026-09-30 | Seawise as the single brand (subject to the trademark search) | Brand review |
| 2026-09-30 | seawise.no moved off Lovable: code in `akopperstad/seawise-web`, hosted on Cloudflare Pages, contact form via Web3Forms, false claims removed; DNS stays at Domeneshop (www CNAME, apex forwarding), email records untouched | Founders; [EVIDENCE: form test email received] |
