self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
         .then(function (cache) {
             cache.addAll([
                '/',
                '/weather.html',
                '/index.html',
                '/weather.css',
                '/manifest.json',
                '/weather.js',
                '/skycons.js',
                '/altinay-dinc-LluELtL5mK4-unsplash.webp',
                '/apple-touch-icon.webp',
                '/android-chrome-192x192.webp',
                '/android-chrome-512x512.webp',
                '/android-icon-36x36.webp',
                '/android-icon-48x48.webp',
                '/android-icon-72x72.webp',
                '/android-icon-96x96.webp',
                'android-icon-144x144.webp',
                'android-icon-192x192.webp'
             ])
         })
    )
    
});

self.addEventListener('activate', function(){
    self.clients.claim();
    console.log('SW Ac');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
          .then(function(res) {
              if (res) {
                  return res;
              } else {
                  return fetch(event.request);
              }
          })
    );
});