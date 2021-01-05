<?php

namespace App\Console\Commands;

use App\Stream;
use maximal\audio\Waveform;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GetStreams extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:streams';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync Streams';

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
        $this->info("Getting stream");
        $files = Storage::files('radio1');
        
        
        // todo - get whats playing https://www.radio1.cz/program/?typ=dny&amp%3Bp=2012-03-26
        // dump($wanted);
        $expiresAt = Carbon::now()->subDays(60);
        

        foreach ($files as $file) {
            if (preg_match("#^radio1/radio1-(.*).(mp3|m4a)$#", $file, $match)) {
                $this->comment($file);
                $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', $match[1], 'Australia/Perth');
                $perthTime =  $fileStartedAt->toDateTimeString();
                if ($perthTime < $expiresAt) {
                    $this->info("Removing old files {$file}");
                    Storage::delete($file);
                    continue;
                }
                
                $fileStartedAt->setTimezone('Europe/Prague');
                // // $diff = $date->diffInDays($wanted);
                //     // edited at is newer than created at
                // //    dump($fileStartedAt, $diff, $fileStartedAt->format('H:i:s'));
                // $out['url'] = Storage::url($file);
                // // $out['play_at'] = '00:'.round($diff/60).':'.($diff-round($diff/60)*60);
                // $out['start_at'] = $fileStartedAt->format('H:i:s');
                // $out['perth_started_at'] = $perthTime;
                // $out['prague_started_at'] = $fileStartedAt->toDateTimeString();
                // $out['recoded_at'] = $fileStartedAt->diffForHumans();
                // $out['recoded_timestamp'] = $fileStartedAt->toDateTimeString();
                // $out['ends_at'] = $fileStartedAt->addHour()->format('H:i:s');
                // $out['next'] =  $fileStartedAt->format('H:i:s/Y-m-d');

                /*
                $table->string('name');
                $table->integer('duration')->nullable();
                $table->timestamp('starts_at')->nullable();
                $table->timestamp('ends_at')->nullable();
                */
                // dump($perthTime,$fileStartedAt,$fileStartedAt->toDateTimeString());

                $waveform = new Waveform(Storage::path($file));
                $width = 100;
                $data = $waveform->getWaveformData($width, true);
                Stream::firstOrCreate([
                    'name' => $file,
                    'waveform' => $data,
                    'duration' => 60 * 60,
                    'recorded_at' => $perthTime,
                    'size' => Storage::size($file),
                    'starts_at' => $fileStartedAt->toDateTimeString(),
                    'ends_at' => $fileStartedAt->clone()->addHour()->toDateTimeString()
                ]);
            }
        }
    }
}
