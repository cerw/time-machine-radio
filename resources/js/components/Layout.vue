<template>
  <div>
    <main
      role="main"
      class="flex-shrink-0"
    >
      <Loader ref="loader" />
      <div class="container-fluid">
        <!-- Logo -->
        <div class="row pb-2">
          <div class="col-2 text-center">
            <a href="/">
              <img
                src="/images/icons/icon-192x192.png"
                title="Time Machine"
                width="60"
                class="logo rounded-circle img img-fluid pt-1"
              >
            </a>
          </div>
          <div class="col-10 text-center">
            <h1 class="h2 m-0">
              Radio 1 Time Machine
            </h1>

            <span class="text-muted small">

              <i class="bi-broadcast-pin" />
              <a
                title="Radio 1 website"
                href="https://www.radio1.cz/"
                target="_blank"
              >Radio 1</a>.

              <i class="bi-file-binary-fill" />

              <a
                title="Source on github"
                href="https://github.com/cerw/time-machine-radio"
                target="_blank"
              >github.</a>

              <i class="bi-envelope-fill" />

              <a
                title="Made by cerw - please send feedback"
                href="https://twitter.com/cerw"
                target="_blank"
              >@cerw</a>
              <img
                src="https://audd.io/images/icon-180x180.png"
                height="12"
                class="img"
              >
              <a
                title="Track decoded by audd.io"
                href="https://audd.io/"
                target="_blank"
              >audd.io</a>
            </span>
          </div>
        </div>

        <!-- Nav -->
        <navigation />

        <div class="card">
          <div class="card-body p-0">
            <div class="pb-2 text-center">
              Radio1 Time: <strong>{{ radioNow }}</strong><br>
              Your Time: <strong>{{ youDate }}</strong><br>
              Timemachine Time: <strong>{{ radioCalendar }}</strong>

              <br>
              {{ stream }}
            </div>

            <!-- Live {{ livePlaying() }}
      Time {{ timemachinePlaying() }} -->

            <div class="text-muted text-center">
              You are {{ youOffset }} hours
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

            <player
              ref="player"
            />
            <!-- <archive
              ref="archives"
              :dj="dj"
            /> -->
          </div>
        </div>
        <!-- Main App-->
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <router-view />
        </transition>
        <div
          style="height: 200px;"
          class="text-center text-muted fs-7"
        >
          Nothing to see here :)
        </div>
        <!-- End of App -->
      </div>
    </main>
  </div>
</template>
<script>
import moment from 'moment-timezone'
import Player from './Player'
import Loader from './Loader'
import Navigation from './Navigation'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    Player,
    Loader,
    Navigation
    // Podcast
  },
  data () {
    return {
      radioTZ: 'Europe/Prague',
      youTZ: 'Australia/Perth',
      youNow: moment().format('HH:mm:ss'),
      youDate: moment().format('Y-MM-DD'),
      radioNow: moment().format('HH:mm:ss'),
      radioDate: moment().format('HH:mm:ss'),
      radioThen: moment().format('HH:mm:ss'),
      radioThenFull: moment(),
      radioCalendar: moment().format('HH:mm:ss'),
      interval: null,
      offset: 0,
      secondsLeft: 0,
      dj: null
    }
  },
  mounted () {
    const self = this
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.interval = setInterval(function () {
      self.timeInternal()
    }, 1000)
    this.fetchShows()
    this.fetchStreams()

    // this.logNetworkInfo()
    // 17:34:27
    let currentTime = this.youNow
    const currentUrl = window.location.href.split('/')

    if (currentUrl.length === 5) {
      currentTime = currentUrl[4] + '/' + currentUrl[3]
      console.log('got url', currentTime)
    }
    // @bln
    if (currentUrl.length === 4) {
      this.dj = currentUrl[3].split('@')[1]
    }

    this.$refs.loader.loaded = false
    this.get({ tz: this.youTZ })
      .then((data) => {
        console.log('playTimemachine load done', data)
        // this.config = data
        // self.$refs.player.url = self.config.url + '#t=' + self.config.offset
        // self.$refs.player.playAudio()
        this.$root.$emit('play', data.play_it)
        self.timeInternal()
        self.$refs.loader.loaded = true
        // console.log('Archive -  program for that day', self.radioDate)
        // self.$refs.archives.loadDay(self.radioDate)
      })
      .catch(error => console.log(error))

    // ga('send', {
    //   hitType: 'event',
    //   eventCategory: 'Videos',
    //   eventAction: 'play',
    //   eventLabel: 'Fall Campaign'
    // })
  },
  computed: {
    ...mapState(['config', 'show', 'stream']),
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
    loaded () {
      if (this.$refs.loader === undefined) return true
      return this.$refs.loader.loaded
    }

  },
  methods: {
    ...mapMutations(['setConfig', 'setShow', 'setTracks']),
    ...mapActions(['fetchShows', 'fetchStreams', 'get']),
    app () {
      window.addToHomeScreen()
    },
    timeInternal () {
      this.offset++
      this.youNow = moment().tz(this.youTZ).format('HH:mm:ss')
      this.youDate = moment().tz(this.youTZ).format('dddd HH:mm:ss')
      this.radioNow = moment().tz(this.radioTZ).format('dddd HH:mm:ss')
      let recodedTimestamp = this.show.recoded_timestamp

      if (this.stream !== undefined) {
        recodedTimestamp = this.stream.recoded_timestamp
      }

      if (this.$refs.player !== undefined && this.$refs.player.$refs.player !== undefined) {
        const audioPlayer = this.$refs.player.$refs.player
        this.radioThen = moment(recodedTimestamp)
          .add(audioPlayer.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('dddd HH:mm:ss')

        this.radioThenFull = moment(recodedTimestamp)
          .add(audioPlayer.currentTime, 'seconds')

        this.radioDate = moment(recodedTimestamp)
          .add(audioPlayer.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('Y-MM-DD')

        this.radioCalendar = moment(recodedTimestamp)
          .add(audioPlayer.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .calendar().replace()

        // const url = moment(this.config.recoded_timestamp)
        //   .add(this.$refs.player.currentTime, 'seconds')
        //   // .tz(this.radioTZ)
        //   .format('/Y-MM-DD/HH:mm:ss')
        // history.replaceState(null, null, url)

        // this.secondsLeft = this.$refs.player.duration - this.$refs.player.currentTime
        // in player
        // TODO this.updatePositionState()
        // if (this.secondsLeft === 0) {
        //   this.$refs.player.pause()
        //   // sound.currentTime = 0;
        //   console.log('Loading API from internal')
        //   this.load()
        // }
        this.$refs.player.updateMetadata()
      }
    },
    // api V2
    // get () {

    //   // const self = this
    //   const self = this
    //   return new Promise((resolve, reject) => {
    //     axios.get('/api/get/' + this.youTZ)
    //       .then(({ data }) => {
    //         console.log('ajax load done')
    //         self.setConfig(data)
    //         self.setShow(data.show)
    //         self.setTracks(data.spins)
    //         resolve(data)
    //       }).catch(function (error) {
    //         console.log('error getting crew', error)
    //         reject(error)
    //       })
    //   })
    // },
    load (time) {
      this.$refs.loader.loaded = false
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
            console.log('ajax load done')
            self.$refs.player.url = self.config.url + '#t=' + self.config.offset
            // const url = moment(this.config.recoded_timestamp)
            //   .add(this.config.offset, 'seconds')
            //   .format('/Y-MM-DD/HH:mm:ss')
            // history.replaceState(null, null, url)

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
<style  lang="css">

/* .top-fixed {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
} */

/* body {
    min-height: 100vh;
} */

</style>
