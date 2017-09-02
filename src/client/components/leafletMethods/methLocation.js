/* eslint-disable no-undef */
/* eslint-disable max-len */
import findAccuratePosition from './accuratePosition'
export default {
  locate: (context, mymap) => {
    const marker = L.marker([51.505, -0.09]).addTo(mymap)
    let circle = L.circle([51.505, -0.09], 0).addTo(mymap)
    marker.bindPopup('Configuring your location...').openPopup()

    function onLocationFound(e) {
      if (circle) {
        mymap.removeLayer(circle)
      }
      const radius = e.accuracy / 2
      const latln = { lat: e.latitude, lng: e.longitude }
      if (circle) {
        mymap.removeLayer(circle)
      }
      mymap.setView(latln, 18)
      marker.setLatLng(latln).closePopup()
        .bindPopup(`You are within ${radius} meters from this point`).openPopup()
      circle = L.circle(latln, radius).addTo(mymap)
    }
    mymap.on('accuratepositionfound', onLocationFound)

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        onLocationFound(position.coords)
      })
    }
    mymap.findAccuratePosition({maxWait: 15000, desiredAccuracy: 20})
  }
}
