<template>
  <div
    class="row border-bottom g-0  "
    :class="{'bg-white border border-danger': current,'bg-light border-darken-3' : !current}"
  >
    <div
      class="col-2 p-0 position-relative"
    >
      <img
        :src="track.link+'?thumb'"
        loading="lazy"
        class="rounded img-fluid"
      >
      <div
        v-if="play"
        class="position-absolute top-50 start-50 translate-middle text-white"
        @click="playTrack(url)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          class="bi bi-play-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
        </svg>
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
        <span class="text-muted">Artist:</span> {{ track.artist }}<br>
        <span class="text-muted">Album:</span> {{ track.album }} · {{ track.release_date | formatYear }} <br>
        <!-- <span class="text-muted">Year:</span>   -->
        <span class="text-muted">Label:</span>  {{ track.label }}
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
