import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

/** Serves generated render files from data/renders. */
export async function GET(
  _req: NextRequest,
  { params }: { params: { name: string } },
) {
  // Names are pure hex (randomUUID with dashes stripped); no dash, matching
  // imageFilePath so a served render can always be chained.
  if (!/^[a-f0-9]{12}\.(png|jpg)$/.test(params.name)) {
    return NextResponse.json({ error: 'ukjent fil' }, { status: 404 });
  }
  try {
    const bytes = await readFile(path.join(process.cwd(), 'data', 'renders', params.name));
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': params.name.endsWith('.png') ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'private, max-age=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'ukjent fil' }, { status: 404 });
  }
}
