
<template>
  <div
    class="p-0 "
    v-if="tracks && tracks.length"
  >
    <div
      v-for="trackShow in trackShows"
      class="border-bottom border-light"
      :key="trackShow.id"
    >
      <Show
        :show="trackShow"
      />

      <div
        v-for="spin in trackShow.tracks"
        class="border-bottom border-light"
        :class="'spin-'+spin.id"
        :key="spin.id"
      >
        <NuTrack
          :track="spin"
          :url="spin.url"
          :current="currentTrack !== undefined && spin.id === currentTrack.id"
          :play="true"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'
//
import NuTrack from '@/components/NuTrack'
import Show from '@/components/Show'
//
export default {
  name: 'Home',
  components: {
    NuTrack,
    Show
  },
  data () {
    return {
      scrollTrack: undefined
    }
  },
  computed: {
    ...mapState(['shows', 'config', 'shows_by_ids', 'tracks']),
    show () {
      if (this.config.show !== undefined) {
        return this.config.show
      }
      return {}
    },
    currentTrack () {
      return this.$parent.$refs.player.currentTrack
    },
    trackShows () {
      const shows = []
      for (const track in this.tracks) {
        const showId = this.tracks[track].show_id
        const show = this.shows_by_ids.filter(function (show) {
          return showId === show.id
        })[0]

        if (!shows.includes(show) && show !== undefined) {
          show.tracks = this.tracks.filter(function (track) {
            return track.show_id === show.id
          })
          shows.push(show)
        }
      }
      return shows
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
