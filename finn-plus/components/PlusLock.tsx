"use client";

import Link from "next/link";
import { usePlus } from "./PlusContext";
import PlusBadge from "./PlusBadge";

/**
 * Wraps a plus-only feature. Members see children; free users see a blurred
 * preview with an upsell overlay linking to /plus.
 */
export default function PlusLock({
  children,
  teaser,
}: {
  children: React.ReactNode;
  /** One line under the lock explaining what the member gets. */
  teaser: string;
}) {
  const { isPlus } = usePlus();

  if (isPlus) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/60 p-4 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-finn-plus-light">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7311d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </span>
        <p className="max-w-xs text-sm font-medium text-finn-ink">{teaser}</p>
        <Link
          href="/plus"
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-finn-plus px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Lås opp med <PlusBadge size="sm" />
        </Link>
      </div>
    </div>
  );
}
