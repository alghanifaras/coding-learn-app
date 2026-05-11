<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = ['section_id', 'title', 'xp_reward', 'order', 'type', 'is_published'];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function slides()
    {
        return $this->hasMany(LessonSlide::class)->orderBy('order');
    }

    public function questions()
    {
        return $this->hasMany(Question::class)->orderBy('order');
    }

    public function codingChallenge()
    {
        return $this->hasOne(CodingChallenge::class);
    }
}
