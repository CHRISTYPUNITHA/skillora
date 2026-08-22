import { useState, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Bell, Clock, BookOpen, Award } from 'lucide-react'
import { Button } from '../component/ui/Button'
import { Input } from '../component/ui/Input'
import { Select } from '../component/ui/Select'
import { Card, CardContent, CardFooter } from '../component/ui/Card'
import { Badge } from '../component/ui/Badge'
import { Tabs, TabsList, TabsTrigger } from '../component/ui/Tabs'
import '../App.css'

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    slug: 'full-stack-foundations',
    thumbClass: 'bg-gradient-thumbnail',
    thumbIcon: '🚀',
    level: 'Beginner to Intermediate',
    levelColor: 'green',
    title: 'Full-Stack Foundations',
    desc: 'Build production-ready full-stack web applications from scratch with React, Node.js, Express and PostgreSQL.',
    hours: '8h 20m',
    lessons: 32,
    price: '₹799',
    rating: 4.9,
    students: 312,
    bestseller: true,
    certificate: true,
    tags: ['Beginner', 'Full-Stack'],
  },
  {
    id: 2,
    slug: 'react-product-engineering',
    thumbClass: 'bg-gradient-thumbnail-2',
    thumbIcon: '⚛️',
    level: 'Intermediate',
    levelColor: 'blue',
    title: 'React Product Engineering',
    desc: 'Master advanced React patterns, state management, performance and testing. Build like a senior engineer.',
    hours: '6h 40m',
    lessons: 28,
    price: '₹999',
    rating: 4.8,
    students: 198,
    bestseller: false,
    certificate: true,
    tags: ['Intermediate', 'Frontend'],
  },
  {
    id: 3,
    slug: 'nodejs-api-architecture',
    thumbClass: 'bg-gradient-thumbnail-3',
    thumbIcon: '🛠️',
    level: 'Intermediate',
    levelColor: 'blue',
    title: 'Node.js API Architecture',
    desc: 'Design and build scalable RESTful APIs with Node.js, Express and best practices for production deployments.',
    hours: '7h 10m',
    lessons: 26,
    price: '₹999',
    rating: 4.7,
    students: 145,
    bestseller: false,
    certificate: true,
    tags: ['Intermediate', 'Backend'],
  },
]

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

/* ─────────────────────────────────────────────────────────
   Light Navbar (app pages)
───────────────────────────────────────────────────────── */
export function LightNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  // Mock logged in user data
  const user = {
    name: "Rahul Mehta",
    email: "rahul@example.com",
    initials: "R"
  }
  
  const handleLogout = () => {
    // Navigate back to login
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center shadow-[0_1px_4px_rgba(20,20,43,0.05)]" aria-label="App navigation">
      <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-[17px] font-bold text-gray-900 tracking-[-0.02em] shrink-0 no-underline" aria-label="Skillora home">
          <div className="text-xl">⚡</div>
          <span>Skillora</span>
        </Link>

        <ul className="flex items-center gap-0.5 flex-1 m-0 p-0 list-none" role="list">
          {[
            { label: 'Courses',     to: '/courses' },
            { label: 'My Learning', to: '/my-learning' },
          ].map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`relative px-3.5 py-1.5 text-[13.5px] font-medium rounded-lg transition-colors no-underline ${currentPath === to ? 'text-purple-600 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                aria-current={currentPath === to ? 'page' : undefined}
              >
                {label}
                {currentPath === to && (
                  <div className="absolute -bottom-[2px] left-3.5 right-3.5 h-0.5 bg-purple-500 rounded-sm" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 ml-auto relative">
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-[10px] text-gray-500 hover:bg-gray-100 hover:text-gray-800" aria-label="Notifications">
            <Bell size={18} />
          </Button>
          
          <button
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#5A3DE8] text-white text-sm font-bold flex items-center justify-center cursor-pointer border-2 border-purple-500/25 transition-shadow hover:shadow-[0_0_0_3px_rgba(124,92,252,0.18)]"
            aria-label="User profile"
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {user.initials}
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────
   Star Rating
───────────────────────────────────────────────────────── */
export function StarRating({ rating }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-0.5 text-xs text-amber-400 font-semibold" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      <span className="text-gray-600 text-[11.5px] font-medium ml-0.5">{rating}</span>
    </span>
  )
}

/* ─────────────────────────────────────────────────────────
   Course Card
───────────────────────────────────────────────────────── */
function CourseCard({ course }) {
  const navigate = useNavigate()

  return (
    <Card
      className="flex flex-col cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(20,20,43,0.1)] hover:border-purple-500/30 focus-visible:-translate-y-1 focus-visible:shadow-[0_12px_24px_-8px_rgba(20,20,43,0.1)] focus-visible:border-purple-500/30 outline-none"
      role="article"
      aria-label={`Course: ${course.title}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses/${course.slug}`)}
      onClick={() => navigate(`/courses/${course.slug}`)}
    >
      <div className={`relative h-40 flex items-center justify-center overflow-hidden ${course.thumbClass} group`}>
        {course.bestseller && (
          <div className="absolute top-3 left-3 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10.5px] font-bold px-2.5 py-1 rounded-full tracking-[0.02em] shadow-[0_2px_8px_rgba(251,146,60,0.35)] z-10" aria-label="Best Seller badge">
            🏆 Best Seller
          </div>
        )}
        <span className="text-[52px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" aria-hidden="true">{course.thumbIcon}</span>
      </div>

      <CardContent className="p-4 pt-4 flex flex-col gap-2 flex-1">
        <Badge variant={course.levelColor === 'green' ? 'success' : 'default'} className="w-fit text-[10.5px] px-2 py-0.5 tracking-[0.03em]">
          {course.level}
        </Badge>

        <h2 className="text-base font-bold text-gray-900 leading-tight tracking-[-0.01em]">{course.title}</h2>
        <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-3">{course.desc}</p>

        <div className="flex items-center gap-2 flex-wrap mt-1">
          <span className="inline-flex items-center gap-1 text-[11.5px] text-gray-500 font-medium" aria-label={`Duration: ${course.hours}`}>
            <Clock size={12} aria-hidden="true" />{course.hours}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" aria-hidden="true" />
          <span className="inline-flex items-center gap-1 text-[11.5px] text-gray-500 font-medium" aria-label={`${course.lessons} lessons`}>
            <BookOpen size={12} aria-hidden="true" />{course.lessons} Lessons
          </span>
          {course.certificate && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" aria-hidden="true" />
              <span className="inline-flex items-center gap-1 text-[11.5px] text-gray-500 font-medium" aria-label="Certificate included">
                <Award size={12} aria-hidden="true" />Certificate
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <StarRating rating={course.rating} />
          <span className="text-[11px] text-gray-400">({course.students.toLocaleString()} students)</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-3 mt-auto border-t border-gray-100">
        <div className="text-xl font-extrabold text-gray-900 tracking-[-0.02em]">{course.price}<span className="text-[11px] font-normal text-gray-400"> / lifetime</span></div>
        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity">
          View Course &rarr;
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Courses Page — root export
───────────────────────────────────────────────────────── */
export default function CoursesPage() {
  const [query,       setQuery]       = useState('')
  const [activeLevel, setActiveLevel] = useState('All Levels')
  const [sortBy,      setSortBy]      = useState('popular')

  const filtered = useMemo(() => {
    let list = [...COURSES]

    /* search */
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      )
    }

    /* level filter */
    if (activeLevel !== 'All Levels') {
      list = list.filter((c) =>
        c.tags.some((t) => t.toLowerCase() === activeLevel.toLowerCase())
      )
    }

    /* sort */
    if (sortBy === 'price-asc') list.sort((a, b) => parseInt(a.price.slice(1)) - parseInt(b.price.slice(1)))
    if (sortBy === 'price-desc') list.sort((a, b) => parseInt(b.price.slice(1)) - parseInt(a.price.slice(1)))
    if (sortBy === 'rating')  list.sort((a, b) => b.rating  - a.rating)
    if (sortBy === 'popular') list.sort((a, b) => b.students - a.students)

    return list
  }, [query, activeLevel, sortBy])

  return (
    <>
      <title>Explore Courses — Skillora</title>
      <meta name="description" content="Browse all Skillora developer courses. Filter by level, search by topic and start your learning journey today." />

      <LightNavbar />

      <main className="min-h-screen bg-gray-50" id="main-content">
        
        {/* ── Page header ─────────────────────────── */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 pt-9 pb-7 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-[28px] font-extrabold text-gray-900 tracking-[-0.02em] leading-tight mb-1.5">Explore Courses</h1>
              <p className="text-sm text-gray-500">
                Choose a course and start your learning journey.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap" role="search">
              <div className="w-[260px]">
                <Input
                  id="courses-search"
                  type="search"
                  icon={Search}
                  placeholder="Search courses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search courses"
                />
              </div>

              <div className="w-[180px]">
                <Select
                  id="courses-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort courses"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* ── Level tabs ──────────────────────────── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-4">
            <Tabs className="flex-row">
              <div className="flex items-center gap-0.5" role="tablist" aria-label="Filter courses by level">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    role="tab"
                    type="button"
                    id={`tab-${lvl.toLowerCase().replace(/\s+/g, '-')}`}
                    aria-selected={activeLevel === lvl}
                    className={`h-12 px-4.5 text-[13px] font-medium whitespace-nowrap transition-colors border-b-2 ${
                      activeLevel === lvl 
                        ? 'text-purple-600 font-semibold border-purple-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-800'
                    }`}
                    onClick={() => setActiveLevel(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </Tabs>

            <p className="text-[12.5px] font-medium text-gray-400 whitespace-nowrap" aria-live="polite">
              {filtered.length} course{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* ── Course grid ─────────────────────────── */}
        <section className="py-8 pb-16">
          <div className="max-w-[1200px] mx-auto px-6">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Course listings">
                {filtered.map((course) => (
                  <div key={course.id} role="listitem">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 flex flex-col items-center gap-2.5" role="status" aria-live="polite">
                <Search className="w-12 h-12 text-gray-300 opacity-60" aria-hidden="true" />
                <p className="text-lg font-bold text-gray-800">No courses found</p>
                <p className="text-[13px] text-gray-400">Try a different search term or level filter.</p>
                <Button
                  variant="secondary"
                  className="mt-2 text-purple-700 bg-purple-50 hover:bg-purple-100"
                  onClick={() => { setQuery(''); setActiveLevel('All Levels') }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  )
}
