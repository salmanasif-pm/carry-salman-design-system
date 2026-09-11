Diagram node. Edge style carries certainty (solid / dashed / dotted); `gated` adds a bar; `carries` makes it the solid load-bearing anchor. Illustrative content only — never client systems.
```jsx
<LoadNode kind="store" title="Order ledger" subtitle="append-only" carries owner="platform" />
<LoadNode kind="external" title="Partner API" certainty="provisional" />
<LoadNode kind="decision" title="Vendor contract" gated={{gate:'legal', owner:'named owner'}} />
```