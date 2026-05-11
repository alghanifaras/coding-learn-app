<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = ['name', 'description', 'icon_url', 'xp_reward'];

    public function users()
    {
        // Relasi Many-to-Many ke tabel users melalui tabel pivot user_achievements
        return $this->belongsToMany(User::class, 'user_achievements');
    }
}
