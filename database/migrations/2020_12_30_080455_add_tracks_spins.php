<?php

use App\Show;
use App\Spin;
use App\Track;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTracksSpins extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracks_spins', function (Blueprint $table) {
            $table->id();
            $table->integer('track_id');
            $table->integer('show_id')->nullable();
            $table->integer('stream_id')->nullable();
            $table->string('timecode');
            $table->timestamp('stream_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracks_spins');
    }
}
