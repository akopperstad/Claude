import { Listing } from "./types";

/** Frozen demo clock so the prototype behaves identically in every pitch. */
export const DEMO_NOW = new Date("2026-07-03T12:00:00Z").getTime();

/** Early-access window: members see listings 24h before everyone else. */
const WINDOW_MS = 24 * 60 * 60 * 1000;

export function isEarlyAccess(listing: Listing): boolean {
  return new Date(listing.publishedAt).getTime() + WINDOW_MS > DEMO_NOW;
}

/** Whole hours until the listing becomes visible to free users. */
export function hoursUntilPublic(listing: Listing): number {
  const ms = new Date(listing.publishedAt).getTime() + WINDOW_MS - DEMO_NOW;
  return Math.max(1, Math.ceil(ms / 3_600_000));
}

export function sortNewestFirst<T extends Listing>(listings: T[]): T[] {
  return [...listings].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
