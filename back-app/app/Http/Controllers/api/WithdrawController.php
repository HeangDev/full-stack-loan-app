<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Withdraw;
use App\Models\Deposit;

class WithdrawController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'status' => 'ถอนเงินสำเร็จ'
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
        $withdraw = Withdraw::where('id_user', $id)->first();
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getWithdrawById($id)
    {
        $withdraw = Withdraw::where('id_user', $id)->get();
        return response()->json($withdraw);
    }
}
