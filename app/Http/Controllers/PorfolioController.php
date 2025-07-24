<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use App\Http\Resources\CategoryResource;

class PorfolioController extends Controller
{
    public  function portfolio(){
        $categories = Category::with('technologies', 'user')->get();

        return inertia::render('page', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}
