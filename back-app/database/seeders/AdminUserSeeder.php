<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\AdminUser;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdminUser::create([
            'name' => 'Kimheang Sim',
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'plain_password' => 'password',
        ]);
    }
}
