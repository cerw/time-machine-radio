<?php

namespace App\Http\Controllers;

use App\Track;
use Carbon\Carbon;
use Illuminate\Http\Request;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
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
    public function update (Request $request) {
        
        \Log::info('stream vole');
        \Log::info($request->input());

        if($request->status == 'success' AND is_array($request->result['results'])) {

            $song = $request->result['results'][0];
            \Log::info('Tracks Success');
            
            $track = Track::firstOrNew([
                'artist' =>  $song['artist'],
                'title' => $song['title']
            ]);
        

            $track->release_date = $song['release_date'] ?? '';
            $track->label = $song['label'] ?? '';
            $track->album = $song['album'] ?? '';
            $track->song_link = $song['song_link'] ?? '';
            $track->score = $song['score'] ?? '';
            $track->metadata = $request->input();
            $track->timecode = $song['timecode'] ?? '';
            $track->stream_at = $request->result['timestamp'] ?? '';
            $track->save();
        }
        return response()->json($request->input());
        
    }

    


}
