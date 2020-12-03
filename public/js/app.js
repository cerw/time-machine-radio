(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Archive.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Archive.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Track__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Track */ "./resources/js/components/Track.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Archive',
  components: {
    Track: _Track__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      days: [],
      shows: [],
      slotPlaying: null,
      today: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY-MM-DD')
    };
  },
  props: {
    dj: {
      type: [String],
      "default": null
    }
  },
  mounted: function mounted() {
    var current = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()();
    var n = 4;

    while (n > 0) {
      var day = {};
      day.calendar = current.calendar();
      day.format = current.format('YYYY-MM-DD');
      day.niceday = current.calendar().split(' at')[0];
      this.days.push(day);
      current.subtract(1, 'day');
      n--;
    }
  },
  computed: {
    radioNow: function radioNow() {
      return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().tz(this.$parent.radioTZ).format('HH:mm:ss');
    },
    isToday: function isToday() {
      return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY-MM-DD') === this.today;
    },
    currentTrack: function currentTrack() {
      return this.$parent.$refs.player.currentTrack;
    }
  },
  methods: {
    filter: function filter(day, shows) {
      if (this.dj === null) return shows;
      var currentDj = new RegExp(this.dj.replaceAll('-', ' '), 'gi');

      if (this.$parent.config.archive[day] !== undefined) {
        return this.$parent.config.archive[day].filter(function (show) {
          return show.people.filter(function (person) {
            return person.name.match(currentDj);
          }).length;
        });
      }
    },
    scrollToElement: function scrollToElement() {
      var el = this.$el.getElementsByClassName('scroll-to-me')[0];

      if (el) {
        el.scrollIntoView();
      }
    },
    setDj: function setDj(dj) {
      // filter it a bit
      var djNice = dj.toLowerCase().replaceAll(' ', '-');
      history.replaceState(null, null, '/@' + djNice);
      this.$parent.dj = dj;
    },
    resetDj: function resetDj() {
      this.$parent.dj = null;
      this.$parent.djNice = null;
      history.replaceState(null, null, '/');
    },
    showSize: function showSize(show) {
      // default none
      if (show.ks || show.duration < 1200) return '';
      return 'min-height: ' + show.duration / 100 + 'px';
    },
    isFuture: function isFuture(time) {
      var playing = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ, true);
      var now = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().tz(this.$parent.radioTZ);
      return now.diff(playing) < 0;
    },
    isShowPlaying: function isShowPlaying(show) {
      // radioThen
      // playing clock now - this.$parent.radioThen / "Tuesday 23:00:40
      var format = 'hh:mm:ss';
      var time = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(this.$parent.radioThen.split(' ')[1], format);
      var beforeTime = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(show.starts_hours, format);
      var afterTime = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(show.ends_hours, format);

      if (time.isBetween(beforeTime, afterTime)) {
        return true;
      } else {
        return false;
      }
    },
    toYourTime: function toYourTime(time) {
      var prague = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(this.today + ' ' + time, 'YYYY-MM-DD HH:mm:ss').tz(this.$parent.radioTZ, true);
      return prague.clone().tz(this.$parent.youTZ).calendar();
    },
    loadDay: function loadDay(day) {
      this.$parent.$refs.loader.loaded = false; // const self = this

      this.today = day;
      this.shows = this.$parent.config.archive[day];
      this.$parent.$refs.loader.loaded = true;
      this.playArchive(moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:mm:ss'));
    },
    playArchive: function playArchive(time) {
      var _this = this;

      this.slotPlaying = time;
      this.$parent.$refs.loader.loaded = false;
      var self = this;
      return new Promise(function (resolve, reject) {
        _this.loading = true;
        axios.get('/api/play/' + time + '/' + self.today).then(function (_ref) {
          var data = _ref.data;
          self.$parent.config = data;
          self.$parent.$refs.player.url = self.$parent.config.url + '#t=' + self.$parent.config.offset; // self.$refs.player.load()
          // self.$parent.$refs.player.loaded = true

          resolve(data);
        })["catch"](function (error) {
          console.log('error getting crew', error);
          reject(error);
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Layout.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Layout.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Archive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Archive */ "./resources/js/components/Archive.vue");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./resources/js/components/Player.vue");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loader */ "./resources/js/components/Loader.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 // import Podcast from './Podcast'

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Layout',
  components: {
    Archive: _Archive__WEBPACK_IMPORTED_MODULE_1__["default"],
    Player: _Player__WEBPACK_IMPORTED_MODULE_2__["default"],
    Loader: _Loader__WEBPACK_IMPORTED_MODULE_3__["default"] // Podcast

  },
  data: function data() {
    return {
      radioTZ: 'Europe/Prague',
      youTZ: 'Australia/Perth',
      youNow: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:mm:ss'),
      youDate: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('Y-MM-DD'),
      radioNow: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:mm:ss'),
      radioDate: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:mm:ss'),
      radioThen: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:mm:ss'),
      radioCalendar: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:mm:ss'),
      interval: null,
      config: {
        url: null,
        offset: 0
      },
      offset: 0,
      secondsLeft: 0,
      dj: null
    };
  },
  mounted: function mounted() {
    var self = this;
    this.youTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.interval = setInterval(function () {
      self.timeInternal();
    }, 1000); // this.logNetworkInfo()
    // 17:34:27

    var currentTime = this.youNow;
    var currentUrl = window.location.href.split('/');

    if (currentUrl.length === 5) {
      currentTime = currentUrl[4] + '/' + currentUrl[3];
      console.log('got url', currentTime);
    } // @bln


    if (currentUrl.length === 4) {
      this.dj = currentUrl[3].split('@')[1];
    }

    this.load(currentTime).then(function () {
      console.log('playTimemachine load done', currentTime);
      self.$refs.player.url = self.config.url + '#t=' + self.config.offset;
      self.$refs.player.playAudio();
      self.timeInternal();
      console.log('Archive -  program for that day', self.radioDate);
      self.$refs.archives.loadDay(self.radioDate);
    })["catch"](function (error) {
      return console.log(error);
    }); // ga('send', {
    //   hitType: 'event',
    //   eventCategory: 'Videos',
    //   eventAction: 'play',
    //   eventLabel: 'Fall Campaign'
    // })
  },
  computed: {
    radioTime: function radioTime() {
      return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.tz(this.radioTZ);
    },
    radioZone: function radioZone() {
      return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.tz.zone(this.radioTZ);
    },
    // all baout you
    youTime: function youTime() {
      return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.tz(this.youTZ);
    },
    youZone: function youZone() {
      return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.tz.zone(this.youTZ);
    },
    youOffset: function youOffset() {
      return (this.radioZone.utcOffset(moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.now()) - this.youZone.utcOffset(moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.now())) / 60;
    },
    loaded: function loaded() {
      if (this.$refs.loader === undefined) return true;
      return this.$refs.loader.loaded;
    }
  },
  methods: {
    app: function app() {
      window.addToHomeScreen();
    },
    timeInternal: function timeInternal() {
      this.offset++;
      this.youNow = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().tz(this.youTZ).format('HH:mm:ss');
      this.youDate = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().tz(this.youTZ).format('dddd HH:mm:ss');
      this.radioNow = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().tz(this.radioTZ).format('dddd HH:mm:ss');

      if (this.$refs.player !== undefined && this.$refs.player.$refs.player !== undefined) {
        var audioPlayer = this.$refs.player.$refs.player;
        this.radioThen = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(this.config.recoded_timestamp).add(audioPlayer.currentTime, 'seconds') // .tz(this.radioTZ)
        .format('dddd HH:mm:ss');
        this.radioDate = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(this.config.recoded_timestamp).add(audioPlayer.currentTime, 'seconds') // .tz(this.radioTZ)
        .format('Y-MM-DD');
        this.radioCalendar = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(this.config.recoded_timestamp).add(audioPlayer.currentTime, 'seconds') // .tz(this.radioTZ)
        .calendar().replace(); // const url = moment(this.config.recoded_timestamp)
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

        this.$refs.player.updateMetadata();
      }
    },
    load: function load(time) {
      var _this = this;

      this.$refs.loader.loaded = false;
      var self = this;
      var when;

      if (time !== undefined) {
        when = time;
      } else {
        when = this.youNow;
      }

      return new Promise(function (resolve, reject) {
        _this.loading = true;
        axios.get('/api/play/' + when).then(function (_ref) {
          var data = _ref.data;
          self.config = data;
          console.log('ajax load done');
          self.$refs.player.url = self.config.url + '#t=' + self.config.offset; // const url = moment(this.config.recoded_timestamp)
          //   .add(this.config.offset, 'seconds')
          //   .format('/Y-MM-DD/HH:mm:ss')
          // history.replaceState(null, null, url)

          resolve(data);
        })["catch"](function (error) {
          console.log('error getting crew', error);
          reject(error);
        });
      });
    },
    live: function live() {
      var _this2 = this;

      this.$refs.loader.loaded = false;
      var self = this;
      return new Promise(function (resolve, reject) {
        _this2.loading = true;
        axios.get('/api/live').then(function (_ref2) {
          var data = _ref2.data;
          self.config = data; // self.$refs.player.load()

          resolve(data);
        })["catch"](function (error) {
          console.log('error getting live', error);
          reject(error);
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Loader.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Loader.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import moment from 'moment-timezone'
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Loader',
  props: {
    config: {
      type: [Object, Array],
      "default": null
    }
  },
  data: function data() {
    return {
      loaded: false
    };
  },
  mounted: function mounted() {},
  computed: {
    radioNow: function radioNow() {
      return this.$parent.radioNow;
    }
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Player.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Player.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Track__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Track */ "./resources/js/components/Track.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Player',
  components: {
    Track: _Track__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    config: {
      type: [Object, Array],
      "default": null
    }
  },
  data: function data() {
    return {
      liveUrl: 'https://icecast6.play.cz/radio1-128.mp3',
      url: null // radioDate: moment().format('HH:mm:ss'),
      // radioCalendar: moment().format('HH:mm:ss'),

    };
  },
  mounted: function mounted() {
    var self = this;

    if ('mediaSession' in navigator && 'setActionHandler' in navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('play', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('> User clicked "Play" icon.');
                _context.next = 3;
                return self.$refs.player.play();

              case 3:
                navigator.mediaSession.playbackState = 'playing'; // Do something more than just playing audio...

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      navigator.mediaSession.setActionHandler('pause', function () {
        console.log('> User clicked "Pause" icon.');
        self.$refs.player.pause();
        navigator.mediaSession.playbackState = 'paused'; // Do something more than just pausing audio...
      });
      /* Seek Backward & Seek Forward */

      var defaultSkipTime = 60;
      /* Time to skip in seconds by default */

      navigator.mediaSession.setActionHandler('seekbackward', function (event) {
        console.log('> User clicked "Seek Backward" icon.');
        var skipTime = event.seekOffset || defaultSkipTime;
        self.seekBack(skipTime);
        self.updatePositionState();
      });
      navigator.mediaSession.setActionHandler('seekforward', function (event) {
        console.log('> User clicked "Seek Forward" icon.');
        var skipTime = event.seekOffset || defaultSkipTime;
        self.seekForward(skipTime);
        self.updatePositionState();
      });
      navigator.mediaSession.setActionHandler('previoustrack', function (event) {
        console.log('> User clicked "previoustrack" icon.');
        self.prevSong();
        self.updatePositionState();
      });
      navigator.mediaSession.setActionHandler('nexttrack', function (event) {
        console.log('> User clicked "nexttrack" icon.');
        self.nextSong();
        self.updatePositionState();
      });

      try {
        navigator.mediaSession.setActionHandler('seekto', function (event) {
          console.log('> User clicked "Seek To" icon.');

          if (event.fastSeek && 'fastSeek' in self.$refs.player) {
            self.$refs.player.fastSeek(event.seekTime);
            return;
          }

          self.$refs.player.currentTime = event.seekTime;
          self.updatePositionState();
        });
      } catch (error) {
        console.log('Warning! The "seekto" media session action is not supported.');
      }
    }

    window.addEventListener('keypress', function (e) {
      if (e.code === 'Space') {
        if (self.$refs.player.paused) {
          self.playAudio();
        } else {
          self.$refs.player.pause();
        }
      }
    });
  },
  computed: {
    radioNow: function radioNow() {
      return this.$parent.radioNow;
    },
    radioThen: function radioThen() {
      return this.$parent.radioThen;
    },
    mediaTime: function mediaTime() {
      return 0;
    },
    currentTrack: function currentTrack() {
      if (this.config.playing !== undefined && this.config.playing.tracks !== undefined) {
        var self = this;
        var trackPlayings = this.config.playing.tracks.filter(function (track, index) {
          // song started
          // next song started / aprox lenght of song?
          var format = 'hh:mm:ss';
          var time = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(self.radioThen.split(' ')[1], format);
          var trackStarted = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(track.radio_time, format);
          var trackEnded = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(track.radio_time_ends, format); // console.log(time, beforeTime, afterTime)
          // console.log(index, track.title, track.stream_at, track.stream_ends_at)

          if (time.isBetween(trackStarted, trackEnded)) {
            return true;
          } else {
            return false;
          }
        });

        if (trackPlayings.length) {
          return trackPlayings[0];
        }
      }

      return undefined;
    },
    nextTrack: function nextTrack() {
      if (this.config.playing !== undefined && this.config.playing.tracks !== undefined) {
        var self = this;
        var currentIndex = this.config.playing.tracks.findIndex(function (track) {
          return track.id === self.currentTrack.id;
        });

        if (currentIndex !== -1) {
          return this.config.playing.tracks[currentIndex + 1];
        }
      }

      return undefined;
    },
    prevTrack: function prevTrack() {
      if (this.config.playing !== undefined && this.config.playing.tracks !== undefined) {
        var self = this;
        var currentIndex = this.config.playing.tracks.findIndex(function (track) {
          return track.id === self.currentTrack.id;
        });

        if (currentIndex !== -1) {
          return this.config.playing.tracks[currentIndex - 1];
        }
      }

      return undefined;
    },
    isShowPlaying: function isShowPlaying(show) {
      // radioThen
      // playing clock now - this.$parent.radioThen / "Tuesday 23:00:40
      var format = 'hh:mm:ss';
      var time = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(this.$parent.radioThen.split(' ')[1], format);
      var beforeTime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(show.starts_hours, format);
      var afterTime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(show.ends_hours, format);

      if (time.isBetween(beforeTime, afterTime)) {
        return true;
      } else {
        return false;
      }
    } // radioTime () {
    //   return moment.tz(this.radioTZ)
    // },
    // radioZone () {
    //   return moment.tz.zone(this.radioTZ)
    // },
    // // all baout you
    // youTime () {
    //   return moment.tz(this.youTZ)
    // },
    // youZone () {
    //   return moment.tz.zone(this.youTZ)
    // },
    // youOffset () {
    //   return (this.radioZone.utcOffset(moment.now()) - this.youZone.utcOffset(moment.now())) / 60
    // }

  },
  methods: {
    setDj: function setDj(dj) {
      this.$parent.$refs.archives.setDj(dj);
    },
    seekForward: function seekForward(skipTime) {
      this.$refs.player.currentTime = Math.min(this.$refs.player.currentTime + skipTime, this.$refs.player.duration);
    },
    seekBack: function seekBack(skipTime) {
      this.$refs.player.currentTime = Math.max(this.$refs.player.currentTime - skipTime, 0);
    },
    nextSong: function nextSong() {
      this.$parent.$refs.archives.playArchive(this.nextTrack.radio_time);
    },
    prevSong: function prevSong() {
      this.$parent.$refs.archives.playArchive(this.prevTrack.radio_time);
    },
    canplay: function canplay(event) {
      console.log('Player - can play');
      this.$parent.$refs.loader.loaded = true;
      this.playAudio();
    },
    ended: function ended(event) {
      console.log('ended', event);
      this.$refs.player.pause(); // sound.currentTime = 0;

      console.log('Song ended getting next ' + this.config.next);
      this.$parent.load(this.config.next);
    },
    updatePositionState: function updatePositionState() {
      if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        if (this.livePlaying) {
          // navigator.mediaSession.setPositionState({
          //   title: this.config.recoded_at + ' ' + this.radioThen,
          //   playbackRate: this.$refs.player.playbackRate,
          //   duration: this.$refs.player.duration
          //   // position: this.$refs.player.currentTime
          // })
          this.updateMetadata();
        } else {
          navigator.mediaSession.setPositionState({
            title: this.config.recoded_at + ' ' + this.radioThen,
            playbackRate: this.$refs.player.playbackRate,
            duration: this.$refs.player.duration,
            position: this.$refs.player.currentTime
          });
        }
      }
    },
    updateMetadata: function updateMetadata() {
      if ('mediaSession' in navigator && this.config.playing !== undefined) {
        /*
        src: '/images/icons/icon-96x96.png',
        title: 'Snow Fight',
        artist: 'Jan Morgenstern',
        album: 'Sintel',
        */
        // console.log('updateMetadata')
        var artwork = [{
          src: '/images/icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        }, {
          src: '/images/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        }, {
          src: '/images/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        }, {
          src: '/images/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        }, {
          src: '/images/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        }, {
          src: '/images/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }];
        var title = this.config.recoded_at + ' ' + this.radioThen;

        if (this.livePlaying()) {
          // life
          title = 'Live ' + this.radioNow;
        }

        var artist = 'N/A';

        if (this.config.playing !== undefined && this.config.playing.people !== undefined) {
          artist = this.config.playing.people[0].name;
        }

        var album = 'Radio 1 🕰Machine';

        if (this.config.playing.desc !== undefined) {// album = this.config.playing.info.desc
        } // Serving show from <strong>{{ config.recoded_at }} </strong>- {{ radioThen }}
        // console.log('MediaMetadata', this.currentTrack)


        if (this.currentTrack !== undefined) {
          var _artwork = [{
            src: this.currentTrack.song_link + '?thumb',
            sizes: '512x512',
            type: 'image/jpeg'
          }, {
            src: this.currentTrack.song_link + '?thumb',
            sizes: '640x640',
            type: 'image/jpeg'
          }];
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: this.currentTrack.title,
            artist: this.currentTrack.artist,
            album: this.currentTrack.album,
            artwork: _artwork
          });
        } else {
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: title,
            artist: artist,
            album: album,
            artwork: artwork
          });
        }
      }
    },
    // https://googlechrome.github.io/samples/media-session/audio.html
    playAudio: function playAudio() {
      var _this = this;

      console.log('player - playAudio start');
      this.$refs.player.play().then(function () {
        console.log('player - playAudio callback');

        _this.updateMetadata();

        _this.$parent.$refs.loader.loaded = true;

        _this.$forceUpdate();
      })["catch"](function (error) {
        return console.log(error);
      });
    },
    livePlaying: function livePlaying() {
      if (this.$refs.player === undefined) {
        return false;
      }

      if (this.url === this.liveUrl) {
        return !this.$refs.player.paused;
      }

      return false;
    },
    timemachinePlaying: function timemachinePlaying() {
      if (this.$refs.player === undefined) {
        return false;
      }

      if (this.url !== this.liveUrl) {
        return !this.$refs.player.paused;
      }

      return false;
    },
    // type = live | timemachine
    playTimemachine: function playTimemachine() {
      // set url - config.url+'#t='+config.offset
      if (this.timemachinePlaying()) {
        this.$refs.player.pause();
      } else {
        this.$parent.$refs.loader.loaded = false;
        this.$parent.load().then(function () {
          console.log('load done in player');
        });
      }

      this.$forceUpdate();
    },
    playLive: function playLive() {
      // set live url
      // const self = this
      if (this.livePlaying()) {
        this.$refs.player.pause();
      } else {
        console.log('playLive');
        this.$parent.$refs.loader.loaded = false;
        this.url = this.liveUrl;
        this.$parent.live();
        this.playAudio();
      }

      this.$forceUpdate();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Track.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Track.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Track',
  props: {
    track: {
      type: [Object, Array],
      "default": null
    },
    play: {
      type: [Boolean],
      "default": false
    }
  },
  data: function data() {
    return {};
  },
  filters: {
    formatYear: function formatYear(value) {
      if (value !== undefined) {
        return moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(value).format('Y');
      } else {
        return false;
      }
    }
  },
  mounted: function mounted() {},
  computed: {},
  methods: {
    playArchive: function playArchive(time) {
      this.$parent.playArchive(time);
    }
  }
});

/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Archive.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Archive.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Layout.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Layout.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Archive.vue?vue&type=template&id=164bd927&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Archive.vue?vue&type=template&id=164bd927& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "pushtop p-0" }, [
      _c("div", { staticClass: "col-12 p-0" }, [
        _vm.dj !== null
          ? _c("div", { staticClass: "text-center alert-info p-2" }, [
              _vm._v("\n        Filter:\n        "),
              _c(
                "button",
                {
                  staticClass: "btn btn-xs btn-outline-primary ",
                  on: {
                    click: function($event) {
                      return _vm.resetDj()
                    }
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass: "bi bi-file-person",
                      attrs: {
                        width: "1em",
                        height: "1em",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
                        }
                      }),
                      _vm._v(" "),
                      _c("path", {
                        attrs: {
                          d:
                            "M13.784 14c-.497-1.27-1.988-3-5.784-3s-5.287 1.73-5.784 3h11.568z"
                        }
                      }),
                      _vm._v(" "),
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d: "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                        }
                      })
                    ]
                  ),
                  _vm._v("\n          " + _vm._s(_vm.dj) + "\n          "),
                  _c(
                    "svg",
                    {
                      staticClass: "bi bi-eject-fill",
                      attrs: {
                        width: "1em",
                        height: "1em",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM.5 11.5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-1z"
                        }
                      })
                    ]
                  )
                ]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "list-group list-group-striped list-group-flush" },
          _vm._l(_vm.days, function(day) {
            return _c(
              "li",
              {
                key: day.format,
                staticClass: "list-group-item p-0 rounded list-day",
                class: { "list-group-item-secondary": day.format === _vm.today }
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "h6 nav-link",
                    attrs: { href: "/archive/" + day.format },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.loadDay(day.format)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n            " + _vm._s(day.niceday) + "\n          "
                    )
                  ]
                ),
                _vm._v(" "),
                day.format === _vm.today || _vm.dj !== null
                  ? _c(
                      "ul",
                      { staticClass: "list-group  list-group-flush" },
                      _vm._l(_vm.filter(day.format, _vm.shows), function(
                        show,
                        time
                      ) {
                        return _c(
                          "li",
                          {
                            key: time,
                            staticClass: "list-group-item p-1 rounded",
                            class: {
                              "list-group-item-info": show.ks,
                              "list-group-item-success": _vm.isShowPlaying(
                                show
                              ),
                              disabled: _vm.isFuture(show.starts_hours),
                              "list-group-item-danger": show.now
                            }
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "row pl-3",
                                style: _vm.showSize(show)
                              },
                              [
                                !_vm.isFuture(show.starts_hours)
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn col-2 btn-sm btn-outline-success",
                                        class: {
                                          "btn-outline-success": _vm.isShowPlaying(
                                            show
                                          )
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.playArchive(
                                              show.starts_hours
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _vm.slotPlaying !== show.starts_hours
                                          ? _c(
                                              "svg",
                                              {
                                                staticClass: "bi bi-stop",
                                                attrs: {
                                                  width: "2em",
                                                  height: "2em",
                                                  viewBox: "0 0 16 16",
                                                  fill: "currentColor",
                                                  xmlns:
                                                    "http://www.w3.org/2000/svg"
                                                }
                                              },
                                              [
                                                _c("path", {
                                                  attrs: {
                                                    "fill-rule": "evenodd",
                                                    d:
                                                      "M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                                                  }
                                                })
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.slotPlaying === show.starts_hours
                                          ? _c(
                                              "svg",
                                              {
                                                staticClass: "bi bi-play",
                                                attrs: {
                                                  width: "2em",
                                                  height: "2em",
                                                  viewBox: "0 0 16 16",
                                                  fill: "currentColor",
                                                  xmlns:
                                                    "http://www.w3.org/2000/svg"
                                                }
                                              },
                                              [
                                                _c("path", {
                                                  attrs: {
                                                    "fill-rule": "evenodd",
                                                    d:
                                                      "M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
                                                  }
                                                })
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "col-9 small" },
                                  [
                                    _c("strong", [
                                      _vm._v(
                                        " " +
                                          _vm._s(show.when) +
                                          "  | " +
                                          _vm._s(show.tracks.length) +
                                          " tracks "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("br"),
                                    _vm._v(" "),
                                    _c(
                                      "svg",
                                      {
                                        staticClass: "bi bi-clock-history",
                                        attrs: {
                                          width: "1em",
                                          height: "1em",
                                          viewBox: "0 0 16 16",
                                          fill: "currentColor",
                                          xmlns: "http://www.w3.org/2000/svg"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            "fill-rule": "evenodd",
                                            d:
                                              "M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("path", {
                                          attrs: {
                                            "fill-rule": "evenodd",
                                            d:
                                              "M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("path", {
                                          attrs: {
                                            "fill-rule": "evenodd",
                                            d:
                                              "M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                                          }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("strong", [
                                      _vm._v(_vm._s(show.stream_at) + " ")
                                    ]),
                                    _vm._v(" |\n                  "),
                                    _c("i", [
                                      _vm._v(
                                        " " + _vm._s(show.duration_human) + " "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _vm._l(show.people, function(
                                      person,
                                      pindex
                                    ) {
                                      return _c("span", { key: pindex }, [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-xs btn-outline-primary",
                                            class: {
                                              disabled: _vm.isFuture(
                                                show.starts_hours
                                              )
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.setDj(person.name)
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "svg",
                                              {
                                                staticClass:
                                                  "bi bi-file-person",
                                                attrs: {
                                                  width: "1em",
                                                  height: "1em",
                                                  viewBox: "0 0 16 16",
                                                  fill: "currentColor",
                                                  xmlns:
                                                    "http://www.w3.org/2000/svg"
                                                }
                                              },
                                              [
                                                _c("path", {
                                                  attrs: {
                                                    "fill-rule": "evenodd",
                                                    d:
                                                      "M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("path", {
                                                  attrs: {
                                                    d:
                                                      "M13.784 14c-.497-1.27-1.988-3-5.784-3s-5.287 1.73-5.784 3h11.568z"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("path", {
                                                  attrs: {
                                                    "fill-rule": "evenodd",
                                                    d:
                                                      "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                                  }
                                                })
                                              ]
                                            ),
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(person.name) +
                                                "\n                    "
                                            )
                                          ]
                                        )
                                      ])
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "text-muted float-right" },
                                      [
                                        _vm._v(
                                          "\n                    " +
                                            _vm._s(show.desc) +
                                            "\n                  "
                                        )
                                      ]
                                    )
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                show.tracks.length && _vm.isShowPlaying(show)
                                  ? _c(
                                      "div",
                                      { staticClass: "p-1" },
                                      [
                                        _c("strong", [_vm._v("Tracks")]),
                                        _vm._v(" "),
                                        _vm._l(show.tracks, function(
                                          track,
                                          tindex
                                        ) {
                                          return _c(
                                            "div",
                                            {
                                              key: tindex + "-" + time,
                                              staticClass: "border-bottom",
                                              class: {
                                                "alert-success":
                                                  _vm.currentTrack !==
                                                    undefined &&
                                                  track.id ===
                                                    _vm.currentTrack.id
                                              }
                                            },
                                            [
                                              _c("Track", {
                                                attrs: {
                                                  track: track,
                                                  play: true
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        })
                                      ],
                                      2
                                    )
                                  : _vm._e()
                              ]
                            )
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Layout.vue?vue&type=template&id=e245f756&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Layout.vue?vue&type=template&id=e245f756& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "main",
      { staticClass: "flex-shrink-0", attrs: { role: "main" } },
      [
        _c("Loader", { ref: "loader" }),
        _vm._v(" "),
        _c("div", { staticClass: "container-fluid" }, [
          _c("div", { staticClass: "row pb-2" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "col-10 text-center" }, [
              _c("h1", { staticClass: "h2 m-0" }, [
                _vm._v("\n            Radio 1 Time Machine\n          ")
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "text-muted small" }, [
                _c(
                  "svg",
                  {
                    staticClass: "bi bi-broadcast-pin",
                    attrs: {
                      width: "1em",
                      height: "1em",
                      viewBox: "0 0 16 16",
                      fill: "currentColor",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        "fill-rule": "evenodd",
                        d:
                          "M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 0 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707z"
                      }
                    }),
                    _vm._v(" "),
                    _c("path", {
                      attrs: { d: "M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" }
                    }),
                    _vm._v(" "),
                    _c("path", {
                      attrs: {
                        "fill-rule": "evenodd",
                        d:
                          "M8 8.5a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    attrs: {
                      title: "Radio 1 website",
                      href: "https://www.radio1.cz/",
                      target: "_blank"
                    }
                  },
                  [_vm._v("Radio 1")]
                ),
                _vm._v(".\n            "),
                _c(
                  "svg",
                  {
                    staticClass: "bi bi-file-binary-fill",
                    attrs: {
                      width: "1em",
                      height: "1em",
                      viewBox: "0 0 16 16",
                      fill: "currentColor",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        "fill-rule": "evenodd",
                        d:
                          "M12 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-4.95 9.885c0 1.415-.548 2.206-1.524 2.206C4.548 13.09 4 12.3 4 10.885c0-1.412.548-2.203 1.526-2.203.976 0 1.524.79 1.524 2.203zM5.526 9.273c-.542 0-.832.563-.832 1.612 0 .088.003.173.006.252l1.56-1.143c-.126-.474-.375-.72-.733-.72zm-.732 2.508c.126.472.372.718.732.718.54 0 .83-.563.83-1.614 0-.085-.003-.17-.006-.25l-1.556 1.146zm6.061.624V13h-3v-.595h1.181V9.5h-.05l-1.136.747v-.688l1.19-.786h.69v3.633h1.125z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    attrs: {
                      title: "Source on github",
                      href: "https://github.com/cerw/time-machine-radio",
                      target: "_blank"
                    }
                  },
                  [_vm._v("github.")]
                ),
                _vm._v(" "),
                _c(
                  "svg",
                  {
                    staticClass: "bi bi-envelope-fill",
                    attrs: {
                      width: "1em",
                      height: "1em",
                      viewBox: "0 0 16 16",
                      fill: "currentColor",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        "fill-rule": "evenodd",
                        d:
                          "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    attrs: {
                      title: "Made by cerw - please send feedback",
                      href: "https://twitter.com/cerw",
                      target: "_blank"
                    }
                  },
                  [_vm._v("@cerw")]
                ),
                _vm._v(" "),
                _c("img", {
                  staticClass: "img",
                  attrs: {
                    src: "https://audd.io/images/icon-180x180.png",
                    height: "12"
                  }
                }),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    attrs: {
                      title: "Track decoded by audd.io",
                      href: "https://audd.io/",
                      target: "_blank"
                    }
                  },
                  [_vm._v("audd.io")]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              { staticClass: "card-body p-0" },
              [
                _c("div", { staticClass: "pb-2 text-center" }, [
                  _vm._v("\n            Radio1 Time: "),
                  _c("strong", [_vm._v(_vm._s(_vm.radioNow))]),
                  _c("br"),
                  _vm._v("\n            Your Time: "),
                  _c("strong", [_vm._v(_vm._s(_vm.youDate))]),
                  _c("br"),
                  _vm._v("\n            Timemachine Time: "),
                  _c("strong", [_vm._v(_vm._s(_vm.radioCalendar))])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-muted text-center" }, [
                  _vm._v(
                    "\n            You are " +
                      _vm._s(_vm.youOffset) +
                      " hours\n            "
                  ),
                  _vm.youOffset > 0
                    ? _c("span", [
                        _vm._v(
                          "\n              in front of Radio 1\n            "
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.youOffset < 0
                    ? _c("span", [
                        _vm._v("\n              behind\n            ")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.youOffset == 0
                    ? _c("span", [
                        _vm._v("\n              In Prague :)\n            ")
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("player", { ref: "player", attrs: { config: _vm.config } }),
                _vm._v(" "),
                _c("hr", { staticClass: "m-0" }),
                _vm._v(" "),
                _c("archive", { ref: "archives", attrs: { dj: _vm.dj } })
              ],
              1
            )
          ])
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-2 text-center" }, [
      _c("a", { attrs: { href: "/" } }, [
        _c("img", {
          staticClass: "logo rounded-circle img img-fluid pt-1",
          attrs: {
            src: "/images/icons/icon-192x192.png",
            title: "Time Machine",
            width: "60"
          }
        })
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Loader.vue?vue&type=template&id=e79ec684&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Loader.vue?vue&type=template&id=e79ec684&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: !_vm.loaded,
          expression: "!loaded"
        }
      ],
      staticClass: "text-center loader"
    },
    [_vm._m(0)]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "spinner-grow text-warning text-center",
        staticStyle: { width: "5rem", height: "5rem" },
        attrs: { role: "status" }
      },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Player.vue?vue&type=template&id=11281ee8&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Player.vue?vue&type=template&id=11281ee8&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "player-fixed card p-0" }, [
    _c("div", {}, [
      _vm.timemachinePlaying()
        ? _c("div", { staticClass: "small m-0 text-center" }, [
            _vm._v("\n      Serving show from "),
            _c("strong", [_vm._v(_vm._s(_vm.config.recoded_at) + " ")]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _vm.config.playing !== undefined
              ? _c(
                  "div",
                  [
                    _c(
                      "span",
                      { staticClass: "h3 text-white btn btn-sm btn-danger" },
                      [
                        _vm._v(
                          "\n          " + _vm._s(_vm.radioThen) + "\n        "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("span", { staticClass: "p-2 h6" }, [
                      _c(
                        "svg",
                        {
                          staticClass: "bi bi-clock-history",
                          attrs: {
                            width: "1em",
                            height: "1em",
                            viewBox: "0 0 16 16",
                            fill: "currentColor",
                            xmlns: "http://www.w3.org/2000/svg"
                          }
                        },
                        [
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              d:
                                "M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
                            }
                          }),
                          _vm._v(" "),
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              d:
                                "M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
                            }
                          }),
                          _vm._v(" "),
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              d:
                                "M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                            }
                          })
                        ]
                      ),
                      _vm._v(
                        "\n\n          " +
                          _vm._s(_vm.config.playing.when) +
                          "\n        "
                      )
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.config.playing.people, function(person, index) {
                      return _c("span", { key: index, staticClass: "p-2" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-xs btn-outline-primary",
                            on: {
                              click: function($event) {
                                return _vm.setDj(person.name)
                              }
                            }
                          },
                          [
                            _c(
                              "svg",
                              {
                                staticClass: "bi bi-file-person",
                                attrs: {
                                  width: "1em",
                                  height: "1em",
                                  viewBox: "0 0 16 16",
                                  fill: "currentColor",
                                  xmlns: "http://www.w3.org/2000/svg"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    "fill-rule": "evenodd",
                                    d:
                                      "M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M13.784 14c-.497-1.27-1.988-3-5.784-3s-5.287 1.73-5.784 3h11.568z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    "fill-rule": "evenodd",
                                    d: "M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                  }
                                })
                              ]
                            ),
                            _vm._v(
                              "\n            " +
                                _vm._s(person.name) +
                                "\n          "
                            )
                          ]
                        )
                      ])
                    }),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-muted" }, [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.config.playing.desc) +
                          "\n        "
                      )
                    ])
                  ],
                  2
                )
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.livePlaying()
        ? _c("div", { staticClass: "alert alert-success" }, [
            _vm._v(
              "\n      Serving live show from - " +
                _vm._s(_vm.radioNow) +
                "\n      "
            ),
            _c("br"),
            _vm._v(" "),
            _vm.config.playing !== undefined
              ? _c(
                  "div",
                  [
                    _c(
                      "svg",
                      {
                        staticClass: "bi bi-clock-history",
                        attrs: {
                          width: "1em",
                          height: "1em",
                          viewBox: "0 0 16 16",
                          fill: "currentColor",
                          xmlns: "http://www.w3.org/2000/svg"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            "fill-rule": "evenodd",
                            d:
                              "M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
                          }
                        }),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            "fill-rule": "evenodd",
                            d:
                              "M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
                          }
                        }),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            "fill-rule": "evenodd",
                            d:
                              "M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _vm._l(_vm.config.playing.people, function(person, index) {
                      return _c("p", { key: index }, [
                        _c(
                          "a",
                          { attrs: { href: person.link, target: "_blank" } },
                          [_vm._v(_vm._s(person.name))]
                        )
                      ])
                    }),
                    _vm._v(
                      "\n\n        " +
                        _vm._s(_vm.config.playing.desc) +
                        "\n      "
                    )
                  ],
                  2
                )
              : _vm._e()
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "pl-1" },
      [
        _vm.currentTrack !== undefined
          ? _c("Track", { attrs: { track: _vm.currentTrack } })
          : _vm._e()
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "btn-group btn-block",
        attrs: { role: "group", "aria-label": "Player" }
      },
      [
        _c(
          "button",
          {
            staticClass: "btn btn-outline-danger btn-nofocus",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.prevSong()
              }
            }
          },
          [
            _c(
              "svg",
              {
                staticClass: "bi bi-skip-start",
                attrs: {
                  width: "2em",
                  height: "2em",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M4.5 3.5A.5.5 0 0 0 4 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z"
                  }
                }),
                _vm._v(" "),
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M5.696 8L11.5 4.633v6.734L5.696 8zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L4.904 7.304z"
                  }
                })
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-outline-danger btn-nofocus",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.seekBack(60)
              }
            }
          },
          [
            _vm._v("\n      60s\n      "),
            _c(
              "svg",
              {
                staticClass: "bi bi-skip-backward",
                attrs: {
                  width: "2em",
                  height: "2em",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"
                  }
                })
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-outline-danger ",
            class: { active: _vm.livePlaying() },
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.playLive()
              }
            }
          },
          [
            _vm.livePlaying()
              ? _c("span", [
                  _c(
                    "svg",
                    {
                      staticClass: "bi bi-play",
                      attrs: {
                        width: "2em",
                        height: "2em",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
                        }
                      })
                    ]
                  )
                ])
              : _c("span", [
                  _c(
                    "svg",
                    {
                      staticClass: "bi bi-stop",
                      attrs: {
                        width: "2em",
                        height: "2em",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                        }
                      })
                    ]
                  )
                ]),
            _vm._v("\n      Live\n    ")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-outline-danger btn-nofocus",
            class: { active: _vm.timemachinePlaying() },
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.playTimemachine()
              }
            }
          },
          [
            _vm.timemachinePlaying()
              ? _c("span", [
                  _c(
                    "svg",
                    {
                      staticClass: "bi bi-play",
                      attrs: {
                        width: "2em",
                        height: "2em",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
                        }
                      })
                    ]
                  )
                ])
              : _c("span", [
                  _c(
                    "svg",
                    {
                      staticClass: "bi bi-stop",
                      attrs: {
                        width: "2em",
                        height: "2em",
                        viewBox: "0 0 16 16",
                        fill: "currentColor",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                        }
                      })
                    ]
                  )
                ]),
            _vm._v("\n      Time\n    ")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-outline-danger btn-nofocus",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.seekForward(60)
              }
            }
          },
          [
            _c(
              "svg",
              {
                staticClass: "bi bi-skip-forward",
                attrs: {
                  width: "2em",
                  height: "2em",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"
                  }
                })
              ]
            ),
            _vm._v("\n      60s\n    ")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-outline-danger",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.nextSong()
              }
            }
          },
          [
            _c(
              "svg",
              {
                staticClass: "bi bi-skip-end",
                attrs: {
                  width: "2em",
                  height: "2em",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"
                  }
                }),
                _vm._v(" "),
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                  }
                })
              ]
            )
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "audio",
      {
        ref: "player",
        staticStyle: { width: "100%" },
        attrs: {
          preload: "metadata",
          controls: "",
          title: "Play",
          id: "player",
          src: _vm.url
        },
        on: {
          canplay: function($event) {
            return _vm.canplay()
          },
          ended: function($event) {
            return _vm.ended()
          }
        }
      },
      [_vm._m(0)]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("Your browser does not support the "),
      _c("code", [_vm._v("audio")]),
      _vm._v(" element.")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Track.vue?vue&type=template&id=04526720&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Track.vue?vue&type=template&id=04526720&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "media" }, [
    _c("img", {
      staticClass: "mr-3 align-self-center",
      attrs: {
        src: _vm.track.song_link + "?thumb",
        height: "50",
        loading: "lazy",
        alt: ""
      }
    }),
    _vm._v(" "),
    _vm.play
      ? _c(
          "button",
          {
            staticClass: "btn btn-sm  play-button text-white",
            on: {
              click: function($event) {
                return _vm.playArchive(_vm.track.radio_time)
              }
            }
          },
          [
            _c(
              "svg",
              {
                staticClass: "bi bi-stop",
                attrs: {
                  width: "2.4em",
                  height: "2.4em",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("path", {
                  attrs: {
                    "fill-rule": "evenodd",
                    d:
                      "M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                  }
                })
              ]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "media-body small" }, [
      _c("strong", { staticClass: "mt-0" }, [
        _c("a", { attrs: { href: _vm.track.song_link, target: "_blank" } }, [
          _vm._v(_vm._s(_vm.track.artist) + " - " + _vm._s(_vm.track.title))
        ])
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("span", { staticClass: "text-muted" }, [_vm._v("Album:")]),
      _vm._v(" " + _vm._s(_vm.track.album)),
      _c("br"),
      _vm._v(" "),
      _c("span", { staticClass: "text-muted" }, [_vm._v("Year:")]),
      _vm._v(
        "  " + _vm._s(_vm._f("formatYear")(_vm.track.release_date)) + " |\n    "
      ),
      _c("span", { staticClass: "text-muted" }, [_vm._v("Label:")]),
      _vm._v("  " + _vm._s(_vm.track.label)),
      _c("br"),
      _vm._v(" "),
      _c("span", { staticClass: "text-muted" }, [_vm._v("Length:")]),
      _vm._v("  " + _vm._s(_vm.track.duration_human) + "\n    "),
      _c("span", { staticClass: "text-muted" }, [_vm._v("Played:")]),
      _vm._v("  " + _vm._s(_vm.track.radio_time) + "\n  ")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Layout.vue */ "./resources/js/components/Layout.vue");
/* harmony import */ var vue_sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-sweetalert2 */ "./node_modules/vue-sweetalert2/dist/index.js");
/* harmony import */ var _bugsnag_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bugsnag-client */ "./resources/js/bugsnag-client.js");



 // const options = {
//   customClass: {
//     confirmButton: 'btn btn-success',
//     cancelButton: 'btn btn-danger'
//   }
//   // buttonsStyling: false
// }

vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_sweetalert2__WEBPACK_IMPORTED_MODULE_2__["default"]);

if (true) {
  console.log('BugsnagVue Vue is on '); // bugsnagClient.use(bugsnagVue, Vue)

  _bugsnag_client__WEBPACK_IMPORTED_MODULE_3__["default"].getPlugin('vue').installVueErrorHandler(vue__WEBPACK_IMPORTED_MODULE_0___default.a);
}

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

__webpack_require__(/*! ./service-worker */ "./resources/js/service-worker.js"); // eslint-disable-next-line no-new


new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  el: '#app',
  methods: {},
  render: function render(h) {
    return h(_components_Layout_vue__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo';
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

/***/ }),

/***/ "./resources/js/bugsnag-client.js":
/*!****************************************!*\
  !*** ./resources/js/bugsnag-client.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bugsnag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bugsnag/js */ "./node_modules/@bugsnag/js/browser/notifier.js");
/* harmony import */ var _bugsnag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bugsnag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bugsnag_plugin_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bugsnag/plugin-vue */ "./node_modules/@bugsnag/plugin-vue/dist/bugsnag-vue.js");
/* harmony import */ var _bugsnag_plugin_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_bugsnag_plugin_vue__WEBPACK_IMPORTED_MODULE_1__);


console.log('bugsnag on');
var bugsnagClient = _bugsnag_js__WEBPACK_IMPORTED_MODULE_0___default.a.start({
  apiKey: "2c91030384d2b21f9cfd3fce19b560dd",
  releaseStage: "local",
  plugins: [new _bugsnag_plugin_vue__WEBPACK_IMPORTED_MODULE_1___default.a()],
  // notifyReleaseStages: process.env.MIX_BUGSNAG_NOTIFY_RELEASE_STAGES.split(','),
  consoleBreadcrumbsEnabled: true,
  autoCaptureSessions: true // logger: null

});
/* harmony default export */ __webpack_exports__["default"] = (bugsnagClient);

/***/ }),

/***/ "./resources/js/components/Archive.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Archive.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Archive_vue_vue_type_template_id_164bd927___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Archive.vue?vue&type=template&id=164bd927& */ "./resources/js/components/Archive.vue?vue&type=template&id=164bd927&");
/* harmony import */ var _Archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Archive.vue?vue&type=script&lang=js& */ "./resources/js/components/Archive.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Archive_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Archive.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Archive.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Archive_vue_vue_type_template_id_164bd927___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Archive_vue_vue_type_template_id_164bd927___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Archive.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Archive.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Archive.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Archive.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Archive.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Archive.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Archive.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Archive.vue?vue&type=style&index=0&lang=css& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Archive.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Archive.vue?vue&type=template&id=164bd927&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Archive.vue?vue&type=template&id=164bd927& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_template_id_164bd927___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Archive.vue?vue&type=template&id=164bd927& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Archive.vue?vue&type=template&id=164bd927&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_template_id_164bd927___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Archive_vue_vue_type_template_id_164bd927___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Layout.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Layout.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layout_vue_vue_type_template_id_e245f756___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layout.vue?vue&type=template&id=e245f756& */ "./resources/js/components/Layout.vue?vue&type=template&id=e245f756&");
/* harmony import */ var _Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layout.vue?vue&type=script&lang=js& */ "./resources/js/components/Layout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layout.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Layout.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Layout_vue_vue_type_template_id_e245f756___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Layout_vue_vue_type_template_id_e245f756___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Layout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Layout.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Layout.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Layout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Layout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Layout.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Layout.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Layout.vue?vue&type=style&index=0&lang=css& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Layout.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Layout.vue?vue&type=template&id=e245f756&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Layout.vue?vue&type=template&id=e245f756& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_e245f756___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Layout.vue?vue&type=template&id=e245f756& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Layout.vue?vue&type=template&id=e245f756&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_e245f756___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_e245f756___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Loader.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Loader.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loader_vue_vue_type_template_id_e79ec684_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loader.vue?vue&type=template&id=e79ec684&scoped=true& */ "./resources/js/components/Loader.vue?vue&type=template&id=e79ec684&scoped=true&");
/* harmony import */ var _Loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader.vue?vue&type=script&lang=js& */ "./resources/js/components/Loader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Loader_vue_vue_type_style_index_0_id_e79ec684_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true& */ "./resources/js/components/Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Loader_vue_vue_type_template_id_e79ec684_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Loader_vue_vue_type_template_id_e79ec684_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e79ec684",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Loader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Loader.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Loader.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Loader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Loader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_e79ec684_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Loader.vue?vue&type=style&index=0&id=e79ec684&lang=css&scoped=true&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_e79ec684_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_e79ec684_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_e79ec684_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_style_index_0_id_e79ec684_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Loader.vue?vue&type=template&id=e79ec684&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Loader.vue?vue&type=template&id=e79ec684&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_template_id_e79ec684_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Loader.vue?vue&type=template&id=e79ec684&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Loader.vue?vue&type=template&id=e79ec684&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_template_id_e79ec684_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Loader_vue_vue_type_template_id_e79ec684_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Player.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Player.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Player_vue_vue_type_template_id_11281ee8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.vue?vue&type=template&id=11281ee8&scoped=true& */ "./resources/js/components/Player.vue?vue&type=template&id=11281ee8&scoped=true&");
/* harmony import */ var _Player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.vue?vue&type=script&lang=js& */ "./resources/js/components/Player.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Player_vue_vue_type_style_index_0_id_11281ee8_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true& */ "./resources/js/components/Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Player_vue_vue_type_template_id_11281ee8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Player_vue_vue_type_template_id_11281ee8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "11281ee8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Player.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Player.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Player.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Player.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Player.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_style_index_0_id_11281ee8_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Player.vue?vue&type=style&index=0&id=11281ee8&lang=css&scoped=true&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_style_index_0_id_11281ee8_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_style_index_0_id_11281ee8_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_style_index_0_id_11281ee8_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_style_index_0_id_11281ee8_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Player.vue?vue&type=template&id=11281ee8&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Player.vue?vue&type=template&id=11281ee8&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_template_id_11281ee8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Player.vue?vue&type=template&id=11281ee8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Player.vue?vue&type=template&id=11281ee8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_template_id_11281ee8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Player_vue_vue_type_template_id_11281ee8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Track.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/Track.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Track_vue_vue_type_template_id_04526720_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Track.vue?vue&type=template&id=04526720&scoped=true& */ "./resources/js/components/Track.vue?vue&type=template&id=04526720&scoped=true&");
/* harmony import */ var _Track_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Track.vue?vue&type=script&lang=js& */ "./resources/js/components/Track.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Track_vue_vue_type_style_index_0_id_04526720_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true& */ "./resources/js/components/Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Track_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Track_vue_vue_type_template_id_04526720_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Track_vue_vue_type_template_id_04526720_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "04526720",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Track.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Track.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/components/Track.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Track.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Track.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_style_index_0_id_04526720_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Track.vue?vue&type=style&index=0&id=04526720&lang=css&scoped=true&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_style_index_0_id_04526720_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_style_index_0_id_04526720_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_style_index_0_id_04526720_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_style_index_0_id_04526720_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Track.vue?vue&type=template&id=04526720&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Track.vue?vue&type=template&id=04526720&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_template_id_04526720_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Track.vue?vue&type=template&id=04526720&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Track.vue?vue&type=template&id=04526720&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_template_id_04526720_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Track_vue_vue_type_template_id_04526720_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/service-worker.js":
/*!****************************************!*\
  !*** ./resources/js/service-worker.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var workbox_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-window */ "./node_modules/workbox-window/build/workbox-window.prod.es5.mjs");
/* harmony import */ var workbox_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core */ "./node_modules/workbox-core/index.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



 // import axios from 'axios'
// disable for dev like this.
// var deferredPrompt
// window.addEventListener('beforeinstallprompt', function (e) {
//   // Evitar que o Chrome 67 e anteriores mostrem automaticamente o prompt
//   e.preventDefault()
//   // Esconda o evento para que ele possa ser acionado mais tarde.
//   deferredPrompt = e
//   addToHomeScreen()
// })
// window.addEventListener('appinstalled', (event) => {
//   console.log('👍', 'appinstalled', event)
// })
// function addToHomeScreen () {
//   if (deferredPrompt) {
//     console.log('entrou em deferredPrompt')
//     // Show the prompt
//     deferredPrompt.prompt()
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice
//       .then(function (choiceResult) {
//         console.log('choiceResult', choiceResult)
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User acept the A2HS vibmo')
//         } else {
//           console.log('User dismissed the A2HS vimbo')
//         }
//         deferredPrompt = null
//       })
//   }
// }
// window.addToHomeScreen = addToHomeScreen

if ('serviceWorker' in navigator) {
  console.log('Serice worker will be registered'); // window.addEventListener("load", () => {

  console.log('Window - load');
  var wb = new workbox_window__WEBPACK_IMPORTED_MODULE_1__["Workbox"]('/sw.js'); // let registration =
  // clientsClaim()
  // const showSkipWaitingPrompt = function (event) {
  // `event.wasWaitingBeforeRegister` will be false if this is
  // the first time the updated service worker is waiting.
  // When `event.wasWaitingBeforeRegister` is true, a previously
  // updated service worker is still waiting.
  // You may want to customize the UI prompt accordingly.
  // Assumes your app has some sort of prompt UI element
  // that a user can either accept or reject.
  // console.log(event)
  // window.swal('Heading', 'this is a Heading', 'OK');
  // // on ok

  wb.addEventListener('controlling', function (event) {
    console.log('SW - controlling', event); // window.location.reload();
  }); // messageSW(event.originalEvent.sw, {type: 'SKIP_WAITING'});
  // }
  // Add an event listener to detect when the registered
  // service worker has installed but is waiting to activate.
  // wb.addEventListener('waiting', showSkipWaitingPrompt)
  // wb.addEventListener('externalwaiting', showSkipWaitingPrompt)

  wb.addEventListener('activated', function (event) {
    console.log('SW - activated', event); // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.

    if (!event.isUpdate) {
      console.log('Service worker activated for the first time!'); // If your service worker is configured to precache assets, those
      // assets should  all be avssssailable now.
    } else {
      console.log('Service worker activated somewhere else (tab) !');
    }
  });
  wb.addEventListener('waiting', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(event) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('A new service worker has installed, but it can\'t activate' + 'until all tabs running the current version have fully unloaded.', event);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  wb.addEventListener('message', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(event) {
      var updatedURL;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('SW - message', event.type);

              if (event.data && event.data.type === 'CACHE_UPDATED') {
                updatedURL = event.data.payload.updatedURL;
                console.log("A newer version of ".concat(updatedURL, " is available!"));
              }

              if (event.data && event.data.type === 'SKIP_WAITING') {
                console.log('Skip waintng message');
                Object(workbox_core__WEBPACK_IMPORTED_MODULE_2__["skipWaiting"])();
              }

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  wb.addEventListener('installed', function (event) {
    console.log('SW - installed', event);

    if (event.isUpdate) {
      console.log('Newer Version of the app is available!. Click OK to refresh '); // get info about current version
      // offer reload or cancel

      vue__WEBPACK_IMPORTED_MODULE_3___default.a.swal.fire({
        title: 'Newer version of the app is available!.',
        // text: 'Make sure you have uploaded all offline audits.',
        // footer: 'Version (<b>' + release.version + '</b>) is available',
        icon: 'info',
        // imageUrl: '/images/sls_logo.png',
        showCancelButton: true,
        confirmButtonText: 'Reload new version',
        cancelButtonText: 'Not right now',
        showLoaderOnConfirm: true // preConfirm: () => {
        // }

      }).then(function (result) {
        if (result.value) {
          console.log('Reloading..');
          window.location.reload();
        }
      }); // we want this only on non testing and non local
      //  (window.APP_ENV != 'local' || window.APP_ENV != 'testing')
      // if (confirm(`Newer Version of the app is available!. Click OK to refresh`)) {
      //   window.location.reload();
      // }
    }
  });
  wb.register().then(function () {
    // registration =   event
    console.log('Service Worker registration done:');
  });
} else {
  console.log('Serice worker will NOT be registered');
}

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/cerw/Work/cerw/time-machine-radio/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/cerw/Work/cerw/time-machine-radio/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);