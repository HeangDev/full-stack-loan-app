<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'tel' => $request->tel,
            'password' => Hash::make($request->password),
            'plain_password' => $request->password,
        ]);

        return response()->json([
            'status' => 200,
            $user
        ], 200);
    }

    public function login(Request $request)
    {

        $login = User::where('tel', $request->tel)->first();
 
        if (! $login || ! Hash::check($request->password, $login->password)) {
            return response([
                'status' => 401,
                'message' => 'หมายเลขโทรศัพท์หรือรหัสผ่านของคุณไม่ถูกต้อง.'
            ], 401);
        } else {
            $token = $login->createToken($login->tel . '_CustomerToken', ['server:customer'])->plainTextToken;

            return response()->json([
                'status' => 200,
                'tel' => $login->tel,
                'id' => $login->id,
                'token' => $token,
                'message' => 'Customer User login successfully!'
            ], 200);
        }
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json('Successfully logged out');
    }

    public function changePassword(Request $request)
    {
        $user = User::find($request->id_user);
        $user->password = Hash::make($request->newPassword);
        $user->plain_password = $request->newPassword;
        $user->save();
        return response()->json([
            'status' => 200,
            $user
        ], 200); 
    }
}
