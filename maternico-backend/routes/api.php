<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::middleware('auth:sanctum')->group(function () {
    // Rutas protegidas
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('hola-mundo', function () {
        return response()->json(['message' => 'Hola Mundo!']);
    });

    Route::post('logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
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
        return response()->json([
            'message' => 'Credenciales inválidas'
        ], 401);
    }

    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken,
        'user' => $user // Opcional: Enviar datos básicos del usuario
    ]);
});

// Ruta de ejemplo pública
Route::get('nose', function () {
    return response()->json(['message' => 'Esta es una ruta pública']);
});
