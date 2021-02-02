import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// extras
import 'babel-polyfill'

Vue.use(Vuex)

const state = {
  url: null,
  track_id: null,
  stream_id: null,
  show_id: null,
  shows: [],
  config: []
}

const actions = {
  fetchShows: (context) => {
    return new Promise((resolve, reject) => {
      axios.get('api/archive')
        .then(function (response) {
          context.commit('setShows', response.data)
          // check if we need to resurbsice to patrols
          resolve(response)
        })
        .catch(function (error) {
          // console.log('fetchPatrols', error.response)
          reject(error)
        })
    })
  },
  fetchStream: (context) => {
    return new Promise((resolve, reject) => {
      axios.get('api/stream')
        .then(function (response) {
          context.commit('setShows', response.data)
          // check if we need to resurbsice to patrols
          resolve(response)
        })
        .catch(function (error) {
          // console.log('fetchPatrols', error.response)
          reject(error)
        })
    })
  }
}

const mutations = {
  setConfig (state, config) {
    state.config = config
  },
  setShows (state, shows) {
    state.shows = shows
  },
  setURL (state, url) {
    state.url = url
  },
  setStream (state, streamId) {
    state.stream_id = streamId
  }
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
