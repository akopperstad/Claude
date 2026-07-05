'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { CompareSlider } from '@/components/CompareSlider';

type Level = 1 | 2 | 3 | 4;

interface EstimateLine {
  label: string;
  lowNok: number;
  highNok: number;
}
interface RenderRecord {
  level: Level;
  target: string;
  imageUrl: string;
  estimate: { lines: EstimateLine[]; totalLowNok: number; totalHighNok: number };
  palette?: { cladding: string; trim: string; door: string; roof: string; reasoning: string };
}
interface Project {
  id: string;
  demo: boolean;
  photoPath: string;
  analysis: {
    buildingType: string;
    cladding: string;
    roof: string;
    windows: string;
    surroundings: string[];
  };
  renders: RenderRecord[];
}

const NIVAER: { level: Level; navn: string; body: string; tag: string }[] = [
  { level: 1, navn: 'Farge', body: 'Kun ny farge på kledningen. Alt annet urørt.', tag: 'Inkludert i gratis' },
  { level: 2, navn: 'Overflater', body: 'Ny kledning, takflate, karmer og dører.', tag: 'Boligjakt / Prosjekt' },
  { level: 3, navn: 'Oppgradering', body: 'Nye vinduer, inngang, platting og AI-palett.', tag: 'Prosjekt' },
  { level: 4, navn: 'Visjon', body: 'Full arkitektonisk forvandling på samme tomt.', tag: 'Prosjekt' },
];

function kr(n: number): string {
  return `${Math.round(n / 1000)} 000 kr`;
}

export default function ProsjektPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [level, setLevel] = useState<Level>(1);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [result, setResult] = useState<(RenderRecord & { demoSubstituted?: boolean }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetch(`/api/prosjekt/${params.id}`)
      .then((r) => r.json())
      .then((p) => {
        setProject(p);
        const last = p.renders?.at?.(-1);
        if (last) {
          setResult(last);
          setLevel(last.level);
        }
      });
  }, [params.id]);

  if (!project) {
    return (
      <div className="wrap">
        <nav className="site">
          <Logo />
        </nav>
        <p className="spinner" style={{ padding: '48px 0' }}>
          Henter prosjekt …
        </p>
      </div>
    );
  }

  const beforeUrl = project.demo ? project.photoPath : `/api/bilde/${project.id}`;

  async function render() {
    setBusy(true);
    setError(null);
    // Typical generative render: 20-45 s. The bar eases toward 90% on that
    // clock and only hits 100% on a real response — honest, never stuck.
    const started = Date.now();
    const STAGES: [number, string][] = [
      [0, 'Leser bildet …'],
      [3, 'Analyserer fasade og omgivelser …'],
      [8, 'Genererer visualisering — tar vanligvis 20–45 sekunder'],
      [30, 'Legger siste hånd på detaljene …'],
    ];
    setProgress(4);
    setStage(STAGES[0][1]);
    const ticker = setInterval(() => {
      const s = (Date.now() - started) / 1000;
      setProgress(Math.min(90, Math.round((s / 45) * 100)));
      const current = STAGES.filter(([at]) => s >= at).at(-1);
      if (current) setStage(current[1]);
    }, 900);
    try {
      const res = await fetch(`/api/prosjekt/${project!.id}/render`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data?.error ?? 'rendering feilet');
      setProgress(100);
      setStage('Ferdig!');
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'rendering feilet');
    } finally {
      clearInterval(ticker);
      setBusy(false);
    }
  }

  return (
    <div className="wrap">
      <nav className="site">
        <Logo />
        <div className="links">
          <span className="eyebrow">{result ? 'Illustrasjon' : 'Steg 2 av 3'}</span>
        </div>
      </nav>

      <section style={{ padding: '36px 0 12px' }}>
        <span className="eyebrow">Analysert</span>
        <h1 style={{ fontSize: 30, letterSpacing: '-0.02em', fontWeight: 600, margin: '4px 0 4px' }}>
          {project.analysis.buildingType}
        </h1>
        <p style={{ color: 'var(--muted)', margin: 0 }}>
          {project.analysis.cladding} · {project.analysis.roof} · {project.analysis.windows}
        </p>
      </section>

      <section style={{ padding: '16px 0 0' }}>
        <h2 style={{ marginBottom: 4 }}>Hvor langt vil du gå?</h2>
        <div className="nivaer">
          {NIVAER.map((n) => (
            <button
              key={n.level}
              className={`niva${level === n.level ? ' valgt' : ''}`}
              onClick={() => setLevel(n.level)}
            >
              <span className="num">Nivå {n.level}</span>
              <h3>{n.navn}</h3>
              <p>{n.body}</p>
              <span className="tag">{n.tag}</span>
            </button>
          ))}
        </div>
        {level >= 3 && (
          <div className="hint">
            Nivå 3–4 kan inneholde tiltak som er søknadspliktige. Alle bilder er
            visualiseringer.
          </div>
        )}
        <div style={{ margin: '26px 0' }}>
          <button className="btn" disabled={busy} onClick={() => void render()}>
            {busy ? 'Lager visualisering …' : 'Lag visualisering →'}
          </button>
          {busy && (
            <div className="progress" role="status" aria-live="polite">
              <div className="bar">
                <div className="fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="stage">{stage}</div>
            </div>
          )}
        </div>
        {error && <div className="hint">{error}</div>}
      </section>

      {result && (
        <div className="resgrid">
          <div>
            <CompareSlider before={beforeUrl} after={result.imageUrl} />
            <p className="illu">
              Illustrasjon · Nivå {result.level}: {result.target}
              {result.demoSubstituted &&
                ' · Demo-modus: eksempelrender vist — koble til render-API for ditt bilde'}
            </p>
          </div>
          <div>
            {result.palette && (
              <div className="kort">
                <span className="eyebrow">Anbefalt palett</span>
                <h3>{result.palette.cladding}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: 0 }}>
                  {result.palette.reasoning}
                </p>
              </div>
            )}
            <div className="kort">
              <span className="eyebrow">Grovt kostnadsestimat</span>
              <table className="kost">
                <tbody>
                  {result.estimate.lines.map((l) => (
                    <tr key={l.label}>
                      <td>{l.label}</td>
                      <td>
                        {kr(l.lowNok)}–{kr(l.highNok)}
                      </td>
                    </tr>
                  ))}
                  <tr className="sum">
                    <td>Totalt</td>
                    <td>
                      {kr(result.estimate.totalLowNok)}–{kr(result.estimate.totalHighNok)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="illu">Grovt estimat basert på typiske håndverkerpriser. Ikke et tilbud.</p>
            </div>
            <a className="btn" href="#" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
              Få tilbud fra håndverkere i nærheten
            </a>
            <a
              className="btn ghost"
              href={result.imageUrl}
              download
              style={{ width: '100%', textAlign: 'center', display: 'block', marginTop: 10 }}
            >
              Last ned bilde
            </a>
          </div>
        </div>
      )}

      <footer className="site">© Vøling · Alle bilder er visualiseringer (illustrasjon)</footer>
    </div>
  );
}
