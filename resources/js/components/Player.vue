<template>
  <div class="player-fixed card p-0">
    <!-- Info -->
    <div
      class=""
    >
      <div
        class="alert alert-success small mb-0 text-center"
        v-if="timemachinePlaying()"
      >
        Serving show from <strong>{{ config.recoded_at }} </strong>
        <br>

        <div v-if="config.playing !== undefined">
          <span class="h3 text-white btn btn-sm btn-danger">
            {{ radioThen }}
          </span>

          <span class="p-2 h6">
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

            {{ config.playing.when }}
          </span>

          <span
            class="p-2"
            v-for="(person, index) in config.playing.people"
            :key="index"
          >
            <a
              class="btn btn-xs btn-outline-primary"
              :href="person.link"
              target="_blank"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-file-person"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
                />
                <path d="M13.784 14c-.497-1.27-1.988-3-5.784-3s-5.287 1.73-5.784 3h11.568z" />
                <path
                  fill-rule="evenodd"
                  d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
              </svg>
              {{ person.name }}</a>
          </span>

          <br>
          <span class="text-muted">
            {{ config.playing.desc }}
          </span>
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

          <br>

          <p
            v-for="(person, index) in config.playing.people"
            :key="index"
          >
            <a
              :href="person.link"
              target="_blank"
            >{{ person.name }}</a>
          </p>

          {{ config.playing.desc }}
        </div>
      </div>
    </div>
    <div class="pl-1">
      <Track
        :track="currentTrack"
        v-if="currentTrack !== undefined"
      />
    </div>

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

      <!-- Live -->
      <button
        type="button"
        class="btn"
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
      <!-- Time Machine -->
      <button
        type="button"
        class="btn"
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
        Timemachine
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
  </div>
</template>
<script>
import moment from 'moment-timezone'
import Track from './Track'

export default {
  name: 'Player',
  components: {
    Track
  },
  props: {
    config: {
      type: [Object, Array],
      default: null
    }
  },
  data () {
    return {
      liveUrl: 'https://icecast6.play.cz/radio1-128.mp3',
      url: null
      // radioDate: moment().format('HH:mm:ss'),
      // radioCalendar: moment().format('HH:mm:ss'),

    }
  },
  mounted () {
    const self = this

    if ('mediaSession' in navigator && 'setActionHandler' in navigator.mediaSession) {
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
    }

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
    radioNow () {
      return this.$parent.radioNow
    },
    radioThen () {
      return this.$parent.radioThen
    },
    mediaTime () {
      return 0
    },
    currentTrack () {
      if (this.config.playing !== undefined) {
        const self = this
        const trackPlayings = this.config.playing.tracks.filter(function (track, index) {
          // song started
          // next song started / aprox lenght of song?
          var format = 'hh:mm:ss'
          var time = moment(self.radioThen.split(' ')[1], format)
          var trackStarted = moment(track.radio_time, format)
          var trackEnded = moment(track.radio_time_ends, format)
          // console.log(time, beforeTime, afterTime)
          // console.log(index, track.title, track.stream_at, track.stream_ends_at)
          if (time.isBetween(trackStarted, trackEnded)) {
            return true
          } else {
            return false
          }
        })
        if (trackPlayings.length) {
          return trackPlayings[0]
        }
      }
      return undefined
    },
    isShowPlaying (show) {
      // radioThen
      // playing clock now - this.$parent.radioThen / "Tuesday 23:00:40
      var format = 'hh:mm:ss'
      var time = moment(this.$parent.radioThen.split(' ')[1], format)
      var beforeTime = moment(show.starts_hours, format)
      var afterTime = moment(show.ends_hours, format)

      if (time.isBetween(beforeTime, afterTime)) {
        return true
      } else {
        return false
      }
    }

    // radioTime () {
    //   return moment.tz(this.radioTZ)
    // },
    // radioZone () {
    //   return moment.tz.zone(this.radioTZ)
    // },
    // // all baout you
    // youTime () {
    //   return moment.tz(this.youTZ)
    // },
    // youZone () {
    //   return moment.tz.zone(this.youTZ)
    // },
    // youOffset () {
    //   return (this.radioZone.utcOffset(moment.now()) - this.youZone.utcOffset(moment.now())) / 60
    // }
  },
  methods: {
    seekForward (skipTime) {
      this.$refs.player.currentTime = Math.min(this.$refs.player.currentTime + skipTime, this.$refs.player.duration)
    },
    seekBack (skipTime) {
      this.$refs.player.currentTime = Math.max(this.$refs.player.currentTime - skipTime, 0)
    },
    canplay (event) {
      console.log('Player - can play')
      this.$parent.$refs.loader.loaded = true
      this.playAudio()
    },
    ended (event) {
      console.log('ended', event)
      this.$refs.player.pause()
      // sound.currentTime = 0;
      console.log('Song ended getting next ' + this.config.next)
      this.$parent.load(this.config.next)
    },
    updatePositionState () {
      if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
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
    updateMetadata () {
      if ('mediaSession' in navigator && this.config.playing !== undefined) {
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
        if (this.config.playing !== undefined && this.config.playing.people !== undefined) {
          artist = this.config.playing.people[0].name
        }
        const album = 'Radio 1 🕰Machine'
        if (this.config.playing.desc !== undefined) {
        // album = this.config.playing.info.desc
        }
        // Serving show from <strong>{{ config.recoded_at }} </strong>- {{ radioThen }}

        // console.log('MediaMetadata', this.currentTrack)
        if (this.currentTrack !== undefined) {
          const artwork = [
            { src: this.currentTrack.song_link + '?thumb', sizes: '512x512', type: 'image/jpeg' },
            { src: this.currentTrack.song_link + '?thumb', sizes: '640x640', type: 'image/jpeg' }
          ]
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: this.currentTrack.title,
            artist: this.currentTrack.artist,
            album: this.currentTrack.album,
            artwork: artwork
          })
        } else {
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: title,
            artist: artist,
            album: album,
            artwork: artwork
          })
        }
      }
    },

    // https://googlechrome.github.io/samples/media-session/audio.html
    playAudio () {
      console.log('player - playAudio start')
      this.$refs.player.play()
        .then(() => {
          console.log('player - playAudio callback')
          this.updateMetadata()
          this.$parent.$refs.loader.loaded = true
          this.$forceUpdate()
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
      if (this.url !== this.liveUrl) {
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
        this.$parent.$refs.loader.loaded = false
        this.$parent.load()
          .then(() => {
            console.log('load done in player')
          })
      }
      this.$forceUpdate()
    },
    playLive () {
      // set live url
      // const self = this
      if (this.livePlaying()) {
        this.$refs.player.pause()
      } else {
        console.log('playLive')
        this.$parent.$refs.loader.loaded = false
        this.url = this.liveUrl
        this.$parent.live()
        this.playAudio()
      }
      this.$forceUpdate()
    }

  }
}
</script>
<style lang="css" scoped>

.player-fixed {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
