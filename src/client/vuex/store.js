/* eslint-disable max-len */
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
  // NavDirections
  NavDirectionsOpen: false,
  // leafletMap
  kiosks: [],
  fixits: [],
  trails: [],
  parking: [],
  potholes: [],
  mildTraffic: [],
  heavyTraffic: [],
  crackedPavement: [],
  dirtyLanes: [],
  otherIssues: [],
  bikeRacks: [],
  bikeFriendlyBusiness: [],
  scenicAreas: [],
  otherCommendations: [],
  route: [],
  // location tracking
  location: null,
  viewLocked: true
}

// default axios headers
axios.defaults.headers.post['Content-Type'] = 'application/JSON'

const actions = {
  GET_SESSION: ({ commit }) => {
    axios.get('/session').then((response) => {
      if (response.data) {
        commit('SET_USER', response.data)
        commit('TOGGLE_SIGNED_IN', true)
      }
    }, (err) => {
      console.log(err)
    })
  },

  FIND_ROUTE: ({ commit }, route) => {
    commit('SET_ROUTE', route)
  },

  FIND_LOCATION: ({ commit }) => {
    navigator.geolocation.watchPosition((position) => {
      commit('SET_LOCATION', { location: [position.coords.latitude, position.coords.longitude] })
    })
  },

  POST_REPORT: ({ commit }, reportInfo) => {
    axios.post('/report', {
      reportType: reportInfo.reportType,
      reportContent: reportInfo.reportContent,
      coordinates: reportInfo.coordinates,
      created_at: reportInfo.created_at,
      userid: reportInfo.userid
    })
      .then((response) => {
        console.log(`Status: ${response.status} ${response.statusText}, Posted your report!`)
      }, (err) => {
        console.log('ERROR', err)
      })
      .then(() => {
        commit('TOGGLE_NAVDIRECTIONS', true)
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
  LOAD_MILD_TRAFFIC: ({ commit }) => {
    axios.get('/mildTraffic').then((response) => {
      commit('SET_MILD_TRAFFIC', { mildTraffic: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_HEAVY_TRAFFIC: ({ commit }) => {
    axios.get('/heavyTraffic').then((response) => {
      commit('SET_HEAVY_TRAFFIC', { heavyTraffic: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_CRACKED_PAVEMENT: ({ commit }) => {
    axios.get('/crackedPavement').then((response) => {
      commit('SET_CRACKED_PAVEMENT', { crackedPavement: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_DIRTY_LANES: ({ commit }) => {
    axios.get('/dirtyLanes').then((response) => {
      commit('SET_DIRTY_LANES', { dirtyLanes: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_OTHER_ISSUES: ({ commit }) => {
    axios.get('/otherIssues').then((response) => {
      commit('SET_OTHER_ISSUES', { otherIssues: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_BIKE_RACKS: ({ commit }) => {
    axios.get('/bikeRacks').then((response) => {
      commit('SET_BIKE_RACKS', { bikeRacks: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_BIKE_FRIENDLY_BUSINESS: ({ commit }) => {
    axios.get('/bikeFriendlyBusiness').then((response) => {
      commit('SET_BIKE_FRIENDLY_BUSINESS', { bikeFriendlyBusiness: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_SCENIC_AREAS: ({ commit }) => {
    axios.get('/scenicAreas').then((response) => {
      commit('SET_SCENIC_AREAS', { scenicAreas: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_OTHER_COMMENDATIONS: ({ commit }) => {
    axios.get('/otherCommendations').then((response) => {
      commit('SET_OTHER_COMMENDATIONS', { otherCommendations: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

const mutations = {
  SET_ROUTE(state, { route }) { state.route = route },
  SET_LOCATION(state, { location }) { state.location = location },
  SET_MOBILE(state, mobile) { state.mobile = mobile },
  SET_USER(state, user) { state.user = user },
  TOGGLE_SIGNED_IN(state, bool) { state.signedIn = bool },
  TOGGLE_AUTHFAIL(state, obj) { state.authfail = obj },
  TOGGLE_SIDEPANEL(state) { state.sidePanelOpen = !state.sidePanelOpen },
  TOGGLE_NAVDIRECTIONS(state, bool) { state.NavDirectionsOpen = bool },
  TOGGLE_VIEW_SIGN_IN(state, bool) { if (!state.signedIn) state.viewSignIn = bool },
  TOGGLE_SIOU_ACTIVE(state, active) { state.SiouActive = active },
  SET_KIOSKS(state, { kiosks }) { state.kiosks = kiosks },
  SET_PARKING(state, { parking }) { state.parking = parking },
  SET_FIXITS(state, { fixits }) { state.fixits = fixits },
  SET_TRAILS(state, { trails }) { state.trails = trails },
  SET_POTHOLES(state, { potholes }) { state.potholes = potholes },
  SET_MILD_TRAFFIC(state, { mildTraffic }) { state.mildTraffic = mildTraffic },
  SET_HEAVY_TRAFFIC(state, { heavyTraffic }) { state.heavyTraffic = heavyTraffic },
  SET_CRACKED_PAVEMENT(state, { crackedPavement }) { state.crackedPavement = crackedPavement },
  SET_DIRTY_LANES(state, { dirtyLanes }) { state.dirtyLanes = dirtyLanes },
  SET_OTHER_ISSUES(state, { otherIssues }) { state.otherIssues = otherIssues },
  SET_BIKE_RACKS(state, { bikeRacks }) { state.bikeRacks = bikeRacks },
  SET_BIKE_FRIENDLY_BUSINESS(state, { bikeFriendlyBusiness }) { state.bikeFriendlyBusiness = bikeFriendlyBusiness },
  SET_SCENIC_AREAS(state, { scenicAreas }) { state.scenicAreas = scenicAreas },
  SET_OTHER_COMMENDATIONS(state, { otherCommendations }) { state.otherCommendations = otherCommendations },
  TOGGLE_VIEW_LOCKED(state, bool) { state.viewLocked = bool }
}

const getters = {
  route: state => state.route,
  location: state => state.location,
  kiosks: state => state.kiosks,
  fixits: state => state.fixits,
  parking: state => state.parking,
  trails: state => state.trails,
  // authfailAt: state => state.viewSignIn || !state.signedIn,
  potholes: state => state.potholes,
  // viewSignIn: state => state.viewSignIn || !state.signedIn,
  mildTraffic: state => state.mildTraffic,
  heavyTraffic: state => state.heavyTraffic,
  crackedPavement: state => state.crackedPavement,
  dirtyLanes: state => state.dirtyLanes,
  otherIssues: state => state.otherIssues,
  bikeRacks: state => state.bikeRacks,
  bikeFriendlyBusiness: state => state.bikeFriendlyBusiness,
  scenicAreas: state => state.scenicAreas,
  otherCommendations: state => state.otherCommendations
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
