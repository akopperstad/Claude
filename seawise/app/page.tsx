import Reveal from "@/components/Reveal";
import HeroBackground from "@/components/HeroBackground";
import ProductShowcase from "@/components/ProductShowcase";
import ContactForm from "@/components/ContactForm";
import NavBar from "@/components/NavBar";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";

/** Chart-style section header: number · rule line · label · coordinates. */
function SectionHead({
  no,
  label,
  coord,
  offset = false,
  children,
}: {
  no: string;
  label: string;
  coord: string;
  offset?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal className={offset ? "md:ml-[16%]" : ""}>
      <div className="flex items-baseline gap-5 font-mono text-eyebrow uppercase">
        <span className="text-sea-signal">{no}</span>
        <span className="h-px flex-1 self-center bg-sea-steel/25" />
        <span className="text-sea-mist">{label}</span>
        <span className="hidden text-sea-mist/40 sm:inline">{coord}</span>
      </div>
      <h2 className="mt-10 max-w-4xl font-display text-display-md">{children}</h2>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-clip">
      <Intro />
      <Cursor />
      {/* Living WebGL depth field + cinematic plate behind everything */}
      <HeroBackground />
      <NavBar />

      {/* Hero */}
      <section id="top" className="relative flex min-h-[100svh] items-end">
        <div className="shell w-full pb-[10vh] pt-40">
          <Reveal stagger className="max-w-5xl">
            <p className="reveal font-mono text-eyebrow uppercase text-sea-signal">
              The Fleet OS · Built in Norway
            </p>
            <h1 className="reveal mt-8 font-display text-display-xl">
              Maritime operations,
              <br />
              <span className="italic text-sea-signal">finally</span> built for
              this century.
            </h1>
            <div className="reveal mt-10 flex flex-wrap items-end justify-between gap-8">
              <p className="max-w-xl text-lg leading-relaxed text-sea-mist">
                Seawise is the modern operating system for fleet operators — one
                fast, humane platform to run your ships. Built by maritime
                operators.
              </p>
              <div className="flex flex-wrap items-center gap-6">
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
            </div>
          </Reveal>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-sea-mist/70">
            Dive
          </span>
          <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-sea-signal to-transparent" />
        </div>
      </section>

      {/* The problem — editorial ledger, offset right. */}
      <section id="problem" className="shell py-[18vh]">
        <SectionHead no="01" label="The problem" coord="62°28′N · 006°09′E" offset>
          The software running the world’s fleets is stuck in the last century.
        </SectionHead>

        <Reveal className="md:ml-[16%]">
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            Operators still stitch their day together across dated systems,
            disconnected spreadsheets and paper trails. The tools are slow,
            siloed and painful — so good people spend their hours fighting the
            software instead of running the ship.
          </p>
        </Reveal>

        <Reveal stagger className="mt-20">
          {[
            {
              n: "01",
              k: "Siloed",
              d: "Operations, compliance, crew and maintenance each live in their own disconnected tool. Nothing talks.",
            },
            {
              n: "02",
              k: "Slow",
              d: "Legacy interfaces built decades ago. Every task takes more clicks, more waiting, more workarounds.",
            },
            {
              n: "03",
              k: "Opaque",
              d: "No single view of the fleet. Answers mean chasing people and re-keying numbers between systems.",
            },
          ].map((row) => (
            <div
              key={row.k}
              className="reveal grid items-baseline gap-4 border-t border-sea-steel/20 py-10 md:grid-cols-[6rem_1fr_1.4fr] md:gap-10"
            >
              <span className="font-mono text-sm text-sea-signal">/{row.n}</span>
              <h3 className="font-display text-3xl md:text-4xl">{row.k}</h3>
              <p className="max-w-xl text-lg text-sea-mist">{row.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* The platform — Nautech. */}
      <section id="platform" className="shell py-[18vh]">
        <SectionHead no="02" label="The platform" coord="DEPTH −0850 M">
          One system for the whole operation.
        </SectionHead>

        <Reveal>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            <span className="text-sea-foam">Nautech</span> is the Seawise fleet
            OS — operations, compliance, crew, maintenance and intelligence in
            one maritime ERP. It starts with the Safety Management System and
            grows into the entire operation.
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-2 gap-x-10 md:grid-cols-3 lg:grid-cols-4">
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
          ].map((m, i) => (
            <div
              key={m}
              className="reveal flex items-baseline gap-3 border-t border-sea-steel/15 py-4 text-sea-foam"
            >
              <span className="font-mono text-[0.65rem] text-sea-mist/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              {m}
            </div>
          ))}
        </Reveal>
      </section>

      {/* Real product showcase — featured shot + module marquee. */}
      <ProductShowcase />

      {/* Why Seawise — asymmetric split. */}
      <section id="why" className="shell py-[18vh]">
        <SectionHead no="04" label="Why Seawise" coord="DEPTH −2400 M" offset>
          Built by maritime operators.
        </SectionHead>

        <Reveal className="md:ml-[16%]">
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            Seawise is built by people who understand the operational reality of
            running a fleet — not software people guessing at it. That
            competence is in every screen, and it’s something we also bring
            directly to clients.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-[1.2fr_1fr]">
          <Reveal className="border-l-2 border-sea-signal/60 pl-8">
            <p className="font-mono text-eyebrow uppercase text-sea-signal">Nautech</p>
            <h3 className="mt-5 font-display text-3xl md:text-4xl">The fleet OS</h3>
            <p className="mt-4 max-w-md text-lg text-sea-mist">
              One maritime ERP for operations, compliance, crew, maintenance and
              intelligence — modern software that makes it easy to do a good job.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="border-l border-sea-steel/40 pl-8 md:mt-24">
            <p className="font-mono text-eyebrow uppercase text-sea-mist">Advisory</p>
            <h3 className="mt-5 font-display text-3xl md:text-4xl">Real-world competence</h3>
            <p className="mt-4 max-w-md text-lg text-sea-mist">
              Operational maritime expertise for evaluations, reports and reviews
              — the hands-on knowledge the legal and advisory world often lacks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact — the one action. */}
      <section id="contact" className="shell py-[18vh]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex items-baseline gap-5 font-mono text-eyebrow uppercase">
              <span className="text-sea-signal">05</span>
              <span className="h-px w-16 self-center bg-sea-steel/25" />
              <span className="text-sea-mist">Get in touch</span>
            </div>
            <h2 className="mt-10 font-display text-display-md">
              See Seawise on
              <br />
              your fleet.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-sea-mist">
              Book a walkthrough and we’ll show you Nautech against your real
              operation. No slides — the actual system.
            </p>
            <p className="mt-10 font-mono text-sm text-sea-mist">
              Seawise AS · Norway · Founded 2025
              <br />
              hello@seawise.no
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Footer — designed, not appended. */}
      <footer className="border-t border-sea-steel/15 pt-20">
        <div className="shell">
          <Reveal>
            <p className="font-display text-[clamp(4rem,15vw,13rem)] leading-none tracking-tight">
              Seawise<span className="text-sea-signal">.</span>
            </p>
          </Reveal>
          <div className="mt-16 flex flex-col justify-between gap-10 pb-10 md:flex-row md:items-end">
            <div className="font-mono text-sm leading-relaxed text-sea-mist">
              <p>62°28′N · 006°09′E</p>
              <p className="mt-1">Seawise AS · Built in Norway</p>
              <p className="mt-1">hello@seawise.no</p>
            </div>
            <div className="flex gap-10 text-sm text-sea-mist">
              <a href="#problem" className="transition-colors hover:text-sea-foam">The problem</a>
              <a href="#platform" className="transition-colors hover:text-sea-foam">Platform</a>
              <a href="#product" className="transition-colors hover:text-sea-foam">In action</a>
              <a href="#contact" className="transition-colors hover:text-sea-foam">Contact</a>
            </div>
            <span className="text-sm text-sea-mist/60">© 2026 Seawise AS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
