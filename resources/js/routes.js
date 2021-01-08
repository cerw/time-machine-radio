import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: require('@/pages/Home.vue').default,
    //   meta: {
    //     title: 'SLSA Beach Management', displayTopBar: true
    //   }
    // },

    {
      path: '/',
      name: 'Home',
      component: require('@/pages/Home.vue').default
    },
    {
      path: '/latest',
      name: 'Latest',
      component: require('@/pages/Latest.vue').default
    },
    {
      path: '/archive',
      name: 'Archive',
      component: require('@/components/Archive.vue').default
    },
    {
      path: '/people',
      name: 'People',
      component: require('@/pages/People.vue').default
    },
    {
      path: '/grid',
      name: 'Grid',
      component: require('@/pages/Grid.vue').default
    }
    // {
    //   path: '/',
    //   name: 'Live',
    //   component: require('@/components/Archive.vue').default
    // }

    // {
    //   // not found handler
    //   path: '*',
    //   component: require('@/pages/404.vue').default
    // }
  ],
  base: '/',
  mode: 'history',
  saveScrollPosition: true
  // scrollBehavior(to) {
  //   if (to.hash) {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({
  //           selector: to.hash
  //         });
  //       }, 1000);
  //     });
  //   }
  // }
})
