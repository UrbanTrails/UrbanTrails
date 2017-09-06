<template>
  <div>
    <div id="mapid"></div>
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
  import mLocation from './leafletMethods/methLocation.js'
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
        kiosksClose: []
      };
    },
    beforeCreate() {
      this.$store.dispatch('FIND_LOCATION')
      this.$store.dispatch('LOAD_KIOSKS')
      this.$store.dispatch('LOAD_TRAILS')
      this.$store.dispatch('LOAD_FIXITS')
    },

    mounted() {
      this.makeMap()
    },
    watch: {
      kiosksClose: function() {
        console.log('STATE CHANGED')
        this.kiosksClose.forEach(kiosk => alert(`Your'e within 200 meters from ${kiosk[9]}`))
      },
      location: function() {
        console.log('you are in this location', this.$store.getters.location)
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
      kiosks: function() {
        mLayers.kioskMarkers(this)
      },
      trails: function(){
        mLayers.addTrails(this)
      }
    },
    computed: {
      location: function() {
          return this.$store.getters.location
      },
      kiosks: function() {
          return this.$store.getters.kiosks
      },
      trails: function() {
          return this.$store.getters.trails
      },
      fixits: function() {
          return this.$store.getters.fixits
      },
    },
    methods: {
      toggleLayer(layer) {
        return mLayers.toggleLayer(layer, this, this.$data.map)
      },
      // transformMap(dir, percentage) {
      //   document.getElementById("mapid").style[dir] = percentage
      //   this.$data.map.invalidateSize({
      //     pan: true,
      //     zoom: false
      //   })
      // },
      closePanels() {
        if (this.$store.state.sidePanelOpen) {
          this.$store.commit('TOGGLE_SIDEPANEL')
        }
      },

      makeMap() {

        //layers including empty
        this.$data.mainLightLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
          maxZoom: 18,
          id: 'mapbox.streets'
        })
        this.$data.mainDarkLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
            maxZoom: 18,
            id: 'mapbox.streets'
        })
        this.$data.trailsLayer = L.geoJSON()
        this.$data.fixitsLayer = L.layerGroup('')
        this.$data.kiosksLayer = L.layerGroup('')
        //end layers

        //map creation
        var mymap = L.map('mapid', {
            center: [51.505, -0.09],
            zoom: 13,
            layers: [
            this.$data.mainLightLayer,
            this.$data.mainDarkLayer,
            this.$data.trailsLayer,
            this.$data.fixitsLayer,
            this.$data.kiosksLayer,
            ]
        });
        this.$data.map = mymap
        //end map creation
        L.Control.geocoder({position: "topleft"}).addTo(this.map);

        //map location
        // mLocation.locate()

        mLocation.locate(this, mymap)

        function getHandlerForFeature(feat) {  // A function...
          return function(ev) {   // ...that returns a function...
            console.log(feat);  // ...that has a closure over the value.
          }
        }

        function click (e) {
          this.closePanels()
          console.log('One, ah ah ah');
        }

        function doubleClick (e) {
          console.log('TWO, AH AH AH');
          let position = [e.latlng.lat, e.latlng.lng];
          var reports = document.getElementsByClassName('reporting');
          reports[0].setAttribute('id', 'selected');
          reports[0].setAttribute('data', position);
        }

        //capture clicks on the map
        mymap.on('dblclick', doubleClick.bind(this));
        mymap.on('click', click.bind(this));
        mymap.on('movestart', click.bind(this))
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

</style>
