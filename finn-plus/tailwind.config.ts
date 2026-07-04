import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        finn: {
          blue: "#0063fb",
          "blue-dark": "#0059f0",
          "blue-hover": "#244eb3",
          ice: "#f1f9ff",
          "ice-2": "#e1edfe",
          navy: "#0d203f",
          ink: "#26262d",
          gray: "#47474f",
          "gray-2": "#84848f",
          border: "#dedee3",
          bg: "#f6f6f6",
          plus: "#7311d1",
          "plus-light": "#f3e9fd",
          green: "#059e6f",
          "green-light": "#e3fcf3",
          red: "#d91f0a",
          "red-light": "#ffefef",
          yellow: "#b8860b",
          "yellow-light": "#fff5e8",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
