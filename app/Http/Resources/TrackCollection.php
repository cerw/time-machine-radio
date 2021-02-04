<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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

            $radio_time_ends = null;
            if (isset($spin->track->metadata['result']['play_length'])) {
                $radio_time_ends = Carbon::createFromFormat('Y-m-d H:i:s', $spin->stream_at)
                ->subHours(config('app.offset_hours'))
                ->addSeconds($spin->track->metadata['result']['play_length'])
                ->toTimeString();
            }

            return [
                'id' => $spin->id,
                'artist' => $spin->track->artist,
                'title' => $spin->track->title,
                'album' => $spin->track->album,
                'release_date' => $spin->track->release_date,
                'label' => $spin->track->label,
                'link' => $spin->track->song_link,
                'radio_time' => Carbon::createFromFormat('Y-m-d H:i:s', $spin->stream_at)
                                ->subHours(config('app.offset_hours'))
                                ->toTimeString(),
                'radio_time_ends' => $radio_time_ends,
                // 'show' => [
                //     'date' => $spin->show->date,
                //     'desc' => $spin->show->desc,
                //     'title' => $spin->show->title,
                //     'when' => $spin->show->when,
                // ],
                'show_id' => $spin->show_id,
                'stream_at' => $spin->stream_at->toDateTimeString(),
                'stream_id' => $spin->stream_id,
                'url' => $spin->play_it,
                'timecode_starts' => (int) $spin->timecode,
                'timecode_ends' => (int) $spin->timecode + $spin->track->metadata['result']['play_length'],
            ];
        });

        /**
         * public function getRadioTimeAttribute()
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at)
                ->subHours(config('app.offset_hours'))
                ->toTimeString();
    }


    public function getRadioTimeEndsAttribute()
    {

        if (isset($this->metadata['result']['play_length'])) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $this->stream_at)
            ->subHours(config('app.offset_hours'))
            ->addSeconds($this->metadata['result']['play_length'])
            ->toTimeString();
        }
    }
         */
        // return [
        //     'data' => $this->collection,
        //     // 'name' => $this->name,
        //     // 'email' => $this->email,
        //     // 'created_at' => $this->created_at,
        //     // 'updated_at' => $this->updated_at,
        // ];
    }
}
