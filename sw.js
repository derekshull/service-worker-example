self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/test.json',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/main.min.js'
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
