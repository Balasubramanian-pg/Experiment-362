/**
 * EMAI HQ - Cache-First Service Worker (Fix 17)
 * Provides sub-50ms repeat loads and offline capability for Core Web Vitals.
 */

const CACHE_NAME = 'emai-hq-cache-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './hyperplex.css',
  './hq.css?v=muvlxbte',
  './demo-guide.css',
  './fonts/fonts.css?v=muvlxbte',
  './fonts/rubik-400-latin.woff2',
  './fonts/work-sans-400-latin.woff2',
  './vendor/react.js',
  './vendor/react-dom.js',
  './vendor/classnames.js',
  './hyperplex-review.js?v=muvlxbte',
  './mock-api.js',
  './theme-1/projects.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Never intercept API requests with SW (mock-api.js handles API calls)
  if (url.pathname.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (res && res.status === 200 && event.request.method === 'GET' && !url.protocol.startsWith('chrome-extension')) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
        }
        return res;
      });
    })
  );
});
