<?php

namespace App;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{

    protected $guarded = [];
    protected $casts = [
        'metadata' => 'json'
    ];

    protected $appends = [
        'radio_time',
        'radio_time_ends',
        'duration_human',
        
    ];

    protected $dates = [
        'stream_at'
    ];

    protected $hidden = ['metadata','created_at', 'updated_at'];


    public function getRadioTimeAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at)
                ->subHour()
                ->toTimeString();
        
    }


    public function getRadioTimeEndsAttribute()
    {

        if (isset($this->metadata['result']['play_length'])) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at)
            ->subHour()
            ->addSeconds($this->metadata['result']['play_length'])
            ->toTimeString();
        }
        
        
    }
    

    public function getDurationHumanAttribute()
    {
        
        if(is_null($this->play_length)) {
            if (isset($this->metadata['result']['play_length'])) {
                return \Carbon\CarbonInterval::seconds($this->metadata['result']['play_length'])->cascade()->forHumans();
            }
        }
        return \Carbon\CarbonInterval::seconds($this->play_length)->cascade()->forHumans();
        
    }
}
