<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Loan;
use Illuminate\Support\Facades\DB;

class LoanController extends Controller
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
        $loan = Loan::create([
            'id_user' => $request->id_user,
            'id_duration' => $request->durationId,
            'amount' => $request->amount,
            'interest' => $request->interest,
            'total' => $request->total,
            'pay_month' => $request->payMonthly,
            'date' => $currentDate,
            
        ]);
        return response()->json($loan);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $loan = DB::table('loans')
        ->join('durations', 'durations.id', '=', 'loans.id_duration')
        ->join('users', 'users.id', '=', 'loans.id_user')
        ->select('users.*','durations.*', 'loans.*')
        ->where('users.id', '=', $id)
        ->get();
        return response()->json($loan);
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
        $loan = Loan::where('id', $id)
        ->update([
            'id_duration' => $request->durationId,
            'amount' => $request->amount,
            'interest' => $request->interest,
            'total' => $request->total,
            'pay_month' => $request->payMonthly,
            'date' => $currentDate,
            'status' => $request->status,
            
        ]);
        return response()->json($loan);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $loan = Loan::find($id);
        $loan->delete();
    }

    public function getLoanById($id)
    {
        $loan = Loan::where('id', $id)->first();
        return response()->json($loan);
    }
}
