/* eslint-disable no-undef */
export default {
  drug: () => console.log('dosed'),
  fixitMarkers: (map) => {
    map.fixits.forEach((chunk) => {
      const lat = chunk[11][1]
      const lon = chunk[11][2]
      const name = chunk[8]
      const address = JSON.parse(chunk[11][0]).address
      const marker = L.marker([lat, lon])
      marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
      map.$data.fixitsLayer.addLayer(marker)
    })
  },
  kioskMarkers(map) {
    map.kiosks.forEach((chunk) => {
      if (chunk[10] === 'active') {
        const address = chunk[9]
        const lat = chunk[11]
        const lon = chunk[12]
        const marker = L.marker([lat, lon])
        marker.bindPopup(`${address} Bicycle Kiosk`)
        map.$data.kiosksLayer.addLayer(marker)
      }
    })
  },
  addTrails(map) {
    map.$data.trailsLayer.addData(map.trails)
  },
}
