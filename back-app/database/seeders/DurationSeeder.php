<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Duration;

class DurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Duration::truncate();

        Duration::create([
            'month' => '12',
            'percent' => '1.2'
        ]);
        
        Duration::create([
            'month' => '24',
            'percent' => '1.8'
        ]);

        Duration::create([
            'month' => '36',
            'percent' => '3'
        ]);

        Duration::create([
            'month' => '48',
            'percent' => '3.5'
        ]);

        Duration::create([
            'month' => '60',
            'percent' => '5'
        ]);
    }
}
