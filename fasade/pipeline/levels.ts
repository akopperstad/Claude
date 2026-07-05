/**
 * The four transformation levels (decision A5).
 *
 * One axis controls everything: how much of the house may change. Drift
 * tolerance, prompting strategy, and pricing all scale with the level.
 *
 * Drift score bands (fasade/eval/drift_score.py, calibrated in bucket 2):
 *   level 1-2  score >= 0.85 required
 *   level 3    score 0.65-0.85 expected
 *   level 4    unconstrained (aspirational by definition)
 */

export type Level = 1 | 2 | 3 | 4;

export interface LevelSpec {
  level: Level;
  name: string; // Norwegian product name
  /** What the generation may change. */
  allowed: string;
  /** Whether the palette engine picks the colors (level 3+) or the user does. */
  aiPalette: boolean;
  /** Whether the strict edit-not-regenerate prompt frame applies. */
  strictGeometry: boolean;
  /** Contextual disclaimer beyond the global "illustrasjon" label (A6). */
  extraDisclaimer?: string;
}

export const LEVELS: Record<Level, LevelSpec> = {
  1: {
    level: 1,
    name: 'Farge',
    allowed: 'cladding color only',
    aiPalette: false, // user picks exact color OR asks for suggestions (A2)
    strictGeometry: true,
  },
  2: {
    level: 2,
    name: 'Overflater',
    allowed:
      'materials: cladding type/direction, roof surface, window frame color, doors — no new elements',
    aiPalette: false,
    strictGeometry: true,
  },
  3: {
    level: 3,
    name: 'Oppgradering',
    allowed:
      'new windows in existing openings, entrance, patio/terrace, lighting, landscaping — same foundation and volumes, AI-optimized full color scheme',
    aiPalette: true,
    strictGeometry: true, // volumes and rooflines still locked
    extraDisclaimer: 'Tiltak kan være søknadspliktige.',
  },
  4: {
    level: 4,
    name: 'Visjon',
    allowed: 'full architectural reimagining on the same plot',
    aiPalette: true,
    strictGeometry: false,
    extraDisclaimer: 'Tiltak kan være søknadspliktige.',
  },
};
