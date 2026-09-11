// Emits JSON Schema (draft 2020-12) from the Zod contract so non-TypeScript tools and AI agents can validate against the same rules.
import { writeFileSync, mkdirSync } from 'node:fs';
import { z } from 'zod';
import { Artifact } from '../dist/schema.js';
mkdirSync(new URL('../schema/', import.meta.url), { recursive: true });
const schema = z.toJSONSchema(Artifact, { target: 'draft-2020-12', io: 'input' });
schema.$id = 'https://carry.salmanasif.dev/schema/artifact.v1.json';
schema.title = 'Carry artifact (contract v1)';
schema.description = 'Structured content for a Carry artifact. Semantics: packages/carry-ds/docs/engine-integration.md §2 and docs/state-architecture.md. Rules the schema cannot express (lead required except observation-development, verified needs claims_register_ref, public-build refusals) live in the validator.';
writeFileSync(new URL('../schema/artifact.v1.json', import.meta.url), JSON.stringify(schema, null, 2) + '\n');
console.log('schema/artifact.v1.json written');
