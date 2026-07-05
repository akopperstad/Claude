'use client';

import { useEffect, useRef, useState } from 'react';
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

const NIVAER: { level: Level; navn: string; body: string; poeng: number }[] = [
  { level: 1, navn: 'Farge', body: 'Kun ny farge på kledningen. Alt annet urørt.', poeng: 1 },
  { level: 2, navn: 'Overflater', body: 'Ny kledning — tak, karmer og dører harmoniseres.', poeng: 1 },
  { level: 3, navn: 'Oppgradering', body: 'Nye vinduer, inngang, platting og AI-palett.', poeng: 2 },
  { level: 4, navn: 'Visjon', body: 'Full arkitektonisk forvandling på samme tomt.', poeng: 3 },
];

/** «Populære ideer» (A25): editorial one-tap follow-ups for the chain. */
const IDEER: string[] = [
  'Bålpanne på uteplassen',
  'Utekjøkken med grill',
  'Basseng i hagen',
  'Drivhus i hjørnet av hagen',
  'Ny dobbel garasje',
  'Hagebelysning langs gangstien',
  'Levegg ved terrassen',
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
  const resultRef = useRef<HTMLDivElement>(null);

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
  const poeng = NIVAER.find((n) => n.level === level)?.poeng ?? 1;

  // Chain of the shown render (A16.3): walk parent links, oldest first.
  const byId = new Map(project.renders.filter((r) => r.id).map((r) => [r.id!, r]));
  const chain: RenderRecord[] = [];
  for (let cur = result as RenderRecord | undefined; cur; ) {
    chain.unshift(cur);
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }

  async function render(edit?: { baseRenderId: string; instruction: string; source?: 'chip' | 'text' }) {
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
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'rendering feilet');
    } finally {
      clearInterval(ticker);
      setBusy(false);
    }
  }

  /** Share card (A25): before/after side by side with the Vøling watermark. */
  async function shareCard() {
    if (!result) return;
    const load = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    const [before, after] = await Promise.all([load(beforeUrl), load(result.imageUrl)]);
    const H = 900;
    const wB = Math.round((before.width / before.height) * H);
    const wA = Math.round((after.width / after.height) * H);
    const footer = 110;
    const canvas = document.createElement('canvas');
    canvas.width = wB + wA;
    canvas.height = H + footer;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#faf9f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(before, 0, 0, wB, H);
    ctx.drawImage(after, wB, 0, wA, H);
    const tag = (text: string, x: number) => {
      ctx.fillStyle = 'rgba(20,24,20,0.78)';
      ctx.fillRect(x, 24, 118, 46);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillText(text, x + 20, 55);
    };
    tag('FØR', 24);
    tag('ETTER', wB + 24);
    ctx.fillStyle = '#2e4636';
    ctx.font = 'bold 34px system-ui, sans-serif';
    ctx.fillText('vøling', 32, H + 68);
    ctx.fillStyle = '#5c6660';
    ctx.font = '26px system-ui, sans-serif';
    ctx.fillText('Se huset ditt i ny drakt · illustrasjon', 152, H + 68);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'voling-for-etter.png';
      a.click();
      URL.revokeObjectURL(a.href);
    }, 'image/png');
  }

  return (
    <div className="wrap">
      <nav className="site">
        <Logo />
        <div className="links">
          <span className="eyebrow">{result ? 'Illustrasjon' : 'Nytt prosjekt'}</span>
        </div>
      </nav>

      <section className="prosjekt-hode">
        <span className="eyebrow">Analysert</span>
        <h1>{project.analysis.buildingType}</h1>
        <p>
          {project.analysis.cladding} · {project.analysis.roof} · {project.analysis.windows}
        </p>
      </section>

      <section className="steg-seksjon">
        <h2>
          <span className="stegnr">1</span> Hvor langt vil du gå?
        </h2>
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
              <span className="num">Nivå {n.level}</span>
              <h3>{n.navn}</h3>
              <p>{n.body}</p>
              <span className="tag">{n.poeng} poeng · gratis i beta</span>
            </button>
          ))}
        </div>
      </section>

      <section className="steg-seksjon">
        <h2>
          <span className="stegnr">2</span> Tilpass
        </h2>
        <div className="panel">
          {level <= 2 && (
            <div className="del">
              <span className="label">
                {level === 1
                  ? 'Farge — velg selv, skriv din egen, eller la AI foreslå'
                  : 'Kledningsfarge — tak, karmer og dører harmoniseres automatisk'}
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
            <div className="del">
              <span className="label">Stil (valgfritt) — samme hus, syv retninger</span>
              <div className="stiler">
                {EXTERIOR_STYLES.filter((s) => s.minLevel <= level).map((s) => (
                  <button
                    key={s.id}
                    className={`stil${styleId === s.id ? ' valgt' : ''}`}
                    onClick={() => setStyleId(styleId === s.id ? null : s.id)}
                  >
                    {/* thumbnails from scripts/gen-style-thumbs.mjs; card works without */}
                    <img
                      src={`/styles/${s.id}.jpg`}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <b>{s.navn}</b>
                    <span>{s.beskrivelse}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="del">
            <span className="label">Egne ønsker (valgfritt)</span>
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
            <div className="del">
              <span className="label">Inspirasjonsbilde (valgfritt) — «slik vil jeg ha det»</span>
              <div className="upload">
                <label className="btn ghost">
                  Velg bilde
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    hidden
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
                </label>
                {insp ? (
                  <span className="filnavn">
                    {insp.name}
                    <button className="fjern" onClick={() => setInsp(null)} aria-label="Fjern inspirasjonsbilde">
                      ×
                    </button>
                  </span>
                ) : (
                  <span className="filnavn tom">Ingen bilde valgt</span>
                )}
              </div>
            </div>
          )}
          <div className="del">
            <label className="brytervalg">
              <span className={`bryter${staging ? ' på' : ''}`} aria-hidden>
                <span className="knott" />
              </span>
              <input
                type="checkbox"
                hidden
                checked={staging}
                onChange={(e) => setStagingChoice(e.target.checked)}
              />
              <span className="brytertekst">
                <b>Vis huset nyvasket og ryddet</b>
                Fjerner rot og parabol, vasker tak og kledning, steller hagen. Merkes alltid på
                resultatet.
              </span>
            </label>
          </div>
        </div>
      </section>

      <section className="steg-seksjon">
        <h2>
          <span className="stegnr">3</span> Se resultatet
        </h2>
        <div className="cta">
          <button className="btn stor" disabled={busy} onClick={() => void render()}>
            {busy ? 'Lager visualisering …' : 'Lag visualisering →'}
          </button>
          <span className="poengnote">
            Bruker {poeng} {poeng === 1 ? 'poeng' : 'poeng'} av dagens gratis kvote
          </span>
        </div>
        {busy && (
          <div className="progress" role="status" aria-live="polite">
            <div className="bar">
              <div className="fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="stage">{stage}</div>
          </div>
        )}
        {level >= 3 && !busy && (
          <div className="hint">
            Nivå 3–4 kan inneholde tiltak som er søknadspliktige. Alle bilder er visualiseringer.
          </div>
        )}
        {error && <div className="hint">{error}</div>}
      </section>

      {result && (
        <div className="resgrid" ref={resultRef}>
          <div>
            <CompareSlider before={beforeUrl} after={result.imageUrl} />
            <p className="illu">
              Illustrasjon · Nivå {result.level}: {result.target}
              {result.staging && ' · Inkluderer rydding og vask'}
              {result.demoSubstituted &&
                ' · Demo-modus: eksempelrender vist — koble til render-API for ditt bilde'}
            </p>
            <div className="kort juster-kort">
              <span className="eyebrow">Juster videre</span>
              {chain.length > 1 && (
                <div className="chips stegrekke">
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
                <>
                  <form
                    className="justerform"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (juster.trim() && result?.id)
                        void render({ baseRenderId: result.id, instruction: juster.trim(), source: 'text' });
                    }}
                  >
                    <input
                      className="felt"
                      maxLength={400}
                      placeholder="F.eks. «og fjern buskene foran»"
                      value={juster}
                      onChange={(e) => setJuster(e.target.value)}
                    />
                    <button className="btn" type="submit" disabled={busy || !juster.trim()}>
                      {busy ? 'Justerer …' : 'Juster'}
                    </button>
                  </form>
                  <span className="label" style={{ marginTop: 14 }}>
                    Populære ideer
                  </span>
                  <div className="chips">
                    {IDEER.map((idee) => (
                      <button
                        key={idee}
                        className="chip-farge"
                        disabled={busy}
                        onClick={() => {
                          if (result?.id)
                            void render({ baseRenderId: result.id, instruction: idee, source: 'chip' });
                        }}
                      >
                        + {idee}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
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
            <div className="handling">
              <a className="btn w100" href="#">
                Få tilbud fra håndverkere i nærheten
              </a>
              <a className="btn ghost w100" href={result.imageUrl} download>
                Last ned bilde
              </a>
              <button className="btn ghost w100" onClick={() => void shareCard()}>
                Del før/etter-bilde
              </button>
            </div>
            <div className="kort" style={{ marginTop: 18 }}>
              <span className="eyebrow">Få rapporten på e-post</span>
              {emailState === 'sent' ? (
                <p style={{ fontSize: 14.5, margin: '8px 0 0', color: 'var(--gran-ink)' }}>
                  Takk! Vi holder deg oppdatert.
                </p>
              ) : (
                <form
                  className="justerform"
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
