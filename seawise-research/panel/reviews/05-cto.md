# Review 05: CTO / security, on PLAN.md (2026-09-30)

**Verdict: AGREE WITH CHANGES**

The five-item build list is the right one. It is close to what I recommended, with the importer as the sales weapon and tenancy as a hard gate. My disagreements are with three things:
- How the due date is split.
- An unscoped procurement add-on.
- A pilot security pack that is missing. A first customer's IT team *will* block on it, and PLAN.md doesn't mention it.

## 1. Is M4 (29 Nov) realistic?

The plan has **8.5 calendar weeks.** My estimates with Claude Code are:
- Own stack plus EU migration: about 1 week.
- Tenancy, RLS and the cross-tenant test suite: 2–3 weeks.
- Importer: 2–3 weeks.
- Offline sign-off (PWA + outbox): 2–3 weeks.
- Demo tenant: 3–5 days.
- Minimal procurement: 1.5–2 weeks.

That totals **9–13 weeks of agent work.** Claude can build in parallel, but **the bottleneck is founder review.** One founder has to read every migration and RLS policy, and the plan caps founder build attention at about 4 h/week while Kristian also works full-time. So all five items plus procurement by 29 Nov is **not realistic without cutting corners on the one thing that can't be cut: isolation.**

The fix is to split the milestone. Security and importer go first, because the demo and the "we move you in 10 days" pitch need them by M5/M6. Offline sign-off and procurement go second, but must be done before any pilot vessel goes live, around 3 Jan.

**One dependency is missing:** the importer needs real PreMaster export samples (the file formats and a DB/CSV export). They must come legally from a prospect or PreMaster documentation, **never from Lerøy Havfisk data.** Without samples by about 1 Nov, the importer slips.

## 2. Is the scope right?

- **Procurement:** yes, it has to be in the core for price parity with PreMaster. But define it as a **minimal loop**:
  - Spares linked to components.
  - Requisition from a work order.
  - PO to a supplier (PDF/email).
  - Goods received.
  - Stock decrement.

  Leave these **out**: supplier portal, quotes/RFQ comparison, invoice matching, approvals beyond one level, multi-currency. The existing tables (`purchase_orders`, `parts`, `suppliers`, `quote_requests`) can be reused, but only after they get `tenant_id` and tests like everything else.
- **DNV-CP-0206 readiness:** agree. Design it in now, because retrofitting is expensive. Concretely, from the founders' reading (the clause-level mapping still needs doing against the actual document):
  - (a) An **append-only, trigger-based audit trail**: who, what, when, old and new value, with the server clock only.
  - (b) **Versioning of maintenance job definitions and intervals**, where completed jobs reference the version they were done against.
  - (c) **A full maintenance-data export per vessel** (components, jobs, history, running hours, spares) in CSV/JSON. This doubles as the customer's exit guarantee, which IT asks for anyway.
  - Offline sign-offs must record both device time and server-received time, so the audit trail stays honest.
- **Demo tenant:** fine. It must live in its own tenant in prod, or on a separate demo project, and it must never be a copy of real data.
- **Correctly excluded:** the other modules, AI features, SSO, native apps and the edge node. Hide those modules per tenant (feature flags); don't delete the code.

## 3. What a first pilot customer's IT will block on (not in PLAN.md)

1. **EU region confirmed** for the Supabase project, plus a written subprocessor list: Supabase, Cloudflare, the email provider, and any LLM or analytics. Remove the Lovable/Tinybird `~flock.js` beacon or declare it.
2. **A DPA (databehandleravtale)** plus a 2-page security overview in Norwegian.
3. **MFA for admin/office users** and invite-only accounts. Open signup must be off.
4. **A backup/restore drill with a stated RPO and RTO**, plus the data-export/exit clause.
5. **No crew medical, payroll or health data in the pilot.** Those modules are off.
6. **Baseline hardening:** CSP and frame-ancestors headers, Sentry (EU), and removing or restricting the `get_user_id_by_email` RPC and the service-role user-admin functions.
7. **An independent check before real data:** at minimum an external review of the RLS and edge functions (a few days from a Nordic firm, about NOK 30–60k). The full pen test can come later, before the first enterprise contract. SSO (Entra ID) is not needed for the pilot, but have a dated answer ready ("Q2 2027").

## Required edits to PLAN.md

**E1 (split M4 and add the security pack).** Replace:
> `| M4 | Product ready for pilots: own stack, tenant isolation, PreMaster/Excel importer, offline sign-off, demo tenant | 7, 22 | Kristian + Claude | 29 Nov 2026 | ⬜ |`

with:
> `| M4a | Demo-ready + data-safe: own stack (EU region confirmed), tenant isolation + cross-tenant CI tests, invite-only + admin MFA, server-side audit trail, PreMaster/Excel importer, demo tenant, pilot security pack (DPA, subprocessor list, 2-page security overview, backup/restore drill with RPO/RTO) | 7, 22 | Kristian + Claude | 29 Nov 2026 | ⬜ |`
> `| M4b | Pilot-live: offline job sign-off (PWA + outbox), minimal procurement loop (spares → requisition → PO → receipt → stock), per-vessel maintenance-data export, external RLS/edge-function review | 7, 22 | Kristian + Claude | 20 Dec 2026 | ⬜ |`

**E2 (add a hard gate after the kill rule).** After:
> `**Kill rule (accepted):** 20 qualified meetings with zero paid commitments means stop and re-plan.`

add:
> `**Data gate (hard):** no real customer data in the system before M4a is done and the cross-tenant test suite is green in CI. Never employer (Lerøy Havfisk/DeepOcean) data, not even for the demo or importer testing.`

**E3 (importer dependency and DNV design rules).** Add to "This week":
> `- [ ] Get 1–2 real PreMaster export samples (format + field list) from a prospect or public docs, not from employer systems — needed by 1 Nov for the importer (M4a)`
> `- [ ] Kristian: read DNV-CP-0206 and write a 1-page requirement map (audit trail, versioning, data export, access control, backup) into the repo as an ADR (M4a)`

**E4 (scope procurement).** Replace:
> `- **Incumbent price:** PreMaster about NOK 16k per vessel per month plus a yearly fee (maintenance, procurement, basics). TM Master about NOK 100k per vessel per year.`

with the same line plus:
> `- **Price-parity core = maintenance + minimal procurement + basics.** Procurement v1 is spares/requisition/PO/receipt/stock only; no supplier portal, RFQ, invoice matching or multi-level approval until a paying customer asks.`

**E5 (founder review capacity).** Replace:
> `| M4 | … | Kristian + Claude | …`

(covered by E1) and also add under "End goal" or "This week":
> `- Founder review budget: every DB migration/RLS policy is read by a founder before merge; reserve ≥3 h/week of Kristian's time for this through Dec 2026, on top of the 4 h/week cap if needed.`
