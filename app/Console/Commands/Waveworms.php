<?php

namespace App\Console\Commands;

use maximal\audio\Waveform;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class Waveworms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'radio1:waveform';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generetae WaveFormss for pdf';

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
        $files = Storage::files('radio1');
        
        $expiresAt = Carbon::now()->subDays(2);
        
        foreach($files as $file) {
            if(preg_match("#^radio1/radio1-(.*).(mp3|m4a)$#",$file,$match)) {
                $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', $match[1]);
                $perthTime =  $fileStartedAt->toDateTimeString();
                if($perthTime < $expiresAt) {
                    \Log::info("Removing old files {$file}");
                    Storage::delete($file);
                    continue;
                }
                $this->comment("Wave form for ".$file);

                if(!Storage::has('radio1/'.$match[1].".json")) {
                    // waveform
                    $waveform = new Waveform(Storage::path($file));
                    $width = 500;
                    Storage::put('radio1/'.$match[1].".json", json_encode($waveform->getWaveformData($width, true)));
                }

            }
            
        }
        
    }
}
