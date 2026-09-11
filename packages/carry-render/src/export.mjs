// PNG (1× and 2×), PDF and greyscale captures of a rendered artifact. Every capture is the settled state:
// reducedMotion 'reduce' + ?export=1 + fonts loaded + double rAF.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { launchChromium } from './browser.mjs';

export async function settle(page) {
  await page.waitForFunction(() => window.__carry && document.fonts.status === 'loaded');
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

export async function exportArtifact({ htmlPath, outDir, format, scales = [1, 2], pdf = true, grey = false, browser }) {
  const own = !browser; if (own) browser = await launchChromium();
  const files = [];
  try {
    const flow = format.h === null;
    for (const scale of scales) {
      const ctx = await browser.newContext({ viewport: { width: format.w, height: format.h ?? 1056 }, deviceScaleFactor: scale, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(htmlPath).href + '?export=1', { waitUntil: 'load' });
      await settle(page);
      const count = await page.evaluate(() => window.__carry.count);
      const dir = path.join(outDir, scale === 1 ? 'png' : `png@${scale}x`); mkdirSync(dir, { recursive: true });
      for (let i = 0; i < count; i++) {
        await page.evaluate((n) => window.__carry.go(n), i); await settle(page);
        const file = path.join(dir, `${flow ? 'page' : 'slide'}-${String(i + 1).padStart(2, '0')}.png`);
        if (flow) await page.locator('.carry-pageframe').nth(i).screenshot({ path: file }); else await page.screenshot({ path: file });
        files.push(file);
      }
      if (grey && scale === 1) {
        await page.goto(pathToFileURL(htmlPath).href + '?export=1&grey=1', { waitUntil: 'load' }); await settle(page);
        const gdir = path.join(outDir, 'png-grey'); mkdirSync(gdir, { recursive: true });
        for (let i = 0; i < count; i++) { await page.evaluate((n) => window.__carry.go(n), i); await settle(page); const f = path.join(gdir, `slide-${String(i + 1).padStart(2, '0')}.png`); if (flow) await page.locator('.carry-pageframe').nth(i).screenshot({ path: f }); else await page.screenshot({ path: f }); files.push(f); }
      }
      if (pdf && scale === scales[0]) {
        await page.goto(pathToFileURL(htmlPath).href + '?export=1', { waitUntil: 'load' }); await settle(page);
        const f = path.join(outDir, 'artifact.pdf');
        await page.pdf({ path: f, preferCSSPageSize: true, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
        files.push(f);
      }
      await ctx.close();
    }
  } finally { if (own) await browser.close(); }
  return files;
}

/** Task 6: display-size check for social artifacts at 360 and 320 CSS px, plus greyscale captures. */
export async function mobileCheck({ htmlPath, outDir, widths = [360, 320], minPx = 12, browser }) {
  const own = !browser; if (own) browser = await launchChromium();
  const report = { widths: {}, ok: true };
  try {
    mkdirSync(outDir, { recursive: true });
    for (const width of widths) {
      const ctx = await browser.newContext({ viewport: { width, height: Math.round(width * 1.9) }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(htmlPath).href + '?export=1&fitwidth=1', { waitUntil: 'load' }); await settle(page);
      const count = await page.evaluate(() => window.__carry.count);
      const pages = [];
      for (let i = 0; i < count; i++) {
        await page.evaluate((n) => window.__carry.go(n), i); await settle(page);
        const nodes = await page.evaluate(() => {
          const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--carry-scale')) || 1;
          return Array.from(document.querySelectorAll('.carry-pageframe:not([hidden]) [data-carry-essential]')).map((el) => ({ role: el.getAttribute('data-carry-essential'), source: parseFloat(getComputedStyle(el).fontSize), displayed: +(parseFloat(getComputedStyle(el).fontSize) * scale).toFixed(2), text: (el.textContent || '').slice(0, 40) }));
        });
        const failing = nodes.filter((n) => n.displayed < minPx);
        if (failing.length) report.ok = false;
        await page.screenshot({ path: path.join(outDir, `mobile-${width}-${String(i + 1).padStart(2, '0')}.png`), fullPage: true });
        pages.push({ index: i + 1, nodes, failing });
      }
      await page.goto(pathToFileURL(htmlPath).href + '?export=1&fitwidth=1&grey=1', { waitUntil: 'load' }); await settle(page);
      await page.screenshot({ path: path.join(outDir, `mobile-${width}-grey-01.png`), fullPage: true });
      report.widths[width] = pages;
      await ctx.close();
    }
  } finally { if (own) await browser.close(); }
  writeFileSync(path.join(outDir, 'mobile-check.json'), JSON.stringify(report, null, 2));
  return report;
}
