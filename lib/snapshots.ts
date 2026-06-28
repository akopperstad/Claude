import type { Finding, PageAudit, Snapshot } from "./types";
import { getStyle } from "./styles";
import { sectorById } from "./sector";
import { templateRedesign } from "./template";
import { aiSnapshot, resolveApiKey } from "./ai";

// Dedup findings by title across pages and tally category breakdown.
export function aggregate(pages: PageAudit[]): {
  allFindings: Finding[];
  breakdown: Record<string, number>;
} {
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
  return { allFindings, breakdown };
}

// Build the 3 sector-matched redesign snapshots + a review. Uses AI per snapshot
// when a key is available, otherwise the theme-driven template. Shared by the
// /api/analyze (with crawl) and /api/restyle (no crawl) routes.
export async function generateSnapshots(
  pages: PageAudit[],
  allFindings: Finding[],
  sectorId: string,
  apiKey?: string
): Promise<{ snapshots: Snapshot[]; review: string; aiRequested: boolean }> {
  const sector = sectorById(sectorId);
  const styleIds = sector.styles.slice(0, 3);
  const key = resolveApiKey(apiKey);
  const aiRequested = !!key;

  const snapshots: Snapshot[] = [];
  let aiReview: string | undefined;

  for (let i = 0; i < styleIds.length; i++) {
    const style = getStyle(styleIds[i]);
    let html: string | null = null;
    let source: "ai" | "template" = "template";

    if (key) {
      const out = await aiSnapshot(
        pages,
        allFindings,
        style,
        sector.label,
        key,
        i === 0 // request the prose review only on the first call
      );
      if (out) {
        html = out.html;
        source = "ai";
        if (out.review && !aiReview) aiReview = out.review;
      }
    }
    if (!html) html = templateRedesign(pages, allFindings, style);

    snapshots.push({
      id: style.id,
      styleName: style.name,
      vibe: style.vibe,
      source,
      html,
    });
  }

  const review = aiReview || buildHeuristicReview(pages, allFindings, sector.label, aiRequested);
  return { snapshots, review, aiRequested };
}

function buildHeuristicReview(
  pages: PageAudit[],
  findings: Finding[],
  sectorLabel: string,
  aiRequested: boolean
): string {
  const score = Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length);
  const crit = findings.filter((f) => f.severity === "critical").length;
  const warn = findings.filter((f) => f.severity === "warning").length;
  const lines: string[] = [];
  lines.push(
    `Heuristic review of ${pages[0].capture.finalUrl} — detected sector: ${sectorLabel}. ${pages.length} page(s), overall score ${score}/100.`,
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
      ? "AI redesign was attempted; any snapshot that failed fell back to a template style."
      : "No API key provided, so snapshots are responsive, accessible templates styled for the detected sector. Add a key (UI field or ANTHROPIC_API_KEY) for AI-authored, screenshot-aware snapshots."
  );
  return lines.join("\n");
}
