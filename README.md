# Radio1 Time Machine
> App that let your listen to [radio1.cz](https://radio1.cz) in the same time (zone) like yours. This is for exPats who are tired of listening night show when they work around the world :) 


<!-- [![Build Status][travis-image]][travis-url] -->
## Screenshot

<p align="center">
<img src="https://github.com/cerw/time-machine-radio/raw/master/public/images/radio1_2.jpg" width="400">
</p>


## Live

[radio1.rocks](http://radio1.rocks)


## DONE
* https://github.com/azcoppen/waveform-generation
* https://github.com/maximal/audio-waveform-php
* https://github.com/bbc/peaks.js
## TODO

* ~~https://github.com/katspaugh/wavesurfer.js~~
*  https://widget.audd.tech/?ch=-eaf5d321b&black-font

## Installation

>OS X & Linux:

```bash
copmposer install && npm i && npm run dev
```

>Windows:

```bash
rm -rf /; just dont;
```

## Audd.io API 

```bash
 curl https://api.audd.io/addStream/ \
-F api_token='SECRETHERE' \
-F url='http://icecast2.play.cz/radio1-192.mp3' \
-F callbacks='before' \
-F radio_id=1

curl https://api.audd.io/setCallbackUrl/ \
   -F api_token='SECRETHERE' \
      -F url='https://radio1.rocks/api/stream'

```

## Usage example

You must record the shows using , in your `storage/app/public/radio1`

> ffmpeg.sh
```bash
#!/bin/bash
while true
do
ffmpeg -i http://icecast2.play.cz/radio1-192.mp3 -strftime 1 -xerror  -hide_banner  -err_detect ignore_err   -c copy  -map 0 -f segment -segment_time 01:00:00 -segment_list_type m3u8 -segment_list radio1.m3u radio1-%Y-%m-%d_%H-%M.mp3
done
```

> You can use this [supervisord](http://supervisord.org/) file

```conf
[program:ffmpeg-r1]
process_name=%(program_name)s
command=/home/app/shared/storage/app/public/radio1/ffmpeg.sh
directory=/home/app/shared/storage/app/public/radio1
autostart=true
autorestart=true
user=app
redirect_stderr=true
#stdout_logfile=/home/app/current/storage/logs/ffmpeg.log
stderr_logfile=/home/app/current/storage/logs/ffmpeg.stderr.log
stderr_logfile_maxbytes=1MB
stdout_logfile_maxbytes=1MB
```

<!-- ## Release History

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
    * Work in progress -->


[@cerw](https://twitter.com/cerw)

