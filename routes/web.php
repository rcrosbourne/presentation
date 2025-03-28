<?php

use App\Http\Controllers\PresentationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Presentation Routes
Route::get('/presentation', [PresentationController::class, 'show'])->name('presentation');
Route::get('/api/presentations/angels', [PresentationController::class, 'getAngelsPresentation']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
