<template>
  <div>
    <div class="card w-100 mt-2">
      <div class="card-header text-center text-secondary">
        <strong>Archive (Last few day)</strong>
      </div>
      <div class="card-body">
        <ul class="list-group list-group-striped list-group-flush">
          <li
            class="list-group-item p-2 rounded"
            v-for="day in days"
            :class="{'list-group-item-secondary': day.format === today}"
            :key="day.format"
          >
            <a
              :href="'/archive/'+day.format"
              @click.prevent="loadDay(day.format)"
            >
              {{ day.calendar }}
            </a>
          </li>
          <ul />
        </ul>
      </div>
    </div>

    <div class="card w-100 mt-2">
      <div class="card-header text-center text-secondary">
        <strong>Show for {{ today }}</strong>
      </div>
      <div class="card-body">
        <ul class="list-group list-group-striped list-group-flush">
          <li
            class="list-group-item p-1 rounded"
            :class="{'list-group-item-success': slotPlaying === time}"
            v-for="(show, time) in shows"
            :key="time"
          >
            <button
              class="btn"
              @click="playArchive(time)"
              :class="{'btn-success':slotPlaying == time,'btn-warning':slotPlaying !== time}"
            >
              <svg
                v-if="slotPlaying !== time"
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

              <svg
                v-if="slotPlaying === time"
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
            </button>
            <strong> {{ time }} </strong>
            <strong class="float-right">
              {{ toYourTime(time) }}
              {{ isFuture(time) }}
            </strong>

            <span
              v-for="(person, pindex) in show.people"
              :key="pindex"
            >
              <a
                :href="person.link"
                target="_blank"
              >{{ person.name }}</a>
            </span>

            <span class="text-muted float-right">
              {{ show.desc }}
            </span>
          </li>
          <ul />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment-timezone'
export default {
  name: 'Archive',
  data () {
    return {
      days: [],
      shows: [],
      slotPlaying: null,
      today: moment().format('YYYY-MM-DD')
    }
  },
  mounted () {
    const current = moment()
    let n = 6
    while (n > 0) {
      console.log(n)
      const day = {}
      day.calendar = current.calendar()
      day.format = current.format('YYYY-MM-DD')
      this.days.push(day)
      current.subtract(1, 'day')
      n--
    }
    this.loadDay(this.today)
  },
  computed: {
    radioNow () {
      return moment().tz(this.$parent.radioTZ).format('HH:mm:ss')
    }
  },
  methods: {
    isFuture (time) {
      const playing = moment(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ)
      const now = moment().tz(this.$parent.radioTZ)
      console.log('show time ', playing)
      console.log('now time', now)
      return now.diff(playing)
    },
    toYourTime (time) {
      return moment(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ).calendar()
    },
    loadDay (day) {
      this.$parent.loaded = false
      const self = this
      this.today = day
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/api/archive/' + day)
          .then(({ data }) => {
            self.shows = data.shows
            console.log(data)
            // self.url = this.config.url + '#t=' + this.config.offset
            // self.$refs.player.load()
            self.$parent.loaded = true
            self.playArchive(moment().format('HH:mm'))
            resolve(data)
            // play timemachine time
          }).catch(function (error) {
            console.log('error getting archive', error)
            reject(error)
          })
      })
    },
    playArchive (time) {
      this.slotPlaying = time
      this.$parent.loaded = false
      const self = this
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/api/play/' + time + ':00/' + self.today)
          .then(({ data }) => {
            self.$parent.config = data
            self.$parent.url = self.$parent.config.url + '#t=' + self.$parent.config.offset
            // self.$refs.player.load()
            self.$parent.loaded = true
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
