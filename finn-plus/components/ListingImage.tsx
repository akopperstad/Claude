import { ListingBase } from "@/lib/types";
import { PHOTO_IDS } from "@/lib/photos";

const PATHS: Record<ListingBase["image"]["icon"], JSX.Element> = {
  house: (
    <g>
      <path d="M20 52 L50 28 L80 52" fill="none" strokeWidth="4" />
      <path d="M28 50 V74 H72 V50" fill="none" strokeWidth="4" />
      <rect x="44" y="58" width="12" height="16" strokeWidth="3" fill="none" />
    </g>
  ),
  apartment: (
    <g>
      <rect x="30" y="26" width="40" height="48" fill="none" strokeWidth="4" />
      <path d="M38 36h6M56 36h6M38 46h6M56 46h6M38 56h6M56 56h6" strokeWidth="3" />
      <rect x="46" y="62" width="8" height="12" strokeWidth="3" fill="none" />
    </g>
  ),
  cabin: (
    <g>
      <path d="M18 56 L50 30 L82 56" fill="none" strokeWidth="4" />
      <path d="M26 52 V74 H74 V52" fill="none" strokeWidth="4" />
      <path d="M34 60h10M56 60h10" strokeWidth="3" />
      <path d="M62 38 V28" strokeWidth="4" />
    </g>
  ),
  car: (
    <g>
      <path d="M22 58 L28 44 Q30 40 35 40 H62 Q67 40 70 44 L78 58" fill="none" strokeWidth="4" />
      <path d="M18 58 H82 V66 H18 Z" fill="none" strokeWidth="4" />
      <circle cx="32" cy="68" r="6" fill="none" strokeWidth="4" />
      <circle cx="68" cy="68" r="6" fill="none" strokeWidth="4" />
    </g>
  ),
};

/** Listing photo when one exists in /public/listings, otherwise a gradient
 *  + line-icon placeholder so the prototype still works without assets. */
export default function ListingImage({
  image,
  listingId,
  alt = "",
  className = "",
}: {
  image: ListingBase["image"];
  listingId?: string;
  alt?: string;
  className?: string;
}) {
  if (listingId && PHOTO_IDS.has(listingId)) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listings/${listingId}.jpg`}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  const { hue, icon } = image;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue},65%,88%), hsl(${hue},55%,72%))`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 m-auto h-3/5 w-3/5"
        style={{ stroke: `hsl(${hue},45%,38%)` }}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        aria-hidden
      >
        {PATHS[icon]}
      </svg>
    </div>
  );
}
