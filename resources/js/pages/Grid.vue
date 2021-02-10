<template>
  <div>
    Grid
    <div id="waveform-container">
      <div id="zoomview-container" />
      <div id="overview-container" />
    </div>
  </div>
</template>
<script>
// import WaveSurfer from 'wavesurfer.js'
import Peaks from 'peaks.js'
import { mapState } from 'vuex'
export default {
  name: 'Grid',
  data () {
    return {
      instance: null
    }
  },
  methods: {

  },
  computed: {
    ...mapState(['url', 'tracks', 'show', 'stream_id']),
    source () {
      if (this.url !== null) {
        return this.url.split('#')[0]
      }
      return null
    },
    segments () {
      const self = this
      const streamTracks = this.tracks.filter(function (track) {
        return track.stream_id === self.stream_id
      }).map(track => {
        const segment = {}
        segment.startTime = track.timecode_starts
        segment.endTime = track.timecode_ends
        segment.editable = false
        // segment.color = '#ff0000'
        segment.labelText = track.title + '' + track.artist
        return segment
      })

      return streamTracks
      // return [{
      //   startTime: 120,
      //   endTime: 240,
      //   editable: false,
      //   color: '#ff0000',
      //   labelText: 'My label'
      // },
      // {
      //   startTime: 320,
      //   endTime: 840,
      //   editable: false,
      //   color: '#00ff00',
      //   labelText: 'My Second label'
      // }]
    }
  },
  watch: {
    source () {
      console.log('source changed: ', this.source)
      const options = {
        mediaUrl: this.source,
        segments: this.segments,
        dataUri: {
          arraybuffer: this.source + '.dat'
        }
      }
      this.$parent.$refs.loader.loaded = false
      const self = this
      this.instance.setSource(options, function (error) {
        // Waveform updated
        console.log('set source', error)
        self.$parent.$refs.loader.loaded = true
      })
    }
  },
  mounted () {
    // /api/stream/{stream}
    const options = {
      // webAudio: {
      //   // A Web Audio AudioContext instance which can be used
      //   // to render the waveform if dataUri is not provided
      //   audioContext: new AudioContext(),

      //   // Alternatively, provide an AudioBuffer containing the decoded audio
      //   // samples. In this case, an AudioContext is not needed
      //   audioBuffer: null,

      //   // If true, the waveform will show all available channels.
      //   // If false, the audio is shown as a single channel waveform.
      //   multiChannel: false
      // },
      logger: console.error.bind(console),
      // Show current time next to the play head
      // (zoom view only)
      showPlayheadTime: true,
      zoomLevels: [512, 1024, 2048, 4096],
      keyboard: true,
      // Array of initial segment objects with startTime and
      // endTime in seconds and a boolean for editable.
      // See below.
      segments: this.segments,

      // points: [{
      //   time: 150,
      //   editable: false,
      //   color: '#00ff00',
      //   labelText: 'A point'
      // },
      // {
      //   time: 160,
      //   editable: false,
      //   color: '#00ff00',
      //   labelText: 'Another point'
      // }],

      // the color of a point marker
      pointMarkerColor: '#FF0000',

      // Color of the axis gridlines
      axisGridlineColor: '#0d6efd',
      containers: {
        overview: document.getElementById('overview-container'),
        zoomview: document.getElementById('zoomview-container')
      },
      mediaElement: document.getElementById('player'),
      mediaUrl: this.source,
      dataUri: {
        arraybuffer: this.source + '.dat'
      }
    }

    const self = this
    this.$parent.$refs.loader.loaded = false
    setTimeout(() => {
      this.instance = Peaks.init(options, function (err, peaks) {
        console.log('peak init', err)
        self.$root.$emit('pause')
        self.$root.$emit('resume')
        self.$parent.$refs.loader.loaded = true
      })
      console.log('Peak started...', this.source)
    }, 2000)
  }
}
</script>

<style>

</style>
