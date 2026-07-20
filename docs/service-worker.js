const CACHE_NAME = "jlpt-v1.0.0";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

// 설치
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// 활성화
self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) =>

      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )

    )

  );

  self.clients.claim();

});

// 요청
self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then((response) => {

      return response || fetch(event.request);

    })

  );

});
