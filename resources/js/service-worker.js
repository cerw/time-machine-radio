import { Workbox } from 'workbox-window'
import { skipWaiting } from 'workbox-core'
import Vue from 'vue'
import axios from 'axios'

// disable for dev like this.

if ('serviceWorker' in navigator) {
  console.log('Serice worker will be registered')
  // window.addEventListener("load", () => {
  console.log('Window - load')
  const wb = new Workbox('/sw.js')
  // let registration =

  // clientsClaim()
  // const showSkipWaitingPrompt = function (event) {
  // `event.wasWaitingBeforeRegister` will be false if this is
  // the first time the updated service worker is waiting.
  // When `event.wasWaitingBeforeRegister` is true, a previously
  // updated service worker is still waiting.
  // You may want to customize the UI prompt accordingly.

  // Assumes your app has some sort of prompt UI element
  // that a user can either accept or reject.
  // console.log(event)
  // window.swal('Heading', 'this is a Heading', 'OK');

  // // on ok
  wb.addEventListener('controlling', (event) => {
    console.log('SW - controlling', event)
    // window.location.reload();
  })
  // messageSW(event.originalEvent.sw, {type: 'SKIP_WAITING'});
  // }

  // Add an event listener to detect when the registered
  // service worker has installed but is waiting to activate.
  // wb.addEventListener('waiting', showSkipWaitingPrompt)
  // wb.addEventListener('externalwaiting', showSkipWaitingPrompt)

  wb.addEventListener('activated', (event) => {
    console.log('SW - activated', event)
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (!event.isUpdate) {
      console.log('Service worker activated for the first time!')

      // If your service worker is configured to precache assets, those
      // assets should  all be avssssailable now.
    } else {
      console.log('Service worker activated somewhere else (tab) !')
    }
  })

  wb.addEventListener('waiting', async (event) => {
    console.log('A new service worker has installed, but it can\'t activate' +
          'until all tabs running the current version have fully unloaded.', event)
  })

  wb.addEventListener('message', async (event) => {
    console.log('SW - message', event.type)

    if (event.data && event.data.type === 'CACHE_UPDATED') {
      const { updatedURL } = event.data.payload
      console.log(`A newer version of ${updatedURL} is available!`)
    }

    if (event.data && event.data.type === 'SKIP_WAITING') {
      console.log('Skip waintng message')
      skipWaiting()
    }
  })

  wb.addEventListener('installed', event => {
    console.log('SW - installed', event)
    if (event.isUpdate) {
      console.log('Newer Version of the app is available!. Click OK to refresh ')
      // get info about current version
      axios.get('/api/v1/app')
        .then(function (response) {
          const release = response.data
          // offer reload or cancel
          Vue
            .swal
            .fire({
              title: 'Newer version of the app is available!.',
              text: 'Make sure you have uploaded all offline audits.',
              footer: 'Version (<b>' + release.version + '</b>) is available',
              icon: 'info',
              imageUrl: '/images/sls_logo.png',
              showCancelButton: true,
              confirmButtonText: 'Reload new version',
              cancelButtonText: 'Not right now',
              showLoaderOnConfirm: true
              // preConfirm: () => {

              // }
            })
            .then(result => {
              if (result.value) {
                console.log('Reloading..')
                window.location.reload()
              }
            })
        })
        .catch(function (error) {
          console.log(error)
        })

      // we want this only on non testing and non local
      //  (window.APP_ENV != 'local' || window.APP_ENV != 'testing')
      // if (confirm(`Newer Version of the app is available!. Click OK to refresh`)) {
      //   window.location.reload();
      // }
    }
  })

  wb.register().then(() => {
    // registration =   event
    console.log('Service Worker registration done:')
  })
} else {
  console.log('Serice worker will NOT be registered')
}
