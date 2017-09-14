/* eslint-disable no-undef */
import { fixitIcon, kioskIcon, rackIcon, potholeIcon, mildIcon, stopIcon, storeIcon, trashIcon, cameraIcon, coneIcon, mentionIcon } from '../mapIcons'

export default {
  fixitMarkers: (context) => {
    context.fixits.forEach((chunk) => {
      const lat = chunk[11][1]
      const lon = chunk[11][2]
      const name = chunk[8]
      const address = JSON.parse(chunk[11][0]).address
      const marker = L.marker([lat, lon], { icon: fixitIcon })
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
        const marker = L.marker([lat, lon], { icon: kioskIcon })
        marker.bindPopup(`${address} Bicycle Kiosk`)
        context.$data.kiosksLayer.addLayer(marker)
      }
    })
  },
  parkingMarkers(context) {
    context.parking.forEach((chunk) => {
      const address = chunk[9]
      const lat = chunk[11]
      const lon = chunk[12]
      const marker = L.marker([lat, lon], { icon: rackIcon })
      marker.bindPopup(`${address} Bicycle Rack`)
      context.$data.parkingLayer.addLayer(marker)
    })
  },
  potholeMarkers(context) {
    context.potholes.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: potholeIcon })
      marker.bindPopup(`${chunk.report_data} found at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.potholesLayer.addLayer(marker)
    })
  },
  mildTrafficMarkers(context) {
    context.mildTraffic.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: mildIcon })
      marker.bindPopup(`Mild traffic reported at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.mildTrafficLayer.addLayer(marker)
    })
  },
  heavyTrafficMarkers(context) {
    context.heavyTraffic.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: stopIcon })
      marker.bindPopup(`Heavy traffic reported at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.heavyTrafficLayer.addLayer(marker)
    })
  },
  crackedPavementMarkers(context) {
    context.crackedPavement.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: coneIcon })
      marker.bindPopup(`Cracked pavement found at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.crackedPavementLayer.addLayer(marker)
    })
  },
  dirtyLaneMarkers(context) {
    context.dirtyLanes.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: trashIcon })
      marker.bindPopup(`Dirty lane reported at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.dirtyLanesLayer.addLayer(marker)
    })
  },
  otherIssueMarkers(context) {
    context.otherIssues.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: mentionIcon })
      marker.bindPopup(`Rider reported ${chunk.report_data}, at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.otherIssuesLayer.addLayer(marker)
    })
  },
  bikeRackMarkers(context) {
    context.bikeRacks.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: rackIcon })
      marker.bindPopup(`Bike racks found at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.bikeRacksLayer.addLayer(marker)
    })
  },
  bikeFriendlyBusinessMarkers(context) {
    context.bikeFriendlyBusiness.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: storeIcon })
      marker.bindPopup(`Bike-friendly Business found at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.bikeFriendlyBusinessLayer.addLayer(marker)
    })
  },
  scenicAreaMarkers(context) {
    context.scenicAreas.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: cameraIcon })
      marker.bindPopup(`Scenic area found at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.scenicAreasLayer.addLayer(marker)
    })
  },
  otherCommendationMarkers(context) {
    context.otherCommendations.forEach((chunk) => {
      const coords = chunk.coordinates.split(',')
      const marker = L.marker([coords[0], coords[1]], { icon: mentionIcon })
      console.log(chunk)
      marker.bindPopup(`Rider reported '${chunk.report_data}' at ${chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) >= 12 ? Math.round(chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) % 12) + 'pm' : chunk.created_at.slice(chunk.created_at.indexOf('T')+1, chunk.created_at.indexOf('T')+3) + 'am'}`)
      context.$data.otherCommendationsLayer.addLayer(marker)
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
