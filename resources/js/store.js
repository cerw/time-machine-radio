import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// extras
import 'babel-polyfill'

Vue.use(Vuex)

const state = {
  // alarm
  url: null,
  track_id: null
}

const actions = {
  setURL (state, url) {
    state.url = url
  }
}

const mutations = {

}

const getters = {

}

// persistedState = createPersistedState({ storage: window.sessionStorage })
// const persistedState = createPersistedState()

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // plugins: [persistedState]
})
