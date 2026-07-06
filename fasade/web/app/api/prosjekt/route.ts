import { NextRequest, NextResponse } from 'next/server';
import { createProject, saveUpload } from '@/lib/store';
import { analyzePhoto, DEMO_ANALYSIS } from '@/lib/rendering';

export const runtime = 'nodejs';

/**
 * POST /api/prosjekt
 * multipart: photo=<file>  -> upload flow
 * json: {demo: true}       -> example-house flow
 */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));

    if (typeof body?.imageUrl === 'string') {
      // finn.no import: only finncdn images, picked by the user in /ny
      if (!/^https:\/\/images\.finncdn\.no\//.test(body.imageUrl) || body.imageUrl.length > 500) {
        return NextResponse.json({ error: 'ugyldig bildelenke' }, { status: 400 });
      }
      const res = await fetch(body.imageUrl, { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) {
        return NextResponse.json({ error: 'klarte ikke å hente bildet' }, { status: 502 });
      }
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length > 15 * 1024 * 1024) {
        return NextResponse.json({ error: 'bildet er for stort' }, { status: 400 });
      }
      const photoPath = await saveUpload(bytes, 'jpg');
      const analysis = await analyzePhoto(photoPath);
      const project = await createProject({ demo: false, photoPath, analysis });
      return NextResponse.json(project);
    }

    if (!body?.demo) {
      return NextResponse.json({ error: 'photo mangler' }, { status: 400 });
    }
    const project = await createProject({
      demo: true,
      photoPath: '/demo/e2-for.jpg',
      analysis: DEMO_ANALYSIS,
    });
    return NextResponse.json(project);
  }

  const form = await req.formData();
  const photo = form.get('photo');
  if (!(photo instanceof File)) {
    return NextResponse.json({ error: 'photo mangler' }, { status: 400 });
  }
  if (photo.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: 'bildet er for stort (maks 15 MB)' }, { status: 400 });
  }
  const ext = photo.type === 'image/png' ? 'png' : 'jpg';
  const photoPath = await saveUpload(Buffer.from(await photo.arrayBuffer()), ext);
  const analysis = await analyzePhoto(photoPath);
  const project = await createProject({ demo: false, photoPath, analysis });
  return NextResponse.json(project);
}
