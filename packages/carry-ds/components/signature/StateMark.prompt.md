Three-axis state marker: certainty (fill), actionability (bar), release (text tag). Show an axis only when it changes what the reader should do.
```jsx
<StateMark certainty="confirmed" />
<StateMark certainty="confirmed" gated={{gate:'legal review', owner:'named owner', clears:'signed NDA', review:'24 Sep'}} />
<StateMark certainty="unknown" label="Not yet measured" />
<StateMark certainty="provisional" release="review" />
```
Certainty: confirmed · provisional · unknown (+ superseded, operating history only). Gated is not a certainty — a Confirmed fact can be gated. Release: internal · review · approved · restricted; approval never implies confirmation and confirmation never implies permission to publish. Invalid keys render a visible invalid mark.
