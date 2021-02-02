
<template>
  <div
    class="p-0 "
    v-if="tracks && tracks.length"
  >
    <div
      v-for="spin in tracks"
      class="border-bottom border-light"
      :class="'spin-'+spin.id"
      :key="spin.id"
    >
      <!-- :class="{'bg-white text-dark border border-danger text-light': currentTrack !== undefined && track.id === currentTrack.id}" -->
      <NuTrack
        :track="spin"
        :url="spin.url"
        :current="currentTrack !== undefined && spin.id === currentTrack.id"
        :play="true"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'
//
import NuTrack from '@/components/NuTrack'
//
export default {
  name: 'Home',
  components: {
    NuTrack
  },
  data () {
    return {
      scrollTrack: undefined
    }
  },
  computed: {
    ...mapState(['shows', 'config']),
    show () {
      if (this.config.show !== undefined) {
        return this.config.show
      }
      return {}
    },
    tracks () {
      if (this.config.spins !== undefined) {
        return this.config.spins
      }
      return {}
    },
    currentTrack () {
      return this.$parent.$refs.player.currentTrack
    }
  },
  watch: {
    currentTrack () {
      if (this.scrollTrack === undefined || this.currentTrack !== this.scrollTrack) {
        console.log('watch track')
        this.scrollToTrack()
      }
    }
  },
  methods: {
    scrollToTrack () {
      if (this.currentTrack === undefined) return false

      const el = this.$el.getElementsByClassName('spin-' + this.currentTrack.id)[0]

      if (el) {
        this.scrollTrack = this.currentTrack
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      }
    },
    isShowPlaying (show) {
      // radioThen
      // playing clock now - this.$parent.radioThen / "Tuesday 23:00:40
      var format = 'hh:mm:ss'
      var time = moment(this.$parent.radioThen.split(' ')[1], format)
      var beforeTime = moment(show.starts_hours, format)
      var afterTime = moment(show.ends_hours, format)

      if (time.isBetween(beforeTime, afterTime)) {
        return true
      } else {
        return false
      }
    },
    ...mapActions(['fetchShows'])
  },
  mounted () {
    console.log('Home mounted')
    this.fetchShows()
    this.scrollToTrack()
  }
}
</script>

<style>

</style>
