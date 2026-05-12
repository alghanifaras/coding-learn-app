cat << 'EOF' > frontend.md

# 🎨 Frontend Architecture (Next.js)

## 📌 Overview

- **Framework:** Next.js app located in `frontend/` (App Router).
- **UI Stack:** React + Tailwind CSS + Framer Motion for micro-interactions.

---

## 📂 Key Files & Components

- **App Layout (`frontend/app/layout.tsx`):** Global fonts and base HTML structure.
- **Home (`frontend/app/page.tsx`):** Initial landing page (currently shows `QuizCard`).
- **Pages:**
  - `frontend/app/login/page.tsx` — Login screen.
  - `frontend/app/register/page.tsx` — Registration screen.
  - `frontend/app/home/page.tsx` — Key screen for the main learning UI (Roadmap).
- **Components (`frontend/src/components/`):**
  - `QuizCard.tsx` — Example question card using `Button3D` and animations.
  - `Button3D.tsx` — Stylized bouncy button with press animation.
  - `Input3D.tsx` — Styled input component.
- **API Client (`frontend/src/lib/axios.ts`):** Axios instance configured with `baseURL: 'http://localhost:8000/api'` and `withCredentials: true`.

---

## 💡 Notes

- **Authentication:** Login/register pages expect the backend to return an `access_token` which the frontend stores (see login/register handlers) and attaches to protected requests.
- **Environment:** The frontend typically runs on Next's dev server (default port `3000`) while the backend runs on Laravel's server (port `8000`).
  EOF
