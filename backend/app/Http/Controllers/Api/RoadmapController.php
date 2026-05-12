<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Roadmap;
use App\Models\Course;
use Illuminate\Http\Request;

class RoadmapController extends Controller
{
    // Mengambil daftar Roadmap beserta Course-nya
    public function index()
    {
        $roadmaps = Roadmap::with('courses')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data roadmap',
            'data' => $roadmaps
        ]);
    }

    // Mengambil Course beserta Section dan Lesson di dalamnya
    public function getCourseLessons($course_id)
    {
        // Kunci utamanya di sini: narik relasi bertingkat (sections, lalu lessons di dalamnya)
        $course = Course::with('sections.lessons')->find($course_id);

        if (!$course) {
            return response()->json(['message' => 'Course tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Berhasil mengambil detail course',
            'data' => $course
        ]);
    }
}
