/**
 * CoursesPage.jsx
 * Explore Courses — light-theme page
 * Layout: light Navbar → header + search/filter → tab filter → 3-col course grid
 */
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import './CoursesPage.css'

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
function LightNavbar() {
  const navigate = useNavigate()

  return (
    <nav className="light-navbar" aria-label="App navigation">
      <div className="light-navbar__inner">
        {/* Logo */}
        <Link to="/" className="light-navbar__logo" aria-label="Skillora home">
          <div className="navbar__logo-icon">⚡</div>
          <span>Skillora</span>
        </Link>

        {/* Nav links */}
        <ul className="light-navbar__nav" role="list">
          {[
            { label: 'Home',        to: '/' },
            { label: 'Courses',     to: '/courses' },
            { label: 'Dashboard',   to: '/dashboard' },
            { label: 'My Learning', to: '/my-learning' },
          ].map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`light-navbar__link${to === '/courses' ? ' active' : ''}`}
                aria-current={to === '/courses' ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="light-navbar__actions">
          <button className="light-navbar__icon-btn" aria-label="Notifications" type="button">🔔</button>
          <button
            className="light-navbar__avatar"
            aria-label="User profile"
            type="button"
            onClick={() => navigate('/dashboard')}
          >
            R
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────
   Star Rating
───────────────────────────────────────────────────────── */
function StarRating({ rating }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      <span className="star-rating__value">{rating}</span>
    </span>
  )
}

/* ─────────────────────────────────────────────────────────
   Course Card
───────────────────────────────────────────────────────── */
function CourseCard({ course }) {
  const navigate = useNavigate()

  return (
    <article
      className="cp-card"
      role="article"
      aria-label={`Course: ${course.title}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses/${course.slug}`)}
    >
      {/* Thumbnail */}
      <div className={`cp-card__thumb ${course.thumbClass}`}>
        {course.bestseller && (
          <div className="cp-card__badge" aria-label="Best Seller badge">
            🏆 Best Seller
          </div>
        )}
        <span className="cp-card__thumb-icon" aria-hidden="true">{course.thumbIcon}</span>
      </div>

      {/* Body */}
      <div className="cp-card__body">
        <span className={`cp-card__level cp-card__level--${course.levelColor}`}>
          {course.level}
        </span>

        <h2 className="cp-card__title">{course.title}</h2>
        <p className="cp-card__desc">{course.desc}</p>

        {/* Meta row */}
        <div className="cp-card__meta">
          <span className="cp-meta-item" aria-label={`Duration: ${course.hours}`}>
            <span aria-hidden="true">⏱</span>{course.hours}
          </span>
          <span className="cp-meta-dot" aria-hidden="true" />
          <span className="cp-meta-item" aria-label={`${course.lessons} lessons`}>
            <span aria-hidden="true">📋</span>{course.lessons} Lessons
          </span>
          {course.certificate && (
            <>
              <span className="cp-meta-dot" aria-hidden="true" />
              <span className="cp-meta-item" aria-label="Certificate included">
                <span aria-hidden="true">🎓</span>Certificate
              </span>
            </>
          )}
        </div>

        <div className="cp-card__rating-row">
          <StarRating rating={course.rating} />
          <span className="cp-card__students">({course.students.toLocaleString()} students)</span>
        </div>

        {/* Footer */}
        <div className="cp-card__footer">
          <div className="cp-card__price">{course.price}<span className="cp-card__price-suffix"> / lifetime</span></div>
          <Link
            to={`/courses/${course.slug}`}
            className="cp-card__cta"
            id={`btn-view-course-${course.id}`}
            aria-label={`View course: ${course.title}`}
          >
            View Course →
          </Link>
        </div>
      </div>
    </article>
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
      {/* SEO */}
      <title>Explore Courses — Skillora</title>
      <meta name="description" content="Browse all Skillora developer courses. Filter by level, search by topic and start your learning journey today." />

      <LightNavbar />

      <main className="cp-main" id="main-content">

        {/* ── Page header ─────────────────────────── */}
        <header className="cp-header">
          <div className="cp-header__inner">
            <div>
              <h1 className="cp-header__title">Explore Courses</h1>
              <p className="cp-header__subtitle">
                Choose a course and start your learning journey.
              </p>
            </div>

            {/* Search + Sort row */}
            <div className="cp-controls" role="search">
              <div className="cp-search-wrap">
                <span className="cp-search-icon" aria-hidden="true">🔍</span>
                <input
                  id="courses-search"
                  type="search"
                  className="cp-search"
                  placeholder="Search courses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search courses"
                />
              </div>

              <select
                id="courses-sort"
                className="cp-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort courses"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </header>

        {/* ── Level tabs ──────────────────────────── */}
        <div className="cp-tabs-wrap">
          <div className="cp-tabs__inner">
            <div className="cp-tabs" role="tablist" aria-label="Filter courses by level">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  role="tab"
                  type="button"
                  id={`tab-${lvl.toLowerCase().replace(/\s+/g, '-')}`}
                  aria-selected={activeLevel === lvl}
                  className={`cp-tab${activeLevel === lvl ? ' cp-tab--active' : ''}`}
                  onClick={() => setActiveLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <p className="cp-results-count" aria-live="polite">
              {filtered.length} course{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* ── Course grid ─────────────────────────── */}
        <section className="cp-grid-wrap">
          <div className="cp-grid__inner">
            {filtered.length > 0 ? (
              <div className="cp-grid" role="list" aria-label="Course listings">
                {filtered.map((course) => (
                  <div key={course.id} role="listitem">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="cp-empty" role="status" aria-live="polite">
                <span className="cp-empty__icon" aria-hidden="true">🔍</span>
                <p className="cp-empty__title">No courses found</p>
                <p className="cp-empty__sub">Try a different search term or level filter.</p>
                <button
                  type="button"
                  className="cp-empty__reset"
                  onClick={() => { setQuery(''); setActiveLevel('All Levels') }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  )
}
