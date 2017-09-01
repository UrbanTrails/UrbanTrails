export default {
  addControl: (context, mymap) => {
    let baseMaps = {
      'Main': context.$data.mainLayer,
    }
    let overlayMaps = {
      'Trails': context.$data.trailsLayer,
      'Fixits': context.$data.fixitsLayer,
      'Kiosks': context.$data.kiosksLayer,
    }
    L.control.layers(baseMaps, overlayMaps).addTo(mymap)
  }
}
