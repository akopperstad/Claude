/**
 * Brand render of the Nautech product UI (a Seawise solution).
 * NOTE: this is a designed, on-brand representation using the real module
 * taxonomy — a placeholder for real dashboard captures, which are gated
 * behind the product login. Swap for real screenshots when available.
 */
const MODULES = [
  { label: "Command Center", active: true },
  { label: "Fleet" },
  { label: "Crew" },
  { label: "Maintenance" },
  { label: "HSEQ" },
  { label: "Documents" },
  { label: "Finance" },
];

const VESSELS = [
  { name: "MV Nordkapp", status: "At sea", pct: 92, tone: "ok" },
  { name: "MV Vestland", status: "In port", pct: 74, tone: "warn" },
  { name: "MV Havstrand", status: "At sea", pct: 88, tone: "ok" },
  { name: "MV Bjørnøy", status: "Docking", pct: 61, tone: "warn" },
];

export default function ProductMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-sea-steel/25 bg-sea-deep/80 shadow-2xl backdrop-blur-sm">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-sea-steel/20 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-sea-steel/30" />
        <span className="ml-3 font-mono text-xs tracking-widest text-sea-mist">
          NAUTECH — a Seawise solution
        </span>
      </div>

      <div className="grid grid-cols-[180px_1fr] max-md:grid-cols-1">
        {/* sidebar */}
        <aside className="border-r border-sea-steel/15 p-4 max-md:hidden">
          <nav className="space-y-1">
            {MODULES.map((m) => (
              <div
                key={m.label}
                className={`rounded-md px-3 py-2 text-sm ${
                  m.active
                    ? "bg-sea-signal/12 text-sea-signal"
                    : "text-sea-mist"
                }`}
              >
                {m.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* main */}
        <div className="p-6">
          <div className="flex items-baseline justify-between">
            <h4 className="font-display text-2xl text-sea-foam">Command Center</h4>
            <span className="font-mono text-xs text-sea-mist">Fleet · 4 vessels</span>
          </div>

          {/* KPI tiles */}
          <div className="mt-5 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
            {[
              { k: "Fleet uptime", v: "98.6%" },
              { k: "Open findings", v: "3" },
              { k: "Certs due 30d", v: "11" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-sea-steel/15 bg-sea-mid/50 p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-sea-mist">
                  {s.k}
                </p>
                <p className="mt-1 font-display text-2xl text-sea-foam">{s.v}</p>
              </div>
            ))}
          </div>

          {/* vessel list */}
          <div className="mt-4 rounded-lg border border-sea-steel/15">
            {VESSELS.map((v, i) => (
              <div
                key={v.name}
                className={`flex items-center gap-4 px-4 py-3 ${
                  i > 0 ? "border-t border-sea-steel/12" : ""
                }`}
              >
                <span className="text-sm text-sea-foam">{v.name}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-sea-mist">
                  {v.status}
                </span>
                <div className="ml-auto h-1.5 w-28 overflow-hidden rounded-full bg-sea-steel/25 max-sm:w-16">
                  <div
                    className={`h-full rounded-full ${
                      v.tone === "ok" ? "bg-sea-signal" : "bg-sea-signal-dim"
                    }`}
                    style={{ width: `${v.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
