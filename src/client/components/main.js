import Vue from 'vue'
import * as Vue2Leaflet from 'vue2-leaflet'
import VueAsyncData from 'vue-async-data'
import Vuetify from 'vuetify'
// vuex store
import store from '../vuex/store'
// main component
import App from './App.vue'
// other components
import leafletMap from './leafletMap.vue'
import SignInOrUp from './SignInOrUp.vue'
import areaReporting from './areaReporting.vue'
import Sidepanel from './Sidepanel.vue'


Vue.use(VueAsyncData)
Vue.use(Vuetify)


// register component to be used globally including inside other components
Vue.component('App', App)
Vue.component('leafletMap', leafletMap)
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('SignInOrUp', SignInOrUp)
Vue.component('areaReporting', areaReporting)
Vue.component('Vue2Leaflet', Vue2Leaflet)
Vue.component('Sidepanel', Sidepanel)

new Vue({
  // inject store into all components
  store,
  // element where it will be rendered
  el: '#app',
  // render app component to the dom
  render: h => h(App)
})
