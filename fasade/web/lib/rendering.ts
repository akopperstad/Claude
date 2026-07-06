import Anthropic from '@anthropic-ai/sdk';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { driftScore } from '@/lib/driftScore';
import { analyzeHouse } from '@pipeline/analyze';
import { buildEditPrompt, buildPrompt, type PromptOptions } from '@pipeline/prompts';
import { suggestPalette, type PaletteScheme } from '@pipeline/palette';
import { draftVisionBrief } from '@pipeline/visionBrief';
import {
  renderWithGemini,
  type GeminiImageInput,
  type GeminiImageResult,
} from '@pipeline/geminiProvider';
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
    new Anthropic({ timeout: 60_000, maxRetries: 1 }),
  );
}

export async function paletteFor(
  analysis: HouseAnalysis,
  anchorCladding?: string,
): Promise<PaletteScheme> {
  if (!hasAnthropic) return DEMO_PALETTE;
  return suggestPalette(analysis, new Anthropic({ timeout: 60_000, maxRetries: 1 }), anchorCladding);
}

/** Nivå 4 two-pass (A22): Claude drafts the bold brief, Gemini paints it. */
export async function visionBriefFor(
  analysis: HouseAnalysis,
  style?: string,
  wishes?: string,
): Promise<string | undefined> {
  if (!hasAnthropic) return undefined; // buildPrompt has a bold static fallback
  return draftVisionBrief(analysis, new Anthropic({ timeout: 60_000, maxRetries: 1 }), style, wishes);
}

export interface RenderOutcome {
  imageUrl: string;
  target: string;
  /** set when demo mode substituted a canned render */
  demoSubstituted: boolean;
  /** which Gemini ladder model produced the image (fallback visibility) */
  modelUsed?: string;
  /** best-of-N edge-dice score at nivå 1-2 (A7 interim) — ranking, not certificate */
  driftScore?: number;
  /** how many candidates were generated and ranked */
  candidates?: number;
}

/** Resolve an app-served image URL back to the file that produced it. */
export function imageFilePath(imageUrl: string): string | null {
  const render = imageUrl.match(/^\/api\/render\/([a-f0-9]{12}\.(?:png|jpg))$/);
  if (render) return path.join(process.cwd(), 'data', 'renders', render[1]);
  if (imageUrl.startsWith('/demo/')) {
    return path.join(process.cwd(), 'public', imageUrl.slice(1));
  }
  return null;
}

async function generateRaw(
  filePath: string,
  prompt: string,
  inspiration?: GeminiImageInput,
): Promise<GeminiImageResult> {
  const bytes = await readFile(filePath);
  const mime = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return renderWithGemini(
    bytes.toString('base64'),
    mime,
    prompt,
    process.env.GEMINI_API_KEY!,
    inspiration,
  );
}

async function saveRender(result: { base64: string; mimeType: string }): Promise<string> {
  const ext = result.mimeType.includes('png') ? 'png' : 'jpg';
  const name = `${randomUUID().replace(/-/g, '').slice(0, 12)}.${ext}`;
  const dir = path.join(process.cwd(), 'data', 'renders');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(result.base64, 'base64'));
  return `/api/render/${name}`;
}

async function generateWithGemini(
  filePath: string,
  prompt: string,
  inspiration?: GeminiImageInput,
): Promise<{ imageUrl: string; model: string }> {
  const result = await generateRaw(filePath, prompt, inspiration);
  return { imageUrl: await saveRender(result), model: result.model };
}

/**
 * Nivå 1-2 (A7 interim): three candidates in parallel, ranked by edge-dice
 * drift score against the source, best one wins. Score is a ranking signal,
 * not a certificate (bucket 2 finding).
 */
async function generateBestOf3(
  filePath: string,
  prompt: string,
): Promise<{ imageUrl: string; score?: number; candidates: number; model: string }> {
  const src = await readFile(filePath);
  const attempts = await Promise.allSettled(
    [0, 1, 2].map(() => generateRaw(filePath, prompt)),
  );
  const ok = attempts.flatMap((a) => (a.status === 'fulfilled' ? [a.value] : []));
  if (!ok.length) throw (attempts[0] as PromiseRejectedResult).reason;

  // Scoring is a RANKING aid, never a gate: a decode failure must not fail a
  // render whose candidates already generated. Unscorable candidates rank last.
  const scored = ok.map((r) => {
    let score: number | null = null;
    try {
      score = driftScore(src, Buffer.from(r.base64, 'base64'));
    } catch (err) {
      console.warn('drift score skipped:', err instanceof Error ? err.message : err);
    }
    return { r, score };
  });
  const ranked = scored.filter((s) => s.score !== null).sort((a, b) => b.score! - a.score!);
  const best = ranked[0] ?? scored[0];
  return {
    imageUrl: await saveRender(best.r),
    // Only claim "beste av N" when we actually ranked ≥2; otherwise the label
    // would overclaim. score omitted when we couldn't measure it.
    score: best.score != null ? Math.round(best.score * 100) / 100 : undefined,
    candidates: ranked.length >= 2 ? ranked.length : 1,
    model: best.r.model,
  };
}

/**
 * Chained edit (A16.3): applies a free-text instruction to a PREVIOUS render
 * so follow-ups accumulate ("rød" → "…og fjern buskene") instead of
 * restarting from the original photo.
 */
export async function renderEdit(
  sourceImageUrl: string,
  analysis: HouseAnalysis,
  instruction: string,
): Promise<RenderOutcome> {
  const target = instruction.trim();
  if (hasGemini) {
    const filePath = imageFilePath(sourceImageUrl);
    if (!filePath) throw new Error('fant ikke kildebildet for justeringen');
    const prompt = buildEditPrompt(analysis, target);
    const gen = await generateWithGemini(filePath, prompt);
    return { imageUrl: gen.imageUrl, target, demoSubstituted: false, modelUsed: gen.model };
  }
  // No provider: keep the flow clickable in demo mode, honestly labeled.
  return { imageUrl: sourceImageUrl, target, demoSubstituted: true };
}

export async function renderLevel(
  demo: boolean,
  photoPath: string,
  analysis: HouseAnalysis,
  level: Level,
  target: string,
  wishes?: string,
  promptOpts: PromptOptions = {},
  inspiration?: GeminiImageInput,
): Promise<RenderOutcome> {
  const request: RenderRequest = {
    transform: level === 1 ? 'repaint' : level === 2 ? 'cladding' : 'refresh',
    target,
    wishes,
  };
  const prompt = buildPrompt(analysis, request, level, promptOpts);

  if (hasGemini) {
    const filePath = demo
      ? path.join(process.cwd(), 'public', photoPath)
      : photoPath;
    if (level <= 2) {
      const best = await generateBestOf3(filePath, prompt);
      return {
        imageUrl: best.imageUrl,
        target,
        demoSubstituted: false,
        driftScore: best.score,
        candidates: best.candidates,
        modelUsed: best.model,
      };
    }
    const gen = await generateWithGemini(filePath, prompt, inspiration);
    return { imageUrl: gen.imageUrl, target, demoSubstituted: false, modelUsed: gen.model };
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
