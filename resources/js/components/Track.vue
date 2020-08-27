<template>
  <span>
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
  </span>
</template>
<script>
import moment from 'moment-timezone'

export default {
  name: 'Track',
  props: {
    track: {
      type: [Object, Array],
      default: null
    }
  },
  data () {
    return {

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

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="css" scoped>

.fixed {
  position: absolute;
  top:0;
}

</style>
