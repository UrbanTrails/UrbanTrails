export default {
  drug: () => console.log('dosed'),
  fixitMarkers: (map) => {
    map.fixits.forEach((chunk) => {
      let lat = chunk[11][1]
      let lon = chunk[11][2]
      let name = chunk[8]
      let address = JSON.parse(chunk[11][0]).address
      let marker = L.marker([lat, lon])
      marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
      map.$data.fixitsLayer.addLayer(marker)
    })
  },
  kioskMarkers(map) {
    map.kiosks.forEach((chunk) => {
      if (chunk[10] === 'active') {
        let address = chunk[9]
        let lat = chunk[11]
        let lon = chunk[12]
        let marker = L.marker([lat, lon])
        marker.bindPopup(`${address} Bicycle Kiosk`)
        map.$data.kiosksLayer.addLayer(marker)
      }
    })
  },
  addTrails(map) {
    map.$data.trailsLayer.addData(map.trails)
  },
}
