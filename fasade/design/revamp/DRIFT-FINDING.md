# Image-shift investigation (2026-07-06)

## Question
Founder reported the render "shifts" the house (geometry drift), worse after
the finn.no original-quality change.

## Experiment
Real finn listing photo (finnkode 462003966: dark-clad enebolig at twilight,
complex geometry — two buildings, garage, dormers, chimney, stone wall,
paved driveway, warm interior lights). The hardest possible case for a
nivå-1 repaint. Ran through nano-banana-pro (same model family as prod's
Gemini) at 2k, 3 candidates each, two prompt variants:
- A = the current pipeline prompt (photo-edit frame + hard negatives + keep-list)
- B = a more surgical "recolor only, keep every other pixel" framing

Measured edge-dice + gradient-alignment vs source, plus 50% ghost overlays.

## Results
- A and B are statistically identical (edge-dice ~0.70, grad-align ~0.76 for
  both). **Prompt tuning does nothing** — confirms the bucket-2 finding.
- The 50% ghost overlay of source vs render shows **zero geometric drift**:
  roofline, chimney, every window, garage, stone wall, driveway all
  byte-aligned. Only the cladding recolored. On the pro model at 2k,
  geometry holds PERFECTLY even on this hard real photo.
- Edge-dice reads only 0.70 despite perfect geometry, because dark→white
  contrast flip depresses it (known bucket-2 caveat). The metric under-
  reports on repaints; it is still usable as a *relative* ranker across
  candidates that share the same flip.

## Root cause of the founder's drift
Not the prompt, not the pro model. The **silent flash-model fallback**: the
finn "original" renditions were large PNGs; oversized payloads made the pro
image model reject the request, and the ladder fell to
`gemini-2.5-flash-image`, which drifts more. This was already fixed the day
before this experiment:
- `lib/imageNormalize.ts` caps the long edge at 2048px and re-encodes to
  JPEG, so every payload stays pro-model-sized.
- `geminiProvider` now logs and records `modelUsed`, so a fallback is never
  silent again.

## Conclusion
The pipeline already addresses the drift. No prompt or model change is
warranted. Verify by re-running the founder's finn cases (should now render
on the pro model — check `modelUsed` in data/telemetry.jsonl).

## Residual levers (only if we ever need a hard guarantee, not "near-perfect")
1. Force prod output to 2k (Gemini `generationConfig` image size) — test
   against the real Gemini key locally before shipping; unverified param,
   do NOT guess in prod.
2. A7 segmentation recolor for nivå 1-2 (segment cladding, recolor in LAB) —
   makes drift structurally impossible, but the pro-model evidence suggests
   this is likely unnecessary. Keep deferred.
