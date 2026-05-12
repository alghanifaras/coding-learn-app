cat << 'EOF' > backend.md

# ⚙️ Backend Architecture (Laravel & Filament)

## 📌 Overview

- **Framework:** Laravel (inside the `backend/` directory)
- **Architecture:** Headless CMS (Provides API for Next.js, uses Filament for Admin UI)
- **Entry points:** `backend/public/index.php` and Artisan CLI
- **Database:** PostgreSQL / MySQL (Configured via `.env`)

---

## 🗄️ Database Schema & Relationships

Aplikasi ini menggunakan struktur relasional untuk mengelola pengguna, materi belajar, dan progres _gamifikasi_.

### 1. Users & Gamification

- **`users`**
  - Columns: `id`, `name`, `email`, `password`, `role` (admin/student), `total_xp`, `level`, `hearts`.
  - Relations: Has Many `user_progress`.

### 2. Core Learning Content

- **`roadmaps`** (Jalur utama, misal: "Frontend Developer")
  - Columns: `id`, `title`, `description`.
  - Relations: Has Many `courses`.

- **`courses`** (Kelas dalam roadmap, misal: "HTML Dasar")
  - Columns: `id`, `roadmap_id`, `title`, `description`, `order`.
  - Relations: Belongs To `roadmaps`, Has Many `lessons`.

- **`lessons`** (Titik-titik materi pada UI)
  - Columns: `id`, `course_id`, `title`, `type` (slide/quiz/coding), `content`, `order`, `xp_reward`.
  - Relations: Belongs To `courses`, Has Many `user_progress`.

### 3. Tracking & Progress

- **`user_progress`** (Mencatat lesson mana yang sudah diselesaikan)
  - Columns: `id`, `user_id`, `lesson_id`, `status` (locked/completed), `score`.
  - Relations: Belongs To `users`, Belongs To `lessons`.

---

## 📂 Key Files & Directories

- **Routes (`backend/routes/api.php`):** Contains all endpoints consumed by the Next.js frontend. Protected routes are wrapped in the `auth:sanctum` middleware.
- **Controllers (`backend/app/Http/Controllers/Api/`):**
  - `AuthController.php` — Handles registration, login, logout, and token creation.
- **Models (`backend/app/Models/`):**
  - `User.php` — Includes `HasApiTokens` for Sanctum authentication. Manages gamification stats.
- **Seeders (`backend/database/seeders/`):**
  - `DatabaseSeeder.php` — Creates sample users and initial dummy data for testing.

---

## 🛡️ Authentication (Laravel Sanctum)

- We use **Token-based Authentication** via Laravel Sanctum.
- Upon successful login/register, the backend generates a Plain Text Token using `$user->createToken('auth_token')->plainTextToken`.
- This token is returned in the JSON response and must be attached by the frontend in the `Authorization: Bearer <token>` header for all protected requests.

---

## 👑 Admin Panel (Filament)

- The backend also serves as a robust admin panel managed by **Filament PHP**.
- **Access:** `http://localhost:8000/admin`
- **Purpose:** Used by instructors/admins to create Roadmaps, Courses, and Lessons without touching code. The Next.js frontend simply consumes this content via API.

---

## 🚀 Quick Start & Useful Commands

Make sure your `.env` is properly configured (`DB_CONNECTION`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`), then run these commands to prepare the environment:

1. **Install dependencies:**
   composer install

2. **Run migrations and seed the database:**
   php artisan migrate:fresh --seed

3. **Start the local server:**
   php artisan serve
   EOF
