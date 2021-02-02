<template>
  <div>
    <div class="p-0">
      <!-- <div class="h5 text-center text-secondary">
        Archive
      </div> -->
      <div class="col-12 p-0">
        <ul class="list-group list-group-striped list-group-flush">
          <li
            class="list-group-item p-0 rounded"
            v-for="day in days"
            :class="{'list-group-item-secondary': day.format === today}"
            :key="day.format"
          >
            <!-- Days -->
            <a
              :href="'/archive/'+day.format"
              class="nav-link"
              @click.prevent="loadDay(day.format)"
            >
              {{ day.niceday }}
              <span v-if="shows[day.format] !== undefined">
                -
                {{ shows[day.format].length }} shows
              </span>
            </a>

            <ul
              class="list-group list-group-flush"
              v-if="day.format === today"
            >
              <!-- v-if="day.format === today || dj !==null" -->
              <li
                class="list-group-item rounded p-0 m-0"
                v-for="show in shows[day.format]"
                :key="show.id"
              >
                <div
                  class="row g-0 pb-1"
                >
                  <!-- :style="showSize(show)" -->
                  <button
                    class="btn col-2 p-0 btn-sm btn-outline-success"
                    @click="loadArchiveTrack(show)"
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
                  <div class="col-10 small">
                    <strong> {{ show.when }}</strong>

                    <strong class="float-end">
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
                      {{ show.stream_at }} </strong> ·

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-disc"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 4a4 4 0 0 0-4 4 .5.5 0 0 1-1 0 5 5 0 0 1 5-5 .5.5 0 0 1 0 1zm4.5 3.5a.5.5 0 0 1 .5.5 5 5 0 0 1-5 5 .5.5 0 0 1 0-1 4 4 0 0 0 4-4 .5.5 0 0 1 .5-.5z" />
                    </svg>
                    {{ show.spins_count }} ·
                    <i> {{ show.duration_human }} </i>
                    <br>
                    <span
                      v-for="(person, pindex) in show.people"
                      :key="pindex"
                    >
                      <button

                        class="btn btn-xs btn-outline-primary"
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
                    class="p-0"
                    v-if="tracks && tracks.length && show == open_show"
                  >
                    <div
                      v-for="spin in tracks"
                      class="border-bottom border-light"
                      :key="spin.id"
                    >
                      <!-- :class="{'bg-white text-dark border border-danger text-light': currentTrack !== undefined && track.id === currentTrack.id}" -->
                      <NuTrack
                        :track="spin"
                        :url="spin.url"
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
import NuTrack from '@/components/NuTrack'
export default {
  name: 'NuArchive',
  components: {
    NuTrack
  },
  data () {
    return {
      days: [],
      shows: [],
      tracks: [],
      open_show: null,
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
    let n = 14
    while (n > 0) {
      const day = {}
      day.calendar = current.calendar()
      day.format = current.format('YYYY-MM-DD')
      day.niceday = current.calendar().split(' at')[0]
      this.days.push(day)
      current.subtract(1, 'day')
      n--
    }
    this.loadArchive()
  },
  computed: {

  },
  methods: {
    playShow (url) {
      this.$root.$emit('play', url)
    },
    loadArchiveTrack (show) {
      this.playShow(show.play_it)
      this.tracks = []
      this.open_show = show
      this.$parent.$refs.loader.loaded = false
      fetch('api/archive/' + show.id)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        .then(response => {
          this.tracks = response.data
          console.log('loaded data! track: ')
          this.$parent.$refs.loader.loaded = true
        })
        .catch((e) => {
          console.error('error', e)
        })
    },
    loadArchive () {
      this.$parent.$refs.loader.loaded = false
      fetch('api/archive')
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        .then(response => {
          this.shows = response
          console.log('loaded data! shows: ')
          this.$parent.$refs.loader.loaded = true
        })
        .catch((e) => {
          console.error('error', e)
        })
    },
    scrollToElement () {
      const el = this.$el.getElementsByClassName('scroll-to-me')[0]

      if (el) {
        el.scrollIntoView()
      }
    },

    loadDay (day) {
      this.$parent.$refs.loader.loaded = false
      // const self = this
      if (this.today === day) {
        this.today = null
      } else {
        this.today = day
      }

      // this.shows = this.$parent.config.archive[day]
      this.$parent.$refs.loader.loaded = true
      // this.playArchive(moment().format('HH:mm:ss'))
    }

  }

}
</script>
<style>

</style>
