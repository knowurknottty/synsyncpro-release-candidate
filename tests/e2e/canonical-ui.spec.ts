import { expect, test } from '@playwright/test';

const viewports = [
  [320, 568], [360, 640], [375, 667], [390, 844], [412, 915],
  [768, 1024], [820, 1180], [1024, 768], [1280, 720], [1366, 768],
  [1440, 900], [1920, 1080], [2560, 1440], [3840, 2160],
  [1023, 768], [1025, 768],
] as const;

for (const [width, height] of viewports) {
  test(`canonical shell remains mounted at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/index.html');
    await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
    await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);

    const shell = page.locator('[data-synsync-shell="canonical"]');
    const box = await shell.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(width + 1);
    expect(box!.height).toBeGreaterThan(0);
  });
}

test('resizing across the former 1024 breakpoint never changes application identity', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/index.html');
  const canonical = page.locator('[data-synsync-shell="canonical"]');
  await expect(canonical).toHaveCount(1);

  for (const width of [1025, 1024, 1023, 820, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 768 });
    await expect(canonical).toHaveCount(1);
    await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
  }
});

test('canonical shell survives portrait-landscape transitions without horizontal overflow', async ({ page }) => {
  await page.goto('/index.html');

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 844, height: 390 },
    { width: 820, height: 1180 },
    { width: 1180, height: 820 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('visualizer backing store follows its rendered size after repeated viewport changes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/index.html');

  const canvas = page.locator('canvas').first();
  if (await canvas.count() === 0) test.skip(true, 'Visualizer canvas is only present after selecting a protocol');

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 390, height: 844 },
    { width: 820, height: 1180 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(100);
    const metrics = await canvas.evaluate((el: HTMLCanvasElement) => {
      const rect = el.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      return {
        cssWidth: rect.width,
        cssHeight: rect.height,
        backingWidth: el.width,
        backingHeight: el.height,
        dpr,
      };
    });

    expect(metrics.backingWidth).toBeGreaterThan(0);
    expect(metrics.backingHeight).toBeGreaterThan(0);
    expect(Math.abs(metrics.backingWidth / metrics.cssWidth - metrics.dpr)).toBeLessThan(0.15);
    expect(Math.abs(metrics.backingHeight / metrics.cssHeight - metrics.dpr)).toBeLessThan(0.15);
  }
});
