import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { FORMS, FORM_LABELS, MODES, THRESHOLD_AT, PROVENANCE_LINES } from '../src/vocab.js';

// The canonical meaning layer is packages/carry-ds. These mirrors exist so browser code and schemas
// need no React; if the design system changes, these tests fail and the mirror is updated with a decision entry.
const ds = (rel: string) => readFileSync(new URL(`../../carry-ds/${rel}`, import.meta.url), 'utf8');

describe('vocab mirrors the design system', () => {
  it('FORM_LABELS equals CARRY_FORMS in Composition.jsx', () => {
    const src = ds('components/signature/Composition.jsx');
    for (const form of FORMS) {
      const m = src.match(new RegExp(`'${form}':\\s*\\{above:'([^']*)',\\s*below:'([^']*)',\\s*fn:'([^']*)',\\s*lead:'([^']*)'\\}`));
      expect(m, `${form} not found in Composition.jsx`).not.toBeNull();
      expect(FORM_LABELS[form]).toEqual({ above: m![1], below: m![2], fn: m![3], lead: m![4] });
    }
    expect(src.match(/'[a-z-]+':\s*\{above:/g)?.length).toBe(FORMS.length);
  });
  it('THRESHOLD_AT and PROVENANCE_LINES equal tokens/semantic.css per mode', () => {
    const css = ds('tokens/semantic.css');
    for (const mode of MODES) {
      const block = css.match(new RegExp(`\\[data-carry-mode="${mode}"\\]\\{([^}]*)\\}`))?.[1] ?? '';
      expect(parseFloat(block.match(/--threshold-at:([\d.]+)/)?.[1] ?? 'NaN'), mode).toBe(THRESHOLD_AT[mode]);
      expect(parseInt(block.match(/--provenance-lines:(\d+)/)?.[1] ?? 'NaN'), mode).toBe(PROVENANCE_LINES[mode]);
    }
  });
});
