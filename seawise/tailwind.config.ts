import type { Config } from "tailwindcss";

/**
 * Seawise design tokens.
 * Palette: abyssal navy base, steel mids, one electric "signal" accent.
 * Type: editorial display serif + modern grotesque sans (wired via next/font).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sea: {
          abyss: "#04070C", // page base — near-black navy
          deep: "#0A1420", // primary surface
          mid: "#12202E", // raised surface
          steel: "#35506B", // borders / muted UI
          mist: "#8FA6B8", // secondary text
          foam: "#EAF1F5", // primary text / near-white
          signal: "#3DE0D0", // single electric accent
          "signal-dim": "#1FA79B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // fluid editorial scale
        "display-xl": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.28em" }],
      },
      maxWidth: {
        shell: "88rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
