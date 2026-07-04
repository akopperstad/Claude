"use client";

import Link from "next/link";
import { usePlus } from "./PlusContext";
import PlusBadge from "./PlusBadge";

/** Wraps an early-access listing page. Members pass through; free users hit
 *  an upsell wall instead of the listing content. */
export default function EarlyAccessGate({
  earlyAccess,
  hoursLeft,
  children,
}: {
  earlyAccess: boolean;
  hoursLeft: number;
  children: React.ReactNode;
}) {
  const { isPlus } = usePlus();

  if (!earlyAccess || isPlus) {
    return (
      <>
        {earlyAccess && (
          <div className="mx-auto mt-4 flex max-w-4xl items-center gap-2 rounded-lg bg-finn-plus-light px-4 py-3 text-sm font-medium text-finn-plus">
            ⚡ Tidlig tilgang: denne annonsen blir synlig for alle om {hoursLeft} timer.
            Du ser den nå fordi du er FINN+ medlem.
          </div>
        )}
        {children}
      </>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-finn-plus-light">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7311d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </span>
      <h1 className="mt-5 text-2xl font-bold">
        Denne annonsen er i tidlig tilgang
      </h1>
      <p className="mt-3 text-finn-gray">
        FINN+ medlemmer ser nye annonser 24 timer før alle andre. Annonsen blir
        åpen for alle om <strong>{hoursLeft} timer</strong> — eller du kan se
        den nå.
      </p>
      <Link
        href="/plus"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-finn-plus px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Se annonsen nå med <PlusBadge size="sm" />
      </Link>
      <p className="mt-3 text-xs text-finn-gray-2">99 kr/mnd. Ingen binding.</p>
    </main>
  );
}
