/**
 * Generates the style-gallery thumbnails: the demo house (public/demo/e2-for.jpg)
 * rendered once per exterior style, saved to public/styles/<id>.jpg (A24).
 *
 * Run on a machine with a Gemini key (reads fasade/web/.env.local or env):
 *   cd fasade/web && node scripts/gen-style-thumbs.mjs
 *
 * Idempotent: skips styles whose thumbnail already exists; delete a file to
 * regenerate it.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

// Minimal .env.local loader — no dependency needed.
try {
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('GEMINI_API_KEY mangler (sett i fasade/web/.env.local)');
  process.exit(1);
}

// Inline copy of the style targets (kept in sync with pipeline/presets.ts —
// this script is plain node, no TS loader).
const STYLES = [
  ['sorlandshvit', 'crisp white painted wood cladding, white window frames and trim, front door in soft sage gray-green, discreet black outdoor wall lanterns'],
  ['moderne-kontrast', 'deep anthracite gray cladding, large modern black-framed windows in the same positions, matte black doors'],
  ['lys-skandinavisk', 'crisp white cladding, decks and slatted wood stained light silver-gray driftwood, discreet black outdoor wall lamps'],
  ['sort-minimalisme', 'modern matte black vertical timber cladding (stående sort trepanel), black window frames, clean uncluttered lines'],
  ['naturnaer-lerk', 'new light royal-oiled larch vertical timber cladding in a warm honey tone, black window frames'],
  ['fjellstil', 'dark brown mountain stain (mørk beis) on all cladding, natural stone details at the base, warm outdoor lighting'],
  ['herskapelig', 'light warm-gray rendered/mineral facade, classical white window frames, stately panelled front door, symmetric entrance details'],
];

const MODELS = ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image'];
const photo = await readFile(path.join(ROOT, 'public', 'demo', 'e2-for.jpg'));
const outDir = path.join(ROOT, 'public', 'styles');
await mkdir(outDir, { recursive: true });

for (const [id, target] of STYLES) {
  const out = path.join(outDir, `${id}.jpg`);
  if (existsSync(out)) {
    console.log(`skip ${id} (finnes)`);
    continue;
  }
  const prompt =
    `This is a photo edit, not a re-generation. Restyle the house exterior: ${target}. ` +
    'Do not move, resize, add or remove any window, door, roof plane or building volume. ' +
    'Keep the garden, lighting and the exact camera angle. Photorealistic.';
  let done = false;
  for (const model of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: { 'x-goog-api-key': KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { inline_data: { mime_type: 'image/jpeg', data: photo.toString('base64') } },
                  { text: prompt },
                ],
              },
            ],
          }),
        },
      );
      if (!res.ok) throw new Error(`${model}: ${res.status}`);
      const data = await res.json();
      const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
      if (!part) throw new Error(`${model}: no image`);
      await writeFile(out, Buffer.from(part.inlineData.data, 'base64'));
      console.log(`ok   ${id} (${model})`);
      done = true;
      break;
    } catch (err) {
      console.warn(`feil ${id} ${err.message ?? err}`);
    }
  }
  if (!done) console.error(`GA OPP ${id}`);
}
console.log('Ferdig. Thumbnails i public/styles/.');
