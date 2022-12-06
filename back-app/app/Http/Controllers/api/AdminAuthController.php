<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminUser;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $admin_user = AdminUser::where('username', $request->username)->first();
 
        if (! $admin_user || ! Hash::check($request->password, $admin_user->password)) {
            return response([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        } else {
            $token = $admin_user->createToken($admin_user->name . '_AdminToken', ['server:admin'])->plainTextToken;

            return response()->json([
                'status' => 200,
                'id' => $admin_user->id,
                'token' => $token
            ], 200);
        }
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json('Successfully logged out');
    }
}
