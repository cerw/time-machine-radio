<template>
  <div class="media">
    <img
      :src="track.song_link+'?thumb'"
      class="p-1 align-self-center rounded"
      height="80"
      loading="lazy"
      :alt="track.title"
    >
    <button
      v-if="play"
      class="btn btn-sm  play-button text-white"
      @click="playTrack(track.radio_time)"
    >
      <svg
        width="3.6em"
        height="3.6em"
        viewBox="0 0 12 14"
        class="bi bi-stop"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
        />
      </svg>
    </button>
    <div class="media-body small">
      <strong class="mt-0">
        <a
          :href="track.song_link"
          target="_blank"
        >{{ track.artist }} - {{ track.title }}</a>

      </strong>
      <br>
      <span class="text-muted">Album:</span> {{ track.album }}<br>
      <span class="text-muted">Year:</span>  {{ track.release_date | formatYear }} |
      <span class="text-muted">Label:</span>  {{ track.label }}<br>
      <span class="text-muted">Length:</span>  {{ track.duration_human }}
      <span class="text-muted">Played:</span>  {{ track.radio_time }}
    </div>
  </div>
</template>
<script>
import moment from 'moment-timezone'

export default {
  name: 'Track',
  props: {
    track: {
      type: [Object, Array],
      default: null
    },
    play: {
      type: [Boolean],
      default: false
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
    playTrack (time) {
      this.$parent.playTrack(time)
    }

  }
}
</script>
<style lang="css" scoped>

.play-button {
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
}
.media {
  position: relative;
}

</style>
