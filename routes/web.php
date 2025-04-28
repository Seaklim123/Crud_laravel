<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Remove this redundant route
    // Route::get('posts', function () {
    //     return Inertia('posts');
    // })->name('posts');

    Route::prefix('posts')->group(function () {
        Route::get('/', [\App\Http\Controllers\PostController::class, 'index'])
            ->name('posts.index');

        Route::get('/create', [\App\Http\Controllers\PostController::class, 'create']);

        Route::get('/{post}/edit', [\App\Http\Controllers\PostController::class, 'edit'])->name('posts.edit');

        Route::post("/", [\App\Http\Controllers\PostController::class, 'store']);

        Route::put("/{post}", [\App\Http\Controllers\PostController::class, 'update']);

        Route::delete("/{post}", [\App\Http\Controllers\PostController::class, 'destroy'])->name('posts.destroy');
    });
});

require __DIR__.'/auth.php';