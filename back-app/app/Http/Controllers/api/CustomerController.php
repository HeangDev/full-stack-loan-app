<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Bank;
use App\Models\DocumentId;
use App\Models\Signature;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::join('document_ids', 'document_ids.id_user', '=', 'users.id')
            ->join('signatures', 'signatures.id_user', '=', 'users.id')
            ->select('users.*', 'document_ids.name', 'signatures.status AS sign_status')
            ->get();
        return response()->json($user);
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
        $image1 = $request->file('frontImage');
        $image2 = $request->file('backImage');
        $image3 = $request->file('fullImage');

        if (isset($image1) && isset($image2) && isset($image3)) {
            $currentDate = Carbon::now()->toDateString();

            $imageName1 = $currentDate . '-' . uniqid() . '.' . $image1->getClientOriginalExtension();
            $imageName2 = $currentDate . '-' . uniqid() . '.' . $image2->getClientOriginalExtension();
            $imageName3 = $currentDate . '-' . uniqid() . '.' . $image3->getClientOriginalExtension();

            if(!Storage::disk('public')->exists('customer'))
            {
                Storage::disk('public')->makeDirectory('customer');
            }

            $postImage1 = Image::make($image1)->stream();
            $postImage2 = Image::make($image2)->stream();
            $postImage3 = Image::make($image3)->stream();

            Storage::disk('public')->put('customer/' . $imageName1, $postImage1);
            Storage::disk('public')->put('customer/' . $imageName2, $postImage2);
            Storage::disk('public')->put('customer/' . $imageName3, $postImage3);
        }

        $customer = User::create([
            'tel' => $request->tel,
            'password' => Hash::make($request->password),
            'plain_password' => $request->password,
            'current_occupation' => $request->currentWork,
            'monthly_income' => $request->income,
            'contact_number' => $request->contactNumber,
            'current_address' => $request->currentAddress,
            'emergency_contact_number' => $request->otherContact,
            'status' => 'complete',
        ]);

        $u_id = $customer->id;

        $signature = Signature::create([
            'id_user' => $u_id,
            'status' => '0',
        ]);

        $document = DocumentId::create([
            'id_user' => $u_id,
            'name' => $request->name,
            'id_number' => $request->idNumber,
            'front' => $imageName1,
            'back' => $imageName2,
            'full' => $imageName3,
        ]);

        $bank = Bank::create([
            'id_user' => $u_id,
            'bank_name' => $request->bankName,
            'bank_acc' => $request->bankAccount,
        ]);

        return response()->json([
            $customer,
            $bank,
            $document,
            $signature
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
        $user = DB::table('users')
            ->join('banks', 'banks.id_user', '=', 'users.id')
            ->join('document_ids', 'document_ids.id_user', '=', 'users.id')
            ->join('signatures', 'signatures.id_user', '=', 'users.id')
            ->select('users.*', 'banks.*', 'document_ids.*', 'signatures.status AS sign_status')
            ->where('users.id', '=', $id)
            ->first();
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = DB::table('users')
            ->join('banks', 'users.id_bank', '=', 'banks.id')
            ->join('document_ids', 'users.id_document', '=', 'document_ids.id')
            ->select('users.*', 'banks.*', 'document_ids.*')
            ->where('users.id', '=', $id)
            ->first();
        return response()->json([$user]);
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
        $document = DocumentId::where('id_user', $id);

        $image1 = $request->file('frontImage');
        $image2 = $request->file('backImage');
        $image3 = $request->file('fullImage');

        if (isset($image1) && isset($image2) && isset($image3)) {
            $currentDate = Carbon::now()->toDateString();

            $imageName1 = $currentDate . '-' . uniqid() . '.' . $image1->getClientOriginalExtension();
            $imageName2 = $currentDate . '-' . uniqid() . '.' . $image2->getClientOriginalExtension();
            $imageName3 = $currentDate . '-' . uniqid() . '.' . $image3->getClientOriginalExtension();

            if(!Storage::disk('public')->exists('customer'))
            {
                Storage::disk('public')->makeDirectory('customer');
            }

            if(Storage::disk('public')->exists('customer/' . $document->front))
            {
                Storage::disk('public')->delete('customer/' . $document->front);
            }

            if(Storage::disk('public')->exists('customer/' . $document->back))
            {
                Storage::disk('public')->delete('customer/' . $document->back);
            }

            if(Storage::disk('public')->exists('customer/' . $document->full))
            {
                Storage::disk('public')->delete('customer/' . $document->full);
            }

            $postImage1 = Image::make($image1)->stream();
            $postImage2 = Image::make($image2)->stream();
            $postImage3 = Image::make($image3)->stream();

            $upload1 = Storage::disk('public')->put('customer/' . $imageName1, $postImage1);
            $upload2 = Storage::disk('public')->put('customer/' . $imageName2, $postImage2);
            $upload3 = Storage::disk('public')->put('customer/' . $imageName3, $postImage3);

            if ($upload1 && $upload2 && $upload3) {
                $document->name = $request->name;
                $document->id_number = $request->idNumber;
                $document->front = $imageName1;
                $document->back = $imageName2;
                $document->full = $imageName3;
                $document->save();
            }
        }

        $customer = User::where('id', $id)
            ->update([
                'current_occupation' => $request->currentWork,
                'monthly_income' => $request->income,
                'contact_number' => $request->contactNumber,
                'current_address' => $request->currentAddress,
                'emergency_contact_number' => $request->otherContact,
                'status' => 'complete',
            ]);

        $bank = Bank::where('id_user', $id)
            ->update([
                'bank_name' => $request->bankName,
                'bank_acc' => $request->bankAccount,
            ]);

        return response()->json([
            $customer,
            $bank,
            $document
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $customer = User::join('banks', 'users.id_bank', '=', 'banks.id')
        // ->join('document_ids', 'users.id_document', '=', 'document_ids.id')
        // ->where('users.id', $id)
        // ->delete();
        // return response()->json([$customer]);
    }

    public function changePassword(Request $request)
    {
        $customer = User::find($request->id);
        $customer->password = Hash::make($request->newPassword);
        $customer->plain_password = $request->newPassword;
        $customer->save();
        return response()->json($customer);
    }

    public function createCustomerById(Request $request)
    {
        $image1 = $request->file('frontImage');
        $image2 = $request->file('backImage');
        $image3 = $request->file('fullImage');

        if (isset($image1) && isset($image2) && isset($image3)) {
            $currentDate = Carbon::now()->toDateString();

            $imageName1 = $currentDate . '-' . uniqid() . '.' . $image1->getClientOriginalExtension();
            $imageName2 = $currentDate . '-' . uniqid() . '.' . $image2->getClientOriginalExtension();
            $imageName3 = $currentDate . '-' . uniqid() . '.' . $image3->getClientOriginalExtension();

            if(!Storage::disk('public')->exists('customer'))
            {
                Storage::disk('public')->makeDirectory('customer');
            }

            $postImage1 = Image::make($image1)->stream();
            $postImage2 = Image::make($image2)->stream();
            $postImage3 = Image::make($image3)->stream();

            Storage::disk('public')->put('customer/' . $imageName1, $postImage1);
            Storage::disk('public')->put('customer/' . $imageName2, $postImage2);
            Storage::disk('public')->put('customer/' . $imageName3, $postImage3);
        }

        $customer = User::where('id', $request->id)
            ->update([
                'current_occupation' => $request->currentWork,
                'monthly_income' => $request->income,
                'contact_number' => $request->contactNumber,
                'current_address' => $request->currentAddress,
                'emergency_contact_number' => $request->otherContact,
                'status' => 'complete',
            ]);
        
        $document = DocumentId::where('id_user', $request->id)
            ->update([
                'name' => $request->name,
                'id_number' => $request->idNumber,
                'front' => $imageName1,
                'back' => $imageName2,
                'full' => $imageName3,
            ]);

        $bank = Bank::where('id_user', $request->id)
            ->update([
                'bank_name' => $request->bankName,
                'bank_acc' => $request->bankAccount,
            ]);
        
        return response()->json([
            $customer,
            $bank,
            $document
        ]);
    }

    public function updateCustomerBank()
    {
        
    }

    public function updateCustomerDocument()
    {
        
    }
}
