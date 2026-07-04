import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { bilListings } from "@/lib/mock/bil";

export const metadata = { title: "Bil — FINN.no" };

export default function BilPage() {
  return (
    <main className="mx-auto max-w-6xl px-4">
      <div className="py-6">
        <h1 className="mb-4 text-2xl font-bold">Biler til salgs</h1>
        <div className="max-w-2xl">
          <SearchBar placeholder="Søk i Bil" />
        </div>
        <p className="mt-3 text-sm text-finn-gray-2">
          {bilListings.length} treff
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {bilListings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </main>
  );
}
