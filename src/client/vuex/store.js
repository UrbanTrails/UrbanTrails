import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getDistance } from 'geolib'

Vue.use(Vuex)

const state = {
  viewSignIn: true,
  signedIn: false,
  user: null,
  mobile: '',
  sidePanelOpen: false,
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

  POST_REPORT: (skipThisV, reportInfo) => {
    const reportType = `/${reportInfo.reportType}`
    axios.post(reportType, {
      userid: reportInfo.userid,
      position: reportInfo.position
    })
      .then((response) => {
        console.log(response)
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
    state.viewSignIn = !state.viewSignIn
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
