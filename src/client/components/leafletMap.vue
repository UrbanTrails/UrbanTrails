<template>
  <div>
    <Compass v-if="$store.state.mobile"></Compass>
    <div id="mapid">
      <NavAlert :notifiedKiosks="this.notifiedKiosks" :isNotified="this.isNotified"></NavAlert>
    </div>
    <v-btn id="location-lock-btn" v-if="!$store.state.viewLocked" @click="locationLock" success dark raised icon><v-icon>mdi-crosshairs-gps</v-icon></v-btn>
    <v-btn id="location-lock-btn" v-if="!$store.state.viewLocked" @click="locationLock" success dark raised icon><v-icon>mdi-crosshairs-gps</v-icon></v-btn>
    <!-- <Sidepanel :toggleLayer="toggleLayer"></Sidepanel> -->
    <areaReporting></areaReporting>
  </div>
</template>

<script>
  import { Routing } from "leaflet-routing-machine"
  import "leaflet-control-geocoder"
  import * as L from 'leaflet'
  import methods from './leafletMethods/methodSample.js'
  import mLayers from './leafletMethods/methLayers.js'
  import * as mLocation from './leafletMethods/methLocation.js'
  import { getDistance } from 'geolib'
  export default {
    data() {
      return {
        map: 'blah',
        mainLightLayer: null,
        mainDarkLayer: null,
        trailsLayer: null,
        fixitsLayer: null,
        kiosksLayer: null,
        // parkingLayer: null,
        potholesLayer: null,
        kiosksClose: [],
        notifiedKiosks: [],
        isNotified: false
      };
    },
    beforeCreate() {
      this.$store.dispatch('FIND_LOCATION')
      this.$store.dispatch('LOAD_KIOSKS')
      this.$store.dispatch('LOAD_TRAILS')
      this.$store.dispatch('LOAD_FIXITS')
      // this.$store.dispatch('LOAD_PARKING')
      this.$store.dispatch('LOAD_POTHOLES')
    },

    mounted() {
      this.makeMap()
    },
    watch: {
      kiosksClose: function() {
        this.kiosksClose.forEach(kiosk => {
          if (!this.notifiedKiosks.includes(kiosk)) {
            this.notifiedKiosks.push(kiosk)
            this.isNotified = true
            setTimeout(() => { this.isNotified = false }, 2200 )
          } else {
            this.isNotified = false
          }
        })
      },
      location: function() {
        this.kiosksClose = this.$store.getters.kiosks.filter((data) => {
          const lat = JSON.parse(data[11])
          const long = JSON.parse(data[12])
          return getDistance(
            { latitude: this.$store.getters.location[0], longitude: this.$store.getters.location[1] },
            { latitude: lat, longitude: long }
          ) < 200
        })
      },
      fixits: function() {
        mLayers.fixitMarkers(this)
      },
        // parking: function() {
        //     mLayers.parkingMarkers(this)
        // },
      kiosks: function() {
        mLayers.kioskMarkers(this)
      },
      trails: function() {
        mLayers.addTrails(this)
      },
      potholes: function() {
        mLayers.potholeMarkers(this)
      }
    },
    computed: {
      location: function() {
          return this.$store.getters.location
      },
        // parking: function() {
        //     return this.$store.getters.parking
        // }
        // ,
      kiosks: function() {
          return this.$store.getters.kiosks
      },
      trails: function() {
          return this.$store.getters.trails
      },
      fixits: function() {
          return this.$store.getters.fixits
      },
      potholes: function() {
          return this.$store.getters.potholes
      }
    },
    methods: {
      toggleLayer(layer) {
        return mLayers.toggleLayer(layer, this, this.$data.map)
      },
      closePanels() {
        if (this.$store.state.sidePanelOpen) {
          this.$store.commit('TOGGLE_SIDEPANEL')
        }
        if (this.$store.state.viewSignIn) {
          this.$store.commit('TOGGLE_VIEW_SIGN_IN', false)
        }
      },
      locationLock() {
        this.$store.commit('TOGGLE_VIEW_LOCKED', true)
        mLocation.setView(this, this.$data.map, false)
      },
      makeMap() {

        //layers including empty
        this.$data.mainDarkLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
          maxZoom: 18,
          id: 'mapbox.streets'
        })
        this.$data.mainLightLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
          maxZoom: 18,
          id: 'mapbox.streets'
        })
        this.$data.trailsLayer = L.geoJSON()
        this.$data.fixitsLayer = L.layerGroup('')
        this.$data.kiosksLayer = L.layerGroup('')
        // this.$data.parkingLayer = L.layerGroup('')
        this.$data.potholesLayer = L.layerGroup('')
        //end layers

        //map creation
        var mymap = L.map('mapid', {
            center: [30.269, -97.743],
            zoom: 13,
            layers: [
            // this.$data.mainDarkLayer,
            this.$data.mainLightLayer,
            this.$data.trailsLayer,
            this.$data.fixitsLayer,
            this.$data.kiosksLayer,
            // this.$data.parkingLayer,
            this.$data.potholesLayer,
            ]
        })
        let bingKey = 'Av5guhuRA2EPX3ahI-QuCJvUS0ORctt8aZuWVYh3Os-YAIXQ887T7Fj2mFkgwQOP'
        let mapboxKey = 'pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg'
          // end map creation
        this.$data.map = mymap

        let router = L.Routing.control({
          router: L.Routing.mapbox(mapboxKey),
          position: "topleft",
          fitSelectedRoutes: true,
          showAlternatives: true,
          altLineOptions: {styles: [{color: 'gray'}]}, 
          reverseWaypoints: true, 
          routeWhileDragging: true,
          // geocoder: geoCodeItUp,
          geocoder: L.Control.Geocoder.mapbox(mapboxKey),
          // geocoder: L.Control.Geocoder.bing(bingKey),
// google('AIzaSyBjMJWjY2zb7Q8aOMZWZlOhZTY_auGszj4'),
          collapsible: true,
          show: false
        }).addTo(mymap)
      //map location

        
        let position = L.marker([30.269, -97.74]).bindPopup('Configuring your location...').addTo(mymap).openPopup()
        let area = L.circle([30.269, -97.743], 120).addTo(mymap)

        mLocation.locate(this, mymap, position, area, router)

        function getHandlerForFeature(feat) {  
          return function(ev) { 
          }
        }

        function click (e) {
          this.closePanels()
        }

        function pan (e) {
          this.closePanels()
          this.$store.commit('TOGGLE_VIEW_LOCKED', false)
        }

        function doubleClick (e) {
          let position = [e.latlng.lat, e.latlng.lng];
          document.getElementsByClassName('closure')[0].setAttribute('id', 'active')
          var reports = document.getElementsByClassName('reporting');
          reports[0].setAttribute('id', 'selected');
          reports[0].setAttribute('data', position);
        }

        //capture clicks on the map
        mymap.on('dblclick', doubleClick.bind(this));
        mymap.on('click', click.bind(this));
        mymap.on('movestart', pan.bind(this))
      },
    }
  }
</script>

<style>
  #mapid {
    position: relative;
    width: 100%;
    height: 100%;
    float: left;
    transition: width .5s, height .5s;
  }
  #location-lock-btn {
    position: absolute;
    top: 140px;
    left: 0px;
    z-index: 1050;
  }
</style>
