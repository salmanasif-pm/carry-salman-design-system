// Chromium launcher that respects a preprovisioned browser (PLAYWRIGHT_BROWSERS_PATH) and never runs `playwright install`.
import { chromium } from '@playwright/test';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
function provisioned() {
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH; if (!root || !existsSync(root)) return null;
  if (existsSync(path.join(root, 'chromium'))) return path.join(root, 'chromium');
  for (const d of readdirSync(root)) { const bin = path.join(root, d, 'chrome-linux', 'chrome'); if (/^chromium-\d+$/.test(d) && existsSync(bin)) return bin; }
  return null;
}
export async function launchChromium(opts = {}) {
  try { return await chromium.launch(opts); } catch (e) { const executablePath = provisioned(); if (!executablePath) throw e; return chromium.launch({ ...opts, executablePath }); }
}
