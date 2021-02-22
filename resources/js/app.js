import Vue from 'vue'
import Layout from './components/Layout.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import bugsnagClient from './bugsnag-client'
import router from './routes'
import store from './store'

// const options = {
//   customClass: {
//     confirmButton: 'btn btn-success',
//     cancelButton: 'btn btn-danger'
//   }
//   // buttonsStyling: false
// }

Vue.use(VueSweetalert2)

if (process.env.MIX_BUGSNAG_JS_ENABLE === 'true') {
  console.log('BugsnagVue Vue is on ')
  // bugsnagClient.use(bugsnagVue, Vue)
  bugsnagClient.getPlugin('vue')
    .installVueErrorHandler(Vue)
}

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

require('./bootstrap')
require('./service-worker')

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router, // vue-router
  methods: {},
  render: h => h(Layout)
})
