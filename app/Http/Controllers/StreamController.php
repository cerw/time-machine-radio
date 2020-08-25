<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use simplehtmldom\HtmlDocument;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class StreamController extends Controller
{
   
    public function update (Request $request) {
        
        \Log::info('stream vole');
        \Log::info($request->input());
        return response()->json($request->input());
    }

    


}
