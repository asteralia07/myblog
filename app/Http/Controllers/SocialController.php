<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Social;
use App\Http\Resources\SocialResource;

class SocialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socials = Social::all();

        return inertia::render('socials/index', [
            'socials' => SocialResource::collection($socials),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $socials = Social::all();

        return Inertia::render('socials/create', [
            'socials' => $socials
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'socials' => 'required',
            'description' => 'required',
            'url' => 'required',
            'icons' => 'required',
            'handle' => 'required',
        ]);

        $request->user()->socials()->create($data);

        return to_route('socials.index')->with('success', 'Social created Successfully.');
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
    public function edit(Social $social)
    {
        return inertia('socials/edit', [
            'currentSocial' => new SocialResource($social),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Social $social)
    {
        $data = $request->validate([
            'socials' => 'required',
            'description' => 'required',
            'url' => 'required',
            'icons' => 'required',
            'handle' => 'required',
        ]);

        $social->update($data);

        return to_route('socials.index')->with('success', 'Social Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Social $social)
    {

        $social->delete();

        return to_route('socials.index')->with('success', 'Social deleted Successfully.');
    }
}
