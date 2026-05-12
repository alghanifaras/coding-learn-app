<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GamificationService;

class LessonController extends Controller
{
    protected $gamificationService;

    // Inject "Koki" (Service) ke dalam "Pelayan" (Controller)
    public function __construct(GamificationService $gamificationService)
    {
        $this->gamificationService = $gamificationService;
    }

    public function submit(Request $request, $lesson_id)
    {
        // 1. Validasi simpel (Pastikan frontend ngirim data 'is_correct' berupa boolean true/false)
        $request->validate([
            'is_correct' => 'required|boolean'
        ]);

        // 2. Oper tugas beratnya ke Service
        $result = $this->gamificationService->submitLesson(
            $request->user(),
            $lesson_id,
            $request->is_correct
        );

        // 3. Kembalikan hasil masakannya ke Frontend
        return response()->json($result);
    }

    public function refillHearts(Request $request)
    {
        $result = $this->gamificationService->buyHearts($request->user());

        // Kalau gagal (gems kurang/nyawa penuh), kita kasih status 400 Bad Request
        if (!$result['success']) {
            return response()->json($result, 400);
        }

        return response()->json($result);
    }
}
