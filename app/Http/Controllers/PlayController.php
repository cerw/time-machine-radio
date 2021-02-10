<?php

namespace App\Http\Controllers;

use App\Show;
use App\Spin;
use App\Track;
use App\Stream;
use Carbon\Carbon;
use Illuminate\Http\Request;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
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
    public function get($country, $city, $timestamp = false, Request $request)
    {


       

        
        $them = Carbon::now($country.'/'.$city);

        if ($timestamp) {
            $wanted = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp);
        } else {
            $wanted = Carbon::createFromFormat('Y-m-d H:i:s', $them->format('Y-m-d H:i:s'));
        }
        
        if ($wanted->isFuture()) {
            $wanted->subDay();
        }
        
        $stream = Stream::where('starts_at', '<=', $wanted->toDateTimeString())
        ->where('ends_at', '>=', $wanted->toDateTimeString())
        ->firstOrFail();

        $out = $stream->toArray();


        $next = Stream::where('starts_at', '<=', $wanted->clone()->addHour()->toDateTimeString())
        ->where('ends_at', '>=', $wanted->clone()->addHour()->toDateTimeString())
        ->first();
        
        $out['next_url'] = $next->url;


        $prev = Stream::where('starts_at', '<=', $wanted->clone()->subHour()->toDateTimeString())
        ->where('ends_at', '>=', $wanted->clone()->subHour()->toDateTimeString())
        ->first();
        
        $out['prev_url'] = $prev->url;

        $show = Show::where('starts_at', '<=', $wanted->toDateTimeString())
        ->where('ends_at', '>=', $wanted->toDateTimeString())
        ->first();
        

        $out['show'] = $show->makeHidden('spins');
        
        // trakc
        //  dd($wanted->subHours(2)->toDateTimeString(),$wanted->addHours(2)->toDateTimeString());
        $spins = Spin::with(['track','show','stream'])
        ->where('stream_at', '>=', $wanted->clone()->subHours(2)->toDateTimeString())
        ->where('stream_at', '<=', $wanted->clone()->addHours(4)->toDateTimeString())
        ->orderBy('stream_at', 'asc')
        ->get();
        
        
        $tracks =  new TrackCollection($spins);

        $out['spins'] = $tracks->toArray($request);

        // return $this->stream->url."#t=".$this->timecode;
        $out['play_it'] = $stream->url."#t=".$stream->starts_at->diffInSeconds($wanted);
        $out['recoded_timestamp'] = $stream->starts_at->toDateTimeString();

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

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function streams(Request $request)
    {
        return response()->json(Stream::orderBy('id', 'desc')->take(100)->get());
    }
}
