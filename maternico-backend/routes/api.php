<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

//Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::middleware(['auth:sanctum'])->group(function () {
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });

    Route::get('hola-mundo', function () {
        return response()->json(['message' => 'Hola Mundo!']);
    });
});

Route::post('login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});

Route::get('nose', function () {
    return response()->json(['message' => 'No se que poner']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
});




