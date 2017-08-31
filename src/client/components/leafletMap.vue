<template>
  <div id="mapid"></div>
</template>

<script>
import * as L from 'leaflet';
export default {
  data() {
    return {
      w: 700,
      h: 580,
      map: "blah"
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
      this.fixitMarkers()
    },
    kiosks: function() {
      this.kioskMarkers()
    },
    trails: function(){
      this.addTrails()
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
    fixitMarkers() {
      this.fixits.forEach((chunk) => {
        let lat = chunk[11][1]
        let lon = chunk[11][2]
        let name = chunk[8]
        let address = JSON.parse(chunk[11][0]).address
        let marker = L.marker([lat, lon]).addTo(this.map);
        marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
      })
    },
    
    kioskMarkers() {
      this.kiosks.forEach((chunk) => {
        if (chunk[10] === 'active') {
          let address = chunk[9]
          let lat = chunk[11]
          let lon = chunk[12]
          let marker = L.marker([lat, lon]).addTo(this.map);
          marker.bindPopup(`${address} Bicycle Kiosk`)
        }
      })     
    },

    addTrails() {
      L.geoJSON(this.trails).addTo(this.map)
    },
    
    makeMap() {
      
      const mymap = L.map('mapid').setView([51.505, -0.09], 13)
      this.map = mymap
      this.map.locate({setView: true, zoom: 10});

       L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
       maxZoom: 18,
       id: 'mapbox.streets'
       }).addTo(this.map);

      let marker = L.marker([51.505, -0.09]).addTo(this.map);
       marker.bindPopup('Configuring your location...').openPopup();
 
      function onLocationFound(e) {
         var radius = e.accuracy / 2;
        L.marker(e.latlng)
          .addTo(this.map)
          .bindPopup("You are within " + radius + " meters from this point")
          .openPopup()
        
          L.circle(e.latlng, radius).addTo(this.map)
      }
      
      this.map.on('locationfound', onLocationFound.bind(this)).bind
     },

    },
    };
</script>

<style>
#mapid { height: 500px; }
</style>
