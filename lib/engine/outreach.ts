import { queryLeads, insertOutreach, updateOutreach, getOutreach, outreachExists, isSuppressed, log } from "./db";
import { generateShowcaseHtml, type ShowcaseLead } from "./showcase";
import { discoverEmail } from "./emailDiscover";
import { composeEmail } from "./emailCompose";
import { sendMail, smtpConfigured } from "./mailer";

async function pool<T>(items: T[], n: number, fn: (t: T) => Promise<void>) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) await fn(items[i++]);
  }));
}

// Generate ready-to-review outreach drafts for the top-scoring qualified leads:
// a sector-styled showcase + a personalized email (when an address is found).
// Tier-2 cost (email discovery) is spent only here, on the shortlist.
export async function generateDrafts(campaign: string, topN: number): Promise<{ created: number; withEmail: number; needsEmail: number }> {
  // Email outreach can only reach firms that have a website (→ discoverable
  // address). The hottest no-site leads belong to a phone/postal channel and are
  // surfaced on the Leads board instead. So target emailable qualified leads here.
  const candidates = queryLeads({ qualifiedOnly: true, sort: "total", limit: 200 }).rows as any[];
  const rows = candidates.filter((l) => l.has_website).slice(0, Math.min(topN, 100));
  let created = 0, withEmail = 0, needsEmail = 0;
  log("info", "outreach", `Generating drafts for top ${rows.length} emailable qualified leads (campaign: ${campaign})`);

  await pool(rows as any[], 5, async (lead) => {
    if (outreachExists(lead.orgnr, campaign)) return;
    try {
      const showcase = generateShowcaseHtml(lead as ShowcaseLead);
      const email = lead.has_website ? await discoverEmail(lead.website) : null;
      const id = insertOutreach({
        orgnr: lead.orgnr, navn: lead.navn, campaign,
        to_email: email, to_name: null,
        subject: "", body_text: "", body_html: "", showcase_html: showcase,
        total_score: lead.total_score, status: email ? "draft" : "needs_email",
      });
      if (email) {
        const c = composeEmail(lead as ShowcaseLead, id, email);
        updateOutreach(id, { subject: c.subject, body_text: c.text, body_html: c.html });
        withEmail++;
        log("info", "outreach", `Draft ready: ${lead.navn} → ${email}`, lead.orgnr);
      } else {
        needsEmail++;
        log("warn", "outreach", `No email found for ${lead.navn} — showcase ready, recipient needed`, lead.orgnr);
      }
      created++;
    } catch (e: any) {
      log("error", "outreach", `Draft failed for ${lead.navn}: ${e?.message || e}`, lead.orgnr);
    }
  });

  log("info", "outreach", `Drafts done — ${created} created (${withEmail} with email, ${needsEmail} need email)`);
  return { created, withEmail, needsEmail };
}

export async function sendDraft(id: number, opts: { force?: boolean } = {}): Promise<{ status: string; dryRun: boolean; error?: string }> {
  const row: any = getOutreach(id);
  if (!row) return { status: "not_found", dryRun: false, error: "draft not found" };
  if (row.status === "optout") return { status: "optout", dryRun: false, error: "recipient opted out" };
  if (!row.to_email) { updateOutreach(id, { status: "needs_email" }); return { status: "needs_email", dryRun: false, error: "no recipient email" }; }
  if (isSuppressed(row.to_email)) { updateOutreach(id, { status: "optout" }); return { status: "optout", dryRun: false, error: "recipient suppressed" }; }
  if (row.status === "sent" && !opts.force) return { status: "sent", dryRun: false };

  const res = await sendMail(row.to_email, row.subject, row.body_text, row.body_html);
  const status = res.ok ? (res.dryRun ? "sent_dry" : "sent") : "failed";
  updateOutreach(id, { status, error: res.error || null, sent_at: new Date().toISOString() });
  log(res.ok ? "info" : "error", "send",
    `${row.navn} → ${row.to_email}: ${res.dryRun ? "DRY-RUN (no SMTP configured)" : res.ok ? "sent" : "FAILED: " + res.error}`,
    row.orgnr);
  return { status, dryRun: res.dryRun, error: res.error };
}

export function liveSendingEnabled(): boolean {
  return smtpConfigured();
}
