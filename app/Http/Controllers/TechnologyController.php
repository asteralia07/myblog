<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechnologyResource;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $technologies = Technology::all();

        return inertia::render('technologies/index', [
            'technologies' => TechnologyResource::collection($technologies),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $technologies = Technology::all();

        return Inertia::render('technologies/create', [
            'technologies' => $technologies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
           'name' => 'required'
        ]);

        $request->user()->technologies()->create($data);

        return to_route('technologies.index')->with('success', 'Technology created Successfully.');
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
    public function edit(Technology $technology)
    {
        return inertia('technologies/edit', [
            'currentTechnology' => new TechnologyResource($technology),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Technology $technology)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);

        $technology->update($data);

        return to_route('technologies.index')->with('success', 'Technology Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {

        $technology->delete();

        return to_route('technologies.index')->with('success', 'Technology deleted Successfully.');
    }
}
