<template>
  <div
    v-show="!loaded"
    class="text-center loader"
  >
    <div
      class="spinner-grow text-warning text-center"
      style="width: 5rem; height: 5rem;"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
// import moment from 'moment-timezone'

export default {
  name: 'Loader',
  props: {
    config: {
      type: [Object, Array],
      default: null
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  mounted () {

  },
  computed: {
    radioNow () {
      return this.$parent.radioNow
    }

  },
  methods: {

  }
}
</script>
<style lang="css" scoped>

.loader {
  position: fixed;
  bottom: 40%;
  left: 40%;
  z-index: 999999;
}

</style>
