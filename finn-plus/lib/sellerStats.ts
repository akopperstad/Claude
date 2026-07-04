import { Listing } from "./types";

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

export interface DayViews {
  day: string;
  views: number;
  projected?: boolean;
}

export interface SellerStats {
  /** Last 7 days of actual views. */
  history: DayViews[];
  /** Next 3 days projected with boost. */
  boostedProjection: DayViews[];
  favorites: number;
  searchPosition: number;
  boostedPosition: number;
  totalViews: number;
  /** Percent uplift in daily views a boost gives. */
  boostUpliftPct: number;
}

const DAYS = ["man", "tir", "ons", "tor", "fre", "lør", "søn"];

export const BOOST_MULTIPLIER = 2.8;

export function getSellerStats(listing: Listing): SellerStats {
  const rand = mulberry32(seedFrom(listing.id) ^ 0x2545f491);
  const base = 25 + Math.floor(rand() * 60);
  const history: DayViews[] = DAYS.map((day) => ({
    day,
    views: Math.max(4, Math.round(base * (0.55 + rand() * 0.9))),
  }));
  const avg = history.reduce((s, d) => s + d.views, 0) / 7;
  const boostedProjection: DayViews[] = ["man", "tir", "ons"].map((day) => ({
    day: `${day}*`,
    views: Math.round(avg * BOOST_MULTIPLIER * (0.9 + rand() * 0.25)),
    projected: true,
  }));
  const searchPosition = 9 + Math.floor(rand() * 9);
  return {
    history,
    boostedProjection,
    favorites: 2 + Math.floor(rand() * 14),
    searchPosition,
    boostedPosition: 1 + Math.floor(rand() * 2),
    totalViews: history.reduce((s, d) => s + d.views, 0),
    boostUpliftPct: Math.round((BOOST_MULTIPLIER - 1) * 100),
  };
}
