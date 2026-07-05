import type { HouseAnalysis } from './types';
import type { Level } from './levels';
import { stagingEstimateLines } from './staging';

/**
 * Rough cost estimator (A10).
 *
 * Wide ranges from typical Norwegian contractor rates, quantities guessed
 * from the vision analysis. Deliberately coarse — the product labels every
 * number "grovt estimat, ikke et tilbud". The business job is budget
 * qualification for håndverker leads, not quoting.
 */

export interface EstimateLine {
  label: string;
  lowNok: number;
  highNok: number;
}

export interface Estimate {
  lines: EstimateLine[];
  totalLowNok: number;
  totalHighNok: number;
}

/** kr per enhet — typiske håndverkerpriser inkl. materialer, 2026-nivå. */
const RATES = {
  malingPerM2: [350, 650],
  kledningPerM2: [1500, 2600],
  vinduPerStk: [15_000, 30_000],
  takPerM2: [1500, 2500],
  plattingPerM2: [2500, 4000],
  totalrenovPerM2Bra: [10_000, 25_000],
} as const;

/** Grov fasadeflate (m²) gjettet fra boligtype. */
function facadeArea(house: HouseAnalysis): number {
  const t = house.buildingType.toLowerCase();
  if (t.includes('hytte') || t.includes('cabin')) return 90;
  if (t.includes('rekkehus') || t.includes('row')) return 120;
  if (t.includes('tomannsbolig') || t.includes('two-family')) return 220;
  return 180; // enebolig default
}

function line(label: string, qty: number, [low, high]: readonly [number, number]): EstimateLine {
  const round = (n: number) => Math.round(n / 5000) * 5000;
  return { label, lowNok: round(qty * low), highNok: round(qty * high) };
}

export function estimate(house: HouseAnalysis, level: Level, staging = false): Estimate {
  const area = facadeArea(house);
  const lines: EstimateLine[] = [];
  switch (level) {
    case 1:
      lines.push(line(`Maling av kledning (~${area} m²)`, area, RATES.malingPerM2));
      break;
    case 2:
      lines.push(line(`Ny kledning (~${area} m²)`, area, RATES.kledningPerM2));
      lines.push(line('Omlegging av takflate', area * 0.8, RATES.takPerM2));
      break;
    case 3:
      lines.push(line(`Maling av kledning (~${area} m²)`, area, RATES.malingPerM2));
      lines.push(line('Vindusbytte (8 stk)', 8, RATES.vinduPerStk));
      lines.push(line('Platting (~30 m²)', 30, RATES.plattingPerM2));
      break;
    case 4:
      lines.push(line('Totalrenovering av fasade og uteområde (~200 m² BRA)', 200, RATES.totalrenovPerM2Bra));
      break;
  }
  if (staging) lines.push(...stagingEstimateLines());
  return {
    lines,
    totalLowNok: lines.reduce((s, l) => s + l.lowNok, 0),
    totalHighNok: lines.reduce((s, l) => s + l.highNok, 0),
  };
}
