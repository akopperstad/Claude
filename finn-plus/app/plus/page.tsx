"use client";

import Link from "next/link";
import { usePlus } from "@/components/PlusContext";
import PlusBadge from "@/components/PlusBadge";

const PERKS = [
  {
    icon: "⏰",
    title: "Tidlig tilgang",
    text: "Se nye bolig- og bilannonser 24 timer før alle andre. Vær først i køen på drømmeobjektet.",
  },
  {
    icon: "📊",
    title: "Prisinnsikt",
    text: "Se om annonsen er priset over eller under markedet, med prishistorikk og verdivurdering.",
  },
  {
    icon: "🔔",
    title: "Lynvarsler",
    text: "Øyeblikkelige varsler på lagrede søk — før annonsen når resten av markedet.",
  },
  {
    icon: "🚀",
    title: "Selgerboost",
    text: "Selger du selv? Prioritert plassering og annonsestatistikk er inkludert i medlemskapet.",
  },
];

export default function PlusPage() {
  const { isPlus, setIsPlus } = usePlus();

  return (
    <main>
      <section className="bg-gradient-to-br from-finn-plus to-[#4a0b8a] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <PlusBadge size="lg" />
          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Få forspranget på mulighetenes marked
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Ett medlemskap. Tidlig tilgang, prisinnsikt og boost — på tvers av
            Eiendom og Bil.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {isPlus ? (
              <>
                <span className="rounded-full bg-white/15 px-5 py-2.5 font-medium">
                  ✓ Du er FINN+ medlem
                </span>
                <button
                  onClick={() => setIsPlus(false)}
                  className="text-sm text-white/70 underline hover:text-white"
                >
                  Avslutt medlemskap
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsPlus(true)}
                  className="rounded-lg bg-white px-8 py-3.5 text-lg font-bold text-finn-plus shadow-card-hover hover:bg-finn-plus-light"
                >
                  Bli medlem — 99 kr/mnd
                </button>
                <span className="text-sm text-white/70">
                  Ingen binding. Avslutt når du vil.
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold">
          Dette får du som medlem
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-finn-border bg-white p-6 shadow-card"
            >
              <span className="text-3xl">{p.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-finn-gray">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-finn-ice p-6 text-center">
          <p className="text-sm text-finn-gray">
            Prøv selv: bruk demobryteren nede til venstre for å veksle mellom
            fri bruker og medlem, og se forskjellen på{" "}
            <Link href="/eiendom" className="font-medium text-finn-blue underline">
              boligsøket
            </Link>{" "}
            og{" "}
            <Link href="/bil" className="font-medium text-finn-blue underline">
              bilsøket
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
