<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TechnologyController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PorfolioController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\AchievementController;

Route::get('/', [PorfolioController::class, 'portfolio'])->name('home');

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
    Route::get('technologies/create', [TechnologyController::class, 'create'])->name('technologies.create');
    Route::post('technologies/store', [TechnologyController::class, 'store'])->name('technologies.store');
    Route::get('technologies/edit/{technology}',[TechnologyController::class, 'edit'])->name('technologies.edit');
    Route::put('technologies/update/{technology}',[TechnologyController::class, 'update'])->name('technologies.update');
    Route::delete('technologies/delete/{technology}', [TechnologyController::class, 'destroy'])->name('technologies.destroy');

    //Categories
    Route::get('dashboard/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('categories/store', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('categories/edit/{category}',[CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('categories/update/{category}',[CategoryController::class, 'update'])->name('categories.update');
    Route::delete('categories/delete/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    //Experiences
    Route::get('dashboard/experiences', [ExperienceController::class, 'index'])->name('experiences.index');
    Route::get('experiences/create', [ExperienceController::class, 'create'])->name('experiences.create');
    Route::post('experiences/store', [ExperienceController::class, 'store'])->name('experiences.store');
    Route::get('experiences/edit/{experience}',[ExperienceController::class, 'edit'])->name('experiences.edit');
    Route::put('experiences/update/{experience}',[ExperienceController::class, 'update'])->name('experiences.update');
    Route::delete('experiences/delete/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');

    //Experiences
    Route::get('dashboard/achievements', [AchievementController::class, 'index'])->name('achievements.index');
    Route::get('achievements/create', [AchievementController::class, 'create'])->name('achievements.create');
    Route::post('achievements/store', [AchievementController::class, 'store'])->name('achievements.store');
    Route::get('achievements/edit/{achievement}',[AchievementController::class, 'edit'])->name('achievements.edit');
    Route::put('achievements/update/{achievement}',[AchievementController::class, 'update'])->name('achievements.update');
    Route::delete('achievements/delete/{achievement}', [AchievementController::class, 'destroy'])->name('achievements.destroy');

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
