<template>
  <div>
    <!-- {{ latestSpins.length }} -->
    <div class="text-center p-2">
      Listen to live radio1 show.
      <!-- Live -->
      <button
        type="button"
        class="btn btn-outline-danger "
        @click="playLive()"
      >
        <span v-if="livePlaying()">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-play"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
            />
          </svg>

        </span>
        <span v-else>
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-stop"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
            />
          </svg>

        </span>
        Live
      </button>
    </div>

    <div
      v-for="(spin, index) in latestSpins"
      :key="index"
    >
      <NuTrack
        :track="spin"
        :url="spin.url"
        :play="true"
      />
    </div>
  </div>
</template>
<script>

import NuTrack from '@/components/NuTrack'
export default {
  name: 'Latest',
  components: {
    NuTrack
  },
  data () {
    return {
      latestSpins: [],
      liveUrl: 'https://icecast6.play.cz/radio1-128.mp3'
    }
  },
  methods: {
    playLive (url) {
      this.$root.$emit('play', this.liveUrl)
    },
    livePlaying () {
      return false
    }
  },
  mounted () {
    fetch('/api/spins')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status)
        }
        return response.json()
      })
      .then(response => {
        this.latestSpins = response.data
        console.log('loaded data! sample_rate: ')
      })
      .catch((e) => {
        console.error('error', e)
      })
  }
}
</script>

<style>

</style>
