<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonSlide extends Model
{
    protected $fillable = ['lesson_id', 'content', 'order'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
