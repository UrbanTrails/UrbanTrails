import * as L from 'leaflet'

const fixitSVG = '../../static/repair-bicycle.svg'
const kioskSVG = '../../static/rental-bicycle.svg'
const rackSVG = '../../static/parking-bicycle.svg'
const potholeSVG = '../../static/icons/pothole.svg'
const trashSVG = '../../static/icons/trash.svg'
const mildSVG = '../../static/icons/mild.svg'
const stopSVG = '../../static/icons/stop.svg'
const storeSVG = '../../static/icons/store.svg'
const coneSVG = '../../static/icons/cone.svg'
const cameraSVG = '../../static/icons/camera.svg'
const mentionSVG = '../../static/icons/mention.svg'

const mentionIcon = L.icon({
  iconUrl: mentionSVG,
  iconSize: [38, 95],
})
const fixitIcon = L.icon({
  iconUrl: fixitSVG,
  iconSize: [38, 95],
})
const kioskIcon = L.icon({
  iconUrl: kioskSVG,
  iconSize: [38, 95],
})

const rackIcon = L.icon({
  iconUrl: rackSVG,
  iconSize: [38, 95],
})

const mildIcon = L.icon({
  iconUrl: mildSVG,
  iconSize: [38, 95],
})

const potholeIcon = L.icon({
  iconUrl: potholeSVG,
  iconSize: [38, 50]
})

const trashIcon = L.icon({
  iconUrl: trashSVG,
  iconSize: [38, 50]
})

const stopIcon = L.icon({
  iconUrl: stopSVG,
  iconSize: [38, 50]
})

const storeIcon = L.icon({
  iconUrl: storeSVG,
  iconSize: [38, 50]
})

const cameraIcon = L.icon({
  iconUrl: cameraSVG,
  iconSize: [38, 40]
})

const coneIcon = L.icon({
  iconUrl: coneSVG,
  iconSize: [38, 50]
})

export { fixitIcon, kioskIcon, rackIcon, potholeIcon, trashIcon, mildIcon, stopIcon, storeIcon, cameraIcon, coneIcon, mentionIcon }
