import type Anthropic from '@anthropic-ai/sdk';
import type { HouseAnalysis } from './types';

/**
 * Palette engine (A5 level 3 / A2 "overrask meg").
 *
 * Given the house analysis, proposes a harmonized exterior color scheme with
 * a one-sentence justification the customer reads next to the render. The
 * reasoning is the product: "AI suggestion" without a why reads as random.
 *
 * Colors are generic tone descriptions here; mapping to buyable paint colors
 * (Jotun et al.) is a bucket 3+ concern layered on top.
 */
export interface PaletteScheme {
  /** e.g. "soft warm coastal gray (lys kystgrå)" */
  cladding: string;
  /** e.g. "crisp white" */
  trim: string;
  /** e.g. "natural oak" */
  door: string;
  /** e.g. "zinc-gray standing seam" — only used by level >= 2 */
  roof: string;
  /** One sentence, customer-facing, Norwegian. Why this scheme fits. */
  reasoning: string;
}

const SYSTEM = `You are an exterior color consultant for Norwegian homes.
Given a structured description of a house and its surroundings, propose ONE
harmonized exterior scheme as STRICT JSON:
{
  "cladding": string,  // tone description with Norwegian name in parens
  "trim": string,
  "door": string,
  "roof": string,
  "reasoning": string  // one sentence in Norwegian bokmål, customer-facing
}
Ground every choice in the actual light, landscape and neighborhood described.
Favor palettes with Norwegian tradition (rørosrød, kystgrå, oker, klassisk
hvit) when they fit; never propose a color you cannot justify.`;

/** Client injected by caller — keeps this module runtime-dependency-free. */
export async function suggestPalette(
  house: HouseAnalysis,
  client: Anthropic,
): Promise<PaletteScheme> {
  const response = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 512,
    system: SYSTEM,
    messages: [
      { role: 'user', content: JSON.stringify(house) },
    ],
  });
  const text = response.content.find((b) => b.type === 'text');
  if (!text || text.type !== 'text') {
    throw new Error('suggestPalette: no text block in model response');
  }
  return JSON.parse(text.text) as PaletteScheme;
}
