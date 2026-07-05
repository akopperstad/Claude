"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis smooth scroll into GSAP's ScrollTrigger so every scroll-driven
 * animation reads from the same eased scroll position. This is the motion
 * backbone the whole site is choreographed on.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Scroll-scrub parallax for any [data-parallax="<yPercent>"] element.
    const tweens = gsap.utils.toArray<HTMLElement>("[data-parallax]").map((el) =>
      gsap.to(el, {
        yPercent: parseFloat(el.dataset.parallax || "0"),
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      })
    );

    return () => {
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
