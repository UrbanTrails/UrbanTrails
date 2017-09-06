import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  mobile: '',
  // SignInOrUp
  SiouActive: null,
  viewSignIn: false,
  // user
  signedIn: false,
  user: null,
  // Sidepanel
  sidePanelOpen: false,
  // leafletMap
  kiosks: [],
  fixits: [],
  trails: [],
  location: null
}

const actions = {
  FIND_LOCATION: ({ commit }) => {
    navigator.geolocation.watchPosition((position) => {
      commit('SET_LOCATION', { location: [position.coords.latitude, position.coords.longitude] })
    })
  },

  POST_REPORT: (skipThisVal, reportInfo) => {
    axios.post('/report', {
      reportType: reportInfo.reportType,
      reportContent: reportInfo.reportContent,
      position: reportInfo.position,
      userid: reportInfo.userid
    })
      .then((response) => {
        console.log(response.status + ' ' + response.statusText)
      }, (err) => {
        console.log('ERROR', err)
      })
  },

  LOAD_KIOSKS: ({ commit }) => {
    axios.get('/kiosks').then((response) => {
      commit('SET_KIOSKS', { kiosks: response.data.data })
    }, (err) => {
      console.log(err)
    })
  },

  LOAD_FIXITS: ({ commit }) => {
    axios.get('/fixits').then((response) => {
      commit('SET_FIXITS', { fixits: response.data.data })
    }, (err) => {
      console.log(err)
    })
  },

  LOAD_TRAILS: ({ commit }) => {
    axios.get('/trails').then((response) => {
      commit('SET_TRAILS', { trails: response.data.features })
    }, (err) => {
      console.log(err)
    })
  }
}

const mutations = {
  SET_LOCATION(state, { location }) {
    state.location = location
  },
  SET_MOBILE(state, mobile) {
    state.mobile = mobile
  },
  TOGGLE_SIDEPANEL(state) {
    state.sidePanelOpen = !state.sidePanelOpen
  },
  TOGGLE_SIGN_IN(state) {
    if (!state.signedIn) {
      state.viewSignIn = !state.viewSignIn
    }
  },
  TOGGLE_SIOU_ACTIVE(state, active) {
    console.log('store', active)
    state.SiouActive = active
  },
  SET_KIOSKS(state, { kiosks }) {
    state.kiosks = kiosks
  },
  SET_FIXITS(state, { fixits }) {
    state.fixits = fixits
  },
  SET_TRAILS(state, { trails }) {
    state.trails = trails
  }
}

const getters = {
  location: state => state.location,
  kiosks: state => state.kiosks,
  fixits: state => state.fixits,
  trails: state => state.trails,
  // viewSignIn: state => state.viewSignIn || !state.signedIn,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
