import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const state = {
  mobile: '',
  // SignInOrUp
  SiouActive: null,
  viewSignIn: false,
  authfail: { signin: false, signUp: false },
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

// defeault axios headers
axios.defaults.headers.post['Content-Type'] = 'application/JSON'

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
        console.log(response)
      }, (err) => {
        console.log('ERROR', err)
      })
  },

  USER_SIGN_IN_OR_UP: ({commit}, dispatchObj) => {
    axios.post(`/${ dispatchObj.signInOrUp }`, dispatchObj)
      .then((response) => {
        commit('TOGGLE_VIEW_SIGN_IN', false)
        commit('SET_USER', response.data[0])
        commit('TOGGLE_SIGNED_IN', true)
    }, (err) => {
      console.log(err)
      const strErr = err.toString()
      if (strErr.endsWith('409')) {
        commit('TOGGLE_AUTHFAIL', {signin: false, signUp: true})
      } else if (strErr.endsWith('404')) {

      }
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
  SET_USER(state, user) {
    state.user = user
  },
  TOGGLE_SIGNED_IN(state, bool) {
    state.signedIn = bool
  },
  TOGGLE_AUTHFAIL(state, obj) {
    state.authfail = obj
  },
  TOGGLE_SIDEPANEL(state) {
    state.sidePanelOpen = !state.sidePanelOpen
  },
  TOGGLE_VIEW_SIGN_IN(state, bool) {
    // blocking sign in or up if already signed In
    if (!state.signedIn) {
      state.viewSignIn = bool
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
  // authfailAt: state => state.viewSignIn || !state.signedIn,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
