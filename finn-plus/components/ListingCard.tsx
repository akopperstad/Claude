"use client";

import Link from "next/link";
import { Listing } from "@/lib/types";
import { formatKm, formatPrice } from "@/lib/listings";
import { hoursUntilPublic, isEarlyAccess } from "@/lib/earlyAccess";
import ListingImage from "./ListingImage";
import PriceBadge from "./PriceBadge";
import PlusBadge from "./PlusBadge";
import { usePlus } from "./PlusContext";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { isPlus } = usePlus();
  const early = isEarlyAccess(listing);

  // Free user + early-access listing: FOMO teaser instead of the listing.
  if (early && !isPlus) {
    return (
      <Link
        href="/plus"
        className="group flex flex-col overflow-hidden rounded-lg border border-finn-plus/30 bg-white shadow-card transition-shadow hover:shadow-card-hover"
      >
        <div className="relative">
          <ListingImage
            image={listing.image}
            listingId={listing.id}
            className="aspect-[4/3] w-full blur-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white/40">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-finn-plus-light">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7311d1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          <span className="text-xs text-finn-gray-2">{listing.location}</span>
          <p className="text-sm font-medium leading-snug text-finn-ink">
            Ny annonse — <PlusBadge size="sm" /> medlemmer ser den nå
          </p>
          <span className="mt-auto pt-1 text-xs font-medium text-finn-plus group-hover:underline">
            Få tilgang {hoursUntilPublic(listing)} timer før alle andre →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-finn-border bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative">
        <ListingImage image={listing.image} listingId={listing.id} alt={listing.title} className="aspect-[4/3] w-full" />
        <PriceBadge listing={listing} />
        {early && isPlus && (
          <span className="absolute bottom-2 left-2 rounded-full bg-finn-plus px-2 py-1 text-[11px] font-bold text-white shadow-card">
            ⚡ Tidlig tilgang · {hoursUntilPublic(listing)} t igjen
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-xs text-finn-gray-2">{listing.location}</span>
        <h3 className="text-sm font-medium leading-snug text-finn-ink group-hover:underline">
          {listing.title}
        </h3>
        {listing.vertical === "eiendom" ? (
          <span className="mt-auto pt-1 text-xs text-finn-gray">
            {listing.type} · {listing.sqm} m² · {listing.bedrooms} soverom
          </span>
        ) : (
          <span className="mt-auto pt-1 text-xs text-finn-gray">
            {listing.year} · {formatKm(listing.km)} · {listing.fuel}
          </span>
        )}
        <span className="text-base font-bold text-finn-ink">
          {formatPrice(listing.price)}
        </span>
      </div>
    </Link>
  );
}
