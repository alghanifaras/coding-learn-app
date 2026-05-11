<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roadmap extends Model
{
    protected $fillable = ['name', 'slug', 'description'];

    public function courses()
    {
        return $this->hasMany(Course::class)->orderBy('order');
    }
}
