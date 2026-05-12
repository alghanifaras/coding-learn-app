<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\UserProgress;
use Illuminate\Support\Facades\DB;

class GamificationService
{
    public function submitLesson($user, $lessonId, $isCorrect)
    {
        if ($user->hearts <= 0) {
            return [
                'success' => false,
                'message' => 'Nyawa kamu habis! Tunggu beberapa saat untuk bermain lagi.',
                'hearts' => 0,
                'xp_awarded' => 0,
                'leveled_up' => false,
                'current_level' => $user->level
            ];
        }

        $lesson = Lesson::findOrFail($lessonId);

        if (!$isCorrect) {
            $user->decrement('hearts');
            return [
                'success' => false,
                'message' => 'Yaaah, kurang tepat. Nyawamu berkurang 1!',
                'hearts' => $user->hearts,
                'xp_awarded' => 0,
                'leveled_up' => false,
                'current_level' => $user->level
            ];
        }

        $progress = UserProgress::where('user_id', $user->id)
                                ->where('lesson_id', $lessonId)
                                ->first();

        if ($progress && $progress->status === 'completed') {
            return [
                'success' => true,
                'message' => 'Kamu sudah menyelesaikan materi ini sebelumnya.',
                'xp_awarded' => 0,
                'total_xp' => $user->total_xp,
                'hearts' => $user->hearts,
                'leveled_up' => false,
                'current_level' => $user->level
            ];
        }

        $leveledUp = false;

        DB::transaction(function () use ($user, $lesson, &$leveledUp) {
            UserProgress::updateOrCreate(
                ['user_id' => $user->id, 'lesson_id' => $lesson->id],
                ['status' => 'completed', 'score' => 100]
            );

            $user->increment('total_xp', $lesson->xp_reward);
            
            // Anggap saja dapat hadiah 5 gems tiap selesai lesson baru
            $user->increment('gems', 5);

            $newLevel = floor($user->total_xp / 100) + 1;
            
            if ($newLevel > $user->level) {
                $user->level = $newLevel;
                $user->hearts = 5;
                $user->save();
                $leveledUp = true;
            }
        });

        $freshUser = $user->fresh();

        return [
            'success' => true,
            'message' => $leveledUp 
                ? "LUAR BIASA! Kamu naik ke Level {$freshUser->level} dan nyawamu penuh lagi!" 
                : "Hebat! Kamu dapat {$lesson->xp_reward} XP dan 5 Gems!",
            'xp_awarded' => $lesson->xp_reward,
            'total_xp' => $freshUser->total_xp,
            'hearts' => $freshUser->hearts,
            'gems' => $freshUser->gems,
            'leveled_up' => $leveledUp,
            'current_level' => $freshUser->level
        ];
    }

    // --- FITUR BARU: BELI NYAWA ---
    public function buyHearts($user)
    {
        $cost = 50; // Harga untuk mengembalikan nyawa jadi penuh (5)

        if ($user->hearts >= 5) {
            return [
                'success' => false,
                'message' => 'Nyawa kamu masih penuh kok, simpan saja Gems-nya!'
            ];
        }

        if ($user->gems < $cost) {
            return [
                'success' => false,
                'message' => "Yah, Gems kamu kurang. Butuh $cost Gems untuk memulihkan nyawa."
            ];
        }

        // Proses pembayaran
        $user->decrement('gems', $cost);
        $user->hearts = 5;
        $user->save();

        return [
            'success' => true,
            'message' => 'Berhasil! Nyawa kamu sudah kembali penuh.',
            'hearts' => $user->hearts,
            'gems' => $user->gems
        ];
    }
}
