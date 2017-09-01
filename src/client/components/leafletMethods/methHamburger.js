export default {
  drug: () => console.log('dosed'),
  addControl: (context, mymap) => {
    var baseMaps = {
      "Main": context.$data.mainLayer,
    };
    var overlayMaps = {
      "Trails": context.$data.trailsLayer,
      "Fixits": context.$data.fixitsLayer,
      "Kiosks": context.$data.kiosksLayer,
    };

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
  }
}
