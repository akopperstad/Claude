import Link from "next/link";
import PlusBadge from "@/components/PlusBadge";

export const metadata = { title: "FINN+ — forretningscase" };

const FEATURES = [
  {
    name: "Prisinnsikt",
    wtp: "Kjøpere av bolig og bil tar livets største kjøpsbeslutninger. Trygghet på pris er verdt langt mer enn 99 kr.",
    demo: "/listing/e1",
  },
  {
    name: "Tidlig tilgang",
    wtp: "I pressede markeder vinner den som ser annonsen først. 24 timers forsprang er målbart verdifullt.",
    demo: "/eiendom",
  },
  {
    name: "Lynvarsler",
    wtp: "Umiddelbare varsler på lagrede søk forsterker forspranget — grunnlag for daglig vane.",
    demo: "/plus",
  },
  {
    name: "Selgerboost",
    wtp: "Selgere betaler allerede for synlighet i dag. Inkludert i medlemskapet gjør + attraktivt for begge sider.",
    demo: "/selger",
  },
];

const SCENARIOS = [
  { label: "Forsiktig", conv: "0,5 %", members: "12 500", arr: "14,9 mill. kr" },
  { label: "Basis", conv: "1,5 %", members: "37 500", arr: "44,6 mill. kr" },
  { label: "Optimistisk", conv: "3,0 %", members: "75 000", arr: "89,1 mill. kr" },
];

export default function PitchPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="border-b border-finn-border pb-6">
        <div className="flex items-center gap-3">
          <PlusBadge size="lg" />
          <span className="rounded bg-finn-yellow-light px-2 py-1 text-xs font-bold text-finn-yellow">
            KONFIDENSIELT UTKAST
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold">
          FINN+: abonnementsinntekter oppå Norges største markedsplass
        </h1>
        <p className="mt-2 text-finn-gray">
          Forretningscase på én side. Alle funksjoner er klikkbare i prototypen
          — bruk demobryteren nede til venstre.
        </p>
      </header>

      <Section title="Problemet">
        <p>
          FINN tjener i dag på annonseinnrykk og displayannonser — brukerne
          betaler ingenting, og inntekten per bruker er flat. Samtidig presser
          globale aktører (Facebook Marketplace, Amazon) marginene i
          rubrikkmarkedet. FINN sitter på Norges sterkeste forbruker-vane og
          unike pris- og markedsdata, men monetiserer ikke medlemskapsviljen
          som Netflix, Spotify og VG+ har bevist at nordmenn har.
        </p>
      </Section>

      <Section title="Løsningen">
        <p>
          <strong>FINN+ — ett medlemskap, 99 kr/mnd, ingen binding.</strong>{" "}
          Kjøperfordeler (prisinnsikt, tidlig tilgang, lynvarsler) og
          selgerfordeler (boost, statistikk) på tvers av Eiendom og Bil — de to
          vertikalene med høyest transaksjonsverdi og sterkest betalingsvilje.
          Utvides senere til Torget, Båt og MC.
        </p>
      </Section>

      <Section title="Funksjoner → betalingsvilje">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-finn-border text-left text-finn-gray-2">
                <th className="py-2 pr-4 font-medium">Funksjon</th>
                <th className="py-2 pr-4 font-medium">Hvorfor folk betaler</th>
                <th className="py-2 font-medium">Demo</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f) => (
                <tr key={f.name} className="border-b border-finn-border align-top">
                  <td className="py-3 pr-4 font-bold">{f.name}</td>
                  <td className="py-3 pr-4 text-finn-gray">{f.wtp}</td>
                  <td className="py-3">
                    <Link href={f.demo} className="font-medium text-finn-blue hover:underline">
                      Se →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Inntektspotensial">
        <p className="mb-3">
          FINN har ~2,5 millioner aktive brukere månedlig
          <Sup>1</Sup>. Ved 99 kr/mnd gir selv forsiktig konvertering
          betydelig ny årlig inntekt (ARR):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-finn-border text-left text-finn-gray-2">
                <th className="py-2 pr-4 font-medium">Scenario</th>
                <th className="py-2 pr-4 font-medium">Konvertering</th>
                <th className="py-2 pr-4 font-medium">Medlemmer</th>
                <th className="py-2 font-medium">ARR</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => (
                <tr key={s.label} className="border-b border-finn-border">
                  <td className="py-2.5 pr-4 font-bold">{s.label}</td>
                  <td className="py-2.5 pr-4">{s.conv}</td>
                  <td className="py-2.5 pr-4">{s.members}</td>
                  <td className="py-2.5 font-bold">{s.arr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-finn-gray-2">
          <Sup>1</Sup> Illustrative antakelser for konseptdemonstrasjon; kalibreres
          mot FINNs faktiske trafikktall. Årspris (990 kr, 2 mnd gratis) og
          selgerboost à la carte for ikke-medlemmer kommer i tillegg.
        </p>
      </Section>

      <Section title="Hvorfor dette styrker FINN">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>ARPU-løft uten kannibalisering:</strong> medlemskapet
            selger innsikt og forsprang — annonseinntektene beholdes.
          </li>
          <li>
            <strong>Retensjon og vane:</strong> betalende medlemmer åpner appen
            oftere; lynvarsler gjør FINN til en daglig flate.
          </li>
          <li>
            <strong>Datamoat:</strong> prisinnsikt bygger på FINNs egne
            historiske data — umulig å kopiere for globale konkurrenter.
          </li>
          <li>
            <strong>Bevist modell:</strong> nordmenn betaler allerede for
            VG+, Netflix og Spotify. Rubrikk-abonnement er neste steg.
          </li>
        </ul>
      </Section>

      <Section title="Forslaget">
        <p>
          Vi ønsker å realisere FINN+ sammen med FINN — enten som et pilotteam
          innenfor organisasjonen, eller ved at FINN overtar konsept og team.
          Prototypen dere ser her ble bygget for å vise at verdien kan
          demonstreres, ikke bare beskrives.
        </p>
        <div className="mt-5 flex gap-3">
          <Link
            href="/"
            className="rounded-lg bg-finn-blue px-5 py-2.5 font-medium text-white hover:bg-finn-blue-hover"
          >
            Start demoen
          </Link>
          <Link
            href="/plus"
            className="rounded-lg border border-finn-border px-5 py-2.5 font-medium text-finn-blue hover:bg-finn-ice"
          >
            Se medlemssiden
          </Link>
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <div className="text-[15px] leading-relaxed text-finn-ink">{children}</div>
    </section>
  );
}

function Sup({ children }: { children: React.ReactNode }) {
  return <sup className="text-finn-gray-2">{children}</sup>;
}
