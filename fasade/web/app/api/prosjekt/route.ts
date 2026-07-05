import { NextRequest, NextResponse } from 'next/server';
import { createProject, saveUpload } from '@/lib/store';
import { analyzePhoto, DEMO_ANALYSIS } from '@/lib/rendering';

export const runtime = 'nodejs';

/**
 * POST /api/prosjekt
 * multipart: photo=<file>       -> upload flow
 * json: {demo: true}            -> example-house flow
 * json: {finnImageUrl: string}  -> finn.no import (A16.4/A17)
 */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));

    // finn.no import: the server downloads ONLY from finn's image CDN —
    // never an arbitrary URL — then runs the normal upload flow.
    if (typeof body?.finnImageUrl === 'string') {
      if (!body.finnImageUrl.startsWith('https://images.finncdn.no/dynamic/')) {
        return NextResponse.json({ error: 'ugyldig bildekilde' }, { status: 400 });
      }
      const res = await fetch(body.finnImageUrl);
      if (!res.ok) {
        return NextResponse.json({ error: 'klarte ikke hente bildet' }, { status: 502 });
      }
      const mime = res.headers.get('content-type') ?? '';
      const ext = mime.includes('png') || body.finnImageUrl.endsWith('.png') ? 'png' : 'jpg';
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length > 20 * 1024 * 1024) {
        return NextResponse.json({ error: 'bildet er for stort' }, { status: 400 });
      }
      const photoPath = await saveUpload(bytes, ext);
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
