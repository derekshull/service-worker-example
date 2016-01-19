self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/service-worker-example/',
        '/service-worker-example/test.json',
        '/service-worker-example/index.html',
        '/service-worker-example/index.html?homescreen=1',
        '/service-worker-example/?homescreen=1',
        '/service-worker-example/main.min.js'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {console.log("using cache for "+event.request.url);}
      else {console.log("not using cache for "+event.request.url);}
      return response || fetch(event.request);
    })
  );
});
