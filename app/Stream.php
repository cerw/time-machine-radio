<?php

namespace App;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Stream extends Model
{
    protected $table = 'streams';
    public $timestamps = false;
    protected $guarded = [];

    protected $dates = [
        'recorded_at',
        'starts_at',
        'ends_at'
    ];

    protected $casts = [
        'analytics' => 'json'
    ];

    protected $appends = [
        'url',
        'recoded_timestamp'
    ];


    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
    public function getURLAttribute()
    {
        return Storage::url($this->name);
    }

    public function getRecodedTimestampAttribute()
    {
        return $this->starts_at->toDateTimeString();
    }
}
