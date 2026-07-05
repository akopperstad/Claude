import type { HouseAnalysis, RenderRequest } from './types';
import { LEVELS, type Level } from './levels';

/**
 * Builds the generation prompt for one transform of one analyzed house.
 *
 * Two prompt frames, selected by the level's strictGeometry flag:
 *
 * STRICT (levels 1-3) — the bucket 2 experiment showed real photos need more
 * than a keep-list. The frame that held geometry:
 *   1. "This is a photo edit, not a re-generation." — reframes the task.
 *   2. The change sentence, naming the element as it looks in the photo.
 *   3. An exhaustive description of the house's volumes from the vision
 *      analysis — the model preserves what the prompt proves it has seen.
 *   4. A hard negative: do not move/resize/add/remove structural elements.
 *   5. Keep-list of surroundings + lighting + camera, from the analysis.
 *
 * FREE (level 4) — aspirational reimagining; only plot context is pinned.
 *
 * Everything about the house comes from the vision analysis, never from a
 * template: models obey wrong claims (bucket 1 finding).
 */
export function buildPrompt(
  house: HouseAnalysis,
  req: RenderRequest,
  level: Level,
): string {
  const spec = LEVELS[level];
  const change = changeSentence(house, req);

  if (!spec.strictGeometry) {
    const keep = [...house.surroundings, house.lighting, 'the exact camera angle'].join(', ');
    return (
      `${change} Keep the same plot layout so it is recognizably the same property: ${keep}. ` +
      'Photorealistic architectural photography.'
    );
  }

  const description =
    `The photo shows a ${house.buildingType} with ${house.cladding}, ${house.roof} ` +
    `and ${house.windows}.`;
  const hardNegative =
    'Do not move, resize, add or remove any window, door, roof plane, dormer, ' +
    'chimney, balcony, railing or building volume.';
  const keep = [...house.surroundings, house.lighting, 'the exact camera angle'].join(', ');

  return (
    `This is a photo edit, not a re-generation. ${change} ${description} ` +
    `${hardNegative} Keep ${keep}. Photorealistic.`
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

function changeSentence(house: HouseAnalysis, req: RenderRequest): string {
  // Owner wishes only apply to the loose transforms; the strict levels'
  // whole promise is that nothing else changes.
  const wishes =
    req.transform === 'refresh' && req.wishes?.trim()
      ? ` The owner also wishes: ${req.wishes.trim()}.`
      : '';
  switch (req.transform) {
    case 'repaint':
      return `Change ONLY the color of the ${house.cladding} to ${req.target}.`;
    case 'cladding':
      return `Replace the ${house.cladding} with ${req.target}.`;
    case 'refresh':
      return `Renovate this ${house.buildingType} while keeping its exact building volumes, rooflines and proportions unchanged: ${req.target}.${wishes}`;
  }
}
