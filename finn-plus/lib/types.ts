export type Vertical = "eiendom" | "bil";

export interface ListingBase {
  id: string;
  vertical: Vertical;
  title: string;
  location: string;
  price: number;
  /** Estimated market value — used by FINN+ price intelligence (bucket 2). */
  marketValue: number;
  publishedAt: string; // ISO date
  image: { hue: number; icon: "house" | "apartment" | "cabin" | "car" };
}

export interface EiendomListing extends ListingBase {
  vertical: "eiendom";
  type: "Leilighet" | "Enebolig" | "Rekkehus" | "Hytte" | "Tomannsbolig";
  sqm: number;
  bedrooms: number;
  totalPrice: number;
  fellesutgifter?: number;
}

export interface BilListing extends ListingBase {
  vertical: "bil";
  make: string;
  model: string;
  year: number;
  km: number;
  fuel: "Elektrisitet" | "Bensin" | "Diesel" | "Hybrid";
  gearbox: "Automat" | "Manuell";
}

export type Listing = EiendomListing | BilListing;
