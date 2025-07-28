<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocialResource extends JsonResource
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
            'socials' => $this->socials,
            'description' => $this->description,
            'url' => $this->url,
            'icons' => $this->icons,
            'handle' => $this->handle,
        ];
    }
}
