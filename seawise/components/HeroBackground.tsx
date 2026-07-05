"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// R3F canvas must never SSR
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

import { BP } from "@/lib/basePath";

/**
 * Layered hero backdrop:
 *  1. base depth gradient (always)
 *  2. Higgsfield cinematic plate (subtle, if present)
 *  3. live WebGL depth field (skipped for reduced-motion / until mounted)
 */
export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const plate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduce);
    setMounted(true);
    if (reduce) return;

    // THE DIVE: surface light dies with depth — the god-ray plate fades as
    // the visitor scrolls down into the page.
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const s = doc.scrollHeight > window.innerHeight
        ? window.scrollY / (doc.scrollHeight - window.innerHeight)
        : 0;
      if (plate.current) {
        plate.current.style.opacity = String(0.4 * Math.max(0.12, 1 - s * 1.6));
      }
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* 1. base depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 0%, #0A1826 0%, #060C14 42%, #04070C 100%)",
        }}
      />
      {/* 2. cinematic plate — surface light, fades with depth */}
      <div
        ref={plate}
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url(${BP}/hero-deep.jpg)` }}
      />
      {/* 3. live field */}
      {mounted && animate && (
        <div className="absolute inset-0 animate-[fadein_2s_ease-out_forwards] opacity-0">
          <HeroCanvas />
        </div>
      )}
      {/* bottom vignette so type stays legible */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, #04070C 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
