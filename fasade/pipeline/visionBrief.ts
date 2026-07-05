import type Anthropic from '@anthropic-ai/sdk';
import type { HouseAnalysis } from './types';

/**
 * Two-pass Visjon (A22): before the image model runs, Claude drafts a
 * bespoke, BOLD architect brief for this exact house. This is where the
 * nivå 4 token budget goes — the brief names concrete moves instead of a
 * generic "reimagine" that image models answer timidly.
 *
 * The brief is customer-adjacent (it becomes the render prompt), so it must
 * be one compact paragraph of concrete visual instructions, in English (the
 * image model's working language).
 */

const SYSTEM = `You are a Norwegian architect known for dramatic but tasteful
transformations of ordinary houses. Given a structured description of a house,
the owner's wishes, and an optional style direction, write ONE paragraph
(max 120 words) of concrete, visual instructions for an image model that will
redraw the house on its existing plot.

Be bold: change at least three of — roof form, window sizes/placement (window
walls welcome), entrance architecture, cladding mix, garage integration,
tilbygg, rooftop solar. Name materials and colors precisely. Never mention
anything outside the plot. Do not soften with "consider" or "maybe" — write
imperative instructions. Output only the paragraph.`;

export async function draftVisionBrief(
  house: HouseAnalysis,
  client: Anthropic,
  style?: string,
  wishes?: string,
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 400,
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: JSON.stringify({
          house,
          styleDirection: style ?? 'modern Scandinavian',
          ownerWishes: wishes ?? null,
        }),
      },
    ],
  });
  const text = response.content.find((b) => b.type === 'text');
  if (!text || text.type !== 'text') {
    throw new Error('draftVisionBrief: no text block in model response');
  }
  return text.text.trim();
}
