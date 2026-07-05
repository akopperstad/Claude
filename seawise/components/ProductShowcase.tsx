import Reveal from "@/components/Reveal";
import ProductExplorer from "@/components/ProductExplorer";

export default function ProductShowcase() {
  return (
    <section id="product" className="py-[18vh]">
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline gap-5 font-mono text-eyebrow uppercase">
            <span className="text-sea-signal">03</span>
            <span className="h-px flex-1 self-center bg-sea-steel/25" />
            <span className="text-sea-mist">In action</span>
            <span className="hidden text-sea-mist/40 sm:inline">DEPTH −1600 M</span>
          </div>
          <h2 className="mt-10 max-w-4xl font-display text-display-md">
            Every corner of the operation, in one place.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            Real screens from Nautech — hover the modules and walk the whole
            system. One platform, built for the bridge.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <ProductExplorer />
        </Reveal>
      </div>
    </section>
  );
}
