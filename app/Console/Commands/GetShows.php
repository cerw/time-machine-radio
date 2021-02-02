<?php

namespace App\Console\Commands;

use App\Show;
use App\Stream;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class GetShows extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:shows 
                            {date?} 
                            ';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync Shows';

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
        

        $date = $this->argument('date');

        if (is_null($date)) {
            $wanted = now();
        } else {
            $wanted = Carbon::parse($date);
        }
        
        $date = $wanted->format('Y-m-d');
            // dd(1);
        $this->info("Getting shows for {$date}");
        $response = Http::get('https://www.radio1.cz/program/?typ=dny&p='.$date);
        $content = $response->body();
        
        
        $this->info("Parsing html");
        $html = new HtmlDocument($content);
        $table = $html->find('table.dailyProgramme', 0);
        
        $shows = [];
        // $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', '2020-08-04_');
        // $fileStartedAt->setTimezone('Europe/Prague');
        $times = [];
        $out = [];
        
        foreach ($table->find('tr') as $row) {
            // initialize array to store the cell data from each row
            $cols = [];
            
            foreach ($row->find('td') as $key => $cell) {
                $cols[$key] = $cell;
            }
            $show = [];
            
            if (count($cols) === 4) {
                foreach ($cols as $key => $cell) {
                    // 0 time
                    // 1 title
                    // 2 desc
                    // 3 action
                
                    if ($key == 0) {
                        $time = $cell->plaintext;
                        $times[] = $time;
                    }
                    
                    if ($key == 1) {
                        $people=[];
                        foreach ($cell->find('a') as $link) {
                            $person= [];
                            $person['name'] = $link->plaintext;
                            $person['link'] = $link->href;
                            
                            if ($person['name'] == "KULTURNÍ SERVIS") {
                                $show['ks'] = true;
                            }
                            $people[] = $person;
                        }
                        $show['people'] = $people;
                    }
                    if ($key == 2) {
                        $show['desc'] = $cell->plaintext;
                    }

                    if ($key == 3) {
                        $shows[] = $show;
                    }
                }
            }
        }

        $this->info("Parsing data");
        foreach ($times as $index => $time) {
            // dd($time);
            $split = explode(":", $time);
            $showStartsAt = $wanted->clone();
            
            $showStartsAt->setTime($split[0], $split[1]);

            if (isset($times[$index+1])) {
                $endSplit = explode(":", $times[$index+1]);
            } else {
                $endSplit = explode(":", "23:59");
            }
            $showEndsAt = $showStartsAt->clone()->setTime($endSplit[0], $endSplit[1]);
            
            //dump($showStartsAt,$showEndsAt,$wanted);
            
            $shows[$index]['ends'] = $showEndsAt->toDateTimeString();
            $shows[$index]['starts'] = $showStartsAt->toDateTimeString();
            $shows[$index]['when'] = $showStartsAt->format('H:i').' - '. $showEndsAt->format('H:i');
            $shows[$index]['duration'] = $showStartsAt->diffInSeconds($showEndsAt);
            $length = \Carbon\CarbonInterval::seconds($shows[$index]['duration'])->cascade()->forHumans();
            $shows[$index]['duration_human'] = (string) $length;
            
            // 1 day - 86400 s
            $shows[$index]['percentage_in_day'] = $shows[$index]['duration']/864;
            if ($wanted->between($showStartsAt, $showEndsAt)) {
                $out['playing'] = [];
                $out['playing']['date'] = $showStartsAt->toDateTimeString();
                $out['playing']['info'] = $shows[$index];
                $out['playing']['starts'] = $showStartsAt->format('H:i');
                ;
                $out['playing']['ends'] = $showEndsAt->format('H:i');
                $shows[$index]['now'] = true;
            }
        }

        

        /*

          $table->date('date');
            $table->text('desc');
            $table->string('title');
            $table->json('people')->nullable();
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->integer('duration');
            $table->timestamps();
        */
        $this->info("Saving Model");
        //$track_stream_at = $track->stream_at->subHours(config('app.offset_hours'));
        foreach ($shows as $show) {
            $stream = Stream::where('starts_at', '<=', $show['starts'])
                    ->where('ends_at', '>=', $show['starts'])
                    ->first();

            
            $dbShow = Show::firstOrCreate([
                'date' => $wanted->format('Y-m-d'),
                'starts_at' => $show['starts'],
                'ends_at' => $show['ends'],
                'stream_id' => (is_null($stream)) ? null: $stream->id,
            ]);
            $dbShow->people  = $show['people'];
            $dbShow->title = $show['people'][0]['name'];
            $dbShow->duration = $show['duration'];
            $dbShow->desc = $show['desc'];
            $dbShow->ks = $show['ks'] ?? 0;
            $dbShow->save();
        }
    }
}
