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
    protected $signature = 'ai 
    {--delete : Delete existing instance if any}';
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
       

        $delete = $this->option('delete');
        
       
        $instance = $this->detail();

        if($instance) {
            $created = Carbon::parse($instance['created_at']);
            $this->info("Instance ".$instance['name']." already running. ");
            $this->info("Created ".$created->diffForHumans());
            


            while(is_null($instance['public_ip'])) {
                $this->comment("No ip address.. lets  wait");
                sleep(5);
                $instance = $this->detail();
            }
            dump($instance);

            
            if($delete) {
                $this->info("Deleting");
                // delete
                // DELETE /compute/v1/instances/{instance_id}  (HTTP 204 - No content)
                $response = Http::withHeaders([
                    'X-Auth-Token' => env('TOKEN'),
                ])->delete('https://api.genesiscloud.com/compute/v1/instances/'.$instance['id']);
                $this->info("Deleted");
                dump($response->status());
            }
            return;
        } else {
            $this->comment("No instance and running");
            // create one

        $params = [
            "name" => "timemachine",
            "hostname"=>  "ml.radio1.rocks",
            "type"=>  "vcpu-4_memory-12g_disk-80g_nvidia1080ti-1",
            "image"=>  "2ec2d436-cbe0-43b7-bb3d-33daafa164ca", # snaphsot of timemachine
            "ssh_keys"=>  ["7238a5f9-01b6-4efd-95eb-6f23e7d8b637"],
            "metadata"=>  [
               "startup_script" => "#!/bin/bash\nsudo apt update && sudo apt install iperf3"
            ]
        ];

        $this->info("Creating instance");
        $response = Http::withHeaders([
            'X-Auth-Token' => env('TOKEN'),
        ])->post('https://api.genesiscloud.com/compute/v1/instances',
            $params
        );
        dump($response->json());
        }

        


        

        /*
            curl -H 'X-Auth-Token: <TOKEN>' \
            '
        */
        // POST /compute/v1/instances (HTTP 201 - Created)
        return 0;
    }
    public function detail()
    {
        $response = Http::withHeaders([
            'X-Auth-Token' => env('TOKEN'),
        ])->get('https://api.genesiscloud.com/compute/v1/instances');
        $instances = $response->json()['instances'];
        if(count($instances)) {
            return $instances[0];
        }
        return false;
        
    }
}
