"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  ["#problem", "The problem"],
  ["#platform", "Platform"],
  ["#product", "In action"],
  ["#why", "Why Seawise"],
] as const;

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled
          ? "border-b border-sea-steel/15 bg-sea-abyss/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className={`shell flex items-center justify-between transition-all duration-500 ease-out-expo ${
          scrolled ? "py-3.5" : "py-6"
        }`}
      >
        <a href="#top" aria-label="Seawise home">
          <Logo />
        </a>
        <div className="hidden items-center gap-9 text-sm text-sea-mist md:flex">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="group relative transition-colors hover:text-sea-foam">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sea-signal transition-all duration-300 ease-out-expo group-hover:w-full" />
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full border border-sea-steel/60 px-5 py-2 text-sm text-sea-foam transition-colors hover:border-sea-signal hover:text-sea-signal"
        >
          Book a walkthrough
        </a>
      </nav>
    </header>
  );
}
