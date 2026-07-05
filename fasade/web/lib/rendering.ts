import Anthropic from '@anthropic-ai/sdk';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { analyzeHouse } from '@pipeline/analyze';
import { buildPrompt } from '@pipeline/prompts';
import { suggestPalette, type PaletteScheme } from '@pipeline/palette';
import { renderWithGemini } from '@pipeline/geminiProvider';
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
export const hasGemini = Boolean(process.env.GEMINI_API_KEY);
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
  photoPath: string,
  analysis: HouseAnalysis,
  level: Level,
  target: string,
): Promise<RenderOutcome> {
  const request: RenderRequest = {
    transform: level === 1 ? 'repaint' : level === 2 ? 'cladding' : 'refresh',
    target,
  };
  const prompt = buildPrompt(analysis, request, level);

  if (hasGemini) {
    const filePath = demo
      ? path.join(process.cwd(), 'public', photoPath)
      : photoPath;
    const bytes = await readFile(filePath);
    const mime = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const result = await renderWithGemini(
      bytes.toString('base64'),
      mime,
      prompt,
      process.env.GEMINI_API_KEY!,
    );
    const ext = result.mimeType.includes('png') ? 'png' : 'jpg';
    const name = `${randomUUID().replace(/-/g, '').slice(0, 12)}.${ext}`;
    const dir = path.join(process.cwd(), 'data', 'renders');
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), Buffer.from(result.base64, 'base64'));
    return { imageUrl: `/api/render/${name}`, target, demoSubstituted: false };
  }

  if (hasHiggsfield) {
    const spec = LEVELS[level];
    void spec;
    const provider = new HiggsfieldProvider();
    const result = await provider.render(photoPath, prompt, request);
    return { imageUrl: result.imageUrl, target, demoSubstituted: false };
  }

  // No provider: demo projects get their pre-baked render; uploaded photos
  // can't be rendered yet — surface that honestly.
  if (demo) return { ...DEMO_RENDERS[level], demoSubstituted: false };
  return { ...DEMO_RENDERS[level], demoSubstituted: true };
}
