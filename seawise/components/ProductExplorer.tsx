"use client";

import { useEffect, useRef, useState } from "react";
import { BP } from "@/lib/basePath";

const MODULES = [
  { file: "command-center", label: "Command Center", d: "Real-time fleet overview — bridge data, status, quick actions." },
  { file: "intelligence", label: "Intelligence", d: "Fleet-wide analytics, trends and AI insights." },
  { file: "fleet-ais", label: "Fleet · AIS", d: "Live vessel positions from BarentsWatch AIS." },
  { file: "voyages", label: "Voyages", d: "Voyages, routes, port calls and noon reports." },
  { file: "maintenance", label: "Maintenance", d: "Work orders, defects, inspections, yard stays." },
  { file: "crew", label: "Crew", d: "Personnel, schedules, payroll and competence." },
  { file: "safety", label: "Safety & Quality", d: "SOLAS drills, incidents, risk and compliance score." },
  { file: "emissions", label: "Emissions", d: "CO₂, EU ETS allowances and CII rating." },
  { file: "documents", label: "Documents", d: "ISM, ISPS, certificates and controlled documents." },
  { file: "procurement", label: "Procurement", d: "Purchase orders, suppliers and deliveries." },
  { file: "finance", label: "Finance", d: "Budgets, cost centers, invoices and claims." },
  { file: "chartering", label: "Chartering", d: "Charter parties, hire and laytime." },
] as const;

/**
 * Interactive product explorer: module list on the left drives the screen
 * in the frame. Pointer tilt on the frame; every image preloaded so swaps
 * are instant. Mobile gets a snap-scroll strip instead.
 */
export default function ProductExplorer() {
  const [active, setActive] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  // pointer tilt — desktop, motion-allowed only
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const move = (e: PointerEvent) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1200px) rotateY(${px * 4}deg) rotateX(${-py * 3}deg)`;
      });
    };
    const leave = () => {
      el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Preload all screens (desktop only) so hover swaps are instant without
  // costing mobile visitors ~2 MB they never see.
  useEffect(() => {
    if (window.innerWidth < 768) return;
    MODULES.forEach((x) => {
      const img = new Image();
      img.src = `${BP}/product/${x.file}.png`;
    });
  }, []);

  const m = MODULES[active];

  return (
    <>

      {/* Desktop: list drives the frame */}
      <div className="hidden gap-14 md:grid md:grid-cols-[minmax(230px,0.72fr)_2fr]">
        <nav className="self-center">
          {MODULES.map((x, i) => (
            <button
              key={x.file}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group flex w-full items-baseline gap-4 border-t border-sea-steel/15 py-3 text-left transition-colors ${
                i === active ? "text-sea-signal" : "text-sea-mist hover:text-sea-foam"
              }`}
            >
              <span className="font-mono text-[0.65rem] opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.95rem]">{x.label}</span>
              <span
                className={`ml-auto h-px self-center bg-sea-signal transition-all duration-300 ease-out-expo ${
                  i === active ? "w-8" : "w-0"
                }`}
              />
            </button>
          ))}
        </nav>

        <figure
          ref={frame}
          className="overflow-hidden rounded-xl border border-sea-steel/25 bg-sea-deep/80 shadow-2xl transition-transform duration-200 ease-out will-change-transform"
        >
          <div className="flex items-center gap-2 border-b border-sea-steel/20 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/30" />
            <span className="ml-3 font-mono text-[0.7rem] tracking-widest text-sea-mist">
              NAUTECH · {m.label.toUpperCase()}
            </span>
            <span className="ml-auto hidden font-mono text-[0.65rem] text-sea-mist/50 lg:inline">
              {m.d}
            </span>
          </div>
          <div className="relative aspect-[16/10] bg-sea-mid/40">
            <div
              key={m.file}
              className="absolute inset-0 animate-[fadein_0.45s_ease-out_forwards] bg-cover bg-top opacity-0"
              style={{ backgroundImage: `url(${BP}/product/${m.file}.png)` }}
            />
          </div>
        </figure>
      </div>

      {/* Mobile: snap strip */}
      <div className="-mx-[var(--shell-px)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--shell-px)] pb-4 md:hidden">
        {MODULES.map((x) => (
          <figure
            key={x.file}
            className="w-[86%] shrink-0 snap-center overflow-hidden rounded-xl border border-sea-steel/25 bg-sea-deep/80"
          >
            <div className="flex items-center gap-2 border-b border-sea-steel/20 px-3 py-2">
              <span className="font-mono text-[0.65rem] tracking-widest text-sea-mist">
                {x.label.toUpperCase()}
              </span>
            </div>
            <div
              className="aspect-[16/10] bg-cover bg-top"
              style={{ backgroundImage: `url(${BP}/product/${x.file}.png)` }}
            />
          </figure>
        ))}
      </div>
    </>
  );
}
