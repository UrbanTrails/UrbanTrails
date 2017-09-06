<template>
  <div id="SignInOrUp">
    <h2>Welcome to Urban Trails</h2>
    <div>
      <form>
        <input v-model="username" placeholder="username"></input>
        <input v-model="password" placeholder="password"></input>
        <input type="submit" @click="toggleToMap"></input>
      </form>
    </div>
    <button @click="toggleToMap">Skip to map</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        SignInOrUp: ['Sign In', 'Sign Up'],
        username: '',
        password: '',
      }
    },
    methods: {
      toggleToMap() {
        this.$store.commit('TOGGLE_TO_MAP')
      }

    }
  }
</script>

<style>
  .containerCenter {
    position: fixed;
    width: 100%;
    height: 120px;
    z-index: 2000;
  }
  #SignInOrUp {
    margin: auto;
    width: 800px;
    height: 120px;
    background-color: white
  }
</style>
