import Link from "next/link";
import { Listing } from "@/lib/types";
import { formatKm, formatPrice } from "@/lib/listings";
import ListingImage from "./ListingImage";
import PriceBadge from "./PriceBadge";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-finn-border bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative">
        <ListingImage image={listing.image} className="aspect-[4/3] w-full" />
        <PriceBadge listing={listing} />
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
