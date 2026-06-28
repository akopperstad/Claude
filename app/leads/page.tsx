"use client";

import { useCallback, useEffect, useState } from "react";

// ---- Lucide-style inline icons (no runtime dep) ----
const I = {
  bolt: "M13 2 3 14h7l-1 8 10-12h-7l1-8z",
  building: "M3 21h18M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M9 7h2M9 11h2M9 15h2",
  check: "M20 6 9 17l-5-5",
  fire: "M12 2c1 4-2 5-2 8a2 2 0 1 0 4 0c0-1 1-2 1-2 2 2 3 4 3 6a6 6 0 1 1-12 0c0-4 4-6 6-12z",
  alert: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
  refresh: "M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
};
function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const kr = (n: number | null) =>
  n == null ? "—" : n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
const pillClass = (s: number | null) => (s == null ? "" : s >= 70 ? "s-hi" : s >= 45 ? "s-md" : "s-lo");

interface Lead {
  orgnr: string; navn: string; kommune: string; nace_desc: string;
  website: string | null; has_website: number; revenue: number | null; profit: number | null;
  equity_ratio: number | null; audit_score: number | null; audit_generator: string | null;
  bite_score: number | null; total_score: number | null; qualify: number; reasons: string[];
}

export default function Leads() {
  const [stats, setStats] = useState<any>(null);
  const [rows, setRows] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  // filters
  const [minRevenue, setMinRevenue] = useState(1_000_000);
  const [qualifiedOnly, setQualifiedOnly] = useState(true);
  const [weakSiteOnly, setWeakSiteOnly] = useState(true);
  const [sort, setSort] = useState("total");

  // ingest controls
  const [kommune, setKommune] = useState("5501");
  const [nace, setNace] = useState("");
  const [limit, setLimit] = useState(100);

  // logs
  const [logs, setLogs] = useState<any[]>([]);
  const [runs, setRuns] = useState<any[]>([]);
  const [logTab, setLogTab] = useState<"all" | "error">("all");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        minRevenue: String(minRevenue), sort,
        ...(qualifiedOnly ? { qualifiedOnly: "1" } : {}),
        ...(weakSiteOnly ? { weakSiteOnly: "1" } : {}),
        limit: "100",
      });
      const r = await fetch(`/api/leads?${q}`).then((x) => x.json());
      setRows(r.rows || []); setTotal(r.total || 0); setStats(r.stats || null);
    } finally { setLoading(false); }
  }, [minRevenue, qualifiedOnly, weakSiteOnly, sort]);

  const loadLogs = useCallback(async () => {
    const r = await fetch(`/api/logs?limit=120${logTab === "error" ? "&level=error" : ""}`).then((x) => x.json());
    setLogs(r.logs || []); setRuns(r.runs || []);
  }, [logTab]);

  useEffect(() => { loadLeads(); }, [loadLeads]);
  useEffect(() => { loadLogs(); }, [loadLogs]);

  async function runIngest() {
    setRunning(true);
    try {
      await fetch("/api/ingest", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kommunenummer: kommune || undefined, naeringskode: nace || undefined, limit }),
      }).then((x) => x.json());
      await Promise.all([loadLeads(), loadLogs()]);
    } finally { setRunning(false); }
  }

  return (
    <main className="px">
      <nav className="pxnav">
        <span className="mark">Pil<b>hammer</b></span>
        <span className="sp" />
        <a href="/leads" className="on"><span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon d={I.list} /> Leads</span></a>
        <a href="/outreach">Outreach</a>
        <a href="/">Mockups</a>
      </nav>

      <div className="statgrid">
        <Stat icon={I.building} k="Companies" v={stats?.total ?? "—"} />
        <Stat icon={I.search} k="Audited" v={stats?.audited ?? "—"} />
        <Stat icon={I.check} k="Qualified" v={stats?.qualified ?? "—"} />
        <Stat icon={I.fire} k="Hot leads" v={stats?.hot ?? "—"} cls="hot" />
        <Stat icon={I.alert} k="Errors" v={stats?.errors ?? "—"} cls="err" />
      </div>

      <div className="controls">
        <div className="fld"><label>Kommune nr</label><input value={kommune} onChange={(e) => setKommune(e.target.value)} placeholder="5501" style={{ width: 110 }} /></div>
        <div className="fld"><label>NACE kode</label><input value={nace} onChange={(e) => setNace(e.target.value)} placeholder="e.g. 33.150" style={{ width: 120 }} /></div>
        <div className="fld"><label>Limit</label><input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} style={{ width: 90 }} /></div>
        <button className="runbtn" onClick={runIngest} disabled={running}>
          <Icon d={running ? I.refresh : I.bolt} /> {running ? "Ingesting…" : "Run ingest"}
        </button>
        <span className="sp" style={{ flex: 1 }} />
        <div className="fld"><label>Min revenue</label>
          <select value={minRevenue} onChange={(e) => setMinRevenue(Number(e.target.value))}>
            <option value={0}>Any</option><option value={1_000_000}>1M+</option>
            <option value={5_000_000}>5M+</option><option value={20_000_000}>20M+</option>
          </select>
        </div>
        <div className="fld"><label>Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="total">Lead score</option><option value="bite">Bite</option><option value="revenue">Revenue</option>
          </select>
        </div>
        <div className="fld chk"><input id="q" type="checkbox" checked={qualifiedOnly} onChange={(e) => setQualifiedOnly(e.target.checked)} /><label htmlFor="q">Qualified</label></div>
        <div className="fld chk"><input id="w" type="checkbox" checked={weakSiteOnly} onChange={(e) => setWeakSiteOnly(e.target.checked)} /><label htmlFor="w">Weak site</label></div>
      </div>

      <div style={{ color: "var(--muted)", fontSize: ".85rem", margin: "0 0 10px" }}>
        {loading ? "Loading…" : `${total} matching lead(s) · showing top ${rows.length}`}
      </div>

      {rows.length === 0 && !loading ? (
        <div className="empty">No leads yet. Set a kommune (e.g. 5501 = Tromsø) and click <b>Run ingest</b>.</div>
      ) : (
        <table className="ltable">
          <thead><tr>
            <th>#</th><th>Company</th><th>Revenue</th><th className="hidesm">Profit</th>
            <th>Site</th><th>Bite</th><th>Lead</th><th className="hidesm">Why</th><th></th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.orgnr}>
                <td style={{ color: "var(--muted)" }}>{i + 1}</td>
                <td><div className="cname">{r.navn}</div><div className="cmeta">{r.kommune} · {r.nace_desc || "—"}</div></td>
                <td>{kr(r.revenue)}</td>
                <td className="hidesm" style={{ color: r.profit != null && r.profit < 0 ? "var(--red)" : undefined }}>{kr(r.profit)}</td>
                <td>{r.has_website ? <span className={`scorepill ${pillClass(r.audit_score)}`}>{r.audit_score ?? "—"}</span> : <span className="rchip bad">No site</span>}{r.audit_generator && <div className="cmeta">{r.audit_generator}</div>}</td>
                <td><span className={`scorepill ${pillClass(r.bite_score)}`}>{r.bite_score ?? "—"}</span></td>
                <td><span className={`scorepill ${pillClass(r.total_score)}`}>{r.total_score ?? "—"}</span></td>
                <td className="hidesm"><div className="rchips">{(r.reasons || []).slice(0, 5).map((x, j) => (
                  <span key={j} className={`rchip ${/No |won't|Not |Missing|Thin|Below|Loss/.test(x) ? "bad" : /Profit|Revenue|Solid/.test(x) ? "good" : ""}`}>{x}</span>
                ))}</div></td>
                <td>{r.website ? <a className="extlink" href={r.website.startsWith("http") ? r.website : `https://${r.website}`} target="_blank" rel="noreferrer">Visit ↗</a> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="logs">
        <div className="lhead">
          <h3>Activity log</h3>
          <span style={{ color: "var(--muted)", fontSize: ".82rem" }}>
            {runs[0] ? `last run: ${runs[0].status} · ${runs[0].processed} processed · ${runs[0].qualified} qualified · ${runs[0].errors} errors` : "no runs yet"}
          </span>
          <div className="logtabs">
            <button className={logTab === "all" ? "on" : ""} onClick={() => setLogTab("all")}>All</button>
            <button className={logTab === "error" ? "on" : ""} onClick={() => setLogTab("error")}>Faults</button>
          </div>
        </div>
        {logs.length === 0 ? <div className="empty">No log entries.</div> : logs.map((l) => (
          <div className="logrow" key={l.id}>
            <span className="ts">{new Date(l.ts).toLocaleString()}</span>
            <span className={`lvl ${l.level}`}>{l.level}</span>
            <span className="lstage">{l.stage}</span>
            <span>{l.message}{l.orgnr ? ` (${l.orgnr})` : ""}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function Stat({ icon, k, v, cls = "" }: { icon: string; k: string; v: any; cls?: string }) {
  return (
    <div className={`stat ${cls}`}>
      <div className="k"><Icon d={icon} size={15} /> {k}</div>
      <div className="v">{typeof v === "number" ? v.toLocaleString() : v}</div>
    </div>
  );
}
