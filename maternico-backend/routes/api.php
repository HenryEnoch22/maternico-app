<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'show'])->name('magazines.show');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Magazines
    Route::get('magazines/{category}', [\App\Http\Controllers\MagazineController::class, 'index'])->name('magazines.index');
    Route::post('magazines', [\App\Http\Controllers\MagazineController::class, 'store'])->name('magazines.store');
//    Route::get('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'show'])->name('magazines.show');
    Route::put('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'update'])->name('magazines.update');
    Route::delete('magazines/{id}', [\App\Http\Controllers\MagazineController::class, 'destroy'])->name('magazines.destroy');
});







