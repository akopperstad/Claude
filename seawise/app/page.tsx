import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="relative overflow-clip">
      {/* subtle depth gradient — placeholder for the WebGL ocean in bucket 2 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 0%, #0A1826 0%, #060C14 42%, #04070C 100%)",
        }}
      />

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

      {/* Motion-proof section — placeholder content, real sections land per bucket. */}
      <section id="problem" className="shell py-[16vh]">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-sea-mist">01 — Foundation</p>
          <h2 className="mt-6 max-w-3xl font-display text-display-md">
            The motion backbone is live.
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-sea-steel/25 bg-sea-steel/25 md:grid-cols-3">
          {[
            {
              k: "Smooth scroll",
              d: "Lenis drives an eased scroll position that every animation reads from.",
            },
            {
              k: "Scroll choreography",
              d: "GSAP ScrollTrigger reveals and pins content as you move down the page.",
            },
            {
              k: "WebGL-ready",
              d: "React Three Fiber is wired for a living hero — the next bucket.",
            },
          ].map((c) => (
            <div key={c.k} className="reveal bg-sea-deep p-8">
              <h3 className="font-display text-2xl">{c.k}</h3>
              <p className="mt-3 text-sea-mist">{c.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* placeholder sections so the scroll has length to demonstrate motion */}
      <section id="platform" className="shell border-t border-sea-steel/15 py-[16vh]">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-sea-mist">02 — Platform</p>
          <h2 className="mt-6 max-w-3xl font-display text-display-md text-sea-mist/50">
            Placeholder. Real content lands bucket by bucket.
          </h2>
        </Reveal>
      </section>

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
