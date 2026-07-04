"use client";

import { Listing } from "@/lib/types";
import { usePlus } from "./PlusContext";

/** Member-only price-position chip on search-result cards. */
export default function PriceBadge({ listing }: { listing: Listing }) {
  const { isPlus } = usePlus();
  if (!isPlus) return null;

  const pct = Math.round(
    ((listing.price - listing.marketValue) / listing.marketValue) * 100
  );
  const over = pct > 2;
  const under = pct < -2;

  return (
    <span
      className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[11px] font-bold shadow-card ${
        over
          ? "bg-finn-red-light text-finn-red"
          : under
            ? "bg-finn-green-light text-finn-green"
            : "bg-white/90 text-finn-gray"
      }`}
    >
      {over ? `↑ ${pct} % over marked` : under ? `↓ ${Math.abs(pct)} % under marked` : "Markedspris"}
    </span>
  );
}
