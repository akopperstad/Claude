import type { RenderRequest } from './types';

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
