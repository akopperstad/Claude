import type { RenderRequest } from './types';
import type { Level } from './levels';

/**
 * Curated Norwegian exterior styles (A24) — the visual style gallery.
 * One style powers all levels: `target` feeds the nivå 2-3 change sentence,
 * `direction` steers the nivå 4 architect brief.
 */
export interface ExteriorStyle {
  id: string;
  navn: string;
  /** Customer-facing one-liner, Norwegian bokmål. */
  beskrivelse: string;
  /** First level where the style is meaningful. */
  minLevel: Level;
  /** Change-instruction fragment for nivå 2-3. */
  target: string;
  /** Style direction for the nivå 4 vision brief. */
  direction: string;
}

export const EXTERIOR_STYLES: ExteriorStyle[] = [
  {
    id: 'sorlandshvit',
    navn: 'Sørlandshvit',
    beskrivelse: 'Klassisk hvit trehusidyll med myke, lune detaljer.',
    minLevel: 2,
    target:
      'crisp white painted wood cladding, white window frames and trim, front door in soft sage gray-green, discreet black outdoor wall lanterns',
    direction: 'classic white Sørlandet coastal idyll, refined and timeless',
  },
  {
    id: 'moderne-kontrast',
    navn: 'Moderne kontrast',
    beskrivelse: 'Dyp antrasitt med store sorte vindusrammer. Dramatisk.',
    minLevel: 2,
    target:
      'deep anthracite gray cladding, large modern black-framed windows in the same positions, matte black doors',
    direction: 'bold dark modernism with dramatic glass and black steel details',
  },
  {
    id: 'lys-skandinavisk',
    navn: 'Lys skandinavisk',
    beskrivelse: 'Hvitt, luftig og lyst med sølvgrå treverk.',
    minLevel: 2,
    target:
      'crisp white cladding, decks and slatted wood stained light silver-gray driftwood, discreet black outdoor wall lamps',
    direction: 'airy light Scandinavian minimalism, generous daylight, natural wood accents',
  },
  {
    id: 'sort-minimalisme',
    navn: 'Sort minimalisme',
    beskrivelse: 'Stående sort panel, rene linjer, ingen støy.',
    minLevel: 2,
    target:
      'modern matte black vertical timber cladding (stående sort trepanel), black window frames, clean uncluttered lines',
    direction: 'strict black Nordic minimalism, monolithic volumes, hidden gutters',
  },
  {
    id: 'naturnaer-lerk',
    navn: 'Naturnær lerk',
    beskrivelse: 'Royalbehandlet lerk i varm honningtone. Eldes vakkert.',
    minLevel: 2,
    target:
      'new light royal-oiled larch vertical timber cladding in a warm honey tone, black window frames',
    direction: 'warm natural larch architecture that meets the landscape softly',
  },
  {
    id: 'fjellstil',
    navn: 'Fjellstil',
    beskrivelse: 'Mørk beis, torv og stein. Hytte-DNA for hus.',
    minLevel: 2,
    target:
      'dark brown mountain stain (mørk beis) on all cladding, natural stone details at the base, warm outdoor lighting',
    direction: 'Norwegian mountain lodge character: dark stained wood, stone, turf-roof references',
  },
  {
    id: 'herskapelig',
    navn: 'Herskapelig klassisk',
    beskrivelse: 'Lys mur, symmetri og staselige detaljer.',
    minLevel: 3,
    target:
      'light warm-gray rendered/mineral facade, classical white window frames, stately panelled front door, symmetric entrance details',
    direction: 'stately classical villa: symmetry, rendered facade, generous entrance staircase',
  },
];

/**
 * Norwegian exterior style presets, expressed as pipeline RenderRequests.
 *
 * Color names are anchored to well-known traditional tones (with RAL/plain
 * descriptions) rather than any paint brand's trademarked names. Mapping to
 * a real, buyable palette (e.g. a paint-chain partnership) is bucket 3+.
 */
export const REPAINT_PRESETS: Record<string, RenderRequest> = {
  rorosrod: {
    transform: 'repaint',
    target: 'deep barn red (rørosrød, RAL 3011)',
  },
  klassiskHvit: {
    transform: 'repaint',
    target: 'classic Norwegian white (klassisk hvit)',
  },
  morkGra: {
    transform: 'repaint',
    target: 'deep charcoal gray (mørk grå)',
  },
  greige: {
    transform: 'repaint',
    target: 'a light warm greige (gray-beige)',
  },
  oker: {
    transform: 'repaint',
    target: 'a deep traditional ochre yellow (oker)',
  },
  fjellgra: {
    transform: 'repaint',
    target: 'a lighter warm gray-beige mountain stain (fjellgrå beis)',
  },
};

export const CLADDING_PRESETS: Record<string, RenderRequest> = {
  sortStaende: {
    transform: 'cladding',
    target:
      'modern matte black vertical timber cladding (stående sort trepanel)',
  },
  royalLerk: {
    transform: 'cladding',
    target:
      'new light royal-oiled larch vertical timber cladding in a warm honey tone',
  },
  naturligLerk: {
    transform: 'cladding',
    target: 'natural untreated golden larch vertical timber cladding',
  },
};

export const REFRESH_PRESETS: Record<string, RenderRequest> = {
  sorlandsstil: {
    transform: 'refresh',
    target:
      'paint all wood cladding crisp white, paint window frames and trim white, front doors in soft sage gray-green, add discreet black outdoor wall lanterns beside the doors',
  },
  moderneKontrast: {
    transform: 'refresh',
    target:
      'repaint the wood cladding in deep anthracite gray, replace the windows with larger modern black-framed windows in the same positions, replace any garage doors with matte black modern sectional doors',
  },
  lysSkandinavisk: {
    transform: 'refresh',
    target:
      'paint the wood cladding crisp white, keep window frames unchanged, stain decks and slatted wood in a light silver-gray driftwood tone, add discreet black outdoor wall lamps',
  },
};
