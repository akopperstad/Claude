import Anthropic from '@anthropic-ai/sdk';
import { readFile } from 'node:fs/promises';
import { analyzeHouse } from '@pipeline/analyze';
import { buildPrompt } from '@pipeline/prompts';
import { suggestPalette, type PaletteScheme } from '@pipeline/palette';
import { HiggsfieldProvider } from '@pipeline/higgsfieldProvider';
import { LEVELS, type Level } from '@pipeline/levels';
import type { HouseAnalysis, RenderRequest } from '@pipeline/types';

/**
 * Mode selection: every capability degrades gracefully so the whole flow is
 * clickable with zero keys (demo mode), and upgrades feature-by-feature as
 * env vars arrive:
 *   ANTHROPIC_API_KEY                     -> real vision analysis + palette
 *   HIGGSFIELD_API_KEY + _SECRET          -> real generative renders (nivå 3-4
 *                                            and interim nivå 1-2 best-of-N)
 */

export const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
export const hasHiggsfield = Boolean(
  process.env.HIGGSFIELD_API_KEY && process.env.HIGGSFIELD_API_SECRET,
);

/** Canned analysis for the demo house (public/demo/e2-for.jpg). */
export const DEMO_ANALYSIS: HouseAnalysis = {
  buildingType: '70-talls enebolig',
  cladding: 'mørkbrun stående trekledning',
  roof: 'brun takstein, saltak',
  windows: 'mørke vinduskarmer',
  surroundings: [
    'dobbel garasje med treporter',
    'skiferlagt uteplass',
    'stor plen med frukttrær og syriner',
    'fjordutsikt',
  ],
  lighting: 'klar blå himmel, sommerlys',
};

export const DEMO_PALETTE: PaletteScheme = {
  cladding: 'klassisk hvit',
  trim: 'ren hvit',
  door: 'dempet salviegrønn',
  roof: 'beholdt brun takstein',
  reasoning:
    'Åpen tomt med fjordlys: hvit kledning løfter huset mot den grønne hagen og matcher nabolagets lyse palett, mens brun takstein beholdes som varm kontrast.',
};

/** Demo renders: pre-baked before/after pairs per level (bucket 1-2 output). */
export const DEMO_RENDERS: Record<Level, { imageUrl: string; target: string }> = {
  1: { imageUrl: '/demo/e2-niva1-hvit.jpg', target: 'klassisk hvit' },
  2: { imageUrl: '/demo/e2-niva2-lerk.jpg', target: 'royalbehandlet lerk' },
  3: { imageUrl: '/demo/e2-niva3-antrasitt.jpg', target: 'antrasitt + nye vinduer' },
  4: { imageUrl: '/demo/e2-niva4-visjon.jpg', target: 'arkitektonisk visjon' },
};

export async function analyzePhoto(photoPath: string): Promise<HouseAnalysis> {
  if (!hasAnthropic) return DEMO_ANALYSIS;
  const bytes = await readFile(photoPath);
  return analyzeHouse(
    bytes.toString('base64'),
    photoPath.endsWith('.png') ? 'image/png' : 'image/jpeg',
    new Anthropic(),
  );
}

export async function paletteFor(analysis: HouseAnalysis): Promise<PaletteScheme> {
  if (!hasAnthropic) return DEMO_PALETTE;
  return suggestPalette(analysis, new Anthropic());
}

export interface RenderOutcome {
  imageUrl: string;
  target: string;
  /** set when demo mode substituted a canned render */
  demoSubstituted: boolean;
}

export async function renderLevel(
  demo: boolean,
  photoUrl: string,
  analysis: HouseAnalysis,
  level: Level,
  target: string,
): Promise<RenderOutcome> {
  if (!hasHiggsfield) {
    // No provider: demo projects get their pre-baked render; uploaded photos
    // can't be rendered yet — surface that honestly.
    if (demo) return { ...DEMO_RENDERS[level], demoSubstituted: false };
    return { ...DEMO_RENDERS[level], demoSubstituted: true };
  }
  const spec = LEVELS[level];
  const request: RenderRequest = {
    transform: level === 1 ? 'repaint' : level === 2 ? 'cladding' : 'refresh',
    target,
  };
  const prompt = buildPrompt(analysis, request, level);
  const provider = new HiggsfieldProvider();
  const result = await provider.render(photoUrl, prompt, request);
  void spec;
  return { imageUrl: result.imageUrl, target, demoSubstituted: false };
}
