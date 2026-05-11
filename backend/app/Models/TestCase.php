<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestCase extends Model
{
    protected $fillable = ['coding_challenge_id', 'input', 'expected_output', 'is_hidden'];

    public function codingChallenge()
    {
        return $this->belongsTo(CodingChallenge::class);
    }
}
