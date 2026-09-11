Bridge-language table (decision matrix, condition grid, RACI, own/support/outside). Cells may carry certainty/gate marks; one row may be emphasised.
```jsx
<Matrix caption="Illustrative example — not Salman evidence" columns={['Ships this quarter','Needs partner API','Reversible']}
  rows={[{label:'Option A', cells:['yes', {value:'no', certainty:'confirmed'}, 'no']},
         {label:'Option B', emphasis:true, cells:[{value:'likely', certainty:'provisional'}, 'yes', 'yes']}]} />
```
Use "—" for a legitimately empty cell.