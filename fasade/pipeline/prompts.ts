import type { HouseAnalysis, RenderRequest } from './types';

/**
 * Builds the generation prompt for one transform of one analyzed house.
 *
 * Structure (validated in the bucket 1 A/B test, winning model nano_banana_pro):
 *   1. One imperative sentence describing ONLY the change, referencing the
 *      cladding/element as it actually looks in the photo.
 *   2. An explicit preservation clause enumerating everything that must stay
 *      identical — geometry, roof, windows, surroundings, lighting, camera.
 *   3. "Photorealistic." terminator.
 *
 * The preservation clause is derived from the vision analysis, never from a
 * fixed template: wrong claims about the house (e.g. trim color) are obeyed
 * by the model and become drift.
 */
export function buildPrompt(house: HouseAnalysis, req: RenderRequest): string {
  const change = changeSentence(house, req);
  const keep = [
    'same building geometry',
    house.roof,
    `same window positions and sizes with ${house.windows}`,
    ...house.surroundings,
    house.lighting,
    'camera angle',
  ].join(', ');
  return `${change} Keep everything else exactly identical: ${keep}. Photorealistic.`;
}

function changeSentence(house: HouseAnalysis, req: RenderRequest): string {
  switch (req.transform) {
    case 'repaint':
      return `Repaint this ${house.buildingType}'s ${house.cladding} in ${req.target}.`;
    case 'cladding':
      return `Replace this ${house.buildingType}'s ${house.cladding} with ${req.target}.`;
    case 'refresh':
      // For refresh, target is a full curated instruction (from a style preset),
      // e.g. sørlandsstil: white cladding + white trim + sage doors + lanterns.
      return `Renovate this ${house.buildingType}: ${req.target}.`;
  }
}
