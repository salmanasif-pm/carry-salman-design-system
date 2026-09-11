# 0008 — Proposal template footer declares `release="review"`

**State:** Open (application layer) · **Owner:** Salman Asif · **Date:** 2026-09-11 · **Affects:** `templates/proposal-document/ProposalDocument.dc.html` (`HandoffFooter`)

**Decision.** The proposal-document template ships neutral `[placeholders]` and a footer state "Draft". Its release tag changes from `internal` to `review`: a drafted artifact awaiting a named approver is exactly what "review required" means in `docs/state-architecture.md` C, while `internal` describes operating material that is not meant to leave at all. The template is a starting point that does leave, once approved.

**Options considered.** Adding the template to `ALLOW_OPERATING_DEMO` (rejected: that list is for cards that deliberately demonstrate operating-only states; a template should carry its true state). Removing the release tag (rejected: the footer of a shareable artifact declares release by rule).

**Trade-off.** None on rendering; the tag text changes from "internal" to "review required".

**Reopens if.** The release vocabulary changes (0004), or the template is re-scoped to internal-only use.
