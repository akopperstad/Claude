"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Load moment: brief black-water veil with the wave mark and coordinates,
 * then the veil lifts and hands the page to the hero. Skipped entirely for
 * reduced-motion.
 */
export default function Intro() {
  const veil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = veil.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.display = "none";
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(".intro-mark", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(".intro-coord", { opacity: 0 }, { opacity: 0.6, duration: 0.4 }, "-=0.2")
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.35 })
      .set(el, { display: "none" });
    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={veil} aria-hidden className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-sea-abyss">
      <div className="intro-mark flex items-center gap-3 font-display text-2xl tracking-tight">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <path d="M4 20c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 7-5" stroke="#3DE0D0" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M4 13c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 7-5" stroke="#3DE0D0" strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
        </svg>
        Seawise
      </div>
      <p className="intro-coord mt-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-sea-mist">
        62°28′N · 006°09′E
      </p>
    </div>
  );
}
