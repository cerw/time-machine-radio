<?php

namespace App\Console\Commands;

use App\Stream;
use League\Csv\Reader;
use League\Csv\Statement;
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

                
                // dump($perthTime,$fileStartedAt,$fileStartedAt->toDateTimeString());

                
                $stream = Stream::firstOrCreate([
                    'name' => $file,
                    'duration' => 60 * 60,
                    'recorded_at' => $perthTime,
                    'starts_at' => $fileStartedAt->toDateTimeString(),
                    'ends_at' => $fileStartedAt->clone()->addHour()->toDateTimeString()
                ]);

                $stream->size = Storage::size($file);
                $stream->save();
                // peak
                $peak = Storage::path($file.".dat");
                if (!file_exists($peak) AND Storage::size($file) >= 86400000) {
                    $this->comment("Generting peak: ".$peak);
                    $cmd = "audiowaveform -i ".Storage::path($file)." -o ".$peak." -b 8 --pixels-per-second  1024";
                    system($cmd);
                } else {
                    $this->comment("Got peak");
                }
                // analytics
                
                $csv = Storage::path(preg_replace("/mp3$/", 'csv', $file));
                if (file_exists($csv)) {
                    $this->comment("Importing  ".$csv);

                    //load the CSV document from a file path
                    $csv = Reader::createFromPath($csv, 'r');
                    $csv->setDelimiter("\t");
                    $csv->setHeaderOffset(0);

                    $header = $csv->getHeader(); //returns the CSV header record
                    // $records = $csv->getRecords(); //returns all the CSV records as an Iterator object
                    $records = Statement::create()->process($csv);
                    $stream->analytics = $records;
                    $stream->save();
                }
            }
        }
    }
}
