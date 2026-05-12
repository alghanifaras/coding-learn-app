<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\RoadmapController;
use App\Http\Controllers\Api\LessonController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Jalur yang WAJIB pakai tiket VIP (middleware auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cek data user yang sedang login
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // ENDPOINTS untuk Roadmap dan Course
    Route::get('/roadmaps', [RoadmapController::class, 'index']);
    Route::get('/courses/{course_id}/lessons', [RoadmapController::class, 'getCourseLessons']);
    Route::post('/lessons/{lesson_id}/submit', [LessonController::class, 'submit']);
    Route::post('/store/buy-hearts', [LessonController::class, 'refillHearts']);
});
