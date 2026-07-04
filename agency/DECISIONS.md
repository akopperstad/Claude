# Agency Project — Decision Log

Automated AI video-ad agency. Every bucket is checked against these anchors before and after execution. Drift = any work that doesn't serve them.

## Anchor decisions

| ID | Decision | Status | Notes |
|----|----------|--------|-------|
| D1 | Goal: first paying client ≤14 days; $5k/mo run-rate by day 90 | ✅ Confirmed | Optimize for speed to first revenue, not polish |
| D2 | Niche: skincare/beauty, 90-day commitment | ✅ Re-verified | Original pick 2026-07-04. Challenged same day after discovering owner's Varelo lighting store — owner ruled: **Varelo fully out of scope, agency has nothing to do with lamps.** Skincare stands. |
| D3 | Market: Nordic first (NO/SE/DK/FI) | ✅ Confirmed | Less outreach saturation, local trust advantage. Outreach in local language where possible. |
| D4 | Offer: intro test pack → monthly retainer ladder | ✅ Confirmed | See OFFER.md |
| D5 | Build minimalism: only build what gets clients or produces videos | ✅ Standing rule | Landing page capped at 1 day. No SaaS, no platform, no custom tooling beyond pipeline scripts. |
| D6 | Automation-first: delivery pipeline is automated (Higgsfield + Claude), not hand-crafted per video | ✅ Confirmed | Owner's words: "automated ad agency" |
| D7 | Credit discipline: preflight every generation (`get_cost`), tiered models — drafts on `veo3_1_lite` (12cr/8s), product-reference on `seedance_2_0_mini` (25cr/10s), `marketing_studio_video` (75cr/15s) only for client-facing finals. No generation outside an approved bucket plan. | ✅ Owner-mandated | Added after 150cr burned on 2 tests; owner called it out 2026-07-04 |

## Bucket status

| # | Bucket | Status | Output |
|---|--------|--------|--------|
| 0 | Tooling sanity | ✅ Done, checkpoint passed | Marketing Studio `ugc` preset works end-to-end. 75 credits / 15s video, ~8 min render, auto script + voice. Test job: `15abe833-c182-4cdc-abb9-d2a878aecc6b` |
| 1 | Niche + hit list + offer | 🔄 In progress | Research workflow `wf_20f1c661-3f8`; OFFER.md |
| 2 | First spec ad (real brand) | ⏳ | Must also test Norwegian-language dialogue |
| 3 | Spec batch (5 brands × 2 videos) | ⏳ | ~750 credits — check balance/top-up first |
| 4 | Outreach machine | ⏳ | Scripts, personalization, tracking, 30/day cadence |
| 5 | Landing page (Lovable) | ⏳ | 1-day cap |
| 6 | Delivery ops | ⏳ | Gated on first client |

## Known constraints & open items

- Higgsfield balance ~1075 credits (Plus plan) ≈ 14 videos. Spec batch fits; retainer delivery needs top-up or higher plan. Revisit at Bucket 3.
- Verify Higgsfield commercial-usage rights on Plus plan before first paid delivery (Bucket 6 blocker).
- Norwegian-language video dialogue untested — Bucket 2 test case.
- Compliance: Norwegian markedsføringsloven + EU rules — AI-generated persons must not be presented as real customer testimonials. Position deliverables as stylized ad creative. Bake into client onboarding.
