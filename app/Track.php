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
        'duration_human',
    ];

    protected $dates = [
        'stream_at'
    ];


    public function getRadioTimeAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at)
                ->subHour()
                ->toTimeString();
        
    }

    public function getDurationHumanAttribute()
    {
        
        
        if (isset($this->metadata['result']['play_length'])) {

        }
        return \Carbon\CarbonInterval::seconds($this->metadata['result']['play_length'])->cascade()->forHumans();
        
    }
}
