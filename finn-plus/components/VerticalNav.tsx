import Link from "next/link";

const ITEMS: { label: string; href: string; emoji: string; active?: boolean }[] = [
  { label: "Torget", href: "#", emoji: "🛍️" },
  { label: "Eiendom", href: "/eiendom", emoji: "🏠", active: true },
  { label: "Bil", href: "/bil", emoji: "🚗", active: true },
  { label: "Reise", href: "#", emoji: "✈️" },
  { label: "Båt", href: "#", emoji: "⛵" },
  { label: "MC", href: "#", emoji: "🏍️" },
  { label: "Jobb", href: "#", emoji: "💼" },
  { label: "Elektronikk", href: "#", emoji: "📱" },
];

export default function VerticalNav() {
  return (
    <nav className="mx-auto grid max-w-3xl grid-cols-4 gap-3 sm:grid-cols-8">
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center gap-1.5 rounded-lg p-2 text-center ${
            item.active ? "" : "opacity-40 pointer-events-none"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-finn-ice-2 text-2xl transition-transform hover:scale-105">
            {item.emoji}
          </span>
          <span className="text-xs font-medium text-finn-gray">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
