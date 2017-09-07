import * as L from 'leaflet'

const fixitSVG = '../../static/repair-bicycle.svg'
const kioskSVG = '../../static/rental-bicycle.svg'
const rackSVG = '../../static/parking-bicycle.svg'

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


export { fixitIcon, kioskIcon, rackIcon }
