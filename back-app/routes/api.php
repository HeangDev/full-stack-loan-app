<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AdminAuthController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\api\DurationController;
use App\Http\Controllers\api\CustomerAuthController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\CustomerController;
use App\Http\Controllers\api\DepositController;
use App\Http\Controllers\api\WithdrawController;
use App\Http\Controllers\api\LoanController;
use App\Http\Controllers\api\DocumentIdController;

use App\Http\Controllers\HomeController;

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
        'signature' => SignatureController::class,
        'agreement' => AgreementController::class,
        'loan' => LoanController::class,
        'deposit' => DepositController::class,
        'withdraw' => WithdrawController::class,
        'bank' => BankController::class,
    ]);

    Route::resource('documentid', DocumentIdController::class)->only([
        'update', 'show'
    ]);

    Route::get('/countcustomer', [DashboardController::class, 'countCustomer']);
    Route::get('/countadminuser', [DashboardController::class, 'countAdminUser']);
    Route::get('/getadmininfo/{id}', [DashboardController::class, 'getAdminInfo']);
    
    Route::post('/customer/changepassword', [CustomerController::class, 'changePassword']);
    Route::post('/customer/createbyid', [CustomerController::class, 'createCustomerById']);
    Route::get('/getdepositbyid/{id}', [DepositController::class, 'getDepositById']);
    Route::post('/updatedepositbyid/{id}', [DepositController::class, 'updateDepositById']);

    
   
    
});

Route::middleware('auth:sanctum')->group(function() {
    
});
Route::post('/logout', [CustomerAuthController::class, 'logout']);
Route::get('/getinfo/{id}', [UserController::class, 'getInfo']);
Route::post('/changepassword', [CustomerAuthController::class, 'changePassword']);

Route::post('admin/logout', [AdminAuthController::class, 'logout'])->name('api.admin.logout');

Route::post('/register', [CustomerAuthController::class, 'register']);
Route::post('/login', [CustomerAuthController::class, 'login']);


Route::get('/getduration', [HomeController::class, 'getDuration']);
Route::get('/getagreement', [HomeController::class, 'getAgreement']);

Route::get('message', function () {
    $message['user'] = "Sim Kimheang";
    $message['message'] = "วงเงินกู้ 3,000 บาท นาน 12 เดือน ดอกเบี้ย 1.2%";
    $success = event(new App\Events\CreateLoan($message));
    echo "Success Send";
});

