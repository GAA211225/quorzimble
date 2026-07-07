// Service worker exclusivo de la app de Rutinas.
// Vive en /CLAUDE/rutinas/ y su alcance es solo esta carpeta, así no
// choca con Emboobate ni con Dieta (cada app tiene su propio SW).
const CACHE_NAME = 'rutinas-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isHtml(request) {
  return request.mode === 'navigate' ||
    request.destination === 'document' ||
    request.url.endsWith('.html');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // HTML: red primero (siempre lo más nuevo), caché de respaldo sin internet.
  if (isHtml(event.request)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Resto: caché primero.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
