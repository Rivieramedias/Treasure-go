self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("treasure-go").then(function(cache) {
      return cache.addAll([
        "/treasure-go/index-mobile.html",
        "/treasure-go/manifest.json"
      ]);
    })
  );
});
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});