import { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/listings";
import { getComparables, getPriceHistory } from "@/lib/priceHistory";
import PlusLock from "./PlusLock";
import PlusBadge from "./PlusBadge";
import PriceHistoryChart from "./PriceHistoryChart";

/** Plus-only price intelligence on the listing page: valuation vs asking,
 *  12-month market trend, and recent comparable sales. */
export default function PriceInsight({ listing }: { listing: Listing }) {
  const diff = listing.price - listing.marketValue;
  const pct = Math.round((diff / listing.marketValue) * 100);
  const over = pct > 2;
  const under = pct < -2;

  const history = getPriceHistory(listing);
  const comparables = getComparables(listing);
  const yearAgo = history[0].value;
  const trendPct = Math.round(((listing.marketValue - yearAgo) / yearAgo) * 100);

  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-lg font-bold">Prisinnsikt</h2>
        <PlusBadge size="sm" />
      </div>
      <PlusLock teaser="Se verdivurdering, prisutvikling og sammenlignbare salg — med FINN+">
        <div className="space-y-4 rounded-lg border border-finn-border bg-white p-5">
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

          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="text-sm font-bold">Prisutvikling siste 12 måneder</h3>
              <span
                className={`text-sm font-bold ${
                  trendPct >= 0 ? "text-finn-green" : "text-finn-red"
                }`}
              >
                {trendPct >= 0 ? "+" : ""}
                {trendPct} % siste år
              </span>
            </div>
            <PriceHistoryChart points={history} askingPrice={listing.price} />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold">
              {listing.vertical === "eiendom"
                ? "Nylig solgt i området"
                : "Nylig solgte tilsvarende biler"}
            </h3>
            <ul className="divide-y divide-finn-border rounded-lg border border-finn-border">
              {comparables.map((c) => (
                <li key={c.label + c.price} className="flex items-center justify-between gap-3 p-3 text-sm">
                  <div>
                    <p className="font-medium">{c.label}</p>
                    <p className="text-xs text-finn-gray-2">
                      {c.detail} · solgt for {c.soldDaysAgo} dager siden
                    </p>
                  </div>
                  <span className="font-bold">{formatPrice(c.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          {listing.vertical === "eiendom" && (
            <p className="text-xs text-finn-gray-2">
              Kvadratmeterpris: {formatPrice(Math.round(listing.price / listing.sqm))}/m² —
              snitt i området: {formatPrice(Math.round(listing.marketValue / listing.sqm))}/m²
            </p>
          )}
        </div>
      </PlusLock>
    </section>
  );
}
