import Layout from './components/Layout.vue'

require('./bootstrap')

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  methods: {},
  render: h => h(Layout)
})
