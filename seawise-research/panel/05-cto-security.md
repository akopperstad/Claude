# Panel memo 05: CTO / security architect

**To:** Arne and Kristian Kopperstad, Seawise AS
**Re:** Nautech architecture, security readiness, offline, operating model, defensibility
**Date:** 2026-09-30
**Stance:** I was asked to push back, so this memo does. Nothing here says the product is bad. It says the product is ahead of the evidence, and the next 90 days of engineering should serve one pilot, not 12 modules.

---

## 0. Method and what I actually observed

I only looked at public static assets. I fetched nautech.no and seawise.no, then downloaded the entry bundle and all 152 lazy-loaded chunks that it references (about 6.8 MB of JS) and grepped them. I did not authenticate. I did not call any Supabase REST, RPC or edge-function endpoint. I did not probe for vulnerabilities. Anyone on the internet can repeat these findings in about ten minutes, and so can a customer's IT team.

| Observation | Evidence | Why it matters |
|---|---|---|
| **One Supabase project behind Lovable Cloud** | `tbhhpsuiolgqqmsiucxl.supabase.co`, publishable key in the bundle. The settings UI shows a "Lovable Cloud: Backend infrastructure powered by Lovable" status card. | You rent Supabase through Lovable rather than owning it. That affects region, backups, access and exit. |
| **154 table names are visible** | `.from("…")` calls cover everything from `crew_payroll`, `medical_administration_records`, `sick_leave_records`, `exposure_records` and `job_applications` to `ers_reports`, `fish_quotas`, `insurance_claims`, `deals` and `sensor_readings`. | Your full data model is public. That is not a vulnerability in itself: the publishable key is designed to be public, and RLS is the real control. But it maps out the attack surface. It also shows that you store Article 9 GDPR special-category data (health) alongside payroll. |
| **16 edge functions are named** | `ai-assistant`, `predictive-maintenance`, `maintenance-insights`, `near-miss-patterns`, `parse-safety-report`, `smart-suggestions`, `generate-report`, `global-search`, `import-premaster`, `barentswatch-ais`, `sync-class-society`, `fetch-exchange-rates`, `vessel-templates`, `create-user`, `invite-user`, `delete-user` | Five or six of these are LLM calls, presumably through Lovable's AI gateway (no model or provider strings appear client-side). User administration also goes through edge functions, and those almost certainly use the service role. Service-role code bypasses RLS entirely and must be reviewed line by line. |
| **An email lookup RPC** | `rpc("get_user_id_by_email")`, used by an "add user" dialog | This is a classic account-enumeration or cross-tenant lookup primitive. If it is `SECURITY DEFINER` and any authenticated user can call it, anyone who signs up can resolve any email to a user ID. That is a review item; I have not tested it. |
| **Open self-signup** | `auth.signUp({email,password})` in the client, and `signInWithPassword` is the only sign-in method used | Anyone can create an authenticated session in the same database as your future customers. In that setup, every RLS policy that says `auth.uid() IS NOT NULL` or `TO authenticated USING (true)` is a data leak. |
| **Tenancy is vessel-scoped, not company-scoped** | `.eq("vessel_id")` appears 126 times and `.eq("company_id")` appears 0 times. `company_id` appears only 4 times in total. There is a `user_vessel_roles` table. | I could not find a first-class tenant key. Isolation seems to depend on "which vessels can this user see", which is spread across about 150 per-table policies. That is the most fragile multi-tenant pattern there is. |
| **Joins on names** | `.eq("vessel_name", …)` appears 10 times in certificate logic | A vessel is renamed, or two tenants each have a vessel called "Ståltind", and the data crosses. That is a data-integrity smell typical of AI-generated code. |
| **Role gating in the client** | A `PermissionGate` component, plus `isAdmin`/`canAccess` in React context and a `role_permissions` table | That is fine for UX. It is only security if RLS enforces the same rules, and today nothing proves that. |
| **SSO, MFA and audit logging** | The `signInWithSSO` and `mfa.*` strings exist only inside the vendored supabase-js library; the app never calls them. There is an `entity_audit_logs` table, written from the client. | There is no SSO or MFA. An audit log written from the client can be skipped or forged by the client, so it is not audit-grade. |
| **No offline support** | No service worker, no web manifest, no IndexedDB, no `navigator.onLine`. There are 88 `localStorage` references (mostly UI and session state). | The app is dead the moment VSAT drops. |
| **No observability** | No Sentry, PostHog or other error tracking. `~/flock.js` beacons to `api.tinybird.co` (Lovable's analytics). | You won't know when the pilot customer hits an error, and Tinybird is a subprocessor you have to declare. |
| **HTTP headers** | Hosted on Cloudflare with HSTS, nosniff and a referrer policy. There is **no Content-Security-Policy and no X-Frame-Options / frame-ancestors**. | Every pen tester flags this in the first hour. It is cheap to fix. |
| **seawise.no is a separate Supabase project** | `hhnzoyshbuckhocnfwhx`, used for a single `contact_submissions` table | That is the right choice. Check that the table is insert-only for anon. |

Platform facts I checked:
- Lovable Cloud runs on Supabase, with Americas, Europe and APAC regions. **The region is fixed at creation.**
- There is no one-click migration from Cloud to your own Supabase. Export, Pause and Remove for Cloud shipped in July 2026. Otherwise you move with `supabase db dump`/`pull` and rebuild.
- Code can be synced to GitHub and self-hosted freely.
- Lovable itself reports SOC 2 Type II and ISO 27001:2022. That helps your subprocessor story. It does not make you compliant.

**First action:** confirm which region `tbhhpsuiolgqqmsiucxl` was created in. If it is not Europe, you have to migrate before the pilot anyway.

---

## 1. Architecture assessment

### Strengths (these are real)
- **Speed.** About 150 tables, 16 functions and 12 modules built by two people part-time is remarkable. The stack itself is completely mainstream: React/Vite/Tailwind/shadcn, TanStack Query and Postgres. There is no exotic lock-in in the code, and any hire or contractor can read it.
- **Postgres + RLS is a defensible foundation for B2B.** Supabase is widely used and has its own SOC 2 report. RLS enforced at the database is, in principle, stronger than app-layer checks.
- **Code-splitting is already done** (152 chunks). Someone thought about bundle size.
- **Domain vocabulary is correct.** SFI codes, running-hour groups, IAS alarm tests, MLC work/rest, ERS/VMS and landing declarations are the words a chief engineer uses. This is your actual advantage, and it lives in the schema, not in the UI.

### Risks, ranked
1. **Multi-tenant isolation is unproven, and it is the single company-killing risk.** Open signup, vessel-scoped rather than tenant-scoped policies, about 150 tables each with hand- or AI-written policies, and service-role edge functions: that combination is exactly how Lovable/Supabase apps have leaked data publicly (the 2025 Lovable RLS disclosures). One cross-tenant leak of crew medical records at a Norwegian shipowner ends the company. Datatilsynet fines are the smaller problem; losing the reference in a 50-company industry is the bigger one.
2. **Breadth versus depth.** 12 modules and 154 tables with zero users means about 150 tables' worth of RLS, migrations and tests to maintain for features nobody has validated. Every table is a liability until a customer uses it.
3. **Lock-in to the Lovable platform, not the code.** The code is portable. The real dependencies are the Lovable Cloud project (region, backup policy, no direct Supabase org ownership), the AI gateway (credit-metered, and the model/provider is opaque to you and to your customer's DPA), and the habit of editing through Lovable's agent. Exit is a weekend with `supabase db dump`. The longer you wait, the harder it gets, because the data grows.
4. **Maintainability of AI-generated code.** Signs of it: name-based joins, a client-written audit log, business logic in React components (certificate expiry filtering in the client), and probably duplicated hooks (`useVoyageData`, `useCommercial`, `useFishery`…). No test suite is visible, which I infer from the fact that Lovable projects rarely have one.
5. **The public bundle reveals everything.** That is normal for SPAs, and hiding it is security theatre. The consequence is that your RLS must be correct against an attacker who has a full map. Also: don't put business rules or pricing logic in the client.
6. **Audit-grade logging is missing.** ISM, MLC and class-related records (defects, permits to work, e-logs, signatures) need tamper-evident history: who changed what, when, and what the previous value was. You need database triggers writing to an append-only table, not client inserts. `document_signatures` without a cryptographic or eIDAS story is only a checkbox.
7. **Offline** is covered in section 3.

---

## 2. What must be true before a Norwegian shipowner's IT/security team says yes

Context: the gatekeeper is typically the IT manager, or an outsourced MSP, at a Sunnmøre or Bergen owner. They will send an Excel supplier-security questionnaire (often built on NS/ISO 27001 Annex A or a DNV template), and since 2025 they are increasingly asking about NIS2 and supply-chain security. IACS UR E26/E27 apply to onboard computer-based systems on newbuilds contracted from July 2024. A shore-side SaaS is not directly in scope, but anything that connects to the vessel network or IAS will be asked about. So **don't integrate with onboard OT for the pilot.**

### Must-have for the FIRST (free or paid) pilot, about 4–6 weeks of focused work

| # | Item | Effort (2 founders + Claude Code) |
|---|---|---|
| P1 | **Own the stack.** Your own Supabase org in an **EU region** (Frankfurt or Stockholm), a GitHub repo you own, and the Lovable Cloud project decommissioned or used only for prototyping. | 3–5 days |
| P2 | **Proper tenancy.** A `tenant_id` column on every tenant-owned table, with a NOT NULL constraint and an index. One helper, `auth_tenant_ids()`. Uniform RLS: `tenant_id = ANY(auth_tenant_ids())`, then vessel-level policies layered on top. Disable open signup; accounts are created by invite only. | 1.5–2 weeks |
| P3 | **An automated tenant-isolation test suite** (pgTAP or Vitest against a local Supabase). For every table, a user in tenant A tries to select, insert, update and delete tenant B's rows, and the test must fail. It runs in CI and blocks merges. Also add a CI lint that fails if any table has RLS disabled or a `USING (true)` policy, via `supabase db lint` or a custom query against `pg_policies`. | 1 week |
| P4 | **An edge-function review.** Every service-role call checks the caller's JWT and tenant. `get_user_id_by_email` is removed or restricted to the caller's tenant admins. | 2–3 days |
| P5 | **MFA (TOTP) enforced** for admin roles; supabase-js already supports it. | 1–2 days |
| P6 | **Backups and restore test.** Pro plan, daily backups, and ideally the PITR add-on. Do one documented restore drill. Write down the RPO and RTO (e.g. RPO 24h / RTO 8h for the pilot). | 2 days |
| P7 | **A one-page security overview plus a DPA template plus a subprocessor list.** Subprocessors: Supabase, Cloudflare, Lovable/Tinybird if kept, the LLM provider, the email provider. | 2–3 days |
| P8 | **Scope the pilot away from Article 9 data.** No medical, sick leave or exposure data in the pilot. Feature-flag those modules off. | 1 day |
| P9 | **CSP, frame-ancestors, and Sentry (EU)** or equivalent. | 1 day |
| P10 | **AI features opt-in per tenant**, with a statement that customer data is not used for training and a named provider and region. | 2 days |

### Must-have for the FIRST PAYING ENTERPRISE (3–9 months later)
- **SSO with Microsoft Entra ID** (OIDC/SAML; Supabase supports SAML on Pro+). Norwegian owners run M365, and they will expect this. Add SCIM or a group-to-role mapping later.
- **An external pen test** by a Norwegian or Nordic firm (e.g. Mnemonic, Netsecurity, Orange Cyberdefense NO), costing about NOK 80–150k, with a retest. Share the executive summary under NDA.
- **Tamper-evident audit logging.** DB triggers write to an append-only `audit_events` table (with a hash chain), the log is exportable, and the retention period is stated.
- **An incident response plan** that includes a GDPR 72-hour notification path. Name who is on call. With two founders at sea, be honest about this and use a paid MSP for after-hours if needed.
- **A full GDPR package.** A DPIA covering crew data (payroll, and medical if enabled), a ROPA, retention and deletion per data category, and data-subject request handling.
- **Environment separation** (dev/staging/prod), with production access restricted to named people via MFA and logged.
- **Separate data stores for high-sensitivity data**, or at minimum column-level encryption for medical data (pgsodium/Vault), if that module ships.
- **An ISO 27001 roadmap, not a certificate.** Use a Vanta/Drata-style tool or a lightweight ISMS in Notion. Write policies, keep a risk register, and do annual access reviews. Aim for certification when ARR is above about NOK 3–5M; it costs NOK 300–600k all-in over year one. Don't do SOC 2; Norwegian buyers ask for ISO.
- **An SLA and a status page.** Uptime is inherited from Supabase and Cloudflare, so state it honestly (99.5%).

---

## 3. Offline-at-sea strategy

**First, disagree with the premise.** Before building offline support, answer this: which user, on which vessel, does what task, while disconnected? A modern Norwegian trawler (Lerøy Havfisk class) or offshore vessel has Starlink or VSAT and is online for more than 95% of the time, although bandwidth is contested and latency spikes. A coastal ferry is almost always online. Fishing vessels in the Barents Sea or around Svalbard, and wellboats in fjord shadow, see real outages.

**For the wedge module, it depends on which module you pick:**
- **Shore-side** wedges don't need offline support: superintendent PMS overview, certificate/class tracking, fishery quota and landing admin, crew rotation planning.
- **Onboard daily-use** wedges must degrade gracefully: work-order completion by the chief engineer, running hours, defects, e-logs, work/rest hours. "Must degrade gracefully" means at minimum a local write queue and never losing a form. It does not mean full bidirectional sync.

### Options

| Option | What it is | Effort with Claude Code | Verdict |
|---|---|---|---|
| **A. PWA shell + outbox** | A service worker caches the app, an IndexedDB outbox holds mutations for 5–10 critical forms and replays them with idempotency keys, and there is a read cache of "my vessel" data. | 2–3 weeks | **Do this for the pilot** if the wedge is onboard. It covers 80% of the pain. |
| **B. PowerSync + Supabase** | A local SQLite copy in the browser (or on mobile) with sync rules per vessel, and writes uploaded through your API. Free tier and a $49/month Pro tier; the Open Edition can be self-hosted. | 4–8 weeks for 1–2 modules. Requires rewriting data access for those modules from `supabase.from()` to local SQL, plus conflict rules. | The right long-term answer for onboard modules, once a paying customer demands it. |
| **C. ElectricSQL / RxDB / Replicache** | Similar idea to B. | 4–8 weeks | Electric works read-path only and has pivoted repeatedly; RxDB carries more DIY conflict logic. Prefer B. |
| **D. Vessel edge node** | A small box or VM onboard running Postgres/PocketBase and syncing to shore. | 3–6 months plus hardware, OT network approval and E26/E27 questions | **No.** It's a different company with a support burden you can't carry from sea. |

**Hard truth on conflicts:** maintenance data (running hours, completed jobs) is mostly append-only and syncs easily. Documents with approval flows, and crew rotations, conflict badly. Design offline writes as events ("job X completed at T by Y"), not row overwrites.

---

## 4. Engineering operating model for 2 founders + Claude Code

**Principle: Lovable is a sketchpad; GitHub is the source of truth.** Once the repo and database are yours, all changes go through PRs, including those Claude Code writes.

1. **Repo and environments.** One monorepo in a GitHub org owned by Seawise AS. Use three Supabase projects (`dev` local via `supabase start`, `staging`, `prod`, all in the EU) and a Vercel or Cloudflare Pages preview per PR. Put secrets in GitHub Environments and nowhere else.
2. **Migrations as code.** Every schema and policy change is a timestamped SQL file in `supabase/migrations`. Never click-edit prod, and don't give Lovable direct write access to prod again. CI applies migrations to a fresh database, runs the tests, and then deploys to staging. Promotion to prod is a manual approval.
3. **Tests that matter, in this order:**
   - The RLS/tenant isolation suite (non-negotiable).
   - Contract tests for edge functions.
   - About 10 Playwright end-to-end flows for the wedge module.
   - Type generation (`supabase gen types`) with the build failing on drift.
   - Skip chasing unit-test coverage for UI.
4. **Guardrails against AI spaghetti.**
   - A `CLAUDE.md` with architecture rules: data access only through `/src/data/*` hooks, no `.from()` in components, every table needs `tenant_id`, RLS and a test, and joins use IDs, never names.
   - ESLint rules plus `knip` for dead code, and a size budget per PR.
   - Run a `/code-review` or security-review pass on every PR.
   - One founder reviews every migration by reading the SQL, not the summary.
   - Keep a short ADR log.
5. **Per-customer environments.** No, not for now. Use a shared multi-tenant database with strict RLS. Offer a dedicated Supabase project only as an enterprise upsell. It becomes plausible later: the same migrations applied to N projects is scriptable, at about NOK 3–8k/month per instance.
6. **Observability.** Sentry (EU), Supabase log drains, uptime checks, and a weekly "who logged in, what failed" review during the pilot.
7. **Release discipline.** Ship weekly on a fixed day, with a changelog the pilot customer can see and feature flags per tenant. Never deploy while both founders are at sea. Deploying is on-call.

### Rebuild versus keep
- **Keep:**
  - The UI component library and design system (shadcn + OpenBridge themes).
  - The domain vocabulary and screens for the wedge module.
  - The PreMaster importer, the BarentsWatch function, and the vessel templates.
- **Rebuild:**
  - The tenancy model and all RLS: rewrite it from scratch, don't patch it.
  - User admin edge functions.
  - The audit log (move it to triggers).
  - Name-based joins.
  - The data-access layer for the wedge module.
- **Freeze or hide:**
  - Every module not in the wedge. Keep the code and turn it off by tenant flag. Stop adding tables.
  - Delete the Medical, Payroll and Recruitment modules from the pilot tenant entirely. They are the highest compliance cost for the lowest wedge value.

Total to get from "impressive MVP" to "pilot-grade" on one module: **about 6–8 focused weeks.** Given the claimed 200 h/week, that is feasible in 4–6 calendar weeks, but only if you stop building features during that time.

---

## 5. Defensibility: is the tech a moat?

**No, and you should say so to investors before they say it to you.** A 12-module React/Supabase CRUD app built with AI in months can be rebuilt by a funded competitor, or by an incumbent's modernisation team, in the same months using the same tools. AI coding has driven the cost of "modern UI over a maritime schema" towards zero. That also undermines the "incumbents are Windows 95" argument: incumbents' moat was never UI. It is installed base, class approvals, switching costs and data history.

The technical assets that **could** compound:
1. **Importers are the switching-cost weapon.** Build PreMaster, AMOS, SERTICA, ShipManager (DNV), Unisea and Excel/PMS exports into a clean SFI-coded model with a "migrate in a weekend" guarantee. Every importer you build lowers the buyer's switching cost towards you and raises it away from you.
2. **Job libraries** built from OEM manuals with AI: MAN, Wärtsilä, Bergen Engines, Caterpillar, Kongsberg, Schottel. Structure them as SFI-coded maintenance jobs with intervals, spares and checklists, then curate them across the fleet. This is the most interesting potential moat. It improves with every vessel onboarded, and it is hard to copy without the vessels. Watch the legal side: OEM manuals are copyrighted, so the job structure must be derived, and in the long run partnerships are better.
3. **Norwegian regulatory integrations.**
   - Fiskeridirektoratet ERS/landing notes (sluttseddel) and VMS, BarentsWatch AIS/fish-health, and Sdir certificate data.
   - Class integrations: DNV Veracity or class status APIs, if you can get access.
   - None of this is individually hard, but the combination, maintained over time, is annoying for a foreign competitor. It is a local moat, not a global one.
4. **Fleet benchmarking data** (running hours versus failures by component make and model) gives a real data network effect, but only after roughly 50–100 vessels. Don't pitch it before then.
5. **Trust assets:** ISO 27001, a clean pen test, and two or three named reference customers in Sunnmøre. In this industry these are more defensible than code.

---

## 6. Top 7 recommendations

| # | Recommendation | Effort | When |
|---|---|---|---|
| 1 | **Pick ONE wedge module and freeze the other 11.** Hide them per tenant and stop adding tables until a pilot user logs in weekly. | 1 day to decide, then ongoing discipline | Now |
| 2 | **Take ownership:** a GitHub org repo, your own EU Supabase org (staging + prod), migrations as code, CI. Exit Lovable Cloud and keep Lovable only as a UI sketchpad. | 1 week | Weeks 1–2 |
| 3 | **Rebuild tenancy and RLS around `tenant_id`, invite-only auth and an automated cross-tenant test suite** that gates every merge. Fix the service-role edge functions and `get_user_id_by_email`. | 2–3 weeks | Weeks 2–5 |
| 4 | **A pilot security pack:** MFA for admins, CSP headers, Sentry, a backup/restore drill with stated RPO/RTO, a 2-page security overview, a DPA, a subprocessor list, and AI opt-in with a named provider. | 1–1.5 weeks | Weeks 4–6 |
| 5 | **Keep Article 9 and payroll data out of the pilot.** Crew medical and payroll modules don't ship until you have a DPIA, encryption and a pen test. | 1 day | Now |
| 6 | **Offline only if the wedge runs onboard:** PWA plus an outbox for the 5–10 critical forms. Defer PowerSync until a paying customer asks. | 2–3 weeks (conditional) | Weeks 6–9 |
| 7 | **Invest in importers and job libraries as the moat:** PreMaster to start, then AMOS/ShipManager. Plus an SFI-coded job library for the 5 most common engine families in the target fleet. | 2–4 weeks for the first importer and library | After pilot sign-up |

Then plan for the paying enterprise: Entra ID SSO (1–2 weeks), an external pen test (NOK 80–150k), trigger-based audit logs (1 week), and an ISO 27001 roadmap.

## Stop doing

- **Stop adding modules.** Module 13 has negative value until module 1 has a user.
- **Stop editing prod through Lovable's agent.** Every schema change goes through a reviewed migration.
- **Stop claiming "live, crews are using it"** on seawise.no. An IT reviewer who finds zero traffic will distrust everything else you say, including your security answers.
- **Stop using open signup** on the production database.
- **Stop treating client-side permission gates and client-written audit rows as security.**
- **Stop pitching "AI" features** (predictive maintenance, near-miss patterns) with no data behind them. They trigger the hardest DPA and AI Act questions and add no pilot value. Turn them off until there are 12 months of fleet data.
- **Stop describing the stack as the differentiator.** The differentiator is you two knowing what a chief engineer does at 03:00, plus the importers and job libraries you build from that knowledge.

---

**Biggest disagreement with the founders:** you believe breadth ("one database, 12 modules, for all vessels over a certain size") and modern tech are the advantage. I believe breadth is currently your largest security and maintenance liability, and the tech is not a moat. A shipowner's IT team will not approve 154 tables of crew, medical, payroll and financial data from a two-person, part-time company with unproven tenant isolation. They might approve one well-isolated, well-tested module with a clean exit story. Build that.

*Sources: public bundles of nautech.no/seawise.no (observed 2026-09-30); [Lovable Cloud docs](https://docs.lovable.dev/integrations/cloud); [Lovable self-hosting](https://docs.lovable.dev/tips-tricks/self-hosting); [Lovable Supabase FAQ](https://lovable.dev/faq/backend/supabase); [Supabase GDPR guide](https://supabase.com/docs/guides/security/gdpr-compliance.md); [PowerSync pricing](https://toolradar.com/tools/powersync/pricing); [Sacra on Lovable (SOC 2/ISO 27001)](https://www.sacra.com/c/lovable).*
