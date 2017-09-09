import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  mobile: '',
  // SignInOrUp
  SiouActive: 'none',
  viewSignIn: false,
  authfail: { signIn: false, signUp: false },
  // user
  signedIn: false,
  user: null,
  // Sidepanel
  sidePanelOpen: false,
  // leafletMap
  kiosks: [],
  fixits: [],
  trails: [],
  parking: [],
  potholes: [],
  // location tracking
  location: null,
  viewLocked: true
}

// defeault axios headers
axios.defaults.headers.post['Content-Type'] = 'application/JSON'

const actions = {
  GET_SESSION: ({ commit }) => {
    axios.get('/session').then((response) => {
      if(response.data) {
        commit('SET_USER', response.data)
        commit('TOGGLE_SIGNED_IN', true)
      }
    }, (err) => {
      console.log(err)
    })
  },

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
      created_at: reportInfo.created_at,
      userid: reportInfo.userid
    })
      .then((response) => {
        console.log(`Status: ${response.status} ${response.statusText}, Posted your report!`)
      }, (err) => {
        console.log('ERROR', err)
      })
  },

  USER_SIGN_IN_OR_UP: ({ commit }, dispatchObj) => {
    axios.post(`/${dispatchObj.signInOrUp}`, dispatchObj)
      .then((response) => {
        commit('TOGGLE_VIEW_SIGN_IN', false)
        commit('SET_USER', response.data)
        commit('TOGGLE_SIGNED_IN', true)
      }, (err) => {
        console.log(err)
        const strErr = err.toString()
        if (strErr.endsWith('409')) {
          commit('TOGGLE_AUTHFAIL', { signIn: false, signUp: true })
        } else if (strErr.endsWith('404')) {
          commit('TOGGLE_AUTHFAIL', { signIn: true, signUp: false })
        }
      })
  },

  USER_SIGN_OUT: ({ commit }) => {
    axios.post('/signout')
      .then((response) => {
        commit('SET_USER', response.data)
        commit('TOGGLE_SIGNED_IN', false)
      }, (err) => {
        console.log(err)
      })
  },

  LOAD_PARKING: ({ commit }) => {
    axios.get('/racks').then((response) => {
      commit('SET_PARKING', { parking: response.data.data })
    }, (err) => {
      console.log(err)
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
  },

  LOAD_POTHOLES: ({ commit }) => {
    axios.get('/potholes').then((response) => {
      commit('SET_POTHOLES', { potholes: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

const mutations = {
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
    state.SiouActive = active
  },
  SET_KIOSKS(state, { kiosks }) {
    state.kiosks = kiosks
  },
  SET_PARKING(state, { parking }) {
    state.parking = parking
  },
  SET_FIXITS(state, { fixits }) {
    state.fixits = fixits
  },
  SET_TRAILS(state, { trails }) {
    state.trails = trails
  },
  SET_POTHOLES(state, { potholes }) {
    state.potholes = potholes
  },
  SET_LOCATION(state, { location }) {
    state.location = location
  },
  TOGGLE_VIEW_LOCKED(state, bool) {
    state.viewLocked = bool
  }
}

const getters = {
  location: state => state.location,
  kiosks: state => state.kiosks,
  fixits: state => state.fixits,
  parking: state => state.parking,
  trails: state => state.trails,
  // authfailAt: state => state.viewSignIn || !state.signedIn,
  potholes: state => state.potholes,
  // viewSignIn: state => state.viewSignIn || !state.signedIn,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
