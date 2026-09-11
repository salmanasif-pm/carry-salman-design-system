import { z } from 'zod';
import { ARTIFACTS, CERTAINTY, CONNECTOR_CERTAINTY, CONTENT_KINDS, DECK_SLIDE_TYPES, FORMS, GROUNDS, LEAD_KINDS, MODES, RELEASE, SOURCE_KINDS } from './vocab.js';

// Every object is strict: an unknown key is a validation error, never a silent pass-through.
const text = z.string().trim().min(1);

export const Gate = z.strictObject({
  gate: text.describe('The condition being waited on.'),
  owner: text.optional().describe('Who clears it. A gate without an owner is a delay, not a gate (warning).'),
  clears: text.optional().describe('What has to be true for the gate to clear.'),
  review: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Review date, ISO.'),
});

export const State = z.strictObject({
  certainty: z.enum(CERTAINTY),
  gated: z.union([z.boolean(), Gate]).optional(),
  release: z.enum(RELEASE).optional(),
  label: text.optional(),
});

export const Lead = z.strictObject({
  kind: z.enum(LEAD_KINDS),
  text,
  reopens: text.optional().describe('The condition that would reopen this decision.'),
});

export const Source = z.strictObject({
  name: text,
  kind: z.enum(SOURCE_KINDS).default('internal'),
  version: text.optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  url: z.string().url().optional().describe('Only for public sources. Internal and restricted sources are named, never linked.'),
});

export const Consequence = z.strictObject({ who: text, text });
export const Handoff = z.strictObject({ state: text, next: text, owner: text, artifact: text, version: text.optional() });

/** One evidence row: mono key/value with optional state. */
export const EvidenceRow = z.strictObject({ key: text, value: text, state: State.optional(), source: text.optional() });

/** The above / line / below composition every artifact carries. */
const compositionFields = {
  form: z.enum(FORMS),
  above: text.describe('First read: Instrument Sans 500, above the threshold.'),
  below: text.optional().describe('Exact second read: Geist Mono, below the threshold.'),
  lead: Lead.optional(),
};

const artifactBase = {
  version: z.literal(1).describe('Contract version.'),
  mode: z.enum(MODES),
  ground: z.enum(GROUNDS).default('paper'),
  reader: text.optional(),
  content_kind: z.enum(CONTENT_KINDS),
  claims_register_ref: text.optional().describe('Required when content_kind is verified.'),
  release: z.enum(RELEASE),
  states: z.array(State).default([]),
  sources: z.array(Source).default([]),
  consequence: Consequence.optional(),
  handoff: Handoff.optional(),
  title: text.optional(),
  ...compositionFields,
};

export const SocialArtifact = z.strictObject({
  ...artifactBase,
  artifact: z.literal('social'),
  size: z.enum(['1080', '2160']).default('1080'),
  support: z.array(EvidenceRow).min(1).max(4).describe('Evidence rows under the line, ≥ 40px on a 1080 source.'),
  caption: text.optional().describe('Metadata lives in the caption, not on the tile.'),
});

export const CarouselPanel = z.strictObject({ ...compositionFields, support: z.array(EvidenceRow).max(4).default([]) });
export const CarouselArtifact = z.strictObject({
  ...artifactBase,
  artifact: z.literal('carousel'),
  panels: z.array(CarouselPanel).min(2).max(6),
});

export const DiagramNode = z.strictObject({ id: text.regex(/^[a-z0-9][a-z0-9-]*$/), label: text, certainty: z.enum(CERTAINTY).default('provisional'), gated: z.union([z.boolean(), Gate]).optional(), carries: z.boolean().default(false) });
export const DiagramLane = z.strictObject({ id: text.regex(/^[a-z0-9][a-z0-9-]*$/), owner: text, boundary: z.boolean().default(false), nodes: z.array(DiagramNode).min(1).max(4) });
export const DiagramConnector = z.strictObject({ from: text, to: text, certainty: z.enum(CONNECTOR_CERTAINTY).default('confirmed'), label: text.optional() });
export const DiagramBody = z.strictObject({ lanes: z.array(DiagramLane).min(1), connectors: z.array(DiagramConnector).default([]), legend: z.boolean().default(true) });
export const DiagramArtifact = z.strictObject({ ...artifactBase, artifact: z.literal('diagram'), diagram: DiagramBody });

export const TableBody = z.strictObject({
  columns: z.array(z.strictObject({ key: text, header: text })).min(1),
  rows: z.array(z.record(z.string(), z.union([text, State.extend({ text }).strict()]))).min(1),
});
export const LadderStep = z.strictObject({ label: text, state: State.optional(), current: z.boolean().default(false) });

const slideBase = { id: text.regex(/^[a-z0-9][a-z0-9-]*$/), ground: z.enum(GROUNDS).optional(), notes: z.string().optional(), sources: z.array(Source).default([]) };
export const DeckSlide = z.discriminatedUnion('type', [
  z.strictObject({ ...slideBase, type: z.literal('title'), title: text, subtitle: text.optional() }),
  z.strictObject({ ...slideBase, type: z.literal('statement'), ...compositionFields }),
  z.strictObject({ ...slideBase, type: z.literal('decision'), lead: Lead, evidence: z.array(EvidenceRow).default([]), counterpoint: text.optional() }),
  z.strictObject({ ...slideBase, type: z.literal('evidence'), heading: text.optional(), evidence: z.array(EvidenceRow).min(1) }),
  z.strictObject({ ...slideBase, type: z.literal('table'), heading: text.optional(), table: TableBody }),
  z.strictObject({ ...slideBase, type: z.literal('diagram'), heading: text.optional(), diagram: DiagramBody }),
  z.strictObject({ ...slideBase, type: z.literal('timeline'), heading: text.optional(), steps: z.array(LadderStep).min(2) }),
  z.strictObject({ ...slideBase, type: z.literal('consequence'), consequence: Consequence }),
  z.strictObject({ ...slideBase, type: z.literal('close'), handoff: Handoff }),
]);
export const DeckArtifact = z.strictObject({ ...artifactBase, artifact: z.literal('deck'), slides: z.array(DeckSlide).min(1) });

export const DocumentSection = z.strictObject({ heading: text.optional(), body: z.array(text).min(1), evidence: z.array(EvidenceRow).default([]), state: State.optional() });
export const DocumentArtifact = z.strictObject({ ...artifactBase, artifact: z.literal('document'), sections: z.array(DocumentSection).min(1), counterpoint: text.optional() });

export const Artifact = z.discriminatedUnion('artifact', [SocialArtifact, CarouselArtifact, DeckArtifact, DocumentArtifact, DiagramArtifact]);

export type Gate = z.infer<typeof Gate>;
export type State = z.infer<typeof State>;
export type Lead = z.infer<typeof Lead>;
export type Source = z.infer<typeof Source>;
export type EvidenceRow = z.infer<typeof EvidenceRow>;
export type Artifact = z.infer<typeof Artifact>;
export type ArtifactInput = z.input<typeof Artifact>;
export type ArtifactFamily = (typeof ARTIFACTS)[number];
export type DeckSlide = z.infer<typeof DeckSlide>;
export type DeckSlideType = (typeof DECK_SLIDE_TYPES)[number];
