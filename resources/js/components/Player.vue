<template>
  <div class="player-fixed card p-0">
    <!-- Info -->
    <div
      class=""
    >
      <div
        class="small m-0 text-center pt-1"
        v-if="timemachinePlaying()"
      >
        <!-- Serving show from <strong>{{ config.recoded_timestamp }} </strong> -->

        <div v-if="show !== undefined">
          <span class="text-white btn btn-xs btn-danger">
            {{ radioThen }}
          </span>

          <span class="p-1">
            <i class="bi bi-clock-history" />
            {{ show.when }}
          </span>

          <span
            class="p-2"
            v-for="(person, index) in show.people"
            :key="index"
          >
            <button
              class="btn btn-xs btn-outline-primary"
              @click="setDj(person.name)"
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
              {{ person.name }}
            </button>
          </span>

          <br>
          <meter
            class="col-12"
            :value="showPosition"
            min="0"
            :max="showLenght"
          >
            {{ show.starts_at }} - {{ show.ends_at }}
          </meter><br>
          <span class="text-muted">
            {{ show.desc }}
          </span>
        </div>
      </div>

      <div
        class="alert alert-success"
        v-if="livePlaying()"
      >
        Serving live show from - {{ radioNow }}
        <br>

        <div v-if="show !== undefined">
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
            v-for="(person, index) in show.people"
            :key="index"
          >
            <a
              :href="person.link"
              target="_blank"
            >{{ person.name }}</a>
          </p>

          {{ show.desc }}
        </div>
      </div>
    </div>
    <div class="col-12 p-0 m-0 border-top">
      <!-- <Track
        :track="currentTrack"
      /> -->
      <NuTrack
        v-if="currentTrack !== undefined"
        :track="currentTrack"
        :url="currentTrack.url"
        :play="true"
      />
    </div>

    <div
      class="btn-group btn-block"
      role="group"
      aria-label="Player"
    >
      <button
        type="button"
        class="btn btn-outline-danger btn-nofocus"
        @click="prevSong()"
      >
        <i
          class="bi bi-skip-start"
          style="font-size: 2rem;"
        />
      </button>
      <button
        type="button"
        class="btn btn-outline-danger btn-nofocus"
        @click="seekBack(60)"
      >
        <i
          class="bi bi-skip-backward"
          style="font-size: 2rem;"
        />

        60s
      </button>

      <!-- Time Machine -->
      <button
        type="button"
        class="btn btn-outline-danger btn-nofocus"
        @click="playTimemachine()"
        :class="{'active':timemachinePlaying()}"
      >
        <span v-if="timemachinePlaying()">
          <i
            class="bi bi-play"
            style="font-size: 2rem;"
          />

        </span>
        <span v-else>
          <i
            class="bi bi-stop"
            style="font-size: 2rem;"
          />

        </span>
      </button>

      <button
        type="button"
        class="btn btn-outline-danger btn-nofocus"
        @click="seekForward(60)"
      >
        <i
          class="bi bi-skip-forward"
          style="font-size: 2rem;"
        />

        60s
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click="nextSong()"
      >
        <i
          class="bi bi-skip-end"
          style="font-size: 2rem;"
        />
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

import NuTrack from './NuTrack'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Player',
  components: {
    NuTrack
  },
  data () {
    return {
      url: null
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

      navigator.mediaSession.setActionHandler('previoustrack', function (event) {
        console.log('> User clicked "previoustrack" icon.')

        self.prevSong()
        self.updatePositionState()
      })

      navigator.mediaSession.setActionHandler('nexttrack', function (event) {
        console.log('> User clicked "nexttrack" icon.')

        self.nextSong()
        self.updatePositionState()
      })

      try {
        navigator.mediaSession.setActionHandler('seekto', function (event) {
          console.log('> User clicked "Seek To" icon.')
          if (event.fastSeek && ('fastSeek' in self.$refs.player)) {
            self.$refs.player.fastSeek(event.seekTime)
            return
          }
          self.$refs.player.currentTime = event.seekTime
          self.updatePositionState()
        })
      } catch (error) {
        console.log('Warning! The "seekto" media session action is not supported.')
      }
    }

    //
    this.$root.$on('play', (url) => {
      console.log('play it man', url)
      this.setURL(url)
      this.url = url
    })

    this.$root.$on('pause', () => {
      console.log('pause it man')
      this.$refs.player.pause()
    })

    this.$root.$on('resume', () => {
      console.log('resume it man')
      this.$refs.player.play()
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
  watch: {
    url () {
      console.log('url changed: ', this.url)
      const url = this.url.split('#')[0]
      const myStream = this.streams.filter(function (stream) {
        // console.log(stream.url, url)
        return stream.url === url
      })
      if (myStream[0] !== undefined) {
        this.setStream(myStream[0])
      }
    }
  },
  computed: {
    ...mapState(['config', 'show', 'tracks', 'shows_by_ids', 'streams', 'stream']),
    youTZ () {
      return this.$parent.youTZ
    },
    radioNow () {
      return this.$parent.radioNow
    },
    radioThen () {
      return this.$parent.radioThen
    },
    radioThenFull () {
      return this.$parent.radioThenFull
    },
    showLenght () {
      const showStartsAt = moment(this.show.starts_at).unix() // lower
      const showEndsAt = moment(this.show.ends_at).unix() // hihhger
      return showEndsAt - showStartsAt
    },
    showPosition  () {
      const showStartsAt = moment(this.show.starts_at).unix() // lower
      const showNow = this.radioThenFull.unix()
      return showNow - showStartsAt
    },
    currentTrack () {
      if (this.show !== undefined && this.tracks !== undefined) {
        const self = this
        const trackPlayings = this.tracks.filter(function (spin, index) {
          // song started
          // next song started / aprox lenght of song?
          var format = 'hh:mm:ss'
          var time = moment(self.radioThen.split(' ')[1], format)
          var trackStarted = moment(spin.radio_time, format)
          var trackEnded = moment(spin.radio_time_ends, format)
          // console.log(time, beforeTime, afterTime)
          // console.log(index, spin.track.title, spin.track)
          if (time.isBetween(trackStarted, trackEnded)) {
            return true
          } else {
            return false
          }
        })
        if (trackPlayings.length) {
          if (trackPlayings[0].show_id !== this.show.id) {
            console.log('this is not the show man')
            const currentShow = this.shows_by_ids.filter(function (show) {
              return trackPlayings[0].show_id === show.id
            })
            if (currentShow.length) {
              this.setShow(currentShow[0])
            }
          }
          return trackPlayings[0]
        }
      }
      return undefined
    },
    nextTrack () {
      if (this.show !== undefined && this.tracks !== undefined) {
        const self = this
        var currentIndex = this.tracks.findIndex(function (track) {
          return track.id === self.currentTrack.id
        })
        if (currentIndex !== -1) {
          return this.tracks[currentIndex + 1]
        }
      }
      return undefined
    },
    prevTrack () {
      if (this.show !== undefined && this.tracks !== undefined) {
        const self = this
        var currentIndex = this.tracks.findIndex(function (track) {
          return track.id === self.currentTrack.id
        })
        if (currentIndex !== -1) {
          return this.tracks[currentIndex - 1]
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
  },
  methods: {
    ...mapMutations(['setShow', 'setURL', 'setStream']),
    ...mapActions(['get']),
    setDj (dj) {
      this.$parent.$refs.archives.setDj(dj)
    },
    seekForward (skipTime) {
      this.$refs.player.currentTime = Math.min(this.$refs.player.currentTime + skipTime, this.$refs.player.duration)
    },
    seekBack (skipTime) {
      const position = Math.max(this.$refs.player.currentTime - skipTime, 0)
      if (position === 0) {
        // load prev track
        this.$root.$emit('play', this.config.prev_url)
        this.$refs.player.currentTime = (60 * 60) - 60
      } else {
        this.$refs.player.currentTime = position
      }
    },
    nextSong () {
      this.$root.$emit('play', this.nextTrack.url)
    },
    prevSong () {
      this.$root.$emit('play', this.prevTrack.url)
    },
    canplay () {
      this.$parent.$refs.loader.loaded = true
      this.playAudio()
    },
    ended () {
      console.log('Song ended getting next ' + this.config.next_url)
      this.$root.$emit('play', this.config.next_url)

      const nextTime = moment(this.config.ends_at)
        .add(2, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss')

      this.get({ tz: this.youTZ, time: nextTime })
        .then((data) => {
          console.log('playTimemachine load done', data)
        // console.log('Archive -  program for that day', self.radioDate)
        // self.$refs.archives.loadDay(self.radioDate)
        })
        .catch(error => console.log(error))
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
      if ('mediaSession' in navigator && this.show !== undefined) {
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

        let title = this.radioThen
        if (this.livePlaying()) {
        // life
          title = 'Live ' + this.radioNow
        }

        let artist = 'N/A'
        if (this.show !== undefined && this.show.people !== undefined) {
          artist = this.show.people[0].name
        }
        const album = 'Radio 1 🕰Machine'
        if (this.show.desc !== undefined) {
        // album = this.config.show.info.desc
        }
        // Serving show from <strong>{{ config.recoded_at }} </strong>- {{ radioThen }}

        // console.log('MediaMetadata', this.currentTrack)
        if (this.currentTrack !== undefined) {
          const artwork = [
            { src: this.currentTrack.link + '?thumb', sizes: '512x512', type: 'image/jpeg' },
            { src: this.currentTrack.link + '?thumb', sizes: '640x640', type: 'image/jpeg' }
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
