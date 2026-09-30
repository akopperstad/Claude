# Prospect database: Norwegian fishing vessel owners (≥ 15 m)

File: `prospects-fishing.csv`, one row per owner company (legal owner in first link of the vessel register). Built 2026-09-30.

## Sources (all retrieved 2026-09-30)

- **Vessels:** Fiskeridirektoratet Fartøyregisteret open API, `https://api.fiskeridir.no/vessel-api/api/v1/vessels?length_gte=15` (active register, live; licence NLOD / Fdir data licence). This gives name, registration mark, call sign, IMO, length, GT (`tonnage`), build year, municipality code and owner org.nr. It returned 430 active vessels ≥ 15 m owned by 361 companies.
- **Municipality/county names:** mapped from the Fiskeridirektoratet open dataset *Fartøy og eier i første eierledd* (31.12.2025 snapshot, [fiskeridir.no open data](https://www.fiskeridir.no/Tall-og-analyse/AApne-data/Fiskere-fartoey-og-fisketillatelser)). That snapshot had 439 vessels ≥ 15 m and 366 owners. The difference from the live API reflects sales and scrapping during 2026.
- **Company data:** Brønnøysund Enhetsregisteret API (`/enhetsregisteret/api/enheter/{orgnr}` and `/roller`): address, NACE, employees, the `erIKonsern` flag, daglig leder and styreleder.
- **Revenue:** Regnskapsregisteret API (`/regnskapsregisteret/regnskap/{orgnr}`), `sumDriftsinntekter` for the latest filed year, mostly 2025. These are company accounts, not consolidated group accounts.
- The file holds only public business-register data: no private e-mail addresses, phone numbers or birth dates.

## Method

- Vessels ≥ 15 m are counted per owner; `flag_ge28m` marks owners with at least one vessel ≥ 28 m.
- **`group_guess` (a guess, not verified ownership):** owners are clustered when they share the same daglig leder or styreleder (matched on name plus birth date internally), or when they share a distinctive first name word and the same address municipality. `group_basis` says why. The file has 266 buying-unit clusters from 361 companies, and 58 clusters contain more than one company.
- **Tier** is based on group-level vessel counts and the owner's county (Brreg business address, falling back to the vessel-register county):
  - **A:** Møre og Romsdal or Vestland, with 1–10 vessels ≥ 15 m in the group and at least one ≥ 28 m.
  - **B:** the same region with only 15–28 m vessels, or another county with the Tier A size profile.
  - **C:** everything else, such as other counties with only 15–28 m vessels.
- **Conflicts:** `conflict=yes` and `tier=EXCLUDED` mark owners linked to Lerøy/Lerøy Havfisk or DeepOcean, the founders' employers. The link is by name, or by sharing a daglig leder or styreleder with Lerøy Havfisk AS, Lerøy Seafood Group ASA or DeepOcean. Four Lerøy Havfisk companies were found: Nordland Havfiske, Finnmark Havfiske, Hammerfest Industrifiske and Finnmark Kystfiske (styreleder Eldar Kåre Farstad). No DeepOcean-linked vessel owners were found.

## Counts

| Tier | Owner companies | Buying units (groups) |
|---|---|---|
| A | 136 | 96 |
| B | 111 | 80 |
| C | 110 | 93 |
| EXCLUDED | 4 | 1 |
| **Total** | **361** | 266 |

Total vessels: 430 are ≥ 15 m, and 262 of those are ≥ 28 m.

| County (owner) | A | B | C | Excluded | Total |
|---|---|---|---|---|---|
| Møre og Romsdal | 77 | 8 | 0 | 0 | 85 |
| Nordland | 0 | 30 | 48 | 1 | 79 |
| Vestland | 59 | 10 | 0 | 0 | 69 |
| Troms | 0 | 24 | 25 | 0 | 49 |
| Finnmark | 0 | 8 | 15 | 3 | 26 |
| Agder | 0 | 13 | 7 | 0 | 20 |
| Rogaland | 0 | 8 | 8 | 0 | 16 |
| Trøndelag | 0 | 8 | 5 | 0 | 13 |
| Østfold | 0 | 2 | 1 | 0 | 3 |
| Vestfold | 0 | 0 | 1 | 0 | 1 |

## Top 40 Tier A buying units

Ranked by the summed latest revenue of the Tier A companies in each unit. Revenue is in NOK millions. A group name ending in "(guess)" is a clustering guess.

| # | Owner / group | Companies (orgnr) | Vessels ≥15 m / ≥28 m | Main vessels | Municipality | Revenue MNOK | Daglig leder | Styreleder |
|---|---|---|---|---|---|---|---|---|
| 1 | K HALSTENSEN AS group (guess) | K HALSTENSEN AS (979356749); HALSTENSEN GRANIT AS (998367654); HALSTENSEN PRAWNS AS (927941147); GARDAR AS (980836177) | 5 / 5 | SLAATTERØY; MANON; GRANIT; KARINE H; GARDAR | Austevoll | 785 | Christian Strand Halstensen; Inge Andreas Halstensen | Asle Halstensen; Christian Strand Halstensen |
| 2 | EROS AS group (guess) | RAMOEN AS (920767443); EROS AS (977390176); POLARBRIS AS (987364718); ATLANTIC LONGLINE AS (987364637); TRAAL AS (991713204) | 5 / 5 | RAMOEN; EROS; POLARBRIS; ATLANTIC; HERØYFJORD | Ørsta | 763 | Kjell-Gunnar Hoddevik; Per Magne Eggesbø | Per Magne Eggesbø |
| 3 | HAVBRYN AS group (guess) | HAVBRYN AS (874528722); FISKESKJER AS (980863778) | 2 / 2 | HAVBRYN; FISKESKJER | Haram | 445 | Astrid Louise Strand; Solveig Strand | Ole-Reinhart Pettersen Notø |
| 4 | HARDHAUS AS | HARDHAUS AS (976547691) | 2 / 2 | HARDHAUS; HARVEST | Austevoll | 430 | Inge Møgster | Nina Møgster |
| 5 | ROALDSNES AS group (guess) | NORDIC WILDFISH OCEAN AS (821406862); NORDIC WILDFISH AS (921881347); ROALDSNES AS (821881242) | 3 / 3 | MOLNES; SYNES; ROALDNES | Giske | 428 | Anders Bjørnerem; Jan Harald Roaldsnes | Per Einar Storhaug |
| 6 | BLUEWILD OCEAN II AS group (guess) | BLUEWILD OCEAN I AS (919942312); BLUEWILD OCEAN II AS (919588403); BLUEWILD AS (921800428) | 3 / 2 | HALTENTRÅL; ECOFIVE; KRUTT | Ålesund | 407 | Tore Harald Roaldsnes | Helge Kittilsen |
| 7 | HAVSKJER AS group (guess) | HAVSKJER AS (967882410); HAVFISK AS (990475318); HAVSTÅL AS (999222889) | 3 / 3 | HAVSKJER; HAVFISK; HAVSTÅL | Ålesund | 344 | Henning Tangen Veibust | Henning Tangen Veibust; Per Arne Bjørge |
| 8 | FRØYANES AS group (guess) | FRØYANES AS (925358819); VESTKAPP AS (998639522); FRØYANES JUNIOR AS (960541499) | 3 / 3 | FRØYANES; VESTKAPP; FRØYANES JUNIOR | Stad | 329 | Bjørnar André Årvik; Stig Tore Ervik | Stig Tore Ervik |
| 9 | NORDNES AS group (guess) | NORDNES AS (979397720); NORDNES KYSTFISKE AS (914524822); TORG INVEST AS (981548108) | 4 / 2 | NORDSTAR; NORDØRN; NORDBAS; VOLLEROSA | Giske | 322 | Tormund Grimstad | Mats Rørvik Grimstad; Stein Ove Østvik; Tormund Grimstad |
| 10 | LEINEBRIS AS group (guess) | LEINEBRIS AS (997254015); SJØVÆR HAVFISKE AS (985781109); CARISMA VIKING AS (989101633); URVAAG AS (956455235) | 4 / 4 | LEINEBRIS; SJØVÆR; O.HUSBY; LEINEBRIS JR | Herøy | 310 | Jorunn Marie Husby Nekstad; Paul Harald Leinebø | Ingvald-John Husby; Paul Harald Leinebø; Åge Uran |
| 11 | TEIGE REDERI AS group (guess) | TEIGE REDERI AS (998540151); SKÅRUNGEN II AS (923489010) | 2 / 2 | SUNNY LADY; ELDJARN | Hareid | 295 | Ragnhild Cathrine Østervold; Sigurd Strand Teige | Jan Terje Teige; Sigurd Strand Teige |
| 12 | LIBAS AS | LIBAS AS (992569565) | 3 / 3 | LIBAS; LIAFJORD; LIGRUNN II | Øygarden | 281 | Gunhild Lie Skålevik | Peder Lie |
| 13 | NYE GISKE HAVFISKE AS | NYE GISKE HAVFISKE AS (919714905) | 1 / 1 | ATLANTIC VIKING | Giske | 266 | Bjørn Ståle Giske | Henrik Grung |
| 14 | EIDESVÅG AS group (guess) | ELISABETH AS (980891259); BØMMELBAS AS (996144054); EIDESVÅG AS (993367613) | 3 / 3 | ELISABETH; BØMMELBAS; BØMMELFJORD | Bømlo | 264 | Lars Magne Eidesvik | Lars Magne Eidesvik |
| 15 | LHN FISKERI AS group (guess) | LHN FISKERI AS (927395142); HOVDEN SENIOR AS (974536986); FREKØY VIKING AS (937815522) | 3 / 3 | K. NYVOLL; HOVDEN VIKING; FREKØY VIKING | Giske | 259 | Lars Harald Nyvoll; Ole Theodor Hovden | Eldar Per Zahl |
| 16 | KOWI AS group (guess) | KOWI AS (932731789); KORALHAV AS (995476436) | 3 / 3 | KORALEN; KORALHAV; KAP FARVEL | Haram | 255 | Ronny Espen Sunde Nogva | Nils Arve Engeset |
| 17 | REMØY HAVFISKE AS group (guess) | REMØY HAVFISKE AS (831156872); FOSNAVAAG HAVFISKE AS (914908485) | 2 / 2 | REMØY; NORDSJØBAS | Herøy | 251 | Kristin Remøy; Olav Remøy | Olav Remøy |
| 18 | OCEAN VENTURE AS | OCEAN VENTURE AS (914145538) | 2 / 2 | KINGFISHER; MUNIN | Bergen | 245 | John Olav Økland | John Olav Økland |
| 19 | CHRISTINA E AS | CHRISTINA E AS (924565470) | 1 / 1 | CHRISTINA E | Herøy | 221 | Rita Christina Sævik | Espen Ervik |
| 20 | OMA KYST AS | OMA KYST AS (925705152) | 2 / 2 | RADEK; HARGO | Austevoll | 219 | Malene Forland Sekkingstad | Monica Tefre |
| 21 | GERDA MARIE AS group (guess) | GERDA MARIE AS (986996257); HAVGLANS AS (997038991) | 2 / 2 | GERDA MARIE; HAVGLANS | Austevoll | 217 | Einar Carsten Sæle; Lars Johan Mælingen | Håkon Sigbjørn Skorpen; Lars Johan Mælingen |
| 22 | OPILIO AS | OPILIO AS (914047757) | 2 / 2 | VIMA; NORTHEASTERN | Austevoll | 213 | Åsmund Klokkeide Birkeland | Asle Birkeland |
| 23 | HARGUN HAVFISKE AS | HARGUN HAVFISKE AS (989859811) | 1 / 1 | HARGUN | Bjørnafjorden | 206 | Jonny Garvik | Jonny Garvik |
| 24 | NESBAKK AS group (guess) | NESBAKK AS (925833495); ALNES REDERI AS (921419694); KVALNES AS (998237394) | 3 / 2 | NESBAKK; BAUTAR; KVALNES | Giske | 204 | Leif Steinar Alnes; Severin Dyb Alnes | Helge Monsen Kvalsvik; Leif Steinar Alnes |
| 25 | HARALDSON AS group (guess) | GRYTAFJORD AS (983755577); HARALDSON AS (921232888) | 2 / 2 | HARHAUG I; KASFJORD | Haram | 201 | Jarle Engeset | Narve Jan Engeset |
| 26 | NORDERVEG AS group (guess) | NORDERVEG AS (922144028); REGINA FISK AS (992709952) | 2 / 2 | OLA RYGGEFJORD; SKIPSHOLMEN | Austevoll | 200 | Ola Christian Olsen | Ola Christian Olsen |
| 27 | KNESTER AS group (guess) | KNESTER AS (964195935); STEINEVIK AS (920422381) | 2 / 2 | KNESTER; STEINEVIK | Austevoll | 199 | Kai Eliassen | Andreas Kiplesund |
| 28 | ANDREA L AS group (guess) | ANDREA L AS (917915628); REBEKKA L AS (993559180) | 2 / 1 | ANDREA L; VICTORIA MAY | Kinn | 194 | Agnar Johan Lyng | Agnar Johan Lyng |
| 29 | HAVDRØN AS | HAVDRØN AS (982165504) | 2 / 2 | HAVDRØN; KROSSØY | Bergen | 179 | Kristian Sandtorv | Kristian Sandtorv |
| 30 | STRAND SENIOR AS group (guess) | STRAND SENIOR AS (980863743); AS HAVSTRAND (929386868) | 2 / 2 | STRAND SENIOR; HAVSTRAND | Ålesund | 172 | Janne Grethe Strand Aasnæs | Hans Aasnæs |
| 31 | KINGS-BAY AS | KINGS-BAY AS (917838607) | 1 / 1 | KINGS BAY | Herøy | 170 | Bjørn Sævik | Petter Jon Sævik |
| 32 | Gunnar Langva AS | Gunnar Langva AS (976547268) | 1 / 1 | GUNNAR LANGVA | Ålesund | 147 | Gunnar Svein Longva | Bjarne Stig Longva |
| 33 | FJELLMØY AS | FJELLMØY AS (923164162) | 1 / 1 | LORAN | Giske | 141 | Trond Olav Dyb | Staale Otto Dyb |
| 34 | SMARAGD AS | SMARAGD AS (926791311) | 1 / 1 | SMARAGD | Herøy | 137 | Kristin Smådal Hide | Hallvar Ulfstein |
| 35 | VEIDAR AS | VEIDAR AS (929873939) | 1 / 1 | VEIDAR | Giske | 137 | Sindre Johan Dyb | Sindre Johan Dyb |
| 36 | TEIGENES AS | TEIGENES AS (921159358) | 1 / 1 | TEIGENES | Herøy | 134 | Terje Teige | Knut T Teige |
| 37 | BRENNHOLM AS | BRENNHOLM AS (990026521) | 1 / 1 | BRENNHOLM | Bergen | 129 | Lisbeth Beate Sandtorv | Lisbeth Beate Sandtorv |
| 38 | HERØYHAV AS | HERØYHAV AS (925240176) | 1 / 1 | HERØYHAV | Herøy | 128 | Ronald Ervik | Rolf-Jarle Ervik |
| 39 | VENDLA AS | VENDLA AS (982165407) | 1 / 1 | VENDLA | Austevoll | 126 | Ragnhild Astrid Østervold | Alf Ove Østervold |
| 40 | H ØSTERVOLD AS | H ØSTERVOLD AS (932265591) | 1 / 1 | H ØSTERVOLD | Austevoll | 117 | Anne Lise Østervold | Tom Sagvaag |

## Data caveats

- **Legal owner is not the same as the buyer.** Only the first ownership link is shown, and Brreg does not publish shareholders. Groups that hold each vessel in a separate AS company with different managers are *not* merged: large pelagic and whitefish groups (e.g. holdings in Austevoll or Ålesund) may appear as several "independent" Tier A rows. Verify with Aksjonærregisteret (shareholder register) or Proff before outreach.
- **`group_guess` is heuristic.** A shared professional chair or accountant-style styreleder can cause false merges; a Senja cluster of 10 companies looks like one. Different managers per subsidiary cause missed merges.
- **Revenue** is company-level (not group-level) for the latest filed year: 344 companies filed 2025, 4 filed older years and 13 have no accounts on file. Revenue in vessel-owning companies can be small when catch is sold through a sister company.
- **Daglig leder** is missing for 41 companies because small AS companies may drop it, in which case the styreleder is the contact. Employees are as registered in Aa-registeret (Norway's employer/employee register) via Brreg and often understate crew who are employed elsewhere or paid as share-fishers.
- **The vessel register lists fishing vessels only.** Length is *største lengde* (overall length). GT uses the rule shown in the register (LC/OC). Snapshot and live counts differ slightly (439 vs 430 vessels) because of 2026 changes.
- **The Lerøy conflict check only follows shared management roles.** Lerøy minority stakes (e.g. in coastal or pelagic owners) are not detected. Check the conflict list manually before campaigns. Also note that Lerøy's parent Austevoll Seafood is controlled by the Møgster family. Møgster-linked owners such as Hardhaus AS (DL Inge Møgster) are *not* flagged, but are politically sensitive for a Lerøy Havfisk employee. Decide whether to treat them as conflicts.
- **This is for B2B prospecting only:** public register data, legitimate interest. Contact people in their company roles, and respect the reservation register (Reservasjonsregisteret) for telemarketing.
