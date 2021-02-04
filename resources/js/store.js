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
  shows_by_ids: [],
  config: [],
  show: [],
  tracks: []
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
  },
  get: (context, payload) => {
    const tz = payload.tz
    var time = ''
    if (payload.time !== undefined) {
      time = payload.time
    }
    const url = '/api/get/' + tz + '/' + time
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(({ data }) => {
          console.log('ajax load done')
          context.commit('setConfig', data)
          context.commit('setShow', data.show)
          context.commit('setTracks', data.spins)
          resolve(data)
        }).catch(function (error) {
          console.log('error getting crew', error)
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
    var showsIds = []
    for (const day in shows) {
      showsIds = showsIds.concat(shows[day])
    }
    state.shows_by_ids = showsIds
  },
  setShow (state, show) {
    state.show = show
  },
  setTracks (state, tracks) {
    state.tracks = tracks
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
