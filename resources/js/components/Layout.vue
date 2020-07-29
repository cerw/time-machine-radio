<template>
  <div class="text-center">
    <h1 class="mt-5 pb-2">
      Time Machine
    </h1>
    <p class="pb-2 lead">
      Radio1 Time: {{ radioTZ }} / {{ radioTime }}<br>
      Your Time {{ youTZ }} / {{ youTime }}<br>
    </p>

    <h2>
      Your are {{ youOffset }} hours
      <span v-if="youOffset > 0">
        in front of {{ radioTZ }}
      </span>

      <span v-if="youOffset < 0">
        behind
      </span>

      <span v-if="youOffset == 0">
        In Prague :)
      </span>
    </h2>

    <div class="text-center pt-4">
      <button
        class="btn btn-success"
      >
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
            d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
          />
        </svg>
        Play
      </button>
      <audio controls>
        <source
          src="horse.ogg"
          type="audio/ogg"
        >
        <source
          src="horse.mp3"
          type="audio/mpeg"
        >
        Your browser does not support the audio element.
      </audio>
      <div class="h1">
        {{ youNow }}  / {{ radioNow }}
      </div>
    </div>
    <h2>
      Playing
    </h2>
  </div>
</template>
<script>
import moment from 'moment-timezone'
export default {
  name: 'Layout',
  data () {
    return {
      radioTZ: 'Europe/Prague',
      youTZ: 'Australia/Perth',
      youNow: moment().format('HH:mm:ss'),
      radioNow: moment().format('HH:mm:ss'),
      interval: null

    }
  },
  mounted () {
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.interval = setInterval(function () {
      this.youNow = moment().tz(this.youTZ).format('HH:mm:ss')
      this.radioNow = moment().tz(this.radioTZ).format('HH:mm:ss')
    }.bind(this), 1000)
  },
  computed: {
    radioTime () {
      return moment.tz(this.radioTZ)
    },
    radioZone () {
      return moment.tz.zone(this.radioTZ)
    },
    // all baout you
    youTime () {
      return moment.tz(this.youTZ)
    },
    youZone () {
      return moment.tz.zone(this.youTZ)
    },
    youOffset () {
      return (this.radioZone.utcOffset(moment.now()) - this.youZone.utcOffset(moment.now())) / 60
    }
  },
  methods: {
    //  moment.
  }
}
</script>
