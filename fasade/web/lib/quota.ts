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

/** A render consumes its nivå's quota weight (A23: 1/1/2/3). */
export async function consumeQuota(
  visitorId: string,
  cost = 1,
): Promise<{ ok: boolean; used: number }> {
  // Founder/field-test bypass: set VOLING_UNLIMITED=1 in .env.local.
  if (process.env.VOLING_UNLIMITED === '1') return { ok: true, used: 0 };
  if (!/^[a-f0-9-]{8,40}$/.test(visitorId)) return { ok: false, used: 0 };
  await mkdir(DIR, { recursive: true });
  const file = path.join(DIR, `${visitorId}-${today()}.json`);
  let used = 0;
  try {
    used = (JSON.parse(await readFile(file, 'utf8')) as { used: number }).used;
  } catch {
    // first render today
  }
  if (used + cost > DAILY_LIMIT) return { ok: false, used };
  await writeFile(file, JSON.stringify({ used: used + cost }));
  return { ok: true, used: used + cost };
}

/** Failed renders give the points back — the charge is for an image, not an attempt. */
export async function refundQuota(visitorId: string, cost: number): Promise<void> {
  if (process.env.VOLING_UNLIMITED === '1') return;
  if (!/^[a-f0-9-]{8,40}$/.test(visitorId)) return;
  const file = path.join(DIR, `${visitorId}-${today()}.json`);
  try {
    const used = (JSON.parse(await readFile(file, 'utf8')) as { used: number }).used;
    await writeFile(file, JSON.stringify({ used: Math.max(0, used - cost) }));
  } catch {
    // nothing to refund
  }
}
