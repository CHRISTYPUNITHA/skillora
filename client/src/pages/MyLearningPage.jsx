/**
 * MyLearningPage.jsx
 * Route: /my-learning
 *
 * Two-column learning dashboard:
 *   Left  — enrolled course cards with progress bars
 *   Right — circular overall-progress widget + stats
 *
 * Styling: 100% Tailwind CSS v4 — no raw CSS / .css imports
 * Components: Button, Card, CardContent, Badge, Tabs, ProgressBar, CircularProgress
 */

import { Link } from "react-router-dom"
import {
  BookOpen,
  Award,
  Clock,
  LayoutDashboard,
  GraduationCap,
  PlayCircle,
  Flame,
  Bell,
} from "lucide-react"
import { Button } from "../component/ui/Button"
import { Badge } from "../component/ui/Badge"
import { Card, CardContent } from "../component/ui/Card"
import { ProgressBar } from "../component/ui/ProgressBar"
import { CircularProgress } from "../component/ui/CircularProgress"
import { Divider } from "../component/ui/Divider"
import { LightNavbar as TopNav } from "./CoursesPage"

/* ─── Static data ─────────────────────────────────────── */
const ENROLLED_COURSES = [
  {
    id: 1,
    title: "Full-Stack Foundations",
    level: "Beginner to Intermediate",
    progress: 72,
    lessonsCompleted: 23,
    totalLessons: 32,
    duration: "8h 20m",
    thumbnail: "bg-gradient-to-br from-[#100D2E] to-[#6C4CF0]",
    lastLesson: "Database Design and Prisma ORM",
    slug: "full-stack-foundations",
  },
  {
    id: 2,
    title: "React Product Engineering",
    level: "Intermediate",
    progress: 35,
    lessonsCompleted: 11,
    totalLessons: 28,
    duration: "6h 40m",
    thumbnail: "bg-gradient-to-br from-[#0E3B2E] to-[#14B87F]",
    lastLesson: "State Management with Zustand",
    slug: "react-product-engineering",
  },
  {
    id: 3,
    title: "Node.js API Architecture",
    level: "Intermediate",
    progress: 10,
    lessonsCompleted: 3,
    totalLessons: 26,
    duration: "7h 10m",
    thumbnail: "bg-gradient-to-br from-[#2A1A00] to-[#E8A33D]",
    lastLesson: "RESTful API Design Principles",
    slug: "nodejs-api-architecture",
  },
]

const STATS = [
  { label: "Completed Lessons", value: 18, icon: BookOpen,        color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Total Lessons",     value: 34, icon: GraduationCap,   color: "text-blue-600",   bg: "bg-blue-50" },
  { label: "Certificates",      value: 1,  icon: Award,           color: "text-amber-600",  bg: "bg-amber-50" },
]

const NAV_TABS = [
  { label: "Courses",      href: "/courses" },
  { label: "My Learning",  href: "/my-learning" },
]

const OVERALL_PROGRESS = 53

/* ─── Sub-components ──────────────────────────────────── */

/** Enrolled course card */
function CourseCard({ course }) {
  const {
    title, level, progress, lessonsCompleted, totalLessons,
    duration, thumbnail, lastLesson, slug,
  } = course

  return (
    <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">

          {/* Thumbnail */}
          <div
            className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center ${thumbnail} shadow-md`}
          >
            <PlayCircle className="w-7 h-7 text-white/90" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{level}</p>
              </div>
              <Link to={`/courses/${slug}`}>
                <Button
                  id={`continue-${slug}`}
                  size="sm"
                  className="flex-shrink-0 text-xs bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-sm hover:scale-[1.02] transition-all"
                >
                  Continue
                </Button>
              </Link>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <ProgressBar
                value={progress}
                color="bg-gradient-to-r from-purple-500 to-purple-400"
                size="md"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                {progress}% complete · {lessonsCompleted}/{totalLessons} lessons
              </p>
            </div>

            {/* Last lesson hint */}
            <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Last: {lastLesson}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/** Stat pill in the right panel */
function StatRow({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-bold text-gray-900">{value}</span>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────── */
export default function MyLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopNav />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Learning
          </h1>
          <p className="text-sm text-gray-400 mt-1">Your enrolled courses</p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* ── LEFT — Course list ── */}
          <div className="space-y-4">
            {ENROLLED_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* ── RIGHT — Progress sidebar ── */}
          <div className="space-y-4">

            {/* Overall progress card */}
            <Card className="shadow-sm border-gray-100">
              <CardContent className="p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-5">
                  Learning Progress
                </h2>

                {/* Circular chart */}
                <div className="flex flex-col items-center py-2">
                  <CircularProgress
                    value={OVERALL_PROGRESS}
                    size={140}
                    stroke={12}
                    trackColor="#EEF0F6"
                    fillColor="#7C5CFC"
                  >
                    <span className="text-2xl font-extrabold text-gray-900">
                      {OVERALL_PROGRESS}%
                    </span>
                    <span className="text-xs text-gray-400 mt-0.5">Overall</span>
                  </CircularProgress>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    Keep going! You&apos;re doing great 🔥
                  </p>
                </div>

                <Divider className="my-4" />

                {/* Stats */}
                <div className="divide-y divide-gray-50">
                  {STATS.map((stat) => (
                    <StatRow key={stat.label} {...stat} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current streak card */}
            <Card className="shadow-sm border-gray-100 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-extrabold leading-none">12 days</p>
                  <p className="text-xs text-purple-200 mt-0.5">Current Streak 🔥</p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-white/10 text-white border-white/20 text-xs">
                    Best: 20d
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Certificates Label */}
            <div
              className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    My Certificates
                  </p>
                  <p className="text-xs text-gray-400">1 earned so far</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
