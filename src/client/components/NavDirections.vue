<template>
  <div id="routing-directions">
    <transition name="slide-up-fade">
      <div v-show="$store.state.NavDirectionsOpen">
        <div class="instructions" v-for="(inst, index) in $store.state.route.instructions" :key="inst.index" v-show="(inst.index > $store.state.route.waypointIndices[1]) && ((index > $data.currentIndex) && ($data.currentIndex + $data.showCount >= index))">
          <v-card>
            <v-card-title primary-title>
              <p> {{inst.type}} {{ inst.text }} </p>
            </v-card-title>
            {{inst.distance}}
            testing: {{index}} {{$store.state.route.waypointIndices[1]}}
          </v-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showCount: 2,
        currentIndex: 0,
      }
    },
    watch: {
      route: function() {
        this.$data.instructions = []
        let current = this.$store.state.route.waypointIndices[1]
        let all = this.$store.state.route.instructions
        for (let i = 0; i < all.length; i++) {
          if (all[i].index === current) {
            this.$data.currentIndex = i
          }
        }
      }
    },
    computed: {
      route: function() { return this.$store.getters.route },
    }
  }
</script>

<style>
  #routing-directions {
    position: fixed;
    z-index: 1050;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }

  #routing-directions > div{
    display: inline-block;
    min-width: 300px;
    width: 90%;
    // background-color: white;
  }
  .instructions {

  }
  .instructions > div{
    margin-bottom: 10px;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-up-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-up-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-up-fade-enter, .slide-up-fade-leave-to
  /* .slide-up-fade-leave-active below version 2.1.8 */ {
    transform: translatey(333%);
  }
</style>
