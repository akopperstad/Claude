import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

/**
 * Normalizes stored photos so the render pipeline gets a predictable input:
 * long edge ≤ 2048px, JPEG. Oversized finn 'original' renditions (or big
 * phone photos) otherwise inflate the Gemini payload until the pro image
 * model rejects it and the ladder silently falls back to the weaker flash
 * model — which drifts more (the exact regression seen in field testing).
 * Small JPEGs pass through untouched to avoid a pointless re-encode.
 */

const MAX_EDGE = 2048;
const MAX_PASSTHROUGH_BYTES = 4 * 1024 * 1024;

export function normalizePhoto(
  bytes: Buffer,
  ext: 'png' | 'jpg',
): { bytes: Buffer; ext: 'png' | 'jpg' } {
  let width: number;
  let height: number;
  let rgba: Uint8Array;
  try {
    if (ext === 'png') {
      const png = PNG.sync.read(bytes);
      width = png.width;
      height = png.height;
      rgba = new Uint8Array(png.data);
    } else {
      const img = jpeg.decode(bytes, { useTArray: true, maxMemoryUsageInMB: 1024 });
      width = img.width;
      height = img.height;
      rgba = new Uint8Array(img.data);
    }
  } catch {
    return { bytes, ext }; // undecodable: store as-is, better than failing the upload
  }

  const long = Math.max(width, height);
  const needsResize = long > MAX_EDGE;
  const needsReencode = ext === 'png' || bytes.length > MAX_PASSTHROUGH_BYTES;
  if (!needsResize && !needsReencode) return { bytes, ext };

  let outW = width;
  let outH = height;
  let data = rgba;
  if (needsResize) {
    const scale = MAX_EDGE / long;
    outW = Math.round(width * scale);
    outH = Math.round(height * scale);
    const out = new Uint8Array(outW * outH * 4);
    for (let y = 0; y < outH; y++) {
      const sy = (y / (outH - 1)) * (height - 1);
      const y0 = Math.floor(sy);
      const y1 = Math.min(y0 + 1, height - 1);
      const fy = sy - y0;
      for (let x = 0; x < outW; x++) {
        const sx = (x / (outW - 1)) * (width - 1);
        const x0 = Math.floor(sx);
        const x1 = Math.min(x0 + 1, width - 1);
        const fx = sx - x0;
        for (let c = 0; c < 4; c++) {
          const p = (px: number, py: number) => rgba[(py * width + px) * 4 + c];
          out[(y * outW + x) * 4 + c] =
            p(x0, y0) * (1 - fx) * (1 - fy) +
            p(x1, y0) * fx * (1 - fy) +
            p(x0, y1) * (1 - fx) * fy +
            p(x1, y1) * fx * fy;
        }
      }
    }
    data = out;
  }

  const encoded = jpeg.encode({ data: Buffer.from(data), width: outW, height: outH }, 88);
  return { bytes: Buffer.from(encoded.data), ext: 'jpg' };
}
