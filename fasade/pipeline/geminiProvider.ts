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
const DEFAULT_MODEL = 'gemini-3-pro-image-preview';

export interface GeminiImageResult {
  base64: string;
  mimeType: string;
}

export async function renderWithGemini(
  imageBase64: string,
  mimeType: string,
  prompt: string,
  apiKey: string,
  model: string = process.env.GEMINI_IMAGE_MODEL ?? DEFAULT_MODEL,
): Promise<GeminiImageResult> {
  const res = await fetch(`${BASE}/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'x-goog-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
            { text: prompt },
          ],
        },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`gemini ${model}: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ inlineData?: { mimeType: string; data: string } }> };
    }>;
  };
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part?.inlineData) {
    throw new Error(`gemini ${model}: no image in response`);
  }
  return { base64: part.inlineData.data, mimeType: part.inlineData.mimeType };
}
