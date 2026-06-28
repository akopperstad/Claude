# Reface

**Paste a website link → get an instant UX/UI audit and a redesigned version.**

Reface loads any public URL in a headless Chromium browser, **crawls up to 6
same-origin pages**, screenshots each (desktop + mobile), runs a heuristic audit
across **accessibility, responsive design, SEO, performance, structure, visual,
and security**, scores each page 0–100, and then **generates an improved,
multi-section redesign** you can preview side-by-side and download.

Reface **detects the site's sector** (SaaS, restaurant, finance, agency, health,
e-commerce, legal, real estate, fitness, nonprofit, …) and generates **3 redesign
snapshots styled for that sector** (palette, type, layout vibe). You can override
the sector from a dropdown to re-style the snapshots instantly (no re-crawl).

Results include per-page tabs, a snapshot gallery, a **Before / After / Split**
compare toggle, and an optional **Anthropic API key field** (used per-request,
never stored) that switches snapshots from template to AI-authored.

---

## Pilhammer lead engine (`/leads`)

A lead-generation platform on top of Reface: source Norwegian companies, qualify
them by real financials, score how likely they are to need a new website, and
(next phase) auto-generate Pilhammer mockups for the best ones.

**Data (free, official):**
- **Brønnøysund Enhetsregisteret** — every registered company (1.16M), filterable
  by municipality / NACE sector / size.
- **Brønnøysund Regnskapsregisteret** — annual accounts (revenue, profit, equity,
  liquidity) to qualify who can actually afford a site.

**Two-tier audit (the cost/speed design):**
- **Tier 1** (`lib/engine/auditLite.ts`) — one HTTP fetch + regex parse, *no
  browser, no AI*. ~free, runs across the whole registry. (80 companies sourced +
  financially qualified + audited + scored in ~9s.)
- **Tier 2** (next phase) — Chromium screenshots + AI mockups, only for the
  shortlist you choose to pursue.

**Scoring** (`lib/engine/score.ts`): `lead = bite (website weakness) × afford
(financial headroom)`. Profitable companies with weak/no site rank highest.

**Storage:** SQLite via built-in `node:sqlite` (`data/pilhammer.db`) — nothing is
re-fetched. Swap for Postgres at scale (the query surface in `lib/engine/db.ts`
is small and portable).

**Operate:** the `/leads` dashboard has stat cards, an ingest runner, financial +
weak-site filters, a ranked lead table with reasons, and an **activity log**
(info / warnings / faults) with per-run summaries.

### Cold outreach (`/outreach`)

For the top *emailable* qualified leads, Pilhammer auto-generates a ready-to-send
campaign:
- **Showcase** (`lib/engine/showcase.ts`) — a sector-styled "proposal" site for
  the prospect (their name as the brand, sector-relevant services, the exact
  improvements we'd make). Fast, no browser. Served at `/api/showcase/{id}`.
- **Email** (`lib/engine/emailCompose.ts`) — a personalized Norwegian B2B email:
  a specific hook ("nettsiden er ikke mobiltilpasset…"), the showcase link, clear
  **sender identity**, and a **one-click opt-out**.
- **Recipient discovery** (`lib/engine/emailDiscover.ts`) — finds a role address
  (post@, kontakt@) on the firm's own site; prefers role over personal.

**Compliance by design** (markedsføringsloven §15 + GDPR): every email carries
sender identity + opt-out; opt-outs hit a **suppression list** and are never
re-sent; role addresses preferred. The hottest *no-site* leads have no email —
they're flagged `needs_email` for a phone/postal channel, not blasted.

**Sending is DRY-RUN by default.** With no SMTP env, drafts are marked
`sent (dry-run)` and nothing leaves. To go live, set:
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and
`PILHAMMER_SENDER_NAME/EMAIL/PERSON/PHONE`, `PILHAMMER_PUBLIC_URL`. Then the same
buttons send for real (throttled, suppression-checked).

**All-Norway:** don't page 1.1M times — Brreg publishes a bulk dataset
(`bulkDownloadUrl`); the full national ingest streams that file. Run filtered
slices (by kommune/NACE) for fast, cheap campaigns.

```bash
npm run dev            # http://localhost:3000/leads
# then set Kommune nr (5501 = Tromsø) + Run ingest
```

> Requires the Brreg APIs to be reachable (they're public). In this environment
> outbound traffic is proxied + CA-trusted automatically via lib/proxyFetch.ts.

---

## Two brains (hybrid)

| Mode | When | Review | Redesign |
|------|------|--------|----------|
| **Heuristic** (always on) | no API key | rule-based findings + summary | clean responsive template using your real content |
| **AI** (opt-in) | `ANTHROPIC_API_KEY` set | Claude vision critique of the screenshot | Claude-authored, screenshot-aware redesign |

The heuristic path always runs and never needs a key. If a key is present,
Reface additionally asks Claude to review the screenshot and author a bespoke
redesign; on any failure it falls back to the template.

## Run it

```bash
npm install
# optional, for AI redesigns:
cp .env.example .env.local   # then add ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

> Requires Node ≥18 and a Chromium that Playwright can find. In this environment
> the system Chromium under `PLAYWRIGHT_BROWSERS_PATH` is auto-detected — no
> `playwright install` needed.

## How it works

```
URL ─▶ lib/capture.ts   Playwright: load, desktop+mobile screenshots,
       (Chromium)        extract meta/headings/fonts/contrast/tap-targets
   ─▶ lib/audit.ts      pure heuristic checks ─▶ findings + 0–100 score
   ─▶ lib/ai.ts         (if key) Claude vision review + redesign HTML
       else lib/template.ts  responsive/accessible template from real content
   ─▶ app/page.tsx      score gauge, before screenshots, findings, review,
                        live redesign preview (iframe) + download
```

## Project layout

- `app/page.tsx` — UI: input, score gauge, screenshots, findings, redesign preview
- `app/api/analyze/route.ts` — orchestrates capture → audit → redesign
- `lib/capture.ts` — Playwright capture + DOM extraction
- `lib/audit.ts` — heuristic UX/UI/a11y/SEO/perf checks + scoring
- `lib/ai.ts` — Claude vision review + redesign (optional)
- `lib/template.ts` — offline template redesign
- `lib/types.ts` — shared types

## Notes & limits

- Only public, reachable URLs (no auth-walled pages). 30s load budget.
- Heuristic contrast/tap-target checks are sampled approximations, not a full
  axe-core audit — treat them as signal, not a compliance report.
- The redesign is a single self-contained HTML file (inline CSS), meant as a
  starting point you can iterate on.
