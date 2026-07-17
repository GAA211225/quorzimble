// Service worker de offline para la app Brief de Mercado.
// Aislado de Dieta y Rutinas: solo cachea los archivos de mercado.
const CACHE_NAME = 'mercado-cache-v1';
const ASSETS = [
  './mercado.html',
  './mercado-manifest.json',
  './mercado-icon-192.png',
  './mercado-icon-512.png',
  './mercado-data.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k.startsWith('mercado-')).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isHtml(request) {
  return request.mode === 'navigate' || request.destination === 'document' || request.url.endsWith('mercado.html');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;
  // Solo maneja archivos de mercado; deja pasar todo lo demás (dieta, rutinas, etc.).
  if (url.indexOf('mercado') === -1) return;

  // El contenido (HTML y datos): primero la red para tener lo más nuevo, con
  // respaldo en caché si no hay internet.
  if (isHtml(event.request) || url.endsWith('mercado-data.json')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }).then(
        (c) => c || new Response(
          '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;text-align:center;padding:40px;background:#0F1420;color:#E8EAF0"><h2>Sin conexión</h2><p>Vuelve a abrir la app con internet para cargar el último brief.</p></body>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        )
      ))
    );
    return;
  }

  // Íconos y resto: primero caché.
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => cached))
  );
});
