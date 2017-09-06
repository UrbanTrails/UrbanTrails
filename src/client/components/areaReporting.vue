<template>
  <div>
    <div class="reporting">
      <button v-on:click="toReportType(1)" class="button" id="reportIssue">Issues</button>
      <button v-on:click="toReportType(2)" class="button" id="reportRecommendation">Recommendations</button>
    </div>

    <div class="issues">
      <button v-on:click="postReport('pothole')" class="button" id="pothole">Pothole</button>
      <button v-on:click="postReport('sidewalks')" class="button" id="sidewalks">Sidewalks</button>
      <button v-on:click="postReport('traffic')" class="button" id="traffic">Traffic</button>
      <button v-on:click="postReport('other')" class="button" id="other">Other</button>
    </div>
    <div class="recommendations">
      <button v-on:click="postReport('goodarea')" class="button" id="goodarea">Good Area</button>
      <button v-on:click="postReport('clean')" class="button" id="clean">Clean</button>
      <button v-on:click="postReport('anotherop')" class="button" id="anotherOp">Another Op</button>
      <button v-on:click="postReport('other')" class="button" id="other">Other</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {};
    },
    mounted() {
      console.log(this)
    },
    methods: {
      toReportType: (reportType) => {
        document.getElementsByClassName('reporting')[0].removeAttribute('id')
        if (reportType === 1) {
          document.getElementsByClassName('issues')[0].setAttribute('id', 'selected')
        } else {
          document.getElementsByClassName('recommendations')[0].setAttribute('id', 'selected')
        }
      },

      postReport(reportName) {
        console.log(reportName);
        let reportInfo = {reportType: reportName, userid: 1, position: document.getElementsByClassName('reporting')[0].getAttribute('data')};
        this.$store.dispatch('POST_REPORT', reportInfo);
      }
    }
  }
</script>