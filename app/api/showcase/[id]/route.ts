import { NextRequest, NextResponse } from "next/server";
import { getOutreach } from "@/lib/engine/db";

export const runtime = "nodejs";

// Serve a stored showcase as a standalone page (this is the link in the email).
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const row: any = getOutreach(Number(params.id));
  if (!row || !row.showcase_html) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(row.showcase_html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
