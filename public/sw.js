const CACHE_NAME = 'ruta-cache-v1';

// Al instalar, el Service Worker toma el control
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Estrategia: Intentar buscar en internet, si falla, usar lo que esté guardado
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
