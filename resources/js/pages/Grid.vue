
<template>
  <div>
    Grid

    <strong>
      {{ source }}
    </strong>

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
  computed: {
    ...mapState(['url']),
    source () {
      if (document.getElementById('player') !== null) {
        return document.getElementById('player').src.split('#')[0]
      }
      return null
    }
  },
  watch: {
    source () {
      console.log('source changed: ', this.source)
      const options = {
        mediaUrl: this.source,
        dataUri: {
          arraybuffer: this.source + '.dat'
        }
      }

      this.instance.setSource(options, function (error) {
        // Waveform updated
        console.log('set source', error)
      })
    }
  },
  mounted () {
    // var wavesurfer = WaveSurfer.create({
    //   container: document.querySelector('#waveform'),
    //   progressColor: '#dc3545',
    //   waveColor: '#0d6efd',
    //   cursorColor: '#000',
    //   // This parameter makes the waveform look like SoundCloud's player
    //   backend: 'MediaElement',
    //   barWidth: 1,
    //   barHeight: 1 // the height of the wave
    //   // barGap: null // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
    // })

    // fetch('https://timemachine.test/api/wave/8')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('HTTP error ' + response.status)
    //     }
    //     return response.json()
    //   })
    //   .then(peaks => {
    //     console.log('loaded peaks! sample_rate: ' + peaks.sample_rate)

    //     // load peaks into wavesurfer.js
    //     wavesurfer.load('https://timemachine.test/storage/radio1/radio1-2021-01-04_20-42.mp3', peaks.data)
    //   })
    //   .catch((e) => {
    //     console.error('error', e)
    //   })

    // wavesurfer.on('ready', function () {
    //   console.log('waversutrer')
    //   wavesurfer.play()
    // })

    // // wavesurfer.on('audioprocess', function (event) {
    // //   console.log('audioprocess', event)
    // // })
    // wavesurfer.on('finish', function (event) {
    //   console.log('finish', event)
    // })

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
      segments: [{
        startTime: 120,
        endTime: 240,
        editable: false,
        color: '#ff0000',
        labelText: 'My label'
      },
      {
        startTime: 320,
        endTime: 840,
        editable: false,
        color: '#00ff00',
        labelText: 'My Second label'
      }],

      points: [{
        time: 150,
        editable: false,
        color: '#00ff00',
        labelText: 'A point'
      },
      {
        time: 160,
        editable: false,
        color: '#00ff00',
        labelText: 'Another point'
      }],

      // the color of a point marker
      pointMarkerColor: '#FF0000',

      // Color of the axis gridlines
      axisGridlineColor: '#0d6efd',
      containers: {
        overview: document.getElementById('overview-container'),
        zoomview: document.getElementById('zoomview-container')
      },
      mediaElement: document.getElementById('player'),
      // dataUri: {
      //   arraybuffer:
      //   // json: '/sample.json'
      // }
      mediaUrl: this.source,
      dataUri: {
        arraybuffer: this.source + '.dat'
      }
      //      dataUri: 'https://timemachine.test/storage/radio1/radio1-2021-01-07_05-50.mp3.dat'// document.getElementById('player').src.split('#')[0] + '.dat'
    }

    this.instance = Peaks.init(options, function (err, peaks) {
      console.log('peak init', err)
    })
    console.log('Peak started...', this.source)
  }
}
</script>

<style>

</style>
