cat << 'EOF' > api.md

# API Reference

**Base URL:** `http://localhost:8000/api`

---

## 🔐 Authentication Config

- Controllers create personal access tokens via `$user->createToken('auth_token')->plainTextToken`.
- The frontend stores the token (example: saved to `localStorage` in the current app).
- **CRITICAL:** Frontend must include the token in the header for protected requests:
  `Authorization: Bearer <token>`
- _Alternative:_ When using cookie-based Sanctum SPA authentication instead of tokens, `withCredentials: true` in Axios and proper CORS/cookie setup in Laravel are required.

---

## 👤 Auth Endpoints

### `POST /register`

Creates a new student account.

- **Body Request:**

  {
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123"
  }

- **Success Response (200 OK):**

  {
  "message": "Berhasil mendaftar!",
  "access_token": "1|abcdef1234567890...",
  "user": {
  "id": 1,
  "name": "Student Name",
  "email": "student@example.com",
  "role": "student",
  "total_xp": 0,
  "level": 1,
  "hearts": 5
  }
  }

### `POST /login`

Authenticates a user and returns an access token.

- **Body Request:**

  {
  "email": "student@example.com",
  "password": "password123"
  }

- **Success Response (200 OK):** JSON including an `access_token` and `user` object (Same structure as Register).
- **Error Response (401 Unauthorized):** {
  "message": "Email atau password salah nih."
  }

### `POST /logout` (Protected)

- **Requires:** `auth:sanctum` middleware.
- **Description:** Invalidates the current access token and logs out the user.
- **Success Response (200 OK):** {
  "message": "Berhasil logout"
  }

### `GET /me` (Protected)

- **Requires:** `auth:sanctum` middleware.
- **Description:** Returns the currently authenticated user object. Used by frontend on initial load to get current hearts, XP, and session validity.
- **Success Response (200 OK):** Returns the raw `user` object.

---

## 📚 Core Content Endpoints (Planned / WIP)

_(Note for Frontend: These endpoints are currently under development. Use dummy data for UI testing until these are live)._

### `GET /roadmaps`

- **Description:** Fetches the list of available learning roadmaps/courses.

### `GET /courses/{course_id}/lessons` (Protected)

- **Description:** Retrieves the list of lessons (nodes) for a specific course to render the learning path UI.

### `GET /lessons/{lesson_id}` (Protected)

- **Description:** Retrieves the content of a specific lesson (theory slides, quiz questions, or coding challenges).

### `POST /lessons/{lesson_id}/submit` (Protected)

- **Body Request:** `{ "answer": "user_answer" }` or `{ "code": "user_code" }`
- **Description:** Submits the user's answer/code for validation.
- **Response:** JSON indicating `is_correct` (boolean), updated `hearts`, updated `total_xp`, and the next unlocking node.
  EOF
