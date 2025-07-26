<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
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
            'job_title' => $this->job_title,
            'company' => $this->company,
            'period_from' => $this->period_from,
            'period_to' => $this->period_to,
            'description' => $this->description,
            'technologies' => $this->technologies->map(fn($tech) => [
                'id' => $tech->id,
                'name' => $tech->name,
            ])
        ];
    }
}
