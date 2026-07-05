import Reveal from "@/components/Reveal";

type Shot = { file: string; label: string };

const SHOTS: Shot[] = [
  { file: "intelligence", label: "Intelligence" },
  { file: "fleet-ais", label: "Fleet — AIS tracking" },
  { file: "voyages", label: "Voyages" },
  { file: "maintenance", label: "Maintenance" },
  { file: "crew", label: "Crew" },
  { file: "safety", label: "Safety & Quality" },
  { file: "emissions", label: "Emissions / CII" },
  { file: "documents", label: "Documents" },
  { file: "procurement", label: "Procurement" },
  { file: "chartering", label: "Chartering" },
  { file: "sales", label: "Sales" },
  { file: "finance", label: "Finance" },
  { file: "fishery", label: "Fishery" },
  { file: "medical", label: "Medical & Chemical" },
];

/** Window frame with graceful fallback: if the PNG is missing, the caption shows. */
function Frame({
  file,
  label,
  className = "",
}: {
  file: string;
  label: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-sea-steel/25 bg-sea-deep/80 shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-sea-steel/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/30" />
        <span className="ml-3 font-mono text-[0.7rem] tracking-widest text-sea-mist">
          NAUTECH · {label.toUpperCase()}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-sea-mid/40">
        {/* fallback caption sits behind */}
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-sea-mist/40">
          {label}
        </span>
        {/* real screenshot covers it when present */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: `url(/product/${file}.png)` }}
        />
      </div>
    </figure>
  );
}

export default function ProductShowcase() {
  // duplicate list for a seamless marquee loop
  const strip = [...SHOTS, ...SHOTS];

  return (
    <section id="product" className="border-t border-sea-steel/15 py-[16vh]">
      <div className="shell">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-sea-mist">03 — In action</p>
          <h2 className="mt-6 max-w-4xl font-display text-display-md">
            Every corner of the operation, in one place.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sea-mist">
            Real screens from Nautech — from the command center to compliance,
            crew, maintenance and finance. One system, built for the bridge.
          </p>
        </Reveal>

        {/* featured shot */}
        <Reveal className="mt-14">
          <Frame file="command-center" label="Command Center" className="mx-auto max-w-5xl" />
        </Reveal>
      </div>

      {/* full-bleed marquee of module screens */}
      <Reveal className="mt-16">
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max gap-6 pl-6 animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
            {strip.map((s, i) => (
              <Frame
                key={`${s.file}-${i}`}
                file={s.file}
                label={s.label}
                className="w-[clamp(280px,34vw,460px)] shrink-0"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
