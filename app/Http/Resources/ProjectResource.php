<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'github' => $this->github,
            'live' => $this->live,
            'featured' => $this->featured,
            'stats_users' => $this->stats_users,
            'stats_rating' => $this->stats_rating,
            'image' => asset('storage/' . $this->image),
            'technologies' => $this->technologies->map(fn($tech) => [
                'id' => $tech->id,
                'name' => $tech->name,
            ])
        ];
    }
}
