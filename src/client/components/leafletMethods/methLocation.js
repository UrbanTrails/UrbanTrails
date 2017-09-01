/* eslint-disable no-undef */
export default {
  locate: (context, mymap) => {
    const marker = L.marker([51.505, -0.09]).addTo(mymap)
    marker.bindPopup('Configuring your location...').openPopup()

    mymap.locate({ setView: true, zoom: 10 })

    function onLocationFound(e) {
      const radius = e.accuracy / 2
      L.marker(e.latlng)
        .addTo(mymap)
        .bindPopup(`You are within ${radius} meters from this point`).openPopup()
      L.circle(e.latlng, radius).addTo(mymap)
    }
    mymap.on('locationfound', onLocationFound)
  }
}
