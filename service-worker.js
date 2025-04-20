const CACHE_NAME = 'treasure-go-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/main.js',
  '/style.css',
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png'
  // Ajoute ici les autres ressources à mettre en cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
