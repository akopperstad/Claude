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
