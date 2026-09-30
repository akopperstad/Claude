# Seawise AS: strategy roadmap (Disciplined Entrepreneurship, 24 steps)

**Starting point (Oct 2026):**
- Seawise AS is incorporated, and the IP question is cleared with both founders' employers.
- There is a website, a small LinkedIn page and a working MVP (Nautech).
- The founders have a list of all Norwegian vessel owners with contact persons believed to be in each company's decision-making unit (DMU).
- There are no customer interviews yet (beyond the founders themselves), no pilots, no revenue and no partners.
- Founder capacity is about 200 hours a week combined, plus Claude Code.

**Method:** Bill Aulet, *Disciplined Entrepreneurship* (MIT, 24 steps). For sales execution, the FølgOpp/CEB model from the ÅKP programme: the four-stage sales process, SODUS meeting discipline and Challenger insight selling.

**Rules of the road**
1. **Follow the order.** Each step's output is the next step's input. We may loop back, which Aulet expects, but we do not skip.
2. **Evidence over opinion.** A step is "done" only when its exit criteria are met with evidence from customers, not from the two of us.
3. **Gate reviews.** At the end of each theme, hold a 60-minute review with the ÅKP advisor (or another outside person) before moving on.
4. **Building freeze.** No new modules until step 22 (the minimum viable business product) defines what to build. Development time goes to stability, demos and the tools we need for discovery.
5. **Speed where speed is possible.** Desk work (analysis, sizing, documents, CRM setup, content) is done in hours to days with Claude. Customer conversations run at the customer's pace, and that sets the critical path.
6. **One source of truth.** This repository (`seawise-research/`) plus a CRM. Every conversation gets a note in the SODUS format.

---

## Phase 0: foundation (week 1: 5–11 Oct 2026)

| Task | Deliverable | Who / how |
|---|---|---|
| Make the website truthful: "MVP ready, seeking operators to shape it" | Updated seawise.no | Founders (Lovable) |
| Load the vessel-owner list into a CRM, with segment, fleet size, GT/length, region, DMU role per contact and source | CRM (HubSpot free or Pipedrive) | Claude can clean, dedupe and segment the list |
| Tag every contact with a DMU role: end user, champion, economic buyer, influencer, veto, purchasing | Tagged list | Founders + Claude |
| Set up interview and meeting templates (SODUS notes, the interview guide in `07-intervjuguide.md`) | Templates in the CRM | Claude |
| Weekly rhythm: Monday plan, Friday review (numbers: interviews booked, held, insights) | Recurring meeting, decision log | Founders |
| Background research: fleet segmentation, regulatory thresholds, competitors, pricing | `01-competitors.md`, `02-segmentation-and-thresholds.md` | Claude research agents (running) |

**Exit:** the CRM is live with the full list, a segment tag on every owner, and 30 interviews requested.

---

## Theme 1: Who is your customer? (steps 1–5 and 9–11, weeks 1–8)

### Step 1: Market segmentation (weeks 1–4)
- **Do:**
  - Brainstorm every possible segment. Candidates: whitefish trawlers, pelagic, autoline, coastal fishing 15–28 m, aquaculture service vessels, offshore/OSV/subsea, coastal cargo, passenger/ferries, tugs.
  - Use the vessel-owner list to count owners and vessels per segment.
  - Run **primary market research**: 25–30 interviews spread across segments and DMU roles (`07-intervjuguide.md`).
- **Deliverable:** a segmentation matrix (Aulet's rows: end user, application, benefits, lead customers, market characteristics, partners, size, competition, complementary assets). Also a scoring table against the step 1 criteria:
  - Is the customer well-funded?
  - Is it readily reachable by us?
  - Does it have a compelling reason to buy?
  - Can we deliver a whole product (with partners)?
  - Is there entrenched competition?
  - Would it give leverage to follow-on segments?
  - Does it fit our values and passion?
- **Exit:** at least 20 interviews held, covering at least 4 segments and all three DMU levels (users, the people who choose, the people who pay). The matrix is filled with interview evidence, not guesses.
- **Claude:** pre-fills the matrix from desk research, counts from the list, synthesises interview notes (pain frequency, spend, decision patterns) and scores the segments.

### Step 2: Select the beachhead market (week 4)
- **Do:** score 3–5 finalists and choose **one** beachhead. Aulet's test for a beachhead: customers buy the same product, have a similar sales cycle, and refer to each other ("word of mouth" within the segment).
- **Deliverable:** a one-page decision with the rationale and the runner-up segment.
- **Exit:** gate review with the ÅKP advisor.
- **Note:** a large "lighthouse" design partner can sit *inside* the beachhead, for example a large trawler group. A partner in a different segment is a distraction at this point.

### Step 3: Build the end-user profile (week 5)
- **Deliverable:** a profile of the typical end user in the beachhead: demographics, psychographics, what they fear, what they want, their daily routine, the tools they use today, the watering holes where they gather (Kystmagasinet, Fiskeribladet, Nor-Fishing, Fiskebåt meetings), and what makes them a hero to their boss.
- **Exit:** validated in at least 5 end-user interviews.

### Step 4: Calculate the total addressable market (TAM) for the beachhead (week 5)
- **Do:** bottom-up. Number of vessels (from the list) × realistic annual spend per vessel (from interviews and the pricing research). Cross-check top-down.
- **Deliverable:** TAM in NOK/year for the beachhead, with a low, base and high case and every assumption stated.
- **Exit:** the TAM is big enough to matter as a first step. Aulet's rule of thumb is roughly USD 20–100M/yr, but a Norwegian niche can be smaller if it clearly opens adjacent segments. Otherwise, go back to step 2.

### Step 5: Profile the persona (week 6)
- **Deliverable:** **one real person** from the interviews, who best represents the end user, described in depth. Include their purchasing criteria in priority order.
- **Exit:** everyone on the team (and Claude) can answer "what would [persona] think?"

### Step 9: Identify the next 10 customers (weeks 6–8)
Aulet places this step after 5–8. We start it early because the list is already here.
- **Do:** pick 10 named companies in the beachhead that match the persona, and go back to them with what you've learned.
- **Deliverable:** 10 named companies, each with a named persona-matching contact and their stated pain. For each, record whether they'd say *"If you had this, I'd consider buying"*.
- **Exit:** at least 10 contacts confirm the pain and agree to a follow-up.

### Step 10: Define your core (week 8)
- **Do:** decide what we can do that others can't easily copy. Candidates:
  - insider end-user knowledge that is current, not decades old
  - fishing plus maritime operations in one system
  - speed and a modern data model versus legacy systems
  - advisory as an insight engine.
- **Exit:** a one-sentence core, and an explanation of why it holds for more than 2 years.

### Step 11: Chart the competitive position (week 8)
- **Do:** take the persona's top 2 priorities as the axes, plot us versus the incumbents and versus doing nothing (Excel and paper).
- **Input:** `01-competitors.md`.
- **Exit:** a chart where we're clearly top-right for the persona, validated by at least 3 of the next-10 customers.

**GATE 1 (about week 8):** beachhead, persona, TAM, next-10 list, core and positioning. Only then do we move on.

---

## Theme 2: What can you do for your customer? (steps 6–8, weeks 8–10)

### Step 6: Full life-cycle use case (week 8)
- **Do:** trace how the persona experiences the product end to end:
  1. Learns they have a problem.
  2. Finds us.
  3. Evaluates.
  4. Buys.
  5. Installs and onboards.
  6. Uses it daily.
  7. Gets value.
  8. Pays.
  9. Buys more and refers others.
- **Exit:** reviewed with at least 3 of the next-10 customers.

### Step 7: High-level product specification (week 9)
- **Do:** make a visual brochure or mock-up of *what the beachhead needs*, not all 12 modules. The MVP already exists, so this is a scoping exercise: mark each module as keep, park or cut.
- **Exit:** at least 5 of the next-10 customers react and iterate on it.

### Step 8: Quantify the value proposition (week 10)
- **Do:** compare the "as-is" with the "possible" state in the persona's own metric: hours per month on reporting and maintenance paperwork, licence spend replaced, audit findings avoided, downtime.
- **Exit:** a single quantified claim that customers agree with, for example "saves X hours/month and NOK Y/vessel/year".

**GATE 2 (about week 10).**

---

## Theme 3: How does the customer acquire your product? (steps 12–14, weeks 10–12)

### Step 12: Map the DMU
- For the beachhead and each next-10 customer, identify:
  - the champion
  - the end user
  - the primary economic buyer
  - influencers: class society, insurer, auditor, flag state, IT
  - who holds veto power
  - purchasing.
- The list already has candidates; validate them in conversation.
- Remember the ÅKP slide: the most enthusiastic people are rarely the ones who decide.

### Step 13: Map the process to acquire a paying customer
- **Do:** list every step from first contact to a signed contract and a paid invoice: budget cycle, procurement, IT and security review, contract, legal. Note the time each step takes.
- **Output:** the expected length of the sales cycle and its bottlenecks.

### Step 14: Calculate the TAM for follow-on markets
- **Do:** size the next 2–3 segments, using the runner-up segments from step 2.

**GATE 3.**

---

## Theme 4: How do you make money? (steps 15–19, weeks 12–14)

### Step 15: Design the business model
- **Do:** choose the model: SaaS per vessel, per module, or tiered, plus implementation fee, plus advisory.
- **Decide:** the role of advisory. Recommendation: advisory is the Challenger insight engine and early cash, not a separate business.

### Step 16: Set the pricing framework
- **Do:** base prices on value (step 8) and willingness to pay, not on cost. Anchors:
  - The founders report incumbent spend of about NOK 500k per vessel per year in total, and competitor pricing of NOK 25–45k per month per vessel.
  - Test price points in interviews ("what would make this a no-brainer / too expensive?").

### Step 17: Calculate customer lifetime value (LTV)
- **Do:** expected lifetime × gross margin × expansion. Maritime systems tend to be sticky, so lifetimes of 5–10 years are plausible.

### Step 18: Map the sales process
- **Do:** plan the sales process for the short, medium and long term: founder-led now, then the first hire, then channels such as class societies, yards and ERS partners.

### Step 19: Calculate the cost of customer acquisition (COCA)
- **Do:** founder hours per won customer × hourly cost, plus travel, trade fairs and marketing.
- **Target:** LTV at least 3× COCA.

**GATE 4.**

---

## Theme 5: How do you design and build? (steps 20–24, weeks 14–20)

### Step 20: Identify key assumptions
- **Do:** list the 5–10 assumptions that would kill the business if wrong. Examples:
  - operators will switch from their incumbent system mid-contract
  - offline sync is good enough at sea
  - a 2-person company passes an IT or security review
  - the price holds.

### Step 21: Test key assumptions
- **Do:** one cheap experiment per assumption, each with a pass/fail criterion.

### Step 22: Define the minimum viable business product (MVBP)
- **Do:** define the smallest product that the customer **pays for**, **uses** and **gives feedback on**. This is where the building freeze lifts, and what goes into it is built at Claude speed.

### Step 23: Show that "the dogs will eat the dog food"
- **Do:** get paying customers, even at a pilot price, in writing: a signed LOI (letter of intent) or contract, an invoice, usage data, and a referral.
- **Exit:** at least 2–3 paying beachhead customers who use the product weekly.

### Step 24: Develop a product plan
- **Do:** set the roadmap beyond the MVBP. Map features to follow-on segments, and set the order for expanding into the second segment.

**GATE 5:** the business is ready for a pre-seed round and for Oppstartstilskudd 2 (see `04-funding-ecosystem.md`).

---

## Sales track (runs in parallel from week 1)

The FølgOpp/CEB four-stage process, mapped to the steps:

| FølgOpp stage | Now (steps 1–11) | Later (steps 12–23) |
|---|---|---|
| 1. Find and qualify prospects | Segment the list; identify users *and* decision-makers; plan how to open a dialogue with each | Next-10 plus a pipeline from the whole beachhead |
| 2. Make contact and uncover needs | Discovery interviews (Mom Test), not selling | Needs analysis with the DMU; quantify pain |
| 3. Present the solution and close | Not yet | Value-based proposal, LOI, paid pilot |
| 4. Follow-up and service | Send what we learned back to the people we interviewed (it builds the relationship) | Onboarding, weekly check-ins, references |

**Every meeting:** SODUS notes (spørsmål, oppsummeringer, del-aksepter, utfordringer, styring videre) with agreed next steps and dates.

**Selling style:** Challenger. Teach something new, such as the ETS, ERS or IHM deadlines and what they will cost the customer. Advisory content (short notes, a LinkedIn series) is the door opener. In the CEB research, the sales experience drove 53% of loyalty.

---

## Funding track (parallel, low effort)

| When | What |
|---|---|
| Now | hoppid.no adviser meeting (this unlocks the Herøy næringsfond); ÅKP incubator terms |
| After Gate 1 (Nov–Dec 2026) | Innovation Norway Oppstartstilskudd 1 (up to NOK 150k). The interview evidence makes the application strong |
| Q4 2026 / Q1 2027 | SkatteFUNN application for 2027 (requires the founders on payroll; R&D angle: AI and offline sync) |
| After Gate 5 (2027) | Pre-seed NOK 2–5M, then Oppstartstilskudd 2 |

---

## Scoreboard (reviewed every Friday)

| Metric | Target by week 4 | Week 8 | Week 14 | Week 20 |
|---|---|---|---|---|
| Interviews held (outside the founders' own companies) | 20 | 35 | 45 | 50+ |
| Of which with decision-makers (technical manager, owner) | 6 | 12 | 20 | 25 |
| Next-10 confirmed pain + follow-up | — | 10 | 10 | 10 |
| LOIs / paid pilots | — | — | 1–2 | 2–3 |
| Gates passed | 0 | 1 | 3–4 | 5 |

---

## Open question for the founders
- "The MIT guide to sales": which book or course do you mean? *Disciplined Entrepreneurship Startup Tactics* (Paul Cheek, MIT, 2024), or the FølgOpp/SEC material from ÅKP? Once we know, the sales track above will be aligned to it, step by step.
