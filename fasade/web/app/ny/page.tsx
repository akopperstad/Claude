'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

export default function NyPage() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finnUrl, setFinnUrl] = useState('');
  const [finnBusy, setFinnBusy] = useState(false);
  const [finnImages, setFinnImages] = useState<string[]>([]);
  const [finnTitle, setFinnTitle] = useState<string | null>(null);

  async function hentFinn() {
    setFinnBusy(true);
    setError(null);
    setFinnImages([]);
    try {
      const res = await fetch('/api/finn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finnUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'klarte ikke hente annonsen');
      setFinnImages(data.images);
      setFinnTitle(data.title ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'klarte ikke hente annonsen');
    } finally {
      setFinnBusy(false);
    }
  }

  async function createProject(body: FormData | { demo: true } | { finnImageUrl: string }) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/prosjekt', {
        method: 'POST',
        ...(body instanceof FormData
          ? { body }
          : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'noe gikk galt');
      router.push(`/prosjekt/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'noe gikk galt');
      setBusy(false);
    }
  }

  function onFile(file: File | undefined | null) {
    if (!file) return;
    const form = new FormData();
    form.set('photo', file);
    void createProject(form);
  }

  return (
    <div className="wrap">
      <nav className="site">
        <Logo />
        <div className="links">
          <span className="eyebrow">Steg 1 av 3</span>
        </div>
      </nav>
      <section style={{ padding: '48px 0' }}>
        <span className="eyebrow">Nytt prosjekt</span>
        <h1 style={{ fontSize: 34, letterSpacing: '-0.02em', fontWeight: 600, margin: '4px 0 0' }}>
          Last opp et bilde av boligen
        </h1>
        <p style={{ color: 'var(--muted)', margin: '6px 0 0', maxWidth: 520 }}>
          Hele fasaden i bildet, dagslys, mobilbilde holder. Vi analyserer huset og
          foreslår hva det kan bli.
        </p>
        <div
          className={`drop${drag ? ' dragover' : ''}`}
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            onFile(e.dataTransfer.files?.[0]);
          }}
        >
          {busy ? (
            <p className="spinner" style={{ margin: 0 }}>
              Analyserer bildet …
            </p>
          ) : (
            <>
              <p style={{ margin: '0 0 8px' }}>
                <b>Slipp bildet her</b> eller trykk for å velge
              </p>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>JPG eller PNG</p>
            </>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png"
            hidden
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
        {error && <div className="hint">{error}</div>}
        <div className="tips">
          <span>📐 Hele fasaden i bildet</span>
          <span>☀️ Dagslys funker best</span>
          <span>📱 Mobilbilde er godt nok</span>
        </div>
        <div className="finnimport">
          <span className="label">Vurderer du en bolig på FINN?</span>
          <form
            className="justerform"
            onSubmit={(e) => {
              e.preventDefault();
              if (finnUrl.trim()) void hentFinn();
            }}
          >
            <input
              className="felt"
              placeholder="Lim inn lenken til annonsen — f.eks. finn.no/realestate/…"
              value={finnUrl}
              onChange={(e) => setFinnUrl(e.target.value)}
            />
            <button className="btn" type="submit" disabled={finnBusy || !finnUrl.trim()}>
              {finnBusy ? 'Henter …' : 'Hent bilder'}
            </button>
          </form>
          {finnImages.length > 0 && (
            <>
              {finnTitle && <p className="finntittel">{finnTitle}</p>}
              <p className="finnvelg">Velg bildet av fasaden:</p>
              <div className="finnbilder">
                {finnImages.map((src) => (
                  <button
                    key={src}
                    disabled={busy}
                    onClick={() => void createProject({ finnImageUrl: src })}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
              <p className="illu">
                Bildene tilhører annonsøren/fotografen. Kun til din egen private
                visualisering i betaperioden.
              </p>
            </>
          )}
        </div>
        <div className="analyse" style={{ marginTop: 20 }}>
          <b>Har du ikke bilde for hånden?</b> Prøv med eksempelhuset vårt.{' '}
          <button
            className="btn ghost"
            style={{ marginLeft: 12 }}
            disabled={busy}
            onClick={() => void createProject({ demo: true })}
          >
            Bruk eksempelhus
          </button>
        </div>
      </section>
    </div>
  );
}
