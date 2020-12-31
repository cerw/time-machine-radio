<?php

namespace App;

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

    protected $appends = [
        'url'
    ];

    public function getURLAttribute()
    {
        return Storage::url($this->name);
    }
}
