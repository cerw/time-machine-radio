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
        'radio_time'
    ];

    protected $dates = [
        'stream_at'
    ];


    public function getRadioTimeAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at, 'CEST')
                ->setTimezone('Europe/Prague');
        
    }
}
