import type { Level } from './levels';
import type { EstimateLine } from './estimate';

/**
 * "Rydd & vask" staging ladder (A21).
 *
 * One customer-facing toggle, four operations under the hood. Never silent:
 * the caller labels the result ("Inkluderer rydding og vask") whenever the
 * fragment is applied, so the before/after comparison stays honest at every
 * level. Operations map to real purchasable services — they feed estimate
 * lines (A10) and are future håndverker lead types.
 */

export interface StagingOp {
  id: 'rydd' | 'vask' | 'stell' | 'fjern';
  /** Prompt fragment describing the edit. */
  fragment: string;
  /** Optional real-service estimate line (A10). */
  estimateLine?: EstimateLine;
}

export const STAGING_OPS: StagingOp[] = [
  {
    id: 'rydd',
    fragment:
      'remove movable clutter: garbage bins, hoses, tarps, toys, trailers and loose junk',
  },
  {
    id: 'vask',
    fragment:
      'show all surfaces freshly power-washed: roof free of moss, cladding free of grime and algae, clean driveway',
    estimateLine: { label: 'Fasade- og takvask', lowNok: 5000, highNok: 20000 },
  },
  {
    id: 'stell',
    fragment: 'lawn freshly mowed and hedges neatly trimmed',
  },
  {
    id: 'fjern',
    fragment:
      'remove satellite dishes, visible external cables and disused antennas from the building',
    estimateLine: { label: 'Demontering av parabol/antenner', lowNok: 2000, highNok: 8000 },
  },
];

/** Default toggle state per level: on where drift is tolerated (A21). */
export function stagingDefault(level: Level): boolean {
  return level >= 3;
}

/** The combined prompt fragment for the whole toggle. */
export function stagingFragment(): string {
  return (
    'Additionally, present the property well-kept: ' +
    STAGING_OPS.map((op) => op.fragment).join('; ') +
    '.'
  );
}

/** Estimate lines for the real services staging visualizes (A10). */
export function stagingEstimateLines(): EstimateLine[] {
  return STAGING_OPS.flatMap((op) => (op.estimateLine ? [op.estimateLine] : []));
}
