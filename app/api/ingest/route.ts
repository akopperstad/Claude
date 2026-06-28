import { NextRequest, NextResponse } from "next/server";
import { ingestSlice } from "@/lib/engine/ingest";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* empty body ok */
  }
  const limit = Math.min(Math.max(parseInt(body.limit, 10) || 100, 1), 1000);
  try {
    const res = await ingestSlice({
      kommunenummer: body.kommunenummer || undefined,
      naeringskode: body.naeringskode || undefined,
      limit,
      concurrency: Math.min(Math.max(parseInt(body.concurrency, 10) || 8, 1), 16),
    });
    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Ingest failed" }, { status: 500 });
  }
}
