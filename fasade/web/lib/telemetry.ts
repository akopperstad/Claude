import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * Anonymous product telemetry (A25). Append-only jsonl on our own disk —
 * no photos, no identity beyond what the event itself carries (nothing).
 * Feeds the «Populære ideer» ranking and pricing decisions once real
 * traffic exists. Failures are swallowed: telemetry must never break a render.
 */

export interface RenderEvent {
  kind: 'render';
  level: number;
  chained: boolean;
  /** 'chip' when a Populære ideer chip fired the instruction (A25). */
  source?: 'chip' | 'text';
  styleId?: string;
  staging?: boolean;
  instruction?: string;
  driftScore?: number;
  candidates?: number;
  modelUsed?: string;
  demoSubstituted?: boolean;
}

/** Cookieless pageview (A27): path only, no visitor identity. */
export interface PageviewEvent {
  kind: 'pageview';
  path: string;
}

export type TelemetryEvent = RenderEvent | PageviewEvent;

export async function logEvent(event: TelemetryEvent): Promise<void> {
  try {
    const dir = path.join(process.cwd(), 'data');
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, 'telemetry.jsonl'),
      JSON.stringify({ at: new Date().toISOString(), ...event }) + '\n',
    );
  } catch {
    // never let telemetry break the product
  }
}
