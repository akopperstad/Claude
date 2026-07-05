"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reveals its children on scroll-in with a subtle rise + fade.
 * `stagger` animates direct children sequentially (add `.reveal` to them);
 * otherwise the wrapper itself is revealed.
 */
export default function Reveal({
  children,
  stagger = false,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  stagger?: boolean;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = stagger
      ? Array.from(el.querySelectorAll<HTMLElement>(".reveal"))
      : [el];
    if (!targets.length) return;

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
