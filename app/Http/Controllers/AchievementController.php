<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AchievementResource;
use App\Models\Achievement;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Technology;
use App\Http\Resources\TechnologyResource;


class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $achievements = Achievement::with('technologies', 'user')->get();

        return Inertia::render('achievements/index', [
            'achievements' => AchievementResource::collection($achievements),
        ]);
    }

    public function create(Request $request)
    {
        $technologies = Technology::all();

        return Inertia::render('achievements/create', [
            'technologies' => $technologies
        ]);
    }

    public function store(Request $request){


        $data = $request->validate([
            'title' => 'required',
            'icon' => 'required',
            'description' => 'required',
            'year' => 'required',
            'image' => 'required|image',
            'url' => 'nullable',
        ]);


        $data['slug'] = str($data['title'])->slug();

        if ($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('achievements', 'public');
        }

        $achievement = $request->user()->achievements()->create($data);
        $achievement->technologies()->sync($request->technologies ?? []);

        return to_route('achievements.index')->with('success', 'Achievement created Successfully.');

    }

    public function edit(Achievement $achievement){

        $technologies = Technology::all();
        $achievement->load('technologies');

        return inertia('achievements/edit', [
            'currentAchievement' => new AchievementResource($achievement),
            'currentTechnology' => TechnologyResource::collection($technologies),
        ]);

    }

    public function update(Request $request, Achievement $achievement){

        $data = $request->validate([
            'title' => 'required',
            'icon' => 'required',
            'description' => 'required',
            'year' => 'required',
            'url' => 'nullable',
            // 'image' => 'required|image'
        ]);

        $data['slug'] = str($data['title'])->slug();
        $data['image'] = $achievement->image;

        if ($request->hasFile('image')){
            Storage::disk('public')->delete($achievement->image);
            $data['image'] = Storage::disk('public')->put('public', $request->file('image'));
        }

        $achievement->update($data);
        $achievement->technologies()->sync($request->technologies ?? []);

        return to_route('achievements.index')->with('success', 'achievement updated Successfully.');

    }

    public function destroy(Achievement $achievement){

        Storage::disk('public')->delete($achievement->image);
        $achievement->delete();

        return to_route('achievements.index')->with('success', 'Achievement deleted Successfully.');
    }
}
