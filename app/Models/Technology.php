<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Technology extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'user_id'];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function experiences()
    {
        return $this->belongsToMany(Experience::class);
    }

    public function achievements()
    {
        return $this->belongsToMany(Achievement::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
