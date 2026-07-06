import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * POST /api/finn {url} -> {images: [{url}]}
 * Fetches a finn.no listing the user pasted and returns its gallery photos
 * so they can pick the exterior shot. User-initiated, one listing at a time.
 * Only finn.no is fetched and only finncdn image URLs are returned (SSRF
 * guard) — the import endpoint enforces the same host allowlist.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const url = typeof body?.url === 'string' ? body.url.trim() : '';
  if (!/^https:\/\/(www\.)?finn\.no\//.test(url) || url.length > 500) {
    return NextResponse.json({ error: 'lim inn en gyldig finn.no-lenke' }, { status: 400 });
  }
  let html: string;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) VolingBeta/0.1' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`finn svarte ${res.status}`);
    html = await res.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'ukjent feil';
    return NextResponse.json(
      { error: `Klarte ikke å hente annonsen (${message}). Last opp bildet manuelt i stedet.` },
      { status: 502 },
    );
  }

  const matches = html.match(
    /https:\/\/images\.finncdn\.no\/dynamic\/1280w\/[^"'\\ ]+\.(?:jpg|jpeg|png|webp)/g,
  );
  // The page repeats each photo in several size variants; the trailing UUID
  // segment identifies the actual image.
  const seen = new Set<string>();
  const images: string[] = [];
  for (const m of matches ?? []) {
    const key = m.split('/').at(-1) ?? m;
    if (!seen.has(key)) {
      seen.add(key);
      images.push(m);
    }
    if (images.length >= 24) break;
  }
  if (images.length === 0) {
    return NextResponse.json(
      { error: 'Fant ingen bilder i annonsen — last opp bildet manuelt i stedet.' },
      { status: 404 },
    );
  }
  return NextResponse.json({ images });
}
