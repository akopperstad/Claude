/**
 * Detect image format by MAGIC BYTES, never by extension or content-type —
 * finn and browser uploads mislabel formats, and feeding PNG bytes to
 * jpeg-js throws "SOI not found". Returns null for anything that is neither
 * PNG nor JPEG (WebP/HEIC/garbage) so callers can decide how to degrade.
 */
export function detectImageFormat(buf: Buffer): 'png' | 'jpg' | null {
  if (
    buf.length > 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return 'png';
  }
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'jpg';
  }
  return null;
}
