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
use App\Http\Resources\TrackCollection;
use Illuminate\Support\Facades\Storage;

class PlayController extends Controller
{
   
    /**
     * Get user time in radio one based on timezone
     *
     * @param [type] $country
     * @param [type] $city
     * @param Request $request
     * @return void
     */
    public function get($country, $city, Request $request)
    {

        
        $them = Carbon::now($country.'/'.$city);

        $wanted = Carbon::createFromFormat('Y-m-d H:i:s', $them->format('Y-m-d H:i:s'));

        if ($wanted->isFuture()) {
            $wanted->subDay();
        }
        
        $stream = Stream::where('starts_at', '<=', $wanted->toDateTimeString())
        ->where('ends_at', '>=', $wanted->toDateTimeString())
        ->firstOrFail();

        $out = $stream->toArray();


        $next = $stream = Stream::where('starts_at', '<=', $wanted->clone()->addHour()->toDateTimeString())
        ->where('ends_at', '>=', $wanted->clone()->addHour()->toDateTimeString())
        ->first();
        
        $out['next_url'] = $next->url;

        $show = Show::where('starts_at', '<=', $wanted->toDateTimeString())
        ->where('ends_at', '>=', $wanted->toDateTimeString())
        ->first();
        

        $out['show'] = $show->makeHidden('spins');
        
        // trakc
        //  dd($wanted->subHours(2)->toDateTimeString(),$wanted->addHours(2)->toDateTimeString());
        $spins = Spin::with(['track','show','stream'])
        ->where('stream_at', '>=', $wanted->clone()->subHours(2)->toDateTimeString())
        ->where('stream_at', '<=', $wanted->clone()->addHours(2)->toDateTimeString())
        ->orderBy('stream_at', 'asc')
        ->get();
        
        
        $tracks =  new TrackCollection($spins);

        $out['spins'] = $tracks->toArray($request);

        // return $this->stream->url."#t=".$this->timecode;
        $out['play_it'] = $stream->url."#t=".$stream->starts_at->diffInSeconds($wanted);
        $out['recoded_timestamp'] = $stream->starts_at->toDateTimeString();

        return response()->json($out);
    }

    

    /**
     *
     * @param [type] $time
     * @param Request $request
     * @return void
     */
    public function play($time, $date = false, Request $request)
    {
        
        $files = Storage::files('radio1');
        $urls = [];
        if (!$date) {
            $today = now();
        } else {
            $today = Carbon::createFromFormat('Y-m-d', $date);
        }
        
        //dd($today->format('H:m'));
        // find nearest $time record
        //
        $wanted = Carbon::createFromFormat('Y-m-d H:i:s', $today->format('Y-m-d').' '.$time, 'Europe/Prague');
        
        if ($wanted->isFuture()) {
            $wanted->subDay();
        }
        $closest = 6000000;
        $out = [];
        // todo - get whats playing https://www.radio1.cz/program/?typ=dny&amp%3Bp=2012-03-26
        // dump($wanted);
        $expiresAt = Carbon::now()->subDays(14);
        

        foreach ($files as $file) {
            if (preg_match("#^radio1/radio1-(.*).(mp3|m4a)$#", $file, $match)) {
                $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', $match[1], 'Australia/Perth');
                $perthTime =  $fileStartedAt->toDateTimeString();
                if ($perthTime < $expiresAt) {
                    \Log::info("Removing old files {$file}");
                    Storage::delete($file);
                    continue;
                }
                $fileStartedAt->setTimezone('Europe/Prague');
                // $diff = $date->diffInDays($wanted);
                $diff = $wanted->diffInSeconds($fileStartedAt);
                // dump($diff,$file);
                // dump($fileStartedAt);
                if ($fileStartedAt->lessThanOrEqualTo($wanted) && $diff < $closest) {
                    // edited at is newer than created at
                //    dump($fileStartedAt, $diff, $fileStartedAt->format('H:i:s'));
                    $closest = $diff;
                    $out['url'] = Storage::url($file);
                    $out['offset'] = $diff;
                    // $out['play_at'] = '00:'.round($diff/60).':'.($diff-round($diff/60)*60);
                    $out['start_at'] = $fileStartedAt->format('H:i:s');
                    $out['perth_started_at'] = $perthTime;
                    $out['prague_started_at'] = $fileStartedAt->toDateTimeString();
                    ;
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
        
        $existingShow = Show::whereDate('date', '>', $expiresAt)
                        ->orderBy('starts_at', 'DESC')
                        ->get();
                        // ->makeHidden('tracks');
                        
        $dates = [];
        foreach ($existingShow as $show) {
            $dates[$show->date][] = $show;
        }
        $out['archive'] = $dates;
        $out['wanted'] =  $time;
        

        return response()->json($out);
    }

    

    public function spins(Request $request)
    {
        //
        $tracks = Spin::with(['track','show','stream'])->orderBy('id', 'desc')->take(10)->get();
        // dd($tracks);
        return new TrackCollection($tracks);
        // return UserResource::collection(User::all());
        // return response()->json($tracks);
    }

    // public function person($person, Request $request)
    // {
        
    //     $shows= Show::where('title', 'like', '%'.$person.'%')
    //         ->orderBy('starts_at', 'DESC')
    //         ->get();
        
    //     return response()->json($shows);
    // }


   


    
    /**
     * Get whos playing when
     *
     * @param [type] $date
     * @param [type] $wanted
     * @return void
     */
    // protected function info($wanted, $extended = false)
    // {
        

        
    //     $shows = Show::show($wanted);
    //     $playing = Show::playing($wanted);
        
        
        
    //     if ($extended) {
    //         $ext = [];
    //         $ext['shows'] = $shows;
    //         $ext['playing'] = $playing;
    //         return $ext;
    //     }

    //     return $playing;
    // }
}
