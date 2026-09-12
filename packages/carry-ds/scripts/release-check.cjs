// Carry release check — run before any distributable build:  node scripts/release-check.js [--public]
// Fails (exit 1) on restricted terms, placeholder contact data, unsupported figures, or operating-only states in a public build.
// CommonJS on purpose (.cjs): a .js file inside an ES-module package scope was parsed as ESM, `require` was undefined and the
// former browser guard turned the whole check into a silent pass (docs/decisions/0007-release-gate-hardening.md).
if (typeof require === 'undefined' || typeof process === 'undefined') {
  throw new Error('release-check must run under Node as CommonJS: node scripts/release-check.cjs [--public]');
}
{
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = process.argv.includes('--public');
const SKIP = [/^uploads\//, /^strategy\//, /^_ds_/, /^_adherence/, /node_modules/, /support\.js$/, /image-slot\.js$/, /ds-base\.js$/, /^scripts\//];
const TEXT = /\.(html|md|jsx|tsx|ts|css|js|json)$/;
// Restricted reference material — may appear ONLY in these files (as employer name / source attribution)
const RESTRICTED = [/QuickTake/i, /PureLogics/i, /SUNY/i, /Upstate/i, /340B/, /RxTrail/i, /RXFiler/i];
const RESTRICTED_ALLOW = ['readme.md','CLAUDE.md','github.md','SKILL.md','docs/governance.md','docs/engine-integration.md','docs/state-architecture.md','docs/rules.md','docs/delta-report-v0.9.1.md','docs/package-manifest.md','docs/handoff-claude-code.md','assets/fonts/fonts-manifest.json','templates/case-study/CaseStudy.dc.html','templates/resume-header/ResumeHeader.dc.html','templates/executive-deck/ExecutiveDeck.dc.html'];
// Removal ledgers quote the strings they removed. Only these files may contain banned wording, and only as history.
const LEDGER_ALLOW = ['docs/delta-report-v0.9.1.md'];
// Content that originated from restricted sources or was invented in v0.9 — never allowed
const BANNED = [/kiosk/i, /clinical export/i, /sponsor analytics/i, /patient[- ]data/i, /migration custody/i, /D-114/, /board minutes/i, /audit (passed|summary|record)/i, /3 regulated platforms/i, /no integration findings/i, /path chosen in 9 days/i, /4 weeks of (integration|rework)/i, /2\.1M records/i, /ward clerk/i, /cut-over/i, /steering group chair/i];
// Claims Register banned wording
const CLAIMS_BANNED = [/decade of experience/i, /over the last decade/i, /CBAP/, /multimillion/i, /8 → 25\+/, /8 to 25\+/, /400\+ leads/, /100% validation/, /9[05]% (engineering|dependency)/i, /74% healthcare/i, /40% client-acquisition/i, /60% workload/i, /50% repeat/i];
// Placeholder identity
const PLACEHOLDER = [/example\.com/i, /\+1 000 000 0000/, /Toronto/, /J\. Ortiz/, /salman@example/i];
// Operating-only states — fail public builds
const OPERATING = [/certainty=["']superseded["']/, /state=["']superseded["']/, /state=["']proposed["']/, /release=["'](internal|restricted)["']/];
// Public vocabulary (v0.9.2): words the content side bans from approved_public text. Warn on whole-word hits in templates/**; the list lives in banned-vocabulary.json, not here.
const VOCAB = PUBLIC ? JSON.parse(fs.readFileSync(path.join(__dirname, 'banned-vocabulary.json'), 'utf8')) : null;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const VOCAB_RE = VOCAB ? VOCAB.terms.map((t) => ({ term: t, re: new RegExp((t.substring ? '' : '\\b') + esc(typeof t === 'string' ? t : t.term) + (t.substring ? '' : '\\b'), 'i') })) : [];
const ALLOW_OPERATING_DEMO = ['components/signature/signature.card.html','guidelines/states-certainty.html','guidelines/states-release.html','components/signature/StateMark.prompt.md'];

function walk(dir, out=[]) { for (const n of fs.readdirSync(dir)) { const p = path.join(dir, n); const rel = path.relative(ROOT, p).split(path.sep).join('/'); if (SKIP.some(r=>r.test(rel))) continue; const st = fs.statSync(p); if (st.isDirectory()) walk(p, out); else if (TEXT.test(n)) out.push(rel); } return out; }
const files = walk(ROOT); const fails = [], warns = [];
for (const f of files) {
  const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const ledger = LEDGER_ALLOW.includes(f);
  for (const re of BANNED) { const m = t.match(re); if (m && !ledger) fails.push(`[restricted-content] ${f} :: ${m[0]}`); }
  for (const re of CLAIMS_BANNED) { const m = t.match(re); if (m && !ledger) fails.push(`[claims-register-banned] ${f} :: ${m[0]}`); }
  for (const re of PLACEHOLDER) { const m = t.match(re); if (m && !ledger) fails.push(`[placeholder-identity] ${f} :: ${m[0]}`); }
  for (const re of RESTRICTED) { const m = t.match(re); if (m && !RESTRICTED_ALLOW.includes(f)) fails.push(`[restricted-name] ${f} :: ${m[0]}`); }
  if (PUBLIC) for (const re of OPERATING) { const m = t.match(re); if (m && !ALLOW_OPERATING_DEMO.includes(f)) fails.push(`[operating-only-in-public] ${f} :: ${m[0]}`); }
  if (PUBLIC && /^templates\//.test(f)) {
    const text = t.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    for (const { term, re } of VOCAB_RE) { const m = text.match(re); if (m) warns.push(`[public-vocabulary] ${f} :: "${m[0]}"`); }
    if (/\u2014/.test(text)) warns.push(`[public-vocabulary] ${f} :: em dash (U+2014) — blocked anywhere in public text`);
    if (/ \u2013 /.test(text)) warns.push(`[public-vocabulary] ${f} :: en dash (U+2013) surrounded by spaces`);
  }
  // Numeric figures presented as confirmed outside the Claims Register set
  const nums = t.match(/certainty:\s*'confirmed'[^}]*value:\s*'[^']*\d[^']*'/g) || [];
  for (const n of nums) if (!/claims register|role record|wording/i.test(n)) warns.push(`[figure-as-confirmed] ${f} :: ${n.slice(0,80)}`);
}
console.log(`Carry release check — ${files.length} files${PUBLIC?' (public build)':''}`);
warns.forEach(w=>console.log('WARN  '+w)); fails.forEach(x=>console.log('FAIL  '+x));
console.log(fails.length ? `\n${fails.length} failure(s)` : '\nclean');
process.exit(fails.length ? 1 : 0);
}
