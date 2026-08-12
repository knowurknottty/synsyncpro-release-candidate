import { test, expect } from '@playwright/test';

async function gotoApp(page: import('@playwright/test').Page) {
  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  // Wait for the service worker to become active/controlling and the shell to mount.
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForTimeout(300);
}

test('clean install: canonical shell is controlled by the service worker and survives offline reload', async ({ page, context }) => {
  await gotoApp(page);

  const swState = await page.evaluate(async () => ({
    supported: 'serviceWorker' in navigator,
    registrations: (await navigator.serviceWorker.getRegistrations()).length,
    controller: !!navigator.serviceWorker.controller,
  }));
  expect(swState.supported).toBe(true);
  expect(swState.registrations).toBeGreaterThanOrEqual(1);
  // After clients.claim(), the reloaded page must be controlled by the new SW.
  expect(swState.controller).toBe(true);

  await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);

  // Offline: the canonical shell must still load from cache, never the deprecated tree.
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
  await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
  // A network resource (external qrcode CDN) failing offline must not blank the shell.
  const shellVisible = await page.locator('main, aside').first().isVisible();
  expect(shellVisible).toBe(true);
  await context.setOffline(false);
});

test('upgrade: stale v11 cache epoch is purged when the new service worker activates', async ({ page }) => {
  // Land on the app origin.
  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  await page.evaluate(() => navigator.serviceWorker.ready);
  const newEpochSeeded = await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('synsync-')));
  expect(newEpochSeeded).toContain('synsync-v12-canonical-ui');

  // Simulate the prior v11 epoch: unregister the current SW, seed an old cache that
  // holds a deprecated-shell document, then re-register fresh so install->activate runs
  // and the activate handler purges every cache except the current epoch.
  await page.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const r of regs) await r.unregister();
    const cache = await caches.open('synsync-v11');
    await cache.put(
      '/index.html',
      new Response(
        '<html><body><div data-synsync-shell="legacy-mobile">deprecated</div></body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      )
    );
    await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
  });
  await page.waitForTimeout(400);

  const after = await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('synsync-')));
  // Only the current epoch may remain; the stale v11 cache must be gone.
  expect(after).toEqual(['synsync-v12-canonical-ui']);
  await expect(page.locator('[data-synsync-shell="legacy-mobile"]')).toHaveCount(0);
});
