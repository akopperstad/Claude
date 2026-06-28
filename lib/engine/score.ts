import type { Financials } from "./brreg";
import type { LiteAudit } from "./auditLite";

export interface LeadScore {
  qualify: boolean;
  afford: number; // 0-100 ability to pay
  bite: number; // 0-100 likelihood to need/want a new site
  total: number; // 0-100 overall lead quality
  reasons: string[];
}

// Minimum revenue (NOK) to bother pitching. Tunable per campaign.
const MIN_REVENUE = 1_000_000;

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);

// Combine financial health (can they pay?) with website weakness (do they need
// us?) into a single 0-100 lead score. Pure function — fast and testable.
export function scoreLead(fin: Financials | null, audit: LiteAudit): LeadScore {
  const reasons: string[] = [];

  // ---- Affordability (financial headroom) ----
  const revenue = fin?.revenue ?? 0;
  const profit = fin?.profit ?? null;
  let afford = 0;
  if (revenue > 0) {
    // log scale: 1M -> ~30, 10M -> ~60, 100M -> ~90
    afford = Math.max(0, Math.min(100, Math.round((Math.log10(revenue) - 5) * 30)));
  }
  if (profit != null && profit > 0) { afford = Math.min(100, afford + 12); reasons.push("Profitable"); }
  if (profit != null && profit < 0) { afford = Math.max(0, afford - 10); reasons.push("Loss-making"); }
  if (fin?.equity_ratio != null && fin.equity_ratio >= 0.3) { afford = Math.min(100, afford + 5); reasons.push(`Solid equity ${Math.round(fin.equity_ratio * 100)}%`); }
  if (revenue) reasons.push(`Revenue ${fmt(revenue)} kr`);

  const qualify = revenue >= MIN_REVENUE && (profit == null || profit > 0 || (fin?.equity ?? 0) > 0);

  // ---- Bite likelihood (website weakness) ----
  let bite = 100 - audit.score; // weak site => high bite
  if (!audit.hasSite) { bite = 100; reasons.push("No website at all"); }
  else if (!audit.reachable) { bite = 92; reasons.push("Website won't load"); }
  else {
    if (!audit.https) reasons.push("No HTTPS");
    if (!audit.viewport) reasons.push("Not mobile-friendly");
    if (!audit.title) reasons.push("Missing <title>");
    if (!audit.meta) reasons.push("No meta description");
    if (audit.words < 120) reasons.push("Thin content");
    if (audit.generator) reasons.push(`Builder: ${audit.generator}`);
  }
  bite = Math.max(0, Math.min(100, bite));

  // ---- Total ----
  const total = qualify
    ? Math.round(bite * 0.55 + afford * 0.45)
    : Math.round(bite * 0.25); // unaffordable leads are heavily downweighted
  if (!qualify) reasons.unshift(revenue < MIN_REVENUE ? "Below revenue threshold" : "Unqualified");

  return { qualify, afford, bite, total, reasons };
}
