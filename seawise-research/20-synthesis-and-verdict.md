# Seawise AS: panel synthesis and lead advisor's verdict

**Date:** 2026-09-30
**Inputs:**
- Eight panel memos (`panel/01`–`08`).
- Research: `01-competitors.md`, `02-segmentation-and-thresholds.md`, `04-funding-ecosystem.md`.
- The founders' answers in this conversation.

**Mandate:** maximise the probability that Seawise makes money, breaks into the market and scales. It is **not** to agree with the founders. Where I overrule the panel, I say so and why.

---

## 1. The unvarnished starting point

**What exists:**
- A 12-module MVP, built fast with Lovable and Supabase.
- Two founders with real, current engine-room and offshore experience and strong local roots in Herøy.
- An AS with NOK 30k share capital.

**What doesn't exist:**
- Customers, pilots, interviews with anyone outside the founders' own companies, or revenue.
- A contact database. The "DMU list" is 214 company names, about 170 real buying entities, and every contact column is empty.

**What is actively hurting:**
- The website claims crews are using the product, shows a fictional "pilot 01" blog post, and says "ERS filed on time" without type approval.
- Two brand names, one of which collides with a live Norwegian maritime company.
- Multi-tenant security that isn't ready for real customer data (tenancy is scoped by vessel, not company; open signup; health data in scope).

**Panel scores:**
- Investability: 2.5/10.
- Probability of NOK 5M ARR by end-2028: 3–5% on the current plan, 12–18% with the changes below (red team).
- **My own read:** the upside is real, but only if the company turns into a *sales* company within the next 60 days.

---

## 2. Where the whole panel agrees (8 of 8)

1. **Sell one job, not a 12-module operating system.** Everything else becomes the roadmap.
2. **Start in Norwegian fishing.** It's the founders' home turf, and there is little fishing-native competition.
3. **Stop building features and start selling.** Founder hours go to customer conversations.
4. **No free pilots.** Paid pilots with written success criteria and automatic conversion.
5. **Don't make a large listed company (ASA) the first partner.** Its cycle is 9–18 months, it will veto on security and financial strength, the deal risks turning Seawise into a custom development shop, and there is a conflict of interest with the founders' employers.
6. **Fix the website's false claims now.**
7. **The NOK 25–45k per vessel per month "competitor price" is not a usable anchor.** It is almost certainly a bundle of several products or an enterprise suite.
8. **The code is not a moat.** The moats are trust, references, migration capability, regulatory integrations and installed data.

---

## 3. Where I disagree with the founders

| Founder position | My verdict | Why |
|---|---|---|
| "Software for all vessels over 15 m worldwide" | **Right as the destination, wrong as the start** | Tesla shipped the Roadster before the Model 3. PreMas (NOK 21M revenue, 12 staff) and CCOM (NOK 23M, −10M operating result) show that incumbents are niche businesses built on lock-in, not on product quality. You break lock-in segment by segment, with references |
| "12 modules is our strength" | **Today it's your biggest liability** | It widens the security surface, confuses buyers and slows sales. Several modules (ETS, MRV, CII, MLC) don't even apply to fishing vessels |
| Price per module (12 lines) | **Rejected. Use a core plus 2–3 packs** | Buyers make 1–2 choices, not 12. You keep the flexibility without the complex menu. See §5 |
| Large listed partner first | **Rejected for now, with one exception: Havila Shipping** (Fosnavåg, 14 vessels, 6 for external owners) as a discovery and possible design-partner target | Slowest route to a salary. Lerøy and DeepOcean are off-limits for selling while you are employed there |
| "PMS is legally required above X GT, so they must buy" | **Half true** | A documented maintenance *system* is required (FOR-2016-12-16-1770 § 9 below 500 GT; ISM from 500 GT). But **paper and Excel pass**. The budget is forced; software is not |
| "We can't fail, it's only a matter of time" | **Rejected** | Time is your scarcest resource: two full-time jobs, safety-critical work, and brothers with no deadlock mechanism. Plan for survival and speed |
| "200 h/week combined" | **Plan for 25 h/week each of *human* time, and let Claude agents do the rest** | The constraint is customers' weekday calendars, not your hours |

## 4. Where I overrule or refine the panel

| Panel position | My verdict |
|---|---|
| Beachhead capped at "15–40 m" (CEO, superintendent) | **Wrong boundary.** Use regulatory status, not length: *fishing vessels without a class-approved PMS arrangement* (no DNV PMS(M)/CMS credit, so no type approval needed). That includes many ocean-going trawlers, purse seiners and autoliners, where the founders' expertise is deepest. Start in Møre og Romsdal and Vestland: about 264 vessels ≥ 28 m nationally, 57 on Sunnmøre, roughly 120–180 real buyers nationally |
| Price NOK 1,500 per vessel per month (CEO) | **Too low.** It signals a hobby product and caps you below PreMas economics. See §5 |
| Building freeze of 4 h/week in total (coach) | **Refined.** Founder *attention* on building is capped at about 4 h/week. **Claude agents may build**, but only the five sales enablers in §6. Nothing else |
| "Advisory is a trap" (CEO) vs "advisory first" (red team) | **Middle path.** One productised, fixed-price offer: *"Sdir-klar vedlikeholdssystem"*, an audit-readiness review of the maintenance system, NOK 25–40k. It's paid discovery, a door opener and cash. Capped at 25% of hours. No open-ended consulting |
| Retire Nautech, Seawise only (brand) | **Agree, subject to the trademark search.** Do the manual search first (Patentstyret, EUIPO, WIPO). If SEAWISE is blocked in the software classes, rename *before* the first contract. It's the founders' call, but the cost of changing only goes up |
| Security rebuild in 4–6 weeks (CTO) | **Agree, and it's a hard gate:** no real customer data before tenant isolation, invite-only accounts and a cross-tenant test suite are done, and the Supabase region is confirmed as EU |

---

## 5. Offer and pricing (to be validated in interviews, MIT step 16)

**Product at launch:** *Seawise Vedlikehold & Samsvar* (maintenance and compliance) for fishing vessels.
- **Includes:** SFI-structured maintenance, running hours, certificates and surveys, defects and deviations, document control.
- **Sold with:** migration from PreMaster, Excel or paper, done by Seawise.

| Element | Price (NOK, excl. VAT) |
|---|---|
| List price, core | **9–12k per vessel per month**, billed annually in advance |
| Fishery pack (quota, catch, landing notes, crew-share settlement) | +2–4k per vessel per month (later) |
| Pioneer partner (first 3–5 customers) | **About 50% off list, locked for 24 months** |
| Paid pilot | **45k flat** for up to 3 vessels, 90 days, credited against year 1, auto-converts if the written criteria are met, refunded if Seawise misses its own obligations |
| Onboarding / migration after the pioneer phase | 15–25k per vessel |
| Audit-readiness review ("Sdir-klar") | 25–40k fixed |

**Why these levels:**
- The CFO puts the anchor tier at NOK 10–12k per vessel per month.
- The competitor research suggests NOK 8–15k per vessel per month for a full product.
- The founders report NOK ~500k per vessel per year in *total* licence spend, of which maintenance is a subset.
- 30 vessels at list price is about NOK 3.2–4.3M ARR. That matches the economics of a 12-person incumbent.

---

## 6. The only things allowed to be built (by Claude agents, not founder hours)

1. **Truthful website** under one brand, server-rendered or pre-rendered, with JSON-LD (spec in `panel/07`). **Within 48 hours for the claims; 2 weeks for the rebuild.**
2. **Own the stack:** a GitHub repo, the company's own Supabase in an EU region, migrations kept as code, CI.
3. **Tenant isolation:** `tenant_id`, invite-only accounts, a cross-tenant test suite that blocks every merge, a server-side audit log.
4. **Full migration importer** from PreMaster and Excel: components, jobs, intervals, history, running hours. This is the #1 sales weapon ("we move you in 10 days").
5. **Offline sign-off for maintenance jobs on board** (a PWA with a local write queue), plus a **demo tenant** built from realistic, synthetic fishing-vessel data. **Never employer data.**

All other modules stay behind feature flags until a paying customer asks for them.

---

## 7. The Seawise Master Plan (the Tesla-style sequence)

1. **2026–27:** win Norwegian fishing (maintenance and compliance), starting in Møre and Vestland. Target: 10 customers / 30 vessels.
2. **2027–28:** Norwegian aquaculture service vessels plus small offshore owners (Havila, Sanco-type), reusing the same core and references. Start **DNV type approval (DNV-CP-0206)** in 2027 so classed vessels and PMS(M) arrangements open up.
3. **2028–29:** Nordic and North Atlantic fishing: Iceland, the Faroe Islands, Scotland, Denmark and Ireland. Same regulations logic, same vessel types.
4. **2029+:** the broad "all vessels over 15 m" platform, including the emissions, crew and finance modules that already exist.

"World domination in three years" is not credible. **Dominating Norwegian fishing in three years is, and it is the launchpad.**

---

## 8. 90-day plan (5 Oct 2026 – 3 Jan 2027)

| Week | Founders (human) | Claude agents |
|---|---|---|
| 1 (5 Oct) | Remove the false claims from the site. Book a lawyer for 1 hour: the duty-of-loyalty check plus written IP waivers from both employers. Run the trademark search. Set up holding companies and a shareholder agreement (vesting, deadlock). Hoppid adviser meeting | Rebuild the prospect database from Fiskeridirektoratet's register, Brreg and Proff (vessels ≥ 15 m in Møre og Romsdal and Vestland first). Draft a CRM import. Start the security and tenancy work |
| 2–3 | **20 discovery calls booked, 10 held.** Mix: reder / teknisk sjef / maskinsjef. Local first: Havila, Olympic, Remøy, Sanco, Nordic Wildfish, Liafjord, Eros, Kings Bay, Leinebris | Synthesise interview notes the same day. Build the PreMaster/Excel importer |
| 4–5 | 10 more interviews (20 in total). **Gate 1:** beachhead and persona confirmed, and the top 3 pains quantified | Draft the segmentation matrix and TAM from real interview data. Build the offline sign-off. Build the website |
| 6–8 | Follow-up meetings (play back what you heard, run a task test). Pitch the pilot to the 5 warmest prospects. Sell 2 "Sdir-klar" reviews | Demo tenant, pilot contract template, and a one-pager in Norwegian |
| 9–10 | **Sign 1–2 paid pilots.** Apply for Innovation Norway Oppstartstilskudd 1 with the interview evidence | Migration for pilot 1, running in parallel with the incumbent system |
| 11–13 | Pilot 1 live. Fiskebåt Vest meeting (early December). Line up pilots 3–5 for Q1. Recruit a part-time commercial advisor or board member | Weekly usage report for each pilot |

**Scoreboard, reviewed every Friday:**
- interviews held (target 30)
- decision-makers met (target 12)
- pilot proposals sent (target 5)
- paid pilots signed (target 2)
- advisory revenue in NOK
- NOK contracted.

**Kill/pivot rule (red team):** if 20 qualified meetings with owners or technical managers produce zero paid commitments, stop and reconsider the whole approach. Options are compliance-as-a-service, or white-labelling or partnering with an incumbent.

---

## 9. Quit gates (CFO model, `panel/04-quit-job-model.csv`)

| | Trigger (whichever comes first) | Base-case timing |
|---|---|---|
| Founder 1 (unpaid leave first, not resignation) | NOK 600k contracted ARR + NOK 800k cash, **or** NOK 300k ARR + a closed pre-seed of at least NOK 3M | Mid-2027 (fast path) to Feb 2028 (bootstrap) |
| Founder 2 | NOK 1.8M ARR, **or** NOK 800k ARR + at least NOK 3M cash | Oct 2027 (with pre-seed) to Jun 2028 |

**Funding path:**
1. Grants now: hoppid, the Herøy næringsfond, and Oppstartstilskudd 1 after Gate 1.
2. Pre-seed of NOK 2.5–3.5M in Q3 2027, from Sunnmøre shipowner angels plus one fund, once there are 2 paying design partners.
3. That round unlocks Oppstartstilskudd 2.
4. Raising **now** would fail or cost 25–35% of the company.

---

## 10. Decisions only the founders can make (answer these next)

1. **Beachhead:** confirm "Norwegian fishing vessels without a class-approved PMS arrangement, Møre and Vestland first".
2. **Class status:** do the ocean-going trawlers you know run DNV PMS(M) or a continuous machinery survey arrangement? This decides whether type approval is a gate in your home segment.
3. **The NOK 5M across 10 vessels:** which systems does it cover, and how much of it is maintenance alone?
4. **Brand:** Seawise only, if the trademark search is clean?
5. **Roles:** who owns sales (the Challenger), and who owns product and delivery? Who breaks a tie?
6. **Time:** real weekday hours each of you can spend on customer meetings, given work rotations.
7. **Equity:** are you willing to give a part-time commercial advisor or co-founder 1–5%?
8. **Kill rule:** do you accept the 20-meeting kill/pivot rule, in writing?
