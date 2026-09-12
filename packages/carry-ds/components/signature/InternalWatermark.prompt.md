INTERNAL watermark for any artifact whose release gate failed. Parent must be position:relative. There is no prop to hide it — the renderer either mounts it or refuses to render.
```jsx
<div style={{position:'relative'}}> …artifact… <InternalWatermark reason="release_permission=internal_only · approval=needs_human_review"/></div>
```