<template>
  <div class="card">
    <!-- <div class="card-header">
      <button
        class="btn btn-success"
        @click="app()"
      >
        Install App
      </button>
    </div> -->
    <div class="card-body">
      <p class="pb-2 ">
        Radio1 Time: <strong>{{ radioNow }}</strong><br>
        Your Time: <strong>{{ youDate }}</strong><br>
        Timemachine Time: <strong>{{ radioCalendar }}</strong>
      </p>

      Live {{ livePlaying() }}
      Time {{ timemachinePlaying() }}

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

      <!-- Time Machine -->
      <button
        class="btn btn-success btn-block"
        @click="playTimemachine()"
      >
        <span v-if="timemachinePlaying()">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-play"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
          />

          </svg>
          Stop
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
          Play
        </span>

        Timemachine
      </button>

      <!-- Live -->
      <button
        class="btn btn-warning btn-block"
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
          Stop
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
          Play
        </span>
        Live
      </button>

      <div
        class="text-center pt-4"
        v-if="loaded"
      >
        <div
          class="alert alert-success"
          v-if="timemachinePlaying()"
        >
          Serving show from <strong>{{ config.recoded_at }} </strong>- {{ radioThen }}
        </div>

        <div
          class="alert alert-success"
          v-if="livePlaying()"
        >
          Playing Live
        </div>

        <a
          target="_blank"
          :href="'https://www.radio1.cz/program/?typ=dny&p='+radioDate"
        >Program for day {{ radioDate }} </a>
        <audio
          preload="metadata"
          controls
          autoplay
          title="Play"
          id="player"
          ref="player"
          :src="url"
          style="width: 100%;"
        ><p>Your browser does not support the <code>audio</code> element.</p></audio>
      </div>
      <div v-else>
        Loading...
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
      liveUrl: 'https://icecast6.play.cz/radio1-128.mp3',
      url: null,
      radioDate: moment().format('HH:mm:ss'),
      radioThen: moment().format('HH:mm:ss'),
      radioCalendar: moment().format('HH:mm:ss'),
      interval: null,
      config: {
        url: null,
        offset: 0
      },
      loaded: false,
      offset: 0,
      secondsLeft: 0
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
    livePlaying () {
      if (this.$refs.player === undefined) {
        return false
      }
      if (this.url === this.liveUrl) {
        return !this.$refs.player.paused
      }
      return false
    },
    timemachinePlaying () {
      if (this.$refs.player === undefined) {
        return false
      }
      if (this.url === this.config.url + '#t=' + this.config.offset) {
        return !this.$refs.player.paused
      }
      return false
    },
    // type = live | timemachine
    playTimemachine () {
      // set url - config.url+'#t='+config.offset
      if (this.timemachinePlaying()) {
        this.$refs.player.pause()
      } else {
        this.load()
      }
    },
    playLive () {
      // set live url
      if (this.livePlaying()) {
        this.$refs.player.pause()
      } else {
        this.url = this.liveUrl
        this.$refs.player.play()
      }
    },
    //  moment.
    load () {
      this.loaded = false
      axios.get('/play/' + this.youNow)
        .then(({ data }) => {
          this.config = data
          this.url = this.config.url + '#t=' + this.config.offset
          this.loaded = true
          this.$refs.player.play()
        }).catch(function (error) {
          console.log('error getting crew', error)
        })
    }
  }
}
</script>
<style>
</style>
