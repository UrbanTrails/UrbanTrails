<template>
  <div id="slide-inContainer">
    <transition name="slide-fading">
      <div id="notification" v-if="isNotified">
        <audio id="audio" autoplay>
          <source src="../sounds/bikesound.mp3" type="audio/mpeg"></source>
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
      }
    },
    methods: {
    },
 }
</script>
<style scoped>
  #slide-inContainer {
    width: 99%;
    padding-left: 20px;
  }

  #notification {
    position: relative;
    width: 99%;
    height: 40px;
    background-color: transperant;
    top: -20px;
    padding: 10px 50px 10px 50px;
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
