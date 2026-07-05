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

  async function createProject(body: FormData | { demo: true }) {
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
        <h1 style={{ fontSize: 34, letterSpacing: '-0.02em', fontWeight: 600, margin: 0 }}>
          Last opp et bilde av boligen
        </h1>
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
        <div className="analyse" style={{ marginTop: 36 }}>
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
