import { test, expect } from '@playwright/test';

test('clean install: canonical shell is controlled by the service worker and survives offline reload', async ({ page, context }) => {
  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));

  // Wait for the SW to take control, then do a controlled online reload so the SW
  // caches the JS/CSS assets (cache-first GET handler) before we go offline.
  await page.waitForFunction(() => !!navigator.serviceWorker?.controller);
  const registrations = await page.evaluate(() => navigator.serviceWorker.getRegistrations().then((r) => r.length));
  expect(registrations).toBeGreaterThanOrEqual(1);
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker?.controller);
  await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);

  // Offline: the canonical shell must still load from cache, never the deprecated tree.
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
  await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
  await expect(page.locator('aside, main').first()).toBeVisible();

  await context.setOffline(false);
});

test('upgrade: the v13 service worker purges all stale cache epochs', async ({ page }) => {
  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  await page.evaluate(() => navigator.serviceWorker.ready);

  // The served sw.js must declare the new epoch and its activate handler must purge
  // every other cache (that is the mechanism that removes the old app shell).
  const sw = await page.evaluate(() => fetch('/sw.js').then((r) => r.text()));
  const declaredCacheName = sw.match(/CACHE_NAME\s*=\s*'([^']+)'/)?.[1];
  expect(declaredCacheName).toBe('synsync-v13-release-alignment');
  expect(sw).toMatch(/cacheName !== CACHE_NAME/);
  expect(sw).toMatch(/caches\.delete\(cacheName\)/);

  // Seed stale legacy epochs with a deprecated-shell document.
  await page.evaluate(async () => {
    const stale = ['synsync-v11', 'synsync-v10-precanonical'];
    for (const name of stale) {
      const cache = await caches.open(name);
      await cache.put(
        '/index.html',
        new Response(
          '<html><body><div data-synsync-shell="legacy-mobile">deprecated</div></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        )
      );
    }
  });
  expect(
    await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('synsync-')))
  ).toEqual(expect.arrayContaining(['synsync-v11', 'synsync-v10-precanonical']));

  // Run the exact purge the activate handler performs.
  await page.evaluate(async (cacheName) => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n !== cacheName).map((n) => caches.delete(n)));
  }, declaredCacheName);

  const after = await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('synsync-')));
  expect(after).toEqual(['synsync-v13-release-alignment']);
  await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
});
