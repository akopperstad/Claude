import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getProject, save } from '@/lib/store';
import { paletteFor, renderLevel } from '@/lib/rendering';
import { consumeQuota, DAILY_LIMIT } from '@/lib/quota';
import { estimate } from '@pipeline/estimate';
import { LEVELS, type Level } from '@pipeline/levels';

export const runtime = 'nodejs';

/** POST /api/prosjekt/[id]/render  {level: 1-4, target?: string, wishes?: string} */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const project = await getProject(params.id);
  if (!project) return NextResponse.json({ error: 'ukjent prosjekt' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const level = Number(body?.level) as Level;
  const spec = LEVELS[level];
  if (!spec) return NextResponse.json({ error: 'ugyldig nivå' }, { status: 400 });

  const visitorId = req.cookies.get('vid')?.value ?? randomUUID();
  const quota = await consumeQuota(visitorId);
  if (!quota.ok) {
    return NextResponse.json(
      { error: `Dagens ${DAILY_LIMIT} gratis visualiseringer er brukt opp — prøv igjen i morgen.` },
      { status: 429 },
    );
  }

  const palette = spec.aiPalette || !body?.target ? await paletteFor(project.analysis) : undefined;
  const target: string = body?.target ?? palette?.cladding ?? 'klassisk hvit';
  const wishes: string | undefined =
    typeof body?.wishes === 'string' && body.wishes.trim()
      ? body.wishes.trim().slice(0, 400)
      : undefined;

  let outcome;
  try {
    outcome = await renderLevel(
      project.demo,
      project.photoPath,
      project.analysis,
      level,
      target,
      wishes,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'rendering feilet';
    console.error('render failed:', message);
    return NextResponse.json({ error: `Rendering feilet: ${message}` }, { status: 502 });
  }

  const record = {
    level,
    target: outcome.target,
    imageUrl: outcome.imageUrl,
    estimate: estimate(project.analysis, level),
    palette,
    createdAt: new Date().toISOString(),
  };
  project.renders.push(record);
  await save(project);

  const res = NextResponse.json({ ...record, demoSubstituted: outcome.demoSubstituted });
  res.cookies.set('vid', visitorId, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
