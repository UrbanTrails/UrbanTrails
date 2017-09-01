/* eslint-disable no-undef */
export default {
  // addControl: (context, mymap) => {
  //   const baseMaps = {
  //     Main: context.$data.mainLayer,
  //   }
  //   const overlayMaps = {
  //     "<span style='color: gray'>Trails</span>": context.$data.trailsLayer,
  //     Fixits: context.$data.fixitsLayer,
  //     Kiosks: context.$data.kiosksLayer,
  //   }
  //   L.control.layers(baseMaps, overlayMaps).addTo(mymap)
  // }
  toggleLayer: (layer, context, mymap) => {
    if(mymap.hasLayer(context.$data[layer])){
      mymap.removeLayer(context.$data[layer])
    } else {
      mymap.addLayer(context.$data[layer])
    }
  }
}
