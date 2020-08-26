<template>
  <div>
    <div class="pushtop p-0">
      <div class="h5 text-center text-secondary">
        Archive
      </div>
      <div class="col-12 p-0">
        <!-- <button
          class="btn btn-sm btn-success"
          v-for="day in days"
          :class="{'list-group-item-secondary': day.format === today}"
          :key="day.format"
        >
          {{ day.niceday }}
        </button> -->

        <ul class="list-group list-group-striped list-group-flush small">
          <li
            class="list-group-item p-2 rounded list-day"
            v-for="day in days"
            :class="{'list-group-item-secondary': day.format === today}"
            :key="day.format"
          >
            <a
              :href="'/archive/'+day.format"
              class="h6 nav-link"
              @click.prevent="loadDay(day.format)"
            >
              {{ day.calendar }}
            </a>

            <ul
              class="list-group  list-group-flush"
              v-if="day.format === today"
            >
              <li
                class="list-group-item p-1 rounded"
                :class="{'list-group-item-info': show.ks,'list-group-item-success': slotPlaying === show.starts_hours , 'list-group-item-danger': show.now, 'hidden': isFuture(show.starts_hours) }"
                v-for="(show, time) in shows"
                :key="time"
              >
                <div
                  :style="showSize(show)"
                >
                  <button
                    class="btn btn-sm"
                    @click="playArchive(show.starts_hours)"
                    :class="{'btn-success':slotPlaying == show.starts_hours,'btn-warning':slotPlaying !== show.starts_hours}"
                  >
                    <svg
                      v-if="slotPlaying !== show.starts_hours"
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
                      v-if="slotPlaying === show.starts_hours"
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
                  <strong> {{ show.when }} </strong>
                  <i> {{ show.duration_human }} </i>
                  <!-- <strong class="float-right">
                    {{ toYourTime(time) }}
                  </strong> -->

                  <span
                    v-for="(person, pindex) in show.people"
                    :key="pindex"
                  >
                    <a
                      :href="person.link"
                      target="_blank"
                    >{{ person.name }}</a>
                  </span>

                  <span
                    v-if="show.now"
                    class="badge badge-info"
                  >
                    <span v-if="!isToday">TimeMachine now</span>

                  </span>

                  <span class="text-muted float-right">
                    {{ show.desc }}
                  </span>
                  <!-- tracks -->
                  <div
                    class="p-2"
                    v-if="show.tracks.length"
                  >
                    <strong>Track list - EXPERIMENT ({{ show.tracks.length }})</strong>
                    <div
                      v-for="(track, tindex) in show.tracks"
                      :key="tindex+'-'+time"
                    >
                      {{ track.radio_time }}
                      <a
                        :href="track.song_link"
                        target="_blank"
                      >{{ track.artist }} - {{ track.title }}</a>
                      {{ track.release_date | formatYear }} @ {{ track.label }}
                      <span class="text-muted float-right">
                        {{ track.duration_human }}
                      </span>
                      <!-- {{ track.timecode }} -->
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
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
  filters: {
    formatYear: function (value) {
      if (value !== undefined) {
        return moment(value).format('Y')
      } else {
        return false
      }
    }
  },
  mounted () {
    const current = moment()
    let n = 4
    while (n > 0) {
      const day = {}
      day.calendar = current.calendar()
      day.format = current.format('YYYY-MM-DD')
      day.niceday = current.calendar().split(' at')[0]
      this.days.push(day)
      current.subtract(1, 'day')
      n--
    }
  },
  computed: {
    radioNow () {
      return moment().tz(this.$parent.radioTZ).format('HH:mm:ss')
    },
    isToday () {
      return moment().format('YYYY-MM-DD') === this.today
    }
  },
  methods: {
    showSize (show) {
      // default none
      if (show.ks || show.duration < 1200) return ''
      return 'min-height: ' + show.duration / 100 + 'px'
    },
    isFuture (time) {
      const playing = moment(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ, true)
      const now = moment().tz(this.$parent.radioTZ)
      return now.diff(playing) < 0
    },
    toYourTime (time) {
      const prague = moment(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ, true)
      return prague.clone().tz(this.$parent.youTZ).calendar()
    },
    loadDay (day) {
      this.$parent.$refs.loader.loaded = false
      const self = this
      this.today = day
      this.shows = []
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/api/archive/' + day)
          .then(({ data }) => {
            self.shows = data.shows
            console.log(data)
            // self.url = this.config.url + '#t=' + this.config.offset
            // self.$refs.player.load()
            self.$parent.$refs.player.loaded = true
            self.playArchive(moment().format('HH:mm:ss'))
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
      this.$parent.$refs.loader.loaded = false
      const self = this
      return new Promise((resolve, reject) => {
        this.loading = true
        axios.get('/api/play/' + time + '/' + self.today)
          .then(({ data }) => {
            self.$parent.config = data
            self.$parent.$refs.player.url = self.$parent.config.url + '#t=' + self.$parent.config.offset
            // self.$refs.player.load()
            // self.$parent.$refs.player.loaded = true

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
.pushtop {
  margin-bottom: 300px;
}

/* .list-day li:nth-child(odd) {
  background: #f0f1f4;
} */

/* .list-day .list-group-item-danger:nth-child(odd),
.list-day .list-group-item-success:nth-child(odd) {
  background: #d4edda;
} */
</style>
