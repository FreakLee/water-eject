// Offline cache for the full version. Network first, so an update shows up
// on the next online visit; the cache only answers when the network fails
// (no signal, airplane mode). Bump VERSION when the file list changes.
const VERSION = 'full-v1';
const FILES = ['./', 'index.html', 'manifest.json', 'icon-180.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if(r.ok){ const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
        return r;
      })
      .catch(() => caches.match(e.request, {ignoreSearch: true}))
  );
});
