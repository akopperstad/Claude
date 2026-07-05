import Reveal from "@/components/Reveal";
import HeroBackground from "@/components/HeroBackground";
import ProductShowcase from "@/components/ProductShowcase";

export default function Home() {
  return (
    <main className="relative overflow-clip">
      {/* Living WebGL depth field + cinematic plate behind everything */}
      <HeroBackground />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="shell flex items-center justify-between py-6">
          <a href="#top" className="flex items-center gap-2.5 font-display text-lg tracking-tight">
            <span className="h-2 w-2 rounded-full bg-sea-signal shadow-[0_0_12px] shadow-sea-signal" />
            Seawise
          </a>
          <div className="hidden items-center gap-9 text-sm text-sea-mist md:flex">
            <a href="#problem" className="transition-colors hover:text-sea-foam">The problem</a>
            <a href="#platform" className="transition-colors hover:text-sea-foam">Platform</a>
            <a href="#why" className="transition-colors hover:text-sea-foam">Why Seawise</a>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-sea-steel/60 px-5 py-2 text-sm text-sea-foam transition-colors hover:border-sea-signal hover:text-sea-signal"
          >
            Book a walkthrough
          </a>
        </nav>
      </header>

      {/* Hero — foundation placeholder: the type system on display. */}
      <section id="top" className="relative flex min-h-[100svh] items-end">
        <div className="shell w-full pb-[12vh] pt-40">
          <Reveal stagger className="max-w-4xl">
            <p className="reveal font-mono text-eyebrow uppercase text-sea-signal">
              The Fleet OS · v1
            </p>
            <h1 className="reveal mt-8 font-display text-display-xl">
              Maritime operations,
              <br />
              <span className="italic text-sea-signal">finally</span> built for
              this century.
            </h1>
            <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-sea-mist">
              Seawise is the modern operating system for fleet operators — one
              fast, humane platform to run your ships. Built by maritime
              operators.
            </p>
            <div className="reveal mt-12 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-sea-signal px-7 py-3.5 font-medium text-sea-abyss transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
              >
                Book a walkthrough
                <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">→</span>
              </a>
              <a href="#problem" className="text-sm text-sea-mist underline-offset-4 hover:text-sea-foam hover:underline">
                See why now
              </a>
            </div>
          </Reveal>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-sea-mist/70">
            Scroll
          </span>
          <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-sea-signal to-transparent" />
        </div>
      </section>

      {/* The problem — the old guard. */}
      <section id="problem" className="shell py-[16vh]">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-sea-mist">01 — The problem</p>
          <h2 className="mt-6 max-w-4xl font-display text-display-md">
            The software running the world’s fleets is stuck in the last
            century.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            Operators still stitch their day together across dated systems,
            disconnected spreadsheets and paper trails. The tools are slow,
            siloed and painful — so good people spend their hours fighting the
            software instead of running the ship.
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-sea-steel/25 bg-sea-steel/25 md:grid-cols-3">
          {[
            {
              k: "Siloed",
              d: "Operations, compliance, crew and maintenance each live in their own disconnected tool. Nothing talks.",
            },
            {
              k: "Slow",
              d: "Legacy interfaces built decades ago. Every task takes more clicks, more waiting, more workarounds.",
            },
            {
              k: "Opaque",
              d: "No single view of the fleet. Answers mean chasing people and re-keying numbers between systems.",
            },
          ].map((c) => (
            <div key={c.k} className="reveal bg-sea-deep p-8">
              <h3 className="font-display text-2xl">{c.k}</h3>
              <p className="mt-3 text-sea-mist">{c.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* The platform — Nautech. */}
      <section id="platform" className="shell border-t border-sea-steel/15 py-[16vh]">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-sea-mist">02 — The platform</p>
          <h2 className="mt-6 max-w-4xl font-display text-display-md">
            One system for the whole operation.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            <span className="text-sea-foam">Nautech</span> is the Seawise fleet
            OS — operations, compliance, crew, maintenance and intelligence in
            one maritime ERP. It starts with the Safety Management System and
            grows into the entire operation.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-2 gap-x-10 gap-y-5 md:grid-cols-3 lg:grid-cols-4">
          {[
            "Command Center",
            "Fleet",
            "Crew",
            "Maintenance",
            "Supply",
            "HSEQ",
            "Security",
            "Documents",
            "Finance",
            "Commercial",
            "Intelligence",
            "Compliance",
          ].map((m) => (
            <div key={m} className="reveal flex items-center gap-3 border-t border-sea-steel/15 pt-4 text-sea-foam">
              <span className="h-1 w-1 rounded-full bg-sea-signal" />
              {m}
            </div>
          ))}
        </Reveal>
      </section>

      {/* Real product showcase — featured shot + module marquee. */}
      <ProductShowcase />

      <footer id="contact" className="shell border-t border-sea-steel/15 py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="font-display text-display-md">Let’s talk.</p>
          <div className="text-sm text-sea-mist">
            <p>Seawise · Norway</p>
            <p className="mt-1">Contact plumbing arrives in a later bucket.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
