Staged path with a current-step marker; use instead of before/after arrows or hype timelines.
```jsx
<ProgressionLadder current={2} steps={[
  {label:'Signal', note:'users ask one question'},{label:'Framing'},{label:'Validation', certainty:'provisional'},
  {label:'Controlled test', gated:{gate:'pricing review'}},{label:'Decision'},{label:'Execution'}]} />
```