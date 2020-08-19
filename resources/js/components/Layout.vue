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
      <p class="pb-2 text-center">
        Radio1 Time: <strong>{{ radioNow }}</strong><br>
        Your Time: <strong>{{ youDate }}</strong><br>
        Timemachine Time: <strong>{{ radioCalendar }}</strong>
      </p>

      <!-- Live {{ livePlaying() }}
      Time {{ timemachinePlaying() }} -->

      <p class="text-muted float-right">
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
      </p>

      <div
        class="btn-group btn-block"
        role="group"
        aria-label="Player"
      >
        <button
          type="button"
          class="btn btn-dark"
          @click="seekBack(60)"
        >
          60s
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-skip-backward"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="btn btn-dark"
          @click="seekForward(60)"
        >
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-skip-forward"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"
            />
          </svg>
          60s
        </button>
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
          <br>

          <div v-if="config.playing !== undefined">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-clock-history"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
              />
              <path
                fill-rule="evenodd"
                d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
              />
              <path
                fill-rule="evenodd"
                d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            {{ config.playing.starts }} -  {{ config.playing.ends }}
            <br>

            <p
              v-for="(person, index) in config.playing.info.people"
              :key="index"
            >
              <a
                :href="person.link"
                target="_blank"
              >{{ person.name }}</a>
            </p>

            {{ config.playing.info.desc }}
          </div>
        </div>

        <div
          class="alert alert-success"
          v-if="livePlaying()"
        >
          Serving live show from - {{ radioNow }}
          <br>

          <div v-if="config.playing !== undefined">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-clock-history"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
              />
              <path
                fill-rule="evenodd"
                d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
              />
              <path
                fill-rule="evenodd"
                d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            {{ config.playing.starts }} -  {{ config.playing.ends }}
            <br>

            <p
              v-for="(person, index) in config.playing.info.people"
              :key="index"
            >
              <a
                :href="person.link"
                target="_blank"
              >{{ person.name }}</a>
            </p>

            {{ config.playing.info.desc }}
          </div>
        </div>

        <a
          target="_blank"
          :href="'https://www.radio1.cz/program/?typ=dny&p='+radioDate"
        >Program for day {{ radioDate }} </a>
        <audio
          preload="metadata"
          controls
          @canplay="canplay()"
          @ended="ended()"
          title="Play"
          id="player"
          ref="player"
          :src="url"
          style="width: 100%;"
        ><p>Your browser does not support the <code>audio</code> element.</p></audio>

        <player :file="url" />
      </div>

      <div
        v-show="!loaded"
        class="card-footer text-center"
      >
        <div
          class="spinner-grow text-warning"
          style="width: 7rem; height: 7rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <archive ref="archives" />
    </div>
  </div>
</template>
<script>
import moment from 'moment-timezone'
import Archive from './Archive'
import Player from './Player'

export default {
  name: 'Layout',
  components: {
    Archive,
    Player
  },
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
      secondsLeft: 0,
      online: navigator.connection
    }
  },
  mounted () {
    const self = this
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.interval = setInterval(function () {
      self.timeInternal()
    }, 1000)
    // network
    navigator.connection.addEventListener('change', this.logNetworkInfo)

    // blighness

    window.addEventListener('devicelight', function (event) {
      console.log('devicelight')
      console.log(event.value)
    })

    window.addEventListener('online', this.handleNetworkChange)

    // this.logNetworkInfo()
    // 17:34:27
    let currentTime = this.youNow
    const currentUrl = window.location.href.split('/')
    if (currentUrl.length === 5) {
      currentTime = currentUrl[4] + '/' + currentUrl[3]
      console.log('got url', currentTime)
    }

    this.load(currentTime)
      .then(() => {
        console.log('playTimemachine', currentTime)
        self.timeInternal()
        self.playAudio()
        console.log('load program for that day', self.radioDate)
        self.$refs.archives.loadDay(self.radioDate)
      })
      .catch(error => console.log(error))

    navigator.mediaSession.setActionHandler('play', async function () {
      console.log('> User clicked "Play" icon.')
      await self.$refs.player.play()
      navigator.mediaSession.playbackState = 'playing'
      // Do something more than just playing audio...
    })

    navigator.mediaSession.setActionHandler('pause', function () {
      console.log('> User clicked "Pause" icon.')
      self.$refs.player.pause()
      navigator.mediaSession.playbackState = 'paused'
      // Do something more than just pausing audio...
    })

    /* Seek Backward & Seek Forward */

    const defaultSkipTime = 60 /* Time to skip in seconds by default */

    navigator.mediaSession.setActionHandler('seekbackward', function (event) {
      console.log('> User clicked "Seek Backward" icon.')
      const skipTime = event.seekOffset || defaultSkipTime
      self.seekBack(skipTime)
      self.updatePositionState()
    })

    navigator.mediaSession.setActionHandler('seekforward', function (event) {
      console.log('> User clicked "Seek Forward" icon.')
      const skipTime = event.seekOffset || defaultSkipTime
      self.seekForward(skipTime)
      self.updatePositionState()
    })

    window.addEventListener('keypress', function (e) {
      if (e.code === 'Space') {
        if (self.$refs.player.paused) {
          self.playAudio()
        } else {
          self.$refs.player.pause()
        }
      }
    })
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
    },
    network () {
      return navigator.connection
    }
  },
  methods: {
    app () {
      window.addToHomeScreen()
    },
    seekForward (skipTime) {
      this.$refs.player.currentTime = Math.min(this.$refs.player.currentTime + skipTime, this.$refs.player.duration)
    },
    seekBack (skipTime) {
      this.$refs.player.currentTime = Math.max(this.$refs.player.currentTime - skipTime, 0)
    },
    timeInternal () {
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

        const url = moment(this.config.recoded_timestamp)
          .add(this.$refs.player.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('/Y-MM-DD/HH:mm:ss')
        history.replaceState(null, null, url)

        this.secondsLeft = this.$refs.player.duration - this.$refs.player.currentTime
        this.updatePositionState()
        // if (this.secondsLeft === 0) {
        //   this.$refs.player.pause()
        //   // sound.currentTime = 0;
        //   console.log('Loading API from internal')
        //   this.load()
        // }
      }
    },
    canplay (event) {
      this.loaded = true
      this.playAudio()
    },
    ended (event) {
      console.log('ended', event)
      this.$refs.player.pause()
      // sound.currentTime = 0;
      console.log('Song ended getting next ' + this.config.next)
      this.load(this.config.next)
    },
    updatePositionState () {
      if ('setPositionState' in navigator.mediaSession) {
        if (this.livePlaying) {
          // navigator.mediaSession.setPositionState({
          //   title: this.config.recoded_at + ' ' + this.radioThen,
          //   playbackRate: this.$refs.player.playbackRate,
          //   duration: this.$refs.player.duration
          //   // position: this.$refs.player.currentTime
          // })
          this.updateMetadata()
        } else {
          navigator.mediaSession.setPositionState({
            title: this.config.recoded_at + ' ' + this.radioThen,
            playbackRate: this.$refs.player.playbackRate,
            duration: this.$refs.player.duration,
            position: this.$refs.player.currentTime
          })
        }
      }
    },
    handleNetworkChange () {
      this.online = navigator.onLine
    },
    updateMetadata () {
      /*
      src: '/images/icons/icon-96x96.png',
      title: 'Snow Fight',
      artist: 'Jan Morgenstern',
      album: 'Sintel',

      */
      // console.log('updateMetadata')
      const artwork = [
        { src: '/images/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: '/images/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: '/images/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/images/icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
        { src: '/images/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: '/images/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]

      let title = this.config.recoded_at + ' ' + this.radioThen
      if (this.livePlaying()) {
        // life
        title = 'Live ' + this.radioNow
      }

      let artist = 'N/A'
      if (this.config.playing.info.people !== undefined) {
        artist = this.config.playing.info.people[0].name
      }
      const album = 'Radio 1 🕰Machine'
      if (this.config.playing.info.desc !== undefined) {
        // album = this.config.playing.info.desc
      }
      // Serving show from <strong>{{ config.recoded_at }} </strong>- {{ radioThen }}
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: title,
        artist: artist,
        album: album,
        artwork: artwork
      })
    },
    logNetworkInfo () {
      // Network type that browser uses
      console.log('         type: ' + navigator.connection.type)

      // Effective bandwidth estimate
      console.log('     downlink: ' + navigator.connection.downlink + 'Mb/s')

      // Effective round-trip time estimate
      console.log('          rtt: ' + navigator.connection.rtt + 'ms')

      // Upper bound on the downlink speed of the first network hop
      console.log('  downlinkMax: ' + navigator.connection.downlinkMax + 'Mb/s')

      // Effective connection type determined using a combination of recently
      // observed rtt and downlink values: ' +
      console.log('effectiveType: ' + navigator.connection.effectiveType)

      // True if the user has requested a reduced data usage mode from the user
      // agent.
      console.log('     saveData: ' + navigator.connection.saveData)
    },

    // https://googlechrome.github.io/samples/media-session/audio.html
    playAudio () {
      this.$refs.player.play()
        .then(() => {
          // console.log('updateMetadata')
          this.updateMetadata()
        })
        .catch(error => console.log(error))
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
      // const self = this
      if (this.livePlaying()) {
        this.$refs.player.pause()
      } else {
        console.log('playLive')
        this.url = this.liveUrl
        this.live()
        this.playAudio()
      }
    },
    //  moment.
    load (time) {
      this.loaded = false
      const self = this
      let when
      if (time !== undefined) {
        when = time
      } else {
        when = this.youNow
      }

      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/api/play/' + when)
          .then(({ data }) => {
            self.config = data
            self.url = this.config.url + '#t=' + this.config.offset

            const url = moment(this.config.recoded_timestamp)
              .add(this.config.offset, 'seconds')
              .format('/Y-MM-DD/HH:mm:ss')
            history.replaceState(null, null, url)

            resolve(data)
          }).catch(function (error) {
            console.log('error getting crew', error)
            reject(error)
          })
      })
    },
    live () {
      this.loaded = false
      const self = this
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/api/live')
          .then(({ data }) => {
            self.config = data
            // self.$refs.player.load()

            resolve(data)
          }).catch(function (error) {
            console.log('error getting live', error)
            reject(error)
          })
      })
    }
  }
}
</script>
<style>
</style>
