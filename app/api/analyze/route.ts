import { NextRequest, NextResponse } from "next/server";
import { crawlSite } from "@/lib/capture";
import { auditSite } from "@/lib/audit";
import { aiReviewAndRedesign, resolveApiKey } from "@/lib/ai";
import { templateRedesign } from "@/lib/template";
import type { AnalyzeResult, Finding, PageAudit } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let url: string, maxPages: number, apiKey: string | undefined;
  try {
    const body = await req.json();
    url = body.url;
    maxPages = Math.min(Math.max(parseInt(body.maxPages, 10) || 1, 1), 6);
    apiKey = body.apiKey;
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

    // Aggregate: site score = average of page scores; dedup findings by title.
    const score = Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length);
    const seen = new Set<string>();
    const allFindings: Finding[] = [];
    const breakdown: Record<string, number> = {};
    for (const p of pages) {
      for (const f of p.findings) {
        breakdown[f.category] = (breakdown[f.category] || 0) + 1;
        if (seen.has(f.title)) continue;
        seen.add(f.title);
        allFindings.push(f);
      }
    }

    const aiRequested = !!resolveApiKey(apiKey);
    let review: string;
    let redesignHtml: string;
    let redesignSource: "ai" | "template";

    const ai = aiRequested
      ? await aiReviewAndRedesign(pages, allFindings, apiKey)
      : null;
    if (ai) {
      review = ai.review;
      redesignHtml = ai.redesignHtml;
      redesignSource = "ai";
    } else {
      redesignHtml = templateRedesign(pages, allFindings);
      redesignSource = "template";
      review = buildHeuristicReview(pages, allFindings, score, aiRequested);
    }

    const result: AnalyzeResult = {
      pages,
      score,
      scoreBreakdown: breakdown,
      review,
      redesignHtml,
      redesignSource,
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

function buildHeuristicReview(
  pages: PageAudit[],
  findings: Finding[],
  score: number,
  aiRequested: boolean
): string {
  const crit = findings.filter((f) => f.severity === "critical").length;
  const warn = findings.filter((f) => f.severity === "warning").length;
  const lines: string[] = [];
  lines.push(
    `Heuristic review of ${pages[0].capture.finalUrl} — ${pages.length} page(s), overall score ${score}/100.`,
    "",
    `Pages audited: ${pages.map((p) => p.capture.finalUrl).join(", ")}`,
    "",
    `Found ${crit} critical and ${warn} warning issue type(s). Top priorities:`
  );
  for (const f of findings.filter((x) => x.severity === "critical" || x.severity === "warning").slice(0, 7)) {
    lines.push(`• ${f.title} — ${f.recommendation}`);
  }
  lines.push(
    "",
    aiRequested
      ? "AI redesign was attempted but unavailable (check the API key/model); showing a templated redesign instead."
      : "No API key provided, so this redesign is a responsive, accessible template built from your real content. Add a key (UI field or ANTHROPIC_API_KEY) for an AI-authored, screenshot-aware redesign."
  );
  return lines.join("\n");
}
