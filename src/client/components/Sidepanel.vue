<template>
  <div id="slide-in-container">
    <v-btn id="hamburger" class="overLeaflet" @click="toggleVisible" @dblclick="toggleVisible" primary dark raised icon><v-icon>mdi-menu</v-icon></v-btn>
    <transition name="slide-fade">
      <div id="sidepanel-list" class="base overEverything" v-if="this.$store.state.sidePanelOpen">
        <h4>Urban Trails</h4>
        <h6 v-if="this.$store.state.signedIn">Welcome {{this.$store.state.user.email}}</h6>
        <v-switch @click="changeBool('kiosks')" v-bind:label="`Kiosks`" v-model="kiosksBool" light></v-switch>
        <v-switch @click="changeBool('fixits')" v-bind:label="`Fixits`" v-model="fixitsBool" light></v-switch>
        <v-switch @click="changeBool('trails')" v-bind:label="`Trails`" v-model="trailsBool" light></v-switch>
        <v-switch @click="toggleMainLayer()" v-bind:label="`Dark`" v-model="mainDarkBool" light></v-switch>
        <hr></hr>
        <v-btn v-if="!this.$store.state.signedIn" @click="openSignInOrUp('SignIn')">Sign in</v-btn>
        <v-btn v-if="!this.$store.state.signedIn" @click="openSignInOrUp('SignUp')">Sign up</v-btn>
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
          mainDarkBool: false,
          kiosksBool: true,
          fixitsBool: true,
          trailsBool: true,
        }
      },
      computed: {

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
<style>
  #slide-in-container {
    height: 100%;
  }

  #hamburger {
    position: fixed;
    top: 12px;
    right: 12px;
    height: 48px;
    width: 48px;
  }

  #sidepanel-list {
    position: fixed;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 250px;
    padding: 0px 15px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
