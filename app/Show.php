<?php

namespace App;

use App\Spin;
use App\Stream;
use Illuminate\Support\Carbon;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Show extends Model
{
    protected $guarded = [];
    protected $casts = [
        'people' => 'json'
    ];

    protected $dates = [
        'starts_at',
        'ends_at'
    ];

    protected $hidden = [
        'stream',
        
    ];

    protected $appends = [
        'duration_human',
        'when',
        'play_it',
        // 'tracks',
        // 'files',
        'starts_hours',
        'ends_hours',
        'stream_at'
    ];

    
    
    public function getStreamAtAttribute()
    {
        return $this->starts_at->diffForHumans();
    }
    public function getStartsHoursAttribute()
    {
        return $this->starts_at->format('H:i:s');
    }

    public function getEndsHoursAttribute()
    {
        return $this->ends_at->format('H:i:s');
    }
    public function getTracksAttribute()
    {
        // return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at, 'CEST')
        //         ->setTimezone('Europe/Prague');
        
        // $hours = (now()->isDST()) ?  1  : 2;
        
        
                //  dd($from,$to,$this->when);
        // return Track::whereDate('stream_at',$this->starts_at)->get();


        return Cache::remember('tracks-'.$this->id, 60 * 60, function () {
            $from = Carbon::createFromFormat('Y-m-d H:i:s', $this->starts_at)->addHours(config('app.offset_hours'));
            $to = Carbon::createFromFormat('Y-m-d H:i:s', $this->ends_at)->addHours(config('app.offset_hours'));
                //  ->setTimezone('Europe/Prague');
            return Track::whereBetween('stream_at', [$from, $to])->orderBy('stream_at')->get();
        });
    }
    public function getPlayITAttribute()
    {
        if (is_null($this->stream)) {
            return;
        }
        $t = $this->stream->starts_at->diffInSeconds($this->starts_at);
        return $this->stream->url."#t=".$t;
    }

    public function getDurationHumanAttribute()
    {
        
        return \Carbon\CarbonInterval::seconds($this->duration)->cascade()->forHumans();
    }


    public function getWhenAttribute()
    {
        return  $this->starts_at->format('H:i'). ' - '. $this->ends_at->format('H:i');
    }
   

    public static function playing($wanted)
    {
        

        $existingShow = Show::whereDate('date', $wanted)->get();
        foreach ($existingShow as $index => $show) {
            // dd($time);
            $showStartsAt =  Carbon::parse($show->starts_at, 'Europe/Prague')->timezone('Europe/Prague');
            $showEndsAt = Carbon::parse($show->ends_at, 'Europe/Prague')->timezone('Europe/Prague')->subSecond();
        
            // dd($c);
            // 1 day - 86400 s
            // dd($show,$showStartsAt);
            
            if ($wanted->between($showStartsAt, $showEndsAt)) {
                // $out['playing'] = [];
                // $out['playing']['date'] = $showStartsAt->toDateTimeString();
                // // $out['playing']['info'] = $shows[$index];
                // $out['playing']['starts'] = $showStartsAt->format('H:i');;
                // $out['playing']['ends'] = $showEndsAt->format('H:i');
                return $show;
            }
        }
        return [];
    }


    

    public function stream()
    {
        return $this->belongsTo(Stream::class);
    }
    
    public function spins()
    {
        return $this->hasMany(Spin::class);
    }
}
