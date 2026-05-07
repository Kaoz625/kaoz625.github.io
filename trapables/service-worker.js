/* Trapables Service Worker — Cache-first strategy for all static assets */
const CACHE = 'trapables-v3';
const ASSETS = [
  '/trapables/',
  '/trapables/index.html',
  '/trapables/menu.html',
  '/trapables/strains.html',
  '/trapables/merch.html',
  '/trapables/order.html',
  '/trapables/contact.html',
  '/trapables/tailblazers.html',
  '/trapables/404.html',
  '/trapables/css/styles.css',
  '/trapables/js/main.js',
  '/trapables/js/data.js',
  '/trapables/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Only intercept same-origin + Google Fonts
  if (url.origin !== location.origin && !url.hostname.includes('fonts.g')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      }).catch(() => {
        // Offline fallback for HTML navigation
        if (e.request.destination === 'document') {
          return caches.match('/trapables/index.html');
        }
      });
    })
  );
});
