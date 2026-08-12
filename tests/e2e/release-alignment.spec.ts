import { expect, test } from '@playwright/test';

test('release assets are real files with installable mobile icons', async ({ page, request }) => {
  const manifestResponse = await request.get('/manifest.json');
  expect(manifestResponse.ok()).toBeTruthy();
  expect(manifestResponse.headers()['content-type']).toContain('application/json');
  const manifest = await manifestResponse.json();
  expect(manifest.start_url).toBe('/demo');
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({ src: '/favicon-192x192.png', sizes: '192x192' }),
    expect.objectContaining({ src: '/favicon-512x512.png', sizes: '512x512' }),
    expect.objectContaining({ src: '/maskable-icon-512x512.png', purpose: 'maskable' }),
  ]));

  for (const path of ['/og-image.png', '/apple-touch-icon.png', '/maskable-icon-512x512.png']) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
    expect(response.headers()['content-type'], path).toContain('image/png');
    expect((await response.body()).subarray(1, 4).toString()).toBe('PNG');
  }

  await page.goto('/main.html');
  const dimensions = await page.evaluate(async () => {
    const load = (src: string) => new Promise<[number, number]>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve([image.naturalWidth, image.naturalHeight]);
      image.onerror = reject;
      image.src = src;
    });
    return {
      touch: await load('/apple-touch-icon.png'),
      standard: await load('/favicon-192x192.png'),
      maskable: await load('/maskable-icon-512x512.png'),
    };
  });
  expect(dimensions).toEqual({
    touch: [180, 180],
    standard: [192, 192],
    maskable: [512, 512],
  });
});

test('public copy and app shell avoid third-party runtime dependencies', async ({ page }) => {
  const externalOrigins = new Set<string>();
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin !== 'http://127.0.0.1:4173') externalOrigins.add(url.origin);
  });

  await page.goto('/main.html');
  await expect(page).toHaveTitle(/Open Source Browser Audio Laboratory/);
  await expect(page.getByText(/Pay what—and if—you can/i)).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/military research|FDA-cleared|clinical-grade|neuroscience-backed/i);

  await page.goto('/index.html');
  await page.evaluate(() => localStorage.setItem('synsync_seen_welcome', '1'));
  await page.reload();
  await expect(page.locator('[data-synsync-shell="canonical"]')).toHaveCount(1);
  await expect(page.locator('body')).not.toContainText(/expand_more|expand_less|show_chart|bar_chart/);
  expect([...externalOrigins]).toEqual([]);
});

test('Netlify routing keeps the landing page distinct from the audio lab', async ({ request }) => {
  const redirects = await request.get('/_redirects');
  if (redirects.ok()) {
    expect(await redirects.text()).toMatch(/^\/[ \t]+\/main\.html[ \t]+200!/m);
  }

  const landing = await request.get('/main.html');
  const app = await request.get('/index.html');
  const landingHtml = await landing.text();
  const appHtml = await app.text();
  expect(landingHtml).toContain('Pay what—and if—you can');
  expect(appHtml).toContain('<div id="root"></div>');
  expect(landingHtml).not.toEqual(appHtml);
});
