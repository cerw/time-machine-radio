<?php

namespace App\Http\Controllers;

use App\Show;
use App\Track;
use Carbon\Carbon;
use Illuminate\Http\Request;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PlayController extends Controller
{
    /**
     * Undocumented function
     *
     * #EXTM3U
#EXT-X-TARGETDURATION:10
#EXTINF:10,
http://localhost/media/stream/stream-1.ts
#EXTINF:10,
http://localhost/media/stream/stream-2.ts
#EXTINF:10,
http://localhost/media/stream/stream-3.ts
#EXT-X-ENDLIST
     * 
     * @param [type] $time
     * @param Request $request
     * @return void
     */
    public function play ($time, $date = false, Request $request) {
        
        $files = Storage::files('radio1');
        $urls = [];
        if(!$date) {
            $today = now();
        } else {
            $today = Carbon::createFromFormat('Y-m-d',$date);
        }

        
        //dd($today->format('H:m'));
        // find nearest $time record
        // 
        $wanted = Carbon::createFromFormat('Y-m-d H:i:s', $today->format('Y-m-d').' '.$time, 'Europe/Prague');
        
        if($wanted->isFuture()) {
            $wanted->subDay();
        }
        $closest = 6000000;
        $out = [];
        // todo - get whats playing https://www.radio1.cz/program/?typ=dny&amp%3Bp=2012-03-26
        // dump($wanted);
        $expiresAt = Carbon::now()->subDays(4);
        
        foreach($files as $file) {
            if(preg_match("#^radio1/radio1-(.*).(mp3|m4a)$#",$file,$match)) {
                $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', $match[1]);
                $perthTime =  $fileStartedAt->toDateTimeString();
                if($perthTime < $expiresAt) {
                    \Log::info("Removing old files {$file}");
                    Storage::delete($file);
                    continue;
                }
                $fileStartedAt->setTimezone('Europe/Prague');
                // $diff = $date->diffInDays($wanted);
                $diff = $wanted->diffInSeconds($fileStartedAt);
                // dump($diff,$file);
                if($fileStartedAt->lessThanOrEqualTo($wanted) && $diff < $closest){
                    // edited at is newer than created at
                //    dump($fileStartedAt, $diff, $fileStartedAt->format('H:i:s'));
                    $closest = $diff;
                    $out['url'] = Storage::url($file);
                    $out['offset'] = $diff;
                    // $out['play_at'] = '00:'.round($diff/60).':'.($diff-round($diff/60)*60);
                    $out['start_at'] = $fileStartedAt->format('H:i:s');
                    $out['perth_started_at'] = $perthTime;
                    $out['prague_started_at'] = $fileStartedAt->toDateTimeString();;
                    $out['recoded_at'] = $fileStartedAt->diffForHumans();
                    $out['recoded_timestamp'] = $fileStartedAt->toDateTimeString();
                    $out['ends_at'] = $fileStartedAt->addHour()->format('H:i:s');
                    $out['next'] =  $fileStartedAt->format('H:i:s/Y-m-d');
                }
                
            }
            
            $urls[] = Storage::url($file);
        }
        
        
        $info = $this->info($wanted, true);

        $out['playing'] = $info['playing'];
        
        $out['shows'] = $info['shows'];
        $out['wanted'] =  $time;
        $next = $wanted->clone()->addHour();
        
        //$out['files'] = $files;
        // $out['urls'] = $urls;
        

        return response()->json($out);
    }

    public function live (Request $request) {
        

        $wanted = Carbon::now()->tz('Europe/Prague');
        $playing = $this->info($wanted);
      
        $out['playing'] = $playing;
        //$out['shows'] = $shows;
        //$out['wanted'] =  $time;
        return response()->json($out);

    }

    public function tracks (Request $request) {
        

        $tracks = Track::all();
        return response()->json($tracks);

    }


    public function archive ($date, $time = false, Request $request) {
        

        $today = now();
        // if only date then match timemachien time
        if(!$time) {
            
            $wanted = Carbon::createFromFormat('Y-m-d H:i:s',$date. ' '. $today->format('H:i:s'), 'Europe/Prague');
        } else {
            $wanted = Carbon::createFromFormat('Y-m-d H:i:s',$date. ' '. $time, 'Europe/Prague');
        }
        // if date/time then match that  in radioe1 time
        
        if($time) {
            $this->info($wanted, true);
        }
        $info = $this->info($wanted, true);
        
        return response()->json($info);

    }



    
    /**
     * Get whos playing when
     *
     * @param [type] $date
     * @param [type] $wanted
     * @return void
     */
    protected function info( $wanted , $extended = false)  {
        

        
        $shows = Show::show($wanted);
        $playing = Show::playing($wanted);
        
        
        if($extended) {
            $ext = [];
            $ext['shows'] = $shows;
            $ext['playing'] = $playing;
            return $ext;
        }

        return $playing;
    }


}
