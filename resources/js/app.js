import Vue from 'vue'
import Layout from './components/Layout.vue'
import VueSweetalert2 from 'vue-sweetalert2'

// const options = {
//   customClass: {
//     confirmButton: 'btn btn-success',
//     cancelButton: 'btn btn-danger'
//   }
//   // buttonsStyling: false
// }

Vue.use(VueSweetalert2)

require('./bootstrap')
require('./service-worker')

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  methods: {},
  render: h => h(Layout)
})
