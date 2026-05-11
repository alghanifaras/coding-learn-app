<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['roadmap_id', 'name', 'slug', 'description', 'order'];

    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class)->orderBy('order');
    }
}
