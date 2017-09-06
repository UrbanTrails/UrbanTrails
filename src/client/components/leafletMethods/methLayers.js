/* eslint-disable no-undef */
export default {
  fixitMarkers: (context) => {
    context.fixits.forEach((chunk) => {
      const lat = chunk[11][1]
      const lon = chunk[11][2]
      const name = chunk[8]
      const address = JSON.parse(chunk[11][0]).address
      const marker = L.marker([lat, lon])
      marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
      context.$data.fixitsLayer.addLayer(marker)
    })
  },
  kioskMarkers(context) {
    context.kiosks.forEach((chunk) => {
      if (chunk[10] === 'active') {
        const address = chunk[9]
        const lat = chunk[11]
        const lon = chunk[12]
        const marker = L.marker([lat, lon])
        marker.bindPopup(`${address} Bicycle Kiosk`)
        context.$data.kiosksLayer.addLayer(marker)
      }
    })
  },
  addTrails(context) {
    context.$data.trailsLayer.addData(context.trails)
  },
  toggleLayer: (layer, context, mymap) => {
    let bool = true
    if (mymap.hasLayer(context.$data[layer])) {
      mymap.removeLayer(context.$data[layer])
      bool = false
    } else {
      mymap.addLayer(context.$data[layer])
    }
    return bool
  }
}
