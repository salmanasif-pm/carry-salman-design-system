/* @ds-bundle: {"format":4,"namespace":"DesignSystem_79e114","components":[{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Matrix","sourcePath":"components/data/Matrix.jsx"},{"name":"BoundaryFrame","sourcePath":"components/diagram/BoundaryFrame.jsx"},{"name":"Connector","sourcePath":"components/diagram/Connector.jsx"},{"name":"Legend","sourcePath":"components/diagram/Legend.jsx"},{"name":"LoadLane","sourcePath":"components/diagram/LoadLane.jsx"},{"name":"LoadNode","sourcePath":"components/diagram/LoadNode.jsx"},{"name":"ProgressionLadder","sourcePath":"components/diagram/ProgressionLadder.jsx"},{"name":"CARRY_FORMS","sourcePath":"components/signature/Composition.jsx"},{"name":"Composition","sourcePath":"components/signature/Composition.jsx"},{"name":"ConsequenceNote","sourcePath":"components/signature/ConsequenceNote.jsx"},{"name":"CounterpointRail","sourcePath":"components/signature/CounterpointRail.jsx"},{"name":"DecisionLine","sourcePath":"components/signature/DecisionLine.jsx"},{"name":"EvidenceStrip","sourcePath":"components/signature/EvidenceStrip.jsx"},{"name":"HandleTruth","sourcePath":"components/signature/HandleTruth.jsx"},{"name":"HandoffFooter","sourcePath":"components/signature/HandoffFooter.jsx"},{"name":"Provenance","sourcePath":"components/signature/Provenance.jsx"},{"name":"CARRY_CERTAINTY","sourcePath":"components/signature/StateMark.jsx"},{"name":"CARRY_OPERATING_CERTAINTY","sourcePath":"components/signature/StateMark.jsx"},{"name":"CARRY_RELEASE","sourcePath":"components/signature/StateMark.jsx"},{"name":"StateMark","sourcePath":"components/signature/StateMark.jsx"},{"name":"Threshold","sourcePath":"components/signature/Threshold.jsx"}],"sourceHashes":{"components/brand/Wordmark.jsx":"86dcbf8f4e47","components/core/Button.jsx":"8249d6efeadf","components/data/Matrix.jsx":"8fdde46c3d60","components/diagram/BoundaryFrame.jsx":"9265f41f9ba3","components/diagram/Connector.jsx":"146f1d72f86a","components/diagram/Legend.jsx":"0041c62d54d3","components/diagram/LoadLane.jsx":"3864c3eaaae6","components/diagram/LoadNode.jsx":"7614f151c521","components/diagram/ProgressionLadder.jsx":"1d7453adaeb9","components/signature/Composition.jsx":"9b6254fb57a1","components/signature/ConsequenceNote.jsx":"df202e09f685","components/signature/CounterpointRail.jsx":"9a9e0a606761","components/signature/DecisionLine.jsx":"4864d3d3ff03","components/signature/EvidenceStrip.jsx":"3a1a2b50b377","components/signature/HandleTruth.jsx":"47cf18636cd8","components/signature/HandoffFooter.jsx":"408615b62b84","components/signature/Provenance.jsx":"f724a8ab050f","components/signature/StateMark.jsx":"626b8ca908f6","components/signature/Threshold.jsx":"6e495e0df90c","scripts/release-check.js":"b590886c34ed"},"inlinedExternals":[],"unexposedExports":[{"name":"normalizeState","sourcePath":"components/signature/StateMark.jsx"}]} */

(() => {

const __ds_ns = (window.DesignSystem_79e114 = window.DesignSystem_79e114 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
/** Type-only wordmark. No monogram. 'lockup' sets the name on a threshold with the tick. */
function Wordmark({
  variant = 'full',
  name = 'Salman Asif',
  title = 'Technical Product Manager',
  sub = 'Product Strategy, AI & Complex Platforms',
  size = 44,
  style
}) {
  if (variant === 'lockup') return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      position: 'relative',
      paddingBottom: 6,
      borderBottom: 'var(--stroke-threshold) solid var(--rule-strong)',
      font: `var(--weight-handle) ${size}px/1 var(--font-handle)`,
      letterSpacing: '-.02em',
      color: 'var(--ink)',
      ...style
    }
  }, name, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      bottom: -5,
      width: 8,
      height: 8,
      background: 'var(--signal)'
    }
  }));
  if (variant === 'name') return /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-handle) ${size}px/1 var(--font-handle)`,
      letterSpacing: '-.03em',
      color: 'var(--ink)',
      ...style
    }
  }, name);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: size * .9,
      alignItems: 'center',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-handle) ${size}px/1 var(--font-handle)`,
      letterSpacing: '-.03em',
      color: 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',
      color: 'var(--ink-2)'
    }
  }, title, /*#__PURE__*/React.createElement("br", null), sub));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/** Web/product action. Square corners, ink fill. 'signal' only for the one action the artifact asks for. */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  onClick,
  type = 'button',
  style
}) {
  const pad = size === 'sm' ? '8px 12px' : size === 'lg' ? '14px 22px' : '11px 16px';
  const fs = size === 'sm' ? '14px' : size === 'lg' ? '17px' : '15px';
  const v = {
    primary: {
      background: 'var(--ink)',
      color: 'var(--on-ink)',
      border: 'var(--stroke) solid var(--ink)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--ink)',
      border: 'var(--stroke) solid var(--ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-2)',
      border: 'var(--stroke) solid transparent'
    },
    signal: {
      background: 'var(--signal)',
      color: 'var(--on-signal)',
      border: 'var(--stroke) solid var(--signal)'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...v,
      padding: pad,
      font: `600 ${fs}/1 var(--font-handle)`,
      borderRadius: 'var(--radius-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      minHeight: 44,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background var(--dur-confirm) var(--ease-standard)',
      ...style
    },
    onMouseEnter: e => {
      if (!disabled && variant !== 'ghost') e.currentTarget.style.filter = 'brightness(.92)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = '';
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/diagram/BoundaryFrame.jsx
try { (() => {
/** Inside/outside, own/support, committed/optional, now/later — with intentional connection points. Boundaries have dignity: ink frame, no warning colour. */
function BoundaryFrame({
  label,
  meta,
  children,
  outside,
  outsideLabel = 'outside this commitment',
  ports = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-boundary": true,
    style: {
      display: 'grid',
      gridTemplateColumns: outside ? '1fr minmax(160px,.4fr)' : '1fr',
      gap: 'var(--sp-6)',
      alignItems: 'start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: 'var(--stroke-threshold) solid var(--constraint)',
      padding: 'var(--sp-6) var(--sp-5) var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -9,
      left: 'var(--sp-5)',
      background: 'var(--ground)',
      padding: '0 var(--sp-3)',
      font: 'var(--weight-body-strong) var(--text-body-s)/1 var(--font-handle)',
      color: 'var(--ink)'
    }
  }, label, meta && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/1 var(--font-truth)',
      color: 'var(--ink-3)',
      marginLeft: 'var(--sp-3)'
    }
  }, meta)), children, ports.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: p,
    style: {
      position: 'absolute',
      right: -7,
      top: `calc(${(i + 1) * 100 / (ports.length + 1)}% - 6px)`,
      width: 12,
      height: 12,
      background: 'var(--signal)'
    }
  }))), outside && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--sp-4) 0',
      borderTop: 'var(--stroke-hair) dashed var(--ink-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 var(--text-label)/1 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 'var(--sp-3)'
    }
  }, outsideLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-body) var(--text-body-s)/var(--lh-body-s) var(--font-body)',
      color: 'var(--ink-2)'
    }
  }, outside)));
}
Object.assign(__ds_scope, { BoundaryFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/BoundaryFrame.jsx", error: String((e && e.message) || e) }); }

// components/diagram/Connector.jsx
try { (() => {
/** Inline connector between nodes. Line style = certainty. Label in the truth register. */
function Connector({
  certainty = 'confirmed',
  label,
  direction = 'right',
  length = 56,
  style
}) {
  const ls = {
    confirmed: 'solid',
    provisional: 'dashed',
    unknown: 'dotted'
  }[certainty] || 'solid';
  const vert = direction === 'down';
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-connector": true,
    style: {
      display: 'flex',
      flexDirection: vert ? 'column' : 'row',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      alignSelf: 'center',
      ...style
    }
  }, label && !vert && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/1 var(--font-truth)',
      color: 'var(--ink-3)',
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'block',
      width: vert ? 0 : length,
      height: vert ? length : 0,
      borderTop: vert ? 'none' : `var(--stroke) ${ls} var(--ink)`,
      borderLeft: vert ? `var(--stroke) ${ls} var(--ink)` : 'none',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: vert ? -3 : -1,
      bottom: vert ? -1 : -3.5,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: vert ? '6px 3.5px 0 3.5px' : '3.5px 0 3.5px 6px',
      borderColor: vert ? 'var(--ink) transparent transparent transparent' : 'transparent transparent transparent var(--ink)'
    }
  })), label && vert && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/1 var(--font-truth)',
      color: 'var(--ink-3)'
    }
  }, label));
}
Object.assign(__ds_scope, { Connector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/Connector.jsx", error: String((e && e.message) || e) }); }

// components/diagram/LoadLane.jsx
try { (() => {
/** A horizontal band of nodes sharing ownership or boundary. Lanes are ink rules, not coloured bands. */
function LoadLane({
  label,
  meta,
  children,
  boundary = false,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-carry-lane": true,
    style: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: 'var(--sp-5)',
      padding: 'var(--sp-4) 0',
      borderTop: boundary ? 'var(--stroke-threshold) solid var(--rule-strong)' : 'var(--stroke-hair) solid var(--rule)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-body-strong) var(--text-body-s)/1.3 var(--font-handle)',
      color: 'var(--ink)'
    }
  }, label), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',
      color: 'var(--ink-3)',
      marginTop: 'var(--sp-1)'
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-5)',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
  }, children));
}
Object.assign(__ds_scope, { LoadLane });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/LoadLane.jsx", error: String((e && e.message) || e) }); }

// components/signature/ConsequenceNote.jsx
try { (() => {
/** The human layer: what this changes for a person, team or client. One sentence, on the warmth surface. */
function ConsequenceNote({
  who = 'the team',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-consequence": true,
    style: {
      background: 'var(--warmth)',
      padding: 'var(--sp-4) var(--sp-5)',
      maxWidth: 'var(--measure)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 var(--text-label)/1 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 'var(--sp-3)'
    }
  }, "what this changes for ", who), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-body) var(--text-body-s)/var(--lh-body-s) var(--font-body)',
      color: 'var(--ink)'
    }
  }, children));
}
Object.assign(__ds_scope, { ConsequenceNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/ConsequenceNote.jsx", error: String((e && e.message) || e) }); }

// components/signature/CounterpointRail.jsx
try { (() => {
/** The strongest qualification, failure mode or condition that would change the recommendation. */
function CounterpointRail({
  children,
  label = 'counterpoint',
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    "data-carry-counterpoint": true,
    style: {
      borderTop: 'var(--stroke-hair) solid var(--rule)',
      paddingTop: 'var(--sp-4)',
      maxWidth: 'var(--measure)',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--sp-5)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 var(--text-label)/1.4 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-body) var(--text-body-s)/var(--lh-body-s) var(--font-body)',
      color: 'var(--ink-2)'
    }
  }, children));
}
Object.assign(__ds_scope, { CounterpointRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/CounterpointRail.jsx", error: String((e && e.message) || e) }); }

// components/signature/DecisionLine.jsx
try { (() => {
/** One prominent sentence: the decisive interpretation, recommendation or question. One per artifact. */
function DecisionLine({
  children,
  kind = 'decision',
  reopens,
  style
}) {
  const prefix = {
    decision: 'Decision',
    recommendation: 'Recommendation',
    question: 'Question',
    refusal: 'Not doing'
  }[kind] || 'Decision';
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-decision": true,
    style: {
      maxWidth: 'var(--measure)',
      font: 'var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle)',
      letterSpacing: 'var(--ls-decision)',
      color: 'var(--ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--signal-text)'
    }
  }, prefix, ": "), children, reopens && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--sp-3)',
      font: 'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',
      color: 'var(--ink-3)'
    }
  }, "reopens if \xB7 ", reopens));
}
Object.assign(__ds_scope, { DecisionLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/DecisionLine.jsx", error: String((e && e.message) || e) }); }

// components/signature/Provenance.jsx
try { (() => {
/** Source ancestry: what this came from, what changed, what it supersedes. Respects --provenance-lines per mode unless maxLines is set. */
function Provenance({
  sources = [],
  version,
  date,
  supersedes,
  changed,
  maxLines,
  style
}) {
  const rows = [];
  sources.forEach(s => rows.push(['src', s]));
  if (version || date) rows.push(['ver', [version, date].filter(Boolean).join(' · ')]);
  if (supersedes) rows.push(['supersedes', supersedes]);
  if (changed) rows.push(['changed', changed]);
  const lim = maxLines ?? 99;
  const shown = rows.slice(0, lim);
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-provenance": true,
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',
      color: 'var(--ink-3)',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--sp-1) var(--sp-4)',
      ...style
    }
  }, shown.map(([k, v], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-2)'
    }
  }, v))), rows.length > shown.length && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "+", rows.length - shown.length, " more in the working copy")));
}
Object.assign(__ds_scope, { Provenance });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/Provenance.jsx", error: String((e && e.message) || e) }); }

// components/signature/StateMark.jsx
try { (() => {
const CARRY_CERTAINTY = ['confirmed', 'provisional', 'unknown'];
const CARRY_OPERATING_CERTAINTY = ['superseded'];
const CARRY_RELEASE = ['internal', 'review', 'approved', 'restricted'];
const CLABEL = {
  confirmed: 'Confirmed',
  provisional: 'Provisional',
  unknown: 'Unknown',
  superseded: 'Superseded'
};
const RLABEL = {
  internal: 'internal',
  review: 'review required',
  approved: 'approved',
  restricted: 'restricted'
};
/** Legacy single key → axes. 'gated' was never a certainty: it maps to provisional + gated. */
function normalizeState(p) {
  let {
    certainty,
    gated,
    state
  } = p;
  if (state && !certainty) {
    if (state === 'gated') {
      certainty = 'provisional';
      gated = gated ?? true;
    } else if (state === 'proposed') {
      certainty = 'provisional';
    } else certainty = state;
  }
  return {
    certainty,
    gated
  };
}
/** Three-axis marker: certainty = fill, actionability = bar, release = text tag. Each axis appears only when given. */
function StateMark({
  certainty,
  gated,
  gate,
  owner,
  clears,
  review,
  release,
  state,
  label,
  size = 14,
  showLabel = true,
  style
}) {
  const n = normalizeState({
    certainty,
    gated,
    state
  });
  const c = n.certainty,
    g = n.gated;
  const ok = c === undefined || CLABEL[c] !== undefined;
  const cc = ok ? c : 'unknown';
  const gateObj = typeof g === 'object' && g ? g : {
    gate,
    owner,
    clears,
    review
  };
  const isGated = !!g;
  const w = style?.width ?? size,
    h = style?.height ?? size;
  const box = {
    width: w,
    height: h,
    flex: 'none',
    display: 'inline-block',
    boxSizing: 'border-box',
    position: 'relative',
    marginTop: '.3em',
    background: cc === 'confirmed' ? 'var(--fill-confirmed)' : cc === 'unknown' ? 'var(--fill-unknown)' : cc === 'superseded' ? 'var(--fill-superseded)' : 'transparent',
    border: cc === 'provisional' || cc === undefined ? 'var(--stroke) solid var(--ink)' : 'none'
  };
  const bar = isGated ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: -2,
      right: -2,
      top: '50%',
      height: 'max(2px,var(--gate-bar-size))',
      transform: 'translateY(-50%)',
      background: 'var(--gate-bar)'
    }
  }) : null;
  const parts = [];
  if (!ok) parts.push('invalid certainty: ' + String(c));else if (label) parts.push(label);else if (cc) parts.push(CLABEL[cc]);
  if (isGated) parts.push(['gated', gateObj.gate ? 'on ' + gateObj.gate : null].filter(Boolean).join(' '));
  const text = parts.join(' · ');
  const meta = isGated ? [gateObj.owner ? 'owner ' + gateObj.owner : null, gateObj.clears ? 'clears when ' + gateObj.clears : null, gateObj.review ? 'review ' + gateObj.review : null].filter(Boolean).join(' · ') : '';
  const rel = release ? RLABEL[release] || 'invalid release: ' + release : null;
  const outer = {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: 8,
    font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',
    color: ok ? 'var(--ink)' : 'var(--signal-text)'
  };
  if (style) {
    Object.assign(outer, style);
    delete outer.width;
    delete outer.height;
  }
  return /*#__PURE__*/React.createElement("span", {
    style: outer,
    "data-carry-certainty": cc,
    "data-carry-gated": isGated ? 'true' : undefined,
    "data-carry-release": release,
    title: text
  }, /*#__PURE__*/React.createElement("span", {
    style: box,
    "aria-hidden": "true"
  }, bar), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, text, meta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-truth-s)',
      color: 'var(--ink-3)'
    }
  }, meta), rel && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      marginLeft: text ? 8 : 0,
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      border: 'var(--stroke-hair) solid var(--rule)',
      padding: '2px 5px',
      verticalAlign: '1px'
    }
  }, rel)));
}
Object.assign(__ds_scope, { CARRY_CERTAINTY, CARRY_OPERATING_CERTAINTY, CARRY_RELEASE, normalizeState, StateMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/StateMark.jsx", error: String((e && e.message) || e) }); }

// components/data/Matrix.jsx
try { (() => {
/** Bridge-language table: decision matrix, condition grid, RACI, own/support/outside. Structure communicates; cells may carry states. */
function Matrix({
  columns = [],
  rows = [],
  caption,
  firstColWidth = 'minmax(120px,.8fr)',
  style
}) {
  const cellStyle = {
    padding: 'var(--sp-3) var(--sp-4)',
    borderBottom: 'var(--stroke-hair) solid var(--rule)',
    font: 'var(--weight-body) var(--text-body-s)/1.4 var(--font-body)',
    color: 'var(--ink)',
    minWidth: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-matrix": true,
    style: {
      overflowX: 'auto',
      ...style
    }
  }, caption && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-body-strong) var(--text-body-s)/1.3 var(--font-handle)',
      marginBottom: 'var(--sp-3)'
    }
  }, caption), /*#__PURE__*/React.createElement("div", {
    role: "table",
    style: {
      display: 'grid',
      gridTemplateColumns: `${firstColWidth} repeat(${columns.length},minmax(96px,1fr))`
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "columnheader",
    style: {
      ...cellStyle,
      borderBottom: 'var(--stroke-threshold) solid var(--rule-strong)'
    }
  }), columns.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    role: "columnheader",
    style: {
      ...cellStyle,
      borderBottom: 'var(--stroke-threshold) solid var(--rule-strong)',
      font: '400 var(--text-label)/1.3 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)'
    }
  }, c)), rows.map((r, ri) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: ri
  }, /*#__PURE__*/React.createElement("div", {
    role: "rowheader",
    style: {
      ...cellStyle,
      font: 'var(--weight-body-strong) var(--text-body-s)/1.4 var(--font-handle)',
      background: r.emphasis ? 'var(--warmth)' : 'transparent'
    }
  }, r.label, r.note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/1.4 var(--font-truth)',
      color: 'var(--ink-3)',
      fontWeight: 400
    }
  }, r.note)), r.cells.map((c, ci) => {
    const o = typeof c === 'object' && c !== null ? c : {
      value: c
    };
    return /*#__PURE__*/React.createElement("div", {
      key: ci,
      role: "cell",
      style: {
        ...cellStyle,
        background: r.emphasis ? 'var(--warmth)' : 'transparent',
        display: 'flex',
        gap: 'var(--sp-3)',
        alignItems: 'flex-start'
      }
    }, (o.certainty || o.state || o.gated) && /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
      certainty: o.certainty,
      state: o.state,
      gated: o.gated ?? (o.gate ? {
        gate: o.gate
      } : undefined),
      showLabel: false,
      size: 11,
      style: {
        width: '0.75em',
        height: '0.75em'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: o.value === '—' ? {
        color: 'var(--ink-4)'
      } : null
    }, o.value));
  })))));
}
Object.assign(__ds_scope, { Matrix });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Matrix.jsx", error: String((e && e.message) || e) }); }

// components/diagram/Legend.jsx
try { (() => {
/** Diagram legend: states and connector certainty. Render once per diagram, bottom-left. */
function Legend({
  states = ['confirmed', 'provisional', 'unknown'],
  gated = true,
  connectors = true,
  extra = [],
  style
}) {
  const line = (ls, l) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--weight-truth) var(--text-truth)/1 var(--font-truth)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      borderTop: `var(--stroke) ${ls} var(--ink)`
    }
  }), l);
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-legend": true,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--sp-3) var(--sp-6)',
      ...style
    }
  }, states.map(s => /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
    key: s,
    certainty: s,
    size: 11
  })), gated && /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
    certainty: "provisional",
    gated: true,
    label: "gated",
    size: 11
  }), connectors && [line('solid', 'confirmed link'), line('dashed', 'provisional'), line('dotted', 'unknown')], extra.map((e, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: 'var(--weight-truth) var(--text-truth)/1 var(--font-truth)',
      color: 'var(--ink-2)'
    }
  }, e)));
}
Object.assign(__ds_scope, { Legend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/Legend.jsx", error: String((e && e.message) || e) }); }

// components/diagram/LoadNode.jsx
try { (() => {
/** A thing that carries or receives load in a system. Certainty on the edge (solid/dashed/dotted); a gate is a bar across the top. */
function LoadNode({
  title,
  subtitle,
  certainty,
  gated,
  state,
  kind = 'service',
  owner,
  carries = false,
  style
}) {
  const g = gated ?? state === 'gated';
  state = certainty ?? (state === 'gated' ? 'provisional' : state || 'confirmed');
  const border = state === 'provisional' ? 'var(--stroke) dashed var(--ink)' : state === 'unknown' ? 'var(--stroke) dotted var(--ink)' : 'var(--stroke) solid var(--ink)';
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-node": kind,
    style: {
      background: carries ? 'var(--ink)' : 'var(--surface)',
      color: carries ? 'var(--on-ink)' : 'var(--ink)',
      border,
      padding: 'var(--sp-4) var(--sp-5)',
      minWidth: 140,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-2)',
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--sp-3)',
      font: '400 var(--text-label)/1 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: carries ? 'var(--ink-4)' : 'var(--ink-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, kind), owner && /*#__PURE__*/React.createElement("span", null, owner)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-body-strong) var(--text-body-s)/1.3 var(--font-handle)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',
      color: carries ? 'var(--ink-4)' : 'var(--ink-2)'
    }
  }, subtitle), (state !== 'confirmed' || g) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
    certainty: state,
    gated: g,
    size: 10,
    style: carries ? {
      color: 'var(--on-ink)'
    } : null
  })), g && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: -1.5,
      right: -1.5,
      top: -1.5,
      height: 6,
      background: 'var(--ink)'
    }
  }));
}
Object.assign(__ds_scope, { LoadNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/LoadNode.jsx", error: String((e && e.message) || e) }); }

// components/diagram/ProgressionLadder.jsx
try { (() => {
/** Staged path — signal → framing → validation → controlled test → decision → execution — instead of a miraculous before/after arrow. */
function ProgressionLadder({
  steps = [],
  current,
  orientation = 'horizontal',
  style
}) {
  const H = orientation === 'horizontal';
  return /*#__PURE__*/React.createElement("ol", {
    "data-carry-ladder": true,
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: H ? 'row' : 'column',
      gap: H ? 0 : 'var(--sp-4)',
      alignItems: H ? 'flex-start' : 'stretch',
      ...style
    }
  }, steps.map((s, i) => {
    const on = i === current;
    const done = current != null && i < current;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        flex: H ? '1 1 0' : 'none',
        minWidth: 0,
        display: 'flex',
        flexDirection: H ? 'column' : 'row',
        gap: 'var(--sp-3)',
        alignItems: H ? 'stretch' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        width: H ? 'auto' : 24,
        flexDirection: H ? 'row' : 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: H ? '100%' : 2,
        height: H ? 2 : '100%',
        background: i === 0 ? 'transparent' : done || on ? 'var(--ink)' : 'var(--rule)',
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: on ? 14 : 10,
        height: on ? 14 : 10,
        flex: 'none',
        background: done || on ? 'var(--ink)' : 'var(--surface)',
        border: 'var(--stroke) solid var(--ink)',
        boxSizing: 'border-box',
        outline: on ? '3px solid var(--signal)' : 'none',
        outlineOffset: 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: H ? '100%' : 2,
        height: H ? 2 : '100%',
        background: i === steps.length - 1 ? 'transparent' : done ? 'var(--ink)' : 'var(--rule)',
        flex: 1
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: H ? '0 var(--sp-3)' : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: `${on ? 'var(--weight-body-strong)' : 'var(--weight-body)'} var(--text-body-s)/1.3 var(--font-handle)`,
        color: done || on ? 'var(--ink)' : 'var(--ink-3)'
      }
    }, s.label), s.note && /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',
        color: 'var(--ink-3)',
        marginTop: 'var(--sp-1)'
      }
    }, s.note), (s.certainty || s.state || s.gated) && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--sp-2)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
      certainty: s.certainty,
      state: s.state,
      gated: s.gated ?? (s.gate ? {
        gate: s.gate
      } : undefined),
      size: 10
    }))));
  }));
}
Object.assign(__ds_scope, { ProgressionLadder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagram/ProgressionLadder.jsx", error: String((e && e.message) || e) }); }

// components/signature/EvidenceStrip.jsx
try { (() => {
/** Compact second-read layer: source, certainty, gate, delta. Mono, one row per item. */
function EvidenceStrip({
  items = [],
  columns,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-evidence": true,
    style: {
      display: 'grid',
      gridTemplateColumns: columns || 'auto 1fr',
      gap: 'var(--gap-truth) var(--sp-5)',
      font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',
      color: 'var(--evidence)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-3)',
      whiteSpace: 'nowrap'
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      alignItems: 'baseline',
      minWidth: 0,
      color: 'var(--ink)'
    }
  }, (it.certainty || it.state || it.gated) && /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
    certainty: it.certainty,
    state: it.state,
    gated: it.gated ?? (it.gate ? {
      gate: it.gate
    } : undefined),
    release: it.release,
    showLabel: false,
    size: 11,
    style: {
      width: '0.85em',
      height: '0.85em'
    }
  }), /*#__PURE__*/React.createElement("span", null, it.value), it.source && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-3)',
      fontSize: 'var(--text-truth-s)',
      whiteSpace: 'nowrap'
    }
  }, "\xB7 ", it.source)))));
}
Object.assign(__ds_scope, { EvidenceStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/EvidenceStrip.jsx", error: String((e && e.message) || e) }); }

// components/signature/HandoffFooter.jsx
try { (() => {
/** Orientation for the absent presenter: current state, next decision, owner, next artifact. */
function HandoffFooter({
  certainty,
  gated,
  release,
  state,
  stateLabel,
  next,
  owner,
  artifact,
  version,
  date,
  style
}) {
  const cell = (k, v) => v ? /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 var(--text-label)/1 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 'var(--sp-2)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',
      color: 'var(--ink)'
    }
  }, v)) : null;
  return /*#__PURE__*/React.createElement("footer", {
    "data-carry-handoff": true,
    style: {
      borderTop: 'var(--stroke-threshold) solid var(--rule-strong)',
      paddingTop: 'var(--sp-4)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
      gap: 'var(--sp-5)',
      ...style
    }
  }, (certainty || state || gated || release) && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 var(--text-label)/1 var(--font-truth)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginBottom: 'var(--sp-2)'
    }
  }, "state"), /*#__PURE__*/React.createElement(__ds_scope.StateMark, {
    certainty: certainty,
    state: state,
    gated: gated,
    release: release,
    label: stateLabel
  })), cell('next decision', next), cell('owner', owner), cell('next artifact', artifact), cell('version', [version, date].filter(Boolean).join(' · ')));
}
Object.assign(__ds_scope, { HandoffFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/HandoffFooter.jsx", error: String((e && e.message) || e) }); }

// components/signature/Threshold.jsx
try { (() => {
/** The signature rule. fn changes the tick only:
 *  decision (default) solid tick, start · evidence outline tick · progression tick at end · transition tick centred · reflection small tick · separation no tick. */
function Threshold({
  hasTruth = true,
  fn = 'decision',
  orientation = 'horizontal',
  style
}) {
  const V = orientation === 'vertical';
  const showTick = hasTruth && fn !== 'separation';
  const t = {
    position: 'absolute',
    width: 'var(--tick-size)',
    height: 'var(--tick-size)',
    background: 'var(--signal)',
    boxSizing: 'border-box'
  };
  if (fn === 'evidence') Object.assign(t, {
    background: 'transparent',
    border: 'var(--stroke-strong) solid var(--signal)'
  });
  if (fn === 'reflection') Object.assign(t, {
    width: 'calc(var(--tick-size) * .6)',
    height: 'calc(var(--tick-size) * .6)'
  });
  const along = fn === 'progression' ? V ? {
    bottom: 0
  } : {
    right: 0
  } : fn === 'transition' ? V ? {
    top: '50%',
    transform: 'translateY(-50%)'
  } : {
    left: '50%',
    transform: 'translateX(-50%)'
  } : V ? {
    top: 0
  } : {
    left: 0
  };
  const off = fn === 'reflection' ? -2.5 : -5;
  const tick = showTick ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      ...t,
      ...along,
      ...(V ? {
        left: off
      } : {
        top: off
      })
    }
  }) : null;
  if (V) return /*#__PURE__*/React.createElement("div", {
    role: "separator",
    "aria-orientation": "vertical",
    "data-carry-threshold": fn,
    style: {
      position: 'relative',
      width: 'var(--stroke-threshold)',
      alignSelf: 'stretch',
      background: 'var(--rule-strong)',
      margin: '0 var(--threshold-gap)',
      ...style
    }
  }, tick);
  return /*#__PURE__*/React.createElement("div", {
    role: "separator",
    "data-carry-threshold": fn,
    style: {
      position: 'relative',
      height: 'var(--stroke-threshold)',
      background: 'var(--rule-strong)',
      margin: 'var(--threshold-gap) 0',
      ...style
    }
  }, tick);
}
Object.assign(__ds_scope, { Threshold });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/Threshold.jsx", error: String((e && e.message) || e) }); }

// components/signature/Composition.jsx
try { (() => {
/** The Carry composition family. Same DNA — above / line / below — seven relationships. */
const CARRY_FORMS = {
  'handle-truth': {
    above: 'the handle',
    below: 'what is actually going on',
    fn: 'decision',
    lead: 'Decision underneath'
  },
  'claim-support': {
    above: 'the claim',
    below: 'the support',
    fn: 'evidence',
    lead: 'So'
  },
  'outcome-enabled': {
    above: 'the outcome',
    below: 'how it was enabled',
    fn: 'progression',
    lead: 'Next'
  },
  'question-conditions': {
    above: 'the question',
    below: 'what it depends on',
    fn: 'evidence',
    lead: 'Open'
  },
  'direction-consequence': {
    above: 'the direction',
    below: 'what it changes',
    fn: 'decision',
    lead: 'Recommendation'
  },
  'intention-reflection': {
    above: 'the intention',
    below: 'what actually happened',
    fn: 'reflection',
    lead: 'Kept'
  },
  'observation-development': {
    above: 'the observation',
    below: 'where it might go',
    fn: 'transition',
    lead: 'Still forming'
  }
};
const SZ = {
  xl: 'var(--text-handle-xl)/var(--lh-handle-xl)',
  l: 'var(--text-handle-l)/var(--lh-handle-l)',
  m: 'var(--text-handle-m)/var(--lh-handle-m)',
  s: 'var(--text-handle-s)/var(--lh-handle-s)'
};
const LS = {
  xl: 'var(--ls-handle-xl)',
  l: 'var(--ls-handle-l)',
  m: 'var(--ls-handle-m)',
  s: 'var(--ls-handle-s)'
};
function Composition({
  form = 'claim-support',
  above,
  below,
  lead,
  leadLabel,
  aboveLabel,
  belowLabel,
  showLabels = true,
  orientation = 'horizontal',
  aboveSize = 'l',
  style
}) {
  const f = CARRY_FORMS[form] || CARRY_FORMS['claim-support'];
  const lbl = {
    font: '400 var(--text-label)/1 var(--font-truth)',
    letterSpacing: 'var(--ls-label)',
    textTransform: 'uppercase',
    color: 'var(--ink-3)'
  };
  const V = orientation === 'vertical';
  const prose = form === 'intention-reflection' || form === 'observation-development';
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-form": form,
    style: {
      display: 'flex',
      flexDirection: V ? 'row' : 'column',
      alignItems: 'stretch',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 'var(--sp-3)',
      flex: V ? '1 1 0' : 'none',
      minWidth: 0
    }
  }, showLabels && /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, aboveLabel ?? f.above), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-handle) ' + SZ[aboveSize] + ' var(--font-handle)',
      letterSpacing: LS[aboveSize],
      color: 'var(--ink)'
    }
  }, above)), /*#__PURE__*/React.createElement(__ds_scope.Threshold, {
    orientation: orientation,
    fn: f.fn,
    hasTruth: !!below
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-truth)',
      flex: V ? '1 1 0' : 'none',
      minWidth: 0
    }
  }, showLabels && /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, belowLabel ?? f.below), /*#__PURE__*/React.createElement("div", {
    style: {
      font: prose ? 'var(--weight-body) var(--text-body)/var(--lh-body) var(--font-body)' : 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',
      color: 'var(--ink)'
    }
  }, below), lead && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--gap-block)',
      font: 'var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle)',
      letterSpacing: 'var(--ls-decision)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--signal-text)'
    }
  }, leadLabel ?? f.lead, ": "), lead)));
}
Object.assign(__ds_scope, { CARRY_FORMS, Composition });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/Composition.jsx", error: String((e && e.message) || e) }); }

// components/signature/HandleTruth.jsx
try { (() => {
/** Specialised first form of Composition: a visible handle (label, metric, request) above the line, what is actually going on below. Use Composition for the other six forms. */
function HandleTruth({
  handle,
  truth,
  decision,
  handleLabel = 'the handle',
  truthLabel = 'the operating truth',
  showLabels = true,
  orientation = 'horizontal',
  handleSize = 'l',
  style
}) {
  const sz = {
    xl: 'var(--text-handle-xl)/var(--lh-handle-xl)',
    l: 'var(--text-handle-l)/var(--lh-handle-l)',
    m: 'var(--text-handle-m)/var(--lh-handle-m)',
    s: 'var(--text-handle-s)/var(--lh-handle-s)'
  }[handleSize];
  const ls = {
    xl: 'var(--ls-handle-xl)',
    l: 'var(--ls-handle-l)',
    m: 'var(--ls-handle-m)',
    s: 'var(--ls-handle-s)'
  }[handleSize];
  const lbl = {
    font: '400 var(--text-label)/1 var(--font-truth)',
    letterSpacing: 'var(--ls-label)',
    textTransform: 'uppercase',
    color: 'var(--ink-3)'
  };
  const H = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 'var(--sp-3)',
      flex: orientation === 'vertical' ? '1 1 0' : 'none',
      minWidth: 0
    }
  }, showLabels && /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, handleLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-handle) ${sz} var(--font-handle)`,
      letterSpacing: ls,
      color: 'var(--ink)'
    }
  }, handle));
  const T = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-truth)',
      flex: orientation === 'vertical' ? '1 1 0' : 'none',
      minWidth: 0
    }
  }, showLabels && /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, truthLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',
      color: 'var(--ink)'
    }
  }, truth), decision && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--gap-block)',
      font: 'var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle)',
      letterSpacing: 'var(--ls-decision)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--signal-text)'
    }
  }, "Decision underneath: "), decision));
  return /*#__PURE__*/React.createElement("div", {
    "data-carry-composition": "handle-truth",
    style: {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'row' : 'column',
      alignItems: 'stretch',
      ...style
    }
  }, H, /*#__PURE__*/React.createElement(__ds_scope.Threshold, {
    orientation: orientation,
    hasTruth: !!truth
  }), T);
}
Object.assign(__ds_scope, { HandleTruth });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/signature/HandleTruth.jsx", error: String((e && e.message) || e) }); }

// scripts/release-check.js
try { (() => {
// Carry release check — run before any distributable build:  node scripts/release-check.js [--public]
// Fails (exit 1) on restricted terms, placeholder contact data, unsupported figures, or operating-only states in a public build.
if (typeof require === 'undefined' || typeof process === 'undefined') {/* browser bundle context: no-op */} else {
  const fs = require('fs'),
    path = require('path');
  const ROOT = path.resolve(__dirname, '..');
  const PUBLIC = process.argv.includes('--public');
  const SKIP = [/^uploads\//, /^strategy\//, /^_ds_/, /^_adherence/, /node_modules/, /support\.js$/, /image-slot\.js$/, /ds-base\.js$/, /^scripts\//];
  const TEXT = /\.(html|md|jsx|tsx|ts|css|js|json)$/;
  // Restricted reference material — may appear ONLY in these files (as employer name / source attribution)
  const RESTRICTED = [/QuickTake/i, /PureLogics/i, /SUNY/i, /Upstate/i, /340B/, /RxTrail/i, /RXFiler/i];
  const RESTRICTED_ALLOW = ['readme.md', 'CLAUDE.md', 'github.md', 'SKILL.md', 'docs/governance.md', 'docs/engine-integration.md', 'docs/state-architecture.md', 'docs/rules.md', 'docs/delta-report-v0.9.1.md', 'docs/package-manifest.md', 'templates/case-study/CaseStudy.dc.html', 'templates/resume-header/ResumeHeader.dc.html', 'templates/executive-deck/ExecutiveDeck.dc.html'];
  // Content that originated from restricted sources or was invented in v0.9 — never allowed
  const BANNED = [/kiosk/i, /clinical export/i, /sponsor analytics/i, /patient[- ]data/i, /migration custody/i, /D-114/, /board minutes/i, /audit (passed|summary|record)/i, /3 regulated platforms/i, /no integration findings/i, /path chosen in 9 days/i, /4 weeks of (integration|rework)/i, /2\.1M records/i, /ward clerk/i, /cut-over/i, /steering group chair/i];
  // Claims Register banned wording
  const CLAIMS_BANNED = [/decade of experience/i, /over the last decade/i, /CBAP/, /multimillion/i, /8 → 25\+/, /8 to 25\+/, /400\+ leads/, /100% validation/, /9[05]% (engineering|dependency)/i, /74% healthcare/i, /40% client-acquisition/i, /60% workload/i, /50% repeat/i];
  // Placeholder identity
  const PLACEHOLDER = [/example\.com/i, /\+1 000 000 0000/, /Toronto/, /J\. Ortiz/, /salman@example/i];
  // Operating-only states — fail public builds
  const OPERATING = [/certainty=["']superseded["']/, /state=["']superseded["']/, /state=["']proposed["']/, /release=["'](internal|restricted)["']/];
  const ALLOW_OPERATING_DEMO = ['components/signature/signature.card.html', 'guidelines/states-certainty.html', 'guidelines/states-release.html', 'components/signature/StateMark.prompt.md'];
  function walk(dir, out = []) {
    for (const n of fs.readdirSync(dir)) {
      const p = path.join(dir, n);
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      if (SKIP.some(r => r.test(rel))) continue;
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p, out);else if (TEXT.test(n)) out.push(rel);
    }
    return out;
  }
  const files = walk(ROOT);
  const fails = [],
    warns = [];
  for (const f of files) {
    const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const re of BANNED) {
      const m = t.match(re);
      if (m) fails.push(`[restricted-content] ${f} :: ${m[0]}`);
    }
    for (const re of CLAIMS_BANNED) {
      const m = t.match(re);
      if (m) fails.push(`[claims-register-banned] ${f} :: ${m[0]}`);
    }
    for (const re of PLACEHOLDER) {
      const m = t.match(re);
      if (m) fails.push(`[placeholder-identity] ${f} :: ${m[0]}`);
    }
    for (const re of RESTRICTED) {
      const m = t.match(re);
      if (m && !RESTRICTED_ALLOW.includes(f)) fails.push(`[restricted-name] ${f} :: ${m[0]}`);
    }
    if (PUBLIC) for (const re of OPERATING) {
      const m = t.match(re);
      if (m && !ALLOW_OPERATING_DEMO.includes(f)) fails.push(`[operating-only-in-public] ${f} :: ${m[0]}`);
    }
    // Numeric figures presented as confirmed outside the Claims Register set
    const nums = t.match(/certainty:\s*'confirmed'[^}]*value:\s*'[^']*\d[^']*'/g) || [];
    for (const n of nums) if (!/claims register|role record|wording/i.test(n)) warns.push(`[figure-as-confirmed] ${f} :: ${n.slice(0, 80)}`);
  }
  console.log(`Carry release check — ${files.length} files${PUBLIC ? ' (public build)' : ''}`);
  warns.forEach(w => console.log('WARN  ' + w));
  fails.forEach(x => console.log('FAIL  ' + x));
  console.log(fails.length ? `\n${fails.length} failure(s)` : '\nclean');
  process.exit(fails.length ? 1 : 0);
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "scripts/release-check.js", error: String((e && e.message) || e) }); }

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Matrix = __ds_scope.Matrix;

__ds_ns.BoundaryFrame = __ds_scope.BoundaryFrame;

__ds_ns.Connector = __ds_scope.Connector;

__ds_ns.Legend = __ds_scope.Legend;

__ds_ns.LoadLane = __ds_scope.LoadLane;

__ds_ns.LoadNode = __ds_scope.LoadNode;

__ds_ns.ProgressionLadder = __ds_scope.ProgressionLadder;

__ds_ns.CARRY_FORMS = __ds_scope.CARRY_FORMS;

__ds_ns.Composition = __ds_scope.Composition;

__ds_ns.ConsequenceNote = __ds_scope.ConsequenceNote;

__ds_ns.CounterpointRail = __ds_scope.CounterpointRail;

__ds_ns.DecisionLine = __ds_scope.DecisionLine;

__ds_ns.EvidenceStrip = __ds_scope.EvidenceStrip;

__ds_ns.HandleTruth = __ds_scope.HandleTruth;

__ds_ns.HandoffFooter = __ds_scope.HandoffFooter;

__ds_ns.Provenance = __ds_scope.Provenance;

__ds_ns.CARRY_CERTAINTY = __ds_scope.CARRY_CERTAINTY;

__ds_ns.CARRY_OPERATING_CERTAINTY = __ds_scope.CARRY_OPERATING_CERTAINTY;

__ds_ns.CARRY_RELEASE = __ds_scope.CARRY_RELEASE;

__ds_ns.StateMark = __ds_scope.StateMark;

__ds_ns.Threshold = __ds_scope.Threshold;

})();
