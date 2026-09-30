# 03 – All vessel segments scored (MIT Disciplined Entrepreneurship, Step 1)

*Seawise AS. Research date 30 Sept 2026. Milestones: **M1** (interview allocation) and **M2** (Gate 1 beachhead decision). Builds on `02-segmentation-and-thresholds.md` (fishing and aquaculture counts, regulatory thresholds) and `01-competitors.md` (vendors, prices). It does not repeat them.*

**Why this file exists.** The founders asked that *every* vessel type be considered, not a handful of examples. This file scores 56 segments on Aulet's seven Step-1 criteria, ranks them, and allocates 24 discovery interviews. **It does not pick a beachhead.** Gate 1 (M2) makes that call from interview evidence.

**Tags.** **[V]** = verified in the cited source. **[R]** = secondary or reported source. **[E]** = my estimate or inference. **[?]** = not found. All scores are **[E]**: desk hypotheses for the interviews to confirm or overturn.

---

## 0. Key findings

1. **The top of the ranking is the same whichever way you cut it:** ocean-going fishing (pelagic, whitefish, autoline), coastal fishing 15–28 m, and aquaculture vessels (wellboats and service vessels of 15 m or more). Outside fishing and aquaculture, only small third-party ship managers (S14) reach 25/35; short-sea cargo (C1) and Redningsselskapet (S7) score 24. *(QA: the same ten segments form the top 10 with C7 founder fit removed or set to 3 for all, and with the C4 gate ignored; only the order changes.)*
2. **A new competitor that `01-competitors.md` missed: UniSea AS (Skudeneshavn).**
   - It got **DNV class approval for its Maintenance module in April 2025** [V] ([UniSea](https://www.unisea.no/post/unisea-maintenance-dnv-class-approval)).
   - It won **Fjord1** in April 2025 for Maintenance, Procurement and Maindeck on **Fjord1's next-generation "Autonomous Crossing" vessels (Lavik–Oppedal)**, not yet the whole 85+ fleet [V] ([UniSea](https://unisea.no/post/fjord1-picks-unisea-maintenance)). Fleet-wide roll-out is [?].
   - Other named customers: Buksér og Berging, Eidesvik, North Sea Shipping, Napier, Omega Subsea and **Njord Aquashipping** (aquaculture transport) [R] ([UniSea/Napier](https://unisea.no/post/napier-unisea-maintenance), [UniSea/Njord](https://www.unisea.no/post/njord-aquashipping)).
   - It owns Maindeck (dry-dock projects), chosen by **Hurtigruten**, Massterly and Arriva Shipping [V] ([Maindeck](https://maindeck.io/blog/hurtigruten-chooses-maindeck-for-their-ship-maintenance)). It bought Kaiko Systems (AI inspections; month not verified in QA) [R] ([Hellenic Shipping News](https://www.hellenicshippingnews.com/unisea-acquires-ai-powered-frontline-intelligence-company-kaiko-systems/)). UniSea is majority-owned by PE firm Adelis Equity (since 2022) and serves 3,000+ vessels (HSEQ, maintenance, procurement, drydock) [R] (same source).
   - **Implications:** (a) "modern Norwegian cloud PMS" is already taken in ferries, tugs and parts of offshore and aquaculture; (b) a Norwegian vendor with a PMS module launched in early 2025 *can* get DNV class approval, though UniSea is PE-backed with 3,000+ vessels, not a two-founder start-up (useful evidence for M10); (c) Seawise's real white space is **fishing plus small aquaculture and cargo vessels**.
3. **Most Norwegian-controlled *tonnage* sits in the foreign-going deep-sea and offshore fleet, and it scores badly for Seawise.** (By vessel count, the domestic fleet is far larger: 4,994 fishing vessels and 3,213 SSB "work ships", see `02`.) The Norwegian-controlled foreign-going fleet is **1,581 ships** (1 Jan 2026) [V] ([Rederiforbundet Q1 2026](https://www.rederi.no/globalassets/dokumenter/alle/rapporter/quarterly-report-no-1-2026.pdf)): 455 OSVs, 554 other dry cargo, 215 chemical tankers, 137 gas carriers, 92 bulk carriers, 56 shuttle tankers, 23 other oil tankers, 16 combination carriers, 33 passenger ships, plus 28 mobile offshore units.
   - These fleets are run by **large or listed groups on class-approved PMS**, with ship-management, vetting (SIRE/TMSA) and cyber requirements.
   - Selling to them needs DNV-CP-0206 type approval (see `02`, §2.2), security certification and references. None of these exist today.
   - They are **Stage 3–4 markets, not interview targets now.**
4. **Regulation creates a forced budget in only a few non-fishing segments:**
   - **EU MRV since 2025** for general cargo and offshore ships of 400–4,999 GT.
   - **FOR-2016-12-16-1770 § 9** (documented maintenance system) for every vessel under 500 GT that is cargo, fishing, small passenger or a private vessel over 24 m (source: `02`, §2.1).
   - The best "forced but not class-gated" pools are therefore **small cargo, aquaculture, fjord tourism boats, tugs and rescue boats**, alongside fishing.
5. **One single-buyer, many-vessel oddity worth one interview:** **Redningsselskapet** has **58 rescue boats plus 4 ambulance boats** under one organisation [V] ([RS 2025](https://rs.no/content/uploads/2026/07/RS-Likestillingsredegjorelse-2025.pdf)). The vessels are small, under 1770, and a single reference would be visible along the whole coast.

---

## 1. Method

### 1.1 Criteria (Aulet, Step 1), 1 = poor, 5 = excellent, for Seawise specifically
| # | Criterion | 5 means | 1 means |
|---|---|---|---|
| C1 | Well-funded | High margins per vessel; software is under 0.5 % of revenue | Loss-making, grant-funded or a hobby |
| C2 | Reachable (2 founders, Sunnmøre) | Decision-makers within a day's drive; shared networks | Foreign HQ, procurement-led, no network |
| C3 | Compelling reason to buy | Regulation plus daily pain plus no system today | Happy with an embedded system; no trigger |
| C4 | Whole product deliverable now | No class PMS or type approval needed; modules exist | Needs DNV-CP-0206, SOC 2/ISO 27001, vetting integrations |
| C5 | Competition weak | Paper or Excel, or legacy tools nobody likes | Type-approved incumbents with 10+ years of data lock-in |
| C6 | Leverage to next segments | A reference carries to many adjacent segments | Dead end |
| C7 | Founder fit | Marine engineers with fishing (Arne) and subsea (Kristian) backgrounds, rooted in Herøy | No domain credibility |

**Unweighted total out of 35.** Because Seawise can deliver nothing that needs type approval today, C4 is effectively a gate. Any segment with C4 = 1 is ranked below everything with C4 ≥ 2, whatever its total.

### 1.2 Count definitions (they differ, so don't add across rows)
- **Fishing:** Fiskeridirektoratet register at 31 Dec 2025 and the 2024 profitability survey (via `02`).
- **Domestic merchant and work vessels:** SSB 08203, Norwegian-owned NOR+NIS 2025 (via `02`).
- **Deep-sea and offshore:** Norwegian Shipowners' Association (Rederiforbundet), Norwegian-controlled foreign-going fleet, 1 Jan 2026. This includes foreign flags.
- **Owners:** "legal owners" overstates buying decisions, because groups hold each vessel in its own AS. The owner counts below are **purchasing organisations [E]** unless marked otherwise.

### 1.3 Price bands used (per vessel per year, NOK; simplified from `01`, §2c, not a direct copy: `01` puts the full suite at 60–120k / 150–300k / 300–600k)
- **L** = light SMB PMS/compliance, 15–60k
- **M** = mid-fleet PMS + QHSE, 60–150k
- **H** = enterprise stack (PMS + QHSE + crew + procurement), 150–300k+
- Founder-reported ~NOK 500k/vessel/yr at a large trawler operator = the full stack (confidential; see `PLAN.md`).

---

## 2. The big table: 56 segments

Column key:
- **Vessels / buyers:** vessels owned or controlled from Norway / purchasing organisations.
- **Class-PMS gate?:** Does a typical buyer need a DNV-CP-0206 type-approved PMS (PMS.A/MPMS credit) or equivalent before switching? **Y** = usually, **P** = partly (larger or classed units), **N** = rarely.
- **ISM?:** **Y** = full ISM (DOC/SMC); **1770** = SMS + documented maintenance under FOR-2016-12-16-1770, no certificate.
- **Spend:** band L/M/H from §1.3.
- **Buyer:** **F** = family/SME, **M** = mid-size group, **L** = large/listed/PE/foreign, **P** = public/NGO.

### 2.1 Fishing

| # | Segment | Vessels / buyers | Size | Class-PMS gate? / ISM? | Incumbents (typical) | Spend | Buyer | Reach from Sunnmøre | Compelling reason | C1 | C2 | C3 | C4 | C5 | C6 | C7 | **Tot** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F1 | Pelagic purse seiners (ringnot) | 65 in profitability pop. [V] (FD-LU) / ~55 [E] | 60–90 m, 1,500–3,500 GT | P / Y (most ≥500 GT) | PreMaster, TM Master, SFI Excel; Mintra/own crew tools [R/E] | M–H | F (family AS; Herøy, Austevoll, Bergen, Ålesund) | Very high: dense on Sunnmøre and in Vestland | NOK 121m revenue, 39m profit/vessel [V]; ISM docs; system sprawl; Cape Town PSC from Feb 2027 | 5 | 5 | 3 | 3 | 3 | 5 | 4 | **28** |
| F2 | Pelagic trawlers | 15 [V] (FD-LU) / ~12 [E] | 55–70 m, 1,000–2,500 GT | P / Y | As F1 | M–H | F | High (Vestland, Møre) | NOK 63m revenue, 15m profit [V] | 4 | 4 | 3 | 3 | 3 | 4 | 4 | **25** |
| F3 | Whitefish fresh and factory trawlers (torsketrål) | 37 [V] / ~20 [E]; **~10 are Lerøy Havfisk = conflict** | 50–80 m, 1,500–4,000 GT | **Y (factory: often PMS.A)** / Y | TM Master, PreMaster, IFS/SAP ERP, Dualog eCatch [R] | H (~500k stack, founder claim) | M/L (Lerøy, Nergård, Havfisk groups, Ervik, Prestfjord) | Medium: Møre plus North Norway; conflict removes the biggest group | Richest fishery (NOK 188m revenue, 36m profit [V]); pain of 4–6 systems (founder insight); **Track B "compliance tower" target** | 5 | 3 | 4 | 2 | 3 | 5 | 5 | **27** |
| F4 | Autoliners (konvensjonelle havfiske) | 22 [V] / ~18 [E] | 40–60 m, 700–1,500 GT | P / Y (≥500 GT) or 1770 | PreMaster, Excel, TM Master [E] | M | F (Ålesund, Giske, Herøy are the autoline heartland) | Very high | Only NOK 1.2m profit/vessel [V] means cost pressure, which could cut both ways (switch to save vs no budget) | 2 | 5 | 3 | 4 | 3 | 4 | 5 | **26** |
| F5 | Danish seiners (snurrevad) | ~100–150 active [E?] / ~100 [E] | 15–35 m, mostly <500 GT | N / 1770 | Paper, Excel, PreMaster via Sirkel-type consultants [V] (Sirkel) | L | F (owner-skipper) | Low: mostly Nordland, Troms, Finnmark | 1770 § 9 audits; thin margins | 2 | 2 | 3 | 4 | 4 | 3 | 3 | **21** |
| F6 | Coastal 15–28 m (conventional, kystnot, incl. SUK seiners) | 175 register [V] + SUK 44 [V] / ~160 [E] | 15–40 m, 100–499 GT | N / 1770 (+Sdir survey) | Paper, Excel, PreMaster (often via Sirkel), EG Landax [V/E] | L | F | Medium: Nordland holds 70 of 175; only 28 in Møre+Vestland [V] | **1770 § 9 plus KS-1260 audit**; median build year 1988 (maintenance-heavy) [V]; **Track A core** | 3 | 3 | 4 | 5 | 3 | 4 | 4 | **26** |
| F7 | Coastal 11–15 m *(added)* | 646 [V] / 565 legal owners [V] | 11–15 m, <100 GT | N / 1770 (light) | Paper; SMS consultants | L (NOK 1.5–4k/month) | F (ENK/AS) | Low | Light enforcement; 9m revenue/vessel [V] | 1 | 2 | 2 | 5 | 4 | 2 | 3 | **19** |
| F8 | Shrimp trawlers (coastal + ocean) | 64 coastal [V] (FD-LU) + ~10 ocean-going [E?] / ~60 | 15–25 m (coastal), 50–65 m (ocean) | N (coastal) / 1770; ocean: Y | Paper, PreMaster [E] | L | F | Low (Troms, Finnmark, Skagerrak) | Fuel-subsidy change in 2026 budget [V] (see `01`) squeezes margins | 2 | 2 | 3 | 5 | 4 | 2 | 3 | **21** |
| F9 | Crab / snow crab | 14 in pop. [V]; 22 permits in 2025 [R] ([Fishing Daily](https://thefishingdaily.com/latest-news/norwegian-fishermen-slam-2025-snow-crab-quota-plan/)) / ~15 | 45–70 m, often converted vessels | P / Y | Mixed, often inherited from former owners [E] | M | F/M | Medium (some Møre owners) | Loss-making in 2024 (−3.7m/vessel [V]); rebuilt vessels mean messy maintenance history | 2 | 3 | 3 | 3 | 3 | 3 | 4 | **21** |
| F10 | Krill | ~5 (Aker QRILL 3 + 4th due Q3 2026; Rimfrost/Olympic) [R] ([Fiskerforum](https://fiskerforum.com/aker-to-add-fourth-krill-catcher/)) / 2 | 100–135 m, 8,000–13,000 GT | Y / Y | TM Master (Aker BioMarine is a Tero customer [V], see `01`) | H | L (AIP/Aker 60/40; Olympic, Fosnavåg) | Medium (Olympic is local; Aker is Oslo) | Antarctic operations need offline robustness; but only 2 buyers | 4 | 4 | 2 | 1 | 1 | 2 | 3 | **17** |

### 2.2 Aquaculture

| # | Segment | Vessels / buyers | Size | Class-PMS gate? / ISM? | Incumbents | Spend | Buyer | Reach | Compelling reason | C1 | C2 | C3 | C4 | C5 | C6 | C7 | **Tot** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 | Wellboats | 92 (AIS, 2021) [V] – 140 (SSB NOR+NIS, incl. <100 GT) [V] / ~15–20; iLaks tracks 14 key operators [V] ([iLaks](https://ilaks.no/kruttsterke-marginer-for-landets-bronnbatrederier/)) | 70–90 m, 1,000–5,000 GT; 16 on order [V] | P / Y (89 of 140 are 500–4,999 GT [V]) | SERTICA (DESS [R]), UniSea (Njord Aquashipping [R]), TM Master [E], Mintra OCS HR crew at "all major wellboat operators" [V] | M–H | M/L (Sølvtrans, Trident, Frøy are majority foreign-owned [V]; Rostein and many Møre family owners) | High (Møre, Trøndelag, Vestland) | **Operating margins of 35–43 % in 2025 [V]**; uptime (fish welfare); newbuild wave means greenfield system choices; many new crews | 5 | 5 | 4 | 3 | 3 | 4 | 3 | **27** |
| A2 | Live-fish carriers outside the wellboat count (capture-based cod/king crab, smolt) *(overlaps A1)* | ~5–15 [E?] / ~5–10 | 30–60 m | N–P / 1770 or Y | Paper, PreMaster [E] | L–M | F | Medium | Niche; follows the wellboat standard | 3 | 3 | 3 | 4 | 3 | 2 | 3 | **21** |
| A3 | Feed carriers | 16 (Sdir 2023) [V] / 2–3; **Eidsvaag 15–16 vessels dominates** [V] ([iLaks](https://ilaks.no/forbatmarkedet-vokser-ett-rederi-skiller-seg-ut/)) | 50–80 m, 1,000–3,000 GT | P / Y | TM Master (Eidsvaag since 2005 [V], [Digital Ship](https://thedigitalship.com/news/eidsvaag-as-upgrades-to-tm-master-v2/)) | M | F (Eidsvaag is family-owned, Frøya) | High | Tight rates vs wellboats [V]; a new NOK ~1bn newbuild pair [V] | 3 | 4 | 3 | 4 | 3 | 3 | 3 | **23** |
| A4 | Service vessels/workboats ≥ 15 m (catamarans, delousing, net-cleaning, towing, crane) | 54 workboats ≥15 m (Sdir) [V]; ~300 vessels across ~50 service companies [V] (iLaks via `02`) / ~50 | 15–40 m, mostly <500 GT | N / 1770 (+Sdir certificate) | Excel, PreMaster, UniSea, Vesselplus, Havbruksloggen [R] | L–M | F/M (top 7 = 67 % of revenue [V]) | Very high (Møre has many: Moen Marin, Frøy, Aqua Service, local family firms) | 1770 § 9; fish-farm clients audit vessels; accident-driven Sdir focus; fleet growth (56 service vessels on order [V]) | 3 | 5 | 4 | 4 | 3 | 4 | 4 | **27** |
| A5 | Workboats 8–15 m *(added)* | 906 [V] (Sdir) / ~200+ incl. fish farmers' own [E] | 8–15 m | N / 1770 light + fartøyinstruks | Paper, fish-farm internal-control (IK) systems | L | F and fish farmers | High | Weak (light enforcement) | 1 | 4 | 2 | 5 | 3 | 3 | 2 | **20** |
| A6 | Harvest/slaughter and processing vessels | 22 [V] (Sdir 2023) / ~8–10 [E] | 50–95 m | P / Y | TM Master / SERTICA / in-house [E] | M | M/L (fish farmers and service companies) | High | Food-safety plus vessel documentation; few buyers | 3 | 4 | 3 | 3 | 3 | 3 | 3 | **22** |
| A7 | Offshore fish-farm units (Havfarm, Ocean Farm etc.) *(added)* | ~5–8 units [E?] / 3–4 (Nordlaks, SalMar, others) | Ship-like or semi | Y (class) / varies | Owner ERP (SAP/IFS), class PMS [E] | M | L | Medium | New asset class, greenfield systems, but very few | 4 | 3 | 2 | 2 | 3 | 1 | 1 | **16** |

### 2.3 Offshore

| # | Segment | Vessels / buyers | Size | Class-PMS gate? / ISM? | Incumbents | Spend | Buyer | Reach | Compelling reason | C1 | C2 | C3 | C4 | C5 | C6 | C7 | **Tot** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| O1 | PSV | ~200 of 455 Norwegian-controlled OSVs [E]; 160 PSV+AHTS on NOR/NIS [V] (SSB) / ~20 | 70–95 m, 3,000–6,000 GT | **Y** / Y | TM Master (Eidesvik, Østensjø, Møkster, Olympic, Island Offshore [V]), Star IPS (Solstad, 50 vessels [R]), UniSea (Eidesvik [R]), AMOS, ShipManager | H | L/M (Solstad, DOF, Havila Shipping, Olympic, Rem, Island Offshore, Eidesvik, Møkster, Østensjø) | **Very high: Herøy/Ulstein is the OSV capital** | EU MRV from 2025 (400–4,999 GT) [V]; Equinor/charterer KPIs. But systems are embedded | 4 | 5 | 3 | 1 | 1 | 3 | 3 | **20** |
| O2 | AHTS | ~50–60 [E] / ~10 | 70–95 m, 3,000–7,000 GT | Y / Y | As O1 | H | L/M | Very high | As O1; strong 2025 rates [V] (see `02`) | 4 | 5 | 2 | 1 | 1 | 3 | 3 | **19** |
| O3 | Subsea construction / IMR / CSV | ~80–100 [E] / ~10 (DOF, Solstad, Eidesvik, Olympic, Island Offshore, Østensjø, Reach/Omega charter) | 100–160 m, 8,000–20,000 GT | Y / Y | As O1; UniSea (Omega Subsea [R]) | H | L | Very high; **Kristian's DeepOcean job = conflict with that charterer** | Strong market; charterer QHSE demands; incumbents deep | 5 | 5 | 2 | 1 | 1 | 3 | 4 | **21** |
| O4 | SOV / W2W / CSOV (offshore wind) | ~25–35 Norwegian-controlled [E]; Edda Wind's fleet sold to North Star/Norwind [R] ([Riviera](https://www.rivieramm.com/news-content-hub/wilhelmsen-fredriksen-ofer-owned-edda-wind-completes-sale-of-sov-fleet-88631)) / ~6 | 80–90 m, 5,000–8,000 GT | Y / Y | SERTICA (North Star, 47 vessels [V], [ship-technology](https://www.ship-technology.com/news/logimatic-fleet-management-system/)), TM Master | H | L | High (Brattvåg, Ulstein, Egersund) | Newbuilds mean **greenfield system choice**; 52 of the vessels Norwegian owners plan to order are for offshore wind [V] (Konjunkturrapport 2025) | 4 | 4 | 3 | 1 | 2 | 3 | 3 | **20** |
| O5 | Seismic | ~9 active Shearwater vessels [V] ([Riviera](https://www.rivieramm.com/news-content-hub/news-content-hub/shearwater-reports-record-high-fleet-utilisation-despite-short-term-seismic-market-caution-85044)) + TGS (ex-PGS) [R] / 2 | 80–110 m | Y / Y | Enterprise PMS (AMOS/ShipManager) [E] | H | L | Low (Bergen/Oslo) | Cyclical, stacking vessels; no trigger | 2 | 2 | 2 | 1 | 1 | 1 | 2 | **11** |
| O6 | Standby / ERRV | ~40–50 on the Norwegian shelf [E] / ~6 (Esvagt (DK), Møkster/Stril, Havila, Rem, North Star in UK) | 50–90 m | P / Y | SERTICA (North Star) [V], TM Master [E] | M–H | L/M | High | New area-preparedness contracts (Barents Sea from 2025) [V] ([Equinor](https://www.equinor.com/news/20240827-strengthening-emergency-preparedness-barents-sea)) | 3 | 4 | 3 | 2 | 2 | 2 | 3 | **19** |
| O7 | Accommodation units / flotels | 1 Norwegian-controlled unit [V] (NR-Q1) + Prosafe fleet (Norwegian-listed) [R] / 1–2 | Semi-submersibles | Y / Y (MOU) | Maximo, SAP PM, AMOS [E] | H | L | Low | None | 2 | 2 | 2 | 1 | 1 | 1 | 2 | **11** |
| O8 | Mobile drilling units | 22 (16 semis + 5 jack-ups + 1 other) [V] (NR-Q1) / ~5 (Odfjell Drilling, Northern Ocean, Borr etc.) | Rigs | Y / Y | SAP PM, IFS, Maximo, AMOS [E] | H (per rig) | L | Low–medium (Bergen, Stavanger) | Enterprise ERP lock-in | 4 | 2 | 2 | 1 | 1 | 1 | 2 | **13** |
| O9 | FPSO / FSO | 6 floating production units [V] (NR-Q1) / 2–3 (BW Offshore, Altera etc.) | 100,000+ GT | Y / Y | SAP PM / Maximo [E] | H | L | Low | None | 4 | 1 | 2 | 1 | 1 | 1 | 2 | **12** |
| O10 | Shuttle tankers | 56 Norwegian-controlled [V] (NR-Q1) / 2–3 (Knutsen NYK, Altera) | 100,000–150,000 dwt | Y / Y + SIRE/TMSA vetting | AMOS / ShipManager / in-house [E] | H | L | Medium (Haugesund) | Vetting; decarbonisation (ETS applies) | 5 | 3 | 2 | 1 | 1 | 2 | 2 | **16** |

### 2.4 Passenger

| # | Segment | Vessels / buyers | Size | Class-PMS gate? / ISM? | Incumbents | Spend | Buyer | Reach | Compelling reason | C1 | C2 | C3 | C4 | C5 | C6 | C7 | **Tot** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | Car ferries | 241 [V] (SSB) / ~12 (Fjord1 85+ [V], Norled ~80 incl. fast ferries [R], Boreal, Torghatten, Bastø Fosen, small municipal companies) | 30–130 m, 100–5,000 GT | P / Y (>100 pax) | **UniSea (Fjord1 newbuilds on Lavik–Oppedal, Apr 2025 [V])**, Star IPS (Helgelandske 13–14 vessels [R], [MarineLink](https://www.marinelink.com/news/norwegian-upgrades305271)), TM Master, Mintra OCS (Norled [V]) | M | L/M (Fjord1 is owned by Havilafjord, Fosnavåg) | High (Fjord1 in Florø; Havila in Fosnavåg) | Public-tender KPIs; battery/electric maintenance; but the biggest buyer has just chosen UniSea for its next-generation vessels | 3 | 4 | 3 | 2 | 2 | 3 | 3 | **20** |
| P2 | Fast ferries (hurtigbåt) | ~150 of 701 passenger boats [E] (SSB) / ~15 | 25–45 m, <500 GT | N / Y (>100 pax) or 1770 | Operator's own PMS (Norled, Boreal, Fjord1), Excel for small ones [E] | L–M | L/M + small local companies | Medium | County tenders; new electric vessels | 2 | 3 | 3 | 4 | 3 | 3 | 2 | **20** |
| P3 | Coastal cruise (Hurtigruten, Havila Kystruten) | 7 + 4 ships [R] / 2 | 15,000 GT | Y / Y + MLC | Kongsberg service agreement including planned maintenance (Havila) [V] ([ship-technology](https://www.ship-technology.com/news/havila-kystruten-kongsberg-cruise-vessels/)); Maindeck (Hurtigruten) [V] | H | L | High (Havila is in Fosnavåg) | Few buyers, embedded | 3 | 4 | 2 | 1 | 2 | 2 | 2 | **16** |
| P4 | Expedition cruise | ~10 (HX, REV Ocean etc.) [E] / 2–3 | 5,000–20,000 GT | Y / Y | Cruise ERP plus class PMS [E] | H | L | Low (Oslo) | None specific | 3 | 2 | 2 | 1 | 1 | 2 | 2 | **13** |
| P5 | Fjord tourism and sightseeing *(incl. small ≤100-pax passenger boats)* | ~50–100 vessels [E] (The Fjords, Brim Explorer 5 [V], Geiranger/Ålesund operators, RIB firms) / ~30–50 | 15–45 m, <500 GT | N / 1770 or Y | Paper, Excel, EG Landax [E] | L | F/M | High (Geiranger, Hjørundfjord, Ålesund) | 1770 § 9; new electric fleets; seasonal crews need simple onboarding | 2 | 4 | 3 | 5 | 4 | 2 | 2 | **22** |
| P6 | International ro-pax | ~9–10 (Color Line, Fjord Line) [E]; 33 passenger ships in the foreign-going fleet [V] / 2 | 30,000–75,000 GT | Y / Y | Enterprise PMS [E] | H | L | Low | None | 3 | 2 | 2 | 1 | 1 | 1 | 2 | **12** |

### 2.5 Cargo

| # | Segment | Vessels / buyers | Size | Class-PMS gate? / ISM? | Incumbents | Spend | Buyer | Reach | Compelling reason | C1 | C2 | C3 | C4 | C5 | C6 | C7 | **Tot** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C1 | Short-sea general and dry cargo (coastal, incl. small bulk, cement, fish-feed raw material) | 270 NOR+NIS [V] (SSB); Kystrederiene 100 companies / 284 vessels [R] ([UiB](https://www.uib.no/sampol/101212/kystrederiene)); Rederiforbundet short-sea members ~240 [V] / ~60–100 | 40–120 m, 300–5,000 GT (118 are <500 GT [V]) | P (N below 500 GT) / 1770 or Y | TM Master, Star IPS, UniSea (North Sea Shipping [R]), BASSnet, Excel for small owners | L–M | F (Møre/Vestland family owners) plus a few M/L (Wilson, Egil Ulvan) | High (many in Ålesund, Bergen, Haugesund) | **EU MRV 2025 for 400–4,999 GT** [V]; ETS review 2028; 1770 below 500 GT; aging fleet | 3 | 4 | 4 | 3 | 3 | 4 | 3 | **24** |
| C2 | Container feeders | ~10–20 [E] / ~3 (Sea-Cargo etc.) | 5,000–15,000 GT | P / Y | Enterprise or managed PMS [E] | M | M | Medium (Bergen) | MRV/ETS | 3 | 3 | 2 | 2 | 2 | 2 | 1 | **15** |
| C3 | Reefers (incl. coastal fish reefers) | ~10–20 [E]; 57 reefer/ro-ro/container NOR+NIS [V] / ~5 | 2,000–10,000 GT | P / Y | Mixed [?] | M | M | Medium | Fish logistics link to fishing customers | 2 | 3 | 2 | 2 | 3 | 3 | 1 | **16** |
| C4 | Chemical/product tankers | 215 Norwegian-controlled [V] / ~12 (Odfjell, Utkilen, Stenersen, Team Tankers, Seatrans…) | 3,000–50,000 GT | Y / Y + SIRE/TMSA | **BASSnet (Stenersen, 18 vessels, Nov 2024 [V])**, ShipManager, AMOS, TM Master | H | L/M | Medium (Bergen) | Vetting-driven; recent competitive selections show buyers do switch | 4 | 3 | 2 | 1 | 1 | 2 | 2 | **15** |
| C5 | Crude tankers incl. VLCC | 23 other oil tankers + 16 combination carriers [V]; Frontline alone has 41 VLCCs [V] (Cyprus/Bermuda, outside Rederiforbundet's count) / ~4 | 60,000–300,000 dwt | Y / Y + SIRE | In-house or third-party managers, AMOS/ShipManager [E] | H | L | Low | None | 5 | 1 | 1 | 1 | 1 | 1 | 1 | **11** |
| C6 | Gas carriers (LPG/LNG) | 137 Norwegian-controlled [V] / ~8 (Knutsen, Höegh, BW, Solvang…) | 20,000–120,000 GT | Y / Y | Enterprise PMS [E] | H | L | Low–medium (Haugesund, Stavanger) | None | 5 | 2 | 1 | 1 | 1 | 1 | 2 | **13** |
| C7 | Car carriers (PCTC) | Wallenius Wilhelmsen 127 managed [V], Höegh Autoliners ~40 [V] / 2 | 60,000–75,000 GT | Y / Y | Enterprise PMS / Wilhelmsen Ship Management [E] | H | L | Low (Oslo) | None | 5 | 2 | 1 | 1 | 1 | 1 | 1 | **12** |
| C8 | Open-hatch / project / heavy-lift | G2 Ocean ~125 open-hatch and bulk [R] ([G2 Ocean](https://www.g2ocean.com/our-fleet)) / ~3 | 23,500–73,000 dwt | Y / Y | Enterprise PMS [E] | H | L | Medium (Bergen) | None | 4 | 2 | 1 | 1 | 1 | 1 | 2 | **12** |
| C9 | Deep-sea dry bulk | 92 Norwegian-controlled [V] / ~6 (Belships, Klaveness, Golden Ocean now in CMB.Tech [R]) | 30,000–200,000 dwt | Y / Y | Third-party managers [E] | H | L | Low | None | 4 | 2 | 1 | 1 | 1 | 1 | 2 | **12** |

### 2.6 Service, special and public

| # | Segment | Vessels / buyers | Size | Class-PMS gate? / ISM? | Incumbents | Spend | Buyer | Reach | Compelling reason | C1 | C2 | C3 | C4 | C5 | C6 | C7 | **Tot** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 | Harbour and ocean tugs | 147 NOR+NIS [V] (SSB) / ~25; **Buksér og Berging ~35 tugs + 25 pilot boats (Svitzer 66.6 %)** [R] ([Riviera](https://www.rivieramm.com/news-content-hub/svitzer-acquires-controlling-stake-in-bukser-og-berging-86764)); Østensjø 15 tugs [R] | 20–40 m, mostly <500 GT | N / 1770 | UniSea (BB [R]), TM Master (Østensjø [V]), Excel for small ones | L–M | L (BB/Svitzer) + F (local port tug firms) | Medium | 1770 audits; port/terminal contracts | 3 | 3 | 3 | 4 | 2 | 3 | 3 | **21** |
| S2 | Salvage | ~5–10 [E] (SSB "berging/redning" = 47 incl. RS) / ~3 | Tugs, multipurpose | P / Y or 1770 | As S1 | M | L/P (Kystverket emergency towing contracts) | Medium | Few buyers | 3 | 3 | 2 | 3 | 2 | 1 | 1 | **15** |
| S3 | Research vessels | 25 [V] (SSB); Havforskningsinstituttet runs 8 [R] ([SNL](https://snl.no/havforskningsfart%C3%B8yer)); UiB, UiT, NTNU, NPI / ~6 | 30–100 m; Kronprins Haakon 10,900 GT | P / Y (≥500 GT) | Public procurement; class PMS on larger ships [E] | M | P | Medium (Bergen, Tromsø) | Public tender cycle (Doffin); weak urgency | 3 | 3 | 2 | 3 | 3 | 2 | 3 | **19** |
| S4 | Survey / hydrographic | ~10–20 [E] (Argeo, Reach Subsea charters, Kartverket contractors) / ~5 | 20–90 m | P / 1770 or Y | Owner's or charterer's systems | M | M/L | Medium (Haugesund) | None specific | 2 | 3 | 2 | 2 | 2 | 2 | 2 | **15** |
| S5 | Kystverket (oil-spill and multipurpose vessels) | ~6 own vessels + oil-spill equipment on 11 Coast Guard ships [R] ([Kystverket](https://www.kystverket.no/globalassets/oljevern-og-miljoberedskap/faktaark/beredskapsressurser-faktaark.pdf/download)) / 1 | 30–75 m | P / Y | Public procurement [?] | M | P (**HQ in Ålesund**) | High | Public tender; a strong credibility reference | 4 | 4 | 2 | 3 | 3 | 3 | 3 | **22** |
| S6 | Kystvakten (Coast Guard) | 17 (12 outer, 5 inner) [R] ([SNL](https://snl.no/Kystvakten)) / 1 (Forsvaret; some hulls chartered from private owners [E?]) | 45–105 m | Y / military | Defence logistics systems (FLO), SAP [E] | H | P | Medium | Security clearance; defence procurement | 4 | 3 | 1 | 1 | 1 | 2 | 3 | **15** |
| S7 | Redningsselskapet (rescue boats) | **58 rescue boats + 4 ambulance boats** [V] / 1 | 15–25 m, <100 GT | N / 1770 [E] | Unknown [?] | L–M | P (NGO; donation- and state-funded) | High (stations along the whole coast; HQ Oslo) | One buyer, 62 hulls, volunteer crews need simplicity; visible reference everywhere | 2 | 4 | 3 | 5 | 4 | 3 | 3 | **24** |
| S8 | Pilot boats | ~26 (Kystverket, 18 stations) [R] (same fact sheet); mostly operated by BB [R] / 1–2 | 15–20 m | N / 1770 | UniSea via BB [E] | L | P/L | Medium | Contract-driven | 3 | 3 | 2 | 4 | 2 | 1 | 2 | **17** |
| S9 | Cable layers | ~3–5 [E] (Nexans Aurora, Skagerrak) / 1–2 | 10,000+ GT | Y / Y | Enterprise PMS [E] | H | L | Low | None | 4 | 2 | 1 | 1 | 1 | 1 | 2 | **12** |
| S10 | Dredgers | <5 [E?] / 1–3 | Small | P / 1770 | Unknown | L | F | Low | None | 2 | 2 | 2 | 2 | 2 | 1 | 1 | **12** |
| S11 | Superyachts (Norwegian-owned >24 m) | ~10–20 [E?] / ~10–20 (private offices) | 24–100 m | P / 1770 for private >24 m [V] (see `02`) | DeepBlue (DNV type-approved [R]), YMS360, IDEA | M | Private | Low (Monaco/Antibes crews) | Crew turnover; owner reporting | 5 | 1 | 2 | 3 | 1 | 1 | 1 | **14** |
| S12 | Training ships (full-riggers, school ships) | 3 full-riggers + ~5–10 school vessels [E] / ~8 foundations and counties | 20–100 m | N–P / 1770 or Y | Paper, Excel [E] | L | P | Medium (Ålesund fagskole has simulators, not ships [?]) | Maritime schools as future-user channel | 1 | 3 | 2 | 5 | 4 | 1 | 2 | **18** |
| S13 | Crew transfer vessels (offshore wind CTV) *(added)* | ~10 [E?] / ~3 | 20–30 m, <500 GT | N / 1770 | Operator tools, Excel | L | F/M | Medium | Wind build-out slow in Norway | 2 | 3 | 2 | 4 | 3 | 2 | 1 | **17** |
| S14 | Small third-party ship and technical managers *(added: a buyer type, not a vessel type)* | ~15–30 firms [E] managing fishing, aquaculture, cargo and OSV hulls (e.g. Havila Shipping manages 6 for external owners [R], see `20`) | Mixed | Mixed | Whatever each owner uses, so often **3–4 systems per manager** | M | F/M | Very high (Sunnmøre cluster) | Pain of running several owners' systems at once; one sale reaches many hulls | 3 | 5 | 3 | 3 | 3 | 5 | 3 | **25** |

---

## 3. Ranking (all 56)

Tie-breaks, in order: the C4 gate first (C4 = 1 ranks last), then C3, then C2. *(QA: ranks re-sorted on 30 Sept 2026 to apply this rule as written; see QA review.)*

| Rank | Segment | Total | C4 | Note |
|---|---|---|---|---|
| 1 | F1 Pelagic purse seiners | 28 | 3 | Richest *and* most local; check class-PMS share |
| 2 | A4 Aquaculture service vessels ≥ 15 m | 27 | 4 | No gate, dense in Møre, growing |
| 3 | A1 Wellboats | 27 | 3 | Highest margins; UniSea/SERTICA present |
| 4 | F3 Whitefish trawlers | 27 | 2 | Founder home turf; Lerøy conflict; Track B |
| 5 | F6 Coastal fishing 15–28 m (+SUK) | 26 | 5 | Track A core; geography skews north |
| 6 | F4 Autoliners | 26 | 4 | Sunnmøre heartland; thin margins |
| 7 | S14 Small third-party ship managers | 25 | 3 | Buyer type; multiplier |
| 8 | F2 Pelagic trawlers | 25 | 3 | Merge with F1 for interviews |
| 9 | C1 Short-sea general/dry cargo | 24 | 3 | MRV 2025 hook; family owners |
| 10 | S7 Redningsselskapet | 24 | 5 | One buyer, 62 hulls |
| 11 | A3 Feed carriers | 23 | 4 | Effectively one buyer (Eidsvaag, on TM Master) |
| 12 | P5 Fjord tourism/sightseeing | 22 | 5 | Low budget, easy product |
| 13 | A6 Harvest/processing vessels | 22 | 3 | Few buyers |
| 14 | S5 Kystverket | 22 | 3 | Public-procurement reference, HQ in Ålesund |
| 15 | A2 Live-fish carriers (non-wellboat) | 21 | 4 | Tiny |
| 16 | S1 Tugs | 21 | 4 | UniSea has the largest operator |
| 17 | F9 Snow crab | 21 | 3 | Loss-making |
| 18 | F5 Danish seiners | 21 | 4 | Fold into F6 interviews |
| 19 | F8 Shrimp trawlers | 21 | 5 | North; low budget |
| 20 | P1 Car ferries | 20 | 2 | Fjord1 chose UniSea for its newbuilds |
| 21 | P2 Fast ferries | 20 | 4 | Operator-driven |
| 22 | A5 Workboats 8–15 m | 20 | 5 | Low budget; possible later light tier |
| 23 | O6 Standby/ERRV | 19 | 2 | — |
| 24 | S3 Research | 19 | 3 | Tender cycle |
| 25 | F7 Coastal 11–15 m | 19 | 5 | Later light tier |
| 26 | S12 Training ships | 18 | 5 | Channel, not market |
| 27 | S8 Pilot boats | 17 | 4 | — |
| 28 | S13 CTV | 17 | 4 | — |
| 29 | C3 Reefers | 16 | 2 | — |
| 30 | A7 Offshore fish-farm units | 16 | 2 | — |
| 31 | S2 Salvage | 15 | 3 | — |
| 32 | S4 Survey/hydrographic | 15 | 2 | — |
| 33 | C2 Container feeders | 15 | 2 | — |
| 34 | S11 Superyachts | 14 | 3 | — |
| 35 | S10 Dredgers | 12 | 2 | Tiny; no trigger |
| 36 | O3 Subsea/IMR/CSV | 21 | 1 | Gate; DeepOcean conflict |
| 37 | O1 PSV | 20 | 1 | Local but gated |
| 38 | O4 SOV/W2W | 20 | 1 | Greenfield, but gated |
| 39 | O2 AHTS | 19 | 1 | — |
| 40 | F10 Krill | 17 | 1 | 2 buyers |
| 41 | P3 Coastal cruise | 16 | 1 | Havila is local, but embedded |
| 42 | O10 Shuttle tankers | 16 | 1 | — |
| 43 | C4 Chemical/product tankers | 15 | 1 | — |
| 44 | S6 Kystvakten | 15 | 1 | — |
| 45 | O8 Mobile drilling units | 13 | 1 | — |
| 46 | P4 Expedition cruise | 13 | 1 | — |
| 47 | C6 Gas carriers | 13 | 1 | — |
| 48 | P6 International ro-pax | 12 | 1 | — |
| 49 | O9 FPSO/FSO | 12 | 1 | Out of scope until Stage 4 |
| 50 | S9 Cable layers | 12 | 1 | — |
| 51 | C7 PCTC | 12 | 1 | — |
| 52 | C8 Open-hatch/heavy-lift | 12 | 1 | — |
| 53 | C9 Deep-sea dry bulk | 12 | 1 | — |
| 54 | O5 Seismic | 11 | 1 | Out of scope until Stage 4 |
| 55 | O7 Accommodation units | 11 | 1 | Out of scope until Stage 4 |
| 56 | C5 Crude tankers | 11 | 1 | Out of scope until Stage 4 |

**What the ranking says.**
- **Tier 1 (≥ 25), eight segments:** five fishing (purse seine and pelagic trawl, whitefish, autoline, coastal), two aquaculture (wellboats, service vessels), and the ship-manager buyer type.
- **Tier 2 (21–24, C4 ≥ 2):** adjacent small-vessel segments. They are useful as Track A expansion, but either the budget is low or there are only a few buyers.
- **Tier 3 (≤ 20, or any C4 = 1):** everything class-gated (O3 scores 21 but is gated). **Offshore scores high on money and geography (C1, C2 = 4–5) but is blocked by C4 and C5.** That can change after DNV approval (M10), and UniSea's April 2025 approval shows it is achievable.

**Sensitivity.** If C4 were not a gate (after type approval), PSV/subsea would rise about 4 points to 24–25, level with Tier 1. That is the Stage 2 case in `PLAN.md`, not today's.

---

## 4. Recommended interview coverage for M1 (24 interviews, 8 segments)

This refines the M1 split in `PLAN.md` (**20** interviews: fishing 8, wellboat 4, offshore 4, short-sea 4). **It also raises the total from 20 to 24; PLAN M1 and the decision log must be updated if the founders accept this.** **Proposed change:** fishing 12 split across four sub-segments, aquaculture 6, short-sea 2, ship managers 2, RS 1, offshore 1. The reason: Aulet requires primary evidence per *segment*, and "fishing" is really four segments with different buyers, class status and budgets. Four offshore interviews would mostly confirm a gate we already know about.

| # | Segment (codes) | Interviews | Who (DMU mix) | What the interviews must settle for Gate 1 |
|---|---|---|---|---|
| 1 | **Pelagic, purse seine + trawl (F1+F2)** | **3** (2 purse seine, 1 pelagic trawl) | Technical manager/owner, chief engineer, 1 CFO | Class-PMS (PMS.A) share; current stack and cost; whether ISM docs are a pain; willingness to run Track B next to the existing PMS |
| 2 | **Whitefish trawlers (F3), non-Lerøy only** | **3** | Driftsleder/technical superintendent, chief engineer, owner | Does Track B (compliance tower) have budget beside PreMaster/TM Master? Validate the ~NOK 500k stack composition |
| 3 | **Autoliners (F4)** | **3** | Owner-skipper/rederi office, chief engineer | Budget under low margins; how many are without class PMS (Track A) |
| 4 | **Coastal 15–28 m incl. SUK and Danish seiners (F6+F5)** | **3** (at least 1 in Nordland by phone/Teams) | Owner-skipper, office person, 1 SMS consultant (Sirkel type) | Track A demand; price tolerance of NOK 2–4k/month; the consultant channel |
| 5 | **Wellboats (A1)** | **3** | Technical manager, HSEQ, 1 captain | Incumbent satisfaction (TM Master/SERTICA/UniSea); newbuild system decisions; class-PMS share |
| 6 | **Aquaculture service vessels ≥ 15 m (A4) + 1 feed or harvest (A3/A6)** | **3** | Owner/daily manager, technical, fish-farm customer QA (1) | Do fish-farm clients demand documentation? Excel vs system; willingness to pay |
| 7 | **Short-sea cargo < 5,000 GT (C1)** | **2** | Technical manager, owner | Is MRV (2025) a trigger? Below-500 GT 1770 pain; incumbent |
| 8 | **Small third-party technical managers (S14)** | **2** | Managing director, superintendent | Multi-owner pain; would they standardise on one platform? A channel test |
| + | **Wildcard: Redningsselskapet (S7)** | **1** | Technical/fleet manager | Single-buyer many-hull deal: budget, procurement route, current system |
| + | **Control: OSV/subsea (O1/O3), non-DeepOcean** | **1** (Kristian) | Superintendent | Confirm or kill the class-PMS gate assumption; interest in a compliance layer beside TM Master/Star |
| | **Total** | **24** | At least 30 % by Kristian (PLAN rule): segments 5, 6, 7 and the offshore control | |

**Why these eight and not others.**
- They are the **Tier 1 segments plus the best Tier 2 segment on each axis:**
  - C1 carries the regulatory trigger (MRV).
  - S7 is the largest single-buyer hull count with no gate.
  - The OSV control interview tests the single most consequential assumption (the C4 gate).
- They cover **both tracks**:
  - Track A: F4, F6, A4, C1, S7.
  - Track B: F1, F3, A1.
- They cover **all three buyer types:** family AS, mid-size groups and a public/NGO buyer.
- **They exclude on purpose:**
  - Deep-sea cargo, tankers, gas, PCTC, rigs and FPSO: class-gated, large-company procurement, no founder network.
  - Coastal cruise and car ferries: embedded, and UniSea has just won Fjord1's next-generation vessels.
  - Krill: 2 buyers, one of them Aker.
  - Kystvakten: defence procurement.
  - Anything under 15 m: budget too low for a Stage 1 business.
- **One segment in each pair is also a leverage test:**
  - A win in F1 or F3 carries to Nordic fishing (Stage 3).
  - A4 carries to fish farmers' own fleets.
  - C1 carries to small tankers and feed carriers.

**Conflict rules (PLAN "Conflicts" and M0).** No fishing outreach before the written duty-of-loyalty advice (M0, due 11 Oct). No interviews at Lerøy group companies or DeepOcean. Decide how to treat Møgster-linked owners before booking pelagic interviews.

**Record in every interview** (feeds M2 and the Gate 1 count of class-PMS vs non-class-PMS vessels):
- vessel GT and class
- PMS.A / MPMS status
- current systems and total NOK per vessel per year
- who signs
- last Sdir *pålegg* or ISM non-conformity on maintenance

---

## 5. Open data gaps (to close cheaply before or during M1)

1. **Class-PMS status per vessel** (the DNV Vessel Register lookup is already in PLAN "this week"). It decides C4 for F1–F4 and A1. This is the biggest scoring uncertainty.
2. **Danish seine, shrimp and fast-ferry counts** are estimates. Pull them from the Fiskeridirektoratet register by gear type and from the SSB passenger-boat split.
3. **The OSV split** (PSV / AHTS / subsea / SOV within the 455) is an estimate. The Rederiforbundet member list or Clarksons would settle it if offshore becomes relevant after M10.
4. **UniSea's pricing and its fishing footprint.** A mystery-shop quote. It is now a more direct threat in aquaculture and cargo than PreMaster is.
5. **Redningsselskapet's current system** [?]. One phone call.

---

## Sources

**New sources used in this file**
- Norges Rederiforbund, *Quarterly report no. 1 2026* (fleet at 1 Jan 2026; mobile units): https://www.rederi.no/globalassets/dokumenter/alle/rapporter/quarterly-report-no-1-2026.pdf
- Norges Rederiforbund, *Konjunkturrapport 2025* (member fleet ~450 offshore vessels, 50 MOUs, ~240 short sea, ~700 deep sea; 52 offshore-wind vessels planned): https://rederi.no/globalassets/dokumenter/alle/rapporter/ref-kr2025_no-web.pdf
- UniSea DNV class approval (Apr 2025): https://www.unisea.no/post/unisea-maintenance-dnv-class-approval
- UniSea / Fjord1: https://unisea.no/post/fjord1-picks-unisea-maintenance
- UniSea / Napier (customer list): https://unisea.no/post/napier-unisea-maintenance
- UniSea / Njord Aquashipping: https://www.unisea.no/post/njord-aquashipping
- Maindeck / Hurtigruten: https://maindeck.io/blog/hurtigruten-chooses-maindeck-for-their-ship-maintenance
- UniSea acquires Maindeck: https://shippingtelegraph.com/ship-technology/unisea-expands-with-shipping-software-start-up-maindeck-acquisition/
- Star IPS at Helgelandske: https://www.marinelink.com/news/norwegian-upgrades305271
- Star IPS at Solstad: https://offshore-energy.biz/?p=221028
- TM Master at Eidsvaag: https://thedigitalship.com/news/eidsvaag-as-upgrades-to-tm-master-v2/
- SERTICA at North Star (47 vessels): https://www.ship-technology.com/news/logimatic-fleet-management-system/
- iLaks, wellboat margins 2025: https://ilaks.no/kruttsterke-marginer-for-landets-bronnbatrederier/
- iLaks, feed-carrier market: https://ilaks.no/forbatmarkedet-vokser-ett-rederi-skiller-seg-ut/
- Redningsselskapet, likestillingsredegjørelse 2025: https://rs.no/content/uploads/2026/07/RS-Likestillingsredegjorelse-2025.pdf
- Kystvakten (SNL): https://snl.no/Kystvakten
- Kystverket beredskapsressurser fact sheet: https://www.kystverket.no/globalassets/oljevern-og-miljoberedskap/faktaark/beredskapsressurser-faktaark.pdf/download
- Havforskningsfartøyer (SNL): https://snl.no/havforskningsfart%C3%B8yer
- Svitzer / Buksér og Berging: https://www.rivieramm.com/news-content-hub/svitzer-acquires-controlling-stake-in-bukser-og-berging-86764
- Østensjø tugs: https://www.rivieramm.com/news-content-hub/ostensjo-rederi-adds-offshore-escort-tug-to-norwegian-fleet-84978
- Wallenius Wilhelmsen Q4 2025: https://live.euronext.com/sites/default/files/company_press_releases/attachments_oslo/2026/02/11/665330_Wallenius%20Wilhelmsen%20Quarterly%20report%20Q4%202025.pdf
- Höegh Autoliners fleet: https://annualreport2025.hoeghautoliners.com/about-hoegh/fleet-presentation/
- Frontline Q4 2025: https://www.fool.com/earnings/call-transcripts/2026/02/27/frontline-fro-q4-2025-earnings-call-transcript/
- G2 Ocean fleet: https://www.g2ocean.com/our-fleet
- Shearwater: https://www.rivieramm.com/news-content-hub/news-content-hub/shearwater-reports-record-high-fleet-utilisation-despite-short-term-seismic-market-caution-85044
- Edda Wind SOV sale: https://www.rivieramm.com/news-content-hub/wilhelmsen-fredriksen-ofer-owned-edda-wind-completes-sale-of-sov-fleet-88631
- Equinor Barents area preparedness: https://www.equinor.com/news/20240827-strengthening-emergency-preparedness-barents-sea
- Brim Explorer: https://brimexplorer.com
- Norled: https://www.norled.no/en/?p=3636
- Havila Kystruten / Kongsberg: https://www.ship-technology.com/news/havila-kystruten-kongsberg-cruise-vessels/
- Snow crab permits 2025: https://thefishingdaily.com/latest-news/norwegian-fishermen-slam-2025-snow-crab-quota-plan/
- Aker QRILL fourth krill vessel: https://fiskerforum.com/aker-to-add-fourth-krill-catcher/
- Kystrederiene (100 companies, 284 vessels): https://www.uib.no/sampol/101212/kystrederiene

**Inherited from `02` and `01`** (not repeated here): the Fiskeridirektoratet register and profitability survey 2024, SSB 08203, the Sdir aquaculture study 2023, FOR-2016-12-16-1770, FOR-2014-09-05-1191, DNV PMS.A / CP-0206, EU MRV/ETS, Sirkel, Mintra, BASSnet/Stenersen, TM Master customer list.

---

## QA review (30 Sept 2026, independent reviewer; milestones M1, M2)

**Verdict: pass with fixes.** The top 10 and the interview allocation stand. The methodology is unchanged.

### What was checked
1. **Arithmetic:** C1–C7 re-summed for all 56 rows (script), and the ranking table compared with the segment tables.
2. **Rank order vs the stated rule** (C4 = 1 ranks last, then total, C3, C2).
3. **Consistency with `PLAN.md`, `01`, `02` and `_case-brief.md`:** counts, regulations, price bands, conflicts, M1 split.
4. **Sourcing:** facts without a link or tag.
5. **Scope:** stated reasons for exclusions.
6. **Bias sensitivity:**
   - Top 10 re-computed with C7 removed, with C7 = 3 for everyone, and with the C4 gate ignored.
   - Offshore re-scored with C4 = 2 (Track B beside TM Master/Star, the same logic that gives F3 C4 = 2).
7. **Web checks** (5 claims):
   - UniSea DNV approval: **confirmed**, 10 Apr 2025 ([UniSea](https://www.unisea.no/post/unisea-maintenance-dnv-class-approval)). The page says "DNV Class Approval" for the PMS but does not name the standard (for example CP-0206).
   - UniSea/Fjord1: **scope overstated**. The deal covers the next-generation "Autonomous Crossing" vessels on Lavik–Oppedal, not the 85+ fleet (25 Apr 2025, [UniSea](https://unisea.no/post/fjord1-picks-unisea-maintenance)).
   - UniSea/Kaiko: **confirmed** ([HSN](https://www.hellenicshippingnews.com/unisea-acquires-ai-powered-frontline-intelligence-company-kaiko-systems/)). UniSea is majority-owned by Adelis Equity and serves 3,000+ vessels.
   - Also found: UniSea customers **Hagland** (short-sea, relevant to C1) and **REV Ocean** (relevant to P4) ([UniSea search results](https://www.unisea.no/post/unisea-maintenance-dnv-class-approval), [REV Ocean](https://unisea.no/post/rev-ocean-chooses-unisea)) [R].

### What was fixed
- **S10 Dredgers total:** was 11, sums to **12**.
- **Ranking re-sorted to apply the file's own rule.**
  - Nine class-gated segments (O3, O1, O4, O2, F10, P3, O10, C4, S6) had been ranked above ungated ones, and several tie-breaks were wrong.
  - S14 now ranks above F2 (C2 5 vs 4). A6 now ranks above S5 (C3 3 vs 2). The 21-point and 20-point groups were reordered on C3/C2.
  - The top-10 *set* is unchanged.
- **Key finding 1:** said nothing outside fishing/aquaculture scores "above 25", then cited 24–25. Reworded.
- **Fjord1 scope** corrected in key finding 2, row P1, the ranking note and §4 exclusions. The P1 scores are left as they are: the evidence is weaker, but the ranking doesn't change.
- **UniSea description:** "small Norwegian vendor" corrected to PE-backed with 3,000+ vessels. Kaiko got a source; its month is unverified.
- **Key finding 3:** "tonnage by vessel count" was wrong. By count, the domestic fleet dominates.
- **Tier labels:** Tier 1 has five fishing segments, not four. Tier 2/3 boundaries now state the C4 gate.
- **§1.3 price bands:** relabelled "simplified from `01`". They don't match `01` §2c exactly.
- **§4:** now says the proposal raises M1 from **20 to 24 interviews**. It previously said "refines", which hid that it contradicts `PLAN.md`.
- **Conflict rule:** added the PLAN M0 prerequisite (written loyalty advice before any fishing outreach).

### Findings by check
- **Scores and bias (check 5).**
  - Top 10 is robust: identical membership under all three sensitivity cuts. Without C7, A1 wellboats tie F1 at #1.
  - **Founder-fit (C7) does favour fishing, but it doesn't decide the top 10.**
  - **The class gate is applied unevenly.** F3 gets C4 = 2 because Track B can sit beside an existing class PMS, but O1/O3/O4 get C4 = 1 although the same Track B layer would work there.
    - Re-scoring offshore at C4 = 2 gives O3 22 and O1/O4 21, still below the top 10 (24).
    - So the allocation holds. But the "offshore is gated" conclusion is really about Track A, not Track B. The single offshore control interview should test Track B explicitly (it already asks about "a compliance layer").
- **Interview allocation (check 6).**
  - All top-10 segments get interviews. Sums check out: 3+3+3+3+3+3+2+2+1+1 = 24. Kristian's share is 9/24 = 37.5 %, above the 30 % rule.
  - Weighting is defensible: fishing gets 12 (5 of the top 10), aquaculture 6 (2 of the top 10 plus A3/A6).
  - S14 (rank 7) gets 2 while each fishing sub-segment gets 3. That is acceptable because S14 is a channel test.
- **Scope (check 4).**
  - The file scores only **Norwegian-owned/controlled** vessels and gives no explicit reason. CLAUDE.md's default is "all vessel types over 15 m worldwide".
  - The implied reason is reach (C2) and PLAN Stage 1 = Norway. **Fix:** state it in §1 before M2, owner Claude, by 7 Oct 2026.
  - Nordic/foreign fishing is Stage 3 per PLAN, which is acceptable.
- **Contradictions with other files (check 2).**
  - M1 total: PLAN says 20, this file says 24. Founders decide at the next plan update (owner Arne, by 5 Oct 2026); then update the PLAN decision log.
  - `02`'s OSV matrix gives "whole product" 2, while this file gives C4 = 1. The scales differ, so this is noted, not changed.

### What remains uncertain (open issues)
- **Sourcing (check 3).** These facts lack a link or an [E] tag:
  - "Fjord1 is owned by Havilafjord"
  - "Sølvtrans, Trident, Frøy majority foreign-owned [V]"
  - "Norled ~80 [R]"
  - "DeepBlue DNV type-approved [R]"
  - "7 + 4 coastal cruise ships [R]"
  - "Cape Town PSC from Feb 2027" (`02` says only "2027")

  Fix: add links or downgrade to [E] (owner Claude, by 7 Oct 2026).
- **MOU count.** Key finding 3 says 28 mobile offshore units, but O7 + O8 + O9 = 1 + 22 + 6 = 29 (and some may be production units, not MOUs). Check against the Rederiforbundet Q1 2026 report.
- **UniSea's approval standard.** Is it DNV-CP-0206 type approval (PMS.A credit) or a narrower class approval? This matters for M10 and for UniSea's threat in classed fishing. Check the DNV type-approval register (owner Kristian, M10a).
- **Class-PMS share per segment** is still the biggest scoring uncertainty (C4 for F1–F4 and A1). It is already open data gap 1.
- **Confidentiality.** F3 puts the ~NOK 500k/vessel figure next to "Lerøy Havfisk". Keep this file internal. Never quote the figure in the same place as the operator name.
