# Carry v0.9.1 — delta report

**Date:** 11 Sep 2026 · **From:** v0.9 (10 Sep) · **Certainty of this report:** confirmed for what was changed; provisional for what was measured (see §6) · **Release:** review required — Salman.

## 1. What changed and why

| area | change | why |
|---|---|---|
| Truth integrity | Every invented or restricted-source example removed (§4). Templates now ship one of three declared content kinds: `[placeholder]`, *illustrative example — not Salman evidence*, or verified Claims-Register wording. | v0.9 rendered fictional healthcare/migration content and unsupported Salman figures as Confirmed — a direct breach of the system's own doctrine. |
| State model | One axis → three: certainty (fill), actionability (bar), release (text). `superseded` history-only; `proposed` retired (it was a release state wearing a certainty costume). Legacy `state="gated"` still accepted and normalised. | "Gated" and "Confirmed" were competing for one slot; release approval had no home and risked implying confirmation. |
| Storytelling | `Composition` with seven forms; `Threshold fn` with six tick functions. `HandleTruth` kept as the first form. | Handle/Operating Truth was becoming the only story and every artifact a reveal. |
| Breadth | Examples re-based on discovery, product creation, marketplace payments, multi-tenant SaaS, AI planning, commercial judgment — from the current résumé. | v0.9 over-indexed on audits, gates and custody. |
| Public language | Internal terms kept in docs/schemas; public copy simplified (`docs/rules.md`, `guidelines/voice-public.html`). "Decision underneath:" survives only in the handle-truth form; other forms lead with *So / Next / Open / Recommendation / Kept*. | The system was announcing its own methodology. |
| Rule hierarchy | Invariants / strong defaults / mode-dependent choices (`docs/rules.md`). Cards, emphasis, portrait photography and warmer voice moved from "never" to mode-dependent. | Absolute aesthetic laws were doing the job of judgment. |
| Mobile | Social evidence 26 → 40px source; headline 132 → 100px; labels removed; metadata to caption. Carousel 5 → 4 panels, same rules. | 26px on 1080 ≈ 8.7px on a phone: the argument was unreadable. |
| Packages | Internal vs distributable manifest, licences, version, template-vs-evidence statement, restricted-content scan + `scripts/release-check.js`. | The v0.9 zip carried PureLogics/QuickTake material. |
| Fixes | Print inversion implemented (`@media print`); counts corrected (21 components; 16 → 20 cards); Notion sources named not linked; token `@kind` annotations kept; roadmap updated. | §10 of the brief. |

## 2. Revised state architecture
See `docs/state-architecture.md`. Summary: **certainty** confirmed · provisional · unknown (· superseded) → fill; **actionability** actionable · gated{gate, owner, clears, review} → bar; **release** internal · review · approved · restricted → text tag. Axes appear only when relevant. Public build fails on superseded / internal / restricted / unknown key / missing `release: approved`.

## 3. Revised rule hierarchy
See `docs/rules.md` — 8 invariants, 8 strong defaults, 6 mode-dependent choices, public-language table.

## 4. Content-removal and replacement ledger

| removed (v0.9) | where | replaced with | kind |
|---|---|---|---|
| "3 regulated platforms shipped", "audit passed with no integration findings (Q3 2026)", "4 weeks of rework avoided" | resume-header | Claims-Register proof line: enterprise win wording · 3–5 days → ~1 day (self-reported, one function) · AI prototype-to-production plan | verified |
| "path chosen in 9 days", "~4 weeks of integration", "audit passed", fictional board minutes / audit summary, Path A/B/C grid, "regulated healthcare platform 2025–26" | case-study | Enterprise healthcare proposal case from the Claims Register; figures removed; delivery scope marked Provisional · gated DEC-016; contract value marked confirmed-but-never-external | verified |
| "The vendor migrates the data", 2.1M records · 6 batches · 9 days, SOW §4.2, patient-data cut-over custody, ward clerks, steering group chair, regulator | executive-deck, proposal-document | Executive introduction built from résumé (who · how · done · next); proposal-document → neutral `[placeholders]` | verified / placeholder |
| Kiosk session, degradation buffer, clinical exports, sponsor analytics, D-114 ingest contract | systems-diagram, diagram card, LoadNode prompt | Generic marketplace transaction journey (checkout → ledger → escrow; KYC → wallets → bank rails), labelled illustrative | illustrative |
| Roster / 11 named / 6.5 FTE / staffing plan v3 / J. Ortiz / "commit to six or move the date" | social-graphic, carousel, signature card, type cards, voice card, readme, prompts | "Users don't want a chatbot. They want the answer." — a product-discovery example labelled illustrative; voice card re-written on an estimation example | illustrative |
| salman@example.com · +1 000 000 0000 · Toronto / remote | resume-header | Contact and location from the 9 Sep résumé (Lahore; outlook address; LinkedIn URL) | verified |
| Fictional "Strategic Intelligence OS" and Claims Register links as placeholders | readme | Named as internal sources; not linked | — |
| `proposed` state; `gated` as a certainty | tokens, StateMark, docs | three-axis model | — |

Grep of the banned list across `templates/`, `components/`, `guidelines/`, `tokens/`, `readme.md`, `docs/`, `SKILL.md`: 0 hits except PureLogics as *employer name* in case-study and executive-deck (allowed) and *reference name* in governance/engine docs (allowed). Not invented: any replacement achievement.

## 5. Validation artifacts (rendered)
- **A. Verified case study** — `templates/case-study/CaseStudy.dc.html`. Problem · judgment · what was built · evidence strength per work product (Matrix) · consequence · next decision (verify shipped vs proposed before adding delivery claims). Wording from the Claims Register; client unnamed; contract value never shown.
- **B. Mobile-readable LinkedIn graphic + carousel** — `templates/social-graphic/`, `templates/carousel/`. Topic: product discovery / technical translation ("AI assistant" → status lookup). Illustrative.
- **C. Executive / consulting introduction** — `templates/executive-deck/ExecutiveDeck.dc.html`. Four slides: who (optional portrait slot) · how I work · what I've done (verified wording, evidence marks) · a first engagement. No contract values, growth rates or user counts.
- **D. Personal artifact** — `templates/personal-post/`. Intention / reflection form, small tick, warmer voice, one line that bridges to product work without making fitness the headline.

## 6. Mobile-readability evidence (measured in the live render)
Social graphic, 1080 source, no overflow. Displayed sizes computed from measured source sizes:

| element | source | at 360px | at 320px | pass ≥12px? |
|---|---|---|---|---|
| headline | 100px | 33.3px | 29.6px | yes |
| evidence rows (2) | 40px | 13.3px | 11.9px | yes / borderline at 320 (≥ 11.9) |
| lead ("So: …") | 46px | 15.3px | 13.6px | yes |
| wordmark | 30px | 10px | 8.9px | metadata — allowed |
| "illustrative example" | 24px | 8px | 7.1px | metadata — allowed; move to caption on publish |

Screenshots: `docs/evidence/01-social-mobile.jpg` (360px scale), `02-…` (320px scale), `03-…` (360px greyscale). The argument survives all three. Carousel uses the same sizes (40–44px evidence) and was not separately screenshot-measured — **provisional**.

## 7. Package manifest
`docs/package-manifest.md`. Internal source package = whole project. Distributable excludes `uploads/`, `strategy/`, `github.md`; includes licences, version 0.9.1, template-vs-evidence statement, scan results.

## 8. Corrected zip
Distributable set = project minus `uploads/`, `strategy/`, `github.md` (`docs/package-manifest.md`). A staged copy was served for download this turn and then removed from the project, because the compiler treats any second `components/` tree as duplicate exports. Build future zips outside the project.

## 9. Open decisions requiring Salman
1. **Identity approval** — does v0.9.1 feel like you? (Instrument Sans as the plain voice; ochre warmth; the tick vocabulary.)
2. **DEC-016 / DEC-015** — shipped vs proposed delivery scope; product naming. Until resolved, case-study delivery row stays Provisional · gated.
3. **Team-scale claim (8 → 25+)** is on hold in the Register — kept out; confirm it stays out.
4. **Portrait** — supply a natural-light photo or remove the slot from the introduction deck.
5. **Licence** for the distributable (personal use only vs open).
6. **Public build owner** — who runs `release-check.js --public` before each publish (default: you).
7. **Engine adoption** — approve the `system: carry` contract changes before any repo work.

## 10. Recommendation on v1.0
**Not yet — one review cycle away.** The invariants now hold in the artifacts (no invented evidence, three axes, release separated, mobile readable, restricted material excluded from the distributable). What remains is human: identity approval (1), two Register decisions (2), and a Node run of the release check outside this environment. If those clear without design changes, tag v1.0 from this state; if identity approval asks for visual changes, expect a v0.9.2 first.
