import { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, CheckCircle, Circle, ChevronDown, ChevronRight,
  PlayCircle, Clock, BookOpen, Loader2, Trophy, Menu, X
} from 'lucide-react'
import { Button } from '../component/ui/Button'
import { ProgressBar } from '../component/ui/ProgressBar'
import { getLearnCourse } from '../services/enrollment.services'
import api from '../utils/api'
import { LightNavbar as TopNav } from './CoursesPage'
import '../App.css'

/* ─── Helpers ─────────────────────────────────────────── */
function formatDuration(mins) {
  if (!mins) return '0m'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

/* ─── Sidebar ─────────────────────────────────────────── */
function Sidebar({ course, activeLesson, onSelectLesson, sidebarOpen, setSidebarOpen }) {
  const [openModules, setOpenModules] = useState(() => {
    // Open the module containing the active lesson by default
    const result = {}
    course.modules.forEach((mod, i) => {
      result[mod.id] = i === 0 || mod.lessons.some(l => l.id === activeLesson?.id)
    })
    return result
  })

  const toggle = (id) => setOpenModules(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-[300px] bg-white border-r border-gray-100 z-40 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:z-auto lg:flex
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-lg ${course.accent || 'bg-purple-900'}`}>
              {course.thumbnail?.startsWith('http') ? (
                <img src={course.thumbnail} alt="" className="w-8 h-8 object-cover rounded-lg" />
              ) : (
                <span>{course.thumbnail || '🎓'}</span>
              )}
            </div>
            <p className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2">{course.title}</p>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Overall progress */}
        <div className="px-4 py-3 border-b border-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            <span className="font-semibold text-purple-600">{course.progress}%</span>
          </div>
          <ProgressBar value={course.progress} color="bg-purple-500" size="sm" />
        </div>

        {/* Module list */}
        <div className="flex-1 overflow-y-auto py-2">
          {course.modules.map((mod) => (
            <div key={mod.id}>
              {/* Module header */}
              <button
                onClick={() => toggle(mod.id)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-[12.5px] font-semibold text-gray-700">{mod.title}</span>
                {openModules[mod.id] ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
              </button>

              {/* Lessons */}
              {openModules[mod.id] && (
                <div className="mb-1">
                  {mod.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson, mod)
                          setSidebarOpen(false)
                        }}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors ${
                          isActive
                            ? 'bg-purple-50 border-r-2 border-purple-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="mt-0.5 flex-shrink-0">
                          {lesson.completed
                            ? <CheckCircle size={15} className="text-green-500" />
                            : isActive
                              ? <PlayCircle size={15} className="text-purple-500" />
                              : <Circle size={15} className="text-gray-300" />
                          }
                        </span>
                        <div className="min-w-0">
                          <p className={`text-[12px] leading-snug ${isActive ? 'font-semibold text-purple-700' : 'text-gray-700'}`}>
                            {lesson.title}
                          </p>
                          {lesson.duration > 0 && (
                            <p className="text-[10.5px] text-gray-400 mt-0.5 flex items-center gap-1">
                              <Clock size={10} /> {formatDuration(lesson.duration)}
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}

/* ─── Video / Content Area ─────────────────────────────── */
function LessonContent({ lesson, course, onMarkComplete, onNext, hasNext }) {
  return (
    <div className="flex flex-col h-full">
      {/* Video area */}
      <div className="bg-black flex-shrink-0 flex items-center justify-center" style={{ minHeight: '55vh' }}>
        {lesson.video_url ? (
          <iframe
            key={lesson?.video_url}
            src={lesson?.video_url}
            title={lesson?.title}
            className="w-full h-full"
            style={{ minHeight: '55vh' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-white/60 py-16">
            <PlayCircle size={64} className="opacity-30" />
            <p className="text-sm">No video available for this lesson yet.</p>
          </div>
        )}
      </div>

      {/* Lesson info & actions */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{lesson.title}</h1>
              {lesson.duration > 0 && (
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                  <Clock size={13} /> {formatDuration(lesson.duration)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!lesson.completed ? (
                <Button
                  onClick={onMarkComplete}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold"
                >
                  <CheckCircle size={16} /> Mark as Complete
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <CheckCircle size={15} /> Completed
                </span>
              )}
              {hasNext && (
                <Button
                  onClick={onNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                >
                  Next →
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────── */
export default function LearnPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [activeMod, setActiveMod] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLearnCourse(slug)
        setCourse(data.course)
        // Auto-select first incomplete or first lesson
        const firstMod = data.course.modules[0]
        if (firstMod) {
          const firstIncomplete = data.course.modules
            .flatMap(m => m.lessons.map(l => ({ lesson: l, mod: m })))
            .find(({ lesson }) => !lesson.completed)
          if (firstIncomplete) {
            setActiveLesson(firstIncomplete.lesson)
            setActiveMod(firstIncomplete.mod)
          } else {
            setActiveLesson(firstMod.lessons[0])
            setActiveMod(firstMod)
          }
        }
      } catch (err) {
        if (err?.response?.status === 403) {
          setError('not_enrolled')
        } else {
          setError('failed')
        }
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [slug])

  const handleSelectLesson = useCallback((lesson, mod) => {
    setActiveLesson(lesson)
    setActiveMod(mod)
  }, [])

  const handleMarkComplete = async () => {
    if (!activeLesson) return
    try {
      await api.post('/enrollments/progress', {
        lessonId: activeLesson.id,
        courseId: course.id,
      })
      // Optimistically update state
      setCourse(prev => ({
        ...prev,
        completedLessons: prev.completedLessons + 1,
        progress: Math.round(((prev.completedLessons + 1) / prev.totalLessons) * 100),
        modules: prev.modules.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(l =>
            l.id === activeLesson.id ? { ...l, completed: true } : l
          ),
        })),
      }))
      setActiveLesson(prev => ({ ...prev, completed: true }))
    } catch (err) {
      console.error('Failed to mark lesson complete', err)
    }
  }

  // Flat list for next navigation
  const allLessonsFlat = course
    ? course.modules.flatMap(mod => mod.lessons.map(lesson => ({ lesson, mod })))
    : []
  const currentIdx = allLessonsFlat.findIndex(({ lesson }) => lesson.id === activeLesson?.id)
  const hasNext = currentIdx < allLessonsFlat.length - 1

  const handleNext = () => {
    if (hasNext) {
      const { lesson, mod } = allLessonsFlat[currentIdx + 1]
      setActiveLesson(lesson)
      setActiveMod(mod)
    }
  }

  /* Loading */
  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
    </div>
  )

  /* Error: not enrolled */
  if (error === 'not_enrolled') return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <Trophy className="w-12 h-12 text-amber-400 mb-4" />
      <h1 className="text-xl font-bold text-gray-900 mb-2">You're not enrolled in this course</h1>
      <p className="text-gray-500 mb-6 text-sm">Purchase this course to access its content.</p>
      <Button onClick={() => navigate(`/courses/${slug}`)} className="bg-purple-600 hover:bg-purple-700 text-white">
        View Course
      </Button>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <p className="text-red-500 font-medium">Failed to load course. Please try again.</p>
      <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
    </div>
  )

  if (!course) return null

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <TopNav/>
      <header className="flex items-center gap-3 px-4 h-14 border-b border-gray-100 bg-white z-20 flex-shrink-0">
        <button
          className="lg:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open curriculum"
        >
          <Menu size={20} />
        </button>
        <Link
          to="/my-learning"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors no-underline"
        >
          <ArrowLeft size={15} /> My Learning
        </Link>
        <span className="text-gray-300">|</span>
        <span className="text-sm font-semibold text-gray-900 truncate">{course.title}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:inline">{course.progress}% complete</span>
          <div className="hidden sm:block w-28">
            <ProgressBar value={course.progress} color="bg-purple-500" size="sm" />
          </div>
          <span className="text-xs font-medium text-purple-600 flex items-center gap-1">
            <BookOpen size={13} /> {course.completedLessons}/{course.totalLessons}
          </span>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          course={course}
          activeLesson={activeLesson}
          onSelectLesson={handleSelectLesson}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-950 lg:bg-white">
          {activeLesson ? (
            <LessonContent
              lesson={activeLesson}
              course={course}
              onMarkComplete={handleMarkComplete}
              onNext={handleNext}
              hasNext={hasNext}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/40">
              <p>Select a lesson to begin</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
