<?php

namespace App\Console\Commands;

use App\Show;
use App\Spin;
use App\Track;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GetTracks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:tracks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync Tracks';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Getting tracks");
        foreach (Track::all() as $track) {
            // find show

            // $from = Carbon::createFromFormat('Y-m-d H:i:s', $this->starts_at)->addHours(config('app.offset_hours'));
            // $to = Carbon::createFromFormat('Y-m-d H:i:s', $this->ends_at)->addHours(config('app.offset_hours'));
                //  ->setTimezone('Europe/Prague');
            $show = Show::whereDate('starts_at', '>=', $track->stream_at)
                    ->whereDate('ends_at', '<=', $track->stream_at)
                    ->first();
                    // dump($track,$show);
            
            Spin::firstOrCreate([
                'track_id' => $track->id,
                'show_id' => (is_null($show)) ? null: $show->id,
                'timecode' => $track->timecode,
                'stream_id' => null,
                'stream_at' => $track->stream_at
            ]);
        }
    }
}
