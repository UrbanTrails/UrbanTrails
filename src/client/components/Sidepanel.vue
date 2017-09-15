<template>
  <div id="slide-in-container">
    <v-btn id="hamburger" class="overLeaflet" @click="toggleVisible" @dblclick="toggleVisible" primary dark raised icon><v-icon>mdi-menu</v-icon></v-btn>
    <transition name="slide-fade">
      <div id="sidepanel-list" class="base overEverything" v-if="this.$store.state.sidePanelOpen">
        <div id="sidepanel-heading" class="primary">
          <h4 class="light--text">Urban Trails</h4>
          <v-btn @click="toggleVisible" icon center>
            <v-icon light>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <h6 v-if="this.$store.state.signedIn">Welcome {{this.$store.state.user.email}}</h6>
        </div>
        <div class="sidepanel-content add-overflow" v-bind:style="{ height: heightPercent }" >
          <button @click="changeBool('fixits')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !fixitsBool }" src="/static/repair-bicycle.svg"></img><label>Fixits</label></button>
          <button @click="changeBool('kiosks')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !kiosksBool }" src="/static/rental-bicycle.svg"></img><label>Kiosks</label></button>
          <button @click="changeBool('bikeRacks')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !bikeRacksBool }" src="/static/parking-bicycle.svg"></img><label>Bike Racks</label></button>

          <button @click="changeBool('potholes')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !potholesBool }" src="/static/icons/pothole.svg"></img><label>Potholes</label></button>
          <button @click="changeBool('mildTraffic')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !mildTrafficBool }" src="/static/icons/mild.svg"></img><label>Mild Traffic</label></button>
          <button @click="changeBool('heavyTraffic')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !heavyTrafficBool }" src="/static/icons/stop.svg"></img><label>Heavy Traffic</label></button>
          <button @click="changeBool('crackedPavement')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !crackedPavementBool }" src="/static/icons/cone.svg"></img><label>Cracked Pavement</label></button>
          <button @click="changeBool('dirtyLanes')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !dirtyLanesBool }" src="/static/icons/trash.svg"></img><label>Dirty Lanes</label></button>
          <button @click="changeBool('bikeFriendlyBusiness')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !bikeFriendlyBusinessBool }" src="/static/icons/store.svg"></img><label>Bike Friendly Store</label></button>
          <button @click="changeBool('scenicAreas')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !scenicAreasBool }" src="/static/icons/camera.svg"></img><label>Scenic Areas</label></button>
          <button @click="changeBool('otherCommendations')" class="toggleBtn input-group"><img v-bind:class="{ greyBtn: !otherCommendationsBool }" src="/static/icons/mention.svg"></img><label>Other</label></button>


          <v-switch @click="changeBool('trails')" v-bind:label="`Trails`" v-model="trailsBool" light hide-details></v-switch>
          <v-switch @click="toggleMainLayer()" v-bind:label="`Dark`" v-model="mainDarkBool" light hide-details></v-switch>
        </div>
        <div class="sidepanel-content">
          <hr></hr>
          <v-btn v-if="!this.$store.state.signedIn" @click="openSignInOrUp('SignIn')">Sign in</v-btn>
          <v-btn v-if="!this.$store.state.signedIn" @click="openSignInOrUp('SignUp')">Sign up</v-btn>
          <v-btn v-if="this.$store.state.signedIn" @click="$store.dispatch('USER_SIGN_OUT')">Sign Out</v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

  <script>
    export default {
      props: ['toggleLayer'],
      data() {
        return {
          visible: false,
          heightPercent: '70%',
          mainDarkBool: false,
          trailsBool: true,
          kiosksBool: true,
          fixitsBool: true,
          potholesBool: true,
          mildTrafficBool : true,
          heavyTrafficBool : true,
          crackedPavementBool : true,
          dirtyLanesBool : true,
          otherIssuesBool : true,
          // parkingBool: true,
          bikeRacksBool : true,
          bikeFriendlyBusinessBool : true,
          scenicAreasBool : true,
          otherCommendationsBool: true,
        }
      },
      mounted() {
        this.$data.heightPercent = `${100 * ((window.document.body.clientHeight - 200) / window.document.body.clientHeight)}%`
      },
      methods: {
        openSignInOrUp(value) {
          this.$store.commit('TOGGLE_SIDEPANEL')
          this.$store.commit('TOGGLE_SIOU_ACTIVE', value)
          this.$store.commit('TOGGLE_VIEW_SIGN_IN', true)
        },
        toggleMainLayer(){
          const layers = ['mainDark', 'mainLight']
          for (let layer of layers) {
            this.changeBool(layer)
          }
        },
        changeBool(layer) {
          this.$data[`${layer}Bool`] = this.toggleLayer(`${layer}Layer`)
        },
        toggleVisible(e) {
          this.$store.commit('TOGGLE_SIDEPANEL')
        },
      }
    }
  </script>
<style scoped>
  #slide-in-container {
    height: 100%;
  }

  #hamburger {
    position: fixed;
    top: 12px;
    right: 2px;
    height: 48px;
    width: 48px;
  }

  #sidepanel-list {
    position: fixed;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 250px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  #sidepanel-heading {
    height: 120px;
    padding: 15px;
    background: antiquewhite;
  }

  #sidepanel-heading > h4 {
    float: left;
    font-size: 28px;
  }

  #sidepanel-heading > h6 {
    float: left;
  }

  #sidepanel-heading > button{
    float: right;
  }

  .sidepanel-content {
    padding: 0px 15px;
  }

  .add-overflow {
    max-height: 715px;
    overflow: auto;
  }

  .toggleBtn {
    width: 100%;
    float: left;
    padding: 0px;
    margin: 12px 0px;
  }

  .toggleBtn > img {
    height: 36px;
    float: left;
    transition: all .3s ease;

  }

  .toggleBtn > label {
    margin-left: 12px;
    width: 155px;
    line-height: 36px;
    color: rgba(0,0,0,.54);
  }

  .greyBtn {
    filter: brightness(0) contrast(10%);
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translatex(100%);
    // opacity: 0;
  }


</style>
