import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * POST /api/finn {url}
 * Fetches a finn.no listing and returns its gallery image URLs, normalized
 * to the 1600w rendition (A16.4). Import is for the user's own private
 * visualization during the beta — the A17 legal review gate stands before
 * any public launch. The server never fetches arbitrary hosts: input must
 * be finn.no, output is always images.finncdn.no.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const raw = typeof body?.url === 'string' ? body.url.trim() : '';

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return NextResponse.json({ error: 'ugyldig lenke' }, { status: 400 });
  }
  if (!/(^|\.)finn\.no$/.test(url.hostname)) {
    return NextResponse.json({ error: 'lim inn en finn.no-lenke' }, { status: 400 });
  }

  let html: string;
  try {
    const res = await fetch(url.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        Accept: 'text/html',
      },
    });
    if (!res.ok) throw new Error(`finn.no svarte ${res.status}`);
    html = await res.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'klarte ikke hente annonsen';
    return NextResponse.json({ error: `Klarte ikke hente annonsen: ${message}` }, { status: 502 });
  }

  const seen = new Set<string>();
  const images: string[] = [];
  const re = /images\.finncdn\.no\/dynamic\/(?:\d+w|\d+x\d+c?)\/([^"'\\)\s&?]+\.(?:jpe?g|png))/g;
  for (const m of html.matchAll(re)) {
    const rest = m[1];
    if (rest.includes('profile_placeholders') || rest.includes('logo')) continue;
    if (seen.has(rest)) continue;
    seen.add(rest);
    images.push(`https://images.finncdn.no/dynamic/1600w/${rest}`);
    if (images.length >= 24) break;
  }

  if (!images.length) {
    return NextResponse.json(
      { error: 'fant ingen bilder i annonsen — prøv å laste opp bildet manuelt' },
      { status: 404 },
    );
  }
  const title = html.match(/<title>([^<]{3,120})/)?.[1]?.replace(/\s*\|.*$/, '') ?? null;
  return NextResponse.json({ images, title });
}
