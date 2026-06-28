import { NextRequest, NextResponse } from "next/server";
import { listOutreach, outreachStats, getOutreach } from "@/lib/engine/db";
import { liveSendingEnabled } from "@/lib/engine/outreach";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const row = getOutreach(Number(id));
    if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(row);
  }
  const status = req.nextUrl.searchParams.get("status") || undefined;
  return NextResponse.json({
    rows: listOutreach(status),
    stats: outreachStats(),
    liveSending: liveSendingEnabled(),
  });
}
