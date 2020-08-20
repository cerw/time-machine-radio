# Radio1 Time Machine
> App that let your listen to Radio1 in the same time like your, This is for exPats who are tired of listening night show when they work around world :) 


[![Build Status][travis-image]][travis-url]


One to two paragraph statement about your product and what it does.

<p align="center">
<img src="https://github.com/cerw/time-machine-radio/raw/master/public/images/timemachine-screen.jpg" width="400">
</p>


## Live

[radio1.rocks](http://radio1.rocks)


## Installation

OS X & Linux:

```bash
copmposer install && npm i && npm run dev
```

Windows:

```bash
rm -rf /
```

## Usage example

You must record the shows using , in your `storage/app/public/radio1`
```bash
#!/bin/bash
while true
do
ffmpeg -i http://icecast2.play.cz/radio1-192.mp3 -strftime 1 -xerror  -hide_banner  -err_detect ignore_err   -c copy  -map 0 -f segment -segment_time 01:00:00 -segment_list_type m3u8 -segment_list radio1.m3u radio1-%Y-%m-%d_%H-%M.mp3
done
```

### Convert to AudioTag 
 https://user.audiotag.info/doc/AudioTag-API.pdf


#### AUDD 
  `token - a6635a32d2752fee94f90d3fe847c4b4`
  
```bash
curl https://api.audd.io/ \
    -F url='https://www.dropbox.com/s/a9hvp4rtm03uqmy/coverted1.wav?dl=1' \
    -F return='apple_music,spotify,musicbrainz,lyrics' \
    -F api_token='test'
# for audiotag - 15 s mono wav
ffmpeg -i input_file.ext -ss 00:00:20 -to 00:00:35  -ar 8000 -ac 1 -vn coverted.wav
# auditag api

curl https://audiotag.info/api \
    -F file='@coverted.wav' \
    -F action='identify' \
    -F apikey='14bb353fedc73afe0f52d942174d7336'

# getting results - da39806f528325630d4b046570d2907a
curl https://audiotag.info/api \
    -F token='ef822dbb74c67f5ac5ff0d7b6bf49ea2' \
    -F action='get_result' \
    -F apikey='14bb353fedc73afe0f52d942174d7336'

for i 

```

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
```

## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress

## Meta

Petr Cervennka– [@cerw](https://twitter.com/cerw) – petr@cervenka.space

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)


<!-- Markdown link & img dfn's -->
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
