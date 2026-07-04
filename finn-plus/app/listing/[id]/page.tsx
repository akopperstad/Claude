import Link from "next/link";
import { notFound } from "next/navigation";
import { allListings, formatKm, formatPrice, getListing } from "@/lib/listings";
import ListingImage from "@/components/ListingImage";
import PriceInsight from "@/components/PriceInsight";
import EarlyAccessGate from "@/components/EarlyAccessGate";
import { hoursUntilPublic, isEarlyAccess } from "@/lib/earlyAccess";

export function generateStaticParams() {
  return allListings.map((l) => ({ id: l.id }));
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = getListing(params.id);
  if (!listing) notFound();

  return (
    <EarlyAccessGate
      earlyAccess={isEarlyAccess(listing)}
      hoursLeft={hoursUntilPublic(listing)}
    >
    <main className="mx-auto max-w-4xl px-4 py-6">
      <Link
        href={listing.vertical === "eiendom" ? "/eiendom" : "/bil"}
        className="text-sm text-finn-blue hover:underline"
      >
        ← Tilbake til søkeresultater
      </Link>

      <ListingImage
        image={listing.image}
        listingId={listing.id}
        alt={listing.title}
        className="mt-4 aspect-[16/9] w-full rounded-lg"
      />

      <div className="mt-6">
        <span className="text-sm text-finn-gray-2">{listing.location}</span>
        <h1 className="mt-1 text-2xl font-bold">{listing.title}</h1>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-bold">{formatPrice(listing.price)}</span>
          {listing.vertical === "eiendom" && (
            <span className="text-sm text-finn-gray">
              Totalpris: {formatPrice(listing.totalPrice)}
            </span>
          )}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 rounded-lg border border-finn-border bg-finn-bg p-4 text-sm sm:grid-cols-3">
          {listing.vertical === "eiendom" ? (
            <>
              <Fact label="Boligtype" value={listing.type} />
              <Fact label="Bruksareal" value={`${listing.sqm} m²`} />
              <Fact label="Soverom" value={String(listing.bedrooms)} />
              {listing.fellesutgifter && (
                <Fact
                  label="Felleskostnader"
                  value={`${formatPrice(listing.fellesutgifter)}/mnd`}
                />
              )}
            </>
          ) : (
            <>
              <Fact label="Merke" value={listing.make} />
              <Fact label="Modell" value={listing.model} />
              <Fact label="Årsmodell" value={String(listing.year)} />
              <Fact label="Kilometerstand" value={formatKm(listing.km)} />
              <Fact label="Drivstoff" value={listing.fuel} />
              <Fact label="Girkasse" value={listing.gearbox} />
            </>
          )}
        </dl>

        <PriceInsight listing={listing} />

        <div className="mt-6 flex gap-3">
          <button className="rounded-lg bg-finn-blue px-6 py-3 font-medium text-white hover:bg-finn-blue-hover">
            {listing.vertical === "eiendom" ? "Meld interesse" : "Send melding"}
          </button>
          <button className="rounded-lg border border-finn-border px-6 py-3 font-medium text-finn-blue hover:bg-finn-ice">
            ♡ Lagre favoritt
          </button>
        </div>
      </div>
    </main>
    </EarlyAccessGate>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-finn-gray-2">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
