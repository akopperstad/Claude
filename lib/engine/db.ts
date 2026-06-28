import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

// SQLite-backed store for the lead engine. node:sqlite is built into Node 22 —
// no native build. For production at scale, swap this layer for Postgres; the
// query surface below is intentionally small and easy to port.
let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (_db) return _db;
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, "pilhammer.db"));
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS companies (
      orgnr TEXT PRIMARY KEY,
      navn TEXT,
      kommunenr TEXT,
      kommune TEXT,
      nace TEXT,
      nace_desc TEXT,
      orgform TEXT,
      employees INTEGER,
      website TEXT,
      has_website INTEGER,
      registered TEXT,
      fin_year TEXT,
      revenue INTEGER,
      profit INTEGER,
      assets INTEGER,
      equity INTEGER,
      equity_ratio REAL,
      liquidity REAL,
      audit_status INTEGER,
      audit_https INTEGER,
      audit_meta INTEGER,
      audit_viewport INTEGER,
      audit_h1 INTEGER,
      audit_words INTEGER,
      audit_generator TEXT,
      audit_score INTEGER,
      audit_error TEXT,
      audited_at TEXT,
      qualify INTEGER,
      afford_score INTEGER,
      bite_score INTEGER,
      total_score INTEGER,
      reasons TEXT,
      created_at TEXT,
      updated_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_companies_total ON companies(total_score DESC);
    CREATE INDEX IF NOT EXISTS idx_companies_qualify ON companies(qualify);
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts TEXT, level TEXT, stage TEXT, orgnr TEXT, message TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_logs_ts ON logs(id DESC);
    CREATE TABLE IF NOT EXISTS runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT, finished_at TEXT, scope TEXT, status TEXT,
      processed INTEGER, qualified INTEGER, errors INTEGER
    );
    CREATE TABLE IF NOT EXISTS outreach (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orgnr TEXT, navn TEXT, campaign TEXT,
      to_email TEXT, to_name TEXT,
      subject TEXT, body_text TEXT, body_html TEXT, showcase_html TEXT,
      total_score INTEGER, status TEXT, error TEXT,
      created_at TEXT, sent_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_outreach_status ON outreach(status);
    CREATE TABLE IF NOT EXISTS suppression (
      email TEXT PRIMARY KEY, reason TEXT, ts TEXT
    );
  `);
  _db = db;
  return db;
}

const now = () => new Date().toISOString();

export interface CompanyCore {
  orgnr: string;
  navn: string;
  kommunenr?: string;
  kommune?: string;
  nace?: string;
  nace_desc?: string;
  orgform?: string;
  employees?: number | null;
  website?: string | null;
  registered?: string | null;
}

export function upsertCompanyCore(c: CompanyCore) {
  const db = getDb();
  db.prepare(
    `INSERT INTO companies (orgnr, navn, kommunenr, kommune, nace, nace_desc, orgform, employees, website, has_website, registered, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(orgnr) DO UPDATE SET
       navn=excluded.navn, kommunenr=excluded.kommunenr, kommune=excluded.kommune,
       nace=excluded.nace, nace_desc=excluded.nace_desc, orgform=excluded.orgform,
       employees=excluded.employees, website=excluded.website, has_website=excluded.has_website,
       registered=excluded.registered, updated_at=excluded.updated_at`
  ).run(
    c.orgnr, c.navn, c.kommunenr ?? null, c.kommune ?? null, c.nace ?? null,
    c.nace_desc ?? null, c.orgform ?? null, c.employees ?? null, c.website ?? null,
    c.website ? 1 : 0, c.registered ?? null, now(), now()
  );
}

export function updateFinancials(orgnr: string, f: {
  year?: string; revenue?: number | null; profit?: number | null;
  assets?: number | null; equity?: number | null; equity_ratio?: number | null; liquidity?: number | null;
}) {
  getDb().prepare(
    `UPDATE companies SET fin_year=?, revenue=?, profit=?, assets=?, equity=?, equity_ratio=?, liquidity=?, updated_at=? WHERE orgnr=?`
  ).run(f.year ?? null, f.revenue ?? null, f.profit ?? null, f.assets ?? null,
        f.equity ?? null, f.equity_ratio ?? null, f.liquidity ?? null, now(), orgnr);
}

export function updateAudit(orgnr: string, a: {
  status?: number | null; https?: boolean; meta?: boolean; viewport?: boolean;
  h1?: boolean; words?: number; generator?: string | null; score?: number; error?: string | null;
}) {
  getDb().prepare(
    `UPDATE companies SET audit_status=?, audit_https=?, audit_meta=?, audit_viewport=?, audit_h1=?, audit_words=?, audit_generator=?, audit_score=?, audit_error=?, audited_at=?, updated_at=? WHERE orgnr=?`
  ).run(a.status ?? null, a.https ? 1 : 0, a.meta ? 1 : 0, a.viewport ? 1 : 0,
        a.h1 ? 1 : 0, a.words ?? null, a.generator ?? null, a.score ?? null,
        a.error ?? null, now(), now(), orgnr);
}

export function updateScore(orgnr: string, s: {
  qualify: boolean; afford: number; bite: number; total: number; reasons: string[];
}) {
  getDb().prepare(
    `UPDATE companies SET qualify=?, afford_score=?, bite_score=?, total_score=?, reasons=?, updated_at=? WHERE orgnr=?`
  ).run(s.qualify ? 1 : 0, s.afford, s.bite, s.total, JSON.stringify(s.reasons), now(), orgnr);
}

export function log(level: "info" | "warn" | "error", stage: string, message: string, orgnr?: string) {
  getDb().prepare(`INSERT INTO logs (ts, level, stage, orgnr, message) VALUES (?,?,?,?,?)`)
    .run(now(), level, stage, orgnr ?? null, message);
}

export function startRun(scope: string): number {
  const r = getDb().prepare(`INSERT INTO runs (started_at, scope, status, processed, qualified, errors) VALUES (?,?,?,0,0,0)`)
    .run(now(), scope, "running");
  return Number(r.lastInsertRowid);
}

export function finishRun(id: number, stats: { processed: number; qualified: number; errors: number; status?: string }) {
  getDb().prepare(`UPDATE runs SET finished_at=?, status=?, processed=?, qualified=?, errors=? WHERE id=?`)
    .run(now(), stats.status ?? "done", stats.processed, stats.qualified, stats.errors, id);
}

export interface LeadFilters {
  minRevenue?: number;
  qualifiedOnly?: boolean;
  weakSiteOnly?: boolean; // audit_score <= 60 or no website
  kommune?: string;
  limit?: number;
  offset?: number;
  sort?: "total" | "revenue" | "bite";
}

export function queryLeads(f: LeadFilters) {
  const where: string[] = ["audited_at IS NOT NULL"];
  const args: any[] = [];
  if (f.minRevenue) { where.push("revenue >= ?"); args.push(f.minRevenue); }
  if (f.qualifiedOnly) where.push("qualify = 1");
  if (f.weakSiteOnly) where.push("(has_website = 0 OR audit_score <= 60)");
  if (f.kommune) { where.push("kommune = ?"); args.push(f.kommune); }
  const sort = f.sort === "revenue" ? "revenue DESC" : f.sort === "bite" ? "bite_score DESC" : "total_score DESC";
  const limit = Math.min(f.limit ?? 100, 500);
  const offset = f.offset ?? 0;
  const rows = getDb().prepare(
    `SELECT * FROM companies WHERE ${where.join(" AND ")} ORDER BY ${sort} NULLS LAST LIMIT ? OFFSET ?`
  ).all(...args, limit, offset);
  const total = getDb().prepare(`SELECT COUNT(*) c FROM companies WHERE ${where.join(" AND ")}`).get(...args).c;
  return { rows: rows.map(parseRow), total };
}

function parseRow(r: any) {
  return { ...r, reasons: r.reasons ? JSON.parse(r.reasons) : [] };
}

export function recentLogs(limit = 100, level?: string) {
  const args: any[] = [];
  let sql = `SELECT * FROM logs`;
  if (level) { sql += ` WHERE level = ?`; args.push(level); }
  sql += ` ORDER BY id DESC LIMIT ?`; args.push(Math.min(limit, 500));
  return getDb().prepare(sql).all(...args);
}

export function recentRuns(limit = 20) {
  return getDb().prepare(`SELECT * FROM runs ORDER BY id DESC LIMIT ?`).all(Math.min(limit, 100));
}

// ---- Outreach ----
export interface OutreachDraft {
  orgnr: string; navn: string; campaign: string;
  to_email: string | null; to_name: string | null;
  subject: string; body_text: string; body_html: string; showcase_html: string;
  total_score: number | null; status: string;
}

export function insertOutreach(d: OutreachDraft): number {
  const r = getDb().prepare(
    `INSERT INTO outreach (orgnr, navn, campaign, to_email, to_name, subject, body_text, body_html, showcase_html, total_score, status, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(d.orgnr, d.navn, d.campaign, d.to_email, d.to_name, d.subject, d.body_text, d.body_html, d.showcase_html, d.total_score ?? null, d.status, now());
  return Number(r.lastInsertRowid);
}

export function getOutreach(id: number) {
  return getDb().prepare(`SELECT * FROM outreach WHERE id=?`).get(id);
}

export function listOutreach(status?: string, limit = 200) {
  const args: any[] = [];
  let sql = `SELECT id, orgnr, navn, campaign, to_email, to_name, subject, total_score, status, error, created_at, sent_at FROM outreach`;
  if (status) { sql += ` WHERE status=?`; args.push(status); }
  sql += ` ORDER BY total_score DESC NULLS LAST, id DESC LIMIT ?`; args.push(Math.min(limit, 500));
  return getDb().prepare(sql).all(...args);
}

export function updateOutreach(id: number, fields: Partial<{ to_email: string; subject: string; body_text: string; body_html: string; status: string; error: string | null; sent_at: string }>) {
  const keys = Object.keys(fields);
  if (!keys.length) return;
  const sql = `UPDATE outreach SET ${keys.map((k) => `${k}=?`).join(", ")} WHERE id=?`;
  getDb().prepare(sql).run(...keys.map((k) => (fields as any)[k]), id);
}

export function outreachExists(orgnr: string, campaign: string): boolean {
  return !!getDb().prepare(`SELECT 1 FROM outreach WHERE orgnr=? AND campaign=?`).get(orgnr, campaign);
}

export function outreachStats() {
  const db = getDb();
  const by = (s: string) => db.prepare(`SELECT COUNT(*) c FROM outreach WHERE status=?`).get(s).c;
  return {
    total: db.prepare(`SELECT COUNT(*) c FROM outreach`).get().c,
    draft: by("draft"), needs_email: by("needs_email"), ready: by("ready"),
    sent: by("sent"), sent_dry: by("sent_dry"), failed: by("failed"), optout: by("optout"),
  };
}

// ---- Suppression / opt-out ----
export function addSuppression(email: string, reason: string) {
  getDb().prepare(`INSERT INTO suppression (email, reason, ts) VALUES (?,?,?) ON CONFLICT(email) DO NOTHING`)
    .run(email.toLowerCase().trim(), reason, now());
}
export function isSuppressed(email: string): boolean {
  return !!getDb().prepare(`SELECT 1 FROM suppression WHERE email=?`).get(email.toLowerCase().trim());
}

export function stats() {
  const db = getDb();
  const total = db.prepare(`SELECT COUNT(*) c FROM companies`).get().c;
  const audited = db.prepare(`SELECT COUNT(*) c FROM companies WHERE audited_at IS NOT NULL`).get().c;
  const qualified = db.prepare(`SELECT COUNT(*) c FROM companies WHERE qualify = 1`).get().c;
  const hot = db.prepare(`SELECT COUNT(*) c FROM companies WHERE qualify = 1 AND total_score >= 70`).get().c;
  const errors = db.prepare(`SELECT COUNT(*) c FROM logs WHERE level = 'error'`).get().c;
  return { total, audited, qualified, hot, errors };
}
