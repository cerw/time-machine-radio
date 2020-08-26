<?php

namespace App;

use Illuminate\Support\Carbon;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Show extends Model
{
    protected $guarded = [];
    protected $casts = [
        'people' => 'json'
    ];

    protected $dates = [
        'starts_at',
        'ends_at'
    ];

    protected $appends = [
        'duration_human',
        'when',
        'tracks',
        'files',
        'starts_hours'
    ];



    

    public function getStartsHoursAttribute() 
    {
        return $this->starts_at->format('H:i:s');
    }
    public function getTracksAttribute()
    {
        // return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at, 'CEST')
        //         ->setTimezone('Europe/Prague');
        
        $from = Carbon::createFromFormat('Y-m-d H:i:s', $this->starts_at)->addHour();
                //  ->setTimezone('Europe/Prague');
        $to = Carbon::createFromFormat('Y-m-d H:i:s', $this->ends_at)->addHour();
                //  ->setTimezone('Europe/Prague');
                //  dd($from,$to,$this->when);
        // return Track::whereDate('stream_at',$this->starts_at)->get();
        return Track::whereBetween('stream_at', [$from, $to])->get();
        
    }
    public function getFilesAttribute()
    {
        
       return [];
        $files = Storage::files('radio1');
       
        // todo - get whats playing https://www.radio1.cz/program/?typ=dny&amp%3Bp=2012-03-26
        // dump($wanted);
        
        $urls = [];
        foreach($files as $file) {
            if(preg_match("#^radio1/radio1-(.*).(mp3|m4a)$#",$file,$match)) {
                $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', $match[1]);
                $perthTime =  $fileStartedAt->toDateTimeString();
                $fileStartedAt->setTimezone('Europe/Prague');
                
                if ($fileStartedAt->between($this->starts_at, $this->ends_at)) {
                    $urls[] = Storage::url($file);
                }
                
            }
            
        }
        

        return $urls;
        
    }

    public function getDurationHumanAttribute()
    {
        
        return \Carbon\CarbonInterval::seconds($this->duration)->cascade()->forHumans();
        
    }


    public function getWhenAttribute()
    {
        
        

        return  $this->starts_at->format('H:i'). ' - '. $this->ends_at->format('H:i');
        
    }
   

    static public function playing($wanted) 
    {
        

        $existingShow = Show::whereDate('date',$wanted)->get();
        foreach($existingShow as $index => $show) {

            // dd($time);
            $showStartsAt =  Carbon::parse($show->starts_at, 'Europe/Prague');
            $showEndsAt = Carbon::parse($show->ends_at, 'Europe/Prague')->timezone('Europe/Prague');
            
            
            
            // dd($wanted,$showStartsAt,$showEndsAt);
            // dd($c);
            // 1 day - 86400 s
            
            if ($wanted->between($showStartsAt, $showEndsAt)) {
                // $out['playing'] = [];
                // $out['playing']['date'] = $showStartsAt->toDateTimeString();
                // // $out['playing']['info'] = $shows[$index];
                // $out['playing']['starts'] = $showStartsAt->format('H:i');;
                // $out['playing']['ends'] = $showEndsAt->format('H:i');
                return $show;
                
                
            }
        }
        return [];
    }


    /**
     * Save URL ands ave into db
     *
     * @param [type] $wanted
     * @return void
     */
    static public function show($wanted) 
    {

        $date = $wanted->format('Y-m-d');
        

        $existingShow = Show::whereDate('date',$date)->get();
        
        if($existingShow->count()) {
            return  $existingShow;
        }
        
        $content = Cache::get('day-'.$date);
        

        if (!$content) {
            // dd(1);
            $response = Http::get('https://www.radio1.cz/program/?typ=dny&p='.$date);
            $content = $response->body();
            Cache::set('day-'.$date, $content);
        }
        
        $html = new HtmlDocument($content);
        $table = $html->find('table.dailyProgramme', 0);
        
        $shows = [];
        // $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', '2020-08-04_');
        // $fileStartedAt->setTimezone('Europe/Prague');
        $times = [];  
        $out = [];
        
        foreach($table->find('tr') as $row) {
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
                            
                            if($person['name'] == "KULTURNÍ SERVIS") {
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

        
        
        foreach($times as $index => $time) {
            // dd($time);
            $split = explode(":",$time);
            $showStartsAt = $wanted->clone();
            
            $showStartsAt->setTime($split[0], $split[1]);

            if(isset($times[$index+1])) {
                $endSplit = explode(":",$times[$index+1]);
                $showEndsAt = $showStartsAt->clone()->setTime($endSplit[0], $endSplit[1]);
            }
            
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
                $out['playing']['starts'] = $showStartsAt->format('H:i');;
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

        foreach($shows as $show) {
            $dbShow = Show::firstOrCreate([
                'date' => $wanted->format('Y-m-d'),
                'starts_at' => $show['starts'],
                'ends_at' => $show['ends']
            ]);
            $dbShow->people  = $show['people'];
            $dbShow->title = $show['people'][0]['name'];
            $dbShow->duration = $show['duration'];
            $dbShow->desc = $show['desc'];
            $dbShow->ks = $show['ks'] ?? 0;
            $dbShow->save();
        }

        
        $ext = [];
        $ext['shows'] = $shows;
        $ext['playing'] = $out['playing'];
        return $ext;
    }
   
}
