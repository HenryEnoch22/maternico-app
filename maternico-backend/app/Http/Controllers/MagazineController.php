<?php

namespace App\Http\Controllers;

use App\Models\Magazine;
use Illuminate\Http\Request;

class MagazineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($category)
    {
        $magazines = Magazine::where('category', Magazine::$categories[$category])->get();
        return response()->json(['received_category' => $magazines]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($magazineId)
    {
        $magazine =  Magazine::findOrfail($magazineId);
        $url = asset('magazines/' . basename($magazine->magazine_path));
        return response()->json(['magazine' => $magazine, 'magazineUrl' => $url]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
