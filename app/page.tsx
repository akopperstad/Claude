"use client";

import { useMemo, useState } from "react";
import type { AnalyzeResult, Finding } from "@/lib/types";

const STEPS = [
  "Launching headless browser…",
  "Loading the site & taking screenshots…",
  "Auditing UX, accessibility, SEO & performance…",
  "Generating your redesign…",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [shot, setShot] = useState<"desktop" | "mobile">("desktop");

  async function run(e?: React.FormEvent) {
    e?.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setStep(0);
    const ticker = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      4000
    );
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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

      {result && <Results r={result} shot={shot} setShot={setShot} />}

      <footer className="foot">
        Reface · captures with Chromium · heuristic + AI audit ·{" "}
        {result?.redesignSource === "ai"
          ? "AI redesign active"
          : "set ANTHROPIC_API_KEY for AI redesigns"}
      </footer>
    </main>
  );
}

function Results({
  r,
  shot,
  setShot,
}: {
  r: AnalyzeResult;
  shot: "desktop" | "mobile";
  setShot: (s: "desktop" | "mobile") => void;
}) {
  const color =
    r.score >= 80 ? "var(--green)" : r.score >= 55 ? "var(--amber)" : "var(--red)";
  const circ = 2 * Math.PI * 42;
  const dash = (r.score / 100) * circ;

  const downloadUrl = useMemo(() => {
    if (typeof window === "undefined") return "#";
    const blob = new Blob([r.redesignHtml], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [r.redesignHtml]);

  const current = shot === "desktop" ? r.capture.desktopShot : r.capture.mobileShot;

  return (
    <section className="results">
      <div className="scorebar">
        <div className="gauge">
          <svg width="96" height="96">
            <circle cx="48" cy="48" r="42" stroke="var(--border)" strokeWidth="8" fill="none" />
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
            />
          </svg>
          <div className="num" style={{ color }}>
            {r.score}
          </div>
        </div>
        <div className="scoremeta">
          <h2>
            UX/UI score: {r.score}/100
            <span className={`badge ${r.redesignSource}`}>
              {r.redesignSource === "ai" ? "AI redesign" : "Template redesign"}
            </span>
          </h2>
          <p>
            {r.findings.filter((f) => f.severity === "critical").length} critical ·{" "}
            {r.findings.filter((f) => f.severity === "warning").length} warnings ·{" "}
            {r.findings.filter((f) => f.severity === "info").length} info · captured{" "}
            {r.capture.finalUrl}
          </p>
        </div>
      </div>

      <div className="cols">
        <div className="panel">
          <h3>Original site</h3>
          <div className="shot-tabs">
            <button
              className={shot === "desktop" ? "active" : ""}
              onClick={() => setShot("desktop")}
            >
              🖥 Desktop
            </button>
            <button
              className={shot === "mobile" ? "active" : ""}
              onClick={() => setShot("mobile")}
            >
              📱 Mobile
            </button>
          </div>
          <div className="shotframe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current} alt={`${shot} screenshot of ${r.capture.finalUrl}`} />
          </div>
        </div>

        <div className="panel">
          <h3>Audit findings</h3>
          <ul className="findings">
            {r.findings.map((f) => (
              <FindingRow key={f.id} f={f} />
            ))}
          </ul>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h3>Review</h3>
        <div className="review">{r.review}</div>
      </div>

      <div className="redesign-head">
        <h3>✨ Your redesign</h3>
        <div className="actions">
          <a href={downloadUrl} download="reface-redesign.html">
            ⬇ Download HTML
          </a>
          <button
            onClick={() => {
              const w = window.open();
              if (w) {
                w.document.write(r.redesignHtml);
                w.document.close();
              }
            }}
          >
            ↗ Open full screen
          </button>
        </div>
      </div>
      <iframe
        className="preview"
        title="Redesigned website preview"
        srcDoc={r.redesignHtml}
        sandbox="allow-same-origin"
      />
    </section>
  );
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
