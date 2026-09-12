#!/usr/bin/env node
// validate-brief <brief.json> [--json]
// 1. JSON Schema 2020-12 (schema/content-brief.schema.json) → 2. confidentiality lint → 3. banned-vocabulary lint.
// Prints PASS or a numbered list of failures; exit 1 on any failure. Lint runs for internal renders too (brief §2.3).
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import { confidentialityLint, vocabularyLint, releaseGate } from '../src/brief-lint.mjs';

const args = process.argv.slice(2); const file = args.find((a) => !a.startsWith('--'));
if (!file) { console.error('usage: validate-brief <brief.json> [--json]'); process.exit(2); }
const schema = JSON.parse(readFileSync(new URL('../schema/content-brief.schema.json', import.meta.url), 'utf8'));
const brief = JSON.parse(readFileSync(file, 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
const validate = ajv.compile(schema);
const failures = [];
if (!validate(brief)) for (const e of validate.errors) failures.push({ stage: 'schema', path: e.instancePath || '<root>', message: e.keyword === 'additionalProperties' ? `unknown key "${e.params.additionalProperty}"` : e.keyword === 'const' && e.instancePath === '/source/is_derivative' ? 'is_derivative must be false (a derivative is a lineage violation)' : e.keyword === 'not' && e.instancePath === '/audience_action' ? 'must not contain follow, subscribe, share, like or tag' : e.keyword === 'not' && /register_status/.test(e.instancePath) ? 'banned wording never renders' : e.message });
// Extra validations the schema states but code enforces independently (brief §2.7: no inference, fail loudly).
if (brief.source && brief.source.is_derivative !== false) failures.push({ stage: 'schema', path: '/source/is_derivative', message: 'must be false' });
if (brief.motion_opportunity && brief.motion_opportunity.role !== 'none' && !(brief.motion_opportunity.static_equivalent ?? '').trim()) failures.push({ stage: 'schema', path: '/motion_opportunity/static_equivalent', message: 'non-empty required when role is not none (no static equivalent, no motion)' });
if (typeof brief.audience_action === 'string' && /\b(follow|subscribe|share|like|tag)\b/i.test(brief.audience_action)) failures.push({ stage: 'schema', path: '/audience_action', message: 'must not contain follow, subscribe, share, like or tag' });
(brief.evidence ?? []).forEach((e, i) => { if (e?.register_status === 'banned') failures.push({ stage: 'schema', path: `/evidence/${i}/register_status`, message: 'banned wording never renders' }); });
for (const h of confidentialityLint(brief)) failures.push({ stage: 'confidentiality', path: h.field, message: `contains excluded term "${h.term}"` });
for (const h of vocabularyLint(brief)) failures.push({ stage: 'vocabulary', path: h.field, message: `${h.term}${h.match ? ` ("${h.match}")` : ''}` });
const seen = new Set(); const unique = failures.filter((f) => { const k = f.stage + f.path + f.message; if (seen.has(k)) return false; seen.add(k); return true; });
const gate = releaseGate(brief);
if (args.includes('--json')) console.log(JSON.stringify({ ok: unique.length === 0, failures: unique, gate }, null, 2));
else if (unique.length === 0) console.log(`PASS · schema ${brief.schema_version} · gate → ${gate.result} (${gate.reason})`);
else { unique.forEach((f, i) => console.log(`${i + 1}. [${f.stage}] ${f.path}: ${f.message}`)); console.log(`\n${unique.length} failure(s)`); }
process.exit(unique.length ? 1 : 0);
