import { Listing } from "./types";

/** Deterministic PRNG so prerendered HTML matches client hydration. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return h;
}

export interface PricePoint {
  month: string; // "aug. 25"
  value: number;
}

const MONTHS = [
  "jan.", "feb.", "mars", "april", "mai", "juni",
  "juli", "aug.", "sep.", "okt.", "nov.", "des.",
];

/** 12 months of estimated market value, ending at the listing's marketValue. */
export function getPriceHistory(listing: Listing): PricePoint[] {
  const rand = mulberry32(seedFrom(listing.id));
  // Eiendom drifts up ~4-7%/yr; used cars depreciate ~8-14%/yr.
  const yearlyDrift = listing.vertical === "eiendom" ? 0.04 + rand() * 0.03 : -(0.08 + rand() * 0.06);
  const points: PricePoint[] = [];
  let value = listing.marketValue / (1 + yearlyDrift);
  const monthlyDrift = (listing.marketValue - value) / 11;
  // anchor: July 2026 = current month
  for (let i = 0; i < 12; i++) {
    const mIdx = (6 - 11 + i + 24) % 12;
    const year = mIdx > 6 ? "25" : "26";
    const noise = i === 11 ? 0 : (rand() - 0.5) * listing.marketValue * 0.015;
    points.push({
      month: `${MONTHS[mIdx]} ${year}`,
      value: Math.round((value + noise) / 1000) * 1000,
    });
    value += monthlyDrift;
  }
  points[11].value = listing.marketValue;
  return points;
}

export interface Comparable {
  label: string;
  detail: string;
  price: number;
  soldDaysAgo: number;
}

const STREETS = ["Bjørnsons gate", "Solhaugveien", "Fjellstien", "Havnegata", "Lindebakken"];

/** 3 recent comparable sales near the listing. */
export function getComparables(listing: Listing): Comparable[] {
  const rand = mulberry32(seedFrom(listing.id) ^ 0x5f3759df);
  const out: Comparable[] = [];
  for (let i = 0; i < 3; i++) {
    const priceFactor = 0.92 + rand() * 0.16;
    const price = Math.round((listing.marketValue * priceFactor) / 5000) * 5000;
    if (listing.vertical === "eiendom") {
      const sqm = Math.round(listing.sqm * (0.85 + rand() * 0.3));
      out.push({
        label: `${STREETS[Math.floor(rand() * STREETS.length)]} ${1 + Math.floor(rand() * 40)}`,
        detail: `${listing.type} · ${sqm} m²`,
        price,
        soldDaysAgo: 7 + Math.floor(rand() * 80),
      });
    } else {
      const year = listing.year - Math.floor(rand() * 2);
      const km = Math.round((listing.km * (0.8 + rand() * 0.5)) / 1000) * 1000;
      out.push({
        label: `${listing.make} ${listing.model} ${year}`,
        detail: `${km.toLocaleString("nb-NO")} km · ${listing.fuel}`,
        price,
        soldDaysAgo: 5 + Math.floor(rand() * 60),
      });
    }
  }
  return out.sort((a, b) => a.soldDaysAgo - b.soldDaysAgo);
}
