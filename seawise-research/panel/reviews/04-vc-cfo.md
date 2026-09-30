# Review 04: VC partner + CFO on PLAN.md and the synthesis

*Date: 30 Sept 2026. Reviewed:*
- `PLAN.md`
- `20-synthesis-and-verdict.md`, including the founder answers
- the new invoice evidence (PreMaster ≈ NOK 16k per vessel per month plus a yearly fee; TM Master ≈ NOK 100k per vessel per year).

*I have rebuilt `panel/04-quit-job-model.csv` to use PLAN's price mechanics. Where it differs from §3 of `panel/04-vc-cfo.md`, the CSV now wins.*

## Verdict: AGREE WITH CHANGES

The pricing architecture holds, and the invoices make it stronger. What does not hold:
- **the Stage 1 date**
- **the 24-month Pioneer lock**
- **the wording of the quit gates**: founder 2's gate is missing from PLAN, and pilots could be counted as ARR
- **how M9 is sequenced.**

---

## 1. Do the numbers hold?

| Item | Verdict | Reasoning |
|---|---|---|
| **List price NOK 9–12k per vessel per month** | **Holds**, with a segment caveat | **PreMaster.** At about NOK 16k per month plus the yearly fee (≈ NOK 200k+ a year), our list price is 25–45% cheaper. That is a clean switching story for PreMaster fishing fleets. **TM Master.** At about NOK 100k a year (≈ 8.3k per month), our list price is **the same or higher**. An unproven two-person vendor cannot be pricier than Lloyd's Register. Also, TM Master users are the large classed trawlers that need DNV type approval anyway. **So target PreMaster and Excel/paper users. Do not sell at list to TM Master users until M10 is done.** I would not raise list to 14–16k: the lead advantage is price plus migration, and a new vendor gets no premium. |
| **Pioneer price ≈ NOK 5–6k** | **Price holds; the 24-month lock does not** | At 5.5k you are 45–65% under the incumbents, so it is fine as a way in. But PLAN allows 3–5 Pioneers locked for 24 months. That could put 15 of the 30 Stage 1 vessels at half price until 2029. Model result (base case): the 24-month lock costs **≈ NOK 540k of ARR and ≈ NOK 380k of cash by Dec 2028**, and it moves **no** quit date earlier. Change it to 12 months at 50%, months 13–24 at list minus 15%, then list. Cap it at 3 customers or 10 vessels. The Pioneer must pay annually in advance, grant reference rights and allow on-board usage data. |
| **Paid pilot NOK 45k** | **Holds** | 45k ÷ 3 vessels ÷ 3 months = NOK 5k per vessel per month, the same as the Pioneer rate, so the pricing is consistent. It is a good seriousness test. Three changes: (a) set the refund clause as "refund only if Seawise fails the named delivery items in the pilot appendix", never "if the customer is unhappy"; (b) invoice it in advance at signing; (c) **never count a pilot as ARR** (see the gates). |
| **Quit gates** | **Holds numerically; fix the wording** | See §2. The model runs PLAN's own gates. |
| **M7: Oppstartstilskudd 1 applied for by 15 Dec 2026** | **Holds**, but pull it forward | The 2026 Innovation Norway start-up pot is roughly halved and first-come. Apply **the week after Gate 1 (~15 Nov)**, using the interview evidence. Payout arrives ~2–4 months later. The model assumes Mar and Aug 2027 tranches. |
| **M9: pre-seed NOK 2.5–3.5M closed in Q3 2027, plus Oppstartstilskudd 2** | **Holds as a target; it is badly specified** | Closing in Q3 means **starting in May 2027**, so the raise needs a start milestone and entry criteria. It also needs a fallback in case M8 slips. Oppstartstilskudd 2 needs the matching money *in the bank*, so it can only be applied for **after** the close. It belongs in a separate milestone, with cash arriving in 2028. |

## 2. Updated quit-job model (`panel/04-quit-job-model.csv`, v2)

### What changed
- Pricing: 45k paid pilots that convert after 90 days, Pioneer at 5.5k (24-month lock as PLAN has it; a 12-month lock as a sensitivity), and list at 10–11k billed annually in advance.
- Advisory: 2 "Sdir-klar" reviews in Dec 2026 (65k), then about 25k a month while the founders are employed. Once founders are full-time, advisory is 60–80k a month, within PLAN's 25% cap.
- Gates: PLAN's own gates, plus two CFO conditions: at least 2 paying customers for founder 1, and a cash floor of at least 6 months' burn on founder 2's ARR route.
- Costs: lawyer, IP work and pen-test are moved to Oct–Dec 2026.

### Ramp
- P1 pilots from Jan 2027, P2 from Mar 2027, P3 from Jun 2027.
- List-price customers from Nov 2027.
- Result: 9 customers and 31 vessels by Dec 2028.
- This is more conservative than PLAN's M8 ("3–5 paying customers by Apr 2027"), which I read as a stretch goal.

### Results

| Scenario | Founder 1 | Founder 2 | Dec 2028 |
|---|---|---|---|
| A: bootstrap (PLAN gates) | **Nov 2027**: 4 customers / 12 vessels, contracted ARR NOK 954k, cash NOK 0.84M | **Apr 2028**: ARR NOK 1.81M, cash NOK 1.97M | 31 vessels, ARR NOK 3.4M, cash NOK 3.4M* |
| A, sales 6 months late | May 2028 | Oct 2028 | 23 vessels, ARR NOK 2.3M |
| A, 12-month Pioneer lock | Nov 2027 | Apr 2028 | ARR NOK 3.9M (+0.54M), cash +0.38M |
| B: NOK 3M pre-seed closing Sep 2027 | Oct 2027 | Nov 2027 | 44 vessels, ARR NOK 5.1M, with 2 hires |

\*About half of the year-end cash is annual prepayments not yet delivered (deferred revenue). Do not hire on it.

### Does the new pricing evidence change the model?
- **Not the price inputs.** The model was already at 10–11k list, and the invoices confirm it.
- **It does lower the pricing risk.** The "price 40% lower" downside in my memo is now less likely for PreMaster fleets.
- **Stage 1 timing.** The cash and ARR math supports "30 vessels / NOK 3–4M ARR" by **late 2028, not 2027**.
- **Switching friction is the new risk.** It sits in timing, not price:
  - PreMaster has a yearly fee, so customers switch at their renewal date.
  - Log each prospect's incumbent renewal and notice dates in the CRM. That date *is* the sales cycle.
  - Budget for 1–3 months of double running. The 45k pilot credited against year 1 already helps with this.

### Cash warning
- Cash bottoms out at **≈ NOK 75k in Nov 2026**. That already assumes the founders inject **NOK 200k**, because legal, IP and pen-test costs come before any revenue.
- M0 must include putting in founder capital. Do it after the holding companies exist.

## 3. Required edits to PLAN.md

**1. Stage 1 window**
> `| 1 | Norwegian fishing fleet | 10 customers / 30 vessels, NOK 3–4M ARR | 2026–27 |`

Replace with:
> `| 1 | Norwegian fishing fleet (PreMaster/Excel users first; TM Master/classed vessels after M10) | 10 customers / 30 vessels, NOK 3–4M ARR | 2026–28 (≥12 vessels / NOK 0.9M contracted ARR by Dec 2027) |`

**2. Quit gates** (add a founder 2 gate and define the terms)
> `**Founders quit** at the CFO-model gates: founder 1 at NOK 600k ARR plus NOK 800k in cash, or NOK 300k ARR plus a pre-seed of at least NOK 3M.`

Replace with:
> `**Founders quit** (unpaid leave first) at the CFO-model gates. ARR = signed, invoiced annual subscriptions only; pilots and advisory don't count. Cash = bank balance at month-end. **Founder 1:** ≥2 paying customers AND either (NOK 600k ARR + NOK 800k cash) or (NOK 300k ARR + closed pre-seed ≥ NOK 3M). **Founder 2:** ≥3 months after founder 1 AND either (NOK 1.8M ARR + cash ≥ 6 months of two-founder burn, ≈ NOK 1.2M) or (NOK 800k ARR + cash ≥ NOK 3M). Base case: Nov 2027 / Apr 2028 (bootstrap), Oct / Nov 2027 (pre-seed). See `panel/04-quit-job-model.csv`.`

**3. Pioneer terms** (Key facts)
> `- **Our list price:** NOK 9–12k per vessel per month. **Pioneer price:** about 5–6k. **Paid pilot:** NOK 45k.`

Replace with:
> `- **Our list price:** NOK 9–12k per vessel per month, billed annually in advance. Sell at list against PreMaster (~16k + yearly fee); do not sell at list against TM Master (~8.3k) before type approval. **Pioneer price:** about 5–6k for 12 months, then list −15% for months 13–24, then list; max 3 customers / 10 vessels; annual prepay + reference rights. **Paid pilot:** NOK 45k for up to 3 vessels / 90 days, invoiced at signing, credited against year 1, never counted as ARR. Record every prospect's incumbent renewal/notice date in the CRM.`

(The synthesis §5 row "About 50% off list, locked for 24 months" needs the same change.)

**4. M7**
> `| M7 | Innovation Norway Oppstartstilskudd 1 applied for | — | Kristian | 15 Dec 2026 | ⬜ |`

Replace with:
> `| M7 | Innovation Norway Oppstartstilskudd 1 applied for (hoppid avklaringsmidlar first; Herøy næringsfond after) | — | Kristian | 15 Nov 2026 (week after Gate 1) | ⬜ |`

**5. M9, split into three**
> `| M9 | Pre-seed NOK 2.5–3.5M closed; Oppstartstilskudd 2 | — | Arne | Q3 2027 | ⬜ |`

Replace with:
> `| M9a | Pre-seed launched. Entry criteria: ≥2 paying customers, ≥6 vessels, ≥NOK 500k ARR, data room + shareholder agreement/holding companies/IP done. If not met by 30 Jun 2027: no raise, stay on bootstrap gates | — | Arne | May 2027 | ⬜ |`
> `| M9b | Pre-seed NOK 2.5–3.5M closed (lead: Investinor-matched pre-seed fund; fill: angels who are not competitors of our customers; no strategic ROFR/exclusivity) | — | Arne | Sep 2027 | ⬜ |`
> `| M9c | Oppstartstilskudd 2 applied for (matching funds in the bank) | — | Kristian | Within 2 weeks of M9b | ⬜ |`

**6. M0: founder capital and money hygiene**
> `| M0 | Foundation: truthful website, IP waivers, trademark search, holding companies + shareholder agreement | — | Arne | 11 Oct 2026 | ⬜ |`

Replace with:
> `| M0 | Foundation: truthful website, IP waivers, trademark search, holding companies + shareholder agreement (vesting, deadlock), all tool accounts/domains owned by the AS, founders inject ≥ NOK 200k via holding companies, accounting system + VAT pre-registration | — | Arne | 11 Oct 2026 (website) / 15 Nov 2026 (rest) | ⬜ |`

**7. Scoreboard**: add a cash column
> `| Week | Interviews | Decision-makers met | Pilot proposals | Paid pilots | NOK contracted |`

Replace with:
> `| Week | Interviews | Decision-makers met | Pilot proposals | Paid pilots | NOK contracted ARR | Cash (NOK) | Months of runway |`
