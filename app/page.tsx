"use client";

import { useMemo, useState } from "react";
import type { AnalyzeResult, Finding, PageAudit } from "@/lib/types";

const STEPS = [
  "Launching headless browser…",
  "Crawling & loading pages…",
  "Auditing UX, accessibility, SEO & performance…",
  "Generating your redesign…",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [maxPages, setMaxPages] = useState(3);
  const [apiKey, setApiKey] = useState("");
  const [showOpts, setShowOpts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function run(e?: React.FormEvent) {
    e?.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setStep(0);
    const ticker = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      5000
    );
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, maxPages, apiKey: apiKey.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data as AnalyzeResult);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      clearInterval(ticker);
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <section className="hero">
        <h1 className="logo">
          Re<span>face</span>
        </h1>
        <p className="tagline">
          Paste a website link. Get an instant UX/UI audit — and a redesigned
          version, generated for you.
        </p>

        <form className="form" onSubmit={run}>
          <input
            type="text"
            inputMode="url"
            placeholder="example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="Website URL"
            disabled={loading}
          />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Working…" : "Reface it →"}
          </button>
        </form>

        <button
          className="opts-toggle"
          type="button"
          onClick={() => setShowOpts((v) => !v)}
        >
          {showOpts ? "▾" : "▸"} Options
        </button>
        {showOpts && (
          <div className="opts">
            <label>
              Pages to crawl
              <select
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                disabled={loading}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n === 1 ? "1 (home only)" : `${n} pages`}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Anthropic API key <span className="hint">(optional · AI redesign · not stored)</span>
              <input
                type="password"
                placeholder="sk-ant-…"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={loading}
                autoComplete="off"
              />
            </label>
          </div>
        )}

        <div className="examples">
          Try:
          {["stripe.com", "news.ycombinator.com", "example.com"].map((x) => (
            <button key={x} onClick={() => setUrl(x)} disabled={loading} type="button">
              {x}
            </button>
          ))}
        </div>
        {error && <div className="error">⚠ {error}</div>}
      </section>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <div className="steps">{STEPS[step]}</div>
        </div>
      )}

      {result && <Results r={result} />}

      <footer className="foot">
        Reface · captures with Chromium · heuristic + AI audit ·{" "}
        {result?.redesignSource === "ai"
          ? "AI redesign active"
          : "add an API key for AI redesigns"}
      </footer>
    </main>
  );
}

function Results({ r }: { r: AnalyzeResult }) {
  const [sel, setSel] = useState(0);
  const [shot, setShot] = useState<"desktop" | "mobile">("desktop");
  const [view, setView] = useState<"before" | "after" | "split">("after");

  const color =
    r.score >= 80 ? "var(--green)" : r.score >= 55 ? "var(--amber)" : "var(--red)";
  const circ = 2 * Math.PI * 42;
  const dash = (r.score / 100) * circ;

  const downloadUrl = useMemo(() => {
    if (typeof window === "undefined") return "#";
    const blob = new Blob([r.redesignHtml], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [r.redesignHtml]);

  const page = r.pages[sel];
  const current = shot === "desktop" ? page.capture.desktopShot : page.capture.mobileShot;
  const counts = (sev: Finding["severity"]) =>
    r.pages.reduce((n, p) => n + p.findings.filter((f) => f.severity === sev).length, 0);

  return (
    <section className="results">
      <div className="scorebar">
        <div className="gauge">
          <svg width="96" height="96">
            <circle cx="48" cy="48" r="42" stroke="var(--border)" strokeWidth="8" fill="none" />
            <circle cx="48" cy="48" r="42" stroke={color} strokeWidth="8" fill="none"
              strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} />
          </svg>
          <div className="num" style={{ color }}>{r.score}</div>
        </div>
        <div className="scoremeta">
          <h2>
            UX/UI score: {r.score}/100
            <span className={`badge ${r.redesignSource}`}>
              {r.redesignSource === "ai" ? "AI redesign" : "Template redesign"}
            </span>
          </h2>
          <p>
            {r.pages.length} page(s) · {counts("critical")} critical · {counts("warning")} warnings · {counts("info")} info
          </p>
        </div>
      </div>

      {r.pages.length > 1 && (
        <div className="pagetabs">
          {r.pages.map((p, i) => (
            <button key={i} className={i === sel ? "active" : ""} onClick={() => setSel(i)}
              title={p.capture.finalUrl}>
              {i === 0 ? "🏠 Home" : pathLabel(p)} <em>{p.score}</em>
            </button>
          ))}
        </div>
      )}

      <div className="cols">
        <div className="panel">
          <h3>Original page</h3>
          <div className="shot-tabs">
            <button className={shot === "desktop" ? "active" : ""} onClick={() => setShot("desktop")}>🖥 Desktop</button>
            <button className={shot === "mobile" ? "active" : ""} onClick={() => setShot("mobile")}>📱 Mobile</button>
          </div>
          <div className="shotframe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current} alt={`${shot} screenshot of ${page.capture.finalUrl}`} />
          </div>
        </div>

        <div className="panel">
          <h3>Audit findings <span className="muted">· {pathLabel(page) || "home"}</span></h3>
          <ul className="findings">
            {page.findings.map((f) => <FindingRow key={f.id} f={f} />)}
          </ul>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h3>Review</h3>
        <div className="review">{r.review}</div>
      </div>

      <div className="redesign-head">
        <h3>✨ Your redesign</h3>
        <div className="viewtoggle" role="tablist" aria-label="Compare view">
          {(["before", "after", "split"] as const).map((v) => (
            <button key={v} className={view === v ? "active" : ""} onClick={() => setView(v)}>
              {v === "before" ? "Before" : v === "after" ? "After" : "Split"}
            </button>
          ))}
        </div>
        <div className="actions">
          <a href={downloadUrl} download="reface-redesign.html">⬇ Download</a>
          <button onClick={() => {
            const w = window.open();
            if (w) { w.document.write(r.redesignHtml); w.document.close(); }
          }}>↗ Full screen</button>
        </div>
      </div>

      <div className={`compare ${view}`}>
        {(view === "before" || view === "split") && (
          <div className="compare-pane">
            <span className="tag">Before</span>
            <div className="shotframe tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.capture.desktopShot} alt="Original site" />
            </div>
          </div>
        )}
        {(view === "after" || view === "split") && (
          <div className="compare-pane">
            <span className="tag after">After</span>
            <iframe className="preview" title="Redesigned website preview"
              srcDoc={r.redesignHtml} sandbox="allow-same-origin" />
          </div>
        )}
      </div>
    </section>
  );
}

function pathLabel(p: PageAudit): string {
  try {
    const path = new URL(p.capture.finalUrl).pathname.replace(/\/$/, "");
    const last = path.split("/").filter(Boolean).pop();
    return last ? last.replace(/[-_]/g, " ").slice(0, 18) : "home";
  } catch {
    return "page";
  }
}

function FindingRow({ f }: { f: Finding }) {
  return (
    <li className={`finding ${f.severity}`}>
      <div className="ft">
        <span className="sev">{f.severity}</span>
        <span>{f.title}</span>
      </div>
      <div className="fr">{f.recommendation}</div>
    </li>
  );
}
