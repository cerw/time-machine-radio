<?php

namespace App;

use App\Track;
use Illuminate\Database\Eloquent\Model;

class Spin extends Model
{
    protected $table = 'tracks_spins';
    public $timestamps = false;
    protected $guarded = [];

    protected $dates = [
        'stream_at'
    ];

    protected $appends = [
        'play_it'
    ];


    public function getPlayITAttribute()
    {
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
