<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentId extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'name',
        'id_number',
        'front',
        'back',
        'full'
    ];
}
