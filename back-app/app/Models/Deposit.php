<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'withdraw_code',
        'credit',
        'description',
        'deposit_date'
    ];
}
