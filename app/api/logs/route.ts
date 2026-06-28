import { NextRequest, NextResponse } from "next/server";
import { recentLogs, recentRuns } from "@/lib/engine/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  try {
    return NextResponse.json({
      logs: recentLogs(q.get("limit") ? Number(q.get("limit")) : 120, q.get("level") || undefined),
      runs: recentRuns(20),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Logs failed", logs: [], runs: [] }, { status: 500 });
  }
}
