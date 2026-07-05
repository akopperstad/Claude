import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * POST /api/interesse {email, projectId?}
 * Beta lead capture: people who want their report by e-mail / launch news.
 * Appends to data/leads.jsonl — the seed of the håndverker-lead funnel.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'ugyldig e-postadresse' }, { status: 400 });
  }
  const dir = path.join(process.cwd(), 'data');
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, 'leads.jsonl'),
    JSON.stringify({
      email,
      projectId: typeof body?.projectId === 'string' ? body.projectId.slice(0, 16) : null,
      at: new Date().toISOString(),
    }) + '\n',
  );
  return NextResponse.json({ ok: true });
}
