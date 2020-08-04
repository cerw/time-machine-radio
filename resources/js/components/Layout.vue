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
        class="btn btn-block"
        @click="playTimemachine()"
        :class="{'btn-success':timemachinePlaying(),'btn-warning':!timemachinePlaying()}"
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
        class="btn btn-block"
        :class="{'btn-success':livePlaying(),'btn-warning':!livePlaying()}"
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
        v-show="loaded"
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
      <div class="row">
        <div class="col-12">
          <div id="waveform" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment-timezone'
import WaveSurfer from 'wavesurfer.js'
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
      wavesurfer: null,
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

    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      backend: 'MediaElement', // 'MediaElement',
      // backgroundColor: 'red',
      plugins: [
        // WaveSurfer.cursor.create({
        //   showTime: true,
        //   opacity: 1,
        //   customShowTimeStyle: {
        //     'background-color': '#000',
        //     color: '#fff',
        //     padding: '2px',
        //     'font-size': '10px'
        //   }
        // })
        // WaveSurfer.mediasession.create({
        //   metadata: {
        //     title: 'Wavesurfer.js Example',
        //     artist: 'The Wavesurfer.js Project',
        //     album: 'Media Session Example',
        //     artwork: [
        //       { src: '/images/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
        //       { src: '/images/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
        //       { src: '/images/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        //       { src: '/images/icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
        //       { src: '/images/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
        //       { src: '/images/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        //     ]
        //   }
        // })
      ]
    })

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
          // this.load()
        }
      }
    }.bind(this), 1000)
    // 17:34:27
    this.load()
    const self = this
    window.addEventListener('keypress', function (e) {
      if (e.code === 'Space') {
        if (self.$refs.player.paused) {
          self.$refs.player.play()
        } else {
          self.$refs.player.pause()
        }
      }
    })

    this.wavesurfer.on('ready', function () {
      console.log('wavesurfer ready')
      self.wavesurfer.play()
    })

    this.$refs.player.addEventListener('canplaythrough', function () {
      console.log('Audio is ready ')
      self.$refs.player.play()
      // self.wavesurfer.load(self.config.url + '#t=' + self.config.offset)

      // load peaks into wavesurfer.js
    }, false)
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
          .then(() => {
            console.log('ajax done')
          })
      }
    },
    playLive () {
      // set live url
      const self = this
      if (this.livePlaying()) {
        this.$refs.player.pause()
      } else {
        this.url = this.liveUrl
        this.$refs.player.load()
        this.$refs.player.addEventListener('canplaythrough', function () {
          console.log('Live stream loaded')
          self.$refs.player.play()
        }, false)
      }
    },
    //  moment.
    load () {
      this.loaded = false
      const self = this
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/play/' + this.youNow)
          .then(({ data }) => {
            self.config = data
            self.url = this.config.url + '#t=' + this.config.offset
            self.$refs.player.load()
            self.wavesurfer.load(this.$refs.player, data.wave)
            self.loaded = true

            resolve(data)
          }).catch(function (error) {
            console.log('error getting crew', error)
            reject(error)
          })
      })
    }
  }
}
</script>
<style>
</style>
