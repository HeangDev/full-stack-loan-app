<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Bank;
use App\Models\DocumentId;
use App\Models\Signature;
use App\Models\Deposit;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'tel' => '011263262',
            'password' => Hash::make('password'),
            'plain_password' => 'password',
        ]);

        $u_id = $user->id;

        Deposit::create([
            'id_user' => $u_id,
            'description' => 'กำหลังดำเนินการ',
        ]);

        Signature::create([
            'id_user' => $u_id,
            'status' => '0',
        ]);

        Bank::create([
            'id_user' => $u_id,
        ]);

        DocumentId::create([
            'id_user' => $u_id,
        ]);
    }
}
