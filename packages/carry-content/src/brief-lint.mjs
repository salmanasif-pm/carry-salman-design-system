// Lints shared by validate-brief and the renderers. Plain ESM so the CLI needs no build step.
// Confidentiality: case-insensitive substring of every exclusion across the visible text fields.
// Vocabulary: whole-word, case-insensitive terms from packages/carry-ds/scripts/banned-vocabulary.json; U+2014 anywhere; U+2013 with spaces either side.
import { readFileSync } from 'node:fs';

export const VOCAB_PATH = new URL('../../carry-ds/scripts/banned-vocabulary.json', import.meta.url);
export function loadVocabulary(path = VOCAB_PATH) { return JSON.parse(readFileSync(path, 'utf8')); }

/** Every text field a reader could see, as [fieldPath, string]. */
export function visibleText(brief) {
  const t = brief.text ?? {}; const out = [];
  if (typeof t.body === 'string') out.push(['text.body', t.body]);
  (t.slides ?? []).forEach((s, i) => out.push([`text.slides[${i}]`, s]));
  if (typeof t.alt_text === 'string') out.push(['text.alt_text', t.alt_text]);
  (t.poll_options ?? []).forEach((s, i) => out.push([`text.poll_options[${i}]`, s]));
  (t.regions ?? []).forEach((r, i) => { if (typeof r?.label === 'string') out.push([`text.regions[${i}].label`, r.label]); });
  return out;
}

export function confidentialityLint(brief) {
  const hits = [];
  const exclusions = brief.confidentiality?.exclusions ?? [];
  for (const [field, text] of visibleText(brief)) {
    const lower = text.toLowerCase();
    for (const ex of exclusions) { if (ex && lower.includes(String(ex).toLowerCase())) hits.push({ field, rule: 'confidentiality.exclusions', term: ex }); }
  }
  return hits;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function vocabularyLint(brief, vocab = loadVocabulary()) {
  const hits = [];
  const terms = (vocab.terms ?? []).map((t) => (typeof t === 'string' ? { term: t } : t));
  for (const [field, text] of visibleText(brief)) {
    for (const t of terms) {
      const re = new RegExp(t.substring ? esc(t.term) : `(^|[^\\p{L}\\p{N}_])${esc(t.term)}(?![\\p{L}\\p{N}_])`, 'iu');
      const m = text.match(re); if (m) hits.push({ field, rule: 'banned-vocabulary', term: t.term, match: m[0].trim() });
    }
    if (/—/.test(text)) hits.push({ field, rule: 'banned-character', term: 'U+2014 em dash (blocked anywhere)' });
    if (/ – /.test(text)) hits.push({ field, rule: 'banned-character', term: 'U+2013 en dash surrounded by spaces' });
  }
  return hits;
}

/** Gate (brief §2.1): both fields, read as given; no override exists. */
export function releaseGate(brief) {
  const ok = brief.release_permission === 'approved_public' && brief.human_approval_state === 'approved_by_salman';
  return { result: ok ? 'public' : 'internal', reason: ok ? 'approved_public · approved_by_salman' : `release_permission=${brief.release_permission ?? 'missing'} · approval=${brief.human_approval_state ?? 'missing'}` };
}
