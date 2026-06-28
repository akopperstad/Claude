import { NextRequest, NextResponse } from "next/server";
import { queryLeads, stats } from "@/lib/engine/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  try {
    const result = queryLeads({
      minRevenue: q.get("minRevenue") ? Number(q.get("minRevenue")) : undefined,
      qualifiedOnly: q.get("qualifiedOnly") === "1",
      weakSiteOnly: q.get("weakSiteOnly") === "1",
      kommune: q.get("kommune") || undefined,
      sort: (q.get("sort") as any) || "total",
      limit: q.get("limit") ? Number(q.get("limit")) : 100,
      offset: q.get("offset") ? Number(q.get("offset")) : 0,
    });
    return NextResponse.json({ ...result, stats: stats() });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Query failed", rows: [], total: 0 }, { status: 500 });
  }
}
