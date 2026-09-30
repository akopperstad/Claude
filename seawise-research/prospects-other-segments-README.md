# Interview targets outside fishing (PLAN M1)

File: `prospects-other-segments.csv`, built 2026-09-30. It has one row per candidate company: 54 rows, including 3 excluded or flagged rows. Fishing is covered separately in `prospects-fishing.csv`.

It serves **M1** in `PLAN.md` (24 interviews). This file covers the 12 interviews outside fishing:

| Segment (`03` ID) | Interviews needed | Candidates listed |
|---|---|---|
| Wellboats (A1) | 3 | 10 (+1 excluded) |
| Aquaculture service ≥ 15 m (A4) + 1 harvest/feed (A3/A6) | 3 | 11 (+1 flagged) |
| Short-sea cargo (C1) | 2 | 11 |
| Small third-party ship managers (S14) | 2 | 10 |
| Redningsselskapet (S7) | 1 | 1 org, 4 target roles |
| Offshore control (O1/O3), non-DeepOcean | 1 | 8 (+1 excluded) |

## Top 3 per segment

| Segment | #1 | #2 | #3 |
|---|---|---|---|
| Wellboats | **Rostein AS** (976337026, Harøya, ~110 km). Family-owned; the largest independent wellboat owner; a new hybrid newbuild means a live system choice | **Trident Aqua Services** (932255693; Hareid hub, 25 km). More than 60 vessels; Intership/Aquaship signed with UniSea in Jun 2024, so this is an incumbent-satisfaction test | **Njord Aquashipping** (930814636, Frøya). 2 vessels plus 2 newbuilds; UniSea for HSEQ, with no PMS named; a greenfield PMS choice |
| Aquaculture service + harvest | **Volt Harvest Group** (818287712, Fosnavåg, ~3 km). 4 harvest vessels plus 1 under construction; Norwegian family group | **Charvest AS** (918747249, Herøy). Small service/harvest-boat owner with a 21 m newbuild due 2027 | **Napier AS** (921976011, Bømlo). Bought UniSea Maintenance in Apr 2025; learn why they chose it, the price and the switching pain |
| Short-sea cargo | **Egil Ulvan Rederi** (930722367, Trondheim). 6 ships; the styreleder is also teknisk sjef, so user and buyer are in one meeting | **Hagland Shipping** (934734890, Haugesund). Early adopter of UniSea Maintenance (Apr 2024); a small office | **GMI Rederi** (932378604, Ørsta, ~50 km). 2 hydrogen newbuilds with NOK 52.5m in state aid; **the vessel type is unverified** |
| Ship managers | **Havila Management** (888082212, Fosnavåg). Havila manages 6 of its 14 vessels for external owners; *check DeepOcean first* | **Sea Shipping AS** (930595543, Ulsteinvik office). Manages ~7 ROV/survey vessels on UniSea incl. Maintenance; *check charterers* | **Myklebusthaug Management** (945966149, Austrheim). ~17 vessels for several owners; switched vendor to UniSea Maindeck in Dec 2024 |
| Offshore control | **Island Offshore Management** (984285310, Ulsteinvik, 12 km). TM Master incumbent; tests the class-PMS gate | **Sanco Shipping** (976086058, Sande). Small office with 5 vessels | **Rem Offshore** (917668175, Fosnavåg). UniSea Self Assessment |
| Redningsselskapet | Seksjonsleder Teknisk Drift og Nybygg (Flåtesjef). The post was advertised in Mar 2026 and reports to the Maritim direktør | Seksjonsleder Flåtedrift | Teknisk inspektør (Vessel Manager) |

**Rule for Kristian:** under PLAN M1, at least 30% of interviews should be his. Aquaculture service, short-sea and offshore are where his technical background counts most.

## Exclusions and conflict flags (CLAUDE.md confidentiality rule)

- **Seistar Holding (981409450): EXCLUDED.** Lerøy Seafood Group owns 50% [EVIDENCE: [FishFarmingExpert](https://www.fishfarmingexpert.com/article/seigrunn-joins-the-queue-to-be-worlds-biggest-wellboat/)]. Its board member also sits on the Lerøy Midt and Lerøy Vest boards [EVIDENCE: Brreg roles].
- **Olympic Subsea (917772533): EXCLUDED.** Olympic Ares has been on DeepOcean time charter since Q1 2023 [EVIDENCE: [offshore-energy.biz](https://offshore-energy.biz/olympic-subsea-vessel-gets-to-work-with-deepocean)].
- **Nærøysund Aquaservice (985335699): CHECK.** A board member also sits on the Lerøy Midt AS board [EVIDENCE: Brreg roles]. Treat it as a conflict until the ownership is confirmed.
- **Havila Shipping / Havila Management: CAUTION.** Havila Phoenix was on a DeepOcean charter until a 2021 settlement [EVIDENCE: [Riviera](https://www.rivieramm.com/news-content-hub/settlement-reached-on-subsea-vessel-charterparty-termination-62625)]. Confirm there is no current DeepOcean charter before contact. The same applies to Sea Shipping's ROV vessels.
- Method: every candidate's Brreg roles were cross-checked against DeepOcean AS, DeepOcean Maritime, DeepOcean Shipping, DeepOcean Corporate, Lerøy Seafood Group ASA, Lerøy Midt and Lerøy Vest. Only shared auditors or accountants turned up apart from the cases above, and those were ignored.

## Sources (all retrieved 2026-09-30)

- **Company data:** Brønnøysund Enhetsregisteret API: `/enheter/{orgnr}` (address, NACE, employees) and `/enheter/{orgnr}/roller` (daglig leder, styreleder). Candidates were found by NACE code (50.201/50.202/50.203/03.300) in Møre og Romsdal, Vestland, Trøndelag and Rogaland, then by name search.
- **Revenue:** Regnskapsregisteret `/regnskapsregisteret/regnskap/{orgnr}`, `sumDriftsinntekter`, latest year (mostly 2025). These are **company accounts, not group accounts**. For ASA parents and holding companies (Rem, Bourbon, Golden Energy, Olympic, Eidesvik) the revenue is near zero because operations sit in subsidiaries. Redningsselskapet is not served by the API (an association), so see its [2024 annual report](https://rs.no/content/uploads/2025/06/RS_ÅrsOgBaerekraftsrap2024.pdf).
- **Current PMS:** vendor press releases on unisea.no (Napier, Njord Aquashipping, Intership/Aquaship, Hagland, Arriva, Sea Shipping, Myklebusthaug, Norwest, Stödig, Fjord Shipping, Rem Offshore, Rán Offshore, Eidesvik); Digital Ship (Eidsvaag on TM Master); and `03`/`01` in this folder for offshore TM Master users. Nothing public was found for AMOS, BASS, PreMaster or SERTICA at these candidates.
- **Fleet:** iLaks, Salmon Business, Baird Maritime, company websites and MagicPort owner pages. MagicPort counts only IMO-registered hulls it links to the company, so treat its counts as rough.
- **Roles and titles:** titles only, taken from job ads (finn.no) and vendor press releases. **No private phone numbers or e-mail addresses were collected.**

## Caveats

1. **Class-PMS status is an ASSUMPTION for every row.** No DNV Vessel Register lookup was done. Test: for the top 3 per segment, look up each IMO in DNV Vessel Register before the interview (M2 task in PLAN "This week").
2. **Distances** are rough road km from Fosnavåg, not routed [ASSUMPTION]. Note that Færøy AS is in Herøy **Nordland** (kommunenr 1818), not Herøy Møre.
3. **Fleet counts** mix years (for example, the service-vessel counts come from 2018 iLaks rankings). Vessel names are given only where a source named them. "not collected" means not looked up, not that there are none.
4. **The GMI Rederi vessel type is unverified** (the TU article is paywalled). Confirm it before booking.
5. Several Brreg entities are only part of a group (Trident, Frøy, AQS, Hordalaks, Brønnbåt Nord). The `priority_reason` column names the sister entities.
6. Revenue is not EBIT. The wellboat margins in `03` come from iLaks.

## New findings to feed back into `01` / `03`

- **UniSea is spreading fast into Seawise's white space.** In 2024–26 it signed aquaculture operators (Napier, Njord, Intership/Aquaship), short-sea owners (Hagland, Arriva) and small managers (Myklebusthaug, Norwest, Fjord Shipping, Stödig, Sea Shipping). Several of them took the PMS module. This strengthens the `03` note that UniSea is a more direct threat than PreMaster in aquaculture and cargo. **Fix:** use 3–4 of these UniSea customers as "why did you choose UniSea, and what did it cost?" interviews (owner: Arne, by 15 Nov 2026, M1).
- **Moen Marin sells its own maintenance system, mLink, for aquaculture vessels** (launched 2017; Norwegian-language app) [EVIDENCE: [iLaks](https://ilaks.no/nytt-vedlikeholdssystem-for-havbruksnaeringen/)]. It is a competitor, not a target, and it is missing from `01`. **Fix:** add it to `01` and ask A4 interviewees whether they use it (owner: Claude, next `01` update).

## QA gate

- **Contradictions with the folder:** none found. The "Sølvtrans, Trident, Frøy majority foreign-owned" point matches `03`. `03` names Trident as a wellboat operator; it is in fact a merger of Aquaship, Intership and FSV that also runs service, feed and harvest vessels.
- **Scope:** Møre, Vestland and Trøndelag were preferred as asked. Far-north and Rogaland candidates are kept at lower rank, not dropped.
- **PLAN consistency:** the segment split matches M1 (the offshore slot is non-DeepOcean, and the A4 row includes one harvest/feed slot).
