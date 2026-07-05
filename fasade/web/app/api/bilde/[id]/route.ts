import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import { getProject } from '@/lib/store';

export const runtime = 'nodejs';

/** Serves an uploaded project photo (demo photos live in /public). */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const project = await getProject(params.id);
  if (!project || project.demo) {
    return NextResponse.json({ error: 'ukjent bilde' }, { status: 404 });
  }
  try {
    const bytes = await readFile(project.photoPath);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': project.photoPath.endsWith('.png') ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'bilde borte' }, { status: 404 });
  }
}
