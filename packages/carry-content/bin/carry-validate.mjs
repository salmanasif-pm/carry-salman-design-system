#!/usr/bin/env node
// carry-validate <artifact.json> [--public] [--json]
import { readFileSync } from 'node:fs';
import { validateArtifact, formatProblems } from '../dist/index.js';
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
if (!file) { console.error('usage: carry-validate <artifact.json> [--public] [--json]'); process.exit(2); }
const r = validateArtifact(JSON.parse(readFileSync(file, 'utf8')), { publicBuild: args.includes('--public') });
console.log(args.includes('--json') ? JSON.stringify(r.ok ? { ok: true, warnings: r.warnings } : { ok: false, errors: r.errors, warnings: r.warnings }, null, 2) : formatProblems(r));
process.exit(r.ok ? 0 : 1);
