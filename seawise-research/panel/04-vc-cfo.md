# Panel memo 04: VC partner + CFO view on Seawise AS / Nautech

*Written 30 Sept 2026 by two reviewers in one voice: a Nordic B2B/maritime-software VC partner and a startup CFO. We were asked for resistance, so this memo is deliberately critical. Model: `panel/04-quit-job-model.csv`. Inputs: `_case-brief.md`, `04-funding-ecosystem.md`, `10-roadmap.md`, `01-competitors.md` and the old `06-financial-model.csv`.*

---

## 0. Bottom line

- **Investable today: 2.5/10.** What you have is a demo, two committed engineers and a cheap-to-build codebase. We have not yet seen evidence that anyone will buy.
- **The fastest way to quit your jobs is not to raise money now.** It is to get **2 paying design partners in the next 6–7 months** and then raise a small angel round on that evidence. Raising today would either fail or cost 25–35% of the company.
- **Our biggest disagreement with you is the "big listed partner to co-develop with" strategy.** It is the slowest route to a salary you could pick. It also most reliably destroys a young company's pricing power, independence and ability to sell to the partner's competitors.

---

## 1. Investability: honest score and what makes it a 7+

### Score today: 2.5 / 10

| Dimension | Score | Why |
|---|---|---|
| Team | 4/10 | Real domain insight: current marine-engineering experience in trawling and subsea, which is rare in software. But both founders work full-time elsewhere, there is **no commercial or sales profile**, the two founders are brothers owning 50/50 with no independent board member (a deadlock risk), and there is no software-operations track record at production scale. |
| Traction | 0/10 | Zero customers, pilots, interviews, LOIs or revenue. The website claims "first crews are using it", which is false. **In due diligence, that line costs more credibility than having zero customers.** |
| Product / tech | 3/10 | Broad (12 modules) but shallow. It is built with Lovable, has no offline-at-sea support, no SSO, and no security model or certification. The public front-end bundle exposes the whole data model. AI calls route through a third-party gateway, so there is no DPA story for vessel or crew data. |
| Defensibility | 1/10 | See below. Code is not a moat in 2026. |
| Market | 3/10 | The Norwegian niche is small (see below). The venture case only works if you go abroad. |
| Capital efficiency | 8/10 | The one bright spot. Very low burn, and an MVP for roughly NOK 0. |

### Market size: the VC arithmetic you need to face

- The Norwegian incumbents are small businesses:
  - **PreMaster** (Ålesund), the fishing-fleet PMS incumbent, has roughly **12 staff and NOK 21M revenue** ([funnelfeedr](https://funnelfeedr.com/en/company/no/premas-as-912787281)).
  - **Arribatec Marine** was sold to Star IS for **~NOK 25M** in 2025 ([TipRanks](https://www.tipranks.com/news/company-announcements/arribatec-divests-marine-unit-to-star-information-systems)).
  - **VesselMan** is the closest Norwegian comparable: maritime maintenance SaaS, backed by Skagerak and shipping families. It took **~10 years (2015–2025)** to reach an undisclosed exit to Marcura ([Maritime Executive](https://maritime-executive.com/article/marcura-acquires-vesselman-expanding-digital-solutions-offering)).
- Fishing, the beachhead you know best, has only about 170 large vessels in Fiskeridirektoratet's profitability survey: 37 cod trawlers, 65 purse seiners, 22 autoliners and 44 coastal seiners ≥21 m ([Fiskeridir 2024](https://www.fiskeridir.no/statistikk-tall-og-analyse/data-og-statistikk-om-yrkesfiske/lonnsomhetsundersokelsen-for-fiskeflaten)). At about NOK 120k per vessel per year, that is a **~NOK 20M/yr beachhead**. Fine for a lifestyle company. Too small for a fund.
- A VC will only engage if the story is: **"Norwegian fishing, then aquaculture service vessels, then the North Atlantic (Iceland, Faroes, Scotland, Denmark), then coastal and offshore"**, with a credible **NOK 100M+ ARR** ceiling. You need a TAM slide that shows this bottom-up, not "all vessels over X GT".

### Defensibility: the uncomfortable truth

- You built this at Claude and Lovable speed. **So can anyone else**, including PreMaster's 3.0 team and the Lloyd's Register OneOcean bundle.
- Because your public bundle reveals ~150 tables, a competent team could reproduce the data model in weeks.
- Investors will not pay for code. They pay for things that compound:
  1. **Installed base and switching costs**: SFI-coded maintenance history, running hours and certificates. Once 3 years of history sits in Nautech, nobody migrates.
  2. **Integrations that are painful to build**: ERS/VMS and landing notes, BarentsWatch, PreMaster/AMOS import, class survey status (DNV Veracity), payroll and share-based crew pay (*lott*).
  3. **Offline-first sync at sea.** This is a real technical problem, a SkatteFUNN candidate, and it is what separates you from a web app.
  4. **Trust credentials**: pen-test, ISO 27001 roadmap, SSO, a data processing agreement (DPA), and hosting in the EU/Norway.
  5. **Distribution**: Fiskebåt, GCE Blue Maritime, a class society or yard channel.

  Today you have none of the five.

### What gets you to 7+/10 (pre-seed at a fair price)

| Area | Threshold |
|---|---|
| Traction | **≥3 paying customers (≥10 vessels) with signed contracts. At least 1 must pay list price or no more than 30% below it.** Weekly active use on board (not just in the office) for ≥8 weeks. ≥1 reference call we can make ourselves. **ARR ≥ NOK 1M, or contracted ≥ NOK 1.5M.** |
| Pipeline | 10 named next customers in the beachhead with a documented pain and a decision-maker met (your roadmap's Step 9). A sales cycle measured, not guessed. |
| Team | At least one founder full-time. A named commercial lead: a co-founder or a senior hire with fishing-industry relationships, or at least a heavily engaged board member/angel who has *sold* into Norwegian shipowners. An independent board member to break any deadlock between the brothers. |
| Tech | Code in your own GitHub, CI/CD, staging and production separated, row-level security audited, a third-party pen-test, an offline strategy, SSO, a signed DPA template, and AI routed through your own provider accounts with no-training terms. |
| Market | A bottom-up TAM for the beachhead and 2 adjacencies, including at least one non-Norwegian market with 3 discovery calls done. |
| Hygiene | Section 5 fully done, and a data room. |

Hit those and you are a 6.5–7.5. Norwegian pre-seed then means NOK 3–5M at NOK 15–25M pre-money (`04-funding-ecosystem.md` §3.2).

---

## 2. Bootstrapping vs raising

| | **(A) Bootstrap**: grants + advisory + design-partner revenue | **(B) Angel/pre-seed NOK 2–5M in 2027** | **(C) Strategic investor** (shipowner / ASA / class society / equipment maker) |
|---|---|---|---|
| Dilution | 0% | 10–20% at the right time; 25–35% if you raise now on no evidence | 10–30%, often with side terms |
| Timing | Now | **Only closable after design partners, realistically Q3 2027.** A raise takes 3–6 months of founder time. | 6–18 months. Corporate process, legal, investment committee. |
| Cash | NOK 0.3–0.6M non-dilutive in 12 months, plus advisory income | NOK 3M, plus unlocking Oppstartstilskudd 2 (OT2, up to NOK 1M, **must be matched**) and bigger SkatteFUNN claims | Cash plus a "customer". Often less cash than it looks. |
| Pros | Keeps control. Forces pricing discipline. Grants and advisory need no permission. | Both founders full-time ~4–8 months earlier. Can hire 1–2 people. Credibility. | Logo, distribution, domain data |
| Cons | Slow. Founders exhausted. SkatteFUNN mostly lost while founders are unpaid (only salaried hours count). | Raising too early prices you badly. Investor reporting overhead. | **Signalling risk**: the investor's competitors won't buy, and other VCs ask why the strategic didn't lead. ROFR, exclusivity and "most-favoured customer" terms. Your roadmap becomes their roadmap. |
| Quit-job speed | Founder 1 in Feb 2028, founder 2 in Jun 2028 (base case in the model) | Both in Oct 2027 if the round closes in Sep 2027 | Unpredictable |

**Our recommendation: A→B.**
1. Bootstrap until **2 paying design partners** are signed, with a Q2 2027 target.
2. Then raise **NOK 2.5–3.5M from 3–6 Sunnmøre shipowner or industrial angels plus one Investinor-matched pre-seed fund** (see [Investinor pre-seed matching](https://investinor.no/en/pre-seed-matching)), closing around Q3 2027.
3. Use it immediately to match OT2.

**On (C):**
- Take strategic parties in as **paying customers or design partners, not shareholders**.
- If one insists on equity: at most 10%, inside a round a financial investor leads, and with **no exclusivity, no ROFR and no information rights on other customers**.
- A class society (DNV Ventures, active at seed: [vcbacked/Ofiniti](https://www.vcbacked.co/company/ofiniti)) or an equipment maker is less toxic than a competing shipowner.
- **Lerøy specifically:** Arne is employed there, the NOK 5M licence figure is confidential inside information, and a Lerøy stake would scare off every other whitefish group. **Treat Lerøy as an arm's-length customer prospect handled by Kristian, with Arne recused**, or not at all until Arne has left.

---

## 3. "Quit-my-job" math (see `panel/04-quit-job-model.csv`)

### Assumptions (CFO-grade, stated so you can argue with them)

**Salary and employment costs**
- Founder salary is **NOK 60k/month gross (NOK 720k/yr)**. That is about 15–25% below the private-sector engineer average of **NOK 990k** ([Tekna/SSB](https://www.tekna.no/en/salary-and-negotiations/pay-and-salary-in-norway/engineer-salary-levels-in-norway/)) and probably well below your sea pay. That is normal for founders, and it is still a "real" salary.
- Holiday pay (**feriepenger**) is **10.2%**, the statutory rate. Use 12% if you give 5 weeks' holiday.
- Mandatory occupational pension (**OTP**) is **2%** from the first krone ([DNB](https://www.dnb.no/dnbnyheter/no/din-okonomi/pensjon-fra-foerste-krone)).
- Employer's social security tax (**arbeidsgiveravgift, AGA**): **Herøy is zone Ia**. You pay **10.6%** until the difference from 14.1% reaches the **NOK 850k fribeløp**, which covers years of payroll at your scale ([Skatteetaten 2026](https://www.skatteetaten.no/satser/arbeidsgiveravgift/?year=2026)). Two caveats:
  - Keep the business address in Herøy.
  - The fribeløp is state aid of the *bagatellstøtte* type. Check it against IN/hoppid aid, which may count under the same de minimis ceiling.
- **Result: loaded cost is about NOK 75k per founder per month (~NOK 900k/yr).**

**Revenue**
- List price is **NOK 10–12k per vessel per month**. **Design partners pay NOK 6k/vessel for 12 months, then 10k.** Customers after the design partners **prepay annually at an 8% discount**.
- Onboarding is NOK 8k/vessel for design partners and 15k/vessel standard.
- Advisory is NOK 25k/month from Jan 2027 (evening work), NOK 90k/month once founder 1 is full-time, and NOK 110k/month with both. **This is a big assumption. Validate it with a signed retainer.**

**Grants and tax credits**
- hoppid NOK 30k (Dec 2026).
- Oppstartstilskudd 1 (OT1) NOK 150k in two tranches (Feb and Jul 2027).
- Herøy næringsfond NOK 75k (Apr 2027).
- SkatteFUNN at 19% of eligible 2027 costs, **arriving as cash only in about Oct 2028** with the tax settlement.

**Costs**
- Tools and infrastructure: NOK 8–22k/month.
- Accounting: NOK 3–7k/month.
- Travel: NOK 8–15k/month.
- One-offs: legal/SHA NOK 60k, pen-test NOK 60k, audit NOK 45k, Aqua Nor, Nor-Fishing.
- 5% contingency.
- Opening cash is NOK 220k, including a NOK 200k founder injection.

**Sales ramp (base)**

| Customer | Start | Vessels |
|---|---|---|
| Design partner A | Apr 2027 | 3 |
| Design partner B | Jul 2027 | 3 |
| C | Nov 2027 | 3 |
| D | Feb 2028 | 4 |
| E | Apr 2028 | 3 |
| F | Jun 2028 | 4 |
| G | Sep 2028 | 4 |
| H | Nov 2028 | 4 |

That gives **8 customers and 28 vessels by Dec 2028**.

### Quit rules (write these into your board minutes now)

- **Founder #1 quits** when all of these hold:
  - SaaS MRR plus the signed advisory retainer is at least 80% of the post-quit burn (~NOK 115k/month)
  - **cash is at least 6 months of that burn (~NOK 0.7M)**
  - there are **at least 2 paying customers and 6 vessels**.

  In practice that means about **9–13 vessels at about NOK 10k**, or about **NOK 1.1–1.3M ARR**.
- **Founder #2 quits** at least 3 months later, when all of these hold:
  - **SaaS MRR alone is at least 60% of the two-founder burn** (~NOK 195k/month, so MRR ≥ NOK ~120k)
  - **cash is at least 9 months of burn (~NOK 1.8M)**
  - there are **at least 4 paying customers**.

  In practice: **about 16–20 vessels and about NOK 2–2.4M ARR**.

### Results

| Scenario | Founder 1 quits | Founder 2 quits | Vessels / ARR Dec 2028 | Cash Dec 2028 |
|---|---|---|---|---|
| A base | **Feb 2028** (13 vessels, NOK 1.27M ARR, NOK ~1.0M cash before) | **Jun 2028** (20 vessels, NOK 2.4M ARR) | 28 / NOK 3.7M | NOK 3.3M* |
| A, all sales 6 months late | Sep 2028 | Dec 2028 | 20 / NOK 2.4M | NOK 2.4M |
| A, price 40% lower (NOK 6–7k) | Apr 2028 | Oct 2028 | 28 / NOK 2.2M | NOK 2.3M |
| A, sales 9 months late | Nov 2028 | after 2028 | 13 / NOK 1.3M | NOK 1.4M |
| B, NOK 3M pre-seed in Sep 2027, plus OT2 | **Oct 2027 (both)** | Oct 2027 | 41 / NOK 5.5M (with 2 hires) | NOK 6.3M |

\*Cash is flattered by annual prepayments. About 40–50% of year-end cash is deferred revenue you still owe service on. **Never treat prepaid cash as runway for hiring.**

**What the model really says:**
1. The date you quit is set by **when design partners pay**, not by price. A 6-month slip costs 7 months of freedom. A 40% price cut costs only 2–4.
2. Everything hinges on **signing ~9 paying vessels while both of you still have day jobs**. That is the whole ballgame. It argues for spending your 200 hours a week on **selling, not building**.
3. Path B buys 4–8 months of earlier freedom for ~15% of the company. That is worth it **only** if the round is raised on design-partner evidence. Without it, you won't close, or you'll give away 30%.
4. **Ask your employers for 6–12 months' unpaid leave (permisjon)** rather than resigning. It is the cheapest risk hedge available and costs nothing to ask.

---

## 4. Pricing and packaging

**Kill "monthly subscription per module".** It turns every sale into a procurement spreadsheet. It invites customers to cherry-pick your cheapest module next to their incumbent. And it makes ARPU unforecastable. Use **3 tiers per vessel plus add-ons.**

| Tier | Contents | Price per vessel per month (annual prepay) |
|---|---|---|
| **Kyst / Lite** (11–28 m coastal) | PMS light, certificates, documents, defects, mobile | NOK 1.5–3k (self-serve later; don't sell this manually now) |
| **Core** | PMS (SFI, running hours), certificates and class, documents, defects, procurement basics | NOK 5–7k |
| **Operations** (the anchor tier) | Core plus ISM/QHSE, crew rotation and rest hours, drydock | **NOK 10–12k** |
| **Fleet** | Operations plus fishery (quota, ERS, landing notes) or voyage/charter, AI analytics, API, SSO, fleet dashboards | NOK 14–18k |
| Add-ons | Crew payroll/lott, emissions/CO₂-compensation reporting, extra integrations | NOK 1–3k each |

**Where these prices sit against the market**
- Public benchmarks:
  - YMS360 charges **$300–650/vessel/month** ([yms360](https://www.yms360.com/pricing)).
  - PRIME Marine is about $450–750 ([softwarefinder](https://softwarefinder.com/fleet-management-software/prime-marine)).
  - Legacy suites such as AMOS/ShipManager run $500–2,000 ([fleetrabbit](https://fleetrabbit.com/industry/vessel-fleet/commercial-vessel-planned-maintenance-system-software-pms-running-hour-scheduling)).
- Your **NOK 25–45k incumbent figure is almost certainly a multi-product bundle**, as `01-competitors.md` also concludes.
- A NOK 10–12k anchor is a **60–75% saving against the reported NOK 500k/vessel stack** while sitting at the top of the single-product range. **Do not start at NOK 20k.** An unproven vendor with 2 people cannot win a price fight upward.

**Commercial terms**
- **Annual prepay by default**, with 8% off against monthly. Offer 2–3-year terms with a CPI-plus-2% escalator.
- **Minimum contract of 3 vessels or NOK 25k/month.**
- **Onboarding fee of NOK 15–25k per vessel, minimum NOK 50k per customer**, for data migration from PreMaster/AMOS, SFI coding and training. Never waive it to zero. Charging it tests seriousness.
- **Design partners:**
  - at most 3
  - 50% off list for 12 months, then list minus 10%
  - in return: a named executive sponsor, weekly use on board, monthly feedback, a reference and case-study right, and a written go/no-go date.
  - **No free pilots.** A free pilot tells you nothing about willingness to pay.

**Unit-economics targets (Gate 4 in your roadmap)**
- Gross margin ≥75% in 2028 and ≥80% at scale (hosting, AI inference, support).
- Average contract value (ACV) ≥ NOK 300k per customer.
- CAC payback ≤18 months. LTV:CAC ≥3.
- Logo churn <5%/yr. Net revenue retention ≥110% from tier upgrades and fleet expansion.
- Onboarding fees cover ≥70% of onboarding cost.
- Sales cycle ≤6 months.
- Burn multiple <2 after the raise.

The old `06-financial-model.csv` assumes NOK 750–3,000 per vessel per month. **That is 4–10× below these recommendations and should be retired.**

---

## 5. Company hygiene before any money (do it in Q4 2026; it costs about NOK 60–100k)

1. **Holding companies first.** Each founder should hold through a personal holding AS before any value event: a signed LOI, a priced round or OT2. Today the share value is roughly the NOK 30k share capital, so a transfer now carries almost no tax. After a round it gets expensive.
2. **Shareholder agreement (SHA)**, including:
   - **4-year vesting with a 1-year cliff**, implemented as good/bad-leaver call options at nominal value
   - a **deadlock mechanism** between the brothers: an independent chair or board member with a casting vote, or a shotgun clause
   - drag-along and tag-along, pre-emption, and a non-solicit
   - roles: CEO decides operations; board decides budget and hires.
   - **Brothers fall out too. Investors will ask.**
3. **IP assignment**, in writing:
   - Both founders assign all code, designs, trademarks and domain names to the AS.
   - The Lovable, Supabase, GitHub, Anthropic and Google accounts must be **owned and paid for by the AS**, not personal accounts.
   - **Correction to the brief:** the employer claim window under arbeidstakeroppfinnelsesloven § 7 is **4 months**, not 3 ([SNL](https://snl.no/arbeidstakeroppfinnelse)). That Act covers *patentable inventions*. For software, get **written confirmations from Lerøy and DeepOcean** that they claim nothing and that no working time or equipment was used.
4. **Cap table:** clean 50/50 now. Plan a 10% option pool at the round using the widened startup option scheme ([regjeringen](https://www.regjeringen.no/no/aktuelt/utvidingane-av-opsjonsskatteordninga-for-oppstarts-og-vekstselskap-trer-i-kraft-13.-mars-2025/id3091435/)). Advisor equity: 0.25–1% vesting over 2 years, never unvested grants.
5. **VAT:** register with the VAT register (Merverdiavgiftsregisteret) now by pre-registration (forhåndsregistrering), or at the latest when taxable turnover passes NOK 50k in 12 months. Advisory invoices will get you there fast.
6. **Accounting:** Tripletex or Fiken plus an authorised accountant. A separate bank account. Monthly close. **Time tracking per SkatteFUNN project from day 1.** Choose an auditor before the 2027 SkatteFUNN claim.
7. **Board and advisors:** add 1 independent board member with a maritime commercial background (a sales or CFO type from a Sunnmøre shipowner or supplier). Add 2–3 advisors: a fishing operator, a software/security CTO, and a VC-savvy angel.
8. **Name and trademark:** "Seawise" and "Nautech" both collide with existing businesses (seawise.com, Nautech Ltd). **Do a trademark search before spending money on branding.** Consider renaming the product while it is still free.
9. **Data room:** certificate of incorporation, SHA, IP assignments, employer waivers, cap table, financial model, security overview, customer contracts and LOIs, grant decisions, and pitch materials.
10. **Truthful website this week.** "First crews are using it" is a misrepresentation that could surface in DD or in an IN grant review.

---

## 6. Top 7 recommendations

1. **Sell before you build.** Put a 90-day freeze on new modules and put 80% of your 200 hours into selling. The goal is **2 paid design partners (≥6 vessels) by 30 Apr 2027**, under the terms in §4.
2. **Pick one beachhead: large Norwegian fishing vessels (trawlers, purse seiners, autoliners).** Sell the **Operations tier**, not 12 modules. Park the Emissions, Voyages/charter and Finance modules for this segment: fishing is exempt from EU ETS/MRV.
3. **Adopt the quit rules in §3** as a board resolution. Also ask both employers for leave (permisjon) rather than resigning.
4. **Raise NOK 2.5–3.5M only after the design partners sign**, targeting Q3 2027. Lead with an Investinor-matched pre-seed fund and fill with shipowner angels who are *not* your customers' direct competitors. Use it to match OT2.
5. **Close the commercial gap now.** Recruit an independent board member or senior advisor who has sold software to Norwegian shipowners, with 0.5–1.5% vesting. Decide by the round whether you need a commercial co-founder or a first sales hire.
6. **Build trust and technical depth, not breadth:**
   - move code to your own repository with CI
   - run a security review and pen-test
   - get a DPA in place and use your own AI provider keys
   - add SSO
   - build an **offline-first vessel client**, which is also your SkatteFUNN R&D.

   Apply for SkatteFUNN before the costs are incurred (the "costs after approval" rule is pending).
7. **Complete the hygiene in §5 in Q4 2026**, above all holding companies, the SHA with vesting and deadlock terms, written IP assignment, and moving accounts into the AS.

## "Stop doing" list

- **Stop building new modules.** Twelve modules and zero users is a warning sign to investors, not a strength.
- **Stop chasing a big listed "co-development partner" as plan A.** It is slow, it gives away your pricing power, and it tends to exclude you from selling to the partner's competitors.
- **Stop saying "all vessels over a certain size".** Say "Norwegian fishing vessels over 28 m, then North Atlantic fishing, then aquaculture service vessels."
- **Stop anchoring on the NOK 25–45k competitor price.** Get 2–3 real invoices before you name a price.
- **Stop claiming customers you don't have**, on the website, LinkedIn and in grant applications.
- **Stop using Arne's employer as a data source or target.** Treat Lerøy at arm's length, with Arne recused.
- **Stop counting the 214-company list as a pipeline.** It has names but no contacts, and it includes ports and a county authority. The real pipeline is the 10 named, qualified companies from Step 9.
- **Stop running AI features through Lovable's gateway on customer data** until a DPA and no-training terms are in place.

---

### Sources
- Arbeidsgiveravgift 2026 zones and fribeløp: https://www.skatteetaten.no/satser/arbeidsgiveravgift/?year=2026 ; zone map: https://www.skatteetaten.no/satser/arbeidsgiveravgift---soneinndeling/
- OTP minimum 2%: https://www.dnb.no/dnbnyheter/no/din-okonomi/pensjon-fra-foerste-krone
- Engineer salaries (NHO/SSB 2024): https://www.tekna.no/en/salary-and-negotiations/pay-and-salary-in-norway/engineer-salary-levels-in-norway/
- Employee inventions 4-month rule: https://snl.no/arbeidstakeroppfinnelse
- VesselMan exit: https://maritime-executive.com/article/marcura-acquires-vesselman-expanding-digital-solutions-offering ; https://ey.com/en_no/insights/strategy-transactions/deals/ey-advises-the-shareholders-of-vesselman-in-the-sale-to-marcura
- PMS price benchmarks: https://www.yms360.com/pricing ; https://softwarefinder.com/fleet-management-software/prime-marine ; https://fleetrabbit.com/industry/vessel-fleet/commercial-vessel-planned-maintenance-system-software-pms-running-hour-scheduling
- SaaS seed ARR expectations: https://nuoptima.com/saas-requirements-benchmark-raising-capital ; https://www.saasrise.com/blog/the-2026-saas-funding-guide
- Investinor pre-seed matching: https://investinor.no/en/pre-seed-matching
- Startup option scheme: https://www.regjeringen.no/no/aktuelt/utvidingane-av-opsjonsskatteordninga-for-oppstarts-og-vekstselskap-trer-i-kraft-13.-mars-2025/id3091435/
- Incumbent sizes and fleet economics: see `01-competitors.md` (PreMaster, Arribatec, Fiskeridir 2024 tables)
