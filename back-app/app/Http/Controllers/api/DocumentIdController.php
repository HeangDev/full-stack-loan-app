<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Carbon\Carbon;
use App\Models\DocumentId;
use Illuminate\Support\Facades\DB;

class DocumentIdController extends Controller
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
        $document = DB::table('document_ids')
        ->join('users', 'users.id', '=', 'document_ids.id_user')
        ->select('users.*', 'document_ids.*')
        ->where('users.id', '=', $id)
        ->first();
        return response()->json($document);
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
        $document = DocumentId::findOrFail($id);

        $document->update([
            'name' => $request->name,
            'id_number' => $request->idNumber
            ]);

        return response()->json($document);
        
    }

    public function updateFrontImg(Request $request, $id)
    {
        $currentDate = Carbon::now()->toDateString();
        $document = DocumentId::findOrFail($id);
        
       if($request->hasFile('frontImage')) {
            if(File::exists('customer/'.$document->frontImage)) {
                File::delete('customer/'.$document->frontImage);
            }

            $file = $request->file('frontImage');
            $document->frontImage = time()."_".$file->getClientOriginalName();
            $file->move(\public_path('/customer'),$document->frontImage);
            $request['frontImage'] = $document->frontImage;
       }
        $document->update([
            'front' => $document->frontImage
        ]);
        return response()->json($document);
        
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

    // public function getDocumentById($id)
    // {
    //     $document = DocumentId::where('id', $id)->first();
    //     return response()->json($document);
    // }
}
