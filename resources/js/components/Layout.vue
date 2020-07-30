<template>
  <div class="card">
    <div class="card-header">
      <button
        class="btn btn-success"
        @click="app()"
      >
        Install App
      </button>
    </div>
    <div class="card-body">
      <p class="pb-2 ">
        Radio1 Time: <strong>{{ radioNow }}</strong><br>
        Your Time: <strong>{{ youDate }}</strong><br>
        Timemachine Time: <strong>{{ radioCalendar }}</strong>
      </p>

      <div>
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
      </div>

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

        <div class="alert alert-success">
          Serving
          <strong>
            (
            <span v-if="playing()">Playing</span>
            <span
              v-else
            >Paused</span>
            )
          </strong>

          show from <strong>{{ config.recoded_at }} </strong>- {{ radioThen }}
        </div>
        <a
          target="_blank"
          :href="'https://www.radio1.cz/program/?typ=dny&p='+radioDate"
        >Program for day {{ radioDate }} </a>
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
      youDate: moment().format('Y-MM-DD'),
      radioNow: moment().format('HH:mm:ss'),
      radioDate: null,
      radioThen: null,
      radioCalendar: null,
      interval: null,
      config: {},
      loaded: false,
      offset: 0,
      secondsLeft: 0,
      on: false
    }
  },
  mounted () {
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.interval = setInterval(function () {
      this.offset++
      this.youNow = moment().tz(this.youTZ).format('HH:mm:ss')
      this.youDate = moment().tz(this.youTZ).format('dddd HH:mm:ss')
      this.radioNow = moment().tz(this.radioTZ).format('dddd HH:mm:ss')

      if (this.$refs.player !== undefined) {
        this.radioThen = moment(this.config.recoded_timestamp)
          .add(this.$refs.player.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('dddd HH:mm:ss')

        this.radioDate = moment(this.config.recoded_timestamp)
          .add(this.$refs.player.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('Y-MM-DD')

        this.radioCalendar = moment(this.config.recoded_timestamp)
          .add(this.$refs.player.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .calendar()

        this.secondsLeft = this.$refs.player.duration - this.$refs.player.currentTime
        if (this.secondsLeft === 0) {
          this.$refs.player.pause()
          this.loaded = false
          // sound.currentTime = 0;
          this.load()
        }
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
    app () {
      window.addToHomeScreen()
    },
    playing () {
      if (this.$refs.player !== undefined) {
        return !this.$refs.player.paused
      }
      return false
    },
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
