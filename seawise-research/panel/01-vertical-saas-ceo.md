# Panel memo 01: the vertical-SaaS CEO view

**From:** a panel member who has built and sold vertical software to industrial and maritime operators
**To:** Arne and Kristian Kopperstad, Seawise AS
**Date:** 30 Sep 2026
**Brief:** you asked for resistance, so this memo is blunt. Every criticism below comes with a fix.

---

## Bottom line first

You don't have a product problem. You have a **focus and a trust problem**.

Nautech is 12 modules and about 150 tables. It has zero users, and it has a website claiming crews already use it. The most dangerous thing you own right now is that breadth. Nobody buys a "maritime OS" from two part-time founders. A skipper-owner in Fosnavåg *will* buy something that gets his maintenance plan and certificates out of Excel and PreMaster before the next inspection, at a price he can approve on the phone.

**The wedge:** planned maintenance plus certificate and survey control, for Norwegian fishing vessels of about 15–40 m owned by companies with 1–10 vessels.

**The decision rule:** sell that one job to 10 paying operators by 31 January 2027. Hide the other 10 modules until then.

---

## 1. Is "one maritime OS, 12 modules, all vessels over X size" viable as a *starting* strategy?

**No.** It is a fine *end state* and a fatal *starting* strategy.

**How the winners actually started**

Every comparable company started with one job for one kind of customer, and earned the "OS" later:
- **ServiceTitan** began as software for the founders' own fathers' plumbing and contracting businesses. It stayed in residential trades for years before becoming the "OS for trades". It also enforced ICP discipline hard enough to turn revenue away ([Built In LA](https://www.builtinla.com/articles/silicon-hills-servicetitans-humble-origins); [SaaStr](https://www.saastr.com/from-30m-to-11b-the-servicetitan-playbook-cro-masterclass-on-vertical-saas)).
- **Procore** began because the founder was building his own house and couldn't coordinate the subcontractors ([Santa Barbara Independent](https://www.independent.com/2019/03/27/better-building-procore/)).
- **Samsara** landed with a single application, vehicle telematics, then drove multi-application expansion. At IPO, 89% of its $100k+ customers used two or more apps, with net retention above 125% for that cohort ([Samsara S-1](https://www.sec.gov/Archives/edgar/data/1642896/000119312521334578/d261594ds1.htm)).
- **VesselMan**, the closest Norwegian analogue, did one thing: drydock and technical-project management. It sold to Marcura in January 2025 ([EY](https://ey.com/en_no/insights/strategy-transactions/deals/ey-advises-the-shareholders-of-vesselman-in-the-sale-to-marcura); [Maritime Executive](https://maritime-executive.com/article/marcura-acquires-vesselman-expanding-digital-solutions-offering)). It needed a decade, family-office money from Møkster and Ystholmen, and **one** module.

The pattern is:
1. Land with one mandatory, recurring, budgeted workflow that a single person can buy.
2. Get the crew using it daily, so you own the data.
3. Expand into adjacent workflows that reuse that data.

"Land" means one module on one vessel type. "Expand" means module 2 once module 1 has more than 70% weekly active use.

**Why 12 modules actively hurts you**

- **Credibility.** A buyer sees 12 modules from a 2-person company and correctly concludes that each one is shallow. Incumbents like AMOS, ShipManager and Star IPS have 20+ years of depth in PMS alone.
- **Surface area.** You cannot support, secure and keep offline-capable 150 tables across 12 domains at night after work. One bug in payroll or ERS reporting can have legal consequences for the customer.
- **Irrelevance.** Some modules don't apply to your likely buyer at all. The EU ETS, EU MRV and IMO CII all apply to ships of 5,000 GT and above ([European Commission](https://climate.ec.europa.eu/eu-action/transport-decarbonisation/reducing-emissions-shipping-sector_en)). That excludes almost every Norwegian fishing vessel. Your Emissions module is a demo for a customer segment you can't reach yet.

**Candidate wedges, scored**

Criteria: mandatory, budgeted, painful, winnable by you, expandable.

| Wedge | Mandatory? | Winnable by 2 founders? | Verdict |
|---|---|---|---|
| **Planned maintenance + certificates/surveys** | Yes. The Sdir safety-management regime requires a maintenance plan, and it is audited ([Sdir guidance for smaller vessels](https://www.sdir.no:443/globalassets/brosjyrer/sikkerhetsstyring-pa-mindre-fartoy-2022.pdf)) | **Yes.** You are marine engineers and live this job. You already have a PreMaster CSV import. It is a daily-use workflow | **Pick this** |
| ERS / catch reporting | Yes | No. Crowded with cheap, entrenched, Fiskeridir-approved tools (iFisk, eFangst, MarineSmart, ApolloSAT, per [SNL](https://snl.no/fangstdagbok)). Certification burden, low price, high liability | Integrate later, don't lead with it |
| EU ETS / CII | Only ≥5,000 GT | No. You would compete with DNV, Veson and class societies, with no domain edge | Drop for now |
| Crew / STCW / MLC | Partly | Medium. Payroll is a swamp | Module 2 candidate (certificates only) |
| Full ERP | No | No | End state, 2029+ |

**Why PMS wins**
- A regulator forces the job to be done.
- The chief engineer uses it every week, which gives you daily-use stickiness.
- Switching is painful, so once you own it you keep it.
- It naturally pulls in certificates, spares and procurement, defects, and later drydock.

Two things to verify: the exact regulatory thresholds (see `02-segmentation-and-thresholds.md`), and whether class-entered vessels require a class-approved PMS. That second point decides whether you target 15–28 m (non-class, lighter requirements) or larger vessels first.

---

## 2. Beachhead: a listed ASA co-development partner vs. many small operators

My view: **your preference for an ASA partner is the single biggest strategic mistake in the brief.**

| | Large ASA co-development partner | 10–20 small owner-operators (1–10 vessels) |
|---|---|---|
| Time to first NOK | 9–18 months (IT, security, procurement, legal) | 2–8 weeks. The owner is the economic buyer |
| What they will demand | SSO, ISO 27001/SOC 2 evidence, DPA, penetration test, integration with their ERP/PMS, source-code escrow | "Does it work offline on board? Can you move my PreMaster data? What does it cost?" |
| Your stack's fit | Poor. A Lovable/Supabase MVP with a public bundle exposing the data model fails a vendor-risk questionnaire on day one | Acceptable, with basic hardening |
| Revenue at signature | Maybe NOK 200–600k, often as NRE for custom work | NOK 20–60k/year each. Small, but *repeatable* |
| Hidden cost | You become their outsourced dev shop. The roadmap is theirs. They want IP or exclusivity. Champion turnover kills the deal | Support load, and many small invoices |
| Signal to investors | "One customer, custom build", which scares seed funds | "15 logos, 40 vessels, 90% weekly use": a fundable pre-seed |
| Conflict risk | **Severe.** Arne works at Lerøy Havfisk, and the obvious ASA partners in fisheries are his employer or its direct peers. The NOK 5M/year licence figure is confidential employer information and cannot be used | Low |

**What gets you to "quit my job" fastest:** small operators. You are two brothers from Sunnmøre, one of them a working marine engineer on trawlers. Your unfair advantage is **peer trust with owner-skippers and chief engineers**, not enterprise sales. The ASA route replaces that advantage with the one thing you're weakest at: surviving enterprise procurement with an AI-built MVP.

**The hybrid I recommend**
- **Months 0–4:** 8–10 small and mid-sized fishing owners as paying design partners. Family-owned havfiske and coastal companies in Møre og Romsdal and Vestland.
- **Months 6–12:** one **mid-sized, family-owned, non-listed** group with 10–25 vessels as an anchor. Sunnmøre has many of these, and Møkster-type family offices also invest.
- **ASA groups** (Wilhelmsen, Odfjell, Solstad, DOF, Mowi and others) come after you have references, SOC 2-lite hygiene and 20+ vessels live. That means 2028.

**Your target list is aimed at the wrong customers**
- The 214-company sheet has 39 fishing companies and no contacts.
- Norway had **5,372 registered fishing vessels in 2024, of which 268 are over 28 m** ([SNL/Fiskeridir](https://snl.no/havfiske)).
- Your beachhead is the several hundred 15–40 m vessels and their owners, and **almost none of them are on your list**.
- Build that list from Fiskeridirektoratet's vessel register (merkeregister), not from a list of ASA names.

---

## 3. Numeric "quit my job" milestones

**Assumptions**
- Each founder needs about NOK 55k/month gross salary, which is about **NOK 800k/year fully loaded** (14.1% employer tax, OTP pension, holiday pay).
- Two founders plus hosting, tools, insurance and travel come to a burn of about **NOK 2.0M/year**.
- Wedge pricing: **founding-partner price NOK 1,500/vessel/month**, locked for 24 months. **List price NOK 2,500–3,500/vessel/month.** One-off onboarding and migration fee: NOK 15–40k.

On pricing: your belief that competitors charge NOK 25–45k per vessel per month almost certainly bundles multiple systems, or is enterprise list price. Don't anchor on it. Your own `06-financial-model.csv` assumes NOK 750–3,000, which is the right order of magnitude.

**Gate 0: before anyone quits (target 31 Jan 2027)**
- 10 signed paying operators, at least 25 vessels, at least NOK 400k contracted ARR.
- 70% or more of paid vessels show weekly active use.
- Innovation Norway OT1 grant applied for or awarded.

**Gate 1: founder #1 goes full-time**

Target: May–June 2027. Negotiate a 12-month unpaid leave (permisjon) instead of resigning. It removes the downside, and Norwegian employers often grant it.

Either of these:
- (a) Contracted ARR of **NOK 600k or more** (about 20–25 vessels at list, or about 35 at the founding price), **plus** at least NOK 800k in the bank (grants + onboarding fees + founder loans), **plus** a 3x pipeline, or
- (b) ARR of **NOK 300k or more** **plus** a closed pre-seed of at least NOK 3M.

The founder who goes first should be the one with the *lower* salary and *no* rotation schedule. A rotation job gives the other brother 2–4 weeks off at a time, and those weeks are extremely valuable for Seawise.

**Gate 2: founder #2 goes full-time**

Target: Q1 2028 in the base case.

Either of these:
- ARR of **NOK 1.8M or more** (about 60 vessels at NOK 2,500), with gross revenue retention above 90%, or
- ARR of **NOK 800k or more** **plus** cash covering 18 months of 2-founder burn, i.e. **at least NOK 3M**, from a pre-seed plus OT2 plus SkatteFUNN. Per `04-funding-ecosystem.md`, OT2 now needs matched money on the account first.

**The fastest credible path:** Arne's network gives 30 conversations in October and 10 demos-with-price in November. Offer a founding-partner contract with a 30-day opt-out: that gives 5 signatures by Christmas and 10 by the end of January. Then hit 20–25 operators and about 60 vessels by the end of 2027.

Anyone telling you that you'll both be full-time by spring 2027 without outside money is selling you something.

**Advisory as bridge revenue: a trap as currently framed, useful if restructured**

Your base-case model has NOK 1.2M of advisory revenue against NOK 0.86M of subscription revenue in 2027. That is a consulting firm with a software hobby.

The rule:
- **Only sell fixed-price services that install Nautech.** For example, a "PMS migration and Sdir-audit readiness package" at NOK 40–80k per operator: you build the SFI component hierarchy, import PreMaster or Excel data, load the certificates, and train the chief engineer.
- That is genuinely valuable, because data migration is where PMS deals die. It is also cash-positive, and it creates a subscriber.
- Cap services at 25% of revenue and 25% of founder hours.
- **Never** sell hourly "regulatory/strategy advisory" that doesn't end in a subscription. Remove the generic advisory menu from seawise.no.

---

## 4. Disciplined Entrepreneurship: where it helps, where to deviate

**Where it helps**
- Step 1 segmentation and step 2 beachhead. This is exactly your disease.
- Step 5 persona. The chief engineer or owner-skipper, not "maritime operators".
- Step 9, the next 10 customers, by name.
- Step 12 DMU: who signs, and who can veto (the crew, the class society, the IT department at a larger owner).
- Step 16 pricing.
- Steps 20–21 assumption testing.

The ÅKP sales rule, "the most enthusiastic are rarely the decision-makers", is gold. The chief engineer loves you and the owner pays.

**Where to deviate**
- **Aulet assumes you have no product. You have too much product.** Your roadmap spends about 20 weeks moving from segmentation to "dogs eat the dog food" (step 23). Collapse that to **8 weeks**, and run discovery as *demo + price + ask for signature* from week 2. An interview without a price question wastes a meeting you won't get twice in a small industry.
- **Skip or time-box to one afternoon each:** step 4 TAM precision, step 14 follow-on TAM, step 17 LTV and step 19 COCA. They are spreadsheet theatre until you have 10 customers.
- **Change the roadmap's "building freeze" to "freeze and hide".** Put 10 modules behind a feature flag. Engineering time goes only to the wedge: offline-capable work orders, running-hour logging on a phone, certificate expiry alerts, PreMaster/Excel import, PDF export for the Sdir auditor.
- **Tempo:** gate reviews every **2 weeks**, not every 8. Weekly numbers:
  - 15 conversations a week (Oct–Nov)
  - demos with a price shown
  - signatures
  - weekly active vessels

  Three weeks without movement on these is your signal to change segment, not to write another document. This research folder is getting large. It is a sign of activity, not progress.

---

## 5. The five most likely reasons Seawise fails in the next 18 months

**1. No one buys, because you are selling a platform instead of a job.**
- *Pre-empt:* one-sentence pitch: "Your maintenance plan and certificates, audit-ready, on the crew's phone, migrated from PreMaster by us, NOK 1,500 per vessel per month."
- Hide all other modules. Kill criterion: if fewer than 3 of the first 20 demos ask for a contract, switch the persona or segment, not the pitch deck.

**2. The product fails at sea or fails due diligence.**
- Signs of the problem: no offline support, AI-generated code nobody fully reviewed, a public bundle exposing the schema, AI calls through a third-party gateway, no backups or restore test. One lost maintenance history in front of an auditor ends you in a small network.
- *Pre-empt, within 6 weeks:*
  - Export the code from Lovable to your own GitHub.
  - Review row-level security on every table.
  - Run nightly backups and one restore test.
  - Build an offline-first PWA for the work-order flow.
  - Write a 2-page security and data-processing document.
  - Add an audit log.
  - Remove AI features from the wedge, or make them opt-in.

**3. A credibility collapse in a small, gossipy industry.**
- The website claims "live, crews using it" when that isn't true. The founders' brief said the list covered "all vessel owners with DMU contacts", which it doesn't. And a confidential employer figure is circulating.
- Sunnmøre maritime is a village: one owner calling another decides your reputation.
- *Pre-empt this week:*
  - Put truthful copy on seawise.no.
  - Never use employer data.
  - Say "founding partners wanted" instead of pretending you have traction.
  - Consider renaming before you have brand equity. You collide with seawise.com (an MRV/vessel-data company), the EU SEAwise project and Nautech Ltd.

**4. Founder bandwidth and employer conflict.**
- "Over 200 hours/week combined" alongside two full-time jobs is either untrue or unsustainable. Sales meetings happen in office hours, and you are at sea.
- Selling to Lerøy's direct competitors while employed at Lerøy is a loyalty-duty issue, whatever the IP window says.
- *Pre-empt:*
  - Get written clarity from both employers on selling to their peers, or exclude them.
  - Put Gate 1 on a calendar.
  - Use rotation weeks for sales travel.
  - Agree who owns sales (Arne, fisheries) and who owns product/reliability. Brothers need a written shareholder agreement with vesting and deadlock rules now, not later.

**5. Pricing and cash mismatch.**
- Anchoring on NOK 25–45k/vessel/month leads to overpriced proposals that stall. Per-module pricing leads to confusing quotes.
- Separately, sequencing the grants wrong leaves you unable to match OT2.
- *Pre-empt:*
  - One per-vessel price for the wedge, with the onboarding fee separate.
  - Collect annual prepayment (offer a 10–15% discount), which is cash that funds Gate 1.
  - Apply for OT1 by 31 October.
  - File SkatteFUNN for 2027 (offline sync and data-migration R&D qualify better than CRUD screens).
  - Raise the pre-seed *after* Gate 0, from customers and Sunnmøre owner-angels first.

---

## 6. Top 7 recommendations (in priority order)

1. **Commit to the wedge in writing, this week.** "Planned maintenance + certificates/surveys for Norwegian fishing vessels 15–40 m, owners with 1–10 vessels." Put the other 10 modules behind flags. The pitch, the site and the demo show only this.
2. **Sign 10 paying founding partners by 31 Jan 2027.**
   - Terms: NOK 1,500/vessel/month, locked 24 months, 30-day opt-out, onboarding fee NOK 15–25k, annual prepay encouraged.
   - Target: at least 25 vessels and NOK 400k ARR.
   - Build the list of 60 owner-operators from the vessel register and Arne's network, not the ASA list.
3. **Harden for trust within 6 weeks.** Own the codebase, run RLS and backups, build offline-first work orders, write the security document, and provide a PDF output for the Sdir auditor. This is the whole engineering plan until Gate 0.
4. **Make the "migration service" the sales motion.** "We move your PreMaster/Excel plan into Nautech in 10 days, or you don't pay" removes the #1 switching barrier and gives you bridge cash that *produces* subscribers.
5. **Fix credibility now:**
   - truthful website
   - a decision on the name (rename before you have brand equity)
   - no employer data
   - written employer clarity on selling to competitors
   - a shareholder agreement between the brothers.
6. **Set the quit gates as calendar commitments.** Gate 1 at NOK 600k ARR plus NOK 800k cash, or NOK 300k ARR plus a closed NOK 3M+ pre-seed. Founder #1 takes leave rather than resigning. Money sequence: OT1 now, pre-seed Feb–May 2027 after Gate 0, then OT2 and SkatteFUNN.
7. **Plan the expansion only after 70% weekly use:**
   - PMS → crew certificates → spares and procurement → drydock → (via integration, not replacement) ERS/catch.
   - Second segment: aquaculture service and wellboat vessels (a similar size class, heavy maintenance, and Sunnmøre-adjacent).
   - Offshore, ferries and ASAs come in 2028+.

## Stop-doing list

- **Stop** building or demoing new modules. No Finance, Payroll, Emissions or Intelligence work until Gate 0.
- **Stop** calling it a "maritime OS" or ERP externally. Internally it can be the vision; externally it's a red flag.
- **Stop** pursuing a listed ASA co-development partner, including your own employers.
- **Stop** using or quoting the confidential NOK 5M/10-vessel licence figure.
- **Stop** claiming users, a complete DMU list, or "200+ hours/week". Say what's true.
- **Stop** per-module pricing. Use one per-vessel price plus an onboarding fee.
- **Stop** selling generic hourly advisory. Only sell fixed-price services that install the product.
- **Stop** producing strategy documents (including memos like this one) faster than you book customer meetings. Target ratio: 1 page written per 3 conversations held.
- **Stop** Emissions/ETS/CII work for the fishing beachhead: it's out of scope below 5,000 GT.

---

### Sources
- Built In LA, ServiceTitan origins: https://www.builtinla.com/articles/silicon-hills-servicetitans-humble-origins
- SaaStr, ServiceTitan playbook: https://www.saastr.com/from-30m-to-11b-the-servicetitan-playbook-cro-masterclass-on-vertical-saas
- Santa Barbara Independent, Procore: https://www.independent.com/2019/03/27/better-building-procore/
- Samsara S-1 (multi-app adoption, NRR): https://www.sec.gov/Archives/edgar/data/1642896/000119312521334578/d261594ds1.htm
- EY, VesselMan sale to Marcura: https://ey.com/en_no/insights/strategy-transactions/deals/ey-advises-the-shareholders-of-vesselman-in-the-sale-to-marcura
- Maritime Executive, Marcura acquires VesselMan: https://maritime-executive.com/article/marcura-acquires-vesselman-expanding-digital-solutions-offering
- SNL, deep-sea fishing (5,372 vessels; 268 over 28 m, 2024): https://snl.no/havfiske
- SNL, fangstdagbok (ERS vendors): https://snl.no/fangstdagbok
- Fiskeridirektoratet, ERS/VMS: https://www.fiskeridir.no/english/fisheries/reporting-systems-and-innovation/electronic-reporting-ers-and-position-reporting-vms-in-norwegian-fisheries
- Sdir, safety management on smaller vessels (maintenance plan): https://www.sdir.no:443/globalassets/brosjyrer/sikkerhetsstyring-pa-mindre-fartoy-2022.pdf
- European Commission, shipping in the EU ETS (≥5,000 GT): https://climate.ec.europa.eu/eu-action/transport-decarbonisation/reducing-emissions-shipping-sector_en
- Satpool PreMaster (MarineLink): https://www.marinelink.com/news/norwegian-upgrades305271
