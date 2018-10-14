// list asset2 static yg kira2 dibutuhkan


const assets = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/register-sw.js',
  '/js/home.js'
]

const version = '0.0.2'
const cacheName = `myapp-$${version}`

self.addEventListener('install', function (event) {
  function addToCache () {
    return caches.open(cacheName).then(cache => {
      return cache.addAll(assets)
    })
  }
  event.waitUntil(addToCache())
})

self.addEventListener('activate', function (event) {
  function deleteOldCache () {
    return caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames
          .filter(persistedCacheName => persistedCacheName !== cacheName)
          .map(persistedCacheName => {
            console.log(persistedCacheName)
            return caches.delete(persistedCacheName)
          })
      )
    )
  }
  event.waitUntil(deleteOldCache())
})

self.addEventListener('fetch', function (event) {
  function getFromCache () {
    return caches.match(event.request.clone())
      .then((response) => {
        if (response) {
          return response
        }

        return fetch(event.request.clone())
          .then((response) => {
            if (!response || response.status !== 200) {
              return response
            }

            const clonedResponse = response.clone()
            caches.open(cacheName).then(cache => {
              cache.put(event.request.clone(), clonedResponse)
            })

            return response
          })
      })
  }

  event.respondWith(getFromCache())
})