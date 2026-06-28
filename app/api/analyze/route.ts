import { NextRequest, NextResponse } from "next/server";
import { crawlSite } from "@/lib/capture";
import { auditSite } from "@/lib/audit";
import { detectSector, sectorById, sectorList } from "@/lib/sector";
import { generateSnapshots, aggregate } from "@/lib/snapshots";
import type { AnalyzeResult, PageAudit } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let url: string, maxPages: number, apiKey: string | undefined, sectorOverride: string | undefined;
  try {
    const body = await req.json();
    url = body.url;
    maxPages = Math.min(Math.max(parseInt(body.maxPages, 10) || 1, 1), 6);
    apiKey = body.apiKey;
    sectorOverride = body.sector;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!url || typeof url !== "string" || url.trim().length < 3) {
    return NextResponse.json({ error: "Provide a website URL." }, { status: 400 });
  }

  try {
    const captures = await crawlSite(url, maxPages);
    const pages: PageAudit[] = captures.map((capture) => {
      const { findings, score } = auditSite(capture);
      return { capture, findings, score };
    });

    const score = Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length);
    const { allFindings, breakdown } = aggregate(pages);

    // Sector: honor an explicit override, otherwise auto-detect.
    const detected = detectSector(captures);
    const sectorId = sectorOverride && sectorById(sectorOverride).id === sectorOverride
      ? sectorOverride
      : detected.id;
    const sector = sectorById(sectorId);

    const { snapshots, review, aiRequested } = await generateSnapshots(
      pages,
      allFindings,
      sectorId,
      apiKey
    );

    const result: AnalyzeResult = {
      pages,
      score,
      scoreBreakdown: breakdown,
      review,
      snapshots,
      sector: sectorId,
      sectorLabel: sector.label,
      sectorConfidence: sectorOverride ? 1 : detected.confidence,
      sectors: sectorList(),
      aiRequested,
    };
    return NextResponse.json(result);
  } catch (e: any) {
    console.error("Analyze failed:", e);
    return NextResponse.json(
      {
        error:
          "Could not load that site. Check the URL is reachable and public. " +
          (e?.message ? `(${e.message})` : ""),
      },
      { status: 502 }
    );
  }
}
