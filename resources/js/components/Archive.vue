<template>
  <div>
    <div class="pushtop p-0">
      <!-- <div class="h5 text-center text-secondary">
        Archive
      </div> -->
      <div class="col-12 p-0">
        <!-- <button
          class="btn btn-sm btn-success"
          v-for="day in days"
          :class="{'list-group-item-secondary': day.format === today}"
          :key="day.format"
        >
          {{ day.niceday }}
        </button> -->

        <div
          v-if="dj !== null"
          class="text-center alert-info p-2"
        >
          Filter:
          <button
            class="btn btn-xs btn-outline-primary "
            @click="resetDj()"
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
            {{ dj }}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-eject-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM.5 11.5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-1z"
              />
            </svg>
          </button>
        </div>
        <ul class="list-group list-group-striped list-group-flush">
          <li
            class="list-group-item p-2 rounded list-day"
            v-for="day in days"
            :class="{'list-group-item-secondary': day.format === today}"
            :key="day.format"
          >
            <!-- Days -->
            <a
              :href="'/archive/'+day.format"
              class="h6 nav-link"
              @click.prevent="loadDay(day.format)"
            >
              {{ day.niceday }}
            </a>

            <!-- Shows -->
            <ul
              class="list-group  list-group-flush"
              v-if="day.format === today || dj !==null"
            >
              <li
                class="list-group-item p-1 rounded"
                v-show="!isFuture(show.starts_hours)"
                :class="{'list-group-item-info': show.ks,
                         'list-group-item-success': isShowPlaying(show) ,
                         'list-group-item-danger': show.now }"
                v-for="(show, time) in filter(day.format,shows)"
                :key="time"
              >
                <div
                  class="row pl-3"
                  :style="showSize(show)"
                >
                  <button
                    class="btn col-2 btn-sm btn-outline-success"
                    @click="playArchive(show.starts_hours)"
                    :class="{'btn-outline-success':isShowPlaying(show)}"
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
                  <div class="col-9 small">
                    <strong> {{ show.when }}  | {{ show.tracks.length }} tracks </strong>| <i> {{ show.duration_human }} </i><br>

                    <span
                      v-for="(person, pindex) in show.people"
                      :key="pindex"
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

                    <span class="text-muted float-right">
                      {{ show.desc }}
                    </span>
                  </div>

                  <!-- <span
                    v-if="show.now"
                    class="badge badge-info"
                  >
                    <span v-if="!isToday">TimeMachine now</span>

                  </span> -->

                  <!-- Tracks -->
                  <div
                    class="p-1"
                    v-if="show.tracks.length && isShowPlaying(show)"
                  >
                    <strong>Tracks</strong>
                    <div
                      v-for="(track, tindex) in show.tracks"
                      class="border-bottom"
                      :class="{'alert-success': currentTrack !== undefined && track.id === currentTrack.id}"
                      :key="tindex+'-'+time"
                    >
                      <Track
                        :track="track"
                        :play="true"
                      />
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
import Track from './Track'
export default {
  name: 'Archive',
  components: {
    Track
  },
  data () {
    return {
      days: [],
      shows: [],
      slotPlaying: null,
      today: moment().format('YYYY-MM-DD')
    }
  },
  props: {
    dj: {
      type: [String],
      default: null
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
    },
    currentTrack () {
      return this.$parent.$refs.player.currentTrack
    }
  },
  methods: {
    filter (day, shows) {
      if (this.dj === null) return shows
      var currentDj = new RegExp(this.dj.replaceAll('-', ' '), 'gi')
      if (this.$parent.config.archive[day] !== undefined) {
        return this.$parent.config.archive[day].filter(function (show) {
          return show.people.filter(function (person) {
            return person.name.match(currentDj)
          }).length
        })
      }
    },
    setDj (dj) {
      // filter it a bit
      const djNice = dj.toLowerCase().replaceAll(' ', '-')
      history.replaceState(null, null, '/@' + djNice)
      this.$parent.dj = dj
    },
    resetDj () {
      this.$parent.dj = null
      this.$parent.djNice = null
      history.replaceState(null, null, '/')
    },
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
    },
    toYourTime (time) {
      const prague = moment(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ, true)
      return prague.clone().tz(this.$parent.youTZ).calendar()
    },
    loadDay (day) {
      this.$parent.$refs.loader.loaded = false
      // const self = this
      this.today = day
      this.shows = this.$parent.config.archive[day]
      this.$parent.$refs.loader.loaded = true
      this.playArchive(moment().format('HH:mm:ss'))
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
