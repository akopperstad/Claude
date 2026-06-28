import type { CaptureResult } from "./types";

export interface SectorDef {
  id: string;
  label: string;
  keywords: string[];
  styles: string[]; // ordered preferred style preset ids (see styles.ts)
}

// Sectors with detection keywords and the 3 style presets that suit them best.
export const SECTORS: SectorDef[] = [
  {
    id: "saas",
    label: "SaaS / Software",
    keywords: ["sign up", "free trial", "api", "dashboard", "integrations", "platform", "cloud", "developers", "documentation", "pricing", "get started", "saas"],
    styles: ["vibrant-saas", "modern-dark", "clean-light"],
  },
  {
    id: "ecommerce",
    label: "E-commerce / Retail",
    keywords: ["add to cart", "checkout", "shop", "buy now", "free shipping", "cart", "products", "sale", "collection", "in stock", "shopping"],
    styles: ["clean-light", "bold-editorial", "modern-dark"],
  },
  {
    id: "restaurant",
    label: "Restaurant / Food",
    keywords: ["menu", "reservation", "order online", "cuisine", "dishes", "dinner", "lunch", "chef", "catering", "book a table", "restaurant"],
    styles: ["warm-appetite", "minimal-luxury", "bold-editorial"],
  },
  {
    id: "health",
    label: "Health / Medical",
    keywords: ["patients", "appointment", "doctor", "clinic", "treatment", "medical", "wellness", "symptoms", "care", "therapy", "health"],
    styles: ["nature-calm", "clean-light", "trust-corporate"],
  },
  {
    id: "finance",
    label: "Finance / Fintech",
    keywords: ["investment", "banking", "loans", "insurance", "portfolio", "wealth", "mortgage", "trading", "financial", "payments", "finance"],
    styles: ["trust-corporate", "clean-light", "modern-dark"],
  },
  {
    id: "realestate",
    label: "Real Estate",
    keywords: ["properties", "listings", "for sale", "for rent", "square feet", "bedrooms", "realtor", "homes", "real estate", "open house"],
    styles: ["minimal-luxury", "clean-light", "trust-corporate"],
  },
  {
    id: "agency",
    label: "Agency / Creative",
    keywords: ["our work", "case studies", "clients", "branding", "design studio", "creative", "we craft", "portfolio", "agency", "campaigns"],
    styles: ["bold-editorial", "modern-dark", "minimal-luxury"],
  },
  {
    id: "education",
    label: "Education",
    keywords: ["courses", "students", "enroll", "curriculum", "tuition", "classes", "academy", "university", "lessons", "learn", "education"],
    styles: ["clean-light", "vibrant-saas", "nature-calm"],
  },
  {
    id: "legal",
    label: "Legal",
    keywords: ["attorney", "law firm", "lawyer", "practice areas", "litigation", "counsel", "legal", "consultation", "case"],
    styles: ["trust-corporate", "minimal-luxury", "clean-light"],
  },
  {
    id: "fitness",
    label: "Fitness / Gym",
    keywords: ["gym", "workout", "membership", "trainer", "fitness", "train", "coaching", "classes", "exercise"],
    styles: ["bold-editorial", "modern-dark", "vibrant-saas"],
  },
  {
    id: "nonprofit",
    label: "Nonprofit",
    keywords: ["donate", "volunteer", "mission", "charity", "fundraising", "nonprofit", "cause", "give", "impact"],
    styles: ["nature-calm", "clean-light", "bold-editorial"],
  },
  {
    id: "portfolio",
    label: "Personal / Portfolio",
    keywords: ["about me", "my work", "resume", "i'm a", "projects", "get in touch", "freelance", "portfolio"],
    styles: ["minimal-luxury", "modern-dark", "bold-editorial"],
  },
  {
    id: "hospitality",
    label: "Hospitality / Travel",
    keywords: ["book now", "rooms", "hotel", "stay", "destinations", "travel", "tour", "vacation", "resort", "guests"],
    styles: ["minimal-luxury", "warm-appetite", "clean-light"],
  },
  {
    id: "general",
    label: "General / Other",
    keywords: [],
    styles: ["clean-light", "modern-dark", "bold-editorial"],
  },
];

export function sectorById(id: string): SectorDef {
  return SECTORS.find((s) => s.id === id) || SECTORS[SECTORS.length - 1];
}

export function sectorList(): { id: string; label: string }[] {
  return SECTORS.map((s) => ({ id: s.id, label: s.label }));
}

// Heuristically classify a site's sector from its text/title/headings.
export function detectSector(pages: CaptureResult[]): {
  id: string;
  label: string;
  confidence: number;
} {
  const hay = pages
    .map((p) => `${p.title} ${p.headings.map((h) => h.text).join(" ")} ${p.contentText}`)
    .join(" ")
    .toLowerCase();

  let best = SECTORS[SECTORS.length - 1]; // general
  let bestScore = 0;
  let total = 0;
  for (const s of SECTORS) {
    let score = 0;
    for (const kw of s.keywords) {
      // Count occurrences (capped) so a single repeated word can't dominate.
      const matches = hay.split(kw).length - 1;
      if (matches > 0) score += Math.min(matches, 3) * (kw.includes(" ") ? 2 : 1);
    }
    total += score;
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }

  const confidence = total > 0 ? Math.min(1, bestScore / Math.max(total, 4)) : 0;
  return { id: best.id, label: best.label, confidence };
}
