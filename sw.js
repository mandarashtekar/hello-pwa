var cacheName = 'hello-world-PWA';
var filesToCache = [
  'index.html',
  'second-page.html',
  'main.js',
  'js/second.js',
  'css/style.css'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

/*self.window.addEventListener("beforeinstallprompt", e => {
  console.log("Inside SW-beforeinstallprompt");
});*/
