<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Spin extends Model
{
    protected $table = 'tracks_spins';
    public $timestamps = false;
    protected $guarded = [];

    protected $dates = [
        'stream_at'
    ];
}
