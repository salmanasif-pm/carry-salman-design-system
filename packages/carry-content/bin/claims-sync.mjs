#!/usr/bin/env node
// claims-sync [--dry-run] [--out content/claims.json]
// Pulls APPROVED rows from the Claims & Verification Register (Notion database) into content/claims.json.
// Only approved wording is copied, verbatim; nothing is rewritten, summarised or invented. Requires:
//   NOTION_TOKEN            integration token with read access to the register
//   CARRY_CLAIMS_DATABASE   the register's database id
// Optional property names (defaults in brackets): CLAIMS_PROP_ID [ID], CLAIMS_PROP_WORDING [Approved wording],
// CLAIMS_PROP_STATUS [Status], CLAIMS_PROP_APPROVED_VALUE [Approved], CLAIMS_PROP_SOURCE [Source], CLAIMS_PROP_CERTAINTY [Certainty].
// Without a token the command runs a dry run: it validates the existing content/claims.json shape and exits 0.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const out = path.resolve(opt('--out', 'content/claims.json'));
const dry = args.includes('--dry-run') || !process.env.NOTION_TOKEN;
const P = { id: process.env.CLAIMS_PROP_ID ?? 'ID', wording: process.env.CLAIMS_PROP_WORDING ?? 'Approved wording', status: process.env.CLAIMS_PROP_STATUS ?? 'Status', approved: process.env.CLAIMS_PROP_APPROVED_VALUE ?? 'Approved', source: process.env.CLAIMS_PROP_SOURCE ?? 'Source', certainty: process.env.CLAIMS_PROP_CERTAINTY ?? 'Certainty' };

function validateFile(file) {
  const j = JSON.parse(readFileSync(file, 'utf8'));
  const problems = [];
  if (!Array.isArray(j.claims)) problems.push('claims: must be an array');
  const ids = new Set();
  for (const [i, c] of (j.claims ?? []).entries()) {
    for (const k of ['id', 'wording', 'approved_by', 'approved_on']) if (typeof c[k] !== 'string' || !c[k].trim()) problems.push(`claims[${i}].${k}: required string`);
    if (ids.has(c.id)) problems.push(`claims[${i}].id "${c.id}": duplicate`); ids.add(c.id);
    if (c.certainty && !['confirmed', 'provisional', 'unknown'].includes(c.certainty)) problems.push(`claims[${i}].certainty: confirmed|provisional|unknown`);
  }
  return { j, problems };
}

const plain = (prop) => (prop?.title ?? prop?.rich_text ?? []).map((t) => t.plain_text).join('').trim();
const sel = (prop) => prop?.select?.name ?? prop?.status?.name ?? '';

async function pull() {
  const rows = []; let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.CARRY_CLAIMS_DATABASE}/query`, {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.NOTION_TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_size: 100, start_cursor: cursor, filter: { property: P.status, select: { equals: P.approved } } }),
    });
    if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
    const j = await res.json(); rows.push(...j.results); cursor = j.has_more ? j.next_cursor : undefined;
  } while (cursor);
  return rows.map((r) => ({
    id: plain(r.properties[P.id]) || r.id,
    wording: plain(r.properties[P.wording]),
    certainty: sel(r.properties[P.certainty]).toLowerCase() || 'confirmed',
    source: plain(r.properties[P.source]) || 'Claims & Verification Register (internal)',
    approved_by: r.last_edited_by?.name ?? 'register',
    approved_on: (r.last_edited_time ?? '').slice(0, 10),
    notion_page: r.id,
  })).filter((c) => c.wording);
}

if (dry) {
  const { j, problems } = validateFile(out);
  console.log(`dry run · ${path.relative(process.cwd(), out)} · ${j.claims.length} claim(s) · synced_at ${j.synced_at ?? 'never'}`);
  if (!process.env.NOTION_TOKEN) console.log('NOTION_TOKEN not set — nothing pulled. Set NOTION_TOKEN and CARRY_CLAIMS_DATABASE to sync.');
  for (const p of problems) console.log('FAIL  ' + p);
  process.exit(problems.length ? 1 : 0);
}
if (!process.env.CARRY_CLAIMS_DATABASE) { console.error('CARRY_CLAIMS_DATABASE is required'); process.exit(2); }
const claims = await pull();
const file = { $comment: 'Approved wording pulled verbatim from the Claims & Verification Register by bin/claims-sync.mjs. Do not edit by hand.', source: 'Claims & Verification Register — CV and Positioning (internal)', synced_at: new Date().toISOString(), claims };
const { problems } = validateFile(out); // shape check of what we are about to replace, for the log
writeFileSync(out, JSON.stringify(file, null, 2) + '\n');
console.log(`synced ${claims.length} approved claim(s) → ${path.relative(process.cwd(), out)}${problems.length ? ` (previous file had ${problems.length} shape problem(s))` : ''}`);
