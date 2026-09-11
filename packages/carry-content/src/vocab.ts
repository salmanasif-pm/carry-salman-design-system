// Closed vocabularies. These mirror packages/carry-ds (tokens, StateMark, Composition, semantic modes).
// Changing any of them is a design-system decision (docs/decisions/0004, 0005), not a schema edit.

export const CERTAINTY = ['confirmed', 'provisional', 'unknown', 'superseded'] as const;
export const PUBLIC_CERTAINTY = ['confirmed', 'provisional', 'unknown'] as const;
export const RELEASE = ['internal', 'review', 'approved', 'restricted'] as const;
export const RELEASE_TAG: Record<(typeof RELEASE)[number], string> = { internal: 'internal', review: 'review required', approved: 'approved', restricted: 'restricted' };

export const FORMS = ['handle-truth', 'claim-support', 'outcome-enabled', 'question-conditions', 'direction-consequence', 'intention-reflection', 'observation-development'] as const;
export const LEAD_KINDS = ['decision', 'recommendation', 'question', 'refusal', 'next', 'kept', 'open'] as const;
export const CONTENT_KINDS = ['placeholder', 'illustrative', 'verified'] as const;
export const ILLUSTRATIVE_LABEL = 'illustrative example — not Salman evidence';

export const MODES = ['executive', 'social', 'systems', 'evidence', 'personal'] as const;
export const GROUNDS = ['paper', 'graphite'] as const;
/** Threshold position per mode, from tokens/semantic.css (--threshold-at). Read-only mirror for renderers and the interactive Composition. */
export const THRESHOLD_AT: Record<(typeof MODES)[number], number> = { executive: 0.62, social: 0.55, systems: 0.28, evidence: 0.34, personal: 0.6 };
export const PROVENANCE_LINES: Record<(typeof MODES)[number], number> = { executive: 2, social: 1, systems: 99, evidence: 99, personal: 1 };

export const ARTIFACTS = ['social', 'carousel', 'deck', 'document', 'diagram'] as const;
export const DECK_SLIDE_TYPES = ['title', 'statement', 'decision', 'evidence', 'table', 'diagram', 'timeline', 'consequence', 'close'] as const;
export const CONNECTOR_CERTAINTY = ['confirmed', 'provisional', 'unknown'] as const;
export const SOURCE_KINDS = ['internal', 'restricted', 'public', 'self-reported'] as const;

/** Motion roles (tokens/motion.css). Engine presets map onto them in engine-integration §4; count-up and flow-pulse are disabled. */
export const MOTION_ROLES = ['attract', 'orient', 'confirm', 'progress', 'converge', 'release'] as const;
