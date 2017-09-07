<template>
  <v-app>
    <leafletMap></leafletMap>
    <SignInOrUp v-show="this.$store.state.viewSignIn"></SignInOrUp>
  </v-app>
</template>

<script>
  export default {
    beforeCreate() {
      this.$store.dispatch('GET_SESSION')
    },
    mounted() {
      this.detectmob()
    },
    methods: {
      detectmob() {
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
      },
    }
  }
</script>
