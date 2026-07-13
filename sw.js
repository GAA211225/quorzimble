const CACHE_NAME = 'dieta-cache-v2';
// Rutinas vive en su propia carpeta con SW aislado, y Embobate se separó a
// su propio repo (GAA211225/nimbrocado) con su propio SW. Este SW solo cubre Dieta.
const ASSETS = [
  './dieta.html',
  './dieta-manifest.json',
  './dieta-icon-192.png',
  './dieta-icon-512.png',
  './frases.json'
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

// Para el HTML/navegación: primero la red (siempre lo más nuevo), y si no hay
// internet, se usa la copia en caché. Para el resto de archivos: primero caché.
function isHtml(request) {
  return request.mode === 'navigate' ||
    (request.destination === 'document') ||
    request.url.endsWith('.html');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // No tocar la carpeta de Rutinas: tiene su propio service worker.
  if (event.request.url.indexOf('/rutinas/') !== -1) return;

  if (isHtml(event.request)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }).then(
        (c) => c || new Response(
          '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;text-align:center;padding:40px;color:#333"><h2>Sin conexión</h2><p>Vuelve a abrir la app con internet para cargarla la primera vez.</p></body>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        )
      ))
    );
    return;
  }

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
