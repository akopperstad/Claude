# 01 – Competitor landscape, pricing evidence and positioning (Nautech)

*Prepared for SEAWISE AS. It feeds MIT Disciplined Entrepreneurship Step 11 (Competitive Position) and Step 16 (Pricing Framework). Research date: 30 Sept 2026.*

**How to read this.** A URL backs every claim that isn't obvious. Tags: **[V]** = verified in the cited source. **[R]** = reported by a secondary or low-quality source, so treat it with care. **[E]** = my estimate or inference. **[?]** = not found or unverified. Vendors almost never publish list prices, so the pricing section has to use indirect evidence.

---

## 0. Key takeaways (TL;DR)

1. **The fishing segment has a hidden incumbent: PreMaster (Premas AS, Ålesund).** It is a Norwegian PMS/ISM system aimed at fisheries, aquaculture and small vessels, and it runs over slow links. Since Sept 2024 it has been in a strategic alliance or merger with **Star Information Systems** (Trondheim, majority-owned by PE firm **Longship**). Star has since acquired Arribatec Marine (2025) and Sharecat (2025). PreMas launched **"Premaster 3.0 – one cloud platform for your entire fleet"** at **Nor-Fishing 2026**. That means the leading fishing incumbent is moving into the "modern cloud" space Nautech wants to occupy. [V] ([premaster.com](https://www.premaster.com/), [Hellenic Shipping News](https://www.hellenicshippingnews.com/star-information-systems-and-premas-seal-landmark-strategic-alliance/), [Container News](https://container-news.com/star-information-systems-acquires-sharecat/))
2. **Coastal fishing vessels are often reached through consultants rather than directly by vendors.** Sirkel AS sells a package of safety management system plus PreMaster maintenance system to 100+ vessels, many of them coastal fishing boats. [V] ([sirkel-vs.no](https://sirkel-vs.no/referansekunder/))
3. **The generic fleet-management market is consolidating fast.** Lloyd's Register now owns Hanseaticsoft (2017), OneOcean/ChartCo/Docmap (2022) and Ocean Technologies Group/TM Master/COMPAS (2024). It merged them under the **OneOcean** brand in Oct 2025. Other consolidators: Marcura (ShipServ 2023, VesselMan 2025), RINA (SERTICA 2021), Veson (Q88 2022) and Constellation/Volaris (AMOS 2012).
4. **Emissions (CII/EU ETS/MRV) is a weak wedge for fishing.** Fishing vessels are **exempt** from EU ETS and MRV [V] ([Clyde & Co](https://www.clydeco.com/es/insights/2023/10/eu-emissions-trading-system-for-maritime-transport)). The emissions topic that actually matters to Norwegian fishers is **documenting fuel use for the Norwegian CO₂-tax compensation scheme**, which is NOK 640m in the 2026 budget and now also covers distant-water fishing. [V] ([regjeringen.no](https://www.regjeringen.no/no/aktuelt/oker-co2-kompensasjonen-til-fiskeflaten-og-avvikler-drivstofftilskuddet-til-kystrekeflaten/id3124180/))
5. **The founders' price claims look plausible for enterprise stacks but high for any single module.** NOK 500k per vessel per year (founder-reported spend at a large trawler operator) is ~0.27% of average cod-trawler revenue. NOK 25–45k per month *per licence* sits at or above the top of the international evidence I found, so it should be checked against real invoices (details in section 2).
6. **The market is small.** Norway had 5,372 registered fishing vessels in 2024. Only about 5% are ≥28 m (~270) and about 3.4% are 15–28 m (~180) [V] ([SNL / Fiskeridir](https://snl.no/fiskefart%C3%B8yer)). Nautech's core serviceable market is therefore roughly **450 vessels ≥15 m**, plus aquaculture service vessels and 11–15 m boats for a lighter product.

---

## 1. Competitor profiles

### 1a. Fishing-native or Norway-rooted (highest priority)

| Vendor / product | HQ, owner | Size | Modules | Deployment | Fishing-specific features | Known Norwegian users | Strengths | Weaknesses |
|---|---|---|---|---|---|---|---|---|
| **PreMaster** (Premas AS) | Ålesund. Founded 1986 per the company, current AS registered 2013. Allied/merged with Star IS (Longship) since Sept 2024 [V] ([premaster.com/about](https://www.premaster.com/about), [funnelfeedr](https://funnelfeedr.com/en/company/no/premas-as-912787281)) | ~12 staff, ~NOK 21m revenue [R] ([funnelfeedr](https://funnelfeedr.com/en/company/no/premas-as-912787281)) | PMS, work orders with dynamic forms, procurement/ordering, crew admin, ISM; "Maisy"; Premaster GO (mobile) [V] ([premaster.com](https://www.premaster.com/)) | Cloud *and* on-prem; built to run on slow connections [V] ([premaster.com](https://www.premaster.com/), [Energy Inst.](https://knowledge.energyinst.org/search/record?id=31659/)) | Targets fisheries, fish farming and SAR explicitly. **No ERS, quota or lott features found** [?] | Coastal fishing vessels via Sirkel AS (e.g. MS Senjasund, MS Nordsild, MS Grotle) [V] ([Sirkel](https://sirkel-vs.no/referansekunder/)). Named in Norwegian job ads alongside SAP and IFS [R] | Deep fishing-fleet installed base, Norwegian language, low bandwidth needs, cheap, consultant channel, now PE-backed | Small team; UX seen as legacy (3.0 aims to fix this); no catch/quota/lott layer; integration with Star may cause distraction |
| **Star IPS / Star IS** | Trondheim; majority owned by Longship [V] ([Container News](https://container-news.com/star-information-systems-acquires-sharecat/)) | Offices on several continents; bought Arribatec Marine (NOK ~25m, Mar 2025) and Sharecat (Aug 2025) [V] ([TipRanks](https://www.tipranks.com/news/company-announcements/arribatec-divests-marine-unit-to-star-information-systems)) | Maintenance, purchasing, QHSE, documents, crew, projects, master data [V] ([MarineLink](https://www.marinelink.com/news/norwegian-upgrades305271)) | Mainly on-prem/hybrid [E] | None specific [?] | Solstad (50 vessels), Helgelandske (14), Eimskip (Iceland, 10) [R] ([offshore-energy.biz](https://offshore-energy.biz/?p=221028), [MarineLink](https://www.marinelink.com/news/norwegian-upgrades305271)) | Offshore pedigree, now a roll-up platform | Built for offshore/enterprise, heavy |
| **Dualog** (eCatch via Dualog Fisknett AS) | Tromsø, founded 1994, independent [V] ([dualog.com](https://dualog.com/about-us)). Fisknett AS is a 100% subsidiary [V] ([brreg](https://virksomhet.brreg.no/en/oppslag/enheter/987265930)) | Comms software on >5,000 ships [V] ([ship-technology](https://www.ship-technology.com/contractors/ps-cloud/dualog/)) | Ship–shore email/data, cyber; **eCatch ERS logbook** | Onboard + shore | eCatch was co-developed with Aker Seafoods and ran on its 14 trawlers [V] ([World Fishing](https://www.worldfishing.net/new-electronic-catch-recording-and-reporting-system/94582.article)). Claimed on >350 Norwegian vessels [R] (search snippet only) | Norwegian trawler/deep-sea fleet [E] | Trusted in large-trawler IT; ERS approval | Left the UK ERS market [V] ([gov.scot](https://gov.scot/publications/marine-and-fisheries-compliance-uk-approved-electronic-logbook-software-systems)). ERS is a narrow product |
| **Other ERS/VMS vendors** | Products named by SNL: **iFisk, MarineSmart, eFangst, ApolloSAT** and others [V] ([SNL](https://snl.no/fangstdagbok)). NorVMS (Oppdrift AS, Oslo; Sailorsmate app) [V] ([norvms.com](https://norvms.com/)) | – | ERS catch logbook + VMS | Mobile/4G + Iridium | Core fishing compliance | ERS/VMS required on vessels >10 m, and 8–10 m from 2026 [V] ([Fiskeridir](https://www.fiskeridir.no/english/fisheries/reporting-systems-and-innovation/electronic-reporting-ers-and-position-reporting-vms-in-norwegian-fisheries)) | Regulatory lock-in, cheap | Point solutions only |
| **Maritech Systems** | Norway, controlled by Broodstock Capital [V] ([iLaks](https://ilaks.no/broodstock-capital-kjoper-aksjemajoriteten-i-maritech-systems/)) | ~300 customers; "70–80% of fish traded in Norway passes through a Maritech product" [R] (same) | Seafood trading/ERP, traceability | Cloud | First-hand sale, landings, traceability – **shore side, not vessel ops** | Large seafood groups | Owns the sales-side data | No PMS or ISM |
| **Wisefish** | Reykjavík; ERP on MS Dynamics 365 [V] ([wisefish.com](https://www.wisefish.com/blog/brim-moves-to-saas-with-wisefish)) | Icelandic majors | "Fishing" package: **quota management, catch recording, trip cost, crew settlement** [V] ([softwareconnect](https://softwareconnect.com/reviews/wisefish-erp/), [Wisefish wiki](https://wisefish.atlassian.net/wiki/x/eQap)) | SaaS (Brim moved in June 2026) | Strong on quota and lott | Norwegian presence not confirmed [?] | The only fishing-native quota+lott+ERP platform I found | No PMS or ISM; ERP-heavy |
| **Sirkel AS** (channel/consultant) | Norway | 100+ vessels | Writes the safety management system (SMS) and delivers PreMaster, web portal, app | – | Coastal fishing SMS compliance | Gullfesken, Nordtorsk, Finnmark Kystfiske and others [V] ([Sirkel](https://sirkel-vs.no/referansekunder/)) | Owns the compliance relationship on small boats | Consultancy, doesn't scale |

**I could not verify the "Havfisk systems", "Marinogram" or "EQS" leads the brief mentioned** [?]. **Scantrol** (Bergen) makes trawl-control and fishery/marine-research instrumentation, not ERS [R] ([EDMO](https://edmo.seadatanet.org/report/1766)).

### 1b. Generic fleet-management suites (used by Norwegian shipping and offshore, sometimes by large fishing groups)

| Vendor / product | HQ, owner (current) | Scale | Modules | Deployment | Fishing fit | Norwegian footprint | Strengths / weaknesses |
|---|---|---|---|---|---|---|---|
| **TM Master** (Tero Marine) | Bergen. Seagull → Ocean Technologies Group (Oakley) → **Lloyd's Register** (completed Nov 2024) → **OneOcean** brand (Oct 2025) [V] ([Investegate](https://investegate.co.uk/announcement/rns/oakley-capital-investments-ltd-di---oci/oakley-agrees-sale-of-ocean-to-lloyds-register/8393501), [OneOcean](https://www.oneocean.com/insights/oneocean-unveiled-to-unite-maritime-digital-and-training-services)) | >2,000 systems licensed (2015 brochure) [V] ([Tero PDF](https://d1tmir783i2ibf.cloudfront.net/1470208314/teromarine-companypresent.pdf)) | Maintenance, procurement, QHSE, HR, e-log | Onboard + office; cloud via OneOcean [E] | 2015 customer list includes Aker BioMarine (krill) and Sealord (NZ fishing) [V] (same PDF) | Very strong in Norwegian offshore (Eidesvik, Østensjø, Simon Møkster, Olympic, Island Offshore) [V] | + A Norwegian standard, class-friendly. − Legacy UX, and now a small piece of a global LR bundle |
| **DNV ShipManager** | Høvik; DNV | ~7,000 vessels, 300 customers [R] ([worldports](https://www.worldports.org/1000-ships-affected-by-cyberattack-on-dnv-shipmanager)) | Technical, procurement, QHSE, crew, projects | Onboard/offline + central servers | Nothing specific [?] | Wide | + DNV brand. − A **ransomware attack (Jan 2023)** hit ~1,000 vessels of 70 customers, although onboard offline use kept working [R] ([GovInfoSecurity](https://www.govinfosecurity.com/ransomware-attack-affects-1000-vessels-worldwide-a-20939)). Some aggregators misdate it to 2025 |
| **AMOS** (SpecTec) | Constellation Software / Volaris since 2012 [V] ([Mergr](https://mergr.com/spectec-group-holdings-acquired-by-volaris-group)) | Large tanker/offshore/navy base | PMS, inventory, procurement, QHSE | On-prem → cloud (AMOS X) | None | Offshore/shipping | + Deep, class-approved. − Heavy and expensive to implement |
| **SERTICA** | Denmark; Logimatic → **RINA** (Sept 2021) [V] ([Maritime Executive](https://maritime-executive.com/article/rina-acquires-leading-software-company-logimatic-solutions)) | >1,400 vessels; ~€6m revenue, ~50 staff (2021) [V] | Maintenance, procurement, HSQE, crewing, performance | Onboard + shore + apps | Aquaculture: DESS Aquaculture Shipping (12 vessels) [R] ([MarineLink](https://www.marinelink.com/news/implement-shipping429030)) | Nordic | + Nordic mid-market. − Generic |
| **BASSnet** | Bærum (Norwegian heritage), founded 1997 [R] ([Maritime Executive dir.](https://maritime-executive.com/directory/bassnet)) | 101–250 staff | Full ERP incl. PMS, procurement, HSEQ, BI | SaaS on Azure | None | **Rederiet Stenersen chose BASSnet SaaS for 18 vessels after evaluating 6 vendors (Nov 2024)** [V] ([HSN](https://www.hellenicshippingnews.com/?p=1063691)) | + Moving to SaaS. − Enterprise weight |
| **Cloud Fleet Manager** (Hanseaticsoft) | Hamburg; **LR** since 2017 [V] ([LR](https://www.lr.org/en-us/latest-news/hanseaticsoft-investment-announcement/)) | >1,500 vessels, 30+ apps [R] ([ship-technology](https://www.ship-technology.com/contractors/computers/hanseaticsoft/)) | Crewing, purchase, maintenance, inspections | Cloud-native | None | Some Nordic | + Modern cloud. − Aimed at merchant shipping |
| **MESPAS** | Zurich, founded 2004; partnered with Netvision/COMPAS (2019) [V] ([Maritime Executive](https://maritime-executive.com/corporate/mespas-joins-forces-with-netvision)) | Mid-size | Maintenance, procurement, QHSE, ops | Cloud | None | Limited [?] | + Cloud, modular. − No local presence |
| **VesselMan** | Norway; **Marcura** (Jan 2025) [V] ([Cruise Industry News](https://cruiseindustrynews.com/cruise-news/2025/01/marcura-acquires-vesselman)) | – | Dry-dock/technical projects, inspections | Cloud | None | UMMS Norway [V] ([vesselman.com](https://www.vesselman.com/news/umms-norway-enter-into-an-agreement-with-vesselman)) | Niche (projects/dry-dock) |
| **Q88** | USA; **Veson** (May 2022) [V] ([AJOT](https://www.ajot.com/news/veson-nautical-acquires-q88)) | – | Vetting/questionnaires, safety | Cloud | Not relevant to fishing | Tankers | Irrelevant for fishing |
| **Docmap** | Norway → ChartCo (~2017) [R] ([MarineLink](https://www.marinelink.com/amp/news/acquires-chartco-docmap424015)) → OneOcean → **LR (2022)** [V] ([Maritime Executive](https://maritime-executive.com/article/lr-adds-to-digital-portfolio-with-acquisition-of-oneocean)) | – | ISM/SMS document control, ISO | Cloud/onboard | Used for ISM generally | Historically strong in Norway | Now part of the LR bundle |
| **EG Landax** | Norway, owned by EG (DK) [V] ([EG](https://egsoftware.com/no/kvalitets-og-vedlikeholdsstyring/eg-landax/digitalt-internkontrollsystem-for-hms)) | – | HMS/internal control, deviations, risk, equipment | Cloud | Generic HSE, used by small operators [E] | Broad Norwegian SMB | + **Public prices** (section 2). − Not maritime-specific |
| **OCS HR** (Mintra) | Bergen; Ferd/Minerva took it private (Jan 2024) [V] ([Inderes](https://www.inderes.dk/en/releases/mntr-compulsory-acquisition-of-shares-in-mintra-holding-as-and-mandatory-notifications-of-trade)) | >1,800 vessels worldwide [V]; ~800 vessels / 25k seafarers in Norway [R] | Crew, rotation/shift planning, competence, **payroll** | SaaS | Well-boat operators ("all major Norwegian well-boat operators") [V] ([Mintra](https://mintra.com/insights-and-news/14-12-21/well-boat-contract-adds-to-mintra-arr-pipeline)) | Norled (ferries) [V] | + De facto Norwegian crew/payroll standard. − Lott (catch-share pay) support unverified [?] |
| **Kongsberg Vessel Insight** | Kongsberg Digital | – | Vessel-to-cloud data infrastructure | Subscription | No fishing customers found [?] | Island Offshore (26), Olympic, Kystverket [V] ([Marine Log](https://www.marinelog.com/offshore/island-offshore-to-digitize-its-entire-fleet/)) | A data layer, not ops. Potential partner/integration |
| **Maritime Optima** | Norway | – | AIS/ship intelligence (ShipAtlas) | App/web, €10–65/month plans [V] ([help centre](https://help.maritimeoptima.com/en/articles/6780745-the-plans-and-pricing-in-shipatlas)) | Low | Commercial shipping | Shows cheap self-serve pricing is possible |
| **Zero44 / Siglar Carbon** | Berlin (Zero44, €2.5m seed 2023) [V] ([HSN](https://www.hellenicshippingnews.com/?p=984949)); Stavanger (Siglar, ~$2.5m) [R] ([Signalbase](https://www.trysignalbase.com/news/funding/siglar-carbon-secures-2.5-million-in-funding-for-maritime-emissions-reduction-solutions)) | Startups | EU ETS / FuelEU / CII | SaaS | **Fishing is out of scope for ETS/MRV** | Siglar is Norwegian | Not a fishing threat |

---

## 2. Pricing evidence

### 2a. Hard data points found

| # | Evidence | Price | Source | Quality |
|---|---|---|---|---|
| 1 | Mintra OCS HR (crew/HR/payroll), Norwegian well-boat operator, SaaS, Dec 2021 | **Contract NOK 850k; ARR NOK 365k** (fleet size not given) | [Mintra](https://mintra.com/insights-and-news/14-12-21/well-boat-contract-adds-to-mintra-arr-pipeline) | [V] |
| 2 | EG Landax (HSE/quality, company-wide, not per vessel) | **NOK 2,030–5,200/month** for 3–10 users | [EG](https://egsoftware.com/global/hseq-and-asset-management/eg-landax/price) | [V] |
| 3 | NorVMS (ERS + VMS, small vessels) | **NOK 90/month** tracking only, **NOK 240/month** tracking + logbook, NOK 490/month satellite, NOK 7,990 hardware (up to NOK 7,700 refunded) | [norvms.com](https://norvms.com/) | [V] |
| 4 | YMS360 (yacht PMS/compliance, per vessel, unlimited users) | **$300 / $500 / $650 per vessel per month**; onboard install fee extra | [yms360.com](https://www.yms360.com/pricing) | [V] |
| 5 | Maritime Optima ShipAtlas | €10–65 per user per month | [help centre](https://help.maritimeoptima.com/en/articles/6780745-the-plans-and-pricing-in-shipatlas) | [V] |
| 6 | "Modern SaaS" ship-management platforms | ~$8–15k per vessel per year, plus ~$5–10k implementation | search summary of vendor blogs ([fleetrabbit](https://fleetrabbit.com/industry/vessel-fleet/), [zipdo](https://zipdo.co/best/maritime-fleet-management-software/)) | [R] low |
| 7 | DNV ShipManager | "from $500+/vessel/month" | aggregator blogs (same as above) | [R] low, unverified |
| 8 | FleetRabbit (tiny PMS) | $5/vessel/month | [fleetrabbit](https://fleetrabbit.com/industry/vessel-fleet/) | [R] marketing |
| 9 | Arribatec Marine (IB Marine/InfoShip) | Bought 2020 for €1.6m; sold 2025 for ~NOK 25m | [Riviera](https://www.rivieramm.com/news-content-hub/norwegian-group-spends-us19m-for-cloud-and-ai-specialist-61906), [marine.arribatec](https://marine.arribatec.com/ib-acquired-by-arribatec/), [TipRanks](https://www.tipranks.com/news/company-announcements/arribatec-divests-marine-unit-to-star-information-systems) | [V] – shows small niche vendors trade at low absolute values |

Other vendors (TM Master, AMOS, Star, SERTICA, PreMaster, Mespas, CFM, Docmap) publish no prices. Navatom says only "per ship, per period" ([navatom.com](https://navatom.com/pricing)).

### 2b. Reconciling with the founders' figures

- **Size of the customer's P&L.** Fiskeridirektoratet's 2024 profitability survey gives average operating revenue per vessel of NOK 187.7m for cod trawlers (37 vessels), NOK 120.9m for purse seiners (65), NOK 76.7m for conventional deep-sea/autoline vessels (22) and NOK 48.8m for coastal seiners ≥21.36 m (44). "Andre kostnader" (other costs, where software sits) averages NOK 17.1m for a cod trawler. Vessel maintenance averages NOK 9.3m [V] ([Fiskeridir 2024 tables](https://www.fiskeridir.no/statistikk-tall-og-analyse/data-og-statistikk-om-yrkesfiske/lonnsomhetsundersokelsen-for-fiskeflaten/_/attachment/inline/cc6e4c2a-4fbb-4152-96b5-f7bb30140369:d4ea09ba44b8826d79158b27e729c181a413308c/driftsresultater-fartoygrupper-2024-off-stat.pdf)).
- **Founder-reported spend at a large trawler operator: ~NOK 500k per vessel per year** on all licences combined. That is **~0.27% of revenue and ~3% of "other costs"** for an average cod trawler [E]. It is plausible for a stack of PMS, QHSE/documents, crew/payroll, ERS, comms/cyber and ERP seats, but it would be a large share for a coastal seiner (≈1% of revenue).
- **NOK 25–45k per month per licence per vessel (= NOK 300–540k per year).** That is roughly 2.5–4× the high end of the "modern SaaS" estimates (~NOK 90–165k/yr at USD/NOK ≈ 11, [E]) and 4–7× YMS360's top tier. I read it as **either a multi-module enterprise bundle** (maintenance + procurement + QHSE + crew on one vendor), **or pricing that includes onboard servers, support and hosting**, or **a mix-up between per-vessel and per-fleet prices**. **Action:** get 2–3 anonymised invoices during primary market research before building Step 16 on this number.
- **The Mintra datapoint** (NOK 365k ARR for one Norwegian well-boat operator, probably 8–15 vessels [E]) implies roughly NOK 25–45k per vessel per year for crew/HR/payroll. If the NOK 850k contract value includes the first year's ARR, the remaining ≈NOK 485k is one-off implementation, about **1.3× ARR** [E].

### 2c. Best-estimate price table (Norwegian market, per vessel per year, excl. VAT)

| Product type | Low (SMB / coastal) | Typical (mid-fleet 15–70 m) | Enterprise / top | Confidence | Basis |
|---|---|---|---|---|---|
| **PMS** (maintenance + spares) | NOK 15–40k | NOK 50–120k | NOK 150–300k | Medium-low | YMS $3.6–7.8k/yr; SaaS $8–15k [R]; founder data |
| **QHSE / ISM / documents** | NOK 5–25k (Landax-type, spread over the fleet) | NOK 25–60k | NOK 80–150k | Medium | Landax prices [V]; Docmap/TM QHSE [E] |
| **Crew / rotation / payroll (incl. lott)** | NOK 10–20k | NOK 25–45k | NOK 60–100k | Medium | Mintra ARR [V] + fleet-size assumption |
| **ERS / VMS (catch log)** | NOK 1–4k (NorVMS) + satcom | NOK 10–30k (integrated trawler ERS) | NOK 40k+ | Medium (low end) / Low (high end) | NorVMS [V]; high end [E] |
| **Emissions / fuel & CO₂-compensation reporting** | NOK 0–10k | NOK 10–30k | NOK 50k | Low | Weak demand for fishing; [E] |
| **Full suite** (PMS + QHSE + crew + procurement + docs) | NOK 60–120k | NOK 150–300k | **NOK 300–600k** (matches founder data) | Medium | Sum of the modules above plus founder data |
| **Implementation / onboarding** | NOK 10–30k per vessel | NOK 50–150k per fleet | 1–1.5× ARR | Medium-low | Mintra [V]; SaaS blogs [R] |

**Implication for Step 16 [E]:** a fishing-native all-in-one priced at **NOK 8–15k per vessel per month (NOK ~100–180k/yr)** would undercut the reported enterprise stack by 60–80% and still sit above generic cloud PMS. A light tier for coastal 11–21 m boats at **NOK 1.5–4k per month** would compete with PreMaster-via-consultant and Landax.

---

## 3. Recent switches and selections (Norway/Nordics, ~2019–2026)

| When | Who | Chose | Why (as stated) | Source |
|---|---|---|---|---|
| Jun 2026 | **Brim hf.** (Icelandic fishing group) | Moved from on-prem Wisefish to **Wisefish SaaS** | Automatic updates, standardisation, same trusted provider | [Wisefish](https://www.wisefish.com/blog/brim-moves-to-saas-with-wisefish) [V] |
| Nov 2024 | **Rederiet Stenersen** (18 tankers, Bergen) | **BASSnet SaaS** after evaluating 6 vendors | All-in-one, AI, Azure hosting and cybersecurity, "future-proof" | [HSN](https://www.hellenicshippingnews.com/?p=1063691) [V] |
| Jan 2024 | **Norled** (ferries) | Mintra **OCS HR Shift Planner** | Rotation/shift optimisation | [Mintra](https://mintra.com/insights-and-news/16-01-24/norled-optimises-its-operations-with-mintras-ocs-hr-shift-planner) [V] |
| Nov 2024 | Belgian fishing fleet (38 of 59 vessels) | **VISTools** dashboards | Real-time catch, fuel and price data | [Fiskerforum](https://fiskerforum.com/digital-tools-ishing-fleet-management/) [V] |
| Dec 2021 | Norwegian well-boat operator (unnamed) | **Mintra OCS HR** (SaaS) | Crew management; Mintra now has "all major well-boat operators" | [Mintra](https://mintra.com/insights-and-news/14-12-21/well-boat-contract-adds-to-mintra-arr-pipeline) [V] |
| n.d. (~2021–22) | **DESS Aquaculture Shipping** (12 aqua vessels) | **SERTICA** | Office–vessel data sync, maintenance, procurement, HSQE | [MarineLink](https://www.marinelink.com/news/implement-shipping429030) [R] |
| Mar 2022 | Danish pelagic group (name paywalled) | "bring fleet into digital age" | Paywalled | [Undercurrent](https://undercurrentnews.com/2022/03/28/danish-pelagic-group-to-bring-fleet-into-digital-age) [?] |
| n.d. | **UMMS Norway** | **VesselMan** | Technical projects | [VesselMan](https://www.vesselman.com/news/umms-norway-enter-into-an-agreement-with-vesselman) [V] |

**What the missing evidence tells us.** I found no public press release in the last five years of a Norwegian *fishing* company switching PMS/fleet system. Two explanations fit [E]: (a) fishing groups don't issue press releases about IT, and (b) switching is rare because data (maintenance history, SFI trees) is locked in. Nautech's PreMaster CSV import attacks exactly that lock-in. The most useful switch intelligence will come from the founders' own interviews.

---

## 4. M&A and consolidation in maritime software

| Year | Deal | Value (if public) | Source |
|---|---|---|---|
| 2012 | Volaris (Constellation) acquires SpecTec (AMOS) | n/d | [Mergr](https://mergr.com/spectec-group-holdings-acquired-by-volaris-group) |
| 2017 | Lloyd's Register buys Hanseaticsoft (CFM) | n/d | [LR](https://www.lr.org/en-us/latest-news/hanseaticsoft-investment-announcement/) |
| ~2017 | ChartCo acquires Docmap | n/d | [MarineLink](https://www.marinelink.com/amp/news/acquires-chartco-docmap424015) [R] |
| ~2019 | Riverside-backed Mintra combines with OCS HR (Trondheim) | n/d | [Riverside](https://riversidecompany.com/currents/riverside-and-mintra-add-a-crew-member/) |
| 2019–20 | Seagull + Videotel → Ocean Technologies Group (Oakley); Seagull buys majority of Tero Marine (TM Master) | n/d | [Oakley](https://www.oakleycapital.com/our-companies/ocean-technologies-group/), [OceanNews](https://oceannews.com/?p=52872) |
| 2020 | Accel-KKR takes majority of NAVTOR (Egersund). NAVTOR later buys Voyager Worldwide (2023) and Masterloop (2024) | n/d | [Accel-KKR](https://accel-kkr.com/portfolio/navtor), [Mergr](https://mergr.com/company/navtor) |
| 2020 | Arribatec buys IB Marine (InfoShip) | €1.6m | [marine.arribatec](https://marine.arribatec.com/ib-acquired-by-arribatec/) |
| 2021 | RINA acquires Logimatic (SERTICA) | n/d (~€6m revenue) | [Maritime Executive](https://maritime-executive.com/article/rina-acquires-leading-software-company-logimatic-solutions) |
| 2022 | Veson acquires Q88 | n/d | [AJOT](https://www.ajot.com/news/veson-nautical-acquires-q88) |
| 2022 | LR acquires OneOcean (ChartCo + Marine Press + Docmap) | n/d | [Maritime Executive](https://maritime-executive.com/article/lr-adds-to-digital-portfolio-with-acquisition-of-oneocean) |
| 2023 | Kpler acquires MarineTraffic + FleetMon | n/d | [ship-technology](https://www.ship-technology.com/news/kpler-acquisition-spire-maritime/) |
| 2023 | Marcura (Marlin Equity) acquires ShipServ | n/d | [Splash247](https://splash247.com/marcura-acquires-shipserv/) |
| 2024 | Ferd/Minerva takes Mintra private (>90%) | n/d | [Inderes](https://www.inderes.dk/en/releases/mntr-compulsory-acquisition-of-shares-in-mintra-holding-as-and-mandatory-notifications-of-trade) |
| 2024 (Sept) | Star Information Systems + Premas (PreMaster) alliance/merger, backed by Longship | n/d | [HSN](https://www.hellenicshippingnews.com/star-information-systems-and-premas-seal-landmark-strategic-alliance/) |
| 2024 (Sept–Nov) | Lloyd's Register acquires Ocean Technologies Group (TM Master, COMPAS, Seagull, Videotel; ~17k vessels) | Oakley's share of proceeds ≈ £50m at a 2.7× multiple (total EV undisclosed) | [Investegate](https://investegate.co.uk/announcement/rns/oakley-capital-investments-ltd-di---oci/oakley-agrees-sale-of-ocean-to-lloyds-register/8393501) |
| 2025 (Jan) | Marcura acquires VesselMan (Norway) | n/d | [Cruise Industry News](https://cruiseindustrynews.com/cruise-news/2025/01/marcura-acquires-vesselman) |
| 2025 | Kpler completes Spire Maritime acquisition | **$241m** | [GovConWire](https://www.govconwire.com/?p=330904) |
| 2025 (Mar) | Star IS acquires Arribatec Marine | **~NOK 25m** | [TipRanks](https://www.tipranks.com/news/company-announcements/arribatec-divests-marine-unit-to-star-information-systems) |
| 2025 (Aug) | Star IS acquires Sharecat | n/d | [Container News](https://container-news.com/star-information-systems-acquires-sharecat/) |
| 2025 (Oct) | LR merges LR OneOcean + OTG into **OneOcean** | – | [OneOcean](https://www.oneocean.com/insights/oneocean-unveiled-to-unite-maritime-digital-and-training-services) |

**Pattern [E].** Buyers are class societies (LR, RINA; DNV owns ShipManager), PE-backed roll-ups (Longship/Star, Marlin/Marcura, Accel-KKR/NAVTOR, Constellation) and data platforms (Kpler, Veson). Two things follow. (1) There is a clear **exit path** for a vertical maritime SaaS with sticky vessel data. (2) The **fishing niche has not been consolidated yet**, apart from Star+PreMas, which makes Star/Longship the natural acquirer of, or rival to, Nautech.

---

## 5. Positioning map

### Axes chosen
- **X-axis: generic shipping ← → fishing-native.** Does the product understand ERS/catch logbook, quotas, landing notes (sluttseddel), lott/crew-share settlement, CO₂-compensation fuel documentation, seasonal fishery rotations and Norwegian-language small-crew workflows?
- **Y-axis: legacy/on-prem/consultant-heavy ↓ ↑ modern cloud, mobile, self-serve.** Is it quick to onboard (days, not months), priced per vessel with no server, and usable by a skipper on a phone with poor connectivity?

I picked these two because Norwegian fishing operators run 5–15 person crews without shore IT departments, and their compliance pain is Fiskeridirektoratet plus Sjøfartsdirektoratet (SMS below 500 GT, ISM at ≥500 GT, [V] [Sdir](https://www.sdir.no/naringsfartoy/fartoystyper/fiskefartoy/sikkerhetsstyringssystem-og-ism-for-fiskefartoy/)), not charterers or vetting.

```
                         MODERN CLOUD / SELF-SERVE
                                   ^
   Hanseaticsoft CFM   Mespas      |                 [ WHITE SPACE: NAUTECH ]
   Navatom   Maritime Optima       |        Wisefish (ERP: quota/lott, no PMS/ISM)
   Zero44 / Siglar                 |    NorVMS / Sailorsmate (ERS only, small boats)
   Kongsberg Vessel Insight        |        PreMaster 3.0 (moving up, 2026) --^
   BASSnet SaaS   OCS HR (Mintra)  |
 GENERIC <-------------------------+-------------------------------> FISHING-NATIVE
 SHIPPING   SERTICA   DNV ShipMgr  |        PreMaster 2.x (+ Sirkel consultancy)
   TM Master / OneOcean (LR)       |        Dualog eCatch / iFisk / eFangst (ERS)
   AMOS   Star IPS   Docmap        |        Maritech (shore-side trade)
   EG Landax (generic HSE)         |
                                   v
                    LEGACY / ON-PREM / CONSULTANT-HEAVY
```
*Placements are judgment calls [E] based on the profiles in section 1.*

### White space for Nautech
**A fishing-native operations system that is cloud/mobile-first and ties together the jobs fishing operators currently spread across 4–6 vendors.** Those jobs are PMS (with a PreMaster import), SMS/ISM, crew rotation with lott/payroll, catch/quota/landing-note views on top of ERS/VMS data, CO₂-compensation fuel documentation, and certificates. The target is 15–70 m vessels in fleets of 1–15. Nobody in the top-right quadrant covers maintenance *and* catch economics. Wisefish has quota and lott but no PMS or ISM. PreMaster has PMS and ISM but no catch economics, and is only now going cloud. What Nautech can credibly claim is: **"one login for the skipper, the chief engineer and the rederi office, built by people who sail on these boats, at a fraction of a stacked enterprise suite."**

### Top 5 threats
1. **PreMas + Star (Longship).** An incumbent in fishing, owning the Sirkel-type consultant channel, with PE money. Premaster 3.0 cloud launched at Nor-Fishing 2026 directly targets Nautech's pitch. They could add ERS/quota features or buy a small ERS vendor.
2. **Lloyd's Register's OneOcean bundle** (TM Master + Docmap + CFM + COMPAS crew + Seagull training). It can bundle-price PMS, ISM, crew and training for the larger Norwegian trawler and pelagic groups, and it already has relationships through offshore sister companies.
3. **Switching costs and risk aversion.** Years of maintenance history, class survey links and ISM documents make CFOs reluctant, and no public fishing switches appeared in five years. Cyber incidents (the DNV Jan 2023 attack) raise the trust bar for a zero-customer startup. SOC2/ISO 27001-style evidence and offline-first design are prerequisites.
4. **Adjacent fishing-data platforms moving into operations.** Mintra OCS HR (≈800 Norwegian vessels) could add lott. Wisefish (quota, catch, crew settlement) could enter Norway. Maritech owns shore-side trade data. ERS vendors (Dualog) sit on catch data and on vessel IT.
5. **Small market and regulatory gatekeeping.** The addressable base is only ~450 vessels ≥15 m [V]. Getting ERS vendor approval from Fiskeridirektoratet (or relying on integrations) and handling class/ISM acceptance take time and money. Meanwhile regulation (CO₂ tax, ERS rule changes such as J-177-2025, [Fiskeridir](https://www.fiskeridir.no/yrkesfiske/j-meldinger/j-177-2025)) keeps shifting requirements.

---

## 6. Open questions for primary market research
- Collect 2–3 real invoices or contracts per product type (Step 16) to test the NOK 25–45k/month-per-licence figure.
- Which ERS vendor do target vessels use, and would they accept Nautech *reading* ERS data instead of replacing ERS?
- How much of the NOK 500k stack is PMS vs crew/payroll vs comms/cyber vs ERP?
- Does PreMaster 3.0 include an import/export path, and what does it cost? (A mystery-shop quote is recommended.)
- Who signs off on the purchase: rederi CFO, technical superintendent or skipper-owner?
