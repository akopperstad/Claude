'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { CompareSlider } from '@/components/CompareSlider';
import { EXTERIOR_STYLES } from '@pipeline/presets';

type Level = 1 | 2 | 3 | 4;

interface EstimateLine {
  label: string;
  lowNok: number;
  highNok: number;
}
interface RenderRecord {
  id?: string;
  parentId?: string;
  instruction?: string;
  level: Level;
  target: string;
  imageUrl: string;
  estimate: { lines: EstimateLine[]; totalLowNok: number; totalHighNok: number };
  palette?: { cladding: string; trim: string; door: string; roof: string; reasoning: string };
  staging?: boolean;
  styleId?: string;
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

const NIVAER: { level: Level; navn: string; body: string; tag: string; poeng: number }[] = [
  { level: 1, navn: 'Farge', body: 'Kun ny farge på kledningen. Alt annet urørt.', tag: 'Inkludert i gratis', poeng: 1 },
  { level: 2, navn: 'Overflater', body: 'Ny kledning — tak, karmer og dører harmoniseres.', tag: 'Boligjakt / Prosjekt', poeng: 1 },
  { level: 3, navn: 'Oppgradering', body: 'Nye vinduer, inngang, platting og AI-palett.', tag: 'Prosjekt', poeng: 2 },
  { level: 4, navn: 'Visjon', body: 'Full arkitektonisk forvandling på samme tomt.', tag: 'Prosjekt', poeng: 3 },
];

const FARGER: { navn: string; hex: string }[] = [
  { navn: 'Klassisk hvit', hex: '#EFEDE6' },
  { navn: 'Rørosrød', hex: '#7C2A22' },
  { navn: 'Kystgrå', hex: '#A8A59B' },
  { navn: 'Mørk grå', hex: '#3E3C38' },
  { navn: 'Oker', hex: '#C08A2D' },
  { navn: 'Skogsgrønn', hex: '#3F5240' },
];

function kr(n: number): string {
  return `${Math.round(n / 1000)} 000 kr`;
}

export default function ProsjektPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [level, setLevel] = useState<Level>(1);
  const [farge, setFarge] = useState<string | null>(null);
  const [egenFarge, setEgenFarge] = useState('');
  const [wishes, setWishes] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [result, setResult] = useState<(RenderRecord & { demoSubstituted?: boolean }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'idle' | 'sent'>('idle');
  const [juster, setJuster] = useState('');
  const [styleId, setStyleId] = useState<string | null>(null);
  // null = follow the level default (on at nivå 3-4, off at 1-2, A21)
  const [stagingChoice, setStagingChoice] = useState<boolean | null>(null);
  const [insp, setInsp] = useState<{ base64: string; mime: string; name: string } | null>(null);
  const staging = stagingChoice ?? level >= 3;

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

  // Chain of the shown render (A16.3): walk parent links, oldest first.
  const byId = new Map(project.renders.filter((r) => r.id).map((r) => [r.id!, r]));
  const chain: RenderRecord[] = [];
  for (let cur = result as RenderRecord | undefined; cur; ) {
    chain.unshift(cur);
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }

  async function render(edit?: { baseRenderId: string; instruction: string }) {
    setBusy(true);
    setError(null);
    // Typical generative render: 20-45 s. The bar eases toward 90% on that
    // clock and only hits 100% on a real response — honest, never stuck.
    const started = Date.now();
    const FUN = [
      'Klipper plenen mens vi venter …',
      'Rister malingsspannet …',
      'Teiper vinduskarmene …',
      'Flytter blomsterpottene vekk fra trappa …',
      'Diskuterer fargevalget med naboen …',
      'Koker kaffe til malerne …',
      'Jager katten ut av bildet …',
      'Retter opp flaggstanga …',
      'Krysser fingrene for tørkevær …',
      'Fjerner presenningen …',
    ];
    setProgress(4);
    setStage('Leser bildet …');
    const ticker = setInterval(() => {
      const s = (Date.now() - started) / 1000;
      setProgress(Math.min(90, Math.round((s / 110) * 100)));
      if (s < 3) setStage('Leser bildet …');
      else if (s < 8) setStage('Analyserer fasade og omgivelser …');
      else if (s < 15) setStage('Genererer — tar vanligvis 1–2 minutter');
      else setStage(FUN[Math.floor((s - 15) / 7) % FUN.length]);
    }, 900);
    try {
      const valgtFarge = egenFarge.trim() || farge;
      const payload = edit ?? {
        level,
        staging,
        ...(level <= 2 && valgtFarge ? { target: valgtFarge } : {}),
        ...(level >= 2 && styleId ? { styleId } : {}),
        ...(wishes.trim() ? { wishes: wishes.trim() } : {}),
        ...(level >= 3 && insp
          ? { inspirationBase64: insp.base64, inspirationMime: insp.mime }
          : {}),
      };
      const res = await fetch(`/api/prosjekt/${project!.id}/render`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data?.error ?? 'rendering feilet');
      setProgress(100);
      setStage('Ferdig!');
      setResult(data);
      setProject((p) => (p ? { ...p, renders: [...p.renders, data] } : p));
      if (edit) setJuster('');
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
              onClick={() => {
                setLevel(n.level);
                const s = EXTERIOR_STYLES.find((x) => x.id === styleId);
                if (s && s.minLevel > n.level) setStyleId(null);
              }}
            >
              <span className="num">Nivå {n.level} · {n.poeng} poeng</span>
              <h3>{n.navn}</h3>
              <p>{n.body}</p>
              <span className="tag">{n.tag}</span>
            </button>
          ))}
        </div>
        {level <= 2 && (
          <div className="valg">
            <span className="eyebrow">
              {level === 1 ? 'Velg farge — eller la AI foreslå' : 'Velg kledning — tak, karmer og dører harmoniseres automatisk'}
            </span>
            <div className="chips">
              {FARGER.map((f) => (
                <button
                  key={f.navn}
                  className={`chip-farge${farge === f.navn ? ' valgt' : ''}`}
                  onClick={() => {
                    setFarge(farge === f.navn ? null : f.navn);
                    setEgenFarge('');
                  }}
                >
                  <span className="dot" style={{ background: f.hex }} />
                  {f.navn}
                </button>
              ))}
            </div>
            <input
              className="felt"
              placeholder="… eller skriv din egen (f.eks. «dyp burgunder»)"
              value={egenFarge}
              onChange={(e) => {
                setEgenFarge(e.target.value);
                setFarge(null);
              }}
            />
          </div>
        )}
        {level >= 2 && (
          <div className="valg">
            <span className="eyebrow">Velg stil (valgfritt)</span>
            <div className="chips">
              {EXTERIOR_STYLES.filter((s) => s.minLevel <= level).map((s) => (
                <button
                  key={s.id}
                  className={`chip-farge${styleId === s.id ? ' valgt' : ''}`}
                  title={s.beskrivelse}
                  onClick={() => setStyleId(styleId === s.id ? null : s.id)}
                >
                  {s.navn}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="valg">
          <span className="eyebrow">Egne ønsker (valgfritt)</span>
          <textarea
            className="felt"
            rows={2}
            maxLength={400}
            placeholder={
              level <= 2
                ? 'F.eks. «behold døren som den er, litt varmere tone i sola»'
                : 'F.eks. «legg platting rundt første etasje, bytt inngangsdør til eik»'
            }
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
          />
        </div>
        {level >= 3 && (
          <div className="valg">
            <span className="eyebrow">Inspirasjonsbilde (valgfritt) — «slik vil jeg ha det»</span>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return setInsp(null);
                const reader = new FileReader();
                reader.onload = () => {
                  const url = String(reader.result);
                  setInsp({
                    base64: url.slice(url.indexOf(',') + 1),
                    mime: f.type === 'image/png' ? 'image/png' : 'image/jpeg',
                    name: f.name,
                  });
                };
                reader.readAsDataURL(f);
              }}
            />
            {insp && (
              <div className="hint">
                {insp.name} lastes opp som stilreferanse.{' '}
                <button className="btn ghost" onClick={() => setInsp(null)}>
                  Fjern
                </button>
              </div>
            )}
          </div>
        )}
        <div className="valg">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={staging}
              onChange={(e) => setStagingChoice(e.target.checked)}
            />
            <span>
              <b>Vis huset nyvasket og ryddet</b> — fjerner rot og parabol, vasker tak og
              kledning, steller hagen. Merkes alltid på resultatet.
            </span>
          </label>
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
              {result.staging && ' · Inkluderer rydding og vask'}
              {result.demoSubstituted &&
                ' · Demo-modus: eksempelrender vist — koble til render-API for ditt bilde'}
            </p>
            {chain.length > 1 && (
              <div className="chips" style={{ marginTop: 10 }}>
                {chain.map((r, i) => (
                  <button
                    key={r.id ?? i}
                    className={`chip-farge${r === result ? ' valgt' : ''}`}
                    onClick={() => setResult(r)}
                    title="Vis dette steget — neste justering bygger på steget du ser"
                  >
                    {i + 1}. {r.instruction ?? r.target}
                  </button>
                ))}
              </div>
            )}
            {result.id && (
              <form
                style={{ display: 'flex', gap: 8, marginTop: 12 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (juster.trim() && result?.id)
                    void render({ baseRenderId: result.id, instruction: juster.trim() });
                }}
              >
                <input
                  className="felt"
                  style={{ margin: 0, flex: 1 }}
                  maxLength={400}
                  placeholder="Juster videre — f.eks. «og fjern buskene foran»"
                  value={juster}
                  onChange={(e) => setJuster(e.target.value)}
                />
                <button className="btn" type="submit" disabled={busy || !juster.trim()}>
                  {busy ? 'Justerer …' : 'Juster'}
                </button>
              </form>
            )}
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
            <div className="kort" style={{ marginTop: 18 }}>
              <span className="eyebrow">Få rapporten på e-post</span>
              {emailState === 'sent' ? (
                <p style={{ fontSize: 14.5, margin: '8px 0 0', color: 'var(--gran-ink)' }}>
                  Takk! Vi holder deg oppdatert.
                </p>
              ) : (
                <form
                  style={{ display: 'flex', gap: 8, marginTop: 10 }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await fetch('/api/interesse', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, projectId: project.id }),
                    });
                    if (res.ok) setEmailState('sent');
                  }}
                >
                  <input
                    className="felt"
                    style={{ margin: 0, flex: 1 }}
                    type="email"
                    required
                    placeholder="din@epost.no"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn" type="submit">
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="site">© Vøling · Alle bilder er visualiseringer (illustrasjon)</footer>
    </div>
  );
}
