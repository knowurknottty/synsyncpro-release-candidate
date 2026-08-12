import { test, expect } from '@playwright/test';

// Real device scale factor -> genuine window.devicePixelRatio === 2 for this file,
// so backing-store math is deterministic and independent of the host display.
const DPR = 2;
test.use({ deviceScaleFactor: DPR });

// Exercise resize and breakpoint/orientation transitions at several sizes.
const RESIZE_SEQ: ReadonlyArray<[number, number]> = [
  [1920, 1080],
  [1025, 768],
  [1024, 768],
  [1023, 768],
  [820, 1180],
  [390, 844],
  [844, 390],
  [1440, 900],
  [3840, 2160],
];

async function selectProtocol(page: import('@playwright/test').Page) {
  // Suppress the welcome overlay and enter guided home (goal tiles).
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  await page.getByRole('button', { name: /Focus/i }).first().click();
  // Click the first protocol card (rendered as a div with an <h4> title).
  await page.locator('h4.font-semibold.text-sm').first().click();
  const canvas = page.locator('canvas').first();
  await expect(canvas).toBeVisible();
  return canvas;
}

test('visualizer backing store follows rendered container across resizes and orientation (VIS-001)', async ({ page }) => {
  await page.goto('/index.html');
  const canvas = await selectProtocol(page);

  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));

  for (const [width, height] of RESIZE_SEQ) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(140);

    const metrics = await canvas.evaluate((el: HTMLCanvasElement) => {
      const rect = el.getBoundingClientRect();
      return { cssWidth: rect.width, cssHeight: rect.height, backingWidth: el.width, backingHeight: el.height };
    });

    expect(metrics.backingWidth, `backing width at ${width}x${height}`).toBeGreaterThan(0);
    expect(metrics.backingHeight, `backing height at ${width}x${height}`).toBeGreaterThan(0);
    // Backing store follows the chosen DPR policy (2D = native DPR here).
    expect(Math.abs(metrics.backingWidth / metrics.cssWidth - DPR), `width ratio at ${width}x${height}`).toBeLessThan(0.15);
    expect(Math.abs(metrics.backingHeight / metrics.cssHeight - DPR), `height ratio at ${width}x${height}`).toBeLessThan(0.15);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }

  expect(errors, `uncaught page errors: ${errors.join('; ')}`).toEqual([]);
});

test('visualizer survives fullscreen enter/exit without corrupting the canvas (VIS-001)', async ({ page }) => {
  await page.goto('/index.html');
  const canvas = await selectProtocol(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(140);

  await page.getByRole('button', { name: 'Enter fullscreen' }).click();
  await page.waitForTimeout(180);
  const fs = await canvas.evaluate((el: HTMLCanvasElement) => ({ w: el.width, h: el.height }));
  expect(fs.w).toBeGreaterThan(0);
  expect(fs.h).toBeGreaterThan(0);

  await page.getByRole('button', { name: 'Exit fullscreen' }).click();
  await page.waitForTimeout(180);
  const after = await canvas.evaluate((el: HTMLCanvasElement) => {
    const rect = el.getBoundingClientRect();
    return { w: el.width, h: el.height, cssW: rect.width, cssH: rect.height };
  });
  expect(after.w).toBeGreaterThan(0);
  expect(Math.abs(after.w / after.cssW - DPR)).toBeLessThan(0.15);
});
