const CACHE = 'showcase-v2';
const OFFLINE_URL = '/';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.add(OFFLINE_URL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

function shouldHandle(request) {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  // Never intercept Next.js bundles or APIs — stale JS breaks hydration and taps.
  if (url.pathname.startsWith('/_next/')) return false;
  if (url.pathname.startsWith('/api/')) return false;
  if (request.headers.get('RSC') === '1') return false;
  if (request.headers.get('Next-Router-Prefetch')) return false;
  return true;
}

self.addEventListener('fetch', (event) => {
  if (!shouldHandle(event.request)) return;

  const url = new URL(event.request.url);
  const isDocument =
    event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') || '').includes('text/html');

  if (isDocument) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL)),
    );
    return;
  }

  // Optional stale-while-revalidate for static images/fonts only.
  if (!/\.(png|jpe?g|webp|svg|gif|ico|woff2?)$/i.test(url.pathname)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
      return cached || network;
    }),
  );
});
