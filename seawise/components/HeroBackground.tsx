"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// R3F canvas must never SSR
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Layered hero backdrop:
 *  1. base depth gradient (always)
 *  2. Higgsfield cinematic plate (subtle, if present)
 *  3. live WebGL depth field (skipped for reduced-motion / until mounted)
 */
export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduce);
    setMounted(true);
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
      {/* 2. cinematic plate */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url(/hero-deep.png)" }}
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
