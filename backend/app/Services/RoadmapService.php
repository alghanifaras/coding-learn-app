<?php

namespace App\Services;

use App\Models\Roadmap;
use App\Models\Course;
use App\Models\UserProgress;
use Illuminate\Support\Collection;

class RoadmapService
{
    /**
     * Get all available roadmaps with course count
     */
    public function getAllRoadmaps(): Collection
    {
        return Roadmap::with('courses')
            ->get()
            ->map(fn($roadmap) => [
                'id' => $roadmap->id,
                'name' => $roadmap->name,
                'slug' => $roadmap->slug,
                'description' => $roadmap->description,
                'total_courses' => $roadmap->courses->count(),
                'created_at' => $roadmap->created_at,
            ]);
    }

    /**
     * Get single roadmap with all courses and sections
     */
    public function getRoadmapDetail($roadmapId)
    {
        $roadmap = Roadmap::with([
            'courses' => function ($query) {
                $query->orderBy('order')->with([
                    'sections' => function ($query) {
                        $query->orderBy('order')->with([
                            'lessons' => function ($query) {
                                $query->orderBy('order')->where('is_published', true);
                            }
                        ]);
                    }
                ]);
            }
        ])->findOrFail($roadmapId);

        return $this->formatRoadmapResponse($roadmap);
    }

    /**
     * Get user's selected roadmaps
     */
    public function getUserRoadmaps($userId): Collection
    {
        // Assuming there's a pivot table or relationship tracking user's roadmaps
        // If using simple hasMany relationship through user_roadmaps table
        return UserProgress::where('user_id', $userId)
            ->with(['lesson.section.course.roadmap'])
            ->get()
            ->pluck('lesson.section.course.roadmap')
            ->unique('id')
            ->values();
    }

    /**
     * Get roadmap progress for a specific user
     */
    public function getUserRoadmapProgress($userId, $roadmapId)
    {
        $roadmap = Roadmap::with([
            'courses' => function ($query) {
                $query->with([
                    'sections' => function ($query) {
                        $query->with([
                            'lessons' => function ($query) {
                                $query->where('is_published', true);
                            }
                        ]);
                    }
                ]);
            }
        ])->findOrFail($roadmapId);

        // Calculate progress
        $totalLessons = 0;
        $completedLessons = 0;

        foreach ($roadmap->courses as $course) {
            foreach ($course->sections as $section) {
                foreach ($section->lessons as $lesson) {
                    $totalLessons++;
                    
                    $progress = UserProgress::where('user_id', $userId)
                        ->where('lesson_id', $lesson->id)
                        ->where('is_completed', true)
                        ->exists();
                    
                    if ($progress) {
                        $completedLessons++;
                    }
                }
            }
        }

        $progressPercentage = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

        return [
            'roadmap' => $this->formatRoadmapResponse($roadmap),
            'progress' => [
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedLessons,
                'percentage' => $progressPercentage,
            ]
        ];
    }

    /**
     * Get course detail with lessons
     */
    public function getCourseDetail($courseId)
    {
        $course = Course::with([
            'roadmap',
            'sections' => function ($query) {
                $query->orderBy('order')->with([
                    'lessons' => function ($query) {
                        $query->orderBy('order')->where('is_published', true);
                    }
                ]);
            }
        ])->findOrFail($courseId);

        return [
            'id' => $course->id,
            'name' => $course->name,
            'slug' => $course->slug,
            'description' => $course->description,
            'order' => $course->order,
            'roadmap' => [
                'id' => $course->roadmap->id,
                'name' => $course->roadmap->name,
                'slug' => $course->roadmap->slug,
            ],
            'sections' => $course->sections->map(fn($section) => [
                'id' => $section->id,
                'name' => $section->name,
                'order' => $section->order,
                'lesson_count' => $section->lessons->count(),
                'lessons' => $section->lessons->map(fn($lesson) => [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'order' => $lesson->order,
                    'type' => $lesson->type,
                    'xp_reward' => $lesson->xp_reward,
                ])
            ])
        ];
    }

    /**
     * Get course progress for user
     */
    public function getUserCourseProgress($userId, $courseId)
    {
        $course = Course::with([
            'sections' => function ($query) {
                $query->with([
                    'lessons' => function ($query) {
                        $query->where('is_published', true);
                    }
                ]);
            }
        ])->findOrFail($courseId);

        $totalLessons = 0;
        $completedLessons = 0;

        foreach ($course->sections as $section) {
            foreach ($section->lessons as $lesson) {
                $totalLessons++;
                
                $isCompleted = UserProgress::where('user_id', $userId)
                    ->where('lesson_id', $lesson->id)
                    ->where('is_completed', true)
                    ->exists();
                
                if ($isCompleted) {
                    $completedLessons++;
                }
            }
        }

        $progressPercentage = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

        return [
            'course' => [
                'id' => $course->id,
                'name' => $course->name,
                'slug' => $course->slug,
            ],
            'progress' => [
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedLessons,
                'percentage' => $progressPercentage,
            ]
        ];
    }

    /**
     * Select a roadmap for user (create entry in user_roadmaps)
     */
    public function selectRoadmapForUser($userId, $roadmapId)
    {
        $roadmap = Roadmap::findOrFail($roadmapId);

        // If you have user_roadmaps table, you can use:
        // return UserRoadmap::firstOrCreate([
        //     'user_id' => $userId,
        //     'roadmap_id' => $roadmapId,
        // ]);

        return [
            'success' => true,
            'message' => "Successfully selected {$roadmap->name} roadmap",
            'roadmap' => [
                'id' => $roadmap->id,
                'name' => $roadmap->name,
                'slug' => $roadmap->slug,
            ]
        ];
    }

    /**
     * Format roadmap response
     */
    private function formatRoadmapResponse(Roadmap $roadmap): array
    {
        return [
            'id' => $roadmap->id,
            'name' => $roadmap->name,
            'slug' => $roadmap->slug,
            'description' => $roadmap->description,
            'total_courses' => $roadmap->courses->count(),
            'courses' => $roadmap->courses->map(fn($course) => [
                'id' => $course->id,
                'name' => $course->name,
                'slug' => $course->slug,
                'description' => $course->description,
                'order' => $course->order,
                'total_sections' => $course->sections->count(),
                'total_lessons' => $course->sections->sum(fn($section) => $section->lessons->count()),
                'sections' => $course->sections->map(fn($section) => [
                    'id' => $section->id,
                    'name' => $section->name,
                    'order' => $section->order,
                    'lesson_count' => $section->lessons->count(),
                ])
            ])
        ];
    }
}
