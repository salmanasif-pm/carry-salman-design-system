# 0007 — Release gate hardening: CommonJS check, loud guard, ledger allow-list

**State:** Open (tooling) · **Owner:** Salman Asif · **Date:** 2026-09-11 · **Affects:** `scripts/release-check.cjs`, `scripts/release-check.js`, `components/signature/Composition.d.ts`, `readme.md`, `docs/package-manifest.md`; workspace `scripts/release-gate.mjs`

**Decision.**
1. The check is `scripts/release-check.cjs`. Inside an ES-module package scope a `.js` file is parsed as ESM, `require` is undefined, and the former browser guard turned the entire check into a silent exit 0. The guard now throws. `scripts/release-check.js` remains as a thin entry that dynamically imports the `.cjs`, so every documented command still works.
2. `docs/delta-report-v0.9.1.md` is a removal ledger and quotes the strings it removed; it is the only file allowed to contain banned, claims-banned or placeholder-identity wording (`LEDGER_ALLOW`). `docs/handoff-claude-code.md` and `assets/fonts/fonts-manifest.json` join `RESTRICTED_ALLOW`: both name the engine repository as a target or download path, not as brand material.
3. `Composition.d.ts` declares `CARRY_FORMS` and `CarryForm`, which `Composition.jsx` already exported. Typing only; no semantic change.

**Options considered.** Moving the ledger to `strategy/` (rejected: the ledger is what proves the v0.9 cleanup happened and belongs in the distributable). Shortening the font source note (rejected: provenance of a binary should stay complete). Leaving the guard silent and relying on the workspace wrapper (rejected: a gate that can pass by accident is not a gate).

**Trade-off.** An allow-list is a place where a leak could hide; it is limited to one named file and reviewed with the delta report.

**Evidence.** First run of the check under Node, 2026-09-11: 24 findings, none a content leak (`docs/plan/implementation-plan.md` §1 in the workspace). The package manifest recorded that the script had never been run under Node.

**Release pointer.** Releases are identified by commit and a `release/carry-vX.Y.Z` branch; the engine pins files by hash.

**Reopens if.** A future ledger needs the same allowance (add the file, not a pattern); the design tool's compiler starts loading `scripts/*.cjs`.
