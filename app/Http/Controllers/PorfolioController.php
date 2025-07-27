<?php

namespace App\Http\Controllers;

use App\Http\Resources\AchievementResource;
use App\Http\Resources\ExperienceResource;
use App\Models\Achievement;
use App\Models\Experience;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;

class PorfolioController extends Controller
{
    public  function portfolio(){
        $profile = Post::findOrFail(1);
        $categories = Category::with('technologies', 'user')->get();
        $experiences = Experience::with('technologies', 'user')->orderby('id', 'desc')->get();
        $achievements = Achievement::with('technologies', 'user')->orderby('year', 'desc')->get();

        return inertia::render('page', [
            'profile' => new PostResource($profile),
            'categories' => CategoryResource::collection($categories),
            'experiences' => ExperienceResource::collection($experiences),
            'achievements' => AchievementResource::collection($achievements)
        ]);
    }
}
