<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CodingChallenge extends Model
{
    protected $fillable = ['lesson_id', 'description', 'language', 'initial_code'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function testCases()
    {
        return $this->hasMany(TestCase::class);
    }
}
