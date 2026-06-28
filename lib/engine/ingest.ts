import { searchCompanies, getFinancials } from "./brreg";
import { auditLite } from "./auditLite";
import { scoreLead } from "./score";
import {
  upsertCompanyCore, updateFinancials, updateAudit, updateScore,
  log, startRun, finishRun,
} from "./db";

export interface IngestOptions {
  kommunenummer?: string;
  naeringskode?: string;
  limit?: number; // max companies this run (bounds cost/time)
  concurrency?: number;
  pageSize?: number;
}

// Run N tasks with a fixed concurrency cap.
async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<void>) {
  let i = 0;
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx]);
    }
  });
  await Promise.all(workers);
}

// Ingest a slice of the registry: source → qualify (financials) → Tier-1 audit
// → score → store, with structured logging. Bounded by `limit` so a run never
// runs away on cost/time. For all-Norway, call repeatedly with paging or feed
// the bulk dataset.
export async function ingestSlice(opts: IngestOptions): Promise<{ processed: number; qualified: number; errors: number; runId: number }> {
  const limit = opts.limit ?? 200;
  const pageSize = Math.min(opts.pageSize ?? 50, 100);
  const concurrency = opts.concurrency ?? 8;
  const scope = `kommune=${opts.kommunenummer ?? "*"} nace=${opts.naeringskode ?? "*"} limit=${limit}`;
  const runId = startRun(scope);
  log("info", "ingest", `Run started — ${scope}`);

  let processed = 0, qualified = 0, errors = 0;
  let page = 0;

  try {
    while (processed < limit) {
      const { companies, total, totalPages } = await searchCompanies({
        kommunenummer: opts.kommunenummer,
        naeringskode: opts.naeringskode,
        size: pageSize,
        page,
      });
      if (page === 0) log("info", "source", `${total} companies match; ingesting up to ${limit}`);
      if (companies.length === 0) break;

      const batch = companies.slice(0, limit - processed);
      await pool(batch, concurrency, async (c) => {
        try {
          upsertCompanyCore(c);
          const [fin, audit] = await Promise.all([
            getFinancials(c.orgnr).catch(() => null),
            auditLite(c.website ?? null),
          ]);
          if (fin) updateFinancials(c.orgnr, fin);
          updateAudit(c.orgnr, audit);
          const s = scoreLead(fin, audit);
          updateScore(c.orgnr, s);
          if (s.qualify) qualified++;
          if (audit.error) log("warn", "audit", `${c.navn}: ${audit.error}`, c.orgnr);
        } catch (e: any) {
          errors++;
          log("error", "enrich", `${c.navn}: ${e?.message || e}`, c.orgnr);
        } finally {
          processed++;
        }
      });

      log("info", "progress", `Processed ${processed}/${limit} (qualified ${qualified}, errors ${errors})`);
      page++;
      if (page >= totalPages) break;
    }
    finishRun(runId, { processed, qualified, errors, status: "done" });
    log("info", "ingest", `Run done — processed ${processed}, qualified ${qualified}, errors ${errors}`);
  } catch (e: any) {
    errors++;
    finishRun(runId, { processed, qualified, errors, status: "failed" });
    log("error", "ingest", `Run failed: ${e?.message || e}`);
  }

  return { processed, qualified, errors, runId };
}
