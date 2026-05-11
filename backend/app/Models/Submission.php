<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = ['user_id', 'coding_challenge_id', 'submitted_code', 'is_passed'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function challenge()
    {
        return $this->belongsTo(CodingChallenge::class, 'coding_challenge_id');
    }
}
