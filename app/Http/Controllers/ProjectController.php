<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Technology;
use App\Http\Resources\TechnologyResource;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::with('technologies', 'user')->get();

        return Inertia::render('projects/index', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    public function create(Request $request)
    {
        $technologies = Technology::all();

        return Inertia::render('projects/create', [
            'technologies' => $technologies
        ]);
    }

    public function store(Request $request){

        $data = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'required|string',
            'github'         => 'nullable|url',
            'live'           => 'nullable|url',
            'featured'       => 'boolean',
            'stats_users'    => 'nullable|string|max:255',
            'stats_rating'   => 'nullable|numeric',
        ]);


        $data['slug'] = str($data['title'])->slug();

        if ($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project = $request->user()->projects()->create($data);
        $project->technologies()->sync($request->technologies ?? []);

        return to_route('projects.index')->with('success', 'Project created Successfully.');

    }

    public function edit(Project $project){

        $technologies = Technology::all();
        $project->load('technologies');

        return inertia('projects/edit', [
            'currentProject' => new ProjectResource($project),
            'currentTechnology' => TechnologyResource::collection($technologies),
        ]);

    }

    public function update(Request $request, Project $project){

        $data = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'required|string',
            'github'         => 'nullable|url',
            'live'           => 'nullable|url',
            'featured'       => 'boolean',
            'stats_users'    => 'nullable|string|max:255',
            'stats_rating'   => 'nullable|numeric|between:0,9.9',
        ]);

        $data['slug'] = str($data['title'])->slug();
        $data['image'] = $project->image;

        if ($request->hasFile('image')){
            Storage::disk('public')->delete($project->image);
            $data['image'] = Storage::disk('public')->put('public', $request->file('image'));
        }

        $project->update($data);
        $project->technologies()->sync($request->technologies ?? []);

        return to_route('projects.index')->with('success', 'Project updated Successfully.');

    }

    public function destroy(Project $Project){

        Storage::disk('public')->delete($Project->image);
        $Project->delete();

        return to_route('projects.index')->with('success', 'Project deleted Successfully.');
    }
}
