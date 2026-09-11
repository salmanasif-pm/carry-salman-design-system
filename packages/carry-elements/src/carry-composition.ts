import { FORM_LABELS, FORMS, MODES, THRESHOLD_AT } from 'carry-content';

type Form = (typeof FORMS)[number];
type Mode = (typeof MODES)[number];
export type Register = 'scan' | 'inspect';
export interface ThresholdChangeDetail { at: number; mode: Mode | null; register: Register }

const MIN = 0.1, MAX = 0.9, SNAP = 0.03;
const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n));
const nearestMode = (at: number): Mode | null => {
  let best: Mode | null = null, d = Infinity;
  for (const m of MODES) { const dd = Math.abs(THRESHOLD_AT[m] - at); if (dd < d) { d = dd; best = m; } }
  return d <= SNAP ? best : null;
};

const STYLE_ID = 'carry-composition-style';
// Light DOM on purpose: the element must read the page's Carry tokens (styles.css). One shared stylesheet, tag-scoped.
const CSS = `
carry-composition{display:flex;flex-direction:column;position:relative;min-height:var(--carry-composition-height,480px);color:var(--ink)}
carry-composition>.cc-above{display:flex;flex-direction:column;justify-content:flex-end;gap:var(--sp-3);padding-bottom:var(--threshold-gap);min-height:0;flex:var(--threshold-at,.62) 1 0%;transition:flex-grow var(--dur-orient) var(--ease-standard)}
carry-composition>.cc-below{display:flex;flex-direction:column;gap:var(--gap-truth);padding-top:var(--threshold-gap);min-height:0;flex:calc(1 - var(--threshold-at,.62)) 1 0%;transition:flex-grow var(--dur-orient) var(--ease-standard)}
carry-composition .cc-label{font:400 var(--text-label)/1 var(--font-truth);letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--ink-3)}
carry-composition .cc-handle{font:var(--weight-handle) var(--text-handle-l)/var(--lh-handle-l) var(--font-handle);letter-spacing:var(--ls-handle-l)}
carry-composition[size="xl"] .cc-handle{font-size:var(--text-handle-xl);line-height:var(--lh-handle-xl);letter-spacing:var(--ls-handle-xl)}
carry-composition[size="m"] .cc-handle{font-size:var(--text-handle-m);line-height:var(--lh-handle-m);letter-spacing:var(--ls-handle-m)}
carry-composition[size="s"] .cc-handle{font-size:var(--text-handle-s);line-height:var(--lh-handle-s);letter-spacing:var(--ls-handle-s)}
carry-composition .cc-truth{font:var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth);color:var(--ink)}
carry-composition[data-register="scan"] .cc-truth{font-size:var(--text-truth-s);line-height:var(--lh-truth-s)}
carry-composition[data-register="inspect"] .cc-truth{display:grid;gap:var(--gap-truth)}
carry-composition[data-register="inspect"] .cc-truth>span::before{content:"·";color:var(--ink-4);margin-right:var(--sp-3)}
carry-composition .cc-lead{margin-top:var(--gap-block);font:var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle);letter-spacing:var(--ls-decision)}
carry-composition .cc-lead>b{font-weight:inherit;color:var(--signal-text)}
carry-composition>.cc-line{position:relative;flex:none;height:var(--stroke-threshold);background:var(--rule-strong)}
carry-composition>.cc-line>.cc-tick{position:absolute;top:-5px;left:0;width:var(--tick-size);height:var(--tick-size);background:var(--signal);box-sizing:border-box}
carry-composition>.cc-line[data-fn="evidence"]>.cc-tick{background:transparent;border:var(--stroke-strong) solid var(--signal)}
carry-composition>.cc-line[data-fn="progression"]>.cc-tick{left:auto;right:0}
carry-composition>.cc-line[data-fn="transition"]>.cc-tick{left:50%;transform:translateX(-50%)}
carry-composition>.cc-line[data-fn="reflection"]>.cc-tick{width:calc(var(--tick-size) * .6);height:calc(var(--tick-size) * .6);top:-2.5px}
carry-composition>.cc-line[data-fn="separation"]>.cc-tick{display:none}
carry-composition>.cc-line[role="slider"]{cursor:ns-resize;touch-action:none}
carry-composition>.cc-line[role="slider"]::before{content:"";position:absolute;inset:-14px 0;/* 30px hit area, still one 2px line */}
carry-composition>.cc-line[role="slider"]:focus-visible{outline:2px solid var(--focus);outline-offset:6px}
carry-composition>.cc-line>.cc-readout{position:absolute;right:0;top:var(--sp-3);font:400 var(--text-label)/1 var(--font-truth);letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--ink-3);pointer-events:none}
`;

/**
 * <carry-composition form above below lead mode threshold-at interactive size show-labels>
 * Above / line / below. `threshold-at` (0.1–0.9, fraction from the top) is written to --threshold-at on the host and
 * re-flows the second register: a low line (≥ .5, "scan") keeps the truth register compact and inline; a high line
 * (< .5, "inspect") gives it room and breaks it into rows at " · ". Setting `mode` snaps to that mode's token.
 * When `interactive` is present the line is a slider: drag, arrow keys (±1%, shift ±5%), Home/End, 1–5 snap to the
 * five modes, Enter snaps to the nearest mode within 3%. Emits `carry-threshold-change` {at, mode, register}.
 */
export class CarryComposition extends HTMLElement {
  static get observedAttributes() { return ['form', 'above', 'below', 'lead', 'lead-label', 'mode', 'threshold-at', 'interactive', 'show-labels']; }
  private built = false;
  private els!: { aboveLabel: HTMLElement; handle: HTMLElement; line: HTMLElement; tick: HTMLElement; readout: HTMLElement; belowLabel: HTMLElement; truth: HTMLElement; lead: HTMLElement };
  private dragging = false;

  get at(): number { return clamp(parseFloat(this.getAttribute('threshold-at') ?? '') || THRESHOLD_AT[this.mode ?? 'executive']); }
  set at(v: number) { this.setAttribute('threshold-at', clamp(v).toFixed(2)); }
  get mode(): Mode | null { const m = this.getAttribute('mode'); return (MODES as readonly string[]).includes(m ?? '') ? (m as Mode) : null; }
  get form(): Form { const f = this.getAttribute('form'); return (FORMS as readonly string[]).includes(f ?? '') ? (f as Form) : 'claim-support'; }
  get register(): Register { return this.at >= 0.5 ? 'scan' : 'inspect'; }

  connectedCallback() { this.build(); this.render(); }
  attributeChangedCallback(name: string) {
    if (!this.built) return;
    if (name === 'mode' && this.mode) { this.dataset.carryMode = this.mode; this.setAttribute('threshold-at', THRESHOLD_AT[this.mode].toFixed(2)); }
    this.render();
  }

  private build() {
    if (this.built) return;
    if (!document.getElementById(STYLE_ID)) { const s = document.createElement('style'); s.id = STYLE_ID; s.textContent = CSS; document.head.appendChild(s); }
    const mk = (tag: string, cls: string, parent: HTMLElement) => { const e = document.createElement(tag); e.className = cls; parent.appendChild(e); return e; };
    this.textContent = '';
    const above = mk('div', 'cc-above', this);
    const aboveLabel = mk('div', 'cc-label', above);
    const handle = mk('div', 'cc-handle', above);
    const line = mk('div', 'cc-line', this);
    const tick = mk('span', 'cc-tick', line); tick.setAttribute('aria-hidden', 'true');
    const readout = mk('span', 'cc-readout', line);
    const below = mk('div', 'cc-below', this);
    const belowLabel = mk('div', 'cc-label', below);
    const truth = mk('div', 'cc-truth', below);
    const lead = mk('div', 'cc-lead', below);
    this.els = { aboveLabel, handle, line, tick, readout, belowLabel, truth, lead };
    if (this.mode) { this.dataset.carryMode = this.mode; if (!this.hasAttribute('threshold-at')) this.setAttribute('threshold-at', THRESHOLD_AT[this.mode].toFixed(2)); }

    line.addEventListener('pointerdown', (e) => { if (!this.interactive) return; this.dragging = true; line.setPointerCapture(e.pointerId); this.fromPointer(e); });
    line.addEventListener('pointermove', (e) => { if (this.dragging) this.fromPointer(e); });
    const end = (e: PointerEvent) => { if (!this.dragging) return; this.dragging = false; line.releasePointerCapture(e.pointerId); this.snap(); this.emit(); };
    line.addEventListener('pointerup', end); line.addEventListener('pointercancel', end);
    line.addEventListener('keydown', (e) => {
      if (!this.interactive) return;
      const step = e.shiftKey ? 0.05 : 0.01; let handled = true;
      const move = (to: number) => { this.removeAttribute('mode'); this.at = to; }; // a free position is no longer a mode
      switch (e.key) {
        case 'ArrowUp': case 'ArrowLeft': move(this.at - step); break;
        case 'ArrowDown': case 'ArrowRight': move(this.at + step); break;
        case 'PageUp': move(this.at - 0.1); break;
        case 'PageDown': move(this.at + 0.1); break;
        case 'Home': move(MIN); break;
        case 'End': move(MAX); break;
        case 'Enter': case ' ': this.snap(true); break;
        default: {
          const i = ['1', '2', '3', '4', '5'].indexOf(e.key);
          if (i >= 0) this.setAttribute('mode', MODES[i]); else handled = false;
        }
      }
      if (handled) { e.preventDefault(); this.emit(); }
    });
    this.built = true;
  }

  private get interactive() { return this.hasAttribute('interactive'); }
  private fromPointer(e: PointerEvent) {
    const r = this.getBoundingClientRect();
    this.removeAttribute('mode');
    this.at = (e.clientY - r.top) / r.height;
  }
  private snap(force = false) {
    const m = force ? MODES.reduce((b, x) => Math.abs(THRESHOLD_AT[x] - this.at) < Math.abs(THRESHOLD_AT[b] - this.at) ? x : b, MODES[0]) : nearestMode(this.at);
    if (m) this.setAttribute('mode', m);
  }
  private emit() {
    this.dispatchEvent(new CustomEvent<ThresholdChangeDetail>('carry-threshold-change', { detail: { at: this.at, mode: this.mode, register: this.register }, bubbles: true, composed: true }));
  }

  private render() {
    const f = FORM_LABELS[this.form]; const at = this.at; const showLabels = this.getAttribute('show-labels') !== 'false';
    this.style.setProperty('--threshold-at', at.toFixed(2));
    this.dataset.carryForm = this.form; this.dataset.register = this.register;
    const { aboveLabel, handle, line, tick, readout, belowLabel, truth, lead } = this.els;
    aboveLabel.textContent = f.above; aboveLabel.hidden = !showLabels;
    handle.textContent = this.getAttribute('above') ?? '';
    line.dataset.fn = f.fn; tick.hidden = !this.getAttribute('below') || f.fn === 'separation';
    belowLabel.textContent = f.below; belowLabel.hidden = !showLabels;
    const below = this.getAttribute('below') ?? '';
    truth.textContent = '';
    if (this.register === 'inspect' && below.includes(' · ')) for (const part of below.split(' · ')) { const s = document.createElement('span'); s.textContent = part; truth.appendChild(s); }
    else truth.textContent = below;
    const leadText = this.getAttribute('lead');
    lead.hidden = !leadText;
    if (leadText) { lead.textContent = ''; const b = document.createElement('b'); b.textContent = (this.getAttribute('lead-label') ?? f.lead) + ': '; lead.append(b, leadText); }
    const modeText = this.mode ?? nearestMode(at) ?? 'between modes';
    if (this.interactive) {
      line.setAttribute('role', 'slider'); line.tabIndex = 0;
      line.setAttribute('aria-label', 'Threshold position'); line.setAttribute('aria-orientation', 'vertical');
      line.setAttribute('aria-valuemin', String(MIN * 100)); line.setAttribute('aria-valuemax', String(MAX * 100)); line.setAttribute('aria-valuenow', String(Math.round(at * 100)));
      line.setAttribute('aria-valuetext', `${Math.round(at * 100)}% from the top · ${modeText} · ${this.register}`);
      readout.textContent = `${Math.round(at * 100)} · ${modeText} · ${this.register}`;
    } else { line.removeAttribute('role'); line.removeAttribute('tabindex'); readout.textContent = ''; }
  }
}
