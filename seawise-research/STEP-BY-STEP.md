# Seawise: step-by-step plan

This builds on:
- MIT Disciplined Entrepreneurship (Aulet, 24 steps)
- *Startup Tactics* (Cheek)
- the ÅKP slides: FølgOpp 4-stage sales, SODUS, the DMU pyramid, complex sales, 53% of loyalty from the sales experience, seller profiles, and CitationLab on AI visibility
- the expert panel and all research in `seawise-research/`.

The milestone IDs match `PLAN.md`.

---

## Phase 0: Foundation (week 1, 5–11 Oct), M0

| Do | How | Output |
|---|---|---|
| Make the website truthful | Remove "first crews", "pilot 01", "ERS filed", and the Innovation Norway line unless the grant allows it. New tagline: "Seawise – vedlikeholdssystem for skip, bygget av maskinister" | Credible first impression |
| Secure the company | Lawyer: written IP waivers and loyalty advice. Holding companies plus a shareholder agreement (vesting, deadlock). Trademark search for SEAWISE | Investor-ready company |
| Set up the sales machine | CRM (HubSpot free). Import `prospects-fishing.csv` plus the 214-company list. Fields: segment, DMU role, class-PMS yes/no, current system, warm contact | One pipeline |
| AI visibility (CitationLab slide) | One name everywhere. schema.org JSON-LD (ready in `panel/07`). Links to Brønnøysund, ÅKP, Innovation Norway, LinkedIn | AI assistants find and describe Seawise correctly |

## Phase 1: Know the customer (weeks 2–7), MIT steps 1–5, 20–21, M1–M2b

| Do | How | Output |
|---|---|---|
| Segment (step 1) | 20 interviews across 4 segments: fishing 8, wellboats/fish carriers 4, offshore/subsea 4, short-sea/tankers 4. Arne 70%, Kristian 30% | Segmentation matrix filled with real answers |
| Talk to the whole DMU (pyramid slide) | In each segment, talk to **users** (skipper, chief engineer: *how/what*), **middle managers** (technical manager: *how/why*, control, safe operations) and **top management** (reder: *why*, ROI, risk) | Know who uses, who chooses, who pays |
| Interview well (FølgOpp stage 2 + SODUS) | Laptop closed. Ask about the past, not about the product (`07-intervjuguide.md`). SODUS notes in the CRM the same day. Record the current system, its price, and class-PMS status | Pains, prices and decision paths in the customers' own words |
| Choose the beachhead (step 2), **Gate 1 on 22 Nov** at ÅKP ScaleUp | Score segments on money, reachability, reason to buy, competition, and fit with us. Pick one | One market, backed by evidence |
| Profile, size, persona (steps 3–5) | One real person as the persona. TAM = vessels in the segment × the price they pay today | A clear target customer and market size |
| Key assumptions (steps 20–21) | List the 5 that would kill us, with one cheap test each | Risks turned into tests |

**Content engine (Startup Tactics, CitationLab):** 2 LinkedIn posts a week each, "engineers from the engine room". Topics: rule 1770, maintenance audits, the real cost of legacy PMS. Every post ends with "Can I ask you 5 questions?". Goal: 10 of the 20 interviews come inbound.

## Phase 2: Build the offer (weeks 7–10), steps 6–13, 15–16, M3, M4a

| Do | How | Output |
|---|---|---|
| Life-cycle use case (step 6) | Map discovery → buy → migrate → daily use → renewal for the persona | The customer journey |
| Product spec, cut to fit (step 7) | Keep only the modules the beachhead asked for; the rest go behind feature flags | A focused product |
| Quantify value (step 8) | Before/after in the customer's own numbers: hours, NOK, audit findings | "Saves X hours and NOK Y per vessel" |
| Next 10 customers (step 9) | 10 named companies and persons from the interviews, each confirming the pain | Warm pipeline |
| Core and position (steps 10–11) | Core: built by current seafarers, migration in 10 days, modern and cloud. Plot us vs PreMaster, TM Master, Excel on the persona's top 2 criteria | Clear differentiation |
| DMU and buying process (steps 12–13) | Per customer: champion, economic buyer, veto holder (IT, class), budget timing | A mapped path to a signature |
| Price (steps 15–16) | Anchor on what they pay today (PreMaster about 16k per month, TM Master about 100k per year). Test price bands in follow-up meetings | A tested price |
| Secure product (M4a) | Claude agents build: own stack, tenant isolation, MFA, audit log, demo tenant | Pilot-safe product |

## Phase 3: Sell pilots (weeks 10–21), steps 17–19, 22–23, M4b–M7

**Complex sale (slide):** many people, long process, uncertain risk. So sell like a Challenger: teach the customer something new.

| Do | How | Output |
|---|---|---|
| Door opener | "1770-sjekk": a paid review of their maintenance system, NOK 25–40k | Paid access and insight |
| Offer (FølgOpp stage 3) | Paid pilot NOK 45k, 90 days, up to 3 vessels, credited against year 1. Written success criteria. Auto-conversion. Refund if we fail our obligations | Low-risk yes for the customer |
| Remove switching risk | Migration done by us, parallel run, data-export guarantee | "Safe to switch" |
| Letters of intent | Ask every warm prospect for a signed LOI | 5 LOIs unlock NOK 750k from Innovation Norway (M7) |
| MVBP (step 22) | Build only what the pilots need: offline sign-off, basic procurement, export | Product customers pay for |
| Follow-up and service (FølgOpp stage 4, the 53% slide) | Weekly check-in, direct phone line, fast fixes. The sales experience is the product | Loyalty and references |
| Unit economics (steps 17–19) | LTV = years × margin; COCA = founder hours per win. Target LTV ≥ 3× COCA | Proof the model works |

**Targets:** 1 paid pilot by 15 Jan 2027, 2 by 28 Feb, 5 LOIs by March.

## Phase 4: Prove and fund (Mar–Sep 2027), step 23, M8–M10

| Do | How | Output |
|---|---|---|
| Convert pilots to paying customers | Success criteria met → the 12-month subscription starts | First ARR |
| Case study | Numbers from pilot 1, published with permission | Sales material |
| Innovation Norway NOK 750k | LOIs plus paid pilots as proof | Funding |
| DNV type approval | Readiness from now. DNV meeting in December. Apply in March when 2 class-PMS customers pay for a parallel run | Access to classed vessels |
| Pre-seed NOK 2.5–3.5M | Launch May 2027 with 3–5 paying customers. Sunnmøre angels plus one fund | Founders quit (gates in PLAN.md) |
| First sales hire | When the founder-led process is repeatable | Scale |

## Phase 5: Scale (2027–2030), step 24

1. Win the beachhead: 10+ customers, 30 vessels.
2. Next segments, reusing the same core and references (wellboats, offshore, others that scored at Gate 1). Type approval opens classed vessels.
3. Nordic and North Atlantic.
4. All vessels over 15 m, with the full 12-module platform.

## Weekly rhythm

- **Monday:** plan the week (targets from the scoreboard).
- **Friday:** update the scoreboard in `PLAN.md`: interviews, decision-makers met, offers, LOIs, pilots, NOK.
- **Monthly:** ÅKP ScaleUp session used as the gate review.
- **Roles:** Arne sells (Challenger), Kristian builds and delivers (problem-solver). Both interview.
