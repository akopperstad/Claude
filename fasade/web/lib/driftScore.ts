import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

/**
 * Edge-dice drift score — TypeScript port of fasade/eval/drift_score.py
 * (bucket 2). Validated there as a RANKING signal: orders renders of the
 * same source correctly (held geometry ≈ 0.77-0.85, reimagined ≈ 0.24).
 * NOT an absolute certificate — used to pick the best of N candidates at
 * nivå 1-2 (A7 interim mitigation), never to promise perfection.
 *
 * Pipeline: decode → grayscale → bilinear resize to a common grid →
 * Sobel edge magnitude → binarize at mean×1.5 → dice overlap.
 */

const W = 256;
const H = 192;

interface Gray {
  data: Float32Array; // W*H grayscale
}

/**
 * Decode by MAGIC BYTES, never the caller's mime string — Gemini's declared
 * content-type and the file extension both lie sometimes, and feeding PNG
 * bytes to jpeg-js throws "SOI not found". WebP (which neither decoder
 * handles) throws a clear, catchable error so the caller can skip scoring.
 */
function decode(buf: Buffer): { data: Uint8Array; width: number; height: number } {
  const isPng =
    buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const isJpeg = buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (isPng) {
    const png = PNG.sync.read(buf);
    return { data: new Uint8Array(png.data), width: png.width, height: png.height };
  }
  if (isJpeg) {
    const img = jpeg.decode(buf, { useTArray: true, maxMemoryUsageInMB: 512 });
    return { data: new Uint8Array(img.data), width: img.width, height: img.height };
  }
  throw new Error('driftScore: ustøttet bildeformat (verken PNG eller JPEG)');
}

/** Grayscale + bilinear resample to the common W×H grid. */
function toGrid(buf: Buffer): Gray {
  const { data, width, height } = decode(buf);
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    const sy = (y / (H - 1)) * (height - 1);
    const y0 = Math.floor(sy);
    const y1 = Math.min(y0 + 1, height - 1);
    const fy = sy - y0;
    for (let x = 0; x < W; x++) {
      const sx = (x / (W - 1)) * (width - 1);
      const x0 = Math.floor(sx);
      const x1 = Math.min(x0 + 1, width - 1);
      const fx = sx - x0;
      const g = (px: number, py: number) => {
        const i = (py * width + px) * 4;
        return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      };
      out[y * W + x] =
        g(x0, y0) * (1 - fx) * (1 - fy) +
        g(x1, y0) * fx * (1 - fy) +
        g(x0, y1) * (1 - fx) * fy +
        g(x1, y1) * fx * fy;
    }
  }
  return { data: out };
}

/** Sobel magnitude → binary edge map at mean×1.5 (drift_score.py's rule). */
function edges(gray: Gray): Uint8Array {
  const mag = new Float32Array(W * H);
  let sum = 0;
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = (dx: number, dy: number) => gray.data[(y + dy) * W + (x + dx)];
      const gx =
        -p(-1, -1) - 2 * p(-1, 0) - p(-1, 1) + p(1, -1) + 2 * p(1, 0) + p(1, 1);
      const gy =
        -p(-1, -1) - 2 * p(0, -1) - p(1, -1) + p(-1, 1) + 2 * p(0, 1) + p(1, 1);
      const m = Math.hypot(gx, gy);
      mag[y * W + x] = m;
      sum += m;
    }
  }
  const thr = (sum / ((W - 2) * (H - 2))) * 1.5;
  const bin = new Uint8Array(W * H);
  for (let i = 0; i < mag.length; i++) bin[i] = mag[i] > thr ? 1 : 0;
  return bin;
}

/**
 * Dice overlap of binarized edges; higher = geometry held better.
 * Throws if either image can't be decoded — the caller treats scoring as
 * optional and must never let that failure fail a render.
 */
export function driftScore(source: Buffer, render: Buffer): number {
  const a = edges(toGrid(source));
  const b = edges(toGrid(render));
  let inter = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i]) na++;
    if (b[i]) nb++;
    if (a[i] && b[i]) inter++;
  }
  if (na + nb === 0) return 0;
  return (2 * inter) / (na + nb);
}
