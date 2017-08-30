<template>
  <div>
    <h1>Welcome</h1>
    <Home></Home>
    <leafletMap></leafletMap>
</div>
</template>

<script>
  export default {
    data: function() {
      return {
        msg: 'data message',
        status: 'In Progress'
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    },
    methods: {
      changeStatus() {
        this.status = 'Done';
      }
    }
  }
</script>
