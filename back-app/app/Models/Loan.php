<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_duration',
        'amount',
        'interest',
        'total',
        'pay_month',
        'date'
    ];
}
