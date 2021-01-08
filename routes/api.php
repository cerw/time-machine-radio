<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/play/{time?}/{date?}', 'PlayController@play');
Route::get('/live', 'PlayController@live');
Route::get('/archive/{day}/{time?}', 'PlayController@archive');
Route::get('/tracks', 'PlayController@tracks');
Route::get('/spins', 'PlayController@spins');


Route::get('/person/{person}', 'PlayController@person');

Route::post('/stream', 'StreamController@update');
