<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AdminUser;

class DashboardController extends Controller
{
    public function countCustomer()
    {
        $user = User::count();
        return response()->json($user);
    }

    public function countAdminUser()
    {
        $adminUser = AdminUser::count();
        return response()->json($adminUser);
    }

    public function getAdminInfo($id)
    {
        $adminUser = AdminUser::where('id', $id)->first();
        return response()->json($adminUser);
    }

}
