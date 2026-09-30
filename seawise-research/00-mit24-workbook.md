# Seawise AS — Disciplined Entrepreneurship (MIT 24 steps) workbook

Living document. Status is an outside-in assessment based on seawise.no, nautech.no, the public front-end code and the Brønnøysund register, as of 2026-09-30. Founders should overwrite with ground truth.

Legend: ✅ done / evidence exists · 🟡 partial / implicit · ❌ not done / not visible

## Theme 1 — Who is your customer?

| # | Step | Status | Outside-in observation | Open questions |
|---|------|--------|------------------------|----------------|
| 1 | Market segmentation | 🟡 | Site speaks to "operators" broadly; product covers fishing, offshore, cargo, charter, aquaculture-adjacent — all at once. | List every segment you *could* serve. For each: who is the end user, what pain, how urgent, how much money, who else serves them? |
| 2 | Select beachhead market | ❌ | "Norwegian operators, 1–20 vessels" is a filter, not a beachhead. A beachhead is one homogeneous group that buys the same way and talks to each other. | If you could only sell to ONE segment for 18 months, which? (Candidates: Sunnmøre whitefish/pelagic vessels, aquaculture service vessels, small OSV owners.) |
| 3 | Build end-user profile | 🟡 | Founders *are* the end user (ex-chief engineers). Strong intuition, but risk of designing for yourselves. | Demographics, daily routine, tools on board today, what they fear in an audit, what makes them look good to the reder? |
| 4 | TAM for beachhead | ❌ | See `02-market-sizing.md` (in progress). | Number of vessels × realistic NOK/vessel/year in the chosen beachhead only. |
| 5 | Profile the persona | ❌ | No named persona. | Pick one real person (existing pilot user) and describe them in detail: name, age, vessel, boss, KPIs, what they read, whom they trust. |
| 6 | Full life-cycle use case | 🟡 | Pilot program describes onboarding → migration → daily use → reviews. Missing: how they discover, decide, pay, renew, and expand. | Walk one customer from "first hears of Nautech" to "renews year 2". Where does it stall? |
| 7 | High-level product spec | ✅ | 12 modules, well specified (almost too much). | Which 2–3 modules does the beachhead persona actually need on day 1? |
| 8 | Quantify value proposition | ❌ | Site claims "compliance reporting in hours, not weeks" but no numbers from pilots. | Before/after hours per month? Avoided detentions/fines? Fewer systems cancelled (NOK)? Measure it in pilots now. |
| 9 | Identify next 10 customers | ❌ | See `05-gtm-prospects.md` (in progress). | Ten named companies + named person + have they said "yes, I'd pay if…"? |
| 10 | Define your core | 🟡 | Tech is replicable (Lovable/Supabase build is fast for anyone). Real candidates for core: (a) seafarer credibility + Sunnmøre network, (b) fishery + maritime in one system (rare), (c) regulatory advisory feeding product. | What can a competitor with 10× money NOT copy in 2 years? |
| 11 | Chart competitive position | ❌ | See `01-competitors.md` (in progress). Name collisions: seawise.com (vessel data/MRV), SEAwise EU project, Nautech Ltd (boat IoT). | Pick 2 axes your persona cares about most; plot yourselves vs PreMaster, TM Master, Excel, DNV ShipManager, etc. |

## Theme 2 — How does the customer acquire your product?

| # | Step | Status | Observation | Open questions |
|---|------|--------|-------------|----------------|
| 12 | Decision-Making Unit (DMU) | ❌ | See FølgOpp slide: the most enthusiastic (skipper, maskinsjef) are rarely the decision-makers (reder/daglig leder, økonomisjef). | Per prospect: champion, end user, economic buyer, technical/IT veto, influencers (revisor, class, insurer), purchasing. Who can say no? |
| 13 | Process to acquire a paying customer | ❌ | Pilot funnel exists; paid conversion path unclear. | Steps, time and people involved from first meeting to signed contract. Is there a procurement/IT security review? |
| 14 | Follow-on markets TAM | 🟡 | Nordic/EU fishing & offshore implied. | Which segment is next, and does it reuse the same core and references? |

## Theme 3 — How do you make money?

| # | Step | Status | Observation | Open questions |
|---|------|--------|-------------|----------------|
| 15 | Business model | 🟡 | SaaS per-module monthly + advisory. | Does advisory feed the SaaS or distract from it? Implementation fee? |
| 16 | Pricing framework | ❌ | No public prices. | Price anchored on value (step 8) not cost. Per vessel? Per module? What does the customer pay today across all tools? |
| 17 | Lifetime value (LTV) | ❌ | See `06-cfo-financials.md` (in progress). | Expected lifetime (years), gross margin, expansion. |
| 18 | Map sales process | ❌ | Founder-led. | Short/medium/long-term sales process; when do you hire the first seller? |
| 19 | Cost of customer acquisition (COCA) | ❌ | Unknown. | Founder hours per signed customer × hourly cost + travel/fairs. Target LTV:COCA ≥ 3. |

## Theme 4 — How do you design and build?

| # | Step | Status | Observation | Open questions |
|---|------|--------|-------------|----------------|
| 20 | Key assumptions | ❌ | Not written down. | E.g. "Operators will replace PreMaster", "reder pays per vessel ≥ NOK X/month", "crews use a web app with poor connectivity at sea", "a 2-person company is trusted with critical ops data". |
| 21 | Test key assumptions | 🟡 | Pilots are the test bed — but only if the assumptions are explicit. | Which cheap experiment kills or confirms each assumption within 30 days? |
| 22 | Minimum Viable Business Product (MVBP) | 🟡 | Product is broader than an MVBP. | Smallest version a customer *pays for*, *uses*, and *gives feedback on*. |
| 23 | Show dogs eat the dog food | ❌ | No public paying customer / case. | Get first paid invoice (even small), first renewal, first referral. |
| 24 | Product plan | 🟡 | Roadmap co-owned with pilots. | What gets cut? What is post-beachhead? |

## Input from ÅKP session, day 1–2 (batch 1 of screenshots)

1. **CitationLab: entity optimisation for AI.** Assistants like ChatGPT answer from signals about your brand, so you need:
   - one consistent name
   - schema.org markup
   - an explicit statement of your category
   - differentiating attributes
   - links to known entities.
   - *Seawise gaps:*
     - The brand name is shared with other companies.
     - The solution pages render empty to crawlers (the site is a single-page app with no server-side rendering).
     - The schema.org markup is minimal: an Organization entry with only an address.
     - There are no FAQ, Product or SoftwareApplication entries.
     - There is no `sameAs` linking to LinkedIn, the Brønnøysund register or ÅKP.
2. **Sales reflections:**
   - Commercial competence is scarce, and relationships matter more as AI spreads.
   - Invest where you have an edge.
   - Be careful with agent contracts.
   - How hard you push in sales matters.
   - Going from 15–20% market share is easier than winning the first 5%. That argues for dominating one niche first (step 2).
3. **FølgOpp, "Salgets 4 vegger":** foundation, processes, talents and culture, built from 22 building blocks.
4. **The most enthusiastic are often not the decision-makers.**
   - Top management asks *why*: ROI and risk.
   - Middle management asks *how/why*: control and safe operations.
   - Users ask *what/how many*: features.
   - For Seawise this is step 12. Founders who come from the engine room will naturally sell features to users.

## Input from ÅKP session, batch 2 (FølgOpp / CEB, "The Anatomy of a World Class Sales Organization")

5. **"Are we talking to the right people?"** The FølgOpp sales process has four stages:
   1. Find and qualify prospects.
   2. Make contact and uncover needs.
   3. Present the solution and close.
   4. Follow up and service.
   - Within stage 1: identify the *users* and the *decision-makers* at each customer, then choose a strategy for opening a dialogue with each. This is MIT step 12 (the DMU) and step 13 (the process to acquire a paying customer).
6. **"Complex sales demand more."** Nautech is a complex sale on every one of the slide's dimensions:
   - Many variables play out over a long time.
   - Many people are involved.
   - The risk is uncertain, and a wrong purchase is costly: ops data, audits, class.
   - The seller must challenge established truths ("PreMaster + Excel works fine").
   - *Implication:* expect sales cycles of 6–12 months, multi-threaded deals, and a structured process. Enthusiasm alone won't close them.
7. **What drives customer loyalty?** Loyalty in the CEB study of about 5,000 B2B buyers broke down as:
   - Sales experience: 53%
   - Company and brand: 19%
   - Product and service quality: 19%
   - Value/price: 9%
   - Buyers valued a seller who:
     - offers unique perspectives
     - helps them navigate alternatives
     - helps them avoid "landmines"
     - educates them on new issues
     - is easy to buy from
     - brings broad support across the customer's organisation.
   - *Implication:* Seawise's advisory arm (regulation, class, ETS, ERS) is literally the "avoid landmines / teach me something new" engine. Sell insight first and software second. The founders' credibility at sea is the brand while the brand is unknown.
8. **Five seller profiles** (share of the sample):
   - Hard worker: 21%
   - Challenger: 27%
   - Relationship builder: 21%
   - Lone wolf: 18%
   - Problem solver: 14%
   - In complex B2B sales, Challengers dominate among top performers (Dixon & Adamson). Relationship builders underperform, contrary to intuition.
   - *Question:* which profile is Arne, and which is Kristian? Engineers often default to "problem solver", the weakest profile in complex sales.
9. **SODUS meeting discipline:**
   - **S**pørsmål (questions): open questions about pains and gains.
   - **O**ppsummeringer (summaries): recap regularly.
   - **D**el-aksepter (partial acceptances): get the customer to agree to each pain and its consequence.
   - **U**tfordringer (challenges): surface concerns and opponents, especially at executive level.
   - **S**tyring videre (steering ahead): agree next steps, owners and deadlines, and a clear path to a signed contract.
   - *Use:* write SODUS notes for every pilot/prospect meeting in a CRM from day 1.
