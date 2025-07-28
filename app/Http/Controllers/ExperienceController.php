<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Experience;
use App\Models\Technology;
use Inertia\Inertia;
use App\Http\Resources\ExperienceResource;
use Auth;
use App\Http\Resources\TechnologyResource;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experiences = Experience::with('technologies', 'user')->get();

        return inertia::render('experiences/index', [
            'experiences' => ExperienceResource::collection($experiences),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $technologies = Technology::all();

        return Inertia::render('experiences/create', [
            'technologies' => $technologies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required',
            'company' => 'required',
            'period_from' => 'required|date|before_or_equal:period_to',
            'period_to' => 'nullable|date|after_or_equal:period_from',
            'description' => 'required',
            'technologies' => 'array|exists:technologies,id',
        ]);

        $validated['user_id'] = Auth::id();

        $experience = Experience::create($validated);
        $experience->technologies()->sync($request->technologies ?? []);

        return to_route('experiences.index')->with('success', 'Experience created Successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Experience $experience)
    {
        $technologies = Technology::all();
        $experience->load('technologies');

        return inertia('experiences/edit', [
            'currentExperience' => new ExperienceResource($experience),
            'currentTechnology' => TechnologyResource::collection($technologies),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'job_title' => 'required',
            'company' => 'required',
            'period_from' => 'required|date',
            'period_to' => 'nullable|date',
            'description' => 'required',
            'technologies' => 'array|exists:technologies,id',
        ]);

        $experience->update($validated);
        $experience->technologies()->sync($request->technologies ?? []);

        return redirect()->route('experiences.index')->with('success', 'Experience updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Experience $experience)
    {
        $experience->delete();
        return redirect()->route('experiences.index')->with('success', 'Experience deleted successfully.');
    }
}
