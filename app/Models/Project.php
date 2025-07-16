<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'description', 'image', 'github', 'live', 'featured',
        'stats_users', 'stats_rating', 'user_id'
    ];

    public function technologies()
    {
        return $this->belongsToMany(Technology::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
