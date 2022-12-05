<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AdminAuthController;
use App\Http\Controllers\api\DurationController;
use App\Http\Controllers\api\CustomerAuthController;
use App\Http\Controllers\api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('admin/login', [AdminAuthController::class, 'login'])->name('api.admin.login');

Route::group(['as' => 'api.admin.','namespace' => 'App\Http\Controllers\api'], function() {
    Route::resources([
        'user' => UserController::class,
        'duration' => DurationController::class,
        'admin_user' => AdminUserController::class,
        'customer' => CustomerController::class,
    ]);
    
});
Route::get('/getinfo/{id}', [UserController::class, 'getInfo']);
Route::post('admin/logout', [AdminAuthController::class, 'logout'])->name('api.admin.logout');

Route::post('/register', [CustomerAuthController::class, 'register']);
Route::post('/login', [CustomerAuthController::class, 'login']);
Route::post('/logout', [CustomerAuthController::class, 'logout']);
Route::post('/changepassword', [CustomerAuthController::class, 'changePassword']);