# Reface

**Paste a website link → get an instant UX/UI audit and a redesigned version.**

Reface loads any public URL in a headless Chromium browser, **crawls up to 6
same-origin pages**, screenshots each (desktop + mobile), runs a heuristic audit
across **accessibility, responsive design, SEO, performance, structure, visual,
and security**, scores each page 0–100, and then **generates an improved,
multi-section redesign** you can preview side-by-side and download.

Results include per-page tabs, a **Before / After / Split** compare toggle, and
an optional **Anthropic API key field** (used per-request, never stored) that
switches the redesign from template to AI-authored.

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
