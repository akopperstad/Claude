'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Pil } from '@/components/Pil';
import { EXTERIOR_STYLES, type ExteriorStyle } from '@pipeline/presets';

/**
 * The style gallery as an even grid of cards, with a lightbox preview
 * (click the image) that pages through the styles.
 *   onSelect  -> project page: pick a style for the current render.
 *   tryHref   -> landing: the preview routes into the funnel with the style
 *                pre-selected (kills the browse-only dead end).
 * Browse-only if neither is set.
 */
export function StyleStrip({
  maxLevel = 4,
  selectedId = null,
  onSelect,
  tryHref,
}: {
  maxLevel?: number;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  tryHref?: (id: string) => string;
}) {
  const styles = EXTERIOR_STYLES.filter((s) => s.minLevel <= maxLevel);
  const [open, setOpen] = useState<number | null>(null);

  // Mono-indeks per stil (01–07) — kanonisk rekkefølge fra EXTERIOR_STYLES,
  // uavhengig av maxLevel-filteret, så nummereringen matcher landingen.
  const nr = (id: string) => String(EXTERIOR_STYLES.findIndex((x) => x.id === id) + 1).padStart(2, '0');

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + styles.length) % styles.length)),
    [styles.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  const vis: ExteriorStyle | null = open === null ? null : styles[open];

  return (
    <>
      <div className="stilstripe" role="list">
        {styles.map((s, i) => (
          <div key={s.id} className={`stil${selectedId === s.id ? ' valgt' : ''}`} role="listitem">
            <button
              className="stilbilde"
              onClick={() => setOpen(i)}
              aria-label={`Forhåndsvis ${s.navn}`}
            >
              <img
                src={`/styles/${s.id}.jpg`}
                alt={s.navn}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="zoom" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M7 1h4v4M11 1 6.5 5.5M5 11H1V7M1 11l4.5-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </button>
            <button
              className="stiltekst"
              onClick={() => (onSelect ? onSelect(selectedId === s.id ? null : s.id) : setOpen(i))}
            >
              <b>
                <span className="nr">{nr(s.id)}</span> · {s.navn}
              </b>
              <span>{s.beskrivelse}</span>
              {onSelect && (
                <span className="velg">
                  {selectedId === s.id ? (
                    <>
                      Valgt
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path
                          d="M1.5 6.6 4.7 9.8 10.5 2.4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Velg
                      <Pil />
                    </>
                  )}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>

      {vis && (
        <div className="lysboks" role="dialog" aria-modal onClick={() => setOpen(null)}>
          <div className="lysboks-innhold" onClick={(e) => e.stopPropagation()}>
            <img src={`/styles/${vis.id}.jpg`} alt={vis.navn} />
            <div className="lysboks-tekst">
              <b>
                <span className="nr">{nr(vis.id)}</span> · {vis.navn}
              </b>
              <span>{vis.beskrivelse}</span>
              {onSelect && (
                <button
                  className="btn"
                  onClick={() => {
                    onSelect(vis.id);
                    setOpen(null);
                  }}
                >
                  Velg denne stilen
                </button>
              )}
              {!onSelect && tryHref && (
                <Link className="btn" href={tryHref(vis.id)}>
                  Prøv denne stilen på ditt hus
                </Link>
              )}
            </div>
            <button className="lysboks-pil venstre" onClick={() => step(-1)} aria-label="Forrige stil">
              ‹
            </button>
            <button className="lysboks-pil hoyre" onClick={() => step(1)} aria-label="Neste stil">
              ›
            </button>
            <button className="lysboks-lukk" onClick={() => setOpen(null)} aria-label="Lukk">
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
