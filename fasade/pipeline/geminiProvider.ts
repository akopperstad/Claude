/**
 * Google Gemini image-editing provider (A14).
 *
 * Bucket 4 field-finding: Higgsfield's platform API exposes no image-edit
 * models (Soul/DoP/Popcorn only), so production renders go maker-direct —
 * the "nano banana" family IS Gemini's image model. Free tier covers
 * validation; key from https://aistudio.google.com.
 *
 * Dependency-pure: plain fetch, no SDK, so it bundles from outside any
 * package root (same lesson as analyze.ts/palette.ts).
 */

const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
/** Tried in order — first is best quality, later ones cover free-tier keys. */
const MODEL_LADDER = ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image'];

export interface GeminiImageResult {
  base64: string;
  mimeType: string;
  /** Which ladder model actually produced the image — fallbacks must be visible. */
  model: string;
}

/** Per-call ceiling; a hung upstream must never hang the product. */
const CALL_TIMEOUT_MS = 150_000;
/** Transient blips (network drop, 429, 5xx) retry before the ladder falls back. */
const RETRIES = 2;
const BACKOFF_MS = [1_000, 3_000];

export interface GeminiImageInput {
  base64: string;
  mimeType: string;
}

/** A fetch-layer failure carries the real reason on `.cause` — surface it. */
function describe(err: unknown): string {
  if (err instanceof Error) {
    const cause = (err as { cause?: { code?: string; message?: string } }).cause;
    const detail = cause?.code ?? cause?.message;
    if (err.name === 'TimeoutError') return 'tidsavbrudd mot Gemini';
    return detail ? `${err.message} (${detail})` : err.message;
  }
  return String(err);
}

class GeminiError extends Error {
  constructor(message: string, readonly retryable: boolean) {
    super(message);
    this.name = 'GeminiError';
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function renderWithGemini(
  imageBase64: string,
  mimeType: string,
  prompt: string,
  apiKey: string,
  /** Optional style-inspiration image (A24) sent alongside the house photo. */
  inspiration?: GeminiImageInput,
): Promise<GeminiImageResult> {
  if (!apiKey) throw new Error('GEMINI_API_KEY mangler');
  const models = process.env.GEMINI_IMAGE_MODEL
    ? [process.env.GEMINI_IMAGE_MODEL]
    : MODEL_LADDER;
  let lastError: unknown;
  for (const model of models) {
    for (let attempt = 0; attempt <= RETRIES; attempt++) {
      try {
        return await callGemini(imageBase64, mimeType, prompt, apiKey, model, inspiration);
      } catch (err) {
        lastError = err;
        const retryable = !(err instanceof GeminiError) || err.retryable;
        if (retryable && attempt < RETRIES) {
          console.warn(`gemini ${model}: ${describe(err)} — retry ${attempt + 1}/${RETRIES}`);
          await sleep(BACKOFF_MS[attempt]);
          continue;
        }
        // Out of retries on this model, or a non-retryable error (bad key,
        // bad request): fall to the next ladder model, never silently.
        console.warn(`gemini ladder: ${model} failed (${describe(err)}), trying next`);
        break;
      }
    }
  }
  throw new Error(`Gemini utilgjengelig: ${describe(lastError)}`);
}

async function callGemini(
  imageBase64: string,
  mimeType: string,
  prompt: string,
  apiKey: string,
  model: string,
  inspiration?: GeminiImageInput,
): Promise<GeminiImageResult> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/${model}:generateContent`, {
      method: 'POST',
      signal: AbortSignal.timeout(CALL_TIMEOUT_MS),
      headers: {
        'x-goog-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inline_data: { mime_type: mimeType, data: imageBase64 } },
              ...(inspiration
                ? [{ inline_data: { mime_type: inspiration.mimeType, data: inspiration.base64 } }]
                : []),
              { text: prompt },
            ],
          },
        ],
      }),
    });
  } catch (err) {
    // Network drop / DNS / TLS / timeout — transient, worth a retry.
    throw new GeminiError(`${model}: ${describe(err)}`, true);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    // 429 (rate limit) and 5xx are transient; 4xx (bad key/request) are not.
    const retryable = res.status === 429 || res.status >= 500;
    throw new GeminiError(`${model}: ${res.status} ${body.slice(0, 200)}`, retryable);
  }
  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ inlineData?: { mimeType: string; data: string } }> };
    }>;
  };
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part?.inlineData) {
    throw new GeminiError(`${model}: no image in response`, true);
  }
  return { base64: part.inlineData.data, mimeType: part.inlineData.mimeType, model };
}
