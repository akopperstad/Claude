import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '@/lib/telemetry';

export const runtime = 'nodejs';

/**
 * POST /api/hendelse {path}
 * Cookieless pageview beacon (A27): stores the path and nothing else —
 * no visitor id, no user agent, no IP. Enough to see traffic and drop-off.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const path = typeof body?.path === 'string' ? body.path.slice(0, 200) : '';
  if (!path.startsWith('/')) {
    return NextResponse.json({ error: 'ugyldig' }, { status: 400 });
  }
  // project ids are per-visitor — normalize so paths aggregate
  const normalized = path.replace(/^\/prosjekt\/[a-f0-9-]+/, '/prosjekt/:id');
  await logEvent({ kind: 'pageview', path: normalized });
  return NextResponse.json({ ok: true });
}
