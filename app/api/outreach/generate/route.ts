import { NextRequest, NextResponse } from "next/server";
import { generateDrafts } from "@/lib/engine/outreach";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch {}
  const campaign = (body.campaign || "default").toString().slice(0, 60);
  const topN = Math.min(Math.max(parseInt(body.topN, 10) || 10, 1), 100);
  try {
    const res = await generateDrafts(campaign, topN);
    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "generate failed" }, { status: 500 });
  }
}
