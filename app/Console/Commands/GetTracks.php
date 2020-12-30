<?php

namespace App\Console\Commands;

use App\Show;
use App\Spin;
use App\Track;
use App\Stream;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
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

        DB::table('tracks_spins')->truncate();
        foreach (Track::all() as $track) {
            // find show

            // $from = Carbon::createFromFormat('Y-m-d H:i:s', $this->starts_at)->addHours(config('app.offset_hours'));
            // $to = Carbon::createFromFormat('Y-m-d H:i:s', $this->ends_at)->addHours(config('app.offset_hours'));
                //  ->setTimezone('Europe/Prague');
            $track_stream_at = $track->stream_at->subHours(config('app.offset_hours'));
            $show = Show::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    // dump($track,$show);
                    // dd($track,$show);

            $stream = Stream::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    // dump($track,$show);

            Spin::firstOrCreate([
                'track_id' => $track->id,
                'show_id' => (is_null($show)) ? null: $show->id,
                'stream_id' => (is_null($stream)) ? null: $stream->id,
                'timecode' => $track->timecode,
                'stream_at' => $track_stream_at
            ]);
        }
    }
}
