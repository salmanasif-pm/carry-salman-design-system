// Compatibility entry: the check itself is scripts/release-check.cjs (CommonJS regardless of package scope).
// Dynamic import works from both CommonJS and ES-module scopes, so `node scripts/release-check.js --public` keeps working.
import('./release-check.cjs').catch((e) => { console.error(e && e.message ? e.message : e); process.exit(1); });
