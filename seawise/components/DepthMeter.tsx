"use client";

import { useEffect, useRef } from "react";

const MAX_DEPTH = 3800; // metres at page bottom

/**
 * THE DIVE instrument: a fixed left rail that reads out the current depth
 * as the visitor scrolls — 0 M at the surface, −3 800 M at the footer.
 * Desktop only; hidden for reduced-motion.
 */
export default function DepthMeter() {
  const readout = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce && root.current) {
      root.current.style.display = "none";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const s = doc.scrollHeight > window.innerHeight
        ? window.scrollY / (doc.scrollHeight - window.innerHeight)
        : 0;
      const depth = Math.round(s * MAX_DEPTH);
      if (readout.current) {
        readout.current.textContent = `−${String(depth).padStart(4, "0")} M`;
      }
      if (fill.current) fill.current.style.height = `${s * 100}%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-sea-mist/60 [writing-mode:vertical-rl]">
        Depth
      </span>
      <div className="relative h-40 w-px bg-sea-steel/30">
        <div ref={fill} className="absolute top-0 w-px bg-sea-signal" style={{ height: "0%" }} />
      </div>
      <span ref={readout} className="font-mono text-[0.7rem] tracking-widest text-sea-signal">
        −0000 M
      </span>
    </div>
  );
}
