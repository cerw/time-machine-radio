<?php

namespace App;

use App\Track;
use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class Spin extends Model
{
    protected $table = 'tracks_spins';
    public $timestamps = false;
    protected $guarded = [];

    protected $dates = [
        'stream_at',
        'date'
    ];

    protected $appends = [
        'play_it'
    ];


    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getPlayITAttribute()
    {
        if (is_null($this->stream)) {
            return;
        }
        return $this->stream->url."#t=".$this->timecode;
    }
    
    public function track()
    {
        return $this->belongsTo(Track::class);
    }

    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    public function stream()
    {
        return $this->belongsTo(Stream::class);
    }
}
