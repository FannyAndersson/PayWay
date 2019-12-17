// this version number must be bumped when assets change - otherwise we will keep serving the old stuff from old cache
const version = 0.6;

// this gets magically changed to true in production
const production = false;

// got ya! :) it was of course a joke, it gets changed to true in our postBuildScript.js

// only log stuff when in development
function log( ...args ) {

    if (!production) {

        console.log( ...args );

    }
}

self.addEventListener('install', event => {

    event.waitUntil(clearOldCaches());

    log(`SW Version ${version} installed`);

})

self.addEventListener('activate', event => {

    log('activation')

    // argument passed to waitUntil must be a promise
    event.waitUntil(async function() {

        await self.clients.claim();

        log(`SW Version ${version} activated`);
    }());
});

self.addEventListener('push', event => {

    const data = event.data.json();

    log('push notification received', data);

    const { title } = data;

    event.waitUntil(self.registration.showNotification(title, data));

});

self.addEventListener('fetch', event => {

    const { request } = event;

    const route = request.url.replace(location.origin, '');

    // everything when developing is network only
    // anything to the API/socket/chrome-extensions is network only in production aswell
    if (!production || request.method.toLowerCase() !== 'get' || /^\/socket/.test(route) || /^chrome/.test(route)) {

        log(`Request to ${route} intercepted and treated as network only.`);

        return false;

    } else {

        // anything else is cache first
        // return event.respondWith(fetchResource(request));

        event.respondWith(
            caches.open(version)
              .then(function (cache) {
                return fetch(event.request)
                  .then(function (res) {
                      //save in cache all dynamic cache
                    cache.put(event.request, res.clone());
                    return res;
                  });
              }).catch(err => {
                  //serve from cache if no network in the air
               return caches.match(event.request)
                    .then(function (response) {
                      if(response) {
                        return response;     
                      }
                    })
              })
          );



    }


});

async function fetchResource(request) {

    log(`Request to ${request.url} intercepted, looking for cached assets`);

    // anything else is cache first
    const cache = await caches.open(version);

    let response = await cache.match(request);

    if (response) {

        log(`Served response from cache ${version}`, request.url);
        return response;

    } 

    try {

        log(`no cache detected for ${request.url}, attempting fetch`)

        response = await fetch(request);

        log(`fetch result for ${request.url}`, response)

        await cache.put(request, response.clone());

        log(`cached response in cache ${version} for ${request.url}`);

        return response;

    } catch (e) {

        log('Error fetching resource', e)

        return Response.error(500);

    }

}

async function clearOldCaches() {

    // get all caches (shouldn't be more than one but you never know right)
    const keys = await caches.keys();

    // return a promise that resolves when all delete operations have succeeded or failed
    return Promise.all(
        keys
            .filter(key => Number(key) !== version)
            .map(key => caches.delete(key))
    );

}