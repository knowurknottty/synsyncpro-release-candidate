const CACHE_NAME = 'synsync-v11';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'sw.js',
  'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;600&display=swap',
  'https://cdn-icons-png.flaticon.com/512/3003/3003212.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Kernel: Provisioning Offline Shell...');
      // Use settled promises to prevent one bad CDN link from breaking the whole install
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Kernel: Purging Stale Node:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Bypass for browser extensions or non-http(s) schemes
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // If network fails and it's a navigation request, serve the app shell
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        } else {
          // Generic offline fallback for non-navigation requests
          return new Response('', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        }
      });
    })
  );
});
