import { NextRequest, NextResponse } from "next/server";
import { sectorById } from "@/lib/sector";
import { generateSnapshots, aggregate } from "@/lib/snapshots";
import type { PageAudit, Snapshot } from "@/lib/types";

// Regenerate snapshots for a different sector WITHOUT re-crawling. The client
// posts back the pages it already has, so this is instant for template styles
// (and only re-calls the model in AI mode).
export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let pages: PageAudit[], sector: string, apiKey: string | undefined;
  try {
    const body = await req.json();
    pages = body.pages;
    sector = body.sector;
    apiKey = body.apiKey;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!Array.isArray(pages) || pages.length === 0) {
    return NextResponse.json({ error: "Missing pages." }, { status: 400 });
  }

  try {
    const { allFindings } = aggregate(pages);
    const sectorId = sectorById(sector).id;
    const { snapshots, review, aiRequested } = await generateSnapshots(
      pages,
      allFindings,
      sectorId,
      apiKey
    );
    const out: { snapshots: Snapshot[]; review: string; sector: string; sectorLabel: string; aiRequested: boolean } = {
      snapshots,
      review,
      sector: sectorId,
      sectorLabel: sectorById(sectorId).label,
      aiRequested,
    };
    return NextResponse.json(out);
  } catch (e: any) {
    console.error("Restyle failed:", e);
    return NextResponse.json({ error: e?.message || "Restyle failed" }, { status: 500 });
  }
}
