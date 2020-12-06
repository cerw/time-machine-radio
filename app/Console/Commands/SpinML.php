<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SpinML extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ai';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sping up AI machine and analyzing mp3';



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
       

        $response = Http::withHeaders([
            'X-Auth-Token' => env('TOKEN'),
        ])->get('https://api.genesiscloud.com/compute/v1/instances');
        $instances = $response->json()['instances'];

        if(count($instances)) {
            $instance = $instances[0];
            $created = Carbon::parse($instance['created_at']);
            $this->info("Instance ".$instance['name']." already running. Created ".$created->diffForHumans());
            return;
        }

        // create one

        $params = [
            "name" => "timemachine",
            "hostname"=>  "ml.radio1.rocks",
            "type"=>  "vcpu-4_memory-12g_disk-80g_nvidia1080ti-1",
            "image"=>  "7b1644e2-d97d-4725-a927-0028bc60bc28", # snaphsot of timemachine
            "ssh_keys"=>  ["7238a5f9-01b6-4efd-95eb-6f23e7d8b637"],
            "metadata"=>  [
               "startup_script" => "#!/bin/bash\nsudo apt update && sudo apt install iperf3"
            ]
        ];

        $response = Http::withHeaders([
            'X-Auth-Token' => env('TOKEN'),
        ])->post('https://api.genesiscloud.com/compute/v1/instances',
            $params
        );
        $instances = $response->json()['instances'];


        
        

        /*
            curl -H 'X-Auth-Token: <TOKEN>' \
            '
        */
        // POST /compute/v1/instances (HTTP 201 - Created)
        return 0;
    }
}
