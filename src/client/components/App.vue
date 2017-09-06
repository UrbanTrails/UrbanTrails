<template>
  <v-app>
    <leafletMap></leafletMap>
  </v-app>
</template>

<script>
  export default {
    mounted() {
      this.detectmob()
    },
    computed: {

    },
    methods: {
      detectmob() {
        console.log(window.innerWidth)
        if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)) {
            this.$store.commit('SET_MOBILE', true)
          } else {
            this.$store.commit('SET_MOBILE', false)
          }
        console.log('mobile', this.$store.state.mobile)
      },
    }
  }
</script>
