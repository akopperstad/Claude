#!/usr/bin/env node
/**
 * Fasade pipeline CLI — photo in, renders out.
 *
 *   npx tsx fasade/pipeline/cli.ts <imageUrl> --level 1 --target "klassisk hvit"
 *   npx tsx fasade/pipeline/cli.ts <imageUrl> --level 3            # AI palette
 *
 * The image must be reachable by URL (the platform API takes URL inputs);
 * local-file hosting is the website's job in bucket 4.
 *
 * Env: ANTHROPIC_API_KEY, HIGGSFIELD_API_KEY, HIGGSFIELD_API_SECRET.
 */

import Anthropic from '@anthropic-ai/sdk';
import { analyzeHouse } from './analyze';
import { buildPrompt } from './prompts';
import { suggestPalette } from './palette';
import { HiggsfieldProvider } from './higgsfieldProvider';
import { LEVELS, type Level } from './levels';
import type { RenderRequest } from './types';

async function main() {
  const [imageUrl, ...rest] = process.argv.slice(2);
  if (!imageUrl) {
    console.error('usage: cli.ts <imageUrl> [--level 1-4] [--target "<color/material>"]');
    process.exit(1);
  }
  const level = Number(argValue(rest, '--level') ?? '1') as Level;
  const spec = LEVELS[level];
  if (!spec) {
    console.error(`unknown level: ${level}`);
    process.exit(1);
  }

  console.error(`[1/4] analyzing house (level ${level} — ${spec.name})`);
  const imageBytes = await fetch(imageUrl).then((r) => r.arrayBuffer());
  const anthropic = new Anthropic();
  const house = await analyzeHouse(
    Buffer.from(imageBytes).toString('base64'),
    imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg',
    anthropic,
  );
  console.error(`      ${house.buildingType}; ${house.cladding}`);

  let target = argValue(rest, '--target');
  if (!target && spec.aiPalette) {
    console.error('[2/4] palette engine');
    const palette = await suggestPalette(house, anthropic);
    console.error(`      ${palette.cladding} — ${palette.reasoning}`);
    target =
      level >= 3
        ? `repaint the cladding in ${palette.cladding}, trim in ${palette.trim}, ` +
          `a ${palette.door} front door and ${palette.roof} roofing, plus new windows ` +
          'in the existing openings and refreshed landscaping'
        : palette.cladding;
  }
  if (!target) {
    console.error('--target required for levels without AI palette');
    process.exit(1);
  }

  const request: RenderRequest = {
    transform: level === 1 ? 'repaint' : level === 2 ? 'cladding' : 'refresh',
    target,
  };
  const prompt = buildPrompt(house, request, level);
  console.error(`[3/4] prompt built (${prompt.length} chars)`);

  const provider = new HiggsfieldProvider();
  console.error('[4/4] rendering');
  const result = await provider.render(imageUrl, prompt, request);
  console.log(JSON.stringify({ level, house, prompt, result }, null, 2));
}

function argValue(args: string[], flag: string): string | undefined {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
