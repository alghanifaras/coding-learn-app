<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['lesson_id', 'question_text', 'order'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function options()
    {
        return $this->hasMany(QuestionOption::class);
    }
}
