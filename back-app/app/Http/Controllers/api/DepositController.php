<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Deposit;
use Illuminate\Support\Facades\DB;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $deposit = DB::table('deposits')
        ->join('users', 'users.id', '=', 'deposits.id_user')
        ->select('users.*', 'deposits.*')
        ->where('users.id', '=', $id)
        ->get();
        return response()->json($deposit);
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
        $currentDate = Carbon::now()->toDateString();
        $deposit = Deposit::where('id_user', $request->id)
        ->update([
            'withdraw_code' => $request->withdrawCode,
            'deposit_amount' => $request->credit,
            'description' => $request->description,
            'deposit_date' => $currentDate
        ]);
        return response()->json($deposit);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deposit = Deposit::find($id);
        $deposit->delete();
    }

    public function getDepositById($id)
    {
        $deposit = Deposit::where('id_user', $id)->first();
        return response()->json($deposit);
    }

    public function updateDepositById(Request $request, $id)
    {
        $currentDate = Carbon::now()->toDateString();
        $deposit = Deposit::where('id', $id)
        ->update([
            'withdraw_code' => $request->withdrawCode,
            'deposit_amount' => $request->depositAmount,
            'description' => $request->description,
            'deposit_date' => $currentDate
        ]);
        return response()->json($deposit);
    }
}
