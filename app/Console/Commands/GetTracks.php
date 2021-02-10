<?php

namespace App\Console\Commands;

use App\Show;
use App\Spin;
use App\Track;
use App\Stream;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
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

        DB::table('tracks_spins')->truncate();
        $expiresAt = Carbon::now()->subDays(5);
        $tracks = Track::where('stream_at', '>=', $expiresAt)->get();
        // $tracks = Track::where('id', 10987)->get();
        $this->info("Getting tracks ".$tracks->count());
        foreach ($tracks as $track) {
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

            if (is_null($show)) {
                $showsCount = Show::where('date', $track->stream_at->format('Y-m-d'))->count();
                if (!$showsCount) {
                    $this->info("No show - lets get shows from radio1.cz -> ".$track->stream_at->format('Y-m-d'));
                    Artisan::call('get:shows', [
                        'date' => $track->stream_at->format('Y-m-d')
                    ]);
                    $show = Show::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    if (is_null($show)) {
                        $this->error('Stil no show, skiping..');
                    }
                } else {
                    $this->error('We have showsin DB but track not matching -> '.$track->stream_at->format('Y-m-d'));
                }
            }

            $stream = Stream::where('starts_at', '<=', $track_stream_at)
                    ->where('ends_at', '>=', $track_stream_at)
                    ->first();
                    // dump($track_stream_at->toDateTimeString(),$stream);

            if (is_null($stream)) {
                $this->error("No Stream - ".$track->stream_at->format('Y-m-d'));
            } else {
            }


            Spin::firstOrCreate([
                'track_id' => $track->id,
                'show_id' => (is_null($show)) ? null: $show->id,
                'stream_id' => (is_null($stream)) ? null: $stream->id,
                'timecode' => (is_null($stream)) ? 0: $stream->starts_at->diffInSeconds($track_stream_at),
                'stream_at' => $track_stream_at
            ]);
        }
    }
}
