<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Bank;
use App\Models\DocumentId;
use App\Models\Signature;
use App\Models\Deposit;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'tel' => $request->tel,
            'password' => Hash::make($request->password),
            'plain_password' => $request->password,
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

        return response()->json([
            'status' => 200,
            $user
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'tel' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('tel', $request->tel)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'tel' => ['หมายเลขโทรศัพท์หรือรหัสผ่านของคุณไม่ถูกต้อง.'],
            ]);
        } else {
            $token = $user->createToken($request->tel . '_CustomerToken')->plainTextToken;

            return response()->json([
                'status' => 200,
                'id' => $user->id,
                'token' => $token
            ], 200);
        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Successfully logged out'
        ]);
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
