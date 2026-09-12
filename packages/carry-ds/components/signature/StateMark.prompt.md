Three-axis state marker: certainty (fill), actionability (bar), release (text tag). Show an axis only when it changes what the reader should do.
```jsx
<StateMark certainty="confirmed" />
<StateMark certainty="confirmed" gated={{gate:'legal review', owner:'named owner', clears:'signed NDA', review:'24 Sep'}} />
<StateMark certainty="unknown" label="Not yet measured" />
<StateMark certainty="provisional" release="review" />
```
`wording="plain"` swaps internal words for public ones (working view · not yet settled · waiting on {gate}); use it on every public render — "gated" is on the public banned list.

Certainty: confirmed · provisional · unknown (+ superseded, operating history only). Gated is not a certainty — a Confirmed fact can be gated. Release: internal · review · approved · restricted; approval never implies confirmation and confirmation never implies permission to publish. Invalid keys render a visible invalid mark.

Content Brief certainty values map via `BRIEF_CERTAINTY`: `<StateMark {...BRIEF_CERTAINTY[brief.certainty]} wording="plain"/>` — inferred = outline, assumed = dotted outline, proposed = horizontal hatch, gated = hatch + bar, unresolved/missing = hatch.