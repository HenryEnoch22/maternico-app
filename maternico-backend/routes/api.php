<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::get('magazines/{category}', [\App\Http\Controllers\MagazineController::class, 'index'])->name('magazines.index');

Route::middleware('auth:sanctum')->group(function () {
    // Rutas protegidas
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    });

    //Magazines
//    Route::get('magazines/{category}', [\App\Http\Controllers\MagazineController::class, 'index'])->name('magazines.index');
    Route::post('magazines', [\App\Http\Controllers\MagazineController::class, 'store'])->name('magazines.store');
    Route::get('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'show'])->name('magazines.show');
    Route::put('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'update'])->name('magazines.update');
    Route::delete('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'destroy'])->name('magazines.destroy');

});

Route::post('login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'nullable|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Credenciales inválidas'
        ], 401);
    }

    return response()->json([
        'token' => $user->createToken($request->email)->plainTextToken,
    ]);
});

// Ruta de ejemplo pública
Route::get('nose', function () {
    return response()->json(['message' => 'Esta es una ruta pública']);
});
