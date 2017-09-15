<template>
  <img src="/static/images/compass.png" id="compass" ref="compass"/>
</template>
<script>
  export default {
    data() {
      return {
        alpha: 0,
      }
    },
    mounted() {
      this.run()
    },
    methods: {
      run(){
        let compass = this.$refs.compass
        let context = this

        if (window.DeviceOrientationEvent) {
          // loses this scope, needs context
          window.addEventListener('deviceorientation', function(e) {
            //Check for iOS property
            if(e.webkitCompassHeading) {
              context.$data.alpha = e.webkitCompassHeading;
              //Rotation is reversed for iOS
              compass.style.WebkitTransform = 'rotate(-' + context.$data.alpha + 'deg)';
            }
            //non iOS
            else {
              context.$data.alpha = e.alpha;
              var webkitAlpha = context.$data.alpha;
              if(!window.chrome) {
                //Assume Android stock (this is crude, but good enough for our example) and apply offset
                webkitAlpha = context.$data.alpha-270;
              }
            }
            compass.style.Transform = 'rotate(' + context.$data.alpha + 'deg)';
            compass.style.WebkitTransform = 'rotate('+ webkitAlpha + 'deg)';
            //Rotation is reversed for FF
            compass.style.MozTransform = 'rotate(-' + context.$data.alpha + 'deg)';
          }, false);
        }
      }
    }
  }
</script>
<style>
  #compass{
    position: fixed;
    top: 114px;
    right: 12px;
    width: 40px;
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    z-index: 1050;
  }
</style>
