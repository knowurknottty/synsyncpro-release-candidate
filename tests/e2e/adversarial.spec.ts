import { test, expect } from '@playwright/test';

const DPR = 3;
test.use({ deviceScaleFactor: DPR });

async function canonicalWithProtocol(page: import('@playwright/test').Page) {
  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  await page.getByRole('button', { name: /Focus/i }).first().click();
  await page.locator('h4.font-semibold.text-sm').first().click();
  await expect(page.locator('canvas').first()).toBeVisible();
}

test('DPR 3: visualizer backing store stays in sync with container (no over-alloc / no blur)', async ({ page }) => {
  await canonicalWithProtocol(page);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.waitForTimeout(150);
  const m = await page.locator('canvas').first().evaluate((el: HTMLCanvasElement) => {
    const r = el.getBoundingClientRect();
    return { cssW: r.width, cssH: r.height, w: el.width, h: el.height };
  });
  // 2D (oscilloscope) policy = native DPR (3); backing = css * DPR.
  expect(Math.abs(m.w / m.cssW - DPR)).toBeLessThan(0.15);
  expect(Math.abs(m.h / m.cssH - DPR)).toBeLessThan(0.15);
});

test('very narrow and very short viewports: no horizontal overflow, canonical shell intact', async ({ page }) => {
  await canonicalWithProtocol(page);
  for (const [width, height] of [[320, 568], [280, 480], [844, 300], [480, 320]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(150);
    await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
    await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('mobile width: required controls remain reachable, not hidden by responsive CSS', async ({ page }) => {
  await canonicalWithProtocol(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);

  const checks: Array<[string, () => Promise<boolean>]> = [
    ['play control', async () => (await page.getByRole('button', { name: 'Play protocol' }).count()) > 0],
    ['volume slider', async () => (await page.getByRole('slider', { name: 'Master volume' }).count()) > 0],
    ['settings control', async () => (await page.getByRole('button', { name: 'Open settings' }).count()) > 0],
    ['library control', async () => (await page.getByRole('button', { name: 'Open library' }).count()) > 0],
    ['profile control', async () => (await page.getByRole('button', { name: 'Open user profile' }).count()) > 0],
    ['download control', async () => (await page.getByRole('button', { name: 'Download portable app' }).count()) > 0],
  ];

  for (const [label, present] of checks) {
    expect(await present(), `${label} reachable at 390x844`).toBe(true);
  }
});
