import { eiendomListings } from "./mock/eiendom";
import { bilListings } from "./mock/bil";
import { Listing } from "./types";

export const allListings: Listing[] = [...eiendomListings, ...bilListings];

export function getListing(id: string): Listing | undefined {
  return allListings.find((l) => l.id === id);
}

export function formatPrice(n: number): string {
  return n.toLocaleString("nb-NO").replace(/ /g, " ") + " kr";
}

export function formatKm(n: number): string {
  return n.toLocaleString("nb-NO").replace(/ /g, " ") + " km";
}
