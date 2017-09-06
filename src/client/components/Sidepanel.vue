<template>
  <div id="slide-in-container">
    <v-btn id="hamburger" class="overLeaflet" @click="toggleVisible" @dblclick="toggleVisible" primary dark raised icon><v-icon>mdi-menu</v-icon></v-btn>
    <transition name="slide-fade">
      <div id="dropdown-list" class="base overEverything" onDrag="()=>console.log('dragme')" draggable="true" v-if="this.$store.state.sidePanelOpen">
        <h3>Urban Trails</h3>
        <v-switch @click="changeBool('kiosks')" v-bind:label="`Kiosks`" v-model="kiosksBool" light></v-switch>
        <v-switch @click="changeBool('fixits')" v-bind:label="`Fixits`" v-model="fixitsBool" light></v-switch>
        <v-switch @click="changeBool('trails')" v-bind:label="`Trails`" v-model="trailsBool" light></v-switch>
        <v-switch @click="changeBool('mainLight')" v-bind:label="`Light`" v-model="mainLightBool" light></v-switch>
        <v-switch @click="changeBool('mainDark')" v-bind:label="`Dark`" v-model="mainDarkBool" light></v-switch>
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
        mainLightBool: true,
        mainDarkBool: true,
        kiosksBool: true,
        fixitsBool: true,
        trailsBool: true,
      }
    },
    computed: {

    },
    methods: {
      changeBool(layer) {
        this.$data[`${layer}Bool`] = this.toggleLayer(`${layer}Layer`)
      },
      toggleVisible(e) {
        // if (this.$data.visible) {
        //   this.transformMap('width', '100%')
        // } else {
        //   // const percentage = 100 * ((window.document.body.clientWidth - 250) / window.document.body.clientWidth)
        //   // this.transformMap('width', `${percentage}%`)
        // }
        this.$store.commit('TOGGLE_SIDEPANEL')
      },
    }
  }
</script>
<style >
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

  #dropdown-list {
    position: fixed;
    top: 0px;
    right: 0px;
    width: 250px;
    padding-left: 30px;
    height: 100%;
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
