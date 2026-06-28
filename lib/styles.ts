export interface StyleTokens {
  id: string;
  name: string;
  vibe: string;
  mode: "dark" | "light";
  bg: string;
  bgAccent: string; // radial/gradient accent color
  surface: string;
  border: string;
  text: string;
  muted: string;
  brand: string;
  brand2: string;
  bodyFont: string;
  headingFont: string;
  radius: string;
  heroAlign: "center" | "left";
  uppercaseHeads: boolean;
}

const SANS = "Inter,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif";
const SERIF = "'Georgia','Times New Roman',serif";
const GROTESK = "'Helvetica Neue',Arial,system-ui,sans-serif";

export const STYLES: Record<string, StyleTokens> = {
  "modern-dark": {
    id: "modern-dark",
    name: "Modern Dark",
    vibe: "Sleek dark gradient, glowing gradient CTAs",
    mode: "dark",
    bg: "#0b1020",
    bgAccent: "#1b2750",
    surface: "#121a33",
    border: "#1e2a4d",
    text: "#e8ecf6",
    muted: "#9aa6c4",
    brand: "#6c8cff",
    brand2: "#9b6cff",
    bodyFont: SANS,
    headingFont: SANS,
    radius: "16px",
    heroAlign: "center",
    uppercaseHeads: false,
  },
  "clean-light": {
    id: "clean-light",
    name: "Clean Light",
    vibe: "Bright, airy, trustworthy blue accents",
    mode: "light",
    bg: "#ffffff",
    bgAccent: "#eef3ff",
    surface: "#f7f9fc",
    border: "#e4e9f2",
    text: "#0f1729",
    muted: "#5b6781",
    brand: "#2f6bff",
    brand2: "#4f46e5",
    bodyFont: SANS,
    headingFont: SANS,
    radius: "14px",
    heroAlign: "center",
    uppercaseHeads: false,
  },
  "vibrant-saas": {
    id: "vibrant-saas",
    name: "Vibrant SaaS",
    vibe: "Playful indigo/violet, rounded, energetic",
    mode: "light",
    bg: "#fbfbff",
    bgAccent: "#ece9ff",
    surface: "#ffffff",
    border: "#e7e3fb",
    text: "#161229",
    muted: "#6b6586",
    brand: "#7c3aed",
    brand2: "#ec4899",
    bodyFont: SANS,
    headingFont: SANS,
    radius: "20px",
    heroAlign: "center",
    uppercaseHeads: false,
  },
  "bold-editorial": {
    id: "bold-editorial",
    name: "Bold Editorial",
    vibe: "High-contrast, oversized type, warm accent",
    mode: "light",
    bg: "#faf7f2",
    bgAccent: "#ffe9d6",
    surface: "#ffffff",
    border: "#1a1a1a",
    text: "#141414",
    muted: "#5a544c",
    brand: "#ff5722",
    brand2: "#111111",
    bodyFont: GROTESK,
    headingFont: GROTESK,
    radius: "4px",
    heroAlign: "left",
    uppercaseHeads: true,
  },
  "minimal-luxury": {
    id: "minimal-luxury",
    name: "Minimal Luxury",
    vibe: "Refined serif headings, muted, lots of space",
    mode: "light",
    bg: "#fbfaf8",
    bgAccent: "#efece5",
    surface: "#ffffff",
    border: "#e6e2da",
    text: "#1c1b18",
    muted: "#7a7468",
    brand: "#9a7b4f",
    brand2: "#1c1b18",
    bodyFont: SANS,
    headingFont: SERIF,
    radius: "2px",
    heroAlign: "center",
    uppercaseHeads: false,
  },
  "trust-corporate": {
    id: "trust-corporate",
    name: "Trust Corporate",
    vibe: "Navy + white, dependable, structured",
    mode: "light",
    bg: "#ffffff",
    bgAccent: "#e9eef7",
    surface: "#f4f7fb",
    border: "#dde4ee",
    text: "#0a1f44",
    muted: "#4a5a78",
    brand: "#0a4fb4",
    brand2: "#0a1f44",
    bodyFont: SANS,
    headingFont: SANS,
    radius: "8px",
    heroAlign: "left",
    uppercaseHeads: false,
  },
  "warm-appetite": {
    id: "warm-appetite",
    name: "Warm Appetite",
    vibe: "Cream + red/amber, appetizing, inviting serif",
    mode: "light",
    bg: "#fff8f0",
    bgAccent: "#ffe3c7",
    surface: "#fffdfa",
    border: "#f0e2d2",
    text: "#2a1a12",
    muted: "#8a6f5c",
    brand: "#c1432b",
    brand2: "#e8902a",
    bodyFont: SANS,
    headingFont: SERIF,
    radius: "12px",
    heroAlign: "center",
    uppercaseHeads: false,
  },
  "nature-calm": {
    id: "nature-calm",
    name: "Nature Calm",
    vibe: "Soft greens, gentle, reassuring",
    mode: "light",
    bg: "#f7fbf7",
    bgAccent: "#dff0e4",
    surface: "#ffffff",
    border: "#dcebe0",
    text: "#15241a",
    muted: "#5a7064",
    brand: "#2e9e6b",
    brand2: "#1f7a73",
    bodyFont: SANS,
    headingFont: SANS,
    radius: "16px",
    heroAlign: "center",
    uppercaseHeads: false,
  },
};

export function getStyle(id: string): StyleTokens {
  return STYLES[id] || STYLES["clean-light"];
}
