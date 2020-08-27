<?php

use App\Track;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLenght extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tracks', function (Blueprint $table) {
            $table->integer('play_length')->nullable();
        });

        // foreach(Track::all() as $track) {
        //     if (isset($track->metadata['result']['play_length'])) {
        //         $track->update(['play_length' => $track->metadata['result']['play_length']]);
        //     }
        // }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tracks', function (Blueprint $table) {
            $table->dropColumn('play_length');
        });
    }
}
