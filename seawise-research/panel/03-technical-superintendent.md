# Panel memo 03: Technical superintendent / class surveyor / ISM auditor view

**Reviewer role:** former fleet technical manager (fishing, offshore, coastal), later DNV class surveyor and ISM auditor.
**Date:** 30 Sept 2026
**Brief:** Would a Norwegian technical department trust Nautech on a real vessel? What does it have to prove, and in what order?

**Bottom line up front:** Nautech is a very wide demo. A technical department does not buy width. It buys a record it can defend in front of a surveyor, an Sdir auditor, a P&I investigator or a court after an accident. Today Nautech is not that record: it has no offline mode, no release discipline, no class acceptance, no references, and its website says crews are using it when they are not. None of that is fatal if you narrow hard, start where class approval is not needed, and run every pilot in parallel with the existing system. If you try to replace AMOS, TM Master or PreMaster on a classed trawler in year one, it will be fatal.

---

## 1. Regulatory reality: where a maintenance system is mandatory

### 1.1 Statutory requirements (Sjøfartsdirektoratet)

| Vessel | Regime | Maintenance requirement |
|---|---|---|
| Fishing vessels, cargo ships and small passenger ships **under 500 GT** | FOR-2016-12-16-1770, *Forskrift om sikkerhetsstyring for mindre lasteskip, passasjerskip og fiskefartøy mv.*; systems required from 1 Jul 2017 ([Lovdata](https://lovdata.no/dokument/SF/forskrift/2016-12-16-1770)) | § 9: the company "skal utvikle, følge opp og dokumentere et **vedlikeholdssystem** som er tilpasset driftsformen til skipet". It must also identify **critical equipment** and regularly test standby systems. |
| Ships, including fishing vessels, of **500 GT and above** | FOR-2014-09-05-1191, ISM-based SMS with DOC/SMC ([Sdir](https://www.sdir.no/regelverk/forskriftsutlisting/sikkerhetsstyringssystem-for-norske-skip-og-flyttbare-innretninger/)) | ISM Code element 10 (maintenance of ship and equipment): documented maintenance, inspections at intervals, non-conformities and corrective action, critical equipment. Audited at DOC/SMC audits. |

Sdir audits the small-vessel regime against checklist **KS-1260** (rev. 23.01.2025) ([Sdir PDF](https://www.sdir.no/siteassets/skjema/ks-1260-sjekkliste-sikkerhetsstyring-for-mindre-lasteskip-passasjerskip-og-fiskefartoy.pdf)). Item 1.10.1 asks three questions:
- Is there a maintenance system adapted to the vessel and its operation?
- Does it cover the applicable requirements (fire, rescue, machinery, lifting gear)?
- Is maintenance performed as the system says?

Item 1.10.2 asks whether critical equipment has been identified systematically, vessel by vessel.

**Correction to the founders' claim.** The legal trigger is not a gross-tonnage threshold for "a PMS". Every Norwegian commercial fishing vessel in scope must have a documented maintenance system, at every size in the regulation. But the law requires a *system*, not *software*. A binder, Excel or a consultant's template passes an Sdir audit if it is adapted to the vessel and actually followed. So the regulation creates an obligation, not a software budget. Software wins only when it makes the obligation cheaper, or makes the audit easier, than paper does. See `02-segmentation-and-thresholds.md` for fleet counts; I won't duplicate them.

### 1.2 Class: where "approval" actually matters

Class rules do not require a PMS as such. They require machinery surveys, either as a five-year renewal or on a **Continuous Machinery Survey (CMS)** cycle. An **approved PMS** is a *survey arrangement* the owner opts into. It lets the chief engineer's own overhauls be credited for class at the annual audit instead of a surveyor witnessing each opening.

- IACS **UR Z20** sets the common floor ([IACS UR Z20 Rev.1](https://www.turkloydu.org/pdf-files/iacs-karar-ve-csr-degisimleri/iacs-es-gereklilikleri/UR_Z20_Rev1_TR_EN.pdf)). The requirements that matter for software:
  - The PMS "shall be programmed and maintained by a computerized system" (2.1.1).
  - Computerized systems "shall include back-up devices… updated at regular intervals" (2.1.3).
  - Only the chief engineer or other authorised persons may update the maintenance records and programme (1.3.3), and the chief engineer signs overhaul documentation (1.3.2).
  - Maintenance instructions, condition-monitoring data since the last opening, and maintenance records must be **available on board** (2.2.2).
  - There is an implementation survey within one year, then an **annual audit**.
  - Class can **cancel the arrangement** if records show intervals exceeded (2.3.5).
- **DNV** implements this through the in-operation notation **PMS(M)**. The software route is type approval under **DNV-CP-0206**, "Type approval – Machinery planned maintenance system (MPMS)". The BASSnet certificate TAPMS000002V (issued 20 Apr 2026, valid to 2031) shows what DNV asks for ([BASSnet TA PDF](https://www.bassnet.no/wp-content/uploads/2026/04/TAPMS000002V.pdf)):
  - **I140 Software quality plan**, **Z060 Functional description**, **I280 reference data mapping per the MAD interface**, and **Z280 Changelog**.
  - A software evaluation against CP-0206 Sec.2 4, plus a tested transfer of **Maintenance Activity Data (MAD)** to DNV.
  - **Biennial reassessment.** A change to the functional requirements "or an upgrade to another major version (semantic versioning) may require a new type approval".
  - The system must "at least cover all relevant class items", and for DDV(PMS) vessels the supplier must support continuous data transfer.
- DNV's **Machinery Maintenance Connect (MMC)** uses MAD feeds from integrated PMS vendors to run remote, fleet-wide machinery surveys. It needs at least one year of data first ([DNV news](https://www.dnv.com/news/survey-a-fleet-in-a-day-dnv-gl-s-new-mmc-unlocks-unprecedented-machinery-efficiencies-and-insights-171931)). Type-approved PMSs include TM Master, K-Fleet, BASSnet, Nozzle and CrewSmart.

### 1.3 Does class approval matter for selling?

It depends on the segment. This is the most important scoping decision in this memo.

- **Classed ocean-going trawlers, pelagic vessels, OSVs and subsea vessels on PMS(M) or CMS-via-PMS.** Here it is a **hard gate**. No chief engineer will move class-credited history into a system DNV has not accepted, because the vessel would lose its survey arrangement. That means all the machinery openings go back to surveyor attendance, which costs surveyor days, off-hire and yard time. You cannot sell PMS here without CP-0206 type approval, or at minimum a vessel-specific acceptance. Realistically that is 12–24 months away.
- **Vessels under 500 GT, unclassed or classed without a PMS arrangement** (most of the 11–28 m fleet and many aquaculture service boats). Here class approval is **irrelevant**. The buyer needs to pass KS-1260 and wants less paperwork. This is where a startup can sell a maintenance system without type approval.

**What CP-0206 will demand of an AI-built product, and why that is uncomfortable for you:**
- a written software quality plan
- semantic versioning with a real change log
- a stable, versioned MAD export
- role-based sign-off by the chief engineer
- an immutable history
- backups the owner controls
- a system that still works on board

A Lovable workflow where the app changes daily through prompts is the opposite of what an approval engineer wants to see. You need git-based releases, automated tests on the maintenance scheduling logic, tagged versions and a frozen changelog **before** you apply. The good news: I found an `entity_audit_logs` table and a `SignOffDialog` in the public bundle, so the idea of an audit trail is there. Whether it is tamper-evident (append-only, protected by row-level security (RLS) against UPDATE and DELETE) is exactly what an assessor will test.

### 1.4 Other regimes the founders cite, briefly

- **EU ETS / MRV:** fishing vessels are **exempt**. Offshore ships of 5000 GT and above enter the EU ETS on 1 Jan 2027. Offshore and general cargo ships of 400–5000 GT are in MRV from 2025, and their ETS inclusion is subject to review ([Safety4Sea](https://safety4sea.com/eu-mrv-and-eu-ets-how-do-they-work-together), [LR](https://www.lr.org/en/services/statutory-compliance/eu-ets-and-eu-mrv/)). This is irrelevant to your fishing beachhead, and the offshore segment already buys it from DNV, ABB, Kongsberg and others.
- **ERS/VMS:** mandatory, but the ERS logbook market is served by dedicated, approved vendors (eCatch, iFisk and others; see `01-competitors.md`). Fiskeridir has changed the rules repeatedly, most recently simplifying them for the small fleet ([regjeringen.no](https://www.regjeringen.no/no/aktuelt/enklere-rapportering-for-den-minste-flaten/id2970253/)). This is regulated message traffic to the authority, so if you get it wrong the skipper takes the fine. Integrate with it; don't build it.

---

## 2. What the technical manager and chief engineer need on day 1 to switch

These are rated against what the case brief and the public bundle show. I inspected the public bundle, observing only: about 150 tables, `components`, `vessel_template_jobs`, `running_hours_entries`, `class_surveys`, `certificates`, `parts`, `work_order_parts`, `entity_audit_logs`, and a PreMaster importer. I found no service worker, no IndexedDB/local store and no PWA manifest. The only "offline" strings are sensor status labels and a React Query default.

| Need | Why it is non-negotiable | Nautech today (my rating) |
|---|---|---|
| **Migration of the component hierarchy (SFI), job library, intervals, running-hour counters and the *full history*** | Class counts intervals from the *last done* date. If history is lost, every job is "never done", so the fleet is overdue on day one and the audit trail breaks. | **Red.** The PreMaster importer only imports *equipment* from CSV. I saw nothing for jobs, history or counters, and no AMOS/TM Master/ShipManager importers. Migration is the main thing blocking a switch, and it is a service job (2–6 weeks per vessel type), not a feature. |
| **Works offline on board, with conflict-safe sync** | Engine rooms have no reliable Wi-Fi. Satellite links fail, and during a blackout or fire you need the procedure for the emergency generator. UR Z20 expects records "available on board". Starlink has improved links, but no auditor accepts "the cloud was down" as the reason a record is missing. | **Red.** Web-only, with no offline store. This alone disqualifies the product from being the system of record at sea. |
| **Mobile use in the engine room** (gloves, dirty hands, tablet, QR on the component, photos, work order closed in 3 taps) | The chief engineer and 2nd engineer will not walk to the ECR computer after every job. | **Amber.** Responsive shadcn UI and a QR print dialog exist. It is untested with real engineers. |
| **Running hours** (manual entry, later automatic from IAS/engine) | Most trawler jobs are driven by running hours. | **Amber.** Tables exist. Is there a sanity check on counter rollover or a meter replacement? Are counter resets audited? |
| **Spare parts** (critical spares minimum stock, part-to-job linkage, requisition) | Critical spares are an ISM/§9 topic. Missing spares cause most PMS deferrals. | **Amber.** Tables exist. The data quality comes only from migration. |
| **Class and statutory status** (survey due dates, conditions of class/recommendations, certificate expiry) | This is the technical manager's weekly anxiety. Today it means copying manually from DNV Veracity/Fleet Status and from Sdir. | **Amber.** Tables exist, but I found no evidence of an integration with DNV Veracity or class APIs. |
| **Audit readiness** (immutable history, who/when/what, chief engineer sign-off, deferral with approval and reason, export to PDF for the surveyor) | This is what the surveyor and auditor actually look at. | **Amber/red.** An audit-log table and sign-off exist, but tamper-evidence, deferral workflow and a surveyor-ready report are unproven. |
| **Reliability and data ownership** (uptime, owner-held backups, full export, exit clause, EU data residency) | Required by UR Z20 2.1.3, and it is what a CFO or IT asks when the vendor is a two-person company. | **Red.** No published security model. The front end is public and reveals the full data model. Supabase RLS correctness is unverified. No SLA, no escrow. |
| **Access control / roles** (only the chief engineer changes the programme, shore approves deferrals) | UR Z20 1.3.3. | **Amber.** `PermissionGate` and approval workflows exist, but I can't see whether they are enforced server-side. |

**Summary:** the data model is broadly right. It is SFI-coded, and whoever designed it has seen a real PMS, which is a genuine asset. What is missing is everything that makes it *trustworthy*: offline, migration, immutability and release discipline. Build those before any new module.

---

## 3. The wedge: what a technical department would buy first from a two-person startup

The test a technical manager applies is simple: **"If this breaks, does anything bad happen at sea, or with class?"** A startup can only get past a "no" if the answer is "no". Ranked:

1. **Best wedge: fleet compliance control tower (shore-side, read-mostly).** One screen covering:
   - class survey windows and conditions of class
   - statutory certificates and expiry dates
   - crew STCW/health certificate expiry
   - Sdir/ISM audit findings and deviations (avvik) with close-out
   - critical-equipment test log (§9 / KS-1260 1.10.2)

   Why a startup can sell it:
   - It replaces Excel, not AMOS.
   - It needs no offline mode and no type approval.
   - A wrong entry creates a reminder problem, not an unsafe engine.
   - It can be live in a week from existing documents.
   - The founders know this pain first-hand.

   It also plants you in the technical department, next to the PMS budget. Price it low (indicatively NOK 1–3k per vessel per month; validate this) and sell it on hours saved before audits.

2. **Second step: PMS-lite for vessels under 500 GT, unclassed or without a PMS arrangement** (15–40 m fishing, aquaculture service). This is legally required under § 9 and needs no class approval. The incumbent is PreMaster sold through consultants such as Sirkel, and PreMaster 3.0 is now cloud (`01-competitors.md`), so you will fight on migration speed and engine-room usability, not on "modern". **Offline is mandatory before this step.**

3. **Later (18–30 months): full PMS for classed vessels.** Only after CP-0206 type approval, a working MAD export and at least two reference vessels with a year of clean history.

**Distractions, and why:**
- **Finance/invoices/multi-currency, payroll, recruitment:** ERP and HR are owned by Visma, Xledger and Tripletex. Payroll errors are legal claims.
- **Voyages/charter parties/laytime:** irrelevant to fishing, and a different buyer (commercial, not technical).
- **Emissions CII/ETS/MRV:** fishing is exempt. The only fishing emissions need is fuel documentation for CO₂-tax compensation, which is a small feature, not a module.
- **ERS/VMS catch reporting:** regulated, with dedicated approved vendors. Integrate with them.
- **IHM/Hazmat:** relevant to ships of 500 GT and above trading to the EU, and bought once from specialists.
- **"Intelligence"/AI near-miss analysis:** an auditor will ask how the AI reached its conclusion and who is accountable. Keep AI to drafting and search, always human-approved, and don't market it to technical buyers yet.
- **Supplier portal/procurement:** a two-sided marketplace problem. Park it.

---

## 4. Credibility and safety risks, liability and safe pilots

### 4.1 What goes wrong if the software fails

- **A missed or hidden overdue job on critical equipment:** steering gear, emergency generator, fire pump, quick-closing valves, lifeboat/davit, trawl winch brakes. In the accident investigation (Havarikommisjonen/NSIA and police), the maintenance record is exhibit A. If the software failed to show the job as due, your product is in the report.
- **Loss of the class survey arrangement:** UR Z20 2.3.5 lets class cancel it if records show exceeded intervals or are unreliable. That means surveyor attendance for all machinery, plus possible off-hire.
- **Audit findings:** a KS-1260 1.10 pålegg (order) from Sdir, or an ISM non-conformity, because the history cannot be shown on board during an outage.
- **Data loss or corruption on migration:** history lost, counters reset. This is the most common real-world failure when shipowners switch PMS.
- **Cross-tenant data leak through a misconfigured RLS policy on Supabase:** reputational death in a small industry where everyone knows everyone.
- **Vendor death:** a two-person company whose founders are still employed at sea. A buyer's first question is "what happens to my records if you stop?"

### 4.2 Liability

Under the Ship Safety and Security Act (skipssikkerhetsloven) the **company (rederiet) keeps the duty**. Software does not transfer it, but it does get pulled into claims. You need:
- terms limiting liability to the fees paid and excluding consequential loss, with an explicit "decision support; the company remains responsible under its SMS" clause
- professional/product liability and cyber insurance (indicatively NOK 30–80k/yr at your size [estimate])
- a data processing agreement (DPA) under GDPR, because crew data is personal data

Also note that your own advisory arm (seawise.no lists regulatory and technical advisory) raises your exposure if you both write the customer's SMS and supply the software.

### 4.3 Pilot design so no vessel is put at risk

- **The incumbent system stays the system of record for the whole pilot** (minimum 3 months, ideally one full CMS/annual-survey cycle). Nautech runs in parallel as the shadow system.
- **Start shore-side** (compliance tower), then **one unclassed or non-PMS-arrangement vessel**. Never start on a vessel on PMS(M)/CMS-via-PMS.
- **Reconcile every week:** export due or overdue lists from both systems and diff them. Any job that is due in the incumbent but not in Nautech is a severity-1 bug and stops the pilot.
- **Freeze releases during pilots:** tagged versions, a change log sent to the pilot chief engineer, no silent Lovable edits in production.
- **Exit and export guarantee:** one-click full export (CSV/JSON plus PDFs) and a written deletion and return clause.
- **Written success criteria** agreed with the technical manager in advance: hours saved, zero reconciliation misses, chief engineer adoption.

---

## 5. What makes a Norwegian rederi trust you, with rough cost and time

| Proof | Value to buyer | Rough cost / time [my estimates, verify] |
|---|---|---|
| **2–3 named reference vessels with a clean parallel run** and a chief engineer who will take a phone call | Highest by far. Sunnmøre buys on references. | 6–12 months, mostly your time |
| **Truthful website and a published security page** (hosting region, backups, RLS model, restore test, incident contact) | Removes the first "no" | 1–2 weeks |
| **Independent penetration test plus RLS review** before the first customer data goes in | Precondition for any IT or insurance question | NOK 60–150k, 2–4 weeks |
| **Offline-capable ship client and a documented backup/restore drill** | Precondition for PMS at sea (UR Z20) | 2–4 months engineering |
| **Channel partner:** a Sunnmøre SMS/ISM consultancy (Sirkel-type) or a yard/equipment agent that already writes vessels' SMS | Access plus borrowed credibility; this is how the small fleet buys today | Revenue share of 15–30% |
| **Integrations:** DNV Veracity / fleet status read access, ERS vendor link, maker job libraries (engine OEMs) | Makes the compliance wedge tangible | Weeks each, subject to partner access |
| **DNV CP-0206 type approval** | Unlocks classed vessels on PMS(M) | Quality plan, functional description, MAD mapping and changelog, then evaluation. Probably NOK 150–400k in fees and effort, 6–12 months after the product is stable, plus biennial reassessments. Ask DNV Ålesund for a quote. |
| **ISO/IEC 27001** | Asked for by listed groups (ASA) and offshore, rarely by fishing owners | NOK 400k–1.2M, 9–15 months including a consultant. **Not now.** Use a Statement of Applicability-style security document until then. |
| Class "approval in principle" or pilot with DNV | Nice PR, low buyer weight | Only after references |

---

## 6. Top 7 recommendations

1. **Narrow to one sellable, low-risk wedge: the shore-side fleet compliance control tower for fishing vessels 15–40 m**, with a planned path to PMS-lite for vessels under 500 GT without class PMS arrangements. Freeze everything else.
2. **Build trustworthiness before features:**
   - an offline-first ship client (PWA with local store and conflict-safe sync)
   - an append-only, tamper-evident history
   - server-enforced roles with chief engineer sign-off
   - a full export
   - a tested backup and restore
3. **Treat migration as the product.** Build importers for PreMaster (jobs, history and counters, not just equipment), then TM Master and AMOS. Add a migration-verification report the chief engineer signs: every job, last-done date and counter matched.
4. **Move from Lovable-in-production to real release discipline:** git, CI tests on scheduling and overdue logic, semantic versioning, a public changelog. This is a prerequisite for CP-0206 and for any sensible pilot.
5. **Run parallel pilots only, using the protocol in §4.3.** Two pilots with reconciliation data are worth more than twenty demos.
6. **Recruit a channel partner and one retired or active chief engineer as a paid advisor.** Use Arne's network, but never pilot at his current employer while he is employed there (conflict of interest, confidentiality). Get two external technical managers on the next-10 list.
7. **Plan CP-0206 for 2027–28, not now.** Open an informal dialogue with DNV (Ålesund/Høvik) early to understand the MAD interface and the evaluation scope, so the architecture doesn't need to be redone.

## Stop doing

- **Stop claiming the product is live with crews.** An auditor who finds one false claim assumes the records are false too. Fix it this week.
- **Stop adding modules.** Twelve modules built by two part-time founders tells a technical manager that none of them is deep enough to trust.
- **Stop pitching "maritime operating system / ERP for all vessels"** to technical buyers. Pitch one problem solved on board.
- **Stop chasing a listed (ASA) co-development partner as the first customer.** Big groups run long procurement, need ISO 27001, IT security reviews and SSO, and will take your roadmap. Start with a 3–10-vessel owner.
- **Stop marketing AI features to technical and compliance buyers** until each AI output has a human sign-off and an explanation of how it was produced.
- **Stop leaning on "legacy Windows 95" as the argument.** PreMaster 3.0 is cloud, TM Master and AMOS are type-approved, and chief engineers trust boring software that has never lost a record.
- **Stop editing production through prompts** once any customer data is in the system.

---

### Sources
- FOR-2016-12-16-1770 (Lovdata): https://lovdata.no/dokument/SF/forskrift/2016-12-16-1770
- Sdir KS-1260 checklist (rev. 23.01.2025): https://www.sdir.no/siteassets/skjema/ks-1260-sjekkliste-sikkerhetsstyring-for-mindre-lasteskip-passasjerskip-og-fiskefartoy.pdf
- Sdir, FOR-2014-09-05-1191: https://www.sdir.no/regelverk/forskriftsutlisting/sikkerhetsstyringssystem-for-norske-skip-og-flyttbare-innretninger/
- IACS UR Z20 Rev.1: https://www.turkloydu.org/pdf-files/iacs-karar-ve-csr-degisimleri/iacs-es-gereklilikleri/UR_Z20_Rev1_TR_EN.pdf
- DNV type approval certificate TAPMS000002V (BASSnet, CP-0206): https://www.bassnet.no/wp-content/uploads/2026/04/TAPMS000002V.pdf
- DNV MMC: https://www.dnv.com/news/survey-a-fleet-in-a-day-dnv-gl-s-new-mmc-unlocks-unprecedented-machinery-efficiencies-and-insights-171931
- CrewSmart DNV PMS type approval: https://offshore-energy.biz/?p=504622
- EU MRV/ETS scope: https://safety4sea.com/eu-mrv-and-eu-ets-how-do-they-work-together ; https://www.lr.org/en/services/statutory-compliance/eu-ets-and-eu-mrv/
- Simplified ERS for the small fleet: https://www.regjeringen.no/no/aktuelt/enklere-rapportering-for-den-minste-flaten/id2970253/
- Nautech public JS bundle (nautech.no), observed only, 30 Sept 2026.
- Sibling memos: `01-competitors.md`, `02-segmentation-and-thresholds.md`.
