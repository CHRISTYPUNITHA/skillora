/**
 * DashboardPage.jsx
 * Learner Dashboard — "Good Morning, Rahul! 👋"
 * Sections: Sidebar · Topbar · Welcome · Stats · Continue Learning
 *           · Recent Activity · Progress Summary · Upcoming · Quick Actions
 */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const ENROLLED_COURSES = [
  {
    id: 1,
    thumb: '🚀',
    thumbBg: 'linear-gradient(135deg,#100D2E,#6C4CF0)',
    level: 'Beginner → Intermediate',
    title: 'Full-Stack Foundations',
    sub: 'Continue where you left off',
    progress: 72,
    completedLessons: 23,
    totalLessons: 32,
  },
  {
    id: 2,
    thumb: '⚛️',
    thumbBg: 'linear-gradient(135deg,#0E3B2E,#14B87F)',
    level: 'Intermediate',
    title: 'React Product Engineering',
    sub: 'Just started',
    progress: 35,
    completedLessons: 10,
    totalLessons: 28,
  },
]

const ACTIVITIES = [
  { id: 1, dot: 'purple', action: 'Completed Lesson',  course: 'API Authentication · Full-Stack Foundations',   time: '3 hrs ago' },
  { id: 2, dot: 'amber',  action: 'Watched Video',     course: 'Database Design · Full-Stack Foundations',        time: 'Yesterday' },
  { id: 3, dot: 'green',  action: 'Completed Lesson',  course: 'React Components · React Product Engineering',    time: '2 days ago' },
  { id: 4, dot: 'teal',   action: 'Started Course',    course: 'React Product Engineering',                       time: '2 days ago' },
  { id: 5, dot: 'purple', action: 'Earned Certificate', course: 'Intro to JavaScript · Bonus Module',             time: '5 days ago' },
]

const UPCOMING_LESSONS = [
  { id: 1, icon: '🗄️', iconBg: 'rgba(124,92,252,0.10)', title: 'Database Design & Prisma ORM',    sub: 'Full-Stack · Lesson 24', tag: 'new',    tagLabel: 'Next Up' },
  { id: 2, icon: '🔐', iconBg: 'rgba(45,212,224,0.10)',  title: 'JWT & Refresh Tokens',             sub: 'Full-Stack · Lesson 25', tag: 'locked', tagLabel: 'Locked' },
  { id: 3, icon: '⚡', iconBg: 'rgba(74,222,128,0.10)',  title: 'React Query Basics',               sub: 'React Eng. · Lesson 11', tag: 'new',    tagLabel: 'Next Up' },
]

const QUICK_ACTIONS = [
  { id: 'qa-courses',   icon: '📚', bg: 'rgba(124,92,252,0.09)', label: 'Browse Courses',  to: '/courses' },
  { id: 'qa-certs',     icon: '🎓', bg: 'rgba(74,222,128,0.09)',  label: 'My Certificates', to: '/certificates' },
  { id: 'qa-community', icon: '💬', bg: 'rgba(45,212,224,0.09)',  label: 'Community',       to: '#' },
  { id: 'qa-settings',  icon: '⚙️', bg: 'rgba(251,146,60,0.09)',  label: 'Settings',        to: '#' },
]

const ACHIEVEMENTS = [
  { icon: '🔥', label: '12-Day Streak' },
  { icon: '⭐', label: 'First Course' },
  { icon: '🏆', label: 'Top Learner' },
  { icon: '💡', label: '20 Lessons' },
  { icon: '🎯', label: 'Goal Setter' },
]

const PROGRESS_METRICS = [
  { label: 'Lessons Done',   value: 18, max: 60,  pct: 30,  color: '#7C5CFC' },
  { label: 'Hours Learned',  value: 6,  max: 20,  pct: 30,  color: '#2DD4E0' },
  { label: 'Certificates',   value: 1,  max: 3,   pct: 33,  color: '#4ADE80' },
]

const SIDEBAR_NAV = [
  { id: 'nav-dashboard', icon: '🏠', label: 'Dashboard',   path: '/dashboard', badge: null },
  { id: 'nav-mylearning',icon: '📖', label: 'My Learning', path: '/my-learning', badge: '2' },
  { id: 'nav-courses',   icon: '🎒', label: 'Courses',     path: '/courses',  badge: null },
  { id: 'nav-certs',     icon: '🎓', label: 'Certificates',path: '/certs',    badge: null },
]

const SIDEBAR_SECONDARY = [
  { id: 'nav-community', icon: '💬', label: 'Community',  path: '#' },
  { id: 'nav-settings',  icon: '⚙️', label: 'Settings',   path: '#' },
  { id: 'nav-help',      icon: '❓', label: 'Help Center', path: '#' },
]

const TOP_TABS = ['Dashboard', 'My Learning', 'Certificates']

/* ─────────────────────────────────────────────────────────
   Greeting helper — time-aware
───────────────────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

/* ─────────────────────────────────────────────────────────
   Sidebar
───────────────────────────────────────────────────────── */
function Sidebar({ activeNav, onNav }) {
  return (
    <aside className="bg-white border-r border-gray-100 flex flex-col p-0 overflow-y-auto fixed top-0 left-0 bottom-0 w-[240px] z-50 max-lg:hidden" role="navigation" aria-label="Dashboard sidebar">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-[9px] px-5 py-[22px] pb-[18px] border-b border-gray-100 no-underline" aria-label="Skillora home">
        <div className="w-[34px] h-[34px] bg-gradient-to-br from-purple-500 to-purple-700 rounded-[10px] flex items-center justify-center text-[16px] shadow-[0_4px_12px_rgba(124,92,252,0.35)]">⚡</div>
        <span className="text-[17px] font-bold text-gray-900 tracking-[-0.02em]">Skillora</span>
      </Link>

      {/* Main nav */}
      <div className="px-3 pt-5 pb-2">
        <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 px-2 mb-1.5">Main</div>
        <ul className="flex flex-col gap-0.5" role="list">
          {SIDEBAR_NAV.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium w-full text-left transition-all duration-150 ${activeNav === item.id ? 'bg-purple-500/10 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                id={item.id}
                onClick={() => onNav(item.id)}
                aria-current={activeNav === item.id ? 'page' : undefined}
              >
                <span className={`text-[16px] w-5 flex items-center justify-center shrink-0 ${activeNav === item.id ? 'text-purple-500' : ''}`} aria-hidden="true">{item.icon}</span>
                {item.label}
                {item.badge && <span className="ml-auto text-[10px] font-bold bg-purple-500 text-white rounded-full px-[7px] py-[2px] min-w-[20px] text-center" aria-label={`${item.badge} items`}>{item.badge}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-gray-100 mx-3 my-2" aria-hidden="true" />

      {/* Secondary nav */}
      <div className="px-3 pt-5 pb-2">
        <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 px-2 mb-1.5">Support</div>
        <ul className="flex flex-col gap-0.5" role="list">
          {SIDEBAR_SECONDARY.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium w-full text-left transition-all duration-150 ${activeNav === item.id ? 'bg-purple-500/10 text-purple-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                id={item.id}
                onClick={() => onNav(item.id)}
              >
                <span className={`text-[16px] w-5 flex items-center justify-center shrink-0 ${activeNav === item.id ? 'text-purple-500' : ''}`} aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User card */}
      <div className="mt-auto px-3 pt-3.5 pb-5 border-t border-gray-100">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-25 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-[#F0F1F8] hover:border-[#E0E3F0]" role="button" tabIndex={0} aria-label="User profile">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-[14px] font-bold text-white shrink-0" aria-hidden="true">R</div>
          <div>
            <div className="text-[13px] font-semibold text-gray-900">Rahul Mehta</div>
            <div className="text-[11px] text-gray-400">rahul@example.com</div>
          </div>
          <span className="ml-auto text-gray-400 text-[14px]" aria-hidden="true">⋯</span>
        </div>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────
   Top Bar
───────────────────────────────────────────────────────── */
function Topbar({ activeTab, onTab }) {
  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-4 sm:px-8 gap-4" role="banner">
      <div className="flex items-center gap-0.5 flex-1" role="tablist" aria-label="Dashboard sections">
        {TOP_TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`px-4 py-2 text-[13.5px] rounded-lg transition-all duration-150 relative ${activeTab === tab ? 'text-purple-600 font-semibold' : 'text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50'}`}
            id={`topbar-tab-${tab.toLowerCase().replace(' ', '-')}`}
            onClick={() => onTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute -bottom-[13px] left-4 right-4 h-[2px] bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        {/* Search */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 border-[1.5px] border-gray-100 rounded-[10px] cursor-pointer text-[13px] text-gray-400 transition-all duration-200 hover:border-gray-300 hover:bg-white" role="search" aria-label="Search courses">
          <span aria-hidden="true">🔍</span>
          <span className="hidden sm:inline">Search courses…</span>
        </div>

        {/* Notification bell */}
        <button className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center bg-gray-50 border-[1.5px] border-gray-100 cursor-pointer text-[16px] text-gray-600 transition-all duration-200 relative hover:bg-white hover:border-gray-300 hover:text-gray-900" id="btn-notifications" aria-label="Notifications (1 unread)" type="button">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border-2 border-white" aria-hidden="true" />
        </button>

        {/* Appearance toggle */}
        <button className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center bg-gray-50 border-[1.5px] border-gray-100 cursor-pointer text-[16px] text-gray-600 transition-all duration-200 relative hover:bg-white hover:border-gray-300 hover:text-gray-900" id="btn-theme" aria-label="Toggle theme" type="button">
          🌙
        </button>

        {/* Avatar */}
        <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-[14px] font-bold text-white cursor-pointer shadow-[0_2px_8px_rgba(124,92,252,0.28)] shrink-0" role="button" tabIndex={0} aria-label="Profile menu">
          R
        </div>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────
   Welcome Banner
───────────────────────────────────────────────────────── */
function WelcomeBanner() {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:px-8 sm:py-7 bg-gradient-to-br from-navy-900 via-navy-700 to-navy-800 rounded-[20px] relative overflow-hidden shadow-[0_4px_24px_rgba(10,8,30,0.16)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_80%_50%,rgba(124,92,252,0.18)_0%,transparent_55%),radial-gradient(circle_at_20%_80%,rgba(45,212,224,0.10)_0%,transparent_45%)] before:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(rgba(124,92,252,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(124,92,252,0.06)_1px,transparent_1px)] after:bg-[size:40px_40px] after:[mask-image:radial-gradient(ellipse_80%_80%_at_60%_50%,black_40%,transparent_100%)] after:pointer-events-none" aria-labelledby="welcome-heading">
      <div className="relative z-10">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9B87FF]/80 mb-1.5" aria-hidden="true">✦ {getGreeting()}</p>
        <h1 className="text-[clamp(20px,2.5vw,26px)] font-extrabold text-white tracking-[-0.02em] mb-1.5" id="welcome-heading">
          {getGreeting()}, Rahul! 👋
        </h1>
        <p className="text-[13.5px] text-white/50 leading-[1.6]">
          Let's continue your learning journey — you're on a roll!
        </p>
        <div className="flex gap-2.5 mt-5">
          <Link to="#continue" className="px-5 py-2.5 text-[13px] font-semibold text-white bg-gradient-to-br from-purple-500 to-purple-600 rounded-[10px] shadow-[0_4px_14px_rgba(108,76,240,0.40)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(108,76,240,0.50)] inline-flex items-center gap-[7px]" id="btn-view-learning">
            <span>Continue Learning</span><span>→</span>
          </Link>
          <Link to="/courses" className="px-[18px] py-[9px] text-[13px] font-medium text-white/70 bg-white/10 border border-white/15 rounded-[10px] transition-all duration-200 hover:bg-white/15 hover:border-white/20 hover:text-white inline-flex items-center gap-[7px]" id="btn-browse-courses">
            Browse Courses
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start sm:items-end gap-3.5 shrink-0 w-full sm:w-auto">
        {/* Streak badge */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md" aria-label="Current streak: 12 days">
          <span className="text-[30px]" aria-hidden="true">🔥</span>
          <div>
            <div className="text-[10.5px] text-white/40 mb-0.5">Current Streak</div>
            <div className="text-[22px] font-extrabold text-white flex items-baseline gap-1">
              12
              <span className="text-[12px] font-medium text-white/50">days</span>
            </div>
          </div>
        </div>

        {/* Milestone chips */}
        <div className="flex gap-2" aria-label="Milestones">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-white/60"><span aria-hidden="true">🏆</span> Top 10%</span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-white/60"><span aria-hidden="true">⭐</span> 4.9 Rated</span>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   Stats Row
───────────────────────────────────────────────────────── */
function StatsRow() {
  const stats = [
    { id: 'stat-courses',  icon: '📚', color: 'purple', trend: null,   value: '2',      unit: '',     label: 'Courses Enrolled' },
    { id: 'stat-lessons',  icon: '📋', color: 'teal',   trend: '+3',   value: '18',     unit: '',     label: 'Lessons Completed' },
    { id: 'stat-hours',    icon: '⏱️', color: 'amber',  trend: '+1h',  value: '6',      unit: 'h 24m',label: 'Hours Learned' },
    { id: 'stat-streak',   icon: '🔥', color: 'green',  trend: '🔥',   value: '12',     unit: 'days', label: 'Current Streak' },
  ]

  const colorStyles = {
    purple: {
      before: 'before:bg-gradient-to-r before:from-[#7C5CFC] before:to-[#9B87FF]',
      iconBg: 'bg-[#7C5CFC]/10 border-[#7C5CFC]/15',
    },
    teal: {
      before: 'before:bg-gradient-to-r before:from-[#2DD4E0] before:to-[#5EEAD4]',
      iconBg: 'bg-[#2DD4E0]/10 border-[#2DD4E0]/15',
    },
    amber: {
      before: 'before:bg-gradient-to-r before:from-[#FB923C] before:to-[#FBBF24]',
      iconBg: 'bg-[#FB923C]/10 border-[#FB923C]/15',
    },
    green: {
      before: 'before:bg-gradient-to-r before:from-[#4ADE80] before:to-[#22C55E]',
      iconBg: 'bg-[#4ADE80]/10 border-[#4ADE80]/15',
    },
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4" role="region" aria-label="Learning statistics">
      {stats.map((s) => (
        <div key={s.id} className={`bg-white border border-gray-100 rounded-2xl px-4 sm:px-[22px] py-5 flex flex-col gap-3.5 transition-all duration-250 relative overflow-hidden hover:border-purple-500/20 hover:shadow-[0_4px_20px_rgba(10,8,30,0.08)] hover:-translate-y-0.5 group before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:opacity-0 before:transition-opacity before:duration-250 hover:before:opacity-100 ${colorStyles[s.color].before}`} id={s.id}>
          <div className="flex items-center justify-between">
            <div className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] shrink-0 border ${colorStyles[s.color].iconBg}`} aria-hidden="true">{s.icon}</div>
            {s.trend && (
              <span className={`text-[11px] font-semibold px-2 py-[3px] rounded-md ${s.trend === '🔥' ? 'text-orange-400 bg-orange-400/10' : 'text-green-500 bg-green-400/10'}`} aria-label={`Trend: ${s.trend}`}>
                {s.trend}
              </span>
            )}
          </div>
          <div>
            <div className="text-[28px] font-extrabold text-gray-900 tracking-[-0.025em] leading-none">
              {s.value}
              {s.unit && <span className="text-[14px] font-medium text-gray-400 ml-1"> {s.unit}</span>}
            </div>
            <div className="text-[12.5px] font-medium text-gray-500 mt-1">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Continue Learning Card
───────────────────────────────────────────────────────── */
function ContinueLearning() {
  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden" id="continue" aria-labelledby="continue-heading">
      <div className="flex items-center justify-between px-[22px] py-4 border-b border-gray-100">
        <div>
          <div className="text-[14.5px] font-bold text-gray-900" id="continue-heading">Continue Learning</div>
          <div className="text-[12px] text-gray-400 mt-0.5">Pick up where you left off</div>
        </div>
        <Link to="/my-learning" className="text-[12.5px] font-semibold text-purple-500 flex items-center gap-1 transition-colors hover:text-purple-600" id="link-view-all-courses">
          View All →
        </Link>
      </div>
      <div className="p-4 sm:p-[22px]">
        <div className="flex flex-col gap-3.5" role="list">
          {ENROLLED_COURSES.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-25 border border-gray-100 rounded-2xl transition-all duration-200 cursor-pointer hover:border-purple-500/20 hover:bg-white hover:shadow-[0_4px_16px_rgba(10,8,30,0.07)]" role="listitem" tabIndex={0} aria-label={`${c.title} — ${c.progress}% complete`}>
              {/* Thumb */}
              <div className="w-[58px] h-[58px] rounded-xl flex items-center justify-center text-[26px] shrink-0" style={{ background: c.thumbBg }} aria-hidden="true">
                {c.thumb}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold tracking-[0.08em] uppercase text-purple-500 mb-1">{c.level}</div>
                <div className="text-[14px] font-bold text-gray-900 mb-0.5 truncate">{c.title}</div>
                <div className="text-[11.5px] text-gray-400 mb-2.5">{c.sub}</div>

                <div
                  className="h-[5px] bg-gray-100 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={c.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${c.progress}% complete`}
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-teal-400 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: `${c.progress}%` }} />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] font-semibold text-purple-500">{c.progress}% complete</span>
                  <span className="text-[11px] text-gray-400">{c.completedLessons}/{c.totalLessons} lessons</span>
                </div>
              </div>

              {/* Continue btn */}
              <button
                className="px-[18px] py-[9px] text-[12.5px] font-semibold text-purple-500 bg-purple-500/10 border-[1.5px] border-purple-500/20 rounded-[10px] whitespace-nowrap transition-all duration-200 shrink-0 hover:bg-purple-500/15 hover:border-purple-500/35 w-full sm:w-auto"
                id={`btn-continue-${c.id}`}
                type="button"
                aria-label={`Continue ${c.title}`}
              >
                Continue →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Achievements Strip
───────────────────────────────────────────────────────── */
function AchievementsStrip() {
  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden" aria-labelledby="achievements-heading">
      <div className="flex items-center justify-between px-[22px] py-4 border-b border-gray-100">
        <div className="text-[14.5px] font-bold text-gray-900" id="achievements-heading">🏅 Achievements</div>
        <button className="text-[12.5px] font-semibold text-purple-500 transition-colors hover:text-purple-600" type="button" id="btn-all-achievements">View All</button>
      </div>
      <div className="flex gap-2.5 overflow-x-auto px-5 py-4 pb-4.5 scrollbar-none" style={{ scrollbarWidth: 'none' }} role="list" aria-label="Your achievements">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.label} className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/15 rounded-[10px] shrink-0" role="listitem">
            <span className="text-[18px]" aria-hidden="true">{a.icon}</span>
            <span className="text-[12px] font-semibold text-gray-700 whitespace-nowrap">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Recent Activity Card
───────────────────────────────────────────────────────── */
function RecentActivity() {
  const dotColors = {
    purple: 'text-purple-500 bg-purple-500/10',
    amber: 'text-orange-400 bg-orange-400/10',
    green: 'text-green-500 bg-green-400/10',
    teal: 'text-teal-400 bg-teal-400/10'
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden" aria-labelledby="activity-heading">
      <div className="flex items-center justify-between px-[22px] py-4 border-b border-gray-100">
        <div>
          <div className="text-[14.5px] font-bold text-gray-900" id="activity-heading">Recent Activity</div>
          <div className="text-[12px] text-gray-400 mt-0.5">Your last 5 actions</div>
        </div>
        <button className="text-[12.5px] font-semibold text-purple-500 transition-colors hover:text-purple-600" type="button" id="btn-all-activity">See All</button>
      </div>
      <div className="p-[22px] pt-2">
        <ul className="flex flex-col" role="list" aria-label="Recent learning activity">
          {ACTIVITIES.map((a, i) => (
            <li key={a.id} className={`flex items-start gap-3.5 py-3 ${i !== ACTIVITIES.length - 1 ? 'border-b border-[#F0F1F8]' : ''}`} role="listitem">
              <div className="flex flex-col items-center gap-0 pt-[3px] shrink-0">
                <span className={`w-2.5 h-2.5 rounded-full border-2 border-current shrink-0 ${dotColors[a.dot]}`} aria-hidden="true" />
                {i !== ACTIVITIES.length - 1 && <div className="w-px h-7 bg-gray-100 mt-1" aria-hidden="true" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{a.action}</div>
                <div className="text-[12px] text-gray-500 truncate">{a.course}</div>
              </div>
              <time className="text-[11px] text-gray-400 shrink-0 pt-0.5" dateTime={a.time}>{a.time}</time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Progress Summary (right column)
───────────────────────────────────────────────────────── */
function ProgressSummary() {
  const overallPct = 53
  const circumference = 2 * Math.PI * 52  // r=52
  const offset = circumference * (1 - overallPct / 100)

  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden" aria-labelledby="progress-summary-heading">
      <div className="flex items-center justify-between px-[20px] py-4 pb-3.5 border-b border-gray-100">
        <div className="text-[14px] font-bold text-gray-900" id="progress-summary-heading">Learning Progress</div>
        <button className="text-[12.5px] font-semibold text-purple-500 transition-colors hover:text-purple-600" type="button" id="btn-progress-detail">Details</button>
      </div>
      <div className="p-5 flex flex-col items-center gap-5">
        {/* Big ring */}
        <div className="relative w-[130px] h-[130px]" aria-label={`Overall progress: ${overallPct}%`}>
          <svg width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
            <defs>
              <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#7C5CFC" />
                <stop offset="100%" stopColor="#2DD4E0" />
              </linearGradient>
            </defs>
            <circle className="fill-none stroke-gray-100 stroke-[10]" cx="65" cy="65" r="52" />
            <circle
              className="fill-none stroke-[url(#dashGrad)] stroke-[10] [stroke-linecap:round] origin-center -rotate-90 transition-[stroke-dashoffset] duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              cx="65" cy="65" r="52"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[26px] font-extrabold text-gray-900 tracking-[-0.02em] leading-none">{overallPct}%</span>
            <span className="text-[10.5px] font-medium text-gray-400 mt-0.5">Overall Progress</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="w-full flex flex-col gap-2.5" role="list" aria-label="Progress breakdown">
          {PROGRESS_METRICS.map((m) => (
            <div key={m.label} className="flex items-center gap-2.5" role="listitem">
              <span className="text-[12px] font-medium text-gray-600 flex-1">{m.label}</span>
              <div
                className="flex-[2] h-[5px] bg-gray-100 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={m.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${m.label}: ${m.value}`}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${m.pct}%`, background: m.color }}
                />
              </div>
              <span className="text-[11.5px] font-bold text-gray-900 min-w-[28px] text-right">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex gap-4 w-full pt-1">
          {[
            { label: 'Completed', value: '18', color: '#7C5CFC' },
            { label: 'Total',     value: '34', color: '#A8AFBF' },
            { label: 'Certs',     value: '1',  color: '#22C55E' },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center">
              <div className="text-[18px] font-extrabold tracking-[-0.02em]" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Upcoming Lessons (right column)
───────────────────────────────────────────────────────── */
function UpcomingLessons() {
  const tags = {
    new: 'text-purple-500 bg-purple-500/10',
    locked: 'text-gray-400 bg-[#F0F1F8]',
    done: 'text-green-500 bg-green-400/10'
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden" aria-labelledby="upcoming-heading">
      <div className="flex items-center justify-between px-[22px] py-4 border-b border-gray-100">
        <div>
          <div className="text-[14.5px] font-bold text-gray-900" id="upcoming-heading">Up Next</div>
          <div className="text-[12px] text-gray-400 mt-0.5">Upcoming lessons</div>
        </div>
      </div>
      <ul className="flex flex-col gap-1 px-5 py-4" role="list" aria-label="Upcoming lessons">
        {UPCOMING_LESSONS.map((item) => (
          <li key={item.id}>
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-colors duration-200 cursor-pointer hover:bg-gray-50"
              role="button"
              tabIndex={0}
              id={`upcoming-${item.id}`}
              aria-label={`${item.title} — ${item.tagLabel}`}
            >
              <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-[16px] shrink-0" style={{ background: item.iconBg }} aria-hidden="true">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-gray-900 truncate">{item.title}</div>
                <div className="text-[11px] text-gray-400 mt-[1px]">{item.sub}</div>
              </div>
              <span className={`text-[10.5px] font-bold px-[9px] py-[3px] rounded-md whitespace-nowrap shrink-0 ${tags[item.tag]}`}>{item.tagLabel}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Quick Actions (right column)
───────────────────────────────────────────────────────── */
function QuickActions() {
  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden" aria-labelledby="quick-actions-heading">
      <div className="flex items-center justify-between px-[22px] py-4 border-b border-gray-100">
        <div className="text-[14.5px] font-bold text-gray-900" id="quick-actions-heading">Quick Actions</div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 px-5 py-4" role="list" aria-label="Quick actions">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.id}
            to={a.to}
            className="flex flex-col items-center gap-2 px-2.5 py-4 bg-gray-25 border-[1.5px] border-gray-100 rounded-[13px] cursor-pointer transition-all duration-200 no-underline hover:bg-white hover:border-purple-500/20 hover:shadow-[0_4px_14px_rgba(10,8,30,0.07)] hover:-translate-y-0.5"
            id={a.id}
            role="listitem"
            aria-label={a.label}
          >
            <div className="text-[22px] w-[42px] h-[42px] rounded-[11px] flex items-center justify-center" style={{ background: a.bg }} aria-hidden="true">
              {a.icon}
            </div>
            <span className="text-[12px] font-semibold text-gray-700 text-center leading-[1.3]">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Dashboard Page — Root
───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('nav-dashboard')
  const [activeTab, setActiveTab] = useState('Dashboard')

  /* Animate progress bars on mount */
  useEffect(() => {
    document.title = 'Dashboard — Skillora'
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] bg-gray-50 font-sans min-h-screen">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />

      {/* Main area */}
      <div className="flex flex-col min-h-screen overflow-y-auto">
        {/* Topbar */}
        <Topbar activeTab={activeTab} onTab={setActiveTab} />

        {/* Scrollable body */}
        <div className="px-4 sm:px-8 py-5 sm:py-8 pb-9 sm:pb-12 flex flex-col gap-7 flex-1" role="main">
          {/* Welcome banner */}
          <WelcomeBanner />

          {/* 4 Stat cards */}
          <StatsRow />

          {/* Main 2-column grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              <ContinueLearning />
              <AchievementsStrip />
              <RecentActivity />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-[18px] max-xl:grid max-xl:grid-cols-2 max-sm:grid-cols-1">
              <ProgressSummary />
              <UpcomingLessons />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
