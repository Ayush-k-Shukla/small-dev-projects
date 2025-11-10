const CACHE_NAME = 'demo-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/main.js',
  '/web-worker.js',
  '/shared-worker.js',
  '/service-worker.js'
];

// Install static assets
self.addEventListener('install', (e) => {
  console.log('Service Worker installing...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// Intercept requests
self.addEventListener('fetch', (e) => {
  const { request } = e;

  if (request.url.includes('jsonplaceholder.typicode.com')) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return res;
        })
        .catch(() => {
          console.log('responding from cache req');
          caches.match(request);
        })
    );
    return;
  }

  // For static assets
  e.respondWith(
    caches.match(request).then(
      (cached) =>
        (() => {
          console.log('service from cache static');
          return cached;
        }) || fetch(request)
    )
  );
});
