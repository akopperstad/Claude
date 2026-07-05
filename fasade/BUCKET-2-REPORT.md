# Bucket 2 report — Pipeline hardening

Date: 2026-07-05 · Status: **awaiting founder verdict at checkpoint**

## Headline finding

**Generative editing cannot certify nivå 1–2 geometry on real photos —
regardless of model, prompt strategy, or resolution.** It sometimes succeeds
(r4 at 2k was near-pixel-aligned) but unreliably, and reliability is the
product promise at those levels. The bucket 1 demo assets passed because they
are AI-generated images sitting in model-friendly distribution; real listing
photos do not.

Evidence (real photos from finnkode 462003966, drift-dice score + ghost
overlays; dice is a *ranking* signal, overlays are the certification):

| Attempt | r1 front | r2 garden | r4 terrace |
|---|---|---|---|
| naive prompt, nano 1k (bucket 1 style) | 0.55 drift | 0.45 drift | 0.37 drift |
| tuned prompt (analysis-derived, photo-edit frame, hard negatives) | 0.52 drift | 0.46 drift | 0.39 drift |
| tuned + flux_kontext | 0.48 drift | — | 0.29 drift |
| tuned + gpt_image_2 high | 0.42 minor shifts | — | 0.39 minor shifts |
| tuned + seedream 4.5 | — | — | 0.49 **reframed** |
| tuned + nano 2k | **drift** (overlay ghosting) | **drift** | **near-aligned** ✓ |

Prompt tuning ≈ naive (falsified hypothesis). Cross-model swap ≈ no better.
Resolution helps sometimes, certifies nothing.

## Decisions this forces (amendment A7, pending founder ratification)

1. **Nivå 1–2 goes segmentation-based.** Segment the cladding (SAM-class
   model via API), recolor deterministically in LAB space preserving texture
   and lighting, generative model only for material swaps within the mask.
   Geometry drift becomes structurally impossible. Bucket 3 spike.
2. **Nivå 3–4 stays generative** — validated repeatedly; drift tolerance is
   part of the level definition and the founder-approved renders prove the
   value.
3. **Beta mitigation for nivå 1–2** until segmentation lands: best-of-3
   generation picked by drift score, ghost overlay shown to the customer as a
   transparency feature ("sjekk at huset ditt er uendret").

## Metric learnings (fasade/eval/)

- `drift_score.py` — binarized-edge dice. Validated as a ranking signal:
  orders renders correctly within a source photo, separates repaint from
  reimagining (held demos 0.77–0.85, reimagined 0.24, unrelated 0.11). NOT an
  absolute certificate: vegetation texture and dark→white contrast flips
  depress scores on real photos even when geometry holds.
- `overlay.py` — 50% ghost blend. Caught a reframed render both metric
  versions missed; certification tool until segmentation masking exists.
- A global-shift (phase correlation) metric was implemented and **removed** —
  it read 0.0 px on visibly reframed renders (drift is zoom/local, not
  translation).

## Pipeline v2 (fasade/pipeline/)

- `levels.ts` — four-level model as code (A5), incl. AI-palette flag and
  per-level disclaimers (A6).
- `palette.ts` — palette engine: analysis → harmonized scheme (cladding,
  trim, door, roof) + customer-facing Norwegian reasoning sentence.
- `prompts.ts` — strict photo-edit frame for levels 1–3 (change sentence,
  analysis-derived house description, hard negatives, keep-list), free frame
  for level 4.
- `higgsfieldProvider.ts` — REST adapter per official platform docs (auth,
  submit, poll, retries, cost). Reference-image field name and platform model
  id flagged for confirmation when the API key is provisioned.
- `cli.ts` — end-to-end: analyze → palette → prompt → render.
- Typechecks clean (`npx tsc -p fasade/pipeline/tsconfig.json`).

## Spend

~50 credits this bucket (~937 remaining of 988).
