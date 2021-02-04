<?php

namespace App\Http\Controllers;

use App\Show;
use App\Spin;
use App\Track;
use App\Stream;
use Carbon\Carbon;
use Illuminate\Http\Request;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class StreamController extends Controller
{
   /**
    *
    {
  "status": "success",
  "result": {
    "radio_id": 7,
    "timestamp": "2020-04-13 10:31:43",
    "play_length": 111,
    "results": [
      {
        "artist": "Alan Walker, A$AP Rocky",
        "title": "Live Fast (PUBGM)",
        "album": "Live Fast (PUBGM)",
        "release_date": "2019-07-25",
        "label": "MER Recordings",
        "score": 100,
        "song_link": "https://lis.tn/LiveFastPUBGM"
      }
    ]
  }
}

    *
    * @param Request $request
    * @return void
    */
    public function update(Request $request)
    {
        
        \Log::info('stream vole');
        \Log::info($request->input());

        if ($request->status == 'success' and is_array($request->result['results'])) {
            $song = $request->result['results'][0];
            \Log::info('Tracks Success');
            
            if (isset($song['upc'])) {
                $track = Track::firstOrNew([
                    'upc' => $song['upc']
                ]);
            } elseif (isset($song['song_link'])) {
                $track = Track::firstOrNew([
                    'song_link' => $song['song_link']
                ]);
            }
            
            
            $track->upc = $song['upc'] ?? null;
            $track->isrc = $song['isrc'] ?? null;
            $track->artist = $song['artist'] ?? '';
            $track->release_date = (empty($song['release_date']) || $song['release_date'] == 'None' || $song['release_date'] == '0000-00-00') ? null : Carbon::parse($song['release_date']);
            $track->label = $song['label'] ?? '';
            $track->title = $song['title'] ?? '';
            $track->album = $song['album'] ?? '';
            $track->song_link = $song['song_link'] ?? '';
            $track->score = $song['score'] ?? '';
            $track->metadata = $request->input();
            $track->timecode = $song['timecode'] ?? '';
            $track->stream_at = $request->result['timestamp'] ?? '';
            $track->play_length = $request->result['play_length'] ?? null;
            
            $track->save();
            // track.metadata.result.play_length

            $track_stream_at = $track->stream_at->subHours(config('app.offset_hours'));
            $show = Show::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    // dump($track,$show);
                    // dd($track,$show);

            if (is_null($show)) {
                $showsCount = Show::where('date', $track->stream_at->format('Y-m-d'))->count();
                if (!$showsCount) {
                    \Log::debug("No show - lets get shows from radio1.cz -> ".$track->stream_at->format('Y-m-d'));
                    Artisan::call('get:shows', [
                        'date' => $track->stream_at->format('Y-m-d')
                    ]);
                    $show = Show::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    if (is_null($show)) {
                        \Log::debug('Stil no show, skiping..');
                    }
                } else {
                    \Log::debug('We have showsin DB but track not matching -> '.$track->stream_at->format('Y-m-d'));
                }
            }

            $stream = Stream::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    // dump($track_stream_at->toDateTimeString(),$stream);

            if (is_null($stream)) {
                \Log::debug("No Stream - ".$track->stream_at->format('Y-m-d'));
            } else {
            }


            $spin = Spin::firstOrCreate([
                'track_id' => $track->id,
                'show_id' => (is_null($show)) ? null: $show->id,
                'stream_id' => (is_null($stream)) ? null: $stream->id,
                'timecode' => (is_null($stream)) ? 0: $stream->starts_at->diffInSeconds($track_stream_at),
                'stream_at' => $track_stream_at
            ]);
        }
        return response()->json($spin);
    }
}
