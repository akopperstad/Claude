import type { HouseAnalysis, RenderRequest } from './types';
import type { PaletteScheme } from './palette';
import { LEVELS, type Level } from './levels';
import { stagingFragment } from './staging';

/**
 * Builds the generation prompt for one transform of one analyzed house.
 *
 * Per-tier recipes (A22) — each nivå has its own change instruction so the
 * render does exactly as much as the product card sells:
 *
 *   1 Farge       repaint only, strict frame, hard negatives.
 *   2 Overflater  enumerated surface package: chosen cladding + palette-
 *                 harmonized roof surface, frames and doors. Strict frame.
 *   3 Oppgradering explicit upgrade list within existing openings/volumes,
 *                 AI palette. Strict frame.
 *   4 Visjon      bespoke architect brief (two-pass, visionBrief.ts) in a
 *                 free frame — NO volume-preservation clause, only same-plot
 *                 anchors. The bucket-6-era bug where nivå 4 inherited the
 *                 "keep exact volumes" sentence is fixed here.
 *
 * STRICT frame (levels 1-3) — the bucket 2 experiment showed real photos
 * need more than a keep-list: photo-edit reframe + analysis-derived house
 * description + hard negative + keep-list.
 *
 * Everything about the house comes from the vision analysis, never from a
 * template: models obey wrong claims (bucket 1 finding).
 */

export interface PromptOptions {
  /** Harmonized scheme — required for the level 2 package, used by 3. */
  palette?: PaletteScheme;
  /** "Rydd & vask" toggle (A21); caller labels the result when set. */
  staging?: boolean;
  /** Architect brief for level 4 (visionBrief.ts). */
  brief?: string;
}

/**
 * Scene lock — the fix for "it added a garage and blew up the mountains".
 * The building hard-negative only ever protected the house's own parts; the
 * surrounding SCENE was left to the analysis keep-list, which never captures
 * everything. This clause protects the whole world around the house
 * generically, independent of what the analysis noticed, so every strict
 * render (and the anchored level-4 frame) leaves the setting untouched.
 */
const SCENE_LOCK =
  'CRITICAL: keep the entire setting pixel-identical to the photo. Do NOT add, ' +
  'remove, resize or relocate any garage, outbuilding, structure, fence or vehicle. ' +
  'Do NOT change the ground, driveway, paving, lawn, trees, vegetation, the sky, ' +
  'the horizon, mountains, hills, water/fjord, or any neighbouring building. Only ' +
  'the one house named below may change; everything else stays exactly as shot, ' +
  'from the exact same camera position, angle and lens.';

export function buildPrompt(
  house: HouseAnalysis,
  req: RenderRequest,
  level: Level,
  opts: PromptOptions = {},
): string {
  const spec = LEVELS[level];
  const staging = opts.staging ? ` ${stagingFragment()}` : '';

  if (!spec.strictGeometry) {
    // Level 4 — bold redesign, but ANCHORED to this exact photo. It is a
    // renovation of THIS house on THIS site, never a fresh generation.
    const brief =
      opts.brief?.trim() ||
      `Boldly reimagine the main ${house.buildingType} as modern Scandinavian architecture: ` +
        'rework the roof form, enlarge and reposition windows into generous glass sections, ' +
        `integrate the entrance with a covered approach, and reclad in ${req.target}. ` +
        (req.wishes?.trim() ? `The owner also wishes: ${req.wishes.trim()}. ` : '');
    return (
      'This is a bold redesign of the SAME house standing in THIS photograph, on its ' +
      'existing footprint and site. Redesign ONLY the main house: ' +
      `${brief} ${SCENE_LOCK} The result must clearly be the same property in the same ` +
      `place — a dramatic renovation of this house, not a different house or a new scene.` +
      `${staging} Photorealistic architectural photography.`
    );
  }

  const change = changeSentence(house, req, level, opts.palette);
  const description =
    `The one house to edit is a ${house.buildingType} with ${house.cladding}, ${house.roof} ` +
    `and ${house.windows}.`;
  const hardNegative =
    'Do not move, resize, add or remove any window, door, roof plane, dormer, ' +
    'chimney, balcony, railing or building volume on that house.';

  return (
    `This is a photo edit, not a re-generation. ${change} ${description} ` +
    `${hardNegative} ${SCENE_LOCK}${staging} Photorealistic, matching the original ` +
    `lighting (${house.lighting}) and camera exactly.`
  );
}

/**
 * Prompt for a chained edit (A16.3): the source image is a PREVIOUS RENDER,
 * and the instruction is the user's free-text delta ("…og fjern buskene").
 * Free-form and nivå-agnostic by decision — the user may ask for structural
 * changes — so there is no hard structural negative here; the only guard is
 * "change nothing the instruction doesn't ask for", which is what makes it
 * an edit instead of a re-generation.
 */
export function buildEditPrompt(house: HouseAnalysis, instruction: string): string {
  return (
    'This is a photo edit, not a re-generation. Apply ONLY this change to the ' +
    `image: ${instruction.trim()}. ` +
    `The image shows a ${house.buildingType}. ` +
    'Change nothing the instruction does not ask for: keep every other detail, ' +
    'the surroundings, the lighting and the exact camera angle unchanged. ' +
    'Photorealistic.'
  );
}

function changeSentence(
  house: HouseAnalysis,
  req: RenderRequest,
  level: Level,
  palette?: PaletteScheme,
): string {
  // A16.2: the prompt field works at every level. On strict levels the wish
  // is scoped to the edit so it cannot silently override the hard negative.
  const wishes = req.wishes?.trim()
    ? ` Within the scope of this edit, the owner also wishes: ${req.wishes.trim()}.`
    : '';

  switch (level) {
    case 1:
      return `Change ONLY the colour of that house's ${house.cladding} to ${req.target}. Add nothing.${wishes}`;
    case 2: {
      // Surface refinish ONLY (A22). Phrased so the model recolours/reclads
      // the existing walls in place — not "replace" (which it reads as
      // rebuild) and never adds a new structure.
      const pkg = palette
        ? ` In the same coherent scheme, refinish the roof surface as ${palette.roof}, repaint the window frames in ${palette.trim}, and refinish the existing doors in ${palette.door}, all in their exact current positions and sizes.`
        : '';
      return (
        `Refinish this house's exterior SURFACES only. Change its ${house.cladding} to ` +
        `${req.target} on the exact same wall planes, keeping every window, door and roofline ` +
        `where it is.${pkg} Do not add any new building, wing, garage or structure; the ` +
        `footprint and volume are unchanged.${wishes}`
      );
    }
    case 3:
      return (
        `Upgrade ONLY this one house, keeping its exact building volumes, rooflines and ` +
        `proportions: ${req.target}. Allowed changes, all on the existing house and its ` +
        `immediate front: replace windows within their existing openings, refresh the ` +
        `entrance and front door, add or refresh a wooden terrace/platting at ground level, ` +
        `add discreet outdoor wall lighting, and tidy the planting right next to the house. ` +
        `Change nothing about the wider plot, the neighbouring buildings or the landscape.` +
        wishes
      );
    case 4:
      // Level 4 never reaches here (anchored free frame above), but keep it total.
      return `${req.target}.${wishes}`;
  }
}
