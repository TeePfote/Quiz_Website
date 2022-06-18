/*
self.addEventListener('install', event => event.waitUntil(
    caches.open('pwa1').then(cache => cache.add('/'))
));

self.addEventListener('fetch', event => event.respondWith(
    caches.open('pwa1')
        .then(cache => cache.match(event.request))
        .then(response => response || fetch(event.request))
));*/

// Name mit Versionsnummer
let cacheName = 'Quiz-App-Cache';

// Dateien für den Cache
let cachedFiles = [
    "index.html",
    "internettechnologien.html",
    "mathe.html",
    "Allgemeinwissen.html",
    "manifest.webmanifest.json",
    "icon-192x192.png",
    "icon-512x512.png",
    "apple-touch-icon.png",
    "app.js",
    "app_allg.js",
    "app_it.js",
    "script.js",
    "style.css",
    "allgemeinwissen.json",
    "it.json",
    "mathe.json"
];

// self ist der aktuelle Service Worker
self.addEventListener ("install", function (evt) {
    console.log ("Service Worker Install Event ");
    evt.waitUntil (
        // öffnen mit dem result der open-Message
        caches.open (cacheName).then (function (cache) {
            console.log ("Dateien für den Cache");
            return cache.addAll (cachedFiles);
        }).then (function () {
            return self.skipWaiting ();
        }).catch ( function (err) {
            console.log ("Cache Failed", err);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request).catch(function (error) {
            console.error("Netzwerkanfragen fehlgeschlagen. Liefere Offline Page " + error);
            return caches.open(cacheName).then(function (cache) {
                return cache.match(cacheName);
            });
        }));
});

self.addEventListener("refreshOffline", function (response) {
    return caches.open(cacheName).then(function (cache) {
        console.log("Offline Seite aktualisiert vom refreshOffline event: " + response.url);
        return cache.put(offlinePage, response);
    });
});

self.addEventListener("notificationclose", function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;

    console.log("Closed notification: " + primaryKey);
});
