<template>
  <div>
    <div class="">Closure and Back Buttons Here</div>

    <div class="reporting">
      <button v-on:click="toReportType('issues')" class="button" id="reportIssue">Issues</button>
      <button v-on:click="toReportType('commendations')" class="button" id="reportCommendation">Commend</button>
    </div>

    <div class="issues">
      <button v-on:click="postReport('pothole', 'pothole')" class="button" id="pothole">Potholes</button>
      <button v-on:click="toReportType('bikelanes')" class="button" id="sidewalks">Bad Bike<br>Lanes</button>
      <button v-on:click="toReportType('traffic')" class="button" id="traffic">Traffic</button>
      <button v-on:click="toReportType('other', 'issue')" class="button" id="other">Other</button>
    </div>

    <div class="commendations">
      <button v-on:click="postReport('goodarea', 'goodarea')" class="button" id="goodarea">Good Break<br>Area</button>
      <button v-on:click="postReport('clean', 'clean')" class="button" id="clean">Who</button>
      <button v-on:click="postReport('anotherop', 'anotherop')" class="button" id="anotherOp">Knows</button>
      <button v-on:click="toReportType('other', 'commendation')" class="button" id="other">Other</button>
    </div>

    <div class="bikelanes">
      <button v-on:click="postReport('bikelanes', 'Cracked Pavement')">
        Cracked Pavement
      </button>
      <button v-on:click="postReport('bikelanes', 'Dirty Bike Lane')">
        Dirty Bike Lane
      </button>
    </div>

    <div class="traffic">
      <button v-on:click="postReport('traffic', 'Mild Traffic')">
        Mild Traffic
      </button>
      <button v-on:click="postReport('traffic', 'Heavy Traffic')">
        Heavy Traffic
      </button>
    </div>

    <div class="other">
      <textarea id="inputBox" rows="8" cols="50" placeholder="Give us your thoughts!"> </textarea>
      <button v-on:click="otherReport()">Send Report</button>
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
        if (other) document.getElementsByClassName('other').setAttribute('data', type)
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
      otherReport: () => {
        postReport(document.getElementsByClass('other')[0].getAttribute('data'), document.getElementById('inputBox').text())
        document.getElementsByClass('other')[0].removeAttribute('data')
      }
    }
  }
</script>
