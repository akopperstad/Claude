"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Node = { id: string; label: string; x: number; y: number; hub?: boolean };

const NODES: Node[] = [
  { id: "cc", label: "Command Center", x: 50, y: 16, hub: true },
  { id: "compliance", label: "Compliance", x: 30, y: 22 },
  { id: "commercial", label: "Commercial", x: 84, y: 24 },
  { id: "fleet", label: "Fleet", x: 16, y: 36 },
  { id: "finance", label: "Finance", x: 68, y: 38 },
  { id: "intelligence", label: "Intelligence", x: 46, y: 50 },
  { id: "crew", label: "Crew", x: 27, y: 58 },
  { id: "documents", label: "Documents", x: 82, y: 58 },
  { id: "maintenance", label: "Maintenance", x: 14, y: 78 },
  { id: "supply", label: "Supply", x: 38, y: 84 },
  { id: "hseq", label: "HSEQ", x: 60, y: 78 },
  { id: "security", label: "Security", x: 80, y: 88 },
];

const EDGES: [string, string][] = [
  ["cc", "compliance"],
  ["cc", "commercial"],
  ["cc", "fleet"],
  ["cc", "finance"],
  ["cc", "intelligence"],
  ["fleet", "crew"],
  ["crew", "maintenance"],
  ["crew", "supply"],
  ["supply", "hseq"],
  ["hseq", "security"],
  ["intelligence", "documents"],
  ["intelligence", "hseq"],
  ["documents", "finance"],
  ["documents", "security"],
  ["finance", "commercial"],
];

const pos = Object.fromEntries(NODES.map((n) => [n.id, n]));

/**
 * The data-sea payoff: Nautech's modules as a constellation of connected
 * fleet-nodes — the same glowing points from the dive, resolved into the
 * system map. Desktop only; the plain list renders on mobile.
 */
export default function Constellation() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = el.querySelectorAll(".cnode");
    const lines = el.querySelectorAll(".cline");
    if (reduce) {
      gsap.set([nodes, lines], { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.1,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        }
      );
      gsap.fromTo(
        nodes,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative hidden h-[540px] md:block" aria-label="Nautech module map">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            className="cline"
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            stroke="#35506B"
            strokeOpacity="0.45"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity="0"
          />
        ))}
      </svg>
      {NODES.map((n) => (
        <div
          key={n.id}
          className="cnode group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 opacity-0"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className={`rounded-full bg-sea-signal transition-all duration-300 group-hover:shadow-[0_0_18px] group-hover:shadow-sea-signal ${
              n.hub ? "h-3 w-3 shadow-[0_0_14px] shadow-sea-signal" : "h-1.5 w-1.5"
            }`}
          />
          <span
            className={`whitespace-nowrap transition-colors duration-300 group-hover:text-sea-signal ${
              n.hub ? "font-display text-xl text-sea-foam" : "text-sm text-sea-mist"
            }`}
          >
            {n.label}
          </span>
        </div>
      ))}
    </div>
  );
}
