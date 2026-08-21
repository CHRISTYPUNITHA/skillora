/**
 * CourseDetailPage.jsx
 * Course Details — 2-column layout:
 *   Left:  hero banner + course info + tabs (Overview / Curriculum / Instructor / Reviews)
 *   Right: sticky price card (price, includes, Enroll CTA)
 */
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './CoursesPage.css'

/* ─────────────────────────────────────────────────────────
   Data (would come from an API in production)
───────────────────────────────────────────────────────── */
const COURSES_DATA = {
  'full-stack-foundations': {
    id: 1,
    slug: 'full-stack-foundations',
    thumbClass: 'bg-gradient-thumbnail',
    thumbIcon: '🚀',
    level: 'Beginner to Intermediate',
    levelColor: 'green',
    title: 'Full-Stack Foundations',
    desc: 'Learn to build production-ready full-stack applications using React, Node.js, Express and PostgreSQL.',
    longDesc: 'This comprehensive course takes you from zero to production. You\'ll build a complete full-stack application while learning industry best practices. Each module is packed with hands-on exercises and real-world projects that reinforce your learning.',
    price: '₹799',
    originalPrice: '₹1,999',
    hours: '8h 20m',
    lessons: 32,
    rating: 4.9,
    reviewCount: 48,
    students: 312,
    bestseller: true,
    certificate: true,
    lastUpdated: 'August 2026',
    instructor: {
      name: 'Arjun Sharma',
      initials: 'AS',
      title: 'Senior Full-Stack Engineer · 8 years exp',
      bio: 'Arjun is a senior full-stack engineer with experience at top Indian startups. He has taught over 2,000 students and specialises in building scalable web applications. His courses focus on practical, real-world skills you can use immediately.',
      students: 2100,
      courses: 4,
      rating: 4.9,
    },
    includes: [
      'Lifetime access',
      '32 lessons',
      '8h 20m of content',
      'Certificate of completion',
      'Access on mobile & TV',
      'Downloadable resources',
    ],
    whatYouLearn: [
      'Build full-stack applications',
      'PostgreSQL database design',
      'User authentication & authorization',
      'Payment integration',
      'RESTful API development',
      'Deployment to production',
      'React state management',
      'Testing & debugging',
    ],
    curriculum: [
      { title: 'Introduction',          duration: '18:45', done: true  },
      { title: 'Project Setup',         duration: '12:30', done: true  },
      { title: 'React Basics',          duration: '22:15', done: true  },
      { title: 'API Development',       duration: '19:20', done: false },
      { title: 'Database Design',       duration: '18:30', active: true },
      { title: 'Prisma ORM',            duration: '22:10', done: false },
      { title: 'Authentication',        duration: '24:30', done: false },
      { title: 'Payment Integration',   duration: '20:40', done: false },
      { title: 'Deployment',            duration: '15:55', done: false },
    ],
    reviews: [
      { name: 'Rahul M.', initials: 'RM', bg: 'linear-gradient(135deg,#7C5CFC,#5A3DE8)', rating: 5, text: 'Best full-stack course I\'ve taken. Very practical and well-structured.' },
      { name: 'Priya S.', initials: 'PS', bg: 'linear-gradient(135deg,#0E3B2E,#14B87F)',  rating: 5, text: 'The projects are real-world and the explanations are crystal clear.' },
      { name: 'Aditya N.', initials: 'AN', bg: 'linear-gradient(135deg,#2A1A00,#E8A33D)', rating: 5, text: 'Worth every rupee. I got a job offer after completing this course!' },
    ],
  },
  'react-product-engineering': {
    id: 2,
    slug: 'react-product-engineering',
    thumbClass: 'bg-gradient-thumbnail-2',
    thumbIcon: '⚛️',
    level: 'Intermediate',
    levelColor: 'blue',
    title: 'React Product Engineering',
    desc: 'Master advanced React patterns, state management, performance and testing.',
    longDesc: 'Go beyond the basics and learn how to build React applications at scale. This course covers advanced patterns, performance optimisation, testing strategies and the tools used by senior engineers at top tech companies.',
    price: '₹999',
    originalPrice: '₹2,499',
    hours: '6h 40m',
    lessons: 28,
    rating: 4.8,
    reviewCount: 31,
    students: 198,
    bestseller: false,
    certificate: true,
    lastUpdated: 'July 2026',
    instructor: {
      name: 'Meera Iyer',
      initials: 'MI',
      title: 'Frontend Engineer · React Expert',
      bio: 'Meera is a frontend engineer who has worked at multiple product companies. She specialises in React architecture and performance and loves teaching developers how to write clean, maintainable code.',
      students: 1400,
      courses: 2,
      rating: 4.8,
    },
    includes: [
      'Lifetime access',
      '28 lessons',
      '6h 40m of content',
      'Certificate of completion',
      'Access on mobile & TV',
      'Source code downloads',
    ],
    whatYouLearn: [
      'Advanced React patterns',
      'Custom hooks mastery',
      'Performance optimisation',
      'State management with Zustand',
      'React Query for data fetching',
      'Testing with Vitest & RTL',
      'TypeScript with React',
      'Component library design',
    ],
    curriculum: [
      { title: 'React Patterns Deep Dive', duration: '22:00', done: true  },
      { title: 'Custom Hooks',             duration: '18:30', done: false },
      { title: 'State Management',         duration: '25:10', done: false },
      { title: 'React Query',              duration: '20:45', done: false },
      { title: 'Performance',              duration: '19:20', done: false },
      { title: 'Testing Fundamentals',     duration: '24:00', done: false },
      { title: 'TypeScript Integration',   duration: '21:15', done: false },
      { title: 'Component Libraries',      duration: '17:30', done: false },
    ],
    reviews: [
      { name: 'Kiran P.', initials: 'KP', bg: 'linear-gradient(135deg,#7C5CFC,#5A3DE8)', rating: 5, text: 'This course levelled up my React skills significantly.' },
      { name: 'Anjali D.', initials: 'AD', bg: 'linear-gradient(135deg,#0E3B2E,#14B87F)',  rating: 5, text: 'Finally understood advanced hooks. Excellent teaching style.' },
    ],
  },
  'nodejs-api-architecture': {
    id: 3,
    slug: 'nodejs-api-architecture',
    thumbClass: 'bg-gradient-thumbnail-3',
    thumbIcon: '🛠️',
    level: 'Intermediate',
    levelColor: 'blue',
    title: 'Node.js API Architecture',
    desc: 'Design and build scalable RESTful APIs with Node.js, Express and best practices.',
    longDesc: 'Build production-grade APIs that scale. Learn how to architect Node.js backends with clean code, authentication, database integration, caching, and deployment strategies used by engineering teams at top companies.',
    price: '₹999',
    originalPrice: '₹2,499',
    hours: '7h 10m',
    lessons: 26,
    rating: 4.7,
    reviewCount: 22,
    students: 145,
    bestseller: false,
    certificate: true,
    lastUpdated: 'June 2026',
    instructor: {
      name: 'Dev Prakash',
      initials: 'DP',
      title: 'Backend Engineer · API Architect',
      bio: 'Dev is a backend engineer who has designed APIs serving millions of requests per day. He brings real-world engineering experience to every lesson, focusing on scalability, reliability and maintainability.',
      students: 890,
      courses: 2,
      rating: 4.7,
    },
    includes: [
      'Lifetime access',
      '26 lessons',
      '7h 10m of content',
      'Certificate of completion',
      'Access on mobile & TV',
      'Postman collection downloads',
    ],
    whatYouLearn: [
      'RESTful API design principles',
      'Express.js advanced patterns',
      'JWT authentication',
      'Rate limiting & security',
      'Database integration (PostgreSQL)',
      'Caching with Redis',
      'API documentation (Swagger)',
      'Containerisation with Docker',
    ],
    curriculum: [
      { title: 'API Design Principles',  duration: '20:00', done: true  },
      { title: 'Express Setup',          duration: '14:30', done: false },
      { title: 'Routing & Middleware',   duration: '18:45', done: false },
      { title: 'Authentication (JWT)',   duration: '22:10', done: false },
      { title: 'Database Integration',  duration: '25:30', done: false },
      { title: 'Caching Strategies',    duration: '16:20', done: false },
      { title: 'Security Best Practices', duration: '19:00', done: false },
      { title: 'Docker & Deployment',   duration: '18:55', done: false },
    ],
    reviews: [
      { name: 'Suresh K.', initials: 'SK', bg: 'linear-gradient(135deg,#7C5CFC,#5A3DE8)', rating: 5, text: 'Very thorough. The security section alone was worth it.' },
      { name: 'Nisha R.', initials: 'NR', bg: 'linear-gradient(135deg,#2A1A00,#E8A33D)',  rating: 4, text: 'Great course. Would love more content on microservices.' },
    ],
  },
}

const DETAIL_TABS = ['Overview', 'Curriculum', 'Instructor', 'Reviews']

/* ─────────────────────────────────────────────────────────
   Light Navbar (reused — import from CoursesPage normally,
   inlined here for self-contained file)
───────────────────────────────────────────────────────── */
function LightNavbar({ activeCourse }) {
  return (
    <nav className="light-navbar" aria-label="App navigation">
      <div className="light-navbar__inner">
        <Link to="/" className="light-navbar__logo" aria-label="Skillora home">
          <div className="navbar__logo-icon">⚡</div>
          <span>Skillora</span>
        </Link>

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
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="light-navbar__actions">
          <button className="light-navbar__icon-btn" aria-label="Notifications" type="button">🔔</button>
          <Link to="/dashboard" className="light-navbar__avatar" aria-label="User profile">R</Link>
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────
   Overview tab
───────────────────────────────────────────────────────── */
function OverviewPanel({ course }) {
  return (
    <div className="cd-tab-body">
      <p style={{ fontSize: 13.5, color: 'var(--color-gray-600)', lineHeight: 1.65, marginBottom: 24 }}>
        {course.longDesc}
      </p>

      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-gray-900)', marginBottom: 14 }}>
        What you'll learn
      </h3>
      <div className="cd-learn-grid">
        {course.whatYouLearn.map((item) => (
          <div key={item} className="cd-learn-item">
            <span className="cd-learn-item__check" aria-hidden="true">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: 'var(--color-gray-100)', margin: '24px 0' }} aria-hidden="true" />

      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-gray-900)', marginBottom: 8 }}>
        This course includes
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {course.includes.map((item) => (
          <div key={item} className="cd-price-include-item">
            <span className="cd-price-include-item__check">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Curriculum tab
───────────────────────────────────────────────────────── */
function CurriculumPanel({ course }) {
  return (
    <div className="cd-tab-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-gray-900)' }}>
          {course.lessons} lessons · {course.hours} total
        </h3>
        <span style={{ fontSize: 12, color: 'var(--color-gray-400)' }}>
          Last updated {course.lastUpdated}
        </span>
      </div>

      <div className="cd-curriculum" role="list" aria-label="Course curriculum">
        {course.curriculum.map((lesson, i) => (
          <div
            key={lesson.title}
            role="listitem"
            className={`cd-lesson-row${lesson.active ? ' cd-lesson-row--active' : ''}`}
            aria-current={lesson.active ? 'true' : undefined}
          >
            <div className="cd-lesson-row__index">{String(i + 1).padStart(2, '0')}</div>
            <span className="cd-lesson-row__title">{lesson.title}</span>
            {lesson.done && (
              <span style={{ color: 'var(--color-green-500)', fontSize: 13, fontWeight: 700 }} aria-label="Completed">✓</span>
            )}
            <span className="cd-lesson-row__duration">{lesson.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Instructor tab
───────────────────────────────────────────────────────── */
function InstructorPanel({ instructor }) {
  return (
    <div className="cd-tab-body">
      <div className="cd-instructor">
        <div className="cd-instructor__profile">
          <div className="cd-instructor__avatar">{instructor.initials}</div>
          <div>
            <div className="cd-instructor__name">{instructor.name}</div>
            <div className="cd-instructor__title">{instructor.title}</div>
          </div>
        </div>

        <div className="cd-instructor__stats">
          {[
            { val: `${instructor.students.toLocaleString()}+`, lbl: 'Students' },
            { val: instructor.courses,                          lbl: 'Courses'  },
            { val: `${instructor.rating} ★`,                   lbl: 'Rating'   },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="cd-instructor__stat">
              <span className="cd-instructor__stat-val">{val}</span>
              <span className="cd-instructor__stat-lbl">{lbl}</span>
            </div>
          ))}
        </div>

        <p className="cd-instructor__bio">{instructor.bio}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Reviews tab
───────────────────────────────────────────────────────── */
function ReviewsPanel({ course }) {
  return (
    <div className="cd-tab-body">
      {/* Summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--color-gray-900)', lineHeight: 1 }}>
            {course.rating}
          </div>
          <div style={{ fontSize: 20, color: 'var(--color-amber-400)' }}>{'★'.repeat(Math.round(course.rating))}</div>
          <div style={{ fontSize: 11, color: 'var(--color-gray-400)', marginTop: 2 }}>Course Rating</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[5,4,3,2,1].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--color-gray-400)', width: 6 }}>{s}</span>
              <div style={{ flex: 1, height: 6, background: 'var(--color-gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: s === 5 ? 'var(--color-amber-400)' : 'var(--color-gray-200)', width: s === 5 ? '85%' : s === 4 ? '12%' : '3%', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {course.reviews.map((r) => (
          <div key={r.name} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--color-gray-100)' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.bg, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {r.initials}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-gray-900)' }}>{r.name}</span>
                <span style={{ fontSize: 12, color: 'var(--color-amber-400)' }}>{'★'.repeat(r.rating)}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-gray-600)', lineHeight: 1.5 }}>{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Price Card
───────────────────────────────────────────────────────── */
function PriceCard({ course }) {
  return (
    <aside className="cd-price-card" aria-label="Course purchase details">
      {/* Mini thumbnail */}
      <div className={`cd-price-card__thumb ${course.thumbClass}`}>
        {course.bestseller && (
          <span className="cd-price-card__thumb-badge">Best Seller</span>
        )}
        <span aria-hidden="true" style={{ fontSize: 52 }}>{course.thumbIcon}</span>
      </div>

      <div className="cd-price-card__body">
        <div className="cd-price-card__price" aria-label={`Price: ${course.price}`}>
          {course.price}
          <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--color-gray-400)', textDecoration: 'line-through', marginLeft: 8 }}>
            {course.originalPrice}
          </span>
        </div>

        {/* Includes checklist */}
        <div className="cd-price-card__includes">
          {course.includes.map((item) => (
            <div key={item} className="cd-price-include-item">
              <span className="cd-price-include-item__check" aria-hidden="true">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="cd-enroll-btn"
          id="btn-enroll-now"
          type="button"
          aria-label={`Enroll in ${course.title} for ${course.price}`}
        >
          Enroll Now
        </button>

        <p className="cd-money-back">30-Day Money Back Guarantee</p>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────
   Course Detail Page — root export
───────────────────────────────────────────────────────── */
export default function CourseDetailPage() {
  const { slug }    = useParams()
  const course      = COURSES_DATA[slug] ?? COURSES_DATA['full-stack-foundations']
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <>
      {/* SEO */}
      <title>{course.title} — Skillora</title>
      <meta name="description" content={course.desc} />

      <LightNavbar />

      <main className="cd-main" id="main-content">

        {/* Back link */}
        <div className="cd-back-bar">
          <div className="cd-back-bar__inner">
            <Link to="/courses" className="cd-back-link" aria-label="Back to Courses page">
              ← Back to Courses
            </Link>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="cd-layout">

          {/* ── Left ─────────────────────────────── */}
          <div className="cd-left">

            {/* Hero banner */}
            <div className={`cd-hero ${course.thumbClass}`} role="img" aria-label={`${course.title} course thumbnail`}>
              <div className="cd-hero__overlay" aria-hidden="true" />
              {course.bestseller && (
                <span className="cd-hero__badge">Best Seller</span>
              )}
              <span className="cd-hero__icon" aria-hidden="true">{course.thumbIcon}</span>

              {/* Meta overlay row */}
              <div className="cd-hero__meta-row">
                {[
                  { icon: '⏱', label: course.hours },
                  { icon: '📋', label: `${course.lessons} Lessons` },
                  { icon: '🎓', label: 'Certificate' },
                  { icon: '♾️', label: 'Lifetime Access' },
                ].map(({ icon, label }) => (
                  <span key={label} className="cd-hero__meta-item">
                    <span aria-hidden="true">{icon}</span>{label}
                  </span>
                ))}
              </div>
            </div>

            {/* Course info */}
            <div className="cd-info">
              <span className="cd-info__eyebrow">⬡ {course.level}</span>
              <h1 className="cd-info__title">{course.title}</h1>
              <p className="cd-info__desc">{course.desc}</p>

              <div className="cd-info__stats">
                <span className="cd-info__stat">
                  <span aria-hidden="true" style={{ color: 'var(--color-amber-400)' }}>★</span>
                  <strong style={{ color: 'var(--color-gray-900)' }}>{course.rating}</strong>
                  <span>({course.reviewCount} reviews)</span>
                </span>
                <span className="cd-info__stat">
                  <span aria-hidden="true">👥</span>
                  {course.students.toLocaleString()} students
                </span>
                <span className="cd-info__stat">
                  <span aria-hidden="true">🗓</span>
                  Updated {course.lastUpdated}
                </span>
              </div>
            </div>

            {/* Tabbed content */}
            <div className="cd-tabs">
              {/* Tab header */}
              <div className="cd-tabs__header" role="tablist" aria-label="Course content sections">
                {DETAIL_TABS.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    type="button"
                    id={`detail-tab-${tab.toLowerCase()}`}
                    aria-selected={activeTab === tab}
                    aria-controls={`detail-panel-${tab.toLowerCase()}`}
                    className={`cd-tab-btn${activeTab === tab ? ' cd-tab-btn--active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}{tab === 'Reviews' ? ` (${course.reviewCount})` : ''}
                  </button>
                ))}
              </div>

              {/* Tab panels */}
              <div
                id={`detail-panel-${activeTab.toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`detail-tab-${activeTab.toLowerCase()}`}
              >
                {activeTab === 'Overview'    && <OverviewPanel   course={course} />}
                {activeTab === 'Curriculum'  && <CurriculumPanel course={course} />}
                {activeTab === 'Instructor'  && <InstructorPanel instructor={course.instructor} />}
                {activeTab === 'Reviews'     && <ReviewsPanel    course={course} />}
              </div>
            </div>

          </div>

          {/* ── Right — Sticky price card ─────────── */}
          <div className="cd-right">
            <PriceCard course={course} />
          </div>

        </div>
      </main>
    </>
  )
}
