<template>
  <div
    class="row border-bottom"
    :class="{'bg-white border border-danger border-2': current,'bg-light border-darken-3' : !current}"
  >
    <div
      class="col-2 p-0 position-relative"
    >
      <img
        v-if="track.link.match('/lis\.tn/')"
        :src="track.link+'?thumb'"
        loading="lazy"
        class="rounded img-fluid"
      >
      <img
        v-else
        :src="'https://place-hold.it/100?text='+track.album"
        loading="lazy"
        class="rounded img-fluid"
      >
      <div
        v-if="play"
        role="button"
        class="position-absolute top-50 start-50 translate-middle text-white pointer"
        @click="playTrack(url)"
      >
        <i
          class="bi bi-play-circle text-muted"
          style="font-size: 3rem;"
        />
      </div>
    </div>
    <div class="col-10 fs-7 pl-2">
      <small>
        <a
          :href="track.link"
          class="text-decoration-none"
          target="_blank"
        >{{ track.title }}</a>
        ·
        <!-- <span class="text-muted">Artist:</span>  -->
        {{ track.artist }}<br>
        <span class="text-muted">Album:</span> {{ track.album }} · {{ track.release_date | formatYear }} <br>
        <!-- <span class="text-muted">Year:</span>   -->
        <span class="text-muted">Label:</span>  {{ track.label | truncate(30) }}
        <div class="float-end text-muted">{{ track.radio_time }}</div><br>
      </small>
    </div>
  </div>
</template>
<script>
import moment from 'moment-timezone'

export default {
  name: 'NuTrack',
  props: {
    track: {
      type: [Object, Array],
      default: null
    },
    play: {
      type: [Boolean],
      default: false
    },
    current: {
      type: [Boolean],
      default: false
    },
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {

    }
  },
  filters: {
    formatYear: function (value) {
      if (value !== undefined) {
        return moment(value).format('Y')
      } else {
        return false
      }
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    playTrack (url) {
      this.$root.$emit('play', url)
    }

  }
}
</script>
<style lang="css" scoped>

.media {
  position: relative;
}

</style>
