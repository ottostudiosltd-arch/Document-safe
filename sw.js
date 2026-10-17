const CACHE_NAME = 'docusafe-cache-v2';

self.addEventListener('install', (event) => {
  const scope = self.registration.scope;
  const assetsToCache = [
    scope,
    scope + 'index.html',
    scope + 'manifest.json',
    scope + 'documents/aadhaar_front.jpg',
    scope + 'documents/aadhaar_back.jpg',
    scope + 'documents/pan_card.jpg',
    scope + 'documents/voter_id.jpg',
    scope + 'documents/driving_licence.jpg',
    scope + 'documents/bank_passbook.jpg',
    scope + 'documents/hdfc_debit_card.jpg',
    scope + 'documents/discover_card.jpg',
    scope + 'documents/marriage_certificate.jpg',
    scope + 'documents/identification_certificate.jpg',
    scope + 'documents/school_leaving_certificate.jpg',
    scope + 'documents/hifz_certificate.jpg'
  ];

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching core assets and documents with scope:', scope);
      return cache.addAll(assetsToCache).catch(err => {
        console.warn('[Service Worker] Non-critical cache error:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
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
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match(self.registration.scope + 'index.html');
        }
      });
    })
  );
});
