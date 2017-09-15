<template>
  <div>
    <button class="closure areaReport" v-on:click="closeReport()">x</button>

    <div class="reporting areaReport">
      <button v-on:click="toReportType('issuesDiv')" class="issues dualChoices">Issues</button>
      <button v-on:click="toReportType('commendationsDiv')" class="commendations dualChoices">Commend</button>
    </div>

    <div class="issuesDiv areaReport">
      <button v-on:click="postReport('POTHOLES', 'Pothole')" class="issues quadChoices">Potholes</button>
      <button v-on:click="toReportType('bikelanesDiv')" class="issues quadChoices">Bad Bike Lanes</button>
      <button v-on:click="toReportType('trafficDiv')" class="issues quadChoices">Traffic</button>
      <button v-on:click="toReportType('otherDiv', 'OTHER_ISSUES')" class="issues quadChoices">Other</button>
    </div>

    <div class="bikelanesDiv areaReport">
      <button v-on:click="postReport('CRACKED_PAVEMENT', 'Cracked Pavement')" class="issues dualChoices">Cracked Pavement</button>
      <button v-on:click="postReport('DIRTY_LANES', 'Dirty Bike Lane')" class="issues dualChoices">Dirty Bike Lane</button>
    </div>

    <div class="trafficDiv areaReport">
      <button v-on:click="postReport('MILD_TRAFFIC', 'Mild Traffic')" class="issues dualChoices">Mild Traffic</button>
      <button v-on:click="postReport('HEAVY_TRAFFIC', 'Heavy Traffic')" class="issues dualChoices">Heavy Traffic</button>
    </div>

    <div class="commendationsDiv areaReport">
      <button v-on:click="postReport('BIKE_FRIENDLY_BUSINESS', 'bikeBusiness')" class="commendations quadChoices">Bike Friendly Business</button>
      <button v-on:click="postReport('SCENIC_AREAS', 'scenicArea')"class="commendations quadChoices">Scenic Area</button>
      <button v-on:click="postReport('BIKE_RACKS', 'bikeRacks')" class="commendations quadChoices">Bike Racks</button>
      <button v-on:click="toReportType('otherDiv', 'OTHER_COMMENDATIONS')" class="commendations quadChoices">Other</button>
    </div>

    <div class="otherDiv areaReport">
      <textarea id="otherInput" rows="8" cols="50" placeholder="Give us your thoughts!"></textarea>
      <button class="other quadChoices" id="otherReportButton" v-on:click="otherReport()">Send Report</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {};
    },
    mounted() {
    },
    methods: {
      toReportType: (reportType, other) => {
        document.getElementById('selected').removeAttribute('id')
        document.getElementsByClassName(reportType)[0].setAttribute('id', 'selected')
        if (other) document.getElementsByClassName('otherDiv')[0].setAttribute('data', other)
      },

      otherReport() {
        this.postReport(document.getElementsByClassName('otherDiv')[0].getAttribute('data'), document.getElementById('otherInput').value)
        document.getElementById('otherInput').value = ''
        document.getElementsByClassName('other')[0].removeAttribute('data')
      },

      postReport(type, content) {
        let reportInfo = {reportType: type, reportContent: content, userid: 1, created_at: new Date(), coordinates: document.getElementsByClassName('reporting')[0].getAttribute('data')}
        this.$store.dispatch('POST_REPORT', reportInfo)
        this.$store.dispatch(`LOAD_${type}`, reportInfo)
        document.getElementById('selected').removeAttribute('id')
        document.getElementById('active').removeAttribute('id')
      },

      closeReport() {
        document.getElementById('selected').removeAttribute('id')
        document.getElementById('active').removeAttribute('id')
        console.log('here')
        this.$store.commit('TOGGLE_NAVDIRECTIONS', true)
      }
    }
  }
</script>
