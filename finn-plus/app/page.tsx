import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import VerticalNav from "@/components/VerticalNav";
import ListingCard from "@/components/ListingCard";
import { eiendomListings } from "@/lib/mock/eiendom";
import { bilListings } from "@/lib/mock/bil";
import { sortNewestFirst } from "@/lib/earlyAccess";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="mx-auto max-w-2xl py-10">
        <SearchBar />
      </section>

      <VerticalNav />

      <Section title="Nytt i Eiendom" href="/eiendom">
        {sortNewestFirst(eiendomListings).slice(0, 4).map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </Section>

      <Section title="Nytt i Bil" href="/bil">
        {sortNewestFirst(bilListings).slice(0, 4).map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </Section>
    </main>
  );
}

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href={href} className="text-sm font-medium text-finn-blue hover:underline">
          Se alle
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>
    </section>
  );
}
