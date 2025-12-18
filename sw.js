const CACHE_NAME = "avanti-ledger-v1";

const FILES_TO_CACHE = [
  "/",
  "/accounting-report.html",
"/avanti-logo.jpeg",
"/change-pass.html",
"/dashboard.html",
"/edit-profile.html",
"/index.html",
"/inventory-report.html",
"/inventory.html",
"/ledger-logo.png",
"/loading.html",
"/manage-devices.html",
"/manifest.json",
"/notes.html",
"/profile.html",
"/sales-report.html",
"/settings.html",
"/statistics.html"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});