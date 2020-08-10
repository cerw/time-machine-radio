<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PlayController extends Controller
{
    /**
     * Undocumented function
     *
     * #EXTM3U
#EXT-X-TARGETDURATION:10
#EXTINF:10,
http://localhost/media/stream/stream-1.ts
#EXTINF:10,
http://localhost/media/stream/stream-2.ts
#EXTINF:10,
http://localhost/media/stream/stream-3.ts
#EXT-X-ENDLIST
     * 
     * @param [type] $time
     * @param Request $request
     * @return void
     */
    public function play ($time, Request $request) {
        
        $files = Storage::files('radio1');
        $urls = [];
        $today = now();
        
        //dd($today->format('H:m'));
        // find nearest $time record
        // 
        $wanted = Carbon::createFromFormat('Y-m-d H:i:s', $today->format('Y-m-d').' '.$time, 'Europe/Prague');
        
        if($wanted->isFuture()) {
            $wanted->subDay();
        }
        $closest = 6000000;
        $out = [];
        // todo - get whats playing https://www.radio1.cz/program/?typ=dny&amp%3Bp=2012-03-26
        // dump($wanted);
        $expiresAt = Carbon::now()->subDays(1);
        
        foreach($files as $file) {
            if(preg_match("#^radio1/radio1-(.*).(mp3|m4a)$#",$file,$match)) {
                $fileStartedAt = Carbon::createFromFormat('Y-m-d_H-i', $match[1]);
                $perthTime =  $fileStartedAt->toDateTimeString();
                if($perthTime < $expiresAt) {
                    \Log::info("Removing old files {$file}");
                    Storage::delete($file);
                    continue;
                }
                $fileStartedAt->setTimezone('Europe/Prague');
                // $diff = $date->diffInDays($wanted);
                $diff = $wanted->diffInSeconds($fileStartedAt);
                // dump($diff,$file);
                if($fileStartedAt->lessThanOrEqualTo($wanted) && $diff < $closest){
                    // edited at is newer than created at
                //    dump($fileStartedAt, $diff, $fileStartedAt->format('H:i:s'));
                    $closest = $diff;
                    $out['url'] = Storage::url($file);
                    $out['offset'] = $diff;
                    // $out['play_at'] = '00:'.round($diff/60).':'.($diff-round($diff/60)*60);
                    $out['start_at'] = $fileStartedAt->format('H:i:s');
                    $out['perth_started_at'] = $perthTime;
                    $out['prague_started_at'] = $fileStartedAt->toDateTimeString();;
                    $out['recoded_at'] = $fileStartedAt->diffForHumans();
                    $out['recoded_timestamp'] = $fileStartedAt->toDateTimeString();
                    $out['ends_at'] = $fileStartedAt->addHour()->format('H:i:s');
                }
                
            }
            
            $urls[] = Storage::url($file);
        }
        
        $playing = $this->info($wanted);
      
        $out['playing'] = $playing;
        //$out['shows'] = $shows;
        $out['wanted'] =  $time;
        //$out['files'] = $files;
        // $out['urls'] = $urls;
        

        return response()->json($out);
    }

    public function live (Request $request) {
        

        $wanted = Carbon::now()->tz('Europe/Prague');
        $playing = $this->info($wanted);
      
        $out['playing'] = $playing;
        //$out['shows'] = $shows;
        //$out['wanted'] =  $time;
        return response()->json($out);

    }
    /**
     * Get whos playing when
     *
     * @param [type] $date
     * @param [type] $wanted
     * @return void
     */
    protected function info( $wanted )  {
        

        $date = $wanted->format('Y-m-d');
        
        
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
        
        foreach($table->find('tr') as $row) {
            // initialize array to store the cell data from each row
            $cols = [];  
            
            foreach ($row->find('td') as $key => $cell) {
                $cols[$key] = $cell;
            }
            
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
                            $people[] = $person;
                        }
                        $shows[$time]['people'] = $people;
                    }
                    if ($key == 2) {
                        $shows[$time]['desc'] = $cell->plaintext;
                    }

                    if ($key == 3) {
                        $shows[$time]['now'] = (empty($cell->innertext)) ? false : true;
                    }
                    
                }
            }
            
        }

        // lopps times
        // dump($times);
        
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
            
            if ($wanted->between($showStartsAt, $showEndsAt)) {
                $out['playing'] = [];
                $out['playing']['info'] = $shows[$time];
                $out['playing']['starts'] = $showStartsAt->format('H:i');;
                $out['playing']['ends'] = $showEndsAt->format('H:i');
                
            }
        }

        return $out['playing'];
    }


}
