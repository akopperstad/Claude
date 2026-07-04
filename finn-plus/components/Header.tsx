"use client";

import Link from "next/link";
import { usePlus } from "./PlusContext";
import PlusBadge from "./PlusBadge";

export default function Header() {
  const { isPlus } = usePlus();
  return (
    <header className="border-b border-finn-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/" className="flex items-baseline gap-0.5 select-none">
          <span className="text-3xl font-bold tracking-tight text-finn-blue">
            FINN
          </span>
          <span className="text-3xl font-bold text-finn-blue">.no</span>
        </Link>

        <Link
          href="/plus"
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
            isPlus
              ? "bg-finn-plus-light text-finn-plus"
              : "bg-finn-plus text-white hover:opacity-90"
          }`}
        >
          {isPlus ? (
            <>
              <PlusBadge size="sm" /> Medlem
            </>
          ) : (
            <>Prøv FINN+</>
          )}
        </Link>

        <div className="ml-auto flex items-center gap-5 text-sm text-finn-gray">
          <Link href="/selger" className="hidden items-center gap-1.5 hover:text-finn-blue sm:flex">
            <IconTag />
            Mine annonser
          </Link>
          <button className="hidden items-center gap-1.5 hover:text-finn-blue sm:flex">
            <IconBell />
            Varslinger
          </button>
          <button className="hidden items-center gap-1.5 hover:text-finn-blue sm:flex">
            <IconHeart />
            Favoritter
          </button>
          <button className="flex items-center gap-1.5 hover:text-finn-blue">
            <IconUser />
            Logg inn
          </button>
          <Link
            href="#"
            className="rounded-lg bg-finn-ice-2 px-4 py-2 font-medium text-finn-blue hover:bg-finn-ice"
          >
            Ny annonse
          </Link>
        </div>
      </div>
    </header>
  );
}

function IconTag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2H2v10l9.3 9.3a2 2 0 0 0 2.8 0l7.2-7.2a2 2 0 0 0 0-2.8z" />
      <circle cx="7" cy="7" r="1.5" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 7z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
