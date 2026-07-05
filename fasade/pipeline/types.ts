/**
 * Core types for the Fasade render pipeline.
 *
 * The pipeline turns one exterior photo of a Norwegian house into one or more
 * photorealistic "after" renders, while preserving the building's geometry.
 * It is deliberately provider-agnostic: the generation backend is an adapter
 * (see provider.ts) so the image model can be swapped without touching the
 * product code that consumes this module.
 */

/** The three homeowner jobs-to-be-done validated in bucket 1. */
export type TransformType =
  | 'repaint' // new facade color, everything else untouched
  | 'cladding' // new cladding material/direction (kledning)
  | 'refresh'; // curated multi-element renovation (color + trim + doors + details)

/**
 * Structured description of the house as it actually appears in the photo.
 * Produced by a vision model (analyze.ts), never hand-written.
 *
 * Bucket 1 learning: prompts must restate what is really in the image.
 * A template that guessed "white trim" on a dark-trim house caused the only
 * geometry drift in the A/B test (the model obeyed the wrong claim).
 */
export interface HouseAnalysis {
  /** e.g. "two-storey tomannsbolig", "1970s enebolig", "mountain cabin" */
  buildingType: string;
  /** e.g. "light natural horizontal wood cladding" */
  cladding: string;
  /** e.g. "gray concrete tile gable roof", "snow-covered standing-seam metal roof" */
  roof: string;
  /** e.g. "dark gray window frames", "black-framed floor-to-ceiling windows" */
  windows: string;
  /** Notable context that must survive the edit, in photo order. */
  surroundings: string[];
  /** e.g. "overcast daylight", "winter dusk, warm interior light" */
  lighting: string;
}

/** A single requested transformation of one house photo. */
export interface RenderRequest {
  transform: TransformType;
  /**
   * The target look, phrased as a concrete instruction fragment, e.g.
   * "deep barn red (rørosrød, RAL 3011)" or
   * "modern matte black vertical timber cladding (stående sort trepanel)".
   * Style presets (presets.ts) expand to these fragments.
   */
  target: string;
  /**
   * Optional free-text owner wishes ("legg platting rundt første etasje"),
   * folded into the change instruction. Levels 3-4 only — strict levels
   * must not accept arbitrary structural asks.
   */
  wishes?: string;
}

export interface RenderResult {
  jobId: string;
  /** URL of the generated image (provider-hosted). */
  imageUrl: string;
  /** Credits/øre actually spent, for pay-per-project unit economics. */
  cost: number;
  request: RenderRequest;
}
