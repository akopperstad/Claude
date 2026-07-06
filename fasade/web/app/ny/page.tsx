'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import './ny.css';

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
  // A27: private-use confirmation gates the finn import
  const [finnBekreft, setFinnBekreft] = useState(false);

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
          <span className="stegviser">
            <i className="aktiv" />
            <i />
            <i />
            Steg 1 av 3 · Last opp
          </span>
        </div>
      </nav>
      <header className="side-hode">
        <span className="eyebrow">Nytt prosjekt</span>
        <h1>Ett bilde er alt som skal til.</h1>
        <p>Last opp et foto av fasaden. Rett forfra, i dagslys, med hele huset i bildet.</p>
      </header>
      <main className="ny-hoved">
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
            <p className="spinner">Analyserer bildet …</p>
          ) : (
            <>
              <svg
                viewBox="0 0 40 40"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6.5 19 20 7l13.5 12" />
                <path d="M10 16v17h20V16" />
                <path d="M17 33v-9.5h6V33" />
                <path d="M28 12.5V9h3v6.2" />
              </svg>
              <p>
                <b>Slipp bildet her, eller klikk for å velge</b>
              </p>
              <p className="filkrav">JPG eller PNG · inntil 15 MB</p>
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
        <p className="tillit">Bildet brukes kun til visualiseringen din.</p>
        <div className="tips">
          <span>
            <span className="nr">01</span>Hele fasaden i bildet
          </span>
          <span>
            <span className="nr">02</span>Dagslys, ikke motlys
          </span>
          <span>
            <span className="nr">03</span>Stå rett foran huset
          </span>
        </div>
        <div className="analyse">
          <b>Vil du bare se hvordan det virker?</b>
          <button
            className="btn ghost"
            disabled={busy}
            onClick={() => void createProject({ demo: true })}
          >
            Prøv eksempelhuset
          </button>
        </div>
        {error && <div className="hint">{error}</div>}
        <div className="finnimport">
          <span className="label">Har du en finn-annonse?</span>
          <form
            className="justerform"
            onSubmit={(e) => {
              e.preventDefault();
              if (finnUrl.trim() && finnBekreft) void hentFinn();
            }}
          >
            <input
              className="felt"
              placeholder="Lim inn lenken til annonsen"
              value={finnUrl}
              onChange={(e) => setFinnUrl(e.target.value)}
            />
            <button
              className="btn"
              type="submit"
              disabled={finnBusy || !finnUrl.trim() || !finnBekreft}
            >
              {finnBusy ? 'Henter …' : 'Hent bilder'}
            </button>
          </form>
          <label className="finnbekreft">
            <input
              type="checkbox"
              checked={finnBekreft}
              onChange={(e) => setFinnBekreft(e.target.checked)}
            />
            <span>
              Bildene tilhører annonsens fotograf og megler. Jeg henter dem kun til privat
              vurdering av boligen.
            </span>
          </label>
          {finnImages.length > 0 && (
            <>
              {finnTitle && <p className="finntittel">{finnTitle}</p>}
              <p className="finnvelg">Velg bildet som viser fasaden best.</p>
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
      </main>
    </div>
  );
}
