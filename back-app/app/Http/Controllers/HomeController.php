<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Duration;
use App\Models\Agreement;

class HomeController extends Controller
{
    public function getDuration()
    {
        $duration = Duration::where('status', 'active')->get();
        return response()->json($duration);
    }

    public function getAgreement()
    {
        $agreement = Agreement::where('status', '1')->get();
        return response()->json($agreement);
    }
}
