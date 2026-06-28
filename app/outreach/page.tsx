"use client";

import { useCallback, useEffect, useState } from "react";

const I = {
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM2 6l10 7 10-7",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z",
  bolt: "M13 2 3 14h7l-1 8 10-12h-7l1-8z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6 9 17l-5-5",
  warn: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
};
function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
}

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft", needs_email: "Needs email", ready: "Ready", sent: "Sent",
  sent_dry: "Sent (dry-run)", failed: "Failed", optout: "Opted out",
};

export default function Outreach() {
  const [data, setData] = useState<any>(null);
  const [campaign, setCampaign] = useState("tromso-q1");
  const [topN, setTopN] = useState(10);
  const [busy, setBusy] = useState("");
  const [open, setOpen] = useState<any>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/outreach").then((x) => x.json());
    setData(r);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function generate() {
    setBusy("generate");
    try { await fetch("/api/outreach/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ campaign, topN }) }).then((x) => x.json()); await load(); }
    finally { setBusy(""); }
  }
  async function send(id: number) {
    setBusy("send" + id);
    try { await fetch("/api/outreach/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }).then((x) => x.json()); await load(); }
    finally { setBusy(""); }
  }
  async function sendAll() {
    setBusy("sendall");
    try { await fetch("/api/outreach/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ all: true }) }).then((x) => x.json()); await load(); }
    finally { setBusy(""); }
  }
  async function view(id: number) {
    const r = await fetch(`/api/outreach?id=${id}`).then((x) => x.json());
    setOpen(r);
  }

  const s = data?.stats || {};
  const rows = data?.rows || [];
  const live = data?.liveSending;

  return (
    <main className="px">
      <nav className="pxnav">
        <span className="mark">Pil<b>hammer</b></span>
        <span className="sp" />
        <a href="/leads">Leads</a>
        <a href="/outreach" className="on">Outreach</a>
        <a href="/">Mockups</a>
      </nav>

      <div className={`sendbanner ${live ? "liveon" : ""}`}>
        <Icon d={I.shield} />
        {live
          ? <span><b>Live sending is ON</b> — SMTP configured. Emails will actually be sent. Opt-outs are suppressed automatically.</span>
          : <span><b>Dry-run mode</b> — no SMTP configured, so nothing is sent for real; drafts are marked “sent (dry-run)”. Set SMTP_HOST/USER/PASS + PILHAMMER_SENDER_* env to go live. Every email includes sender identity + one-click opt-out (markedsføringsloven / GDPR).</span>}
      </div>

      <div className="statgrid">
        <Stat icon={I.mail} k="Drafts" v={s.total ?? "—"} />
        <Stat icon={I.check} k="With email" v={(s.draft ?? 0)} />
        <Stat icon={I.warn} k="Need email" v={s.needs_email ?? 0} />
        <Stat icon={I.send} k="Sent (dry)" v={s.sent_dry ?? 0} />
        <Stat icon={I.send} k="Sent live" v={s.sent ?? 0} cls="hot" />
        <Stat icon={I.shield} k="Opted out" v={s.optout ?? 0} />
      </div>

      <div className="controls">
        <div className="fld"><label>Campaign</label><input value={campaign} onChange={(e) => setCampaign(e.target.value)} style={{ width: 160 }} /></div>
        <div className="fld"><label>Top N leads</label><input type="number" value={topN} onChange={(e) => setTopN(Number(e.target.value))} style={{ width: 90 }} /></div>
        <button className="runbtn" onClick={generate} disabled={!!busy}><Icon d={I.bolt} /> {busy === "generate" ? "Generating…" : "Generate drafts"}</button>
        <span className="sp" style={{ flex: 1 }} />
        <button className="ghostbtn" onClick={sendAll} disabled={!!busy}><Icon d={I.send} /> {busy === "sendall" ? "Sending…" : live ? "Send all (LIVE)" : "Send all (dry-run)"}</button>
      </div>

      {rows.length === 0 ? (
        <div className="empty">No drafts yet. Generate drafts from your top qualified leads.</div>
      ) : (
        <table className="ltable">
          <thead><tr><th>Score</th><th>Company</th><th>Recipient</th><th>Subject</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.id}>
                <td><span className={`scorepill ${r.total_score >= 70 ? "s-hi" : r.total_score >= 45 ? "s-md" : "s-lo"}`}>{r.total_score ?? "—"}</span></td>
                <td><div className="cname">{r.navn}</div><div className="cmeta">{r.campaign}</div></td>
                <td>{r.to_email || <span className="rchip bad">none</span>}</td>
                <td style={{ maxWidth: 280 }}>{r.subject || <span style={{ color: "var(--muted)" }}>—</span>}</td>
                <td><span className={`stbadge st-${r.status}`}>{STATUS_LABEL[r.status] || r.status}</span></td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="minibtn" onClick={() => view(r.id)}><Icon d={I.eye} size={14} /> View</button>
                  <a className="minibtn" href={`/api/showcase/${r.id}`} target="_blank" rel="noreferrer">Showcase ↗</a>
                  {r.to_email && r.status !== "optout" && (
                    <button className="minibtn send" onClick={() => send(r.id)} disabled={!!busy}>
                      <Icon d={I.send} size={14} /> {busy === "send" + r.id ? "…" : live ? "Send" : "Dry-send"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && (
        <div className="modal" onClick={() => setOpen(null)}>
          <div className="modalbox" onClick={(e) => e.stopPropagation()}>
            <div className="modalhead">
              <div><strong>{open.navn}</strong><div className="cmeta">{open.to_email || "no recipient"} · {STATUS_LABEL[open.status] || open.status}</div></div>
              <button className="minibtn" onClick={() => setOpen(null)}>✕</button>
            </div>
            <div className="cmeta" style={{ padding: "0 0 8px" }}>Subject: <b style={{ color: "var(--text)" }}>{open.subject}</b></div>
            <div className="emailbody" dangerouslySetInnerHTML={{ __html: open.body_html || "<i>No body</i>" }} />
            <div className="modalhead" style={{ borderTop: "1px solid var(--border)", borderBottom: 0, marginTop: 10, paddingTop: 12 }}>
              <a className="ghostbtn" href={`/api/showcase/${open.id}`} target="_blank" rel="noreferrer">Open showcase ↗</a>
              {open.to_email && open.status !== "optout" && (
                <button className="runbtn" onClick={() => { send(open.id); setOpen(null); }}>
                  <Icon d={I.send} size={14} /> {live ? "Send now (LIVE)" : "Send now (dry-run)"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({ icon, k, v, cls = "" }: { icon: string; k: string; v: any; cls?: string }) {
  return <div className={`stat ${cls}`}><div className="k"><Icon d={icon} size={15} /> {k}</div><div className="v">{typeof v === "number" ? v.toLocaleString() : v}</div></div>;
}
