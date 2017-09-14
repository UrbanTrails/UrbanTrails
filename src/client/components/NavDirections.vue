<template>
  <div id="routing-directions">
    <transition-group name="slide-up-fade" tag="div">
      <div class="instructions" v-for="(inst, index) in $data.instructions" :key="inst.index" v-show="(inst.index > $store.state.route.waypointIndices[1]) && (index < $data.showCount)">
        <v-card>
          <v-card-title primary-title>
            <p> {{inst.type}} {{ inst.text }} </p>
          </v-card-title>
          {{inst.distance}}
          testing: {{index}} {{$store.state.route.waypointIndices[1]}}
        </v-card>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showCount: 2,
        instructions: [],
      }
    },
    watch: {
      route: function() {
        this.$data.instructions = [];
        let current = this.$store.state.route.waypointIndices[1]
        let all = this.$store.state.route.instructions
        for (let inst of all ) {
          if (inst.index > current) {
            this.$data.instructions.push(inst)
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
    min-width: 350px;
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
    transform: translatey(100%);
    // opacity: 0;
  }

</style>
