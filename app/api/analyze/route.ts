import { NextRequest, NextResponse } from "next/server";
import { captureSite } from "@/lib/capture";
import { auditSite } from "@/lib/audit";
import { aiReviewAndRedesign, aiAvailable } from "@/lib/ai";
import { templateRedesign } from "@/lib/template";
import type { AnalyzeResult, CaptureResult, Finding } from "@/lib/types";

// Playwright + the Anthropic SDK need the Node runtime, and capture can be slow.
export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  let url: string;
  try {
    ({ url } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!url || typeof url !== "string" || url.trim().length < 3) {
    return NextResponse.json({ error: "Provide a website URL." }, { status: 400 });
  }

  try {
    const capture = await captureSite(url);
    const { findings, score, breakdown } = auditSite(capture);

    let review: string;
    let redesignHtml: string;
    let redesignSource: "ai" | "template";

    const ai = await aiReviewAndRedesign(capture, findings);
    if (ai) {
      review = ai.review;
      redesignHtml = ai.redesignHtml;
      redesignSource = "ai";
    } else {
      redesignHtml = templateRedesign(capture, findings);
      redesignSource = "template";
      review = buildHeuristicReview(capture, findings, score);
    }

    const result: AnalyzeResult = {
      capture,
      findings,
      score,
      scoreBreakdown: breakdown,
      review,
      redesignHtml,
      redesignSource,
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
  c: CaptureResult,
  findings: Finding[],
  score: number
): string {
  const crit = findings.filter((f) => f.severity === "critical").length;
  const warn = findings.filter((f) => f.severity === "warning").length;
  const lines: string[] = [];
  lines.push(
    `Heuristic review of ${c.finalUrl} — overall score ${score}/100.`,
    "",
    `Found ${crit} critical and ${warn} warning issue(s). Top priorities:`
  );
  for (const f of findings.filter((x) => x.severity !== "good" && x.severity !== "info").slice(0, 6)) {
    lines.push(`• ${f.title} — ${f.recommendation}`);
  }
  lines.push(
    "",
    aiAvailable()
      ? "AI redesign was attempted but unavailable; showing a clean templated redesign instead."
      : "No ANTHROPIC_API_KEY set, so this redesign is generated from a responsive, accessible template using your real content. Add a key to get an AI-authored, screenshot-aware redesign."
  );
  return lines.join("\n");
}
