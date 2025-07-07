<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TechnologyController;

Route::get('/', function () {
    return Inertia::render('page');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    //Posts
    Route::get('dashboard/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('posts/store', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/edit/{post}',[PostController::class, 'edit'])->name('posts.edit');
    Route::put('posts/update/{post}',[PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/delete/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    //Technologies
    Route::get('dashboard/technologies', [TechnologyController::class, 'index'])->name('technologies.index');

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
