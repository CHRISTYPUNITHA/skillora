<div align="center">

<img src="client/public/logo_skillora.png" alt="Skillora Logo" height="80" />

# Skillora

**A full-stack online learning platform built with React, Node.js, and PostgreSQL.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=flat-square)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?logo=postgresql&logoColor=white&style=flat-square)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white&style=flat-square)](https://www.prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Reference](#-api-reference) · [Screenshots](#-screenshots)

</div>

---

## ✨ Features

- 🏗️ **Project-based learning** — Hands-on courses with real-world content
- 🔐 **Secure authentication** — JWT via httpOnly cookies (XSS-safe)
- 💳 **Razorpay payments** — Seamless INR course purchases with signature verification
- 📈 **Progress tracking** — Lesson-level completion with automatic percentage calculation
- 🎓 **Certificates** — Auto-issued on 100% course completion
- 📱 **Responsive design** — Works across desktop, tablet, and mobile
- 🌙 **Dark/Light hybrid** — Dark hero landing page + light app pages

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Express.js v5** | REST API server |
| **PostgreSQL** | Relational database |
| **Prisma ORM v7** | Type-safe DB client with migrations |
| **JSON Web Tokens** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **Razorpay SDK** | Payment gateway integration |
| **Zod** | Schema validation |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **React Router DOM v7** | Client-side routing |
| **Axios** | HTTP client (with credentials) |
| **TanStack React Query** | Server state management |
| **React Hook Form + Zod** | Form validation |
| **Tailwind CSS v4** | Utility-first styling |
| **Lucide React** | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **PostgreSQL** 14 or higher (running locally or hosted)
- **Razorpay** account — [Sign up for free](https://razorpay.com/) (test mode works)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skillora.git
cd skillora
```

### 2. Setup the Server

```bash
cd server

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

Open `server/.env` and fill in your values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/skillora"
JWT_SECRET="your_super_secret_jwt_key_here"
JWT_EXPIRES_IN="7d"
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
PORT=3000
NODE_ENV=development
```

```bash
# Run database migrations
npx prisma migrate dev

# (Optional) Seed sample courses and instructor
node seed.js

# Start the dev server
npm run dev
```

> The server starts on **http://localhost:3000**

### 3. Setup the Client

```bash
cd client

# Install dependencies
npm install

# Create your .env file
echo VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx > .env
```

```bash
# Start the dev server
npm run dev
```

> The client starts on **http://localhost:5173**

All `/api` requests are automatically proxied to the backend — no CORS issues in development.

---

## 📁 Project Structure

```
skillora/
├── 📄 README.md
├── 📁 Documents/
│   └── design-spec.md          # UI/UX design tokens & Figma spec
│
├── 📁 client/                  # React frontend (Vite)
│   ├── vite.config.js          # Vite + API proxy config
│   └── src/
│       ├── App.jsx             # Router & app shell
│       ├── context/
│       │   └── AuthContext.jsx # Global auth state
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── CoursesPage.jsx
│       │   ├── CourseDetailPage.jsx
│       │   ├── CheckoutPage.jsx
│       │   ├── MyLearningPage.jsx
│       │   ├── LearnPage.jsx
│       │   ├── PaymentSuccessPage.jsx
│       │   └── auth/           # Login & Signup pages
│       ├── component/ui/       # 9 reusable UI components
│       ├── services/           # Axios API service functions
│       └── utils/              # api.js, ProtectedRoute, cn
│
└── 📁 server/                  # Express.js backend
    ├── server.js               # App entry point
    ├── prisma/
    │   └── schema.prisma       # Database schema (9 models)
    ├── controllers/            # Business logic
    ├── routes/                 # Route definitions
    ├── middlewares/            # JWT auth middleware
    ├── lib/prisma.js           # Prisma client singleton
    └── utils/jwt.token.js      # JWT helpers
```

---

## 🗄 Database Schema

Skillora uses **9 Prisma models** backed by PostgreSQL:

```
user ──────────────────┐
  ├──[1:N]──→ order    │
  ├──[1:N]──→ enrollment
  ├──[1:N]──→ lesson_progress
  ├──[1:N]──→ review   │
  └──[1:N]──→ course (as instructor)

course ────────────────┘
  ├──[1:N]──→ course_module
  │             └──[1:N]──→ lesson
  │                           └──[1:N]──→ lesson_progress
  ├──[1:N]──→ order
  │             └──[1:1]──→ payment
  ├──[1:N]──→ enrollment
  └──[1:N]──→ review
```

**Key enums:** `UserRole` (user | admin) · `OrderStatus` (PENDING | PAID | FAILED | CANCELLED) · `PaymentStatus` (CREATED | SUCCESS | FAILED | REFUNDED) · `EnrollmentStatus` (ACTIVE | COMPLETED | CANCELLED)

---

## 🔌 API Reference

All endpoints are prefixed with `/api/v1`. Protected routes require a valid JWT cookie (`token`).

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login & set JWT cookie |
| `GET` | `/auth/me` | 🔒 | Get current user profile |
| `POST` | `/auth/logout` | 🔒 | Clear session cookie |

### Courses

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/courses` | ❌ | List all courses |
| `GET` | `/courses/:idOrSlug` | ❌ | Get single course with modules & reviews |

### Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/payments/create-order` | 🔒 | Create a Razorpay order |
| `POST` | `/payments/verify` | 🔒 | Verify signature & enroll user |

### Enrollments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/enrollments/my-learning` | 🔒 | Get enrolled courses with progress stats |
| `GET` | `/enrollments/learn/:slug` | 🔒 | Get course content for the player |
| `POST` | `/enrollments/progress` | 🔒 | Mark a lesson as complete |

---

## 🔄 Key Flows

### Payment & Enrollment Flow

```
Checkout Page
  → POST /payments/create-order   (creates Razorpay order, stores PENDING)
  → Razorpay modal opens
  → User pays
  → POST /payments/verify          (verifies HMAC signature)
  → Atomic DB transaction:
      UPDATE order → PAID
      CREATE payment record → SUCCESS
      CREATE enrollment → ACTIVE
  → Redirect to /payment-success
```

### Progress Tracking Flow

```
LearnPage: User clicks "Mark Complete"
  → POST /enrollments/progress  { lessonId, courseId }
  → UPSERT lesson_progress (completed = true)
  → COUNT all completed lessons in course
  → UPDATE enrollment.progressPercent
  → If 100%: enrollment.status = 'COMPLETED', completedAt = now()
```

---

## 📺 Application Pages

| Page | Route | Access |
|---|---|---|
| Landing Page | `/` | Public |
| Course Catalog | `/courses` | Public |
| Course Detail | `/courses/:slug` | Public |
| Login | `/login` | Public |
| Sign Up | `/signup` | Public |
| Checkout | `/checkout/:courseId` | 🔒 Auth |
| Payment Success | `/payment-success` | 🔒 Auth |
| My Learning | `/my-learning` | 🔒 Auth |
| Course Player | `/learn/:slug` | 🔒 Auth |

---

## 🌱 Seed Data

The seed script creates sample data for development:

```bash
cd server
node seed.js
```

**Creates:**
- 👨‍🏫 Instructor: `instructor@skillora.com`
- 📘 Course 1: *Full-Stack Foundations* — ₹799 (8h 20m, 2 modules, 6 lessons)
- ⚛️ Course 2: *React Product Engineering* — ₹999 (6h 40m, 1 module, 3 lessons)

> **Note:** After seeding, register a new user via `/signup` to test the full purchase flow, as the seeded instructor account uses an un-hashed password.

---

## 🎨 Design System

The UI is built on a consistent design token system (see [`Documents/design-spec.md`](Documents/design-spec.md)):

- **Primary color:** Purple `#7C5CFC`
- **Font:** Inter (Google Fonts)
- **Border radius:** 8px · 12px · 16px
- **Dark sections:** Navy `#100D2E` (landing hero, auth pages)
- **Light sections:** Gray `#F5F6FA` (app pages)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  Built with ❤️ using React, Express, and PostgreSQL
</div>