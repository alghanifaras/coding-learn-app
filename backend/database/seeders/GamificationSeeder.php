<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roadmap;
use App\Models\Course;
use App\Models\Section;
use App\Models\Lesson;

class GamificationSeeder extends Seeder
{
    public function run()
    {
        // 1. Buat Roadmap (Gunakan 'name' bukan 'title')
        $roadmap = Roadmap::create([
            'name' => 'Frontend Developer',
            'slug' => 'frontend-developer',
            'description' => 'Jalur utama menjadi master UI/UX dan React.'
        ]);

        // 2. Buat Course (Gunakan 'name')
        $course = Course::create([
            'roadmap_id' => $roadmap->id,
            'name' => 'HTML & CSS Dasar',
            'slug' => 'html-css-dasar',
            'description' => 'Belajar fondasi utama tampilan website.',
            'order' => 1
        ]);

        // 3. Buat Section (Ini yang tertinggal kemarin)
        $section = Section::create([
            'course_id' => $course->id,
            'name' => 'Unit 1: Perkenalan Web',
            'order' => 1
        ]);

        // 4. Buat Lessons (Gunakan 'section_id' dan 'title')
        $lessons = [
            ['title' => 'Dasar HTML', 'type' => 'slide', 'xp_reward' => 10, 'order' => 1],
            ['title' => 'Tag Paragraf', 'type' => 'quiz', 'xp_reward' => 15, 'order' => 2],
            ['title' => 'Heading', 'type' => 'quiz', 'xp_reward' => 15, 'order' => 3],
            ['title' => 'List & Link', 'type' => 'coding', 'xp_reward' => 25, 'order' => 4],
            ['title' => 'Ujian Akhir', 'type' => 'quiz', 'xp_reward' => 50, 'order' => 5],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create([
                'section_id' => $section->id, // Menggunakan section_id sesuai koreksimu
                'title' => $lesson['title'],
                'type' => $lesson['type'],
                'xp_reward' => $lesson['xp_reward'],
                'order' => $lesson['order'],
                'is_published' => true
            ]);
        }
    }
}
