import { NavigationRoute, registerRoute, setCatchHandler } from 'workbox-routing'
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import * as googleAnalytics from 'workbox-google-analytics'
//
import { clientsClaim, skipWaiting, setCacheNameDetails } from 'workbox-core'
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update'

import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute
} from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)
// https://github.com/GoogleChrome/workbox/issues/2059
// we can not commen the above line even that we dont want the serveri worker genrte stuff
// stuff from webpack - we dont need
console.table(self.__WB_MANIFEST)

const SW_VERSION = '1.0.0'
console.log('Hello from Service Worker Version: ', SW_VERSION)

// Config core
setCacheNameDetails({
  prefix: 'time-machine',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google-analytics'
})

// Some developers     want to be able to publish a new service worker and have it update and control a web page as soon as possible, skipping the default service worker lifecycle.

// If you find yourself wanting this behavior, workbox-core provides some helper methods to make this easy:

skipWaiting()

clientsClaim()

cleanupOutdatedCaches()

// // // app shell
precacheAndRoute([
  { url: '/', revision: Date.now().toString() }
])

// GA
googleAnalytics.initialize()

// plguins
const thirtyDaysExpiration = new ExpirationPlugin({
  maxEntries: 60,
  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  purgeOnQuotaError: true
})

const cacheGoodResponses = new CacheableResponsePlugin({
  statuses: [0, 200]
})

// how to use this TODO
const broadcastUpdate = new BroadcastUpdatePlugin()

// js and css
registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      thirtyDaysExpiration,
      cacheGoodResponses,
      broadcastUpdate
    ]
  }))

// images
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      thirtyDaysExpiration,
      cacheGoodResponses,
      broadcastUpdate
    ]
  })
)

registerRoute(
  /\.(?:mp3|dat|json)$/,
  new CacheFirst({
    cacheName: 'media',
    plugins: [
      thirtyDaysExpiration,
      cacheGoodResponses
    ]
  })
)

registerRoute(
  /api.*/,
  new NetworkOnly()
)
//  This assumes / has been precached.
const handler = createHandlerBoundToURL('/')
const navigationRoute = new NavigationRoute(handler)
registerRoute(navigationRoute)

// or default ?
setCatchHandler(new NetworkOnly())
