import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getProject, save, type RenderRecord } from '@/lib/store';
import { paletteFor, renderEdit, renderLevel } from '@/lib/rendering';
import { consumeQuota, DAILY_LIMIT } from '@/lib/quota';
import { estimate } from '@pipeline/estimate';
import { LEVELS, type Level } from '@pipeline/levels';

export const runtime = 'nodejs';

/**
 * POST /api/prosjekt/[id]/render
 *   {level: 1-4, target?: string, wishes?: string}          -> fresh render
 *   {baseRenderId: string, instruction: string}             -> chained edit of
 *                                                              a previous render (A16.3)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const project = await getProject(params.id);
  if (!project) return NextResponse.json({ error: 'ukjent prosjekt' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const chained = typeof body?.baseRenderId === 'string';

  let parent: RenderRecord | undefined;
  let level: Level;
  let instruction = '';
  if (chained) {
    parent = project.renders.find((r) => r.id === body.baseRenderId);
    if (!parent) return NextResponse.json({ error: 'ukjent render å justere' }, { status: 404 });
    instruction = typeof body?.instruction === 'string' ? body.instruction.trim().slice(0, 400) : '';
    if (!instruction) return NextResponse.json({ error: 'skriv hva som skal justeres' }, { status: 400 });
    level = parent.level;
  } else {
    level = Number(body?.level) as Level;
    if (!LEVELS[level]) return NextResponse.json({ error: 'ugyldig nivå' }, { status: 400 });
  }

  const visitorId = req.cookies.get('vid')?.value ?? randomUUID();
  const quota = await consumeQuota(visitorId);
  if (!quota.ok) {
    return NextResponse.json(
      { error: `Dagens ${DAILY_LIMIT} gratis visualiseringer er brukt opp — prøv igjen i morgen.` },
      { status: 429 },
    );
  }

  let record: RenderRecord;
  let demoSubstituted: boolean;
  try {
    if (chained && parent) {
      const outcome = await renderEdit(parent.imageUrl, project.analysis, instruction);
      demoSubstituted = outcome.demoSubstituted;
      record = {
        id: randomUUID().slice(0, 8),
        parentId: parent.id,
        instruction,
        level,
        target: outcome.target,
        imageUrl: outcome.imageUrl,
        estimate: parent.estimate,
        palette: parent.palette,
        createdAt: new Date().toISOString(),
      };
    } else {
      const spec = LEVELS[level];
      const palette =
        spec.aiPalette || !body?.target ? await paletteFor(project.analysis) : undefined;
      const target: string = body?.target ?? palette?.cladding ?? 'klassisk hvit';
      const wishes: string | undefined =
        typeof body?.wishes === 'string' && body.wishes.trim()
          ? body.wishes.trim().slice(0, 400)
          : undefined;
      const outcome = await renderLevel(
        project.demo,
        project.photoPath,
        project.analysis,
        level,
        target,
        wishes,
      );
      demoSubstituted = outcome.demoSubstituted;
      record = {
        id: randomUUID().slice(0, 8),
        level,
        target: outcome.target,
        imageUrl: outcome.imageUrl,
        estimate: estimate(project.analysis, level),
        palette,
        createdAt: new Date().toISOString(),
      };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'rendering feilet';
    console.error('render failed:', message);
    return NextResponse.json({ error: `Rendering feilet: ${message}` }, { status: 502 });
  }

  project.renders.push(record);
  await save(project);

  const res = NextResponse.json({ ...record, demoSubstituted });
  res.cookies.set('vid', visitorId, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
