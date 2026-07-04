// Adds the dealer's brand band to hero images (the pattern all major FINN
// dealers use: consistent logo strip on the first photo). Run after
// enhance.mjs. Only touches <id>-0.jpg heroes.
import sharp from "sharp";
import { readFileSync } from "fs";

const listings = JSON.parse(readFileSync("data/demo-listings.json", "utf8"));

const W = 1200;
const H = 900;
// Tall enough to cover any existing banner baked into the source photo.
const BAND = 135;

for (const [id, d] of Object.entries(listings)) {
  const dealer = d.organisation_name;
  const band = Buffer.from(`
    <svg width="${W}" height="${BAND}">
      <rect width="${W}" height="${BAND}" fill="#0d203f"/>
      <rect width="6" height="${BAND}" fill="#0063fb"/>
      <text x="28" y="80" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#ffffff">${dealer}</text>
      <text x="${W - 28}" y="80" text-anchor="end" font-family="Arial, sans-serif" font-size="24" fill="#9fb3d1">Kvalitetsbruktbil</text>
    </svg>`);
  await sharp(`images/enhanced/${id}-0.jpg`)
    .composite([{ input: band, top: H - BAND, left: 0 }])
    .jpeg({ quality: 85 })
    .toFile(`images/enhanced/${id}-0-branded.jpg`);
  console.log("branded", id, dealer);
}
