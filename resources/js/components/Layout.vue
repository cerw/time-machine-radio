<template>
  <div>
    <main
      role="main"
      class="flex-shrink-0"
    >
      <div class="container">
        <!-- Logo -->
        <div class="row pb-2">
          <div class="col-3 text-center">
            <a href="/">
              <img
                src="/images/icons/icon-192x192.png"
                title="Time Machine"
                width="50"
                class="logo rounded-circle img img-fluid"
              >
            </a>
          </div>
          <div class="col-9 text-center">
            <h1 class="h2">
              R1 Time Machine
            </h1>
          </div>
        </div>

        <Loader ref="loader" />

        <!-- Main App-->
        <div class="card">
          <!-- <div class="card-header">
      <button
        class="btn btn-success"
        @click="app()"
      >
        Install App
      </button>
    </div> -->
          <div class="card-body p-0">
            <p class="pb-2 text-center">
              Radio1 Time: <strong>{{ radioNow }}</strong><br>
              Your Time: <strong>{{ youDate }}</strong><br>
              Timemachine Time: <strong>{{ radioCalendar }}</strong>
            </p>

            <!-- Live {{ livePlaying() }}
      Time {{ timemachinePlaying() }} -->

            <p class="text-muted text-center">
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
            </p>

            <player
              ref="player"
              :config="config"
            />
            <hr>
            <archive ref="archives" />
          </div>
        </div>
        <!-- End of App -->
      </div>
    </main>

    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">
          Time Machine for <a
            href="https://www.radio1.cz/"
            target="_blank"
          >Radio 1</a>
          Source on <a
            href="https://github.com/cerw/time-machine-radio"
            target="_blank"
          >github.</a>
          Feedback please <a
            href="https://twitter.com/cerw"
            target="_blank"
          >@cerw</a>
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
import moment from 'moment-timezone'
import Archive from './Archive'
import Player from './Player'
import Loader from './Loader'

export default {
  name: 'Layout',
  components: {
    Archive,
    Player,
    Loader
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
      radioCalendar: moment().format('HH:mm:ss'),
      interval: null,
      config: {
        url: null,
        offset: 0
      },
      offset: 0,
      secondsLeft: 0
    }
  },
  mounted () {
    const self = this
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.interval = setInterval(function () {
      self.timeInternal()
    }, 1000)

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
        console.log('playTimemachine load done', currentTime)
        self.$refs.player.url = self.config.url + '#t=' + self.config.offset
        self.$refs.player.playAudio()
        self.timeInternal()
        console.log('Archive -  program for that day', self.radioDate)
        self.$refs.archives.loadDay(self.radioDate)
      })
      .catch(error => console.log(error))

    ga('send', {
      hitType: 'event',
      eventCategory: 'Videos',
      eventAction: 'play',
      eventLabel: 'Fall Campaign'
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
    loaded () {
      if (this.$refs.loader === undefined) return true
      return this.$refs.loader.loaded
    }

  },
  methods: {
    app () {
      window.addToHomeScreen()
    },
    timeInternal () {
      this.offset++
      this.youNow = moment().tz(this.youTZ).format('HH:mm:ss')
      this.youDate = moment().tz(this.youTZ).format('dddd HH:mm:ss')
      this.radioNow = moment().tz(this.radioTZ).format('dddd HH:mm:ss')

      if (this.$refs.player !== undefined && this.$refs.player.$refs.player !== undefined) {
        const audioPlayer = this.$refs.player.$refs.player
        this.radioThen = moment(this.config.recoded_timestamp)
          .add(audioPlayer.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('dddd HH:mm:ss')

        this.radioDate = moment(this.config.recoded_timestamp)
          .add(audioPlayer.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .format('Y-MM-DD')

        this.radioCalendar = moment(this.config.recoded_timestamp)
          .add(audioPlayer.currentTime, 'seconds')
          // .tz(this.radioTZ)
          .calendar()

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
      }
    },
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
    },
    live () {
      this.$refs.loader.loaded = false
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
<style scoped lang="css">

.top-fixed {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
}
</style>
