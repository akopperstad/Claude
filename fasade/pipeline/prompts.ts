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

export function buildPrompt(
  house: HouseAnalysis,
  req: RenderRequest,
  level: Level,
  opts: PromptOptions = {},
): string {
  const spec = LEVELS[level];
  const staging = opts.staging ? ` ${stagingFragment()}` : '';

  if (!spec.strictGeometry) {
    // Level 4 — free frame around the architect brief.
    const brief =
      opts.brief?.trim() ||
      `Boldly reimagine this ${house.buildingType} as modern Scandinavian architecture: ` +
        'rework the roof form, enlarge and reposition windows into generous glass sections, ' +
        `integrate the entrance with a covered approach, and reclad in ${req.target}. ` +
        (req.wishes?.trim() ? `The owner also wishes: ${req.wishes.trim()}. ` : '');
    const keep = [...house.surroundings, house.lighting, 'the same camera viewpoint'].join(', ');
    return (
      `${brief} Keep the same plot so it is recognizably the same property: ${keep}.` +
      `${staging} Photorealistic architectural photography.`
    );
  }

  const change = changeSentence(house, req, level, opts.palette);
  const description =
    `The photo shows a ${house.buildingType} with ${house.cladding}, ${house.roof} ` +
    `and ${house.windows}.`;
  const hardNegative =
    'Do not move, resize, add or remove any window, door, roof plane, dormer, ' +
    'chimney, balcony, railing or building volume.';
  const keep = [...house.surroundings, house.lighting, 'the exact camera angle'].join(', ');

  return (
    `This is a photo edit, not a re-generation. ${change} ${description} ` +
    `${hardNegative} Keep ${keep}.${staging} Photorealistic.`
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
      return `Change ONLY the color of the ${house.cladding} to ${req.target}.${wishes}`;
    case 2: {
      // Enumerated surface package (A22): chosen cladding, harmonized rest.
      const pkg = palette
        ? ` Refinish the roof surface as ${palette.roof}, repaint the window frames in ${palette.trim}, and refinish the entrance and other doors in ${palette.door} — a harmonized scheme, same positions and sizes.`
        : '';
      return `Replace the ${house.cladding} with ${req.target}.${pkg}${wishes}`;
    }
    case 3:
      return (
        `Renovate this ${house.buildingType} while keeping its exact building volumes, ` +
        `rooflines and proportions unchanged: ${req.target}. ` +
        'Allowed upgrades: replace windows within their existing openings, refresh the ' +
        'entrance and front door, add or refresh a wooden terrace/platting at ground level, ' +
        'add discreet outdoor wall lighting, and tidy the landscaping.' +
        wishes
      );
    case 4:
      // Level 4 never reaches here (free frame above), but keep it total.
      return `${req.target}.${wishes}`;
  }
}
