// DocuSafe Service Worker v5
const CACHE_NAME = 'docusafe-v5';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Don't intercept chrome-extension or external analytics
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache valid responses
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          }).catch(() => {});
        }
        return networkResponse;
      })
      .catch(async () => {
        // If offline / network error, return from cache
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // Fallback for HTML documents
        if (event.request.headers.get('accept')?.includes('text/html')) {
          const fallback = await caches.match('./') || await caches.match('./index.html');
          if (fallback) return fallback;
        }

        return new Response('Network error and not cached', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      })
  );
});
