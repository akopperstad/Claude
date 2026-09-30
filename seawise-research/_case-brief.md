# Case brief: Seawise AS / Nautech (for expert panel)

**As of:** 2026-09-30. This is the single source of facts for all panel members. Where a claim below is the founders' own and unverified, it is marked (founder claim).

## Company
- **Seawise AS**, org.nr 936 864 694, incorporated 16 Dec 2025, Herøy (Gurskøy/Fosnavåg), Sunnmøre, Norway. Share capital NOK 30k. Not VAT-registered yet.
- **Founders:** brothers Arne Kopperstad (CEO, board member) and Kristian Kopperstad (COO, chair).
  - Both are marine engineers still working full-time at sea or in industry: Arne at Lerøy Havfisk (whitefish trawlers, about 10 vessels), Kristian at DeepOcean (subsea).
  - An IP consultant has been used. Both employers have been informed, and the 3-month claim window has expired (founder claim), so employer IP risk is considered closed.
- **Capacity:** "well over 200 hours/week combined" (founder claim) alongside their jobs. They are heavy users of Claude Code and have delivered 100+ AI-assisted projects fast.
- **Goal, in the founder's words:** "I don't give two shits about anything other than getting the product out there and being able to quit my job ASAP. I am willing to do anything necessary."
- **Ecosystem:** enrolled in the ÅKP (Ålesund Kunnskapspark) business advisory programme. It uses the MIT *Disciplined Entrepreneurship* 24 steps (Bill Aulet), plus FølgOpp/CEB sales training (four-stage sales process, SODUS meeting discipline, Challenger selling, and "the most enthusiastic are rarely the decision-makers"). The website mentions Innovation Norway, ÅKP and hoppid.no as support.

## Product: Nautech (nautech.no)
- A cloud "maritime operating system" / maritime ERP. It is an **MVP only**.
  - **Zero customers, zero pilots, zero daily users, zero revenue, zero partners.**
  - **Zero customer interviews** outside the founders themselves.
- **12 modules on one database:**
  - Command Center
  - Intelligence (AI analytics)
  - Fleet & Vessels (registry, BarentsWatch AIS, certificates, class surveys)
  - Voyages (port calls, noon reports, charter parties, laytime)
  - Crew (rotations, MLC work/rest, STCW certificates, payroll, recruitment)
  - Maintenance (SFI-coded planned maintenance, work orders, defects, drydock, running hours, PreMaster CSV import)
  - Safety & Quality (ISM, risk, permits, drills, near-miss AI)
  - Hazmat & Medical (IHM)
  - Fishery (quotas, hauls, catch, ERS/VMS, landing notes)
  - Emissions (CII, EU ETS, MRV/DCS)
  - Documents (e-logs, versions, signatures)
  - Finance (budgets, invoices, insurance, multi-currency)
  - Plus procurement and a supplier portal.
- **Tech:** built with Lovable (AI app builder): React/Vite/Tailwind/shadcn front end, Supabase back end (Postgres, auth, realtime, about 16 edge functions), about 150 tables. AI features go through Lovable's AI gateway. The UI uses OpenBridge-style bridge themes.
  - No evidence of offline-at-sea support, a native or desktop app, SOC 2/ISO 27001, SSO, or a published security model.
  - The front-end bundle is public and reveals the full data model.
- **Planned pricing:** a monthly subscription per module (no prices set).

## Market signals the founders have
- A large Norwegian whitefish trawler operator spends about **NOK 5M/year on licences for 10 vessels**, i.e. about NOK 500k per vessel per year (founder claim, from inside the company; confidential, so don't attribute it publicly).
- Founders believe competitor pricing is about **NOK 25–45k per month per licence per vessel** (founder claim).
- A planned maintenance system is legally required above a certain gross tonnage (founder claim; the threshold needs verification).
- Differentiation per the founders:
  - current, real end-user experience
  - small and nimble
  - modern and extensible, versus incumbents built on legacy software ("Windows 95-era").
- **Target list:** founders have a sheet of **214 Norwegian companies** in 6 sectors (`target-companies.csv`):
  - freight/bulk/short-sea/tankers: 50
  - fisheries: 39
  - offshore/subsea: 37
  - aquaculture/wellboat/service: 36
  - ferry/passenger: 29
  - towing/port/coastal/special: 23
  - The founders described it as "a complete list of all vessel owners in Norway with contact persons in the DMU". **In reality the sheet has only company names and sectors.** The contact person, role, email, fleet size and priority columns are all empty. There are 4 duplicates. It is dominated by large or listed groups (Wilhelmsen, Odfjell, Solstad, DOF, Mowi, SalMar, Hurtigruten, Color Line, Aker BioMarine…). It also includes non-vessel-operators (supply bases, ports, a county transport authority).
- **Founders' stated strategy preference:** a large, preferably listed (ASA) partner to co-develop with. They have the most experience in fishing, are open to more than one beachhead, and see the software as being "for all vessels over a certain size".

## Public footprint
- seawise.no (Lovable single-page app; renders poorly for crawlers).
  - It claims "Nautech is live… first crews are using it", which is **not true**. The founders say they will redesign the site.
  - It lists advisory services (regulatory, technical, strategy, implementation).
- A small LinkedIn page. No press coverage.
- **Name collisions:** seawise.com (a 2016 vessel big-data/MRV company, LinkedIn "Seawise"), the EU/ICES SEAwise fisheries project, SeaWise Marine (US davits), Nautech Ltd (boat IoT/NMEA), Nautech Services Ltd (Jersey).

## Existing research in /home/user/Claude/seawise-research/
- `00-mit24-workbook.md`: step-by-step status (mostly not started).
- `04-funding-ecosystem.md`: grants and investors. Innovation Norway Oppstartstilskudd 1 is up to NOK 150k; Oppstartstilskudd 2 is up to NOK 1M and needs matching funds; SkatteFUNN is 19%; hoppid and the Herøy næringsfond; Skagerak, Farvatn and the Investinor-backed pre-seed funds; a Norwegian pre-seed is typically NOK 2–5M for 10–20%.
- `07-intervjuguide.md`: Norwegian customer-discovery interview guide.
- `10-roadmap.md`: 24-step roadmap with gates.
- In progress by other agents: `01-competitors.md` (competitors plus pricing) and `02-segmentation-and-thresholds.md` (fleet segmentation plus regulatory thresholds). Read them if they exist when you start; don't duplicate them.
