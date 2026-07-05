"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor: a signal dot with a trailing ring that swells over
 * interactive elements. Desktop fine-pointer only; reduced-motion safe.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest("a,button,select,input,textarea,[data-cursor]");
      gsap.to(ring.current, { scale: t ? 2.2 : 1, opacity: t ? 0.9 : 0.45, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden [.has-cursor_&]:block">
      <div ref={ring} className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-sea-signal opacity-45" />
      <div ref={dot} className="absolute -ml-0.5 -mt-0.5 h-1 w-1 rounded-full bg-sea-signal" />
    </div>
  );
}
