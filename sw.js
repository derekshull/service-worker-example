/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
 
// Version 0.46

importScripts('/service-worker-example/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/service-worker-example/',
        '/service-worker-example/jquery.js',
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
