const CACHE_VERSION = "crvr-estoque-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Não armazenamos páginas nem dados autenticados em cache.
// O service worker existe para a experiência PWA sem criar cópias locais do estoque.
