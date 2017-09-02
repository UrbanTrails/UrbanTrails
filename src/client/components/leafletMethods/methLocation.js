/* eslint-disable no-undef */
export default {
  locate: (context, mymap) => {
    // const clientlng = navigator.geolocation.watchPosition((position) => position.coords.longitude )
    // const clientlat = navigator.geolocation.watchPosition((position) => position.coords.latitude )
    const marker = L.marker([51.505, -0.09]).addTo(mymap)
    marker.bindPopup('Configuring your location...').openPopup()
    let circle = L.circle([51.505, -0.09], 0).addTo(mymap)

    function onLocationFound(e) {
      if (circle) {
        mymap.removeLayer(circle)
      }
      const radius = e.accuracy / 2
      const latln = {lat: e.latitude, lng: e.longitude}
      mymap.setView(latln, 18)
      marker.setLatLng(latln).closePopup()
      .bindPopup("You are within " + radius + " meters from this point").openPopup()
      circle = L.circle(latln, radius).addTo(mymap)
    }
    mymap.on('locationfound', onLocationFound)

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        onLocationFound(position.coords)
      })
    }
    mymap.locate()
  }
}
