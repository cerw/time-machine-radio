<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTracksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('artist');
            $table->string('title');
            $table->string('album');
            $table->date('release_date');
            $table->string('label');
            $table->string('song_link');
            $table->integer('score');
            $table->string('timecode');
            $table->json('metadata')->nullable();
            $table->timestamp('stream_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tracks');
    }
}
