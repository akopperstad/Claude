import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sea-abyss px-6 text-center">
      <p className="font-mono text-eyebrow uppercase text-sea-signal">Position unknown</p>
      <h1 className="mt-6 font-display text-display-lg">Lost at sea.</h1>
      <p className="mt-6 max-w-md text-sea-mist">
        This page doesn’t exist — or drifted off the chart.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-sea-signal px-7 py-3.5 font-medium text-sea-abyss transition-transform duration-300 hover:-translate-y-0.5"
      >
        Back to the surface →
      </Link>
    </main>
  );
}
