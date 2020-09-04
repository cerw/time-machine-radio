import Vue from 'vue'
import Layout from './components/Layout.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import bugsnagClient from './bugsnag-client'
import bugsnagVue from '@bugsnag/plugin-vue'

// const options = {
//   customClass: {
//     confirmButton: 'btn btn-success',
//     cancelButton: 'btn btn-danger'
//   }
//   // buttonsStyling: false
// }

Vue.use(VueSweetalert2)

if (process.env.MIX_BUGSNAG_JS_ENABLE === 'true') {
  window.bugsnagClientVue = bugsnagClient

  console.log('BugsnagVue Vue is on ')
  bugsnagClient.use(bugsnagVue, Vue)

  if (window.manual !== undefined) {
    bugsnagClient.metaData = {
      manual: window.manual
    }
  }

  if (window.user !== undefined) {
    bugsnagClient.user = window.user
  }
}

require('./bootstrap')
require('./service-worker')

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  methods: {},
  render: h => h(Layout)
})
