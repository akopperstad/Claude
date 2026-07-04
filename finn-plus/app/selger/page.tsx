"use client";

import { useState } from "react";
import Link from "next/link";
import { getListing, formatPrice } from "@/lib/listings";
import { getSellerStats } from "@/lib/sellerStats";
import { Listing } from "@/lib/types";
import ListingImage from "@/components/ListingImage";
import PlusLock from "@/components/PlusLock";
import PlusBadge from "@/components/PlusBadge";
import ViewsChart from "@/components/ViewsChart";

// The demo user's own active listings.
const MY_LISTING_IDS = ["e4", "b7"];

export default function SellerPage() {
  const listings = MY_LISTING_IDS.map(getListing).filter(Boolean) as Listing[];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Mine annonser</h1>
      <p className="mt-1 text-sm text-finn-gray">
        Følg med på hvordan annonsene dine presterer — og gi dem et løft når det
        trengs.
      </p>
      <div className="mt-6 space-y-6">
        {listings.map((l) => (
          <SellerCard key={l.id} listing={l} />
        ))}
      </div>
    </main>
  );
}

function SellerCard({ listing }: { listing: Listing }) {
  const [boosted, setBoosted] = useState(false);
  const stats = getSellerStats(listing);

  return (
    <section className="overflow-hidden rounded-lg border border-finn-border bg-white shadow-card">
      <div className="flex items-center gap-4 border-b border-finn-border p-4">
        <ListingImage image={listing.image} className="h-16 w-24 shrink-0 rounded-md" />
        <div className="min-w-0">
          <Link href={`/listing/${listing.id}`} className="block truncate font-medium hover:underline">
            {listing.title}
          </Link>
          <p className="text-sm text-finn-gray-2">
            {listing.location} · {formatPrice(listing.price)} · Aktiv
          </p>
        </div>
        {boosted && (
          <span className="ml-auto shrink-0 rounded-full bg-finn-plus px-3 py-1 text-xs font-bold text-white">
            🚀 Boostet
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-bold">Annonsestatistikk</h2>
          <PlusBadge size="sm" />
        </div>
        <PlusLock teaser="Se visninger, favoritter og plassering i søket — og boost annonsen — med FINN+">
          <div>
            <div className="grid grid-cols-3 gap-3">
              <Stat
                label="Visninger, 7 dager"
                value={String(stats.totalViews)}
                accent={boosted ? `+${stats.boostUpliftPct} % med boost` : undefined}
              />
              <Stat label="Favoritter" value={String(stats.favorites)} />
              <Stat
                label="Plassering i søket"
                value={boosted ? `#${stats.boostedPosition}` : `#${stats.searchPosition}`}
                accent={boosted ? `opp fra #${stats.searchPosition}` : undefined}
              />
            </div>

            <div className="mt-4">
              <ViewsChart
                history={stats.history}
                projection={boosted ? stats.boostedProjection : undefined}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-finn-plus-light p-4">
              <div>
                <p className="font-bold text-finn-plus">
                  {boosted ? "Boost er aktiv" : "Boost annonsen"}
                </p>
                <p className="text-sm text-finn-gray">
                  {boosted
                    ? `Annonsen ligger nå øverst i søket (#${stats.boostedPosition}).`
                    : `Prioritert plassering og ca. ${stats.boostUpliftPct} % flere visninger. Inkludert i FINN+.`}
                </p>
              </div>
              <button
                onClick={() => setBoosted(!boosted)}
                className={`rounded-lg px-5 py-2.5 font-medium ${
                  boosted
                    ? "border border-finn-plus bg-white text-finn-plus hover:bg-finn-plus-light"
                    : "bg-finn-plus text-white hover:opacity-90"
                }`}
              >
                {boosted ? "Skru av boost" : "🚀 Boost nå"}
              </button>
            </div>
          </div>
        </PlusLock>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-lg border border-finn-border bg-finn-bg p-3">
      <p className="text-xs text-finn-gray-2">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      {accent && <p className="text-xs font-bold text-finn-plus">{accent}</p>}
    </div>
  );
}
