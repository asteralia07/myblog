<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Achievement extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'icon', 'description', 'year', 'slug', 'image', 'url', 'user_id'
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
