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
