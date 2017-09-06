<template>
  <div>
    <div class="closure">Closure and Back Buttons Here</div>

    <div class="reporting">
      <button v-on:click="toReportType('issuesDiv')" class="issues twoWide button">Issues</button>
      <button v-on:click="toReportType('commendationsDiv')" class="commendations twoWide button">Commend</button>
    </div>

    <div class="issuesDiv">
      <button v-on:click="postReport('pothole', 'pothole')" class="issues fourWide button">Potholes</button>
      <button v-on:click="toReportType('bikelanesDiv')" class="issues fourWide button">Bad Bike Lanes</button>
      <button v-on:click="toReportType('trafficDiv')" class="issues fourWide button">Traffic</button>
      <button v-on:click="toReportType('otherDiv', 'issue')" class="issues fourWide button">Other</button>
    </div>

    <div class="bikelanesDiv">
      <button v-on:click="postReport('bikelanes', 'Cracked Pavement')" class="issues twoWide button">Cracked Pavement</button>
      <button v-on:click="postReport('bikelanes', 'Dirty Bike Lane')" class="issues twoWide button">Dirty Bike Lane</button>
    </div>

    <div class="trafficDiv">
      <button v-on:click="postReport('traffic', 'Mild Traffic')" class="issues twoWide button">Mild Traffic</button>
      <button v-on:click="postReport('traffic', 'Heavy Traffic')" class="issues twoWide button">Heavy Traffic</button>
    </div>

    <div class="commendationsDiv">
      <button v-on:click="postReport('goodarea', 'goodarea')" class="commendations fourWide button">Good Break Area</button>
      <button v-on:click="postReport('clean', 'clean')" id="clean" class="commendations fourWide button">Who</button>
      <button v-on:click="postReport('anotherop', 'anotherop')" class="commendations fourWide button">Knows</button>
      <button v-on:click="toReportType('otherDiv', 'commendation')" class="commendations fourWide button">Other</button>
    </div>

    <div class="otherDiv">
      <textarea id="inputBox" rows="8" cols="50" placeholder="Give us your thoughts!"></textarea>
      <button class="other button fourWide" v-on:click="otherReport()">Send Report</button>
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
        if (other) document.getElementsByClassName('otherDiv')[0].setAttribute('data', other)
        document.getElementsByClassName(reportType)[0].setAttribute('id', 'selected')
      },

      closeReporting: () => {
        document.getElementById('selected').removeAttribute('id')
      },

      postReport(type, content) {
        let reportInfo = {reportType: type, reportContent: content, userid: 1, position: document.getElementsByClassName('reporting')[0].getAttribute('data')}
        this.$store.dispatch('POST_REPORT', reportInfo)
        document.getElementById('selected').removeAttribute('id')
      },
      otherReport() {
        this.postReport(document.getElementsByClassName('other')[0].getAttribute('data'), document.getElementById('inputBox').value)
        document.getElementsByClass('other')[0].removeAttribute('data')
      }
    }
  }
</script>