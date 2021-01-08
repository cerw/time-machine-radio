<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

//use Illuminate\Http\Resources\Json\JsonResource;

class TrackCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // dd($this);
        return $this->collection->map(function ($spin) {
            return [
                'track' => [
                    'artist' => $spin->track->artist,
                    'title' => $spin->track->title,
                    'album' => $spin->track->album,
                    'release_date' => $spin->track->release_date,
                    'label' => $spin->track->label,
                    'link' => $spin->track->song_link
                ],
                'show' => [
                    'date' => $spin->show->date,
                    'desc' => $spin->show->desc,
                    'title' => $spin->show->title,
                    'when' => $spin->show->when,
                ],
                'stream_at' => $spin->stream_at->toDateTimeString(),
                'url' => $spin->play_it
            ];
        });
        // return [
        //     'data' => $this->collection,
        //     // 'name' => $this->name,
        //     // 'email' => $this->email,
        //     // 'created_at' => $this->created_at,
        //     // 'updated_at' => $this->updated_at,
        // ];
    }
}
