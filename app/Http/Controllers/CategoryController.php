<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\TechnologyResource;
use Illuminate\Http\Request;
use App\Models\Category;
use Auth;
use Inertia\Inertia;
use App\Models\Technology;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('technologies', 'user')->get();

        return inertia::render('categories/index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $technologies = Technology::all();

        return Inertia::render('categories/create', [
            'technologies' => $technologies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'technologies' => 'array|exists:technologies,id',
        ]);

        $validated['user_id'] = Auth::id();

        $category = Category::create($validated);
        $category->technologies()->sync($request->technologies ?? []);

        return to_route('categories.index')->with('success', 'Category created Successfully.');
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
    public function edit(Category $category)
    {
        $technologies = Technology::all();
        $category->load('technologies');

        return inertia('categories/edit', [
            'currentCategory' => new CategoryResource($category),
            'currentTechnology' => TechnologyResource::collection($technologies),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'technologies' => 'array|exists:technologies,id',
        ]);

        $category->update($validated);
        $category->technologies()->sync($request->technologies ?? []);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
