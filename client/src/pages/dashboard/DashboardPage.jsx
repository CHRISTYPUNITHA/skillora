/**
 * DashboardPage.jsx
 * Learner Dashboard — "Good Morning, Rahul! 👋"
 * Sections: Sidebar · Topbar · Welcome · Stats · Continue Learning
 *           · Recent Activity · Progress Summary · Upcoming · Quick Actions
 */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './dashboard.css'

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
    <aside className="dash-sidebar" role="navigation" aria-label="Dashboard sidebar">
      {/* Logo */}
      <Link to="/" className="dash-sidebar__logo" aria-label="Skillora home">
        <div className="dash-sidebar__logo-icon">⚡</div>
        <span className="dash-sidebar__logo-name">Skillora</span>
      </Link>

      {/* Main nav */}
      <div className="dash-sidebar__section">
        <div className="dash-sidebar__section-label">Main</div>
        <ul className="dash-sidebar__nav" role="list">
          {SIDEBAR_NAV.map((item) => (
            <li key={item.id}>
              <button
                className={`dash-nav-link${activeNav === item.id ? ' active' : ''}`}
                id={item.id}
                onClick={() => onNav(item.id)}
                aria-current={activeNav === item.id ? 'page' : undefined}
              >
                <span className="dash-nav-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
                {item.badge && <span className="dash-nav-badge" aria-label={`${item.badge} items`}>{item.badge}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="dash-sidebar__divider" aria-hidden="true" />

      {/* Secondary nav */}
      <div className="dash-sidebar__section">
        <div className="dash-sidebar__section-label">Support</div>
        <ul className="dash-sidebar__nav" role="list">
          {SIDEBAR_SECONDARY.map((item) => (
            <li key={item.id}>
              <button
                className={`dash-nav-link${activeNav === item.id ? ' active' : ''}`}
                id={item.id}
                onClick={() => onNav(item.id)}
              >
                <span className="dash-nav-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User card */}
      <div className="dash-sidebar__user">
        <div className="dash-user-card" role="button" tabIndex={0} aria-label="User profile">
          <div className="dash-user-avatar" aria-hidden="true">R</div>
          <div className="dash-user-info">
            <div className="dash-user-info__name">Rahul Mehta</div>
            <div className="dash-user-info__email">rahul@example.com</div>
          </div>
          <span className="dash-user-more" aria-hidden="true">⋯</span>
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
    <header className="dash-topbar" role="banner">
      <div className="dash-topbar__tabs" role="tablist" aria-label="Dashboard sections">
        {TOP_TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`dash-topbar__tab${activeTab === tab ? ' active' : ''}`}
            id={`topbar-tab-${tab.toLowerCase().replace(' ', '-')}`}
            onClick={() => onTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="dash-topbar__right">
        {/* Search */}
        <div className="dash-topbar__search" role="search" aria-label="Search courses">
          <span aria-hidden="true">🔍</span>
          <span>Search courses…</span>
        </div>

        {/* Notification bell */}
        <button className="dash-icon-btn" id="btn-notifications" aria-label="Notifications (1 unread)" type="button">
          🔔
          <span className="dash-notif-dot" aria-hidden="true" />
        </button>

        {/* Appearance toggle */}
        <button className="dash-icon-btn" id="btn-theme" aria-label="Toggle theme" type="button">
          🌙
        </button>

        {/* Avatar */}
        <div className="dash-topbar__avatar" role="button" tabIndex={0} aria-label="Profile menu">
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
    <section className="dash-welcome" aria-labelledby="welcome-heading">
      <div className="dash-welcome__left">
        <p className="dash-welcome__greeting" aria-hidden="true">✦ {getGreeting()}</p>
        <h1 className="dash-welcome__title" id="welcome-heading">
          {getGreeting()}, Rahul! 👋
        </h1>
        <p className="dash-welcome__sub">
          Let's continue your learning journey — you're on a roll!
        </p>
        <div className="dash-welcome__actions">
          <Link to="#continue" className="btn-dash-primary" id="btn-view-learning">
            <span>Continue Learning</span><span>→</span>
          </Link>
          <Link to="/courses" className="btn-dash-ghost" id="btn-browse-courses">
            Browse Courses
          </Link>
        </div>
      </div>

      <div className="dash-welcome__right">
        {/* Streak badge */}
        <div className="dash-streak-badge" aria-label="Current streak: 12 days">
          <span className="dash-streak-badge__emoji" aria-hidden="true">🔥</span>
          <div className="dash-streak-badge__info">
            <div className="dash-streak-badge__label">Current Streak</div>
            <div className="dash-streak-badge__value">
              12
              <span className="dash-streak-badge__unit">days</span>
            </div>
          </div>
        </div>

        {/* Milestone chips */}
        <div className="dash-milestones" aria-label="Milestones">
          <span className="dash-milestone-chip"><span aria-hidden="true">🏆</span> Top 10%</span>
          <span className="dash-milestone-chip"><span aria-hidden="true">⭐</span> 4.9 Rated</span>
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

  return (
    <div className="dash-stats" role="region" aria-label="Learning statistics">
      {stats.map((s) => (
        <div key={s.id} className={`stat-card ${s.color}`} id={s.id}>
          <div className="stat-card__top">
            <div className={`stat-card__icon ${s.color}`} aria-hidden="true">{s.icon}</div>
            {s.trend && (
              <span className={`stat-card__trend ${s.trend === '🔥' ? 'fire' : 'up'}`} aria-label={`Trend: ${s.trend}`}>
                {s.trend}
              </span>
            )}
          </div>
          <div>
            <div className="stat-card__value">
              {s.value}
              {s.unit && <span className="unit"> {s.unit}</span>}
            </div>
            <div className="stat-card__label">{s.label}</div>
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
    <div className="dash-card" id="continue" aria-labelledby="continue-heading">
      <div className="dash-card__header">
        <div>
          <div className="dash-card__title" id="continue-heading">Continue Learning</div>
          <div className="dash-card__subtitle">Pick up where you left off</div>
        </div>
        <Link to="/my-learning" className="dash-card__action" id="link-view-all-courses">
          View All →
        </Link>
      </div>
      <div className="dash-card__body">
        <div className="continue-learning-list" role="list">
          {ENROLLED_COURSES.map((c) => (
            <div key={c.id} className="course-progress-card" role="listitem" tabIndex={0} aria-label={`${c.title} — ${c.progress}% complete`}>
              {/* Thumb */}
              <div className="course-progress-thumb" style={{ background: c.thumbBg }} aria-hidden="true">
                {c.thumb}
              </div>

              {/* Info */}
              <div className="course-progress-info">
                <div className="course-progress-level">{c.level}</div>
                <div className="course-progress-title">{c.title}</div>
                <div className="course-progress-sub">{c.sub}</div>

                <div
                  className="course-progress-track"
                  role="progressbar"
                  aria-valuenow={c.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${c.progress}% complete`}
                >
                  <div className="course-progress-fill" style={{ width: `${c.progress}%` }} />
                </div>

                <div className="course-progress-footer">
                  <span className="course-progress-pct">{c.progress}% complete</span>
                  <span className="course-progress-lessons">{c.completedLessons}/{c.totalLessons} lessons</span>
                </div>
              </div>

              {/* Continue btn */}
              <button
                className="btn-continue"
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
    <div className="dash-card" aria-labelledby="achievements-heading">
      <div className="dash-card__header">
        <div className="dash-card__title" id="achievements-heading">🏅 Achievements</div>
        <button className="dash-card__action" type="button" id="btn-all-achievements">View All</button>
      </div>
      <div className="achievements-row" role="list" aria-label="Your achievements">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.label} className="achievement-chip" role="listitem">
            <span className="achievement-chip__icon" aria-hidden="true">{a.icon}</span>
            <span className="achievement-chip__label">{a.label}</span>
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
  return (
    <div className="dash-card" aria-labelledby="activity-heading">
      <div className="dash-card__header">
        <div>
          <div className="dash-card__title" id="activity-heading">Recent Activity</div>
          <div className="dash-card__subtitle">Your last 5 actions</div>
        </div>
        <button className="dash-card__action" type="button" id="btn-all-activity">See All</button>
      </div>
      <div className="dash-card__body" style={{ paddingTop: 8 }}>
        <ul className="activity-list" role="list" aria-label="Recent learning activity">
          {ACTIVITIES.map((a) => (
            <li key={a.id} className="activity-item" role="listitem">
              <div className="activity-dot-wrap">
                <span className={`activity-dot ${a.dot}`} aria-hidden="true" />
                <div className="activity-connector" aria-hidden="true" />
              </div>
              <div className="activity-body">
                <div className="activity-action">{a.action}</div>
                <div className="activity-course">{a.course}</div>
              </div>
              <time className="activity-time" dateTime={a.time}>{a.time}</time>
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
    <div className="progress-summary-card" aria-labelledby="progress-summary-heading">
      <div className="progress-summary-card__header">
        <div className="progress-summary-card__title" id="progress-summary-heading">Learning Progress</div>
        <button className="dash-card__action" type="button" id="btn-progress-detail">Details</button>
      </div>
      <div className="progress-ring-card__body">
        {/* Big ring */}
        <div className="big-ring-wrap" aria-label={`Overall progress: ${overallPct}%`}>
          <svg width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
            <defs>
              <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#7C5CFC" />
                <stop offset="100%" stopColor="#2DD4E0" />
              </linearGradient>
            </defs>
            <circle className="big-ring-bg"   cx="65" cy="65" r="52" />
            <circle
              className="big-ring-fill"
              cx="65" cy="65" r="52"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="big-ring-label">
            <span className="big-ring-pct">{overallPct}%</span>
            <span className="big-ring-sub">Overall Progress</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="progress-metrics" role="list" aria-label="Progress breakdown">
          {PROGRESS_METRICS.map((m) => (
            <div key={m.label} className="progress-metric" role="listitem">
              <span className="progress-metric__label">{m.label}</span>
              <div
                className="progress-metric__bar-track"
                role="progressbar"
                aria-valuenow={m.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${m.label}: ${m.value}`}
              >
                <div
                  className="progress-metric__bar-fill"
                  style={{ width: `${m.pct}%`, background: m.color }}
                />
              </div>
              <span className="progress-metric__val">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, width: '100%', paddingTop: 4 }}>
          {[
            { label: 'Completed', value: '18', color: '#7C5CFC' },
            { label: 'Total',     value: '34', color: '#A8AFBF' },
            { label: 'Certs',     value: '1',  color: '#22C55E' },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#A8AFBF', marginTop: 2 }}>{s.label}</div>
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
  return (
    <div className="dash-card" aria-labelledby="upcoming-heading">
      <div className="dash-card__header">
        <div>
          <div className="dash-card__title" id="upcoming-heading">Up Next</div>
          <div className="dash-card__subtitle">Upcoming lessons</div>
        </div>
      </div>
      <ul className="upcoming-list" role="list" aria-label="Upcoming lessons">
        {UPCOMING_LESSONS.map((item) => (
          <li key={item.id}>
            <div
              className="upcoming-item"
              role="button"
              tabIndex={0}
              id={`upcoming-${item.id}`}
              aria-label={`${item.title} — ${item.tagLabel}`}
            >
              <div className="upcoming-icon" style={{ background: item.iconBg }} aria-hidden="true">
                {item.icon}
              </div>
              <div className="upcoming-info">
                <div className="upcoming-title">{item.title}</div>
                <div className="upcoming-sub">{item.sub}</div>
              </div>
              <span className={`upcoming-tag ${item.tag}`}>{item.tagLabel}</span>
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
    <div className="dash-card" aria-labelledby="quick-actions-heading">
      <div className="dash-card__header">
        <div className="dash-card__title" id="quick-actions-heading">Quick Actions</div>
      </div>
      <div className="quick-actions-grid" role="list" aria-label="Quick actions">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.id}
            to={a.to}
            className="quick-action-btn"
            id={a.id}
            role="listitem"
            aria-label={a.label}
          >
            <div className="quick-action-icon" style={{ background: a.bg }} aria-hidden="true">
              {a.icon}
            </div>
            <span className="quick-action-label">{a.label}</span>
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
    <div className="dash-shell">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />

      {/* Main area */}
      <div className="dash-main">
        {/* Topbar */}
        <Topbar activeTab={activeTab} onTab={setActiveTab} />

        {/* Scrollable body */}
        <div className="dash-body" role="main">
          {/* Welcome banner */}
          <WelcomeBanner />

          {/* 4 Stat cards */}
          <StatsRow />

          {/* Main 2-column grid */}
          <div className="dash-grid">
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ContinueLearning />
              <AchievementsStrip />
              <RecentActivity />
            </div>

            {/* Right column */}
            <div className="dash-right-col">
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
