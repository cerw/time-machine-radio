<template>
  <div class="text-center">
    <p class="pb-2 lead">
      Radio1 Time: <strong>{{ radioNow }}</strong><br>
      Your Time: <strong>{{ youNow }}</strong><br>
      Timemachine Time: <strong>{{ radioCalendar }}</strong>
    </p>

    <h3>
      Your are {{ youOffset }} hours
      <span v-if="youOffset > 0">
        in front of Radio 1
      </span>

      <span v-if="youOffset < 0">
        behind
      </span>

      <span v-if="youOffset == 0">
        In Prague :)
      </span>
    </h3>

    <div
      class="text-center pt-4"
      v-if="loaded"
    >
      <!-- <button
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
      </button> -->

      <h3>
        Playing show from {{ config.recoded_at }} - {{ radioThen }}
        <!-- <span class="text-muted">
          {{ secondsLeft / 60 }}
        </span> -->
        <br>
        <a
          target="_blank"
          :href="'https://www.radio1.cz/program/?typ=dny&p='+radioDate"
        >Program for day {{ radioDate }} </a>
      </h3>

      <audio
        preload="metadata"
        controls
        autoplay
        id="player"
        ref="player"
        :src="config.url+'#t='+config.offset"
        style="width: 100%;"
      ><p>Your browser does not support the <code>audio</code> element.</p></audio>

      OR
      Live Radio1.cz
      <audio
        preload="metadata"
        controls
        src="https://icecast6.play.cz/radio1-128.mp3"
        style="width: 100%;"
      ><p>Your browser does not support the <code>audio</code> element.</p></audio>

      <div class="h1" />
    </div>
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
      radioDate: moment().format('Y-MM-DD'),
      radioThen: moment().format('HH:mm:ss'),
      radioCalendar: moment().format('HH:mm:ss'),
      interval: null,
      config: {},
      loaded: false,
      offset: 0,
      secondsLeft: 0
    }
  },
  mounted () {
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.interval = setInterval(function () {
      this.offset++
      this.youNow = moment().tz(this.youTZ).format('dddd HH:mm:ss')
      this.radioNow = moment().tz(this.radioTZ).format('dddd HH:mm:ss')
      this.radioThen = moment(this.config.recoded_timestamp)
        .add(this.$refs.player.currentTime, 'seconds')
        .tz(this.radioTZ)
        .format('dddd HH:mm:ss')

      this.radioDate = moment(this.config.recoded_timestamp)
        .add(this.$refs.player.currentTime, 'seconds')
        .tz(this.radioTZ)
        .format('Y-MM-DD')

      this.radioCalendar = moment(this.config.recoded_timestamp)
        .add(this.$refs.player.currentTime, 'seconds')
        .tz(this.radioTZ)
        .calendar()

      this.secondsLeft = this.$refs.player.duration - this.$refs.player.currentTime
      if (this.secondsLeft === 0) {
        this.load()
      }
    }.bind(this), 1000)
    // 17:34:27
    this.load()
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
    load () {
      axios.get('/play/' + this.youNow)
        .then(({ data }) => {
          this.config = data
          this.loaded = true
          console.log(this.$refs.player)
          this.$refs.player.play()

          // set offiset
          // $this.refs.player.currentTime = data.offset
        }).catch(function (error) {
          console.log('error getting crew', error)
        })
    }
  }
}
</script>
<style>
</style>
