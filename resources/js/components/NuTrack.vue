<template>
  <div
    class="card mb-2"
  >
    <div class="row g-0">
      <div
        class="col-4 position-relative"
      >
        <img
          :src="track.link+'?thumb'"
          :alt="track.title"
          loading="lazy"
          class="rounded img-fluid"
        >
        <button
          v-if="play"
          class="btn btn-sm play-button text-white"
          @click="playTrack(url)"
        >
          <svg
            width="5.6em"
            height="5.6em"
            viewBox="0 0 10 16"
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
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">
            <a
              :href="track.link"
              target="_blank"
            >{{ track.title }}</a>
          </h5>
          <p class="card-text">
            <span class="text-muted">Artist:</span> {{ track.artist }}<br>
            <span class="text-muted">Album:</span> {{ track.album }}<br>
            <span class="text-muted">Year:</span>  {{ track.release_date | formatYear }} |
            <span class="text-muted">Label:</span>  {{ track.label }}<br>
          </p>
        </div>
      </div>
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
