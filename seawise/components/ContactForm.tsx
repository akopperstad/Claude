"use client";

import { useState } from "react";

const FLEET = ["1–5 vessels", "6–20 vessels", "20+ vessels", "Advisory / other"];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-sea-signal/30 bg-sea-signal/5 p-10">
        <p className="font-display text-2xl text-sea-foam">Thanks — we’ll be in touch.</p>
        <p className="mt-3 text-sea-mist">
          A member of the Seawise team will reach out shortly to set up your
          walkthrough.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-sea-steel/30 bg-sea-deep/60 px-4 py-3 text-sea-foam placeholder:text-sea-mist/50 outline-none transition-colors focus:border-sea-signal";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className={field} />
        <input name="email" type="email" required placeholder="Work email" className={field} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="company" placeholder="Company" className={field} />
        <input name="role" placeholder="Role" className={field} />
      </div>
      <select name="fleet" defaultValue="" required className={field} aria-label="Fleet size">
        <option value="" disabled>
          Fleet size
        </option>
        {FLEET.map((f) => (
          <option key={f} value={f} className="bg-sea-deep">
            {f}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        rows={4}
        placeholder="What would you like to see? (optional)"
        className={field}
      />
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-sea-signal px-7 py-3.5 font-medium text-sea-abyss transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Book a walkthrough"}
          <span>→</span>
        </button>
        {state === "error" && (
          <span className="text-sm text-red-400">
            Something went wrong — email us at hello@seawise.no.
          </span>
        )}
      </div>
    </form>
  );
}
