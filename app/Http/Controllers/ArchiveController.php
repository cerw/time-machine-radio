<?php

namespace App\Http\Controllers;

use App\Show;
use App\Spin;
use App\Stream;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\TrackCollection;

class ArchiveController extends Controller
{
    public function index(Request $request)
    {
        
        $expiresAt = Carbon::now()->subDays(14);
        
        // if date/time then match that  in radioe1 time
        
        $shows = Show::where('date', '>=', $expiresAt)
                ->orderBy('date', 'DESC')
                ->orderBy('starts_at', 'ASC')
                ->withCount('spins')
                ->with("stream")
                ->get()
                // ->map(function($spin){
                //     $spin->format = Carbon::parse($spin->date)->format("Y-m-d");
                //     return $spin;
                // })
                ->groupBy('date')
                ->makeHidden('tracks');
        
        return response()->json($shows);
    }

    public function show(Show $show, Request $request)
    {
        
        // $show
        
        $tracks = Spin::with(['track','show','stream'])
        ->orderBy('stream_at', 'asc')
        ->where('show_id', $show->id)
        ->get();
        // dd($tracks);
        return new TrackCollection($tracks);
        // return response()->json($show);
    }

    public function stream(Stream $stream, Request $request)
    {
        
        // $show
        
        $tracks = Spin::with(['track','show','stream'])
        ->orderBy('stream_at', 'asc')
        ->where('stream_id', $stream->id)
        ->get();
        // dd($tracks);
        return new TrackCollection($tracks);
        // return response()->json($show);
    }
}
