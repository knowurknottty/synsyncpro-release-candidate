import { test, expect } from '@playwright/test';
import fs from 'node:fs';

// Representative reference states across the supported display spectrum.
const RESOLUTIONS: ReadonlyArray<[number, number]> = [
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
  [3840, 2160],
];

const OUT = 'artifacts/visual';
fs.mkdirSync(OUT, { recursive: true });

async function canonicalAppInUse(page: import('@playwright/test').Page) {
  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  // Enter the session view with a protocol selected so the visualizer + controls render.
  await page.getByRole('button', { name: /Focus/i }).first().click();
  await page.locator('h4.font-semibold.text-sm').first().click();
  await expect(page.locator('canvas').first()).toBeVisible();
}

test('capture representative canonical app states across resolutions', async ({ page }) => {
  await canonicalAppInUse(page);

  for (const [width, height] of RESOLUTIONS) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(200);

    // Identity + integrity invariants at every resolution.
    await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
    await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const name = `${OUT}/canonical-${width}x${height}.png`;
    await page.screenshot({ path: name });
    expect(fs.existsSync(name)).toBe(true);
  }
});

test('browser zoom stress keeps one canonical shell with reachable controls', async ({ page }) => {
  await canonicalAppInUse(page);
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const zoom of [1.0, 1.25, 1.5, 2.0]) {
    await page.evaluate((z) => { document.documentElement.style.zoom = String(z); }, zoom);
    await page.waitForTimeout(150);

    await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
    await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);

    // Key controls must remain reachable/present (not hidden) at each zoom.
    const playButton = page.getByRole('button', { name: 'Play protocol' }).or(page.getByRole('button', { name: 'Pause protocol' }));
    await expect(playButton).toBeVisible();

    // The core shell measures something meaningful at every zoom level.
    const box = await page.locator('[data-synsync-shell="canonical"]').first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThan(0);
  }
});
