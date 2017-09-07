<template>
  <div id="slide-inContainer">
    <transition name="slide-fading">
      <div id="notification" v-if="isNotified">
        <audio id="audio" autoplay>
          <source src="https://www.zedge.net/d2w/4/971615/275962413/view/?mp3" type="audio/mpeg"></source>
          G-dangit, you can't play audio.
        </audio>
      <div v-for='kiosk in notifiedKiosks'>
        <v-alert info value="true">
         You're within 200m from {{kiosk[9]}} kiosk!
        </v-alert>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: ['notifiedKiosks', 'isNotified'],
    data() {
      return {

      }
    },
    watch: {
      isNotified: () => {
          console.log('now i want the alert to transition out')
      }
    },
    methods: {
    },
 }
</script>
<style >
  #slide-inContainer {
    width: 100%;
  }

  #notification {
    position: relative;
    width: 100%;
    height: 30px;
    background-color: #9E9E9E;
    top: -20px;
    padding: 50px 50px 10px;
    z-index: 450;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fading-enter-active {
    transition: all .5s ease;
  }
  .slide-fading-leave-active {
    transition: all 1s ease;
  }
  .slide-fading-enter, .slide-fading-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translatey(-200px);
    // opacity: 0;
  }

</style>
