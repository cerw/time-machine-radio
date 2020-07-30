<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
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
    public function play ($time, Request $request) {
        
        $files = Storage::files('radio1');
        $urls = [];
        $today = now();
        
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
        $expiresAt = Carbon::now()->subDays(3);
        
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
                    $out['recoded_at'] = $fileStartedAt->diffForHumans();
                    $out['recoded_timestamp'] = $fileStartedAt->toDateTimeString();
                    $out['ends_at'] = $fileStartedAt->addHour()->format('H:i:s');
                }
                
            }
            
            $urls[] = Storage::url($file);
        }
        
        
        // $out['m3u'] = Storage::url('radio1/radio1.m3u');
        $out['wanted'] =  $time;
        //$out['files'] = $files;
        // $out['urls'] = $urls;
        


        return response()->json($out);
    }
}
