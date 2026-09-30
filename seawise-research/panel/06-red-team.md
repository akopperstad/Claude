# 06: Red team memo on Seawise AS / Nautech

**From:** Red team (devil's advocate)
**To:** Arne and Kristian Kopperstad, and the expert panel
**Date:** 30 Sept 2026
**Mandate:** find every way this fails, then say what would have to be true for it to work. You asked for resistance, so this memo does not soften anything.

---

## 0. Harshest finding (read this if nothing else)

**Seawise has built a solution to a market it has not met.** Today there is:
- a 12-module, 150-table "maritime ERP" built in Lovable,
- zero external conversations, zero pilots and zero revenue,
- a "DMU contact list" that turns out to be 214 company names with every contact column empty,
- a public website that claims live crews that do not exist.

The founders' three main beliefs are unverified or contradicted by the evidence I could find:
1. that the price room is NOK 25–45k per vessel per month,
2. that "we are end users, so we know the market",
3. that "a big ASA partner is the best path".

Your own financial model assumes **NOK 2,000–2,400 per vessel per month**, 10–20× below the price you quote for competitors. The business is being planned on one number and pitched on another.

Code is no longer the scarce resource. Anyone with Claude Code or Lovable can rebuild your data model in a weekend, especially because your public front-end bundle exposes it. The scarce resources are trust, references and sales access to the people who sign, and you have none of these yet.

---

## 1. Pre-mortem: "It is September 2028 and Seawise has shut down"

The probabilities below are my estimate that each cause is a **primary** cause of death. They overlap and do not sum to 100%.

| # | Cause of death | P | Early warning signal | Prevention |
|---|---|---|---|---|
| 1 | **Never found a buyer, only admirers.** Chief engineers and skippers loved the demos. Reders and technical managers said "interesting, come back when you have references". No one signed. | 45% | By week 8 you have fewer than 6 conversations with economic buyers (reder, CEO, technical director). Every "yes" comes from users. | Book decision-makers first. Ask for money or a signed LOI (letter of intent) in the second meeting. Count *commitments*, not interviews. |
| 2 | **Boil-the-ocean product.** Twelve modules, each 70% done. Every pilot exposed gaps in the module the customer actually cared about, such as PMS parity with PreMaster or crew payroll. Bug debt and support ate founder time. | 40% | Pilot feedback lists missing features across 4 or more modules. You fix bugs in modules no customer asked for. | Cut to 1–2 modules for one segment. Everything else is hidden behind "roadmap". |
| 3 | **Founders never quit their jobs, so sales never happened.** Enterprise sales happen in office hours, face to face, over 6–12 months. One founder is at sea on rotation and the other is in subsea. The "200 h/week" became 40 h of coding at night and zero meetings. | 40% | Meetings slip because of rotations. Calendar density is under 3 external meetings a week. The time-to-reply to prospects is over 48 hours. | Set a hard date for one founder to go full-time, funded by Oppstartstilskudd 1, advisory revenue or leave. Put the calendar on the scoreboard. |
| 4 | **The price collapsed to SaaS reality.** The market price for PMS/fleet SaaS in the small-fleet segment turned out to be USD 100–500 per vessel per month, not NOK 25–45k. At NOK 2–4k per vessel, NOK 5M ARR needs about 100–200 vessels, which is most of your reachable beachhead. | 35% | Interviewees anchor on single-module prices. The "NOK 5M for 10 vessels" turns out to include ECDIS, comms, ERS and the accounting ERP, most of which Nautech does not replace. | Break the NOK 500k/vessel down line by line in week 1. Price on one displaced system and on hours saved. |
| 5 | **Security or trust veto.** The first serious buyer's IT department asked for ISO 27001 or SOC 2, a pen test, SSO, data residency, backup/RPO, offline sync and a DPA (data processing agreement). A 2-person company on Lovable with a public data model failed the questionnaire. A Supabase RLS misconfiguration leaked crew personal data (crew records are subject to GDPR). | 30% | The first security questionnaire takes over 2 weeks to answer. Anonymous-key reads succeed on any table. | Commission an external pen test and an RLS audit now. Write a one-page security model. Move off the Lovable AI gateway for anything that handles customer data. Lovable apps have a documented history of RLS exposure (see [CVE-2025-48757, CVSS 9.3](https://cvemon.intruder.io/cves/CVE-2025-48757); about 10% of 1,645 scanned Lovable apps exposed tables ([Pluto Security](https://blog.pluto.security/p/cve-202548757-what-happened-why-it-b22))). |
| 6 | **Big-partner trap.** You spent 9–15 months in "co-development" with a listed group. It ran a steering committee, asked for free customisation, ran procurement and chose an incumbent anyway, or kept Seawise as an unpaid lab. | 30% | No paid pilot within 90 days of the first meeting. More than 5 of their people join meetings but no budget line exists. | Accept a big design partner only with a paid pilot, a named budget owner and exit criteria. Otherwise sell to 5–20-vessel family reders who decide in one meeting. |
| 7 | **Runway and funding gap.** The pre-seed market was tight: public pre-seed top-ups via Investinor and Nysnø got NOK 0 in fresh capital in 2025–26 (see 04-funding). Investors wanted ARR or paid pilots, which you did not have. Grants covered months, not years. | 25% | By Q2 2027: fewer than 2 paying customers and no investor second meetings. | Treat revenue as the funding plan. Advisory cash and paid pilots come before any pitch deck. |
| 8 | **Founder conflict or burnout.** Brothers, with no vesting, no shareholder agreement and no tie-break. One wanted to keep the salary and the family; the other wanted to jump. Resentment followed, then a stalemate. | 20% | Missed Friday reviews. Unequal hours. "I'm doing all the …" statements. | Sign a shareholder agreement with vesting, leaver clauses and a deadlock mechanism *this month* (see 04-funding §5). Agree each person's quit criteria in writing. |
| 9 | **Employer or legal blow-up.** Using Lerøy Havfisk's confidential licence data, colleagues or vessel data as the first "pilot" was seen as a breach of the duty of loyalty. Alternatively, the website's false "live, crews using it" claim surfaced in due diligence or a grant review (misleading marketing under markedsføringsloven, plus credibility loss). | 15% | The employer hears about Seawise from a customer rather than from you. A grant officer asks for pilot references. | Fix the website today. Get written, lawyer-reviewed clearance from both employers that covers selling to their competitors and to the employer itself. See §3. |
| 10 | **Out-built and out-sold.** A funded AI-native newcomer or an incumbent's "AI copilot" release matched the UI advantage. Incumbents such as SpecTec launched [AMOS-X](https://www.ajot.com/news/spectec-launches-amos-x-to-streamline-maritime-asset-management) (Sept 2025) and [AI-enabled AMOS Procure Smart](https://yespress.io/spectec) (June 2026). "Modern UI" stopped being a reason to switch. | 20% | Incumbent release notes mention AI, cloud and mobile. Prospects say "our vendor is launching that next year". | Differentiate on workflow and regulatory depth in one niche, such as fishery ERS/quota plus maintenance. Do not compete on UI. |

**The meta-cause behind causes 1–4:** you are optimising what you are good at (building) and avoiding what you have never done (selling). Claude makes this *worse*, because building now feels free and productive.

---

## 2. Assumption audit

| # | Assumption (founders' words or implied) | Evidence for | Evidence against | 2-week test | Kill criterion |
|---|---|---|---|---|---|
| A1 | "Competitors charge NOK 25–45k per vessel per month, so there is room." | One insider datapoint: NOK 5M/yr for 10 vessels. | Public list prices in the SaaS segment are far lower: around USD 250 per ship per month for a starter PMS (Navatom) and USD 500–2,000 per month cited for enterprise suites such as DNV ShipManager ([aggregator summary, unverified](https://www.capterra.com/p/10046587/VesselManager/)); Martide crew operations cost USD 249/month for 50 seafarers ([Martide pricing](https://www.martide.com/en/pricing)). Your own model uses NOK 2,000–2,400 per vessel per month. The NOK 500k/vessel almost certainly bundles many systems. | Break the NOK 5M down by line item: which vendor, which module, and which lines Nautech *could* displace. Ask 5 technical managers what they pay for PMS alone. | If the displaceable spend is under NOK 5k per vessel per month, reprice the plan and treat "room" as a myth. |
| A2 | "Legacy incumbents are beatable because they are old." | Many run old Windows clients. Users complain. | Old ≠ weak. They are embedded in ISM procedures, class audits, historical maintenance records and crew training. Switching costs are the moat. TM Master (Tero Marine, Bergen) has been built out over 30 years under Seagull ownership ([Ocean News](https://oceannews.com/?p=52872)). PreMaster (Premas) sells on low bandwidth and 30 years of history. Incumbents are shipping cloud and AI (AMOS-X). Shipping software "tends towards monopolies because there isn't enough business to go around" ([FreightWaves](https://www.freightwaves.com/?p=142515)). | Ask 10 technical managers: "When does your PMS contract renew, and what would it take to migrate 10 years of history mid-audit-cycle?" | Fewer than 3 of 10 have a renewal or a pain event within 12 months: no switching window. |
| A3 | "We are end users, so we know the market." | Real engine-room credibility. That is rare and valuable. | You know the *user* at two companies. The buyer is the reder or technical director, whose criteria are risk, ROI and audit safety (ÅKP slide: top management asks *why*). There is also a sample of n=2, and survivorship bias toward your own workflow. | Five interviews with technical directors outside your employers. Write down three things that surprised you. | Zero surprises means you are not listening. Fewer than 3 of 5 rank your top pain in their top 3 means your pain is not their pain. |
| A4 | "Claude makes us a 10-person company." | You have shipped a lot of software fast. That is true and impressive. | It is 10× on *code*, 1× on sales meetings, trust, travel, security audits, onboarding and support at 03:00 when a vessel cannot log hours. Every competitor has the same tool, so the multiplier is shared, not proprietary. | Log hours for 2 weeks by category. | If under 30% of hours are customer-facing, the "10-person company" is 10 developers and no sellers. |
| A5 | "A big ASA partner is the best path." | Logo value, scale and possibly funding. | Long procurement, IT veto, heavy customisation, and a partner that captures the IP or the roadmap. The most enthusiastic contact is rarely the decision-maker. The exit comparable VesselMan took about 10 years from founding (2015) to an acquisition by Marcura (Jan 2025) and raised only about USD 1.1M ([Maritime Executive](https://maritime-executive.com/article/marcura-acquires-vesselman-expanding-digital-solutions-offering)). Big partners did not accelerate it into a large standalone company. | Ask any ASA prospect: "Who owns the budget, what is the procurement process, and can we get a paid 90-day pilot?" | No named budget owner and no paid pilot offered within 60 days: walk away. |
| A6 | "Software for all vessels over a certain size." | The regulations (ISM, PMS, MRV) span segments. | "All vessels" is not a market; it is 6 markets with different buyers, regulators and workflows. Fishing (ERS, quota), offshore (DP, client audits), ferries (public tenders) and aquaculture (wellboat biosecurity) share little beyond PMS, and PMS is the most contested module. | Pick one segment. Count vessels, reachable buyers and word-of-mouth density. | If you cannot name 30 reachable buyers in the segment, it is too thin. |
| A7 | "We can do 200 h/week combined while employed." | Real commitment. | It is arithmetically fragile: a full-time job (40–84 h/week at sea) plus 100 h/week each is not sustainable past 2–3 months. Even if it were, the hours are *nights and rotations*, when buyers are unavailable. | Track the actual hours and, separately, business-hours availability. | Under 10 business-hours slots a week available for customers: a founder must go full- or part-time. |
| A8 | "The 214-company list is a DMU contact list." | It is a starting universe. | It has names and sectors only. There are 4 duplicates, and it includes ports, supply bases and a county transport authority. It is weighted to listed giants (Wilhelmsen, Odfjell, Mowi, Hurtigruten), who are the *hardest* buyers. Believing a document is something it isn't is a process red flag. | Enrich 40 beachhead companies with a named technical manager or reder, a phone number and fleet size. | Under 25 of 40 enriched in 2 weeks means your access is weaker than you think. |
| A9 | "PMS is legally required, so demand is compliance-driven." | ISM Code §10 requires maintenance procedures for ships under ISM. | Everyone affected *already has* a PMS. Compliance creates demand for *a* system, not a *new* one. Smaller fishing vessels may fall outside ISM entirely (the threshold is being verified in 02). | Verify the thresholds. Ask which vessels run on Excel or paper today; those are greenfield. | Under 50 greenfield vessels in the beachhead means compliance is not your wedge. |
| A10 | "Modern web app works at sea." | Starlink is common now. | Engine-room connectivity, blackouts in the Barents Sea and audit trails during outages. Incumbents like PreMaster [sell explicitly on low-bandwidth operation](https://knowledge.energyinst.org/search/record?id=31659/). | Ask 5 chief engineers about the worst connectivity week last year. | Any "yes, we lose it for days" means you need offline-first before paid pilots. |
| A11 | "Employer IP risk is closed." | An IP consultant was used, the employers were informed, and the claim window passed. | The claim window comes from the employee-inventions act, which covers patentable inventions. Software copyright (åndsverkloven §59 on programs made in the course of employment) and the *duty of loyalty* while employed are separate questions. Selling to your employer's direct competitors, or to your employer, while employed is the live risk. Get a lawyer to confirm this. | Get written confirmation from both employers that covers competing sales and use of domain knowledge. | Any hesitation from Lerøy Havfisk: do not target whitefish trawlers until Arne has left. |

---

## 3. Founder-market fit and team risks

**What is strong:**
- Real domain credibility: marine engineers who have lived with the tools.
- Relentless building speed.
- Physical location in the densest shipowner cluster in Norway (Herøy/Ulstein).
- Genuine hunger.

**What is dangerous:**

1. **No commercial DNA.** Neither founder has sold B2B software, run a procurement process from the vendor side, or negotiated a contract. The ÅKP slide warned that engineers default to the "problem solver" profile, the weakest in complex sales. **Mitigation:** bring in a part-time commercial co-founder or advisor with 5–15% equity and vesting. The ideal profile is an ex-technical director or ex-sales lead from Maritech, Tero, DNV or Premas.
2. **Both still employed.** This is a triple conflict: time, loyalty and information.
   - Arne's best insight, the NOK 5M licence spend, is confidential employer information. You cannot use it in a pitch deck, and pitching his employer's peers with it is an ethical and legal risk.
   - Kristian's DeepOcean role creates the same issue in subsea.
   - **Rule:** no selling to your employer, or using its data, until you have resigned or have written consent.
3. **Brothers.** Family ties mean conflict gets avoided until it explodes, and nobody fires a sibling. You need:
   - a shareholder agreement with 4-year vesting and a 1-year cliff,
   - good/bad-leaver clauses,
   - a named tie-break (for example, the ÅKP advisor or an independent board member),
   - written roles (CEO owns sales and funding; COO owns product and delivery).
4. **Key-person risk.**
   - All the code knowledge sits in prompts and in two heads, on a vendor platform (Lovable).
   - The AI features route through Lovable's AI gateway, which means vendor lock-in plus a question customers will ask about data residency.
   - If either founder is at sea during an outage, no one responds.
5. **Burnout.** "I don't give two shits about anything other than…" is fuel for 6 months and a burnout risk at 18. The job-plus-startup load at 100 h/week each is a known failure mode. Set a date and a funding trigger for quitting instead of relying on will.
6. **Credibility self-harm.** The false "live, first crews using it" claim and the reuse of the name Seawise all cost trust.
   - seawise.com is an existing vessel-data/MRV company, which is a trademark and SEO risk in *your own category*.
   - Nautech collides with Nautech Ltd (marine IoT/NMEA).
   - In a trust-driven market, being caught in one exaggeration costs more than being small.

---

## 4. Competitive counter-moves

| Player | Likely move within 24 months | Implication |
|---|---|---|
| **DNV (ShipManager, Veracity)** | Bundles more AI and compliance (IHM, MRV/ETS) with class data. They have about 7,000 vessels on ShipManager ([DNV flyer](https://www.dnv.com/siteassets/images/pdf-documents/maritime-software---overview---flyer.pdf)). | Do not fight on compliance breadth. Integrate *with* Veracity or class survey data; do not replace it. |
| **Kongsberg Digital (Vessel Insight, Kognifai marketplace)** | Keeps adding third-party apps to its marketplace ([Digital Ship](https://thedigitalship.com/news/maritime-software/kongsberg-adds-four-new-partners-to-kognifai-marketplace/)). They own the sensors and the automation on many Sunnmøre-built vessels. | A marketplace listing is a *channel*, not a threat, if you are a narrow app. As a "full OS" you are a direct rival they can shut out. |
| **SpecTec AMOS** | AMOS-X (2025) and AI procurement (2026). | "Legacy" incumbents are modernising. Your UI edge shrinks each release. |
| **Premas (PreMaster), Tero Marine (TM Master), ShipNet** | They will match with price or migration offers when a named customer threatens to leave. They will sow FUD: "a 2-person startup on a no-code tool with your ISM records?" | Expect this objection in *every* deal. You need an answer on escrow, data export, security and continuity. |
| **Marcura (ShipServ, VesselMan, MarTrust)** | A roll-up strategy: buys niche SaaS and integrates it into procurement and payments ([Marcura blog](https://marcura.com/resources/blog/marcura-aquires-vesselman)). | This is **your most realistic exit path**: a niche module with loyal customers. It is not a competitor you beat head-on. |
| **Maritech (Molde, CAI Software-owned, seafood ERP)** | Owns the fish-trade and traceability layer that fishing companies already buy ([SeafoodSource](https://www.seafoodsource.com/news/business-finance/cai-software-acquires-maritech-in-tie-up-of-seafood-industry-erp-software-providers)). It could extend onto the vessel. | This is both the scariest competitor and the best partner or acquirer in fishing. |
| **AI-native newcomers** | Funded seed teams are appearing: MagicPort (USD 3M pre-seed, July 2026), Ocean Smart, Spot Ship ([CB Insights](https://www.cbinsights.com/company/magicport); [Wowtale](https://en.wowtale.net/2026/06/04/234189/)). | They have more capital and often commercial founders. |

### Can a 2-person team with Claude Code be out-built by another 2-person team with Claude Code?

**Yes, trivially, and faster than you think.** Your front-end bundle exposes the full data model. A competent team could have a feature-comparable clone in 2–4 weeks. Code parity is now the *baseline*, not the moat.

**What is actually defensible, in descending order:**
1. **Installed data and workflow lock-in**, such as maintenance history, certificates and crew records. It only exists once customers are live.
2. **Trust and references in a word-of-mouth cluster.** Five Sunnmøre reders who vouch for you beat any feature.
3. **Regulatory integrations that are painful to certify**, such as the Fiskeridirektoratet ERS/landing-note flows and BarentsWatch, plus class-survey data feeds.
4. **Domain credibility converted into content**: Challenger insight on ETS, IHM and ERS deadlines.
5. **Speed of iteration *with* customers.** It only counts if customers exist.

None of these five exists today.

---

## 5. The anti-strategy: what you must NOT do

1. **Do not build another module** until a paying customer asks for it in writing. The building freeze in 10-roadmap is the right call. Enforce it.
2. **Do not pitch "maritime operating system" or "ERP".** It triggers a CIO-level, 12-month, replace-everything evaluation that you will lose. Pitch one job done better.
3. **Do not chase listed giants first** (Wilhelmsen, Odfjell, Mowi, Hurtigruten, Aker BioMarine). Their procurement will outlast your runway.
4. **Do not give away "free co-development".** Every pilot is paid, even at NOK 5–20k, with success criteria.
5. **Do not use employer data, contacts or confidential numbers** in any pitch, deck or grant application.
6. **Do not raise equity on a slide deck** at a low valuation now. Evidence first; money follows.
7. **Do not keep any false claim public** for one more day: the website, and any "pilot" wording in applications.
8. **Do not count interviews as progress.** Count commitments: second meetings with a buyer, LOIs, invoices.
9. **Do not spread across 6 sectors.** Pick one for 12 months.
10. **Do not store crew personal data** (GDPR, MLC records) until the RLS audit, DPA and backups are done.
11. **Do not quit without a trigger**, and do not stay employed indefinitely. Write down the trigger, for example "3 paid pilots or NOK 600k committed → Arne quits".

### Three alternative strategies that may dominate the current plan

**Alt 1: the narrow wedge (my recommendation as the base).**
- The product is one module for one segment: for example "maintenance + certificates + class survey tracker with ERS/catch hooks" for Norwegian ocean-going fishing vessels owned by 1–10-vessel family reders in Møre og Romsdal (Fiskebåt members).
- Target greenfield (Excel or paper) operators and PreMaster users with renewal pain.
- Price NOK 3–6k per vessel per month, plus an onboarding fee.
- Migration and import is the killer feature, and you already have the PreMaster CSV import.
- **Why it dominates:** short sales cycle (the reder decides), dense word of mouth, and your credibility applies directly.

**Alt 2: advisory-led compliance service ("service-as-software").**
- Sell outcomes, not seats. Examples:
  - "We keep your ISM/PMS, certificates, IHM and MRV/ETS reporting audit-ready for NOK X per vessel per month."
  - Deliver it with Nautech as the internal tool, operated by you.
- **Why it dominates:** revenue in 60 days; no switching fight (you sit alongside their existing system); no IT security veto at first; it funds the founders' exit from their jobs; it generates the insight (Challenger) content and the data for the product. The advisory line on seawise.no already exists, so make it the lead.
- **Risk:** it doesn't scale like SaaS. Accept that for 18 months.

**Alt 3: partner, white-label or be acquired.**
- Put Nautech's fishery/vessel modules in front of an established distributor. Candidates:
  - Maritech (seafood ERP, lacking the vessel side),
  - an ERS vendor,
  - Kongsberg's Kognifai marketplace,
  - a Sunnmøre ship-management or accounting firm.
- Alternatively, position for a Marcura- or VesselMan-type acquisition of a niche module.
- **Why it dominates:** it borrows trust, security posture and a sales force you lack.
- **Risk:** margin share and dependence. It is still better than zero distribution.

**The combined play:** Alt 2 for cash and insight in months 0–9 → Alt 1 as the product in months 6–24 → Alt 3 as the channel or exit option from month 12.

---

## 6. Final verdict

**Target: NOK 5M ARR by 31 Dec 2028.**

What it requires:
- about 175 vessels at NOK 2,400 per vessel per month (your own model's price), or
- about 85 vessels at NOK 5k, or
- about 35 vessels at NOK 12k (only if A1 holds).

Your BASE model reaches NOK 4.3M in 2028 and still assumes 12 paying vessels in 2026, which is impossible with 3 months left and zero pilots.

| Scenario | P(≥ NOK 5M ARR by end-2028) | Reasoning |
|---|---|---|
| **Current plan** (12-module OS, multi-sector, big-ASA partner, founders employed indefinitely, pitch-first) | **~3–5%** | It needs a big partner to commit fast *and* the price claim to hold *and* the founders to make the jump in time. Each of these is under 40% alone, and they are correlated. |
| **Adjusted plan** (one segment, one or two modules; advisory-led cash; paid pilots only; commercial co-founder or advisor; one founder full-time by Q2 2027; security baseline; partner channel explored) | **~12–18%** | This is still a long shot. Comparable niche maritime SaaS companies took years to reach this scale (VesselMan: about 10 years to a modest exit). A more realistic 2028 target is **NOK 1.5–3M ARR plus advisory revenue**, which is fundable and survivable. |

**What would have to be true for success:**
1. At least 3 family-owned fishing reders pay for a pilot by Q1 2027.
2. The price for the displaceable spend is at least NOK 4k per vessel per month.
3. One founder is full-time by mid-2027.
4. A security review is passed at least once.
5. One channel partner, such as Fiskebåt, Maritech or Kognifai, actively refers deals.

**The single most important recommendation:** **freeze the product and sell for 60 days. In the next 14 days, get 10 meetings with *economic buyers* (reders or technical directors) at 1–10-vessel fishing companies outside your employers, and ask each one for a paid pilot or advisory engagement.**
- If 2 or more say yes: you have a company. Narrow the product to what they paid for.
- If none say yes after 20 buyer meetings: stop building the ERP, and pivot to Alt 2 or Alt 3.

---

### Sources
- Marcura acquires VesselMan: https://maritime-executive.com/article/marcura-acquires-vesselman-expanding-digital-solutions-offering ; https://marcura.com/resources/blog/marcura-aquires-vesselman
- SpecTec AMOS-X: https://www.ajot.com/news/spectec-launches-amos-x-to-streamline-maritime-asset-management ; AMOS Procure Smart: https://yespress.io/spectec
- DNV maritime software (300 companies, 7,000+ vessels): https://www.dnv.com/siteassets/images/pdf-documents/maritime-software---overview---flyer.pdf
- Pricing benchmarks (aggregator, unverified): https://www.capterra.com/p/10046587/VesselManager/ ; Martide pricing: https://www.martide.com/en/pricing ; ShipNet estimate: https://softwarefinder.com/enterprise-resource-planning-software/shipnet
- Shipping software market dynamics: https://www.freightwaves.com/?p=142515 ; https://www.shipuniverse.com/?p=14360 ; https://kongsberg.com/digital/resources/stories/2019/10/maritime-software-landscape-2019
- Failures: TradeLens https://www.maritimegateway.com/maersk-and-ibm-shutdown-tradelens/ ; PortDesk https://www.cbinsights.com/company/portdesk ; Shipbeat https://oresundstartups.com/tag/shipbeat/
- Tero Marine / TM Master: https://oceannews.com/?p=52872
- PreMaster (low bandwidth): https://knowledge.energyinst.org/search/record?id=31659/
- Kongsberg Kognifai marketplace: https://thedigitalship.com/news/maritime-software/kongsberg-adds-four-new-partners-to-kognifai-marketplace/
- Maritech / CAI: https://www.seafoodsource.com/news/business-finance/cai-software-acquires-maritech-in-tie-up-of-seafood-industry-erp-software-providers
- AI-native entrants: https://www.cbinsights.com/company/magicport ; https://en.wowtale.net/2026/06/04/234189/ ; https://seedtable.com/companies/spot-ship/funding-rounds/seed-2026-01
- Lovable/Supabase RLS: https://cvemon.intruder.io/cves/CVE-2025-48757 ; https://blog.pluto.security/p/cve-202548757-what-happened-why-it-b22
- Internal: _case-brief.md, 10-roadmap.md, 00-mit24-workbook.md, 04-funding-ecosystem.md, 06-financial-model.csv, target-companies.csv
