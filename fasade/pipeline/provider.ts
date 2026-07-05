import type { RenderRequest, RenderResult } from './types';

/**
 * Generation backend adapter.
 *
 * Bucket 1 A/B test (one house, identical repaint prompt, 4 models):
 *   - nano_banana_pro  — WINNER. Accurate color, geometry held, kept real trim
 *                        even when the prompt wrongly claimed another color.
 *                        2 credits/render at 1k.
 *   - flux_kontext     — geometry good, colors oversaturated. 1.5 credits.
 *   - gpt_image_2      — subtle whole-scene re-render. 0.5-1 credit.
 *   - seedream_v4_5    — reframed camera, most drift. 1 credit.
 *
 * The product talks to this interface only; a concrete implementation wraps
 * whichever API we ship with (bucket 2 decides REST integration + retries).
 */
export interface RenderProvider {
  /** Upload a source photo; returns a provider media reference. */
  uploadSource(image: Buffer, contentType: string): Promise<string>;
  /** Run one prompt against one uploaded source. */
  render(sourceRef: string, prompt: string, req: RenderRequest): Promise<RenderResult>;
}

export const CHOSEN_MODEL = 'nano_banana_pro';
export const CREDITS_PER_RENDER = 2;
