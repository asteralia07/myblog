<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Social extends Model
{
    use SoftDeletes;

    protected $fillable = ['socials', 'description', 'url', 'icons', 'handle', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
