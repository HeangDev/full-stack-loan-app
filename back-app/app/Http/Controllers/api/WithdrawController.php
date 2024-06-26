<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Withdraw;
use App\Models\Deposit;
use Illuminate\Support\Facades\DB;

class WithdrawController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $withdraw = Withdraw::all();
        return response()->json($withdraw);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $currentDate = Carbon::now()->toDateString();
        $deposit = Deposit::where('id_user', $request->id)
        ->update([
            'deposit_amount' => '0',
            'description' => 'ถอนเงินสำเร็จ'
        ]);

        $withdraw = Withdraw::create([
            'id_user' => $request->id,
            'withdraw_amount' => $request->credit,
            'withdraw_date' => $currentDate,
            'w_status' => 'ถอนเงินสำเร็จ',
            'withdraw_code' => $request->withdrawCode
        ]);
        return response()->json([
            $withdraw,
            $deposit
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $withdraw = DB::table('withdraws')
        ->join('users', 'users.id', '=', 'withdraws.id_user')
        ->select('users.*', 'withdraws.*')
        ->where('users.id', '=', $id)
        ->get();
        return response()->json($withdraw);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $currentDate = Carbon::now()->toDateString();
        $withdraw = Withdraw::where('id', $id)
        ->update([
            'withdraw_amount' => $request->withdrawamount,
            'w_status' => $request->withdrawstatus,
            'withdraw_date' => $currentDate
        ]);
        return response()->json($withdraw);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $withdraw = Withdraw::find($id);
        $withdraw->delete();
    }

    public function getWithdrawById($id) 
    {
        $withdraw = Withdraw::where('id', $id)->first();
        return response()->json($withdraw);
    }

    public function updateWithdrawById(Request $request, $id)
    {
        $currentDate = Carbon::now()->toDateString();
        $withdraw = Withdraw::where('id', $id)
        ->update([
            'withdraw_amount' => $request->withdrawAmount,
            'w_status' => $request->withdrawstatus,
            'withdraw_date' => $currentDate
        ]);
        return response()->json($withdraw);
    }
  
}
