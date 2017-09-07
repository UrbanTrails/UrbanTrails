<template>
  <div id="signInOrUp">
    <v-tabs v-model="active" dark fixed centered secondary >
      <v-tabs-bar>
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item class="ml-5":key="1" :href="'#SignIn'">
          <p>Sign in</p>
        </v-tabs-item>
        <v-tabs-item class="mr-5" :key="2" :href="'#SignUp'">
          <p>Sign up</p>
        </v-tabs-item>
        <a id="closeSignIn" href="#" @click.prevent="$store.commit('TOGGLE_VIEW_SIGN_IN', false)"><v-icon>mdi-close</v-icon></a>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content :key="1" :id="'SignIn'" class="tab-content">
          <SignInOrUpForm :key="1" :isSignIn="true"></SignInOrUpForm>
        </v-tabs-content>
        <v-tabs-content :key="2" :id="'SignUp'" class="tab-content">
          <SignInOrUpForm :key="2" :isSignIn="false"></SignInOrUpForm>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
  export default {
    computed: {
      active: {
        get () {
          return this.$store.state.SiouActive
        },
        set (value) {
          this.$store.commit('TOGGLE_SIOU_ACTIVE', value)
        }
      }
    }
  }
</script>
<style>
  #signInOrUp {
    position: relative;
    bottom: 80%;
    height: auto;
    width: 100%;
    max-width: 500px;
    margin: auto;
    padding: 10px;
    z-index: 1200;
  }
  #closeSignIn {
    position: absolute;
    top: 6px;
    right: 6px;
  }
  #signInOrUp > div {
    background-color: white;
  }
  .tabs__content {
    padding: 10px;
  }
</style>
