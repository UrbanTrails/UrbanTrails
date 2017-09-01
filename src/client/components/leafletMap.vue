<template>
  <div id="mapid">
    <Dropdown></Dropdown>
  </div>
</template>

<script>
  import * as L from 'leaflet';
  import * as Pin from 'leaflet.marker.pin';
  import meth from './leafletMethods/leafletMethods.js'
  import loadLayer from './leafletMethods/methLoadLayer.js'
  import customPopup from './leafletMethods/methPopup.js'
  import hamburger from './leafletMethods/methHamburger.js'
  import mLocation from './leafletMethods/methLocation.js'
  export default {
    data() {
      return {
        w: 700,
        h: 580,
        map: 'blah',
        mainLayer: null,
        trailsLayer: null,
        fixitsLayer: null,
        kiosksLayer: null,
      };
    },
    beforeCreate() {
      this.$store.dispatch('LOAD_KIOSKS')
      this.$store.dispatch('LOAD_TRAILS')
      this.$store.dispatch('LOAD_FIXITS')
    },

    mounted() {
      this.makeMap()
    },
    watch: {
      fixits: function() {
        loadLayer.fixitMarkers(this)
      },
      kiosks: function() {
        loadLayer.kioskMarkers(this)
      },
      trails: function(){
        loadLayer.addTrails(this)
      },
    },
    computed: {
      kiosks: function() {
          return this.$store.getters.kiosks
      },
      trails: function() {
          return this.$store.getters.trails
      },
      fixits: function() {
          return this.$store.getters.fixits
      }
    },
    methods: {
      makeMap() {
        // var myInterface = L.marker.pin.interface ( );
        //
        // myInterface.UserLanguage = 'en';
        //
        // myInterface.addDefaultCategories ( );
        //
        // myInterface.setCallbackFunction ( function ( ) { history.pushState ( { index : "bar" } , "page", '?pin=' + myInterface.stringifyPins ( ) ); });

        //layers including empty
        this.$data.mainLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
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
            this.$data.mainLayer,
            this.$data.trailsLayer,
            this.$data.fixitsLayer,
            this.$data.kiosksLayer]
        });
        this.$data.map = mymap
        //end map creation

        //map location
        mLocation.locate(this, mymap)
        //end map location

        // layer control
        hamburger.addControl(this, mymap)
        //end layer control



        // mymap.on ( 'click', function ( Event ) { myInterface.newPin ( mymap, Event.latlng )} );
        // mymap.on ( 'contextmenu', function ( Event ) { myInterface.newPin ( mymap, Event.latlng )} );
        //
        // var Search = decodeURI ( window.location.search );
        // if ( 0 <= Search.indexOf ( 'pin=' ) ) { myInterface.parsePins ( Search.substr ( Search.indexOf ( 'pin=' ) + 4 ), mymap );}
        //
        function getHandlerForFeature(feat) {  // A function...
          return function(ev) {   // ...that returns a function...
            console.log(feat);  // ...that has a closure over the value.
          }
        }

        // The button doesn't exist in the DOM until the popup has been opened, so
        mymap.on('popupopen', function(){
          L.DomEvent.on(
            document.getElementById('mybutton'),
            'click',
            getHandlerForFeature("hi guys!!") // The result of this call is the event handler func.
          );
        });

        function doubleClick (e) {
          var popup = L.popup.call(this)
          .setLatLng([e.latlng.lat, e.latlng.lng])
          .setContent("<button id='mybutton'>Foo!</button>")
          .openOn(mymap);
        }

        mymap.on('dblclick', doubleClick.bind(this))

      },
    },
  };
</script>

<style>
  #mapid {height: 500px;}
</style>
