import { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/listings";
import PlusLock from "./PlusLock";
import PlusBadge from "./PlusBadge";

/** Plus-only price insight on the listing page. Bucket 2 expands this with
 *  history graph and market analysis; for now: valuation vs asking price. */
export default function PriceInsight({ listing }: { listing: Listing }) {
  const diff = listing.price - listing.marketValue;
  const pct = Math.round((diff / listing.marketValue) * 100);
  const over = pct > 2;
  const under = pct < -2;

  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-lg font-bold">Prisinnsikt</h2>
        <PlusBadge size="sm" />
      </div>
      <PlusLock teaser="Se om prisen ligger over eller under markedsverdi — med FINN+">
        <div className="rounded-lg border border-finn-border bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-finn-gray-2">Estimert markedsverdi</p>
              <p className="text-xl font-bold">{formatPrice(listing.marketValue)}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                over
                  ? "bg-finn-red-light text-finn-red"
                  : under
                    ? "bg-finn-green-light text-finn-green"
                    : "bg-finn-bg text-finn-gray"
              }`}
            >
              {over
                ? `${pct} % over markedsverdi`
                : under
                  ? `${Math.abs(pct)} % under markedsverdi`
                  : "Priset som markedet"}
            </span>
          </div>
        </div>
      </PlusLock>
    </section>
  );
}
