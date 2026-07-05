# Bucket 1 report — Tech proof (render pipeline prototype)

Date: 2026-07-05 · Status: **awaiting founder verdict (checkpoint D9)**

Interactive gallery with draggable before/after sliders:
https://claude.ai/code/artifact/a354a623-e493-4873-8cb0-b5ed80d6ac60

## What was tested

12 renders across 6 Norwegian house exteriors (tomannsbolig, 70s enebolig,
architect funkis, rekkehus, winter mountain cabin, torvtak cabin), covering the
three homeowner transforms: **repaint**, **cladding swap (kledning)**, and
**full refresh** (color + trim + doors + windows).

Test photos are photorealistic AI demo assets from `finn-plus/public/listings/`
(finn.no-style listing photography). Real phone photos of a real house are the
next stress test — requested at the checkpoint.

## Model A/B (one house, identical repaint prompt)

| Model | Verdict | Cost/render |
|---|---|---|
| **nano_banana_pro** | **Winner.** Accurate color, geometry held, kept the real trim color even when the prompt wrongly claimed another | 2 credits |
| flux_kontext | Geometry good, color oversaturated | 1.5 credits |
| gpt_image_2 (medium) | Subtle whole-scene re-render | 1 credit |
| seedream_v4_5 | Reframed camera, changed trim and cladding direction — most drift | 1 credit |

## Matrix results (nano_banana_pro, 11 renders + 1 from A/B)

9/12 geometry held perfectly. 3 partial drifts, all detail-level, none fatal:

- e7 sørlandsstil refresh — entrance canopy/posts subtly redesigned
- e2 anthracite refresh — roof tile tone darkened (prompt said keep brown)
- e11 light refresh — carport painted white instead of ordered silver-gray stain
- e5 ochre repaint — color landed honey-gold instead of deep ochre; stone
  chimney became indistinct (worst render of the set)

Notable wins: winter/snow photo worked cleanly (e12), turf roof (torvtak)
preserved (e5), sedum roof + glass railing preserved (e4), window replacement
as a transform works (e2).

## Unit economics input (decision D6)

~2 credits per production render. A 5-render project ≈ 10 credits ≈ trivial
COGS against 249–499 NOK pay-per-project pricing. Full test spend: ~27 of 988
credits.

## Key learning baked into the pipeline

Generation models obey wrong claims about the house (a template asserting
"white trim" recolored a dark-trim house in the A/B test). Therefore the
pipeline requires a vision-analysis step before prompting: describe the house
as it actually appears → build the preservation clause from that analysis.
Implemented in `pipeline/analyze.ts` → `pipeline/prompts.ts`.

## Module layout (`fasade/pipeline/`)

- `types.ts` — transforms, house analysis, render request/result
- `analyze.ts` — Claude vision → structured `HouseAnalysis`
- `prompts.ts` — change sentence + derived preservation clause
- `presets.ts` — Norwegian repaint/cladding/refresh presets
- `provider.ts` — generation backend adapter; model choice + costs documented

Open for bucket 2: provider REST implementation + retries, drift self-check
(compare render vs source), preset expansion, cost metering.
