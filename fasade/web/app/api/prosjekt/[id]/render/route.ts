import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getProject, appendRender, type RenderRecord } from '@/lib/store';
import { paletteFor, renderEdit, renderLevel, visionBriefFor } from '@/lib/rendering';
import { consumeQuota, refundQuota, DAILY_LIMIT } from '@/lib/quota';
import { logEvent } from '@/lib/telemetry';
import { estimate } from '@pipeline/estimate';
import { LEVELS, type Level } from '@pipeline/levels';
import { EXTERIOR_STYLES } from '@pipeline/presets';
import { stagingDefault } from '@pipeline/staging';

export const runtime = 'nodejs';

/**
 * POST /api/prosjekt/[id]/render
 *   fresh render: {level: 1-4, target?: string, wishes?: string,
 *                  styleId?: string, staging?: boolean,
 *                  inspirationBase64?: string, inspirationMime?: string}
 *   chained edit (A16.3): {baseRenderId: string, instruction: string}
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
    // Number(true) === 1, so require an actual integer nivå.
    level = Number(body?.level) as Level;
    if (!Number.isInteger(level) || !LEVELS[level]) {
      return NextResponse.json({ error: 'ugyldig nivå' }, { status: 400 });
    }
  }

  // Chained edits cost 1; fresh renders cost their nivå's weight (A23).
  const quotaCost = chained ? 1 : LEVELS[level].quotaCost;
  const visitorId = req.cookies.get('vid')?.value ?? randomUUID();
  // Stamp the visitor cookie on EVERY response (not just success), so a new
  // visitor whose first render errors still gets a stable id next time.
  const withVid = (res: NextResponse) => {
    res.cookies.set('vid', visitorId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  };
  const quota = await consumeQuota(visitorId, quotaCost);
  if (!quota.ok) {
    return withVid(
      NextResponse.json(
        { error: `Dagens ${DAILY_LIMIT} gratis render-poeng er brukt opp. Prøv igjen i morgen.` },
        { status: 429 },
      ),
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
        staging: parent.staging,
        styleId: parent.styleId,
        modelUsed: outcome.modelUsed,
        createdAt: new Date().toISOString(),
      };
    } else {
      const spec = LEVELS[level];
      const style = EXTERIOR_STYLES.find((s) => s.id === body?.styleId);
      const staging =
        typeof body?.staging === 'boolean' ? body.staging : stagingDefault(level);
      const wishes: string | undefined =
        typeof body?.wishes === 'string' && body.wishes.trim()
          ? body.wishes.trim().slice(0, 400)
          : undefined;

      // Target: explicit user pick > style package > palette suggestion.
      const userTarget: string | undefined =
        typeof body?.target === 'string' && body.target.trim()
          ? body.target.trim().slice(0, 200)
          : undefined;

      // Palette: nivå 3-4 always (AI scheme); nivå 2 harmonizes around the
      // chosen cladding (A22); nivå 1 only when the user asked for a
      // suggestion by picking nothing (A2 "overrask meg").
      let palette;
      const anchor = level === 2 ? userTarget ?? style?.target : undefined;
      if (spec.aiPalette || level === 2 || !userTarget) {
        // A palette-service hiccup must not fail a render — degrade to the
        // user's own target / a default rather than dying.
        try {
          palette = await paletteFor(project.analysis, anchor);
        } catch (e) {
          console.warn('palette failed, continuing without:', e instanceof Error ? e.message : e);
        }
      }

      const target: string =
        userTarget ?? style?.target ?? palette?.cladding ?? 'klassisk hvit';

      // Nivå 4 two-pass: bespoke architect brief (A22). A failure falls back
      // to buildPrompt's static bold brief, so never let it kill the render.
      let brief: string | undefined;
      if (level === 4) {
        try {
          brief = await visionBriefFor(project.analysis, style?.direction, wishes);
        } catch (e) {
          console.warn('vision brief failed, using static fallback:', e instanceof Error ? e.message : e);
        }
      }

      const inspiration =
        typeof body?.inspirationBase64 === 'string' &&
        body.inspirationBase64.length > 0 &&
        body.inspirationBase64.length < 15_000_000 &&
        level >= 3
          ? {
              base64: body.inspirationBase64,
              mimeType: body?.inspirationMime === 'image/png' ? 'image/png' : 'image/jpeg',
            }
          : undefined;

      const outcome = await renderLevel(
        project.demo,
        project.photoPath,
        project.analysis,
        level,
        target,
        wishes,
        { palette, staging, brief },
        inspiration,
      );
      demoSubstituted = outcome.demoSubstituted;
      record = {
        id: randomUUID().slice(0, 8),
        level,
        target: outcome.target,
        imageUrl: outcome.imageUrl,
        estimate: estimate(project.analysis, level, staging),
        palette,
        staging,
        styleId: style?.id,
        driftScore: outcome.driftScore,
        candidates: outcome.candidates,
        modelUsed: outcome.modelUsed,
        createdAt: new Date().toISOString(),
      };
    }
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const cause = (err as { cause?: { code?: string } })?.cause?.code;
    console.error('render failed:', raw, cause ?? '');
    await refundQuota(visitorId, quotaCost);
    // A network-layer failure ("fetch failed", "Connection error", ECONN…)
    // means we could not reach the render/analysis service — say so plainly.
    const networky = /fetch failed|connection|ECONN|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|socket|network|utilgjengelig/i.test(
      raw + ' ' + (cause ?? ''),
    );
    const melding = networky
      ? 'Kunne ikke nå render-tjenesten. Sjekk nettforbindelsen og API-nøkkelen, og prøv igjen. Poenget er ikke brukt.'
      : `Rendering feilet: ${raw}`;
    return withVid(NextResponse.json({ error: melding }, { status: 502 }));
  }

  // Atomic append: re-reads the project inside a per-id lock so a concurrent
  // render can't clobber this one (lost-update fix). Refund if the write
  // itself fails, so we never charge for a render we couldn't persist.
  try {
    await appendRender(params.id, record);
  } catch (err) {
    console.error('save failed:', err instanceof Error ? err.message : err);
    await refundQuota(visitorId, quotaCost);
    return withVid(
      NextResponse.json({ error: 'Klarte ikke lagre resultatet. Prøv igjen.' }, { status: 502 }),
    );
  }

  await logEvent({
    kind: 'render',
    level,
    chained,
    source: chained ? (body?.source === 'chip' ? 'chip' : 'text') : undefined,
    styleId: record.styleId,
    staging: record.staging,
    instruction: record.instruction,
    driftScore: record.driftScore,
    candidates: record.candidates,
    modelUsed: record.modelUsed,
    demoSubstituted,
  });

  return withVid(NextResponse.json({ ...record, demoSubstituted }));
}
