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

            <span class="text-muted small">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-broadcast-pin"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 0 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707z"
                />
                <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                <path
                  fill-rule="evenodd"
                  d="M8 8.5a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              <a
                title="Radio 1 website"
                href="https://www.radio1.cz/"
                target="_blank"
              >Radio 1</a>.
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-file-binary-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-4.95 9.885c0 1.415-.548 2.206-1.524 2.206C4.548 13.09 4 12.3 4 10.885c0-1.412.548-2.203 1.526-2.203.976 0 1.524.79 1.524 2.203zM5.526 9.273c-.542 0-.832.563-.832 1.612 0 .088.003.173.006.252l1.56-1.143c-.126-.474-.375-.72-.733-.72zm-.732 2.508c.126.472.372.718.732.718.54 0 .83-.563.83-1.614 0-.085-.003-.17-.006-.25l-1.556 1.146zm6.061.624V13h-3v-.595h1.181V9.5h-.05l-1.136.747v-.688l1.19-.786h.69v3.633h1.125z"
                />
              </svg>
              <a
                title="Source on github"
                href="https://github.com/cerw/time-machine-radio"
                target="_blank"
              >github.</a>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-envelope-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
                />
              </svg> <a
                title="Made by cerw - please send feedback"
                href="https://twitter.com/cerw"
                target="_blank"
              >@cerw</a>
            </span>
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

    // ga('send', {
    //   hitType: 'event',
    //   eventCategory: 'Videos',
    //   eventAction: 'play',
    //   eventLabel: 'Fall Campaign'
    // })
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
