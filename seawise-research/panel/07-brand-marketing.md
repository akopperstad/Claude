# 07 – Brand and marketing panel: naming, positioning, website, content, events

**Panel seat:** B2B brand and demand-generation (industrial and maritime) · **Date:** 2026-09-30 · **Stance:** resistance, not agreement.

**Bottom line.** Seawise has no brand problem yet, because it has no brand. It has a **credibility problem** and an **entity problem**:
- The website claims a pilot and live crews that don't exist.
- Two names split an already tiny set of signals.
- Neither Google nor ChatGPT can read the site.

For the next 90 days, marketing has one job: **book 30 discovery interviews and 3 design partners.** It is not there to build "awareness", and it is not there to launch a 12-module "maritime operating system".

---

## 1. Brand architecture: one name, and it is Seawise

### What buyers and AI assistants find today
- **Searching "Seawise" returns other things.** The top results are the supertanker *Seawise Giant* and a Wikipedia disambiguation page ([Wikipedia](https://en.wikipedia.org/wiki/Seawise), [Hellenic Shipping News](https://www.hellenicshippingnews.com/worlds-largest-ship-which-survived-a-war-met-its-end-in-india/)).
  - "Seawise AS Fosnavåg Nautech" returns Havyard and the tanker. There is nothing about the company.
  - Searching the founders' names returns only genealogy records.
  - **To the outside world, the company does not exist yet.**
- **"Seawise" name collisions:**
  - *SeaWise*, NetWave's maritime "big data" platform covering performance monitoring and **MRV reporting**. This overlaps directly with the Emissions module ([Digital Ship](https://thedigitalship.com/news/maritime-software/netwave-gets-seawise/)).
  - The EU H2020 **SEAwise** fisheries-management project, which ran 2021–Sept 2025. It sits in your beachhead's vocabulary ([Univ. Tartu](https://ut.ee/en/content/european-seawise-project-make-ecosystem-based-fisheries-management-operational)).
  - **seawise.com redirects to a GoDaddy "for sale" lander** (checked by curl today), so the .com is dormant and buyable.
  - Brreg shows no conflicting Norwegian software company. There are phonetic neighbours: SEAWIZ AS (freight forwarding) and SEAWEIS AS (leisure rental).
- **"Nautech" name collisions** are worse, because they sit in your own market:
  - **iPS | Nautech Services**, a Jersey maritime and offshore crewing agency. It places around 100 seafarers a month, including in the North Sea ([Seacareer](https://www.seacareer.com/jobs/nautech-services/), [engineering.com](https://jobs.engineering.com/jobs/company/253541/IPS-nautech-services)). It is registered in Norway as a NUF (org.nr 979 241 038) for "utleie av arbeidskraft på/til båter". Your Crew module would be selling to the offshore HR managers who already know that name.
  - **Nautech Ltd**, marine IoT and "smart-boat" dashboards, exhibiting at METS ([METSTRADE](https://www.metstrade.com/exhibitors/nautech-ltd/products), [NauticExpo](https://www.nauticexpo.com/soc/nautech-ltd-4597475.html)).
  - **Nautech NZ** (nautech.com), an electronics manufacturer.
  - **NAUTECH MARITIME CORPORATION**, which holds US trademark filings ([Justia](https://trademarks.justia.com/owners/nautech-maritime-corporation-194354); the page returned 403 to me, so status is unverified).
  - "Nautech" is also close to descriptive ("nautical technology"). That makes it **weak to register and hard to enforce** in classes 9 and 42.
- **Trademark registers.** Patentstyret (search.patentstyret.no), EUIPO TMview and WIPO Brand DB are JavaScript apps that I could not query automatically. **Someone has to run the searches by hand this week:** SEAWISE and NAUTECH, classes 9, 42 and 35, in NO, EU and WIPO. Allow one hour. I have not verified whether live registrations exist.
- **The markup is already confused.** nautech.no declares Nautech as a separate schema.org **Organization**, not as a product of Seawise AS, and nothing links the two sites. The pages are `lang="en"` although the market is Norwegian, and seawise.no has no canonical tag. A crawler requesting `/solutions/maintenance` with the GPTBot user agent gets the homepage title and an empty `<div id="root">`.

### Decision
**Retire Nautech as a public brand. Seawise becomes the one master brand, for company and product.**
- The product is simply "Seawise". Modules take descriptors: *Seawise Vedlikehold*, *Seawise Mannskap*, *Seawise Fangst*.
- 301-redirect nautech.no to seawise.no/plattform, and keep the domain.
- Advisory becomes "Seawise Rådgivning", clearly secondary (see §6).

**Why:**
1. With zero customers, renaming costs as little now as it ever will.
2. A two-person company cannot feed two entities. Every post, article, press mention and `sameAs` link should build **one** knowledge-graph node.
3. The Seawise collisions are mostly in other categories (a 1979 tanker, a finished EU project, a dormant 2016 product). The Nautech collisions are **live and in the crew and marine-tech space**.
4. Customers sign contracts, data processing agreements (DPAs) and invoices with Seawise AS anyway.

**Rejected alternatives:**
- **"Nautech by Seawise".** Endorsed-brand architecture is for portfolios. For you it doubles the work and keeps the weak mark.
- **A new coined name.** It would be defensible, but it costs 2–4 weeks of founder attention you don't have.

**The exception:** if the manual search finds a *live* SEAWISE registration in class 9 or 42 in NO or the EU, pick a coined name **before** signing the first design partner. Don't debate it after that.

**Actions:**
- File a SEAWISE word mark at Patentstyret in classes 9 and 42 (a few thousand NOK) once the search is clean.
- Price seawise.com and buy it only if it is under about NOK 15k. It is optional; seawise.no is fine for Norway.
- Stop using "Nautech™".

---

## 2. Positioning and messaging

### Category: use one buyers already budget for
Don't invent "maritime operating system" or "maritime ERP". Category design costs millions and years, and "ERP" triggers a 12-month IT procurement.
- Nobody Googles "maritime OS". Superintendents search *vedlikeholdssystem*, *PMS* and *planlagt vedlikehold*.
- Every Norwegian fishing vessel under 500 GT must have a documented maintenance system under **FOR-2016-12-16-1770 § 9**, audited with Sdir checklist KS-1260 (see `02-segmentation-and-thresholds.md`). That is a forced budget line.

**Category:** *Vedlikeholds- og driftssystem for fiskeflåten* / **"Planned maintenance and vessel compliance for fishing fleets."** Enter as a PMS and expand into crew, catch and emissions once you're inside. The 12 modules are the roadmap, not the headline.

**Watch out:** PreMaster launched *"Premaster 3.0 – one cloud platform for your entire fleet"* at Nor-Fishing 2026 (see `01-competitors.md`). "One platform, one database" is no longer a differentiator. Your difference is **who built it** and **fishing data next to technical data.**

### One-line positioning
- **NO:** *Seawise er vedlikeholds- og driftssystemet for fiskeflåten, bygd av maskinister som fortsatt går til sjøs. Vedlikehold, sertifikater, mannskap og fangstdata i ett system, laget for revisjon fra Sjøfartsdirektoratet.*
- **EN:** *Seawise is the maintenance and vessel-compliance system for fishing fleets, built by marine engineers who still go to sea. It puts maintenance, certificates, crew and catch data in one place, built for the audit.*

### Three proof points you can honestly claim today (zero customers)
1. **Built from the engine room, and still there.** Both founders are serving marine engineers, on whitefish trawlers and in subsea. Say "Norwegian whitefish trawlers". **Don't name Lerøy Havfisk or DeepOcean** without written consent, because it implies endorsement.
2. **Built around Norwegian rules, and you can show it.** Show three things in a live demo:
   - Every screen in the maintenance workflow maps to 1770 § 9, KS-1260 and ISM § 10, with SFI coding.
   - C188 rest hours for fishing crew.
   - Certificate expiry tracking.
3. **Fishing and technical data in one database.** Quota and catch sit next to maintenance, crew and costs. The PreMaster review found no ERS, quota or crew-share (lott) layer (01). This is demonstrable, not a promise.

**Only claim these after testing them:**
- "Import your PreMaster data": test it on a real export first.
- "Data stored in the EU": check the Supabase region.
- "Your data never trains AI": check the Lovable AI gateway terms.

### Messaging by persona (FølgOpp: why, how, what)

| Persona | Question they ask | NO | EN |
|---|---|---|---|
| **Reder / daglig leder** (economic buyer) | *Why? ROI and risk* | "Hvor mange system betaler du for per båt i dag, og hvor mange timer går med til å halde dei i hop? Vi reknar det ut saman med deg, gratis." | "How many systems do you pay for per vessel, and how many hours go into stitching them together? We'll calculate it with you, free." |
| **Teknisk sjef / inspektør** (evaluator, veto) | *How? Control and safe operations* | "Heile flåten sin vedlikehaldsstatus, sertifikat og avvik på éin skjerm, dokumentert slik revisor frå Sjøfartsdirektoratet spør etter." | "Fleet-wide maintenance status, certificates and deviations on one screen, documented the way the Sdir auditor asks for it." |
| **Maskinsjef / skipper** (champion, user) | *What? Less admin* | "Mindre dobbelføring. Ferdig jobb blir logga éin gong, ikkje i PMS, Excel og ein perm." | "Log it once, not in the PMS, a spreadsheet and a binder." |

**Rule:** the chief engineer gets you the meeting; the reder signs. Never finish a message to a champion without asking who else has to say yes.

### Website claims that are false or risky (fix within 48 hours)

I pulled these from the live JS bundle (`/assets/index-D4efaezl.js`). Markedsføringsloven § 3 and § 6 require documentation for factual claims and ban misleading ones.

| Claim on site | Problem | Replace with |
|---|---|---|
| "Nautech is live… the first crews are using it"; badge "First crews on board 2026"; NO badge "Første operatører i drift" | **False** | "MVP klar – vi søker 3 designpartnere for 2026/27" |
| Blog card **"Lessons from pilot 01 – what we learned in the first weeks on the water"** | Implies a pilot that never happened. **Worst item on the site** | Delete |
| "Compliance reporting in hours, not weeks" | Quantified and unsubstantiated | "Built to cut double entry. We will measure it with our design partners." |
| "Quotas tracked, ERS filed on time" / "ERS-rapportering" | Implies an approved ERS client. Only type-approved ERS software may file (02) | "Reads catch and quota data alongside maintenance and crew" (integration, not filing) |
| "Compliant with IHM and medical rules"; "trygge, sertifiserte og klare for inspeksjon" | A compliance guarantee | "Helps you keep track of…" |
| "Supported by Innovation Norway · ÅKP · hoppid.no" | ÅKP is fine. Keep Innovation Norway only if you hold a grant decision; keep hoppid only if you received money or formal support | "Deltar i ÅKPs inkubasjonsprogram" |
| "Sanntidsdata fra flåte…"; "AI-driven" | Real-time and AI claims with no offline mode, and AI via a third-party gateway | Remove "real-time". Name the AI data flow on the security page |
| "Built by engineers who came off the vessels" | Actually understates you: you are *still on* them | "…who still work on board" |

---

## 3. Website rebuild spec

**Architecture:**
- The marketing site and the app are separate. Put the app at `app.seawise.no`.
- Build the marketing site as a **static or SSR site** (Astro or Next.js SSG on Cloudflare Pages or Netlify), not a Lovable SPA.
  - If you must stay in Vite, add build-time prerendering (e.g. `vite-plugin-prerender` or react-snap).
- **Acceptance test:** `curl -A GPTBot https://seawise.no/plattform` returns the H1, body text and JSON-LD in the raw HTML.

**Technical basics:**
- `lang="nb"` by default, with an `/en/` mirror and `hreflang`.
- A unique title, description and canonical tag on every page.
- A sitemap that contains only real pages.
- robots.txt that explicitly allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended.
- A short `/llms.txt`: cheap, and harmless even if it does nothing.

**Pages (NO first, around 10 in total):**
1. **/** – Hero with the one-liner and the founders' faces. Three-point problem block, the three proof points, and the design-partner CTA.
2. **/plattform** – Three focus areas for fishing (Vedlikehold, Sertifikater & mannskap, Fangst & kvote). The other modules are listed with **honest status labels** ("I MVP" / "Under utvikling" / "Planlagt").
3. **/designpartner** – The main CTA. Show the terms openly:
   - 3 places, 6 months, a fixed low price or free in exchange for a monthly feedback session
   - a named reference right after success
   - full data export at any time
   - Form fields: name, company, number of vessels, current PMS. Plus a Calendly link.
4. **/om-oss** – Arne and Kristian: photos from the engine room, certificates held, years at sea, Herøy roots, org.nr, address, phone.
5. **/sikkerhet** – For a two-person company this page *is* the trust signal. Write it honestly:
   - hosting region, encryption, backups
   - subprocessors (Supabase, the AI gateway)
   - who at Seawise can see your data
   - DPA template for download
   - an exit guarantee: CSV/SFI export
   - what isn't ready yet (offline sync, SSO)
6. **/innsikt** and /innsikt/[slug] – Articles (§4). The main source of organic and AI citations.
7. **/sporsmal** – A visible FAQ (8–10 questions) that mirrors the FAQPage schema:
   - "Hva krever 1770 § 9?"
   - "Kan dere importere fra PreMaster?"
   - "Hva skjer om Seawise forsvinner?"
   - "Fungerer det uten dekning?"
8. **/radgivning** – One page only.
9. **/kontakt**, **/personvern**.

**Trust elements for a two-person company:**
- real names and faces, and a mobile number
- org.nr in the footer
- "Hva er ferdig / hva er ikke ferdig" on the roadmap page
- the ÅKP programme badge
- short founder video (60 s, filmed in an engine room with the employer's OK)
- data escrow or export promise
- **No stock photos, no fake logos, no invented metrics.**

### JSON-LD (paste into `<head>` on / and adapt per page; fill in the LinkedIn URLs)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seawise.no/#org",
      "name": "Seawise",
      "legalName": "SEAWISE AS",
      "url": "https://seawise.no/",
      "logo": "https://seawise.no/logo.png",
      "description": "Norsk programvareselskap fra Herøy som lager vedlikeholds- og driftssystem for fiskeflåten, bygd av maskinister som fortsatt går til sjøs.",
      "foundingDate": "2025-12-16",
      "identifier": {"@type": "PropertyValue", "propertyID": "Organisasjonsnummer (Brønnøysundregistrene)", "value": "936864694"},
      "address": {"@type": "PostalAddress", "streetAddress": "Dragsundflata 30", "postalCode": "6080", "addressLocality": "Gurskøy", "addressRegion": "Møre og Romsdal", "addressCountry": "NO"},
      "areaServed": {"@type": "Country", "name": "Norway"},
      "knowsAbout": ["Planned maintenance system (PMS)", "FOR-2016-12-16-1770 sikkerhetsstyring", "ISM Code", "SFI coding", "ILO C188 hours of rest", "ERS fangstrapportering", "EU MRV", "EU ETS"],
      "founder": [{"@id": "https://seawise.no/om-oss#arne"}, {"@id": "https://seawise.no/om-oss#kristian"}],
      "contactPoint": {"@type": "ContactPoint", "telephone": "+47 480 35 351", "email": "akopperstad@seawise.no", "contactType": "sales", "availableLanguage": ["nb", "nn", "en"]},
      "sameAs": [
        "https://virksomhet.brreg.no/nb/oppslag/enheter/936864694",
        "https://www.linkedin.com/company/REPLACE-seawise-as"
      ]
    },
    {
      "@type": "Person", "@id": "https://seawise.no/om-oss#arne",
      "name": "Arne Kopperstad", "jobTitle": "Daglig leder / CEO",
      "description": "Maskinist på norske hvitfisktrålere",
      "worksFor": {"@id": "https://seawise.no/#org"},
      "sameAs": ["https://www.linkedin.com/in/REPLACE-arne"]
    },
    {
      "@type": "Person", "@id": "https://seawise.no/om-oss#kristian",
      "name": "Kristian Kopperstad", "jobTitle": "COO og styreleder",
      "description": "Maskiningeniør i subsea-næringen",
      "worksFor": {"@id": "https://seawise.no/#org"},
      "sameAs": ["https://www.linkedin.com/in/REPLACE-kristian"]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://seawise.no/plattform#app",
      "name": "Seawise",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Planned maintenance and vessel compliance system for fishing vessels",
      "operatingSystem": "Web browser",
      "softwareVersion": "MVP",
      "inLanguage": ["nb", "en"],
      "url": "https://seawise.no/plattform",
      "publisher": {"@id": "https://seawise.no/#org"},
      "featureList": ["Planlagt vedlikehold med SFI-koding", "Sertifikat- og klasseoversikt", "Mannskap og hviletid (ILO C188)", "Fangst- og kvoteoversikt", "Avvik og ISM-dokumentasjon"],
      "audience": {"@type": "BusinessAudience", "audienceType": "Fiskebåtrederier og tekniske inspektører"}
    },
    {
      "@type": "FAQPage",
      "@id": "https://seawise.no/sporsmal#faq",
      "mainEntity": [
        {"@type": "Question", "name": "Må fiskefartøy under 500 BT ha et vedlikeholdssystem?",
         "acceptedAnswer": {"@type": "Answer", "text": "Ja. Forskrift om sikkerhetsstyring for mindre lasteskip, passasjerskip og fiskefartøy (FOR-2016-12-16-1770) § 9 krever at rederiet utvikler, følger opp og dokumenterer et vedlikeholdssystem tilpasset driften. Systemet kan være papir, men må dokumenteres."}},
        {"@type": "Question", "name": "Er Seawise i drift hos kunder i dag?",
         "acceptedAnswer": {"@type": "Answer", "text": "Nei. Seawise er et fungerende MVP, og vi søker tre designpartnere i fiskeflåten som vil forme produktet sammen med oss."}},
        {"@type": "Question", "name": "Hva skjer med dataene våre hvis vi slutter?",
         "acceptedAnswer": {"@type": "Answer", "text": "Du kan når som helst eksportere alle data i åpne formater (CSV med SFI-koder). Dataene tilhører rederiet."}}
      ]
    }
  ]
}
</script>
```

The FAQ answers **must also appear as visible text on the page**. Never add `aggregateRating` or `review` until real ones exist. Before publishing, check the Brreg `sameAs` URL format and run the page through Google's Rich Results Test.

---

## 4. The 90-day founder-led content and LinkedIn plan

**Goal (the only KPIs that count):**
- 30 discovery interviews held
- 3 design-partner LOIs
- a list of about 150 named people in the decision-making unit (DMU): reder, teknisk sjef, maskinsjef

Followers and likes are not KPIs.

**Personal brand, "engineers from the engine room":**
- Post from the founders' personal profiles. The company page only reshares; B2B reach on LinkedIn sits with people.
- **Arne** is the voice of the fishing fleet (Norwegian, practical, from on board). **Kristian** is the voice of subsea and offshore rules (ETS/MRV, class).
- Tone: plain Norwegian, first person, specific numbers, zero buzzwords. Challenger style means *teach something the reader didn't know, with a consequence.*
- **Guardrails:**
  - Check both employers' social media policies before the first post.
  - Never use employer data. The NOK 5M licence figure stays confidential.
  - No photos showing identifiable vessels or crew without permission.

**Cadence (batched onshore to survive rotations):**
- Each founder: 2 posts a week (text plus one photo or document carousel) and 20 minutes a day commenting on posts by rederier, Fiskebåt, Sdir and Fiskeridir staff.
- One long article every two weeks on /innsikt, SSR-rendered and cross-posted as a LinkedIn article.
- A monthly LinkedIn newsletter, **"Frå maskinrommet"** (Arne as author, since newsletters notify all his connections).
- One lead magnet: **"KS-1260-sjekklista forklart for maskinsjefen"** (PDF).

**The 12 topics (each ends with the same CTA, see below):**
1. **1770 § 9: every fishing vessel under 500 GT has needed a documented maintenance system since 2017.** What KS-1260 actually asks, and the three things auditors find. (PMS audit landmines)
2. **Kystfiskeappen is gone and ERS covers every registered vessel from 1 Jan 2026.** What that means for 8–15 m boats, and why ERS data then dies in a silo ([Regjeringen](https://www.regjeringen.no/no/aktuelt/ny-side2/id3093188/), [under 8 m postponed](https://www.regjeringen.no/no/aktuelt/ny-side4/id3117999/)).
3. **Electronic reporting of persons on board fishing vessels.** What Fiskeridir's hearing means for crew admin ([hearing](https://www.fiskeridir.no/hoeringer/horing-om-krav-til-elektronisk-rapportering-om-personer-om-bord-i-fiskefartoy/)).
4. **EU ETS reaches offshore vessels over 5,000 GT in 2027, and MRV already covers 400–5,000 GT offshore since 2025.** The data you should be capturing now, and the Commission's small-ship review ([EC FAQ](https://climate.ec.europa.eu/areas-action/transport-decarbonisation/reducing-emissions-shipping-sector/faq-maritime-transport-eu-emissions-trading-system-ets_en), [Thommessen](https://www.thommessen.no/en/sustainability/database/regulation/eu-emission-trading-system-for-shipping)). *(Kristian)*
5. **The true cost of a legacy PMS isn't the licence.** A worksheet: licences + double entry + audit prep + onboarding of new crew. Offer to fill it in with the reader. This topic doubles as the discovery hook.
6. **"Why every chief engineer keeps an Excel sheet next to the PMS."** Engine-room honesty. Expect the highest engagement.
7. **ILO C188 rest hours on fishing vessels: the rule almost nobody logs properly.**
8. **Class PMS.A and DNV-CP-0206 for small rederier: when survey credit pays for itself** (02).
9. **Quota, catch and lott in three systems.** What it costs when the crew-share settlement is wrong.
10. **The ransomware attack on DNV ShipManager in 2023, and 7 questions to ask any maritime software vendor.** Answer them yourselves on /sikkerhet, including the unflattering ones.
11. **SFI coding 101 for new technical superintendents.** An evergreen search magnet.
12. **"We're building in public: 3 design-partner places, and here are the terms."** Post it in week 3, then repeat it in weeks 8 and 12 with what you have learned.

**Formats:**
- Text posts with one engine-room photo
- PDF carousels (checklists)
- 60–90 s phone videos filmed on board or on the quay
- A monthly 20-minute LinkedIn Live or Teams session: "Spør maskinisten: 1770-revisjon".

**Turning content into interviews:**
- Every piece ends with: *"Eg gjer 20 intervju med maskinsjefar og tekniske inspektørar denne hausten. Ingen demo, eg vil forstå korleis de løyser [X]. Svar 'ja' i kommentar eller DM."*
- Everyone who downloads the lead magnet gets a personal message from Arne within 24 hours asking for 20 minutes.
- Log every conversation with SODUS notes in a CRM. Even HubSpot Free is enough.
- Fill the empty target sheet with the names that engage.
- Interview first, demo only if they ask. Use `07-intervjuguide.md`.

**Weeks 1–2:** fix the site and profiles (headline: "Maskinist · bygger vedlikeholdssystem for fiskeflåten") and publish topics 6 and 1.
**Weeks 3–8:** topics 2, 3, 5, 7, 9 and 12, plus newsletter issues 1–2.
**Weeks 9–13:** topics 4, 8, 10 and 11, the Live session, and newsletter issue 3. Publish a "what 25 chief engineers told us" roundup, anonymised. **That roundup is your first press pitch.**

---

## 5. Events, media and community

**Principle: walk the floor, don't exhibit.** A stand costs NOK 100k+ and says "vendor". A founder with 15 pre-booked coffees says "peer".

- **Human Factors in Control Forum, Ålesund, 21–22 Oct 2026** (GCE Blue Maritime Cluster). The closest relevant event, with the OpenBridge and UX crowd. Attend ([ÅKP calendar](https://www.aakp.no/kalender/human-factors-in-control-forum---prelude-event/blue-maritime-cluster)).
  - If you really use the OpenBridge design guideline, say so publicly. That builds a relation to a known entity.
- **GCE Blue Maritime Cluster:**
  - Ask ÅKP for a 5-minute slot at a member meeting, and to be featured in its newsletter as an incubator company.
  - Ask for membership or listing on aakp.no. That becomes a `sameAs` link and a citation for AI assistants.
  - Target the Maritime Cluster Conference (Sept 2027) and Ocean Summit (March) ([BMC events](https://www.aakp.no/en/bluemaritimecluster/events)).
- **Fishing events:**
  - Sjømatdagene (January, Hell).
  - The annual meetings of Fiskebåt and Norges Fiskarlag: attend the fringe and dinners, not the stage.
  - **Aqua Nor, August 2027** (Trondheim), only if aquaculture service vessels become segment 2.
  - **Nor-Fishing, August 2028**: the first time to consider a stand, **with a customer on it**.
  - Confirm all dates on the organisers' sites.
- **Nor-Shipping, 7–11 June 2027**, Oslo and Lillestrøm ([Cruise & Ferry](https://www.cruiseandferry.net/articles/nor-shipping-2027)). Walk the floor, pre-book meetings with offshore technical managers, and join Team Norway side events for free.
- **Hyperlocal edge.** The Fosnavåg shipping cluster is within cycling distance: Olympic, Remøy, Havila and the Havyard legacy ([Wikipedia](https://en.wikipedia.org/wiki/Havyard_Group)). Hand-delivered coffee meetings beat any campaign.

**Media: get coverage cheaply by pitching insight, not a "startup launch":**
- **Vestlandsnytt and Sunnmørsposten.** An easy local story now: *"Brør frå Herøy byggjer programvare for fiskeflåten – søkjer tre rederi"*. It gives you a first indexed third-party mention for the entity graph.
- **Fiskeribladet and Kystmagasinet.**
  - A kronikk on topic 1 (1770 § 9) or topic 2 (ERS silo), signed "maskinist Arne Kopperstad".
  - Pitch the interview roundup (week 13) as news.
- **Skipsrevyen and Maritimt Magasin.** Technical guest articles (topics 8 and 10) are accepted more readily than company news.
- **Maskinisten (Det Norske Maskinistforbund).** Engine-room readers are exactly your champions. Offer a column.
- **iLaks:** only if you enter aquaculture. **E24 / Sysla:** only with a design-partner signing or a funding round. Don't burn the contact early.

---

## 6. Top 7 recommendations

1. **Within 48 hours, remove every false claim** (table in §2), especially "Lessons from pilot 01" and "first crews". One investor or grant officer finding it costs more than a year of content earns.
2. **One brand: Seawise.** Retire Nautech, redirect the domain, run the trademark search this week and file SEAWISE in classes 9 and 42.
3. **Narrow the category to the forced budget:** "vedlikeholds- og driftssystem for fiskeflåten". The 12 modules become the roadmap.
4. **Rebuild the marketing site as static or SSR**, with the JSON-LD above, an honest /sikkerhet page and /designpartner as the single CTA. Pass the curl-as-GPTBot test.
5. **Founder-led LinkedIn with an interview-booking CTA on every post.** KPIs: 30 interviews and 3 LOIs in 90 days.
6. **Borrow credibility.** ÅKP/BMC features, local press, a kronikk in Fiskeribladet, a column in Maskinisten. Each one is also a citation that AI assistants can pick up.
7. **Demote advisory to a door-opener.** Offer free "1770/KS-1260 health checks" that lead into interviews, not billable consulting that eats your 200 hours.

## Stop doing
- Saying "live", "pilot", "in operation" or "first crews" until a signed design partner is actually using it.
- Running two brands and two websites.
- Calling it a "maritime operating system / ERP for all vessels over X GT".
- Listing supporters or partners without a written basis. Stop using "Nautech™".
- Publishing module pages that crawlers see as empty; if the site can't be SSR-rendered this month, no-index them.
- Selling features to chief engineers and calling it pipeline. They open doors; rederier sign.
- Planning around an ASA co-development partner as your first marketing story. No listed group's procurement will put its name next to a two-person MVP whose website overstates reality. Earn the logo with a family rederi first.
- Buying stands, ads or agencies before you have 10 interviews on record.

---
*Sources are linked inline. Checked directly on 2026-09-30:*
- *curl of seawise.no and nautech.no, their JSON-LD, the JS bundle and the sitemaps*
- *the Brreg API (org.nr 936864694; NUF 979241038; SEAWIZ AS 928872483)*
- *the seawise.com redirect to GoDaddy's for-sale page*

*Not verified: live trademark registrations (the registers need manual search), and whether any Innovation Norway grant exists.*
