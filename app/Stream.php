<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $table = 'streams';
    public $timestamps = false;
    protected $guarded = [];

    protected $dates = [
        // 'stream_at'
    ];
}
