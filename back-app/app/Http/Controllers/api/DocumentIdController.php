<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Carbon\Carbon;
use App\Models\DocumentId;

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
        //
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
        $document = DocumentId::where('id_user', $id);

        $image1 = $request->file('frontImage');
        $image2 = $request->file('backImage');
        $image3 = $request->file('fullImage');

       

       if (isset($image1)) {
            $currentDate = Carbon::now()->toDateString();
            $imageName1 = $currentDate . '-' . uniqid() . '.' . $image1->getClientOriginalExtension();
  
            return response()->json($imageName1);
            
        } 

        
       if (isset($image2)) {
        $currentDate = Carbon::now()->toDateString();
        $imageName2 = $currentDate . '-' . uniqid() . '.' . $image2->getClientOriginalExtension();

        return response()->json($imageName2);
        
    } 

    
    if (isset($image3)) {
        $currentDate = Carbon::now()->toDateString();
        $imageName3 = $currentDate . '-' . uniqid() . '.' . $image3->getClientOriginalExtension();

        return response()->json($imageName3);
        
    } 
            

        
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

    public function getDocumentById($id)
    {
        $document = DocumentId::where('id', $id)->first();
        return response()->json($document);
    }
}
