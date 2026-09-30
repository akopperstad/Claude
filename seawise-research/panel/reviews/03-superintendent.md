# Review 03: Technical superintendent / class surveyor view on PLAN.md

**Verdict: AGREE WITH CHANGES**

The founders are right not to *apply* for type approval before anyone wants the product. What is wrong is the sequencing. The plan treats type approval as one decision at M10 (Q2 2027). In reality it is 70% engineering discipline, which you need for pilots anyway, and 30% DNV process. If readiness work and DNV dialogue also wait for Q2 2027, the first classed trawler switches in late 2028 at the earliest. That lands in the middle of the Stage 2 window, not at the end of Stage 1.

## 1. Is the sequencing right?

Only partly. Three problems:

1. **"Read CP-0206 now" is not enough.**
   - The DNV-CP-0206 certificate documents are a software quality plan (I140), a functional description (Z060), a mapping to DNV's MAD (maintenance activity data) interface (I280) and a changelog (Z280). DNV then runs a software evaluation, a *tested* MAD transfer and a reassessment every two years. Source: DNV TA certificate TAPMS000002V, https://www.bassnet.no/wp-content/uploads/2026/04/TAPMS000002V.pdf
   - As far as I can tell, the MAD interface specification is not public; you get it through dialogue with DNV. You cannot design "so the architecture meets it" without talking to DNV.
   - A pre-application meeting costs almost nothing and commits you to nothing. Do it in Q4 2026.
2. **Most of the readiness work is the same as pilot readiness.** That means:
   - git-based releases, semantic versioning and a changelog
   - automated tests on the due/overdue logic
   - an append-only history
   - chief engineer sign-off enforced server-side
   - an export
   - an offline ship client
   - backups the owner controls

   You need all of this for M4 and M6 anyway. Label it "CP-0206-ready" now. It costs no extra money.
3. **"Conditional LOIs" are a weak signal.** "We'd buy if type-approved" costs the signer nothing.
   - Ask for a signal with a cost: a paid shadow run on the classed vessel in parallel with the incumbent PMS, or a price-locked pre-order with a small deposit.
   - A technical manager who pays for a shadow run has told you something. A letter of intent has not.

## 2. Realistic lead time and cost (my estimates; verify with DNV Ålesund/Høvik)

| Step | Duration | Cost |
|---|---|---|
| Readiness engineering (above) and documents I140/Z060/Z280 | 4–6 months, overlapping pilots | Founder time, roughly 300–600 h |
| DNV pre-application dialogue plus MAD spec | 1–2 months | ~0 |
| Formal type approval: evaluation plus MAD transfer test, fixes and re-test | 4–8 months | DNV fees roughly NOK 100–300k, plus effort |
| First classed vessel switching: class accepts the new PMS on board, then implementation survey (IACS UR Z20 3.1) | 3–12 months, aligned with the annual survey | Migration work per vessel |
| Remote surveys via DNV MMC | at least 1 year of data | – |
| Maintaining the approval | reassessment every 2 years, plus re-approval on a major version change | Ongoing |

- **Decide Q2 2027, then start:** approval around Q1–Q2 2028, first classed vessel live in H2 2028.
- **Readiness now, dialogue in Q4 2026, application in Q1 2027 if the signals hold:** approval around Q3–Q4 2027, first classed vessel in H1 2028.

The second path saves 6–9 months and puts no extra money at risk before the gate.

**Watch-out:** a Lovable-style workflow of daily prompt edits in production cannot survive a type-approval regime. Any major version change can trigger re-approval. Decide on the release model before applying.

## 3. Does the class-PMS reality change who to sell to first?

It confirms the synthesis boundary: sell first to **fishing vessels without a class PMS arrangement**. It also adds one refinement and one caution.

- **Verify the arrangement vessel by vessel. Don't assume it.** "Class-approved PMS" is often loosely used about "a type-approved software" or "we have a PMS". The thing that matters is whether the vessel holds the DNV **PMS(M)** notation or survey arrangement, with the chief engineer crediting class items.
  - Many trawlers run the ordinary machinery survey or CMS with surveyor attendance. For those vessels, type approval is **not** a gate.
  - Claude can check notations in the public DNV Vessel Register for the ~264 fishing vessels ≥ 28 m in a day. This turns a founder assumption into a count.
- **Classed PMS(M) vessels are still reachable in Stage 1** through two routes:
  - the compliance and survey tracker (shore-side, no type approval needed)
  - a paid shadow PMS run alongside the incumbent (not class-credited)

  That gives the type-approval decision real usage data.
- **Caution (conflict of interest):** do not use Lerøy Havfisk vessels for pilots, letters of intent or shadow runs while Arne is employed there. The same applies to DeepOcean for Kristian. An auditor, or the employer's lawyer, will read that as using the employer's resources.

## 4. Required edits to PLAN.md

**Edit 1: split M10 into readiness, dialogue and application decision.**

Quote:
> `| M10 | Decision on DNV type approval (if 2–3 conditional LOIs from classed vessels) | 24 | Kristian | Q2 2027 | ⬜ |`

Replace with:
> `| M10a | CP-0206 readiness: tagged releases + changelog, automated tests on due/overdue logic, append-only history, server-enforced chief-engineer sign-off, full export (same work as M4) | 22 | Kristian + Claude | Jan 2027 | ⬜ |`
> `| M10b | DNV pre-application meeting (Ålesund/Høvik): obtain MAD interface spec, evaluation scope, fee quote | 24 | Kristian | Dec 2026 | ⬜ |`
> `| M10 | Decision to apply for DNV-CP-0206 type approval: apply if ≥2 classed-vessel owners have committed paid shadow runs or deposit-backed pre-orders (not just letters) | 24 | Kristian | Mar 2027 | ⬜ |`

**Edit 2: replace the loose class fact with a verified count and targeting rule.**

Quote:
> `- **Class:** large trawlers run class-approved PMS, so DNV type approval is needed there. Validate first.`

Replace with:
> `- **Class:** some ocean-going trawlers hold DNV PMS(M) (chief-engineer crediting), and replacing their PMS requires CP-0206 type approval, then class acceptance and an implementation survey, so they cannot switch before ~H1 2028. Claude to count PMS(M)/CMS notations for all ≥28 m fishing vessels from the DNV Vessel Register (by M2). Sell PMS first to vessels WITHOUT PMS(M); sell the compliance tracker and paid shadow runs to PMS(M) vessels. No pilots, LOIs or shadow runs at the founders' current employers.`

**Edit 3: move type approval into Stage 1 and make the dates honest.**

Quote:
> `| 2 | Norwegian aquaculture service + small offshore; DNV type approval | 60+ vessels | 2027–28 |`

Replace with:
> `| 2 | Norwegian aquaculture service + small offshore; first classed (PMS(M)) fishing vessels after DNV type approval (application Q1 2027 → approval ~Q4 2027 → first class-credited vessel ~H1 2028) | 60+ vessels | 2027–28 |`

**Edit 4: add a type-approval-compatible release rule to the pilot work.**

Quote:
> `| M4 | Product ready for pilots: own stack, tenant isolation, PreMaster/Excel importer, offline sign-off, demo tenant | 7, 22 | Kristian + Claude | 29 Nov 2026 | ⬜ |`

Replace with:
> `| M4 | Product ready for pilots: own stack, tenant isolation, PreMaster/Excel importer covering jobs + last-done history + running-hour counters (not only equipment), offline sign-off, demo tenant, release freeze during pilots (tagged versions, changelog to pilot chief engineer) | 7, 22 | Kristian + Claude | 29 Nov 2026 | ⬜ |`

The same change is needed in `20-synthesis-and-verdict.md` §7 item 2. Change "Start DNV type approval (DNV-CP-0206) in 2027" to "Apply for DNV-CP-0206 in Q1 2027 (readiness work and DNV dialogue from Q4 2026)".
