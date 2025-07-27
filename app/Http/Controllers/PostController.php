<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::all();

        return Inertia::render('posts/index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function create(Request $request)
    {
        $posts = Post::all();

        return Inertia::render('posts/create', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request){

        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'section' => 'required',
            'image' => 'required|image'
        ]);

        $data['slug'] = str($data['title'])->slug();

        if ($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $request->user()->posts()->create($data);

        return to_route('posts.index')->with('success', 'Post created Successfully.');

    }

    public function edit(Post $post){

        return inertia('posts/edit', [
           'currentPost' => new PostResource($post),
        ]);

    }

    public function update(Request $request, Post $post){

        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'section' => 'required',
            'image' => 'nullable|image',
        ]);

        $data['slug'] = str($data['title'])->slug();
        $data['image'] = $post->image;

        if ($request->hasFile('image')){
            Storage::disk('public')->delete($post->image);
            $data['image'] = Storage::disk('public')->put('public', $request->file('image'));
        }

        $post->update($data);

        return to_route('posts.index')->with('success', 'Post updated Successfully.');

    }

    public function destroy(Post $post){

        Storage::disk('public')->delete($post->image);
        $post->delete();

        return to_route('posts.index')->with('success', 'Post deleted Successfully.');
    }
}
