
export default {
  L: null,
  addControl: (context, mymap) => {
    const baseMaps = {
      Main: context.$data.mainLayer,
    }
    const overlayMaps = {
      Trails: context.$data.trailsLayer,
      Fixits: context.$data.fixitsLayer,
      Kiosks: context.$data.kiosksLayer,
    }
    L.control.layers(baseMaps, overlayMaps).addTo(mymap)
  }
}
