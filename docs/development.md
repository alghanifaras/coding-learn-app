# Development / Run locally

Backend (Laravel)

1. Install dependencies

```bash
cd backend
composer install
```

2. Copy `.env` and configure DB

```bash
cp .env.example .env
# Update DB_* values in backend/.env (Postgres example in repo)
php artisan key:generate
```

3. Run migrations and seeders

```bash
php artisan migrate
php artisan db:seed
```

4. Start server

```bash
php artisan serve --port=8000
```

Frontend (Next.js)

1. Install dependencies

```bash
cd frontend
pnpm install
# or: npm install
```

2. Start dev server

```bash
pnpm dev
# frontend runs on http://localhost:3000 by default
```

Notes & tips

- Default seeded user: `hikmal@example.com` / `password` (see `backend/database/seeders/DatabaseSeeder.php`).
- Ensure `backend/.env` DB credentials match your local Postgres setup.
- If using Sanctum cookie-based auth, configure CORS and `SANCTUM_STATEFUL_DOMAINS` accordingly.
