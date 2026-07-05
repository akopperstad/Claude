import type Anthropic from '@anthropic-ai/sdk';
import type { HouseAnalysis } from './types';

/**
 * Vision step: describe the house as it actually appears in the photo.
 *
 * This runs BEFORE any prompt is built. Bucket 1 showed that generation
 * models obey wrong claims about the house (a template asserting "white
 * trim" recolored a dark-trim house's frames), so the preservation clause
 * must come from the image itself.
 */
const SYSTEM = `You describe Norwegian house exteriors for an image-editing pipeline.
Given one photo, return STRICT JSON matching:
{
  "buildingType": string,   // e.g. "two-storey tomannsbolig", "1970s enebolig", "mountain cabin"
  "cladding": string,       // material, direction and color as visible, e.g. "dark brown vertical wood cladding"
  "roof": string,           // e.g. "brown tile gable roof", "snow-covered standing-seam metal roof"
  "windows": string,        // frame color/style, e.g. "dark gray window frames"
  "surroundings": string[], // 4-8 elements that must survive an edit, e.g. "stone patio", "double garage with wooden doors", "fjord view"
  "lighting": string        // e.g. "clear blue sky, midday sun", "winter dusk with warm interior light"
}
Only describe what is visible. Never guess colors you cannot see.`;

/**
 * The Anthropic client is injected by the caller: this module stays free of
 * runtime dependencies so it can be bundled from outside any package root.
 */
export async function analyzeHouse(
  imageBase64: string,
  mediaType: 'image/jpeg' | 'image/png',
  client: Anthropic,
): Promise<HouseAnalysis> {
  const response = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: imageBase64 },
          },
          { type: 'text', text: 'Describe this house as JSON.' },
        ],
      },
    ],
  });
  const text = response.content.find((b) => b.type === 'text');
  if (!text || text.type !== 'text') {
    throw new Error('analyzeHouse: no text block in model response');
  }
  return JSON.parse(text.text) as HouseAnalysis;
}
