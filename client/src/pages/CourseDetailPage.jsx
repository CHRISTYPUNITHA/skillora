import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Users, BookOpen, Star, ArrowLeft } from 'lucide-react'
import { LightNavbar, StarRating } from './CoursesPage'
import { Card } from '../component/ui/Card'
import { Button } from '../component/ui/Button'
import '../App.css'

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
   Overview tab
───────────────────────────────────────────────────────── */
function OverviewPanel({ course }) {
  return (
    <div className="p-6">
      <p className="text-[13.5px] text-gray-600 leading-[1.65] mb-6">
        {course.longDesc}
      </p>

      <h3 className="text-[15px] font-bold text-gray-900 mb-3.5">
        What you'll learn
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
        {course.whatYouLearn.map((item) => (
          <div key={item} className="flex items-start gap-2 text-[13px] text-gray-700 leading-snug">
            <span className="w-[18px] h-[18px] rounded-full bg-green-50 text-green-700 text-[10px] flex items-center justify-center shrink-0 mt-px font-bold">
              ✓
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-100 my-6" aria-hidden="true" />

      <h3 className="text-[15px] font-bold text-gray-900 mb-2">
        This course includes
      </h3>
      <div className="flex flex-col gap-2">
        {course.includes.map((item) => (
          <div key={item} className="flex items-start gap-2 text-[13px] text-gray-700">
            <span className="text-gray-400 mt-px"><Check size={14} /></span>
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-[15px] font-bold text-gray-900">
          {course.lessons} lessons · {course.hours} total
        </h3>
        <span className="text-xs text-gray-400">
          Last updated {course.lastUpdated}
        </span>
      </div>

      <div className="flex flex-col gap-1.5" role="list" aria-label="Course curriculum">
        {course.curriculum.map((lesson, i) => (
          <div
            key={lesson.title}
            role="listitem"
            className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors border border-transparent ${lesson.active ? 'bg-purple-50/50 border-purple-100' : 'hover:bg-gray-50'}`}
            aria-current={lesson.active ? 'true' : undefined}
          >
            <div className="w-6 text-[11px] font-bold text-gray-400 text-center shrink-0">
              {String(i + 1).padStart(2, '0')}
            </div>
            <span className={`flex-1 text-[13.5px] font-medium ${lesson.active ? 'text-purple-700 font-semibold' : 'text-gray-700'}`}>
              {lesson.title}
            </span>
            {lesson.done && (
              <span className="text-green-500 text-[13px] font-bold" aria-label="Completed">✓</span>
            )}
            <span className={`text-[12px] font-medium shrink-0 ${lesson.active ? 'text-purple-500' : 'text-gray-400'}`}>
              {lesson.duration}
            </span>
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
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
            {instructor.initials}
          </div>
          <div>
            <div className="text-base font-bold text-gray-900 leading-tight">{instructor.name}</div>
            <div className="text-[13px] text-gray-500 font-medium mt-0.5">{instructor.title}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-xl bg-gray-50/80 border border-gray-100 flex-wrap">
          {[
            { val: `${instructor.students.toLocaleString()}+`, lbl: 'Students', icon: Users },
            { val: instructor.courses,                          lbl: 'Courses', icon: BookOpen  },
            { val: `${instructor.rating} ★`,                   lbl: 'Rating', icon: Star   },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                {val}
              </span>
              <span className="text-[11px] text-gray-500 font-medium">{lbl}</span>
            </div>
          ))}
        </div>

        <p className="text-[13.5px] text-gray-600 leading-relaxed">{instructor.bio}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Reviews tab
───────────────────────────────────────────────────────── */
function ReviewsPanel({ course }) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center shrink-0 w-24">
          <div className="text-5xl font-black text-gray-900 leading-none mb-1">{course.rating}</div>
          <StarRating rating={course.rating} />
          <div className="text-[11px] text-gray-400 mt-1 font-medium">Course Rating</div>
        </div>
        <div className="flex-1 flex flex-col gap-1 max-w-[200px]">
          {[5,4,3,2,1].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400 font-medium w-[1ch]">{s}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${s === 5 ? 'bg-amber-400' : 'bg-gray-200'}`} 
                  style={{ width: s === 5 ? '85%' : s === 4 ? '12%' : '3%' }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {course.reviews.map((r, idx) => (
          <div key={r.name} className={`flex gap-3 py-4 ${idx !== course.reviews.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div 
              className="w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm" 
              style={{ background: r.bg }}
            >
              {r.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[13px] font-semibold text-gray-900">{r.name}</span>
                <span className="text-[10px] text-amber-400 tracking-widest">{'★'.repeat(r.rating)}</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed">{r.text}</p>
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
    <Card className="sticky top-24 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]" aria-label="Course purchase details">
      <div className={`relative h-[180px] flex items-center justify-center overflow-hidden ${course.thumbClass}`}>
        {course.bestseller && (
          <span className="absolute top-4 left-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10">
            Best Seller
          </span>
        )}
        <span className="absolute inset-0 bg-black/5" aria-hidden="true" />
        <span aria-hidden="true" className="text-[56px] drop-shadow-md z-10">{course.thumbIcon}</span>
      </div>

      <div className="p-6">
        <div className="text-[32px] font-extrabold text-gray-900 tracking-[-0.02em] leading-none mb-6 flex items-baseline" aria-label={`Price: ${course.price}`}>
          {course.price}
          <span className="text-[15px] font-medium text-gray-400 line-through ml-2.5">
            {course.originalPrice}
          </span>
        </div>

        <Button 
          className="w-full h-12 text-[14.5px] font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity mb-4 shadow-md"
          id="btn-enroll-now"
          aria-label={`Enroll in ${course.title} for ${course.price}`}
        >
          Enroll Now
        </Button>
        <p className="text-center text-[11.5px] text-gray-400 font-medium mb-6">30-Day Money-Back Guarantee</p>
        
        <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
          <p className="text-[13px] font-bold text-gray-900 mb-1">This course includes:</p>
          {course.includes.map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-[13px] text-gray-600 font-medium">
              <span className="text-green-500 shrink-0"><Check size={16} /></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
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
      <title>{course.title} — Skillora</title>
      <meta name="description" content={course.desc} />

      <LightNavbar />

      <main className="min-h-screen bg-gray-50" id="main-content">

        {/* Back link */}
        <div className="bg-white border-b border-gray-100 py-3.5 px-6">
          <div className="max-w-[1200px] mx-auto">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md px-2 py-1 -ml-2 no-underline" 
              aria-label="Back to Courses page"
            >
              <ArrowLeft size={14} /> Back to Courses
            </Link>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="max-w-[1200px] mx-auto px-6 py-7 pb-16 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-7 items-start">

          {/* ── Left ─────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Hero banner */}
            <div className={`relative rounded-xl overflow-hidden h-[220px] flex items-center justify-center ${course.thumbClass}`} role="img" aria-label={`${course.title} course thumbnail`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/35 to-black/10 z-0" aria-hidden="true" />
              {course.bestseller && (
                <span className="absolute top-4 left-4 z-10 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.04em]">
                  Best Seller
                </span>
              )}
              <span className="text-7xl z-10 drop-shadow-[0_6px_20px_rgba(0,0,0,0.3)]" aria-hidden="true">{course.thumbIcon}</span>

              {/* Meta overlay row */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-3.5 flex-wrap">
                {[
                  { icon: '⏱', label: course.hours },
                  { icon: '📋', label: `${course.lessons} Lessons` },
                  { icon: '🎓', label: 'Certificate' },
                  { icon: '♾️', label: 'Lifetime Access' },
                ].map(({ icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-sm text-white/90 text-[11.5px] font-medium px-2.5 py-1 rounded-md border border-white/15">
                    <span aria-hidden="true">{icon}</span>{label}
                  </span>
                ))}
              </div>
            </div>

            {/* Course info */}
            <Card className="p-6">
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-[0.04em] mb-3">
                ⬡ {course.level}
              </span>
              <h1 className="text-[26px] font-extrabold text-gray-900 tracking-[-0.02em] leading-tight mb-2.5">
                {course.title}
              </h1>
              <p className="text-[13.5px] text-gray-500 leading-relaxed mb-4">
                {course.desc}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                  <span aria-hidden="true" className="text-amber-400 text-sm">★</span>
                  <strong className="text-gray-900">{course.rating}</strong>
                  <span>({course.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                  <span aria-hidden="true">👥</span>
                  {course.students.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                  <span aria-hidden="true">🗓</span>
                  Updated {course.lastUpdated}
                </span>
              </div>
            </Card>

            {/* Tabbed content */}
            <Card className="overflow-hidden">
              {/* Tab header */}
              <div className="flex border-b border-gray-100" role="tablist" aria-label="Course content sections">
                {DETAIL_TABS.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    type="button"
                    id={`detail-tab-${tab.toLowerCase()}`}
                    aria-selected={activeTab === tab}
                    aria-controls={`detail-panel-${tab.toLowerCase()}`}
                    className={`flex-1 h-12 text-[13px] font-medium transition-colors border-b-2 ${
                      activeTab === tab 
                        ? 'text-purple-600 font-semibold border-purple-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-800'
                    }`}
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
            </Card>

          </div>

          {/* ── Right — Sticky price card ─────────── */}
          <div className="w-full">
            <PriceCard course={course} />
          </div>

        </div>
      </main>
    </>
  )
}
