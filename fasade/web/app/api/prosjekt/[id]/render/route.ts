import { NextRequest, NextResponse } from 'next/server';
import { getProject, save } from '@/lib/store';
import { paletteFor, renderLevel } from '@/lib/rendering';
import { estimate } from '@pipeline/estimate';
import { LEVELS, type Level } from '@pipeline/levels';

export const runtime = 'nodejs';

/** POST /api/prosjekt/[id]/render  {level: 1-4, target?: string} */
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

  const palette = spec.aiPalette || !body?.target ? await paletteFor(project.analysis) : undefined;
  const target: string = body?.target ?? palette?.cladding ?? 'klassisk hvit';

  let outcome;
  try {
    outcome = await renderLevel(
      project.demo,
      project.photoPath,
      project.analysis,
      level,
      target,
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

  return NextResponse.json({ ...record, demoSubstituted: outcome.demoSubstituted });
}
