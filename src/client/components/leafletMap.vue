<template>
  <div>
    <Compass v-if="$store.state.mobile"></Compass>
    <div id="mapid">
      <NavAlert :notifiedKiosks="this.notifiedKiosks" :isNotified="this.isNotified"></NavAlert>
    </div>
    <v-btn id="location-lock-btn" v-if="!$store.state.viewLocked" @click="locationLock" success dark raised icon><v-icon>mdi-crosshairs-gps</v-icon></v-btn>
    <v-btn id="location-lock-btn" v-if="!$store.state.viewLocked" @click="locationLock" success dark raised icon><v-icon>mdi-crosshairs-gps</v-icon></v-btn>
    <Sidepanel :toggleLayer="toggleLayer"></Sidepanel>
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
        potholesLayer: null,
        mildTrafficLayer : null,
        heavyTrafficLayer : null,
        crackedPavementLayer : null,
        dirtyLanesLayer : null,
        otherIssuesLayer : null,
        // parkingLayer: null,
        bikeRacksLayer : null,
        bikeFriendlyBusinessLayer : null,
        scenicAreasLayer : null,
        otherCommendationsLayer : null,
        kiosksClose: [],
        notifiedKiosks: {},
        isNotified: false,
        enRoute: false
      };
    },
    beforeCreate() {
      //API data
      this.$store.dispatch('FIND_LOCATION')
      this.$store.dispatch('LOAD_KIOSKS')
      this.$store.dispatch('LOAD_TRAILS')
      this.$store.dispatch('LOAD_FIXITS')

      this.$store.dispatch('LOAD_POTHOLES')
      this.$store.dispatch('LOAD_MILD_TRAFFIC')
      this.$store.dispatch('LOAD_HEAVY_TRAFFIC')
      this.$store.dispatch('LOAD_CRACKED_PAVEMENT')
      this.$store.dispatch('LOAD_DIRTY_LANES')
      this.$store.dispatch('LOAD_OTHER_ISSUES')
      //User reported commendations
      // this.$store.dispatch('LOAD_PARKING')
      this.$store.dispatch('LOAD_BIKE_RACKS')
      this.$store.dispatch('LOAD_BIKE_FRIENDLY_BUSINESS')
      this.$store.dispatch('LOAD_SCENIC_AREAS')
      this.$store.dispatch('LOAD_OTHER_COMMENDATIONS')
    },

    mounted() {
      this.makeMap()
    },
    watch: {
      kiosksClose: function() {
        this.kiosksClose.forEach(kiosk => {
          if (!this.notifiedKiosks[kiosk]) {
            this.notifiedKiosks[kiosk] = "notified"
            this.isNotified = true
            setTimeout(() => { this.isNotified = false }, 3000 )
          } else {
            this.isNotified = false
          }
        })
      },
      route: function() {
        
      },
      location: function() {
        let currentLocation = { latitude: this.$store.getters.location[0], longitude: this.$store.getters.location[1] } 
        this.kiosksClose = this.$store.getters.kiosks.filter((data) => {
          const lat = JSON.parse(data[11])
          const long = JSON.parse(data[12])
          return getDistance(
            currentLocation,
            { latitude: lat, longitude: long }
          ) < 200
        })
      },
      //API data layers
      fixits: function() { mLayers.fixitMarkers(this) },
      kiosks: function() { mLayers.kioskMarkers(this) },
      trails: function() { mLayers.addTrails(this) },
      //User issue report layers
      potholes: function() { mLayers.potholeMarkers(this) },
      mildTraffic: function() { mLayers.mildTrafficMarkers(this) },
      heavyTraffic: function() { mLayers.heavyTrafficMarkers(this) },
      crackedPavement: function() { mLayers.crackedPavementMarkers(this) },
      dirtyLanes: function() { mLayers.dirtyLaneMarkers(this) },
      otherIssues: function() { mLayers.otherIssueMarkers(this) },
      //User commendation report layer
      // parking: function() {
      //     mLayers.parkingMarkers(this)
      // },
      bikeRacks: function() { mLayers.bikeRackMarkers(this) },
      bikeFriendlyBusiness: function() { mLayers.bikeFriendlyBusinessMarkers(this) },
      scenicAreas: function() { mLayers.scenicAreaMarkers(this) },
      otherCommendations: function() { mLayers.otherCommendationMarkers(this) }

    },
    computed: {
      route: function() { return this.$store.getters.route },
      location: function() { return this.$store.getters.location },
      //API data getters
      kiosks: function() { return this.$store.getters.kiosks },
      trails: function() { return this.$store.getters.trails },
      fixits: function() { return this.$store.getters.fixits },
      //User issue getters
      potholes: function() { return this.$store.getters.potholes },
      mildTraffic: function() { return this.$store.getters.mildTraffic },
      heavyTraffic: function() { return this.$store.getters.heavyTraffic },
      crackedPavement: function() { return this.$store.getters.crackedPavement },
      dirtyLanes: function() { return this.$store.getters.dirtyLanes },
      otherIssues: function() { return this.$store.getters.otherIssues },
      //User commendation layers
      // parking: function() {
      //     return this.$store.getters.parking
      // }
      // ,
      bikeRacks: function() { return this.$store.getters.bikeRacks },
      bikeFriendlyBusiness: function() { return this.$store.getters.bikeFriendlyBusiness },
      scenicAreas: function() { return this.$store.getters.scenicAreas },
      otherCommendations: function() { return this.$store.getters.otherCommendations }
    },
    methods: {
      toggleLayer(layer) { return mLayers.toggleLayer(layer, this, this.$data.map) },
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
        //API data layers
        this.$data.trailsLayer = L.geoJSON()
        this.$data.fixitsLayer = L.layerGroup('')
        this.$data.kiosksLayer = L.layerGroup('')
        //User reported issues layers
        this.$data.potholesLayer = L.layerGroup('')
        this.$data.mildTrafficLayer = L.layerGroup('')
        this.$data.heavyTrafficLayer = L.layerGroup('')
        this.$data.crackedPavementLayer = L.layerGroup('')
        this.$data.dirtyLanesLayer = L.layerGroup('')
        this.$data.otherIssuesLayer = L.layerGroup('')
        //User reported commendations layers
        // this.$data.parkingLayer = L.layerGroup('')
        this.$data.bikeRacksLayer = L.layerGroup('')
        this.$data.bikeFriendlyBusinessLayer = L.layerGroup('')
        this.$data.scenicAreasLayer = L.layerGroup('')
        this.$data.otherCommendationsLayer = L.layerGroup('')
        //end layers

        //map creation
        var mymap = L.map('mapid', {
            center: [30.269, -97.743],
            zoom: 13,
            layers: [
            // this.$data.mainDarkLayer,
            this.$data.mainLightLayer,
            //API layers
            this.$data.trailsLayer,
            this.$data.fixitsLayer,
            this.$data.kiosksLayer,
            //User issue layers
            this.$data.potholesLayer,
            this.$data.mildTrafficLayer,
            this.$data.heavyTrafficLayer,
            this.$data.crackedPavementLayer,
            this.$data.dirtyLanesLayer,
            this.$data.otherIssuesLayer,
            //User commendation layers
            // this.$data.parkingLayer,
            this.$data.bikeRacksLayer,
            this.$data.bikeFriendlyBusinessLayer,
            this.$data.scenicAreasLayer,
            this.$data.otherCommendationsLayer
            ]
        })
        let bingKey = 'Av5guhuRA2EPX3ahI-QuCJvUS0ORctt8aZuWVYh3Os-YAIXQ887T7Fj2mFkgwQOP'
        let mapboxKey = 'pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg'
        // end map creation
        // geocoder: L.Control.Geocoder.bing(bingKey),
        // geocoder: geoCodeItUp,
        // google('AIzaSyBjMJWjY2zb7Q8aOMZWZlOhZTY_auGszj4'),

        this.$data.map = mymap

        let router = L.Routing.control({
          router: L.Routing.mapbox(mapboxKey),
          position: "topleft",
          fitSelectedRoutes: true,
          showAlternatives: true,
          altLineOptions: {styles: [{color: 'gray'}]},
          reverseWaypoints: true,
          routeWhileDragging: true,
          geocoder: L.Control.Geocoder.mapbox(mapboxKey),
          collapsible: true,
          show: false
        }).addTo(mymap)

        //map location
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
            if ( !this.$data.enRoute ) {
              mLocation.setInitialWaypoint(position.coords, router)
            } 
          })
        }
        
        let store = this.$store
        router.on("routeselected", function (route) {
          this.$data.enRoute = true
          router.hide() 
          store.dispatch('FIND_ROUTE', route)
        })

        let position = L.marker([30.269, -97.74]).bindPopup('Configuring your location...').addTo(mymap).openPopup()
        let area = L.circle([30.269, -97.74], 120).addTo(mymap)

        mLocation.locate(this, mymap, position, area, router)

        function getHandlerForFeature(feat) {
          return function(ev) {
          }
        }

        function closeFunc (e) { this.closePanels()}

        function pan (e) {
          this.closePanels()
          this.$store.commit('TOGGLE_VIEW_LOCKED', false)
        }


        function click (e) {
          this.closePanels()
          let position = [e.latlng.lat, e.latlng.lng];
          document.getElementsByClassName('closure')[0].setAttribute('id', 'active')
          var reports = document.getElementsByClassName('reporting');
          reports[0].setAttribute('id', 'selected');
          reports[0].setAttribute('data', position);
        }

        //Captures clicks on the map
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
  .leaflet-routing-alternatives-container{
      display: none;
}
</style> 
