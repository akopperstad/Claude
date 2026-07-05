import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Soft per-visitor daily render quota for the free beta (A15).
 * Protects the API bill, not a security boundary — a cookie wipe resets it,
 * which is fine at beta scale. Real accounts arrive with payment.
 */

export const DAILY_LIMIT = 10;

const DIR = path.join(process.cwd(), 'data', 'quota');

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function consumeQuota(visitorId: string): Promise<{ ok: boolean; used: number }> {
  if (!/^[a-f0-9-]{8,40}$/.test(visitorId)) return { ok: false, used: 0 };
  await mkdir(DIR, { recursive: true });
  const file = path.join(DIR, `${visitorId}-${today()}.json`);
  let used = 0;
  try {
    used = (JSON.parse(await readFile(file, 'utf8')) as { used: number }).used;
  } catch {
    // first render today
  }
  if (used >= DAILY_LIMIT) return { ok: false, used };
  await writeFile(file, JSON.stringify({ used: used + 1 }));
  return { ok: true, used: used + 1 };
}
