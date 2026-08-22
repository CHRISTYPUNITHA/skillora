/**
 * LandingPage.jsx
 * Full Skillora landing page:
 *   Navbar → Hero → Stats Band → Features → Courses → Testimonials → CTA → Footer
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    slug: 'full-stack-foundations',
    thumb: '🚀',
    thumbClass: 'bg-gradient-thumbnail',
    level: 'Beginner → Intermediate',
    title: 'Full-Stack Foundations',
    desc: 'Build production-ready full-stack applications from scratch with React, Node.js, Express and PostgreSQL.',
    hours: '8h 20m',
    lessons: 32,
    price: '₹799',
    bestseller: true,
  },
  {
    id: 2,
    slug: 'react-product-engineering',
    thumb: '⚛️',
    thumbClass: 'bg-gradient-thumbnail-2',
    level: 'Intermediate',
    title: 'React Product Engineering',
    desc: 'Master advanced React patterns, state management, performance optimisation and testing.',
    hours: '6h 40m',
    lessons: 28,
    price: '₹999',
    bestseller: false,
  },
  {
    id: 3,
    slug: 'nodejs-api-architecture',
    thumb: '🛠️',
    thumbClass: 'bg-gradient-thumbnail-3',
    level: 'Intermediate',
    title: 'Node.js API Architecture',
    desc: 'Design and build scalable RESTful APIs with Node.js, Express and best practices.',
    hours: '7h 10m',
    lessons: 26,
    price: '₹999',
    bestseller: false,
  },
]

const FEATURES = [
  { icon: '🏗️', color: 'purple', title: 'Learn by Building',     desc: 'Hands-on projects and practical examples in every course. No fluff, just real-world code.' },
  { icon: '📈', color: 'teal',   title: 'Track Your Progress',   desc: 'Smart progress tracking, streaks, and achievements keep you motivated every day.' },
  { icon: '♾️', color: 'amber',  title: 'Lifetime Access',       desc: 'Pay once and learn forever. All future updates to the course are included.' },
  { icon: '🎓', color: 'green',  title: 'Certificates',          desc: 'Earn shareable certificates upon completion to showcase your skills to employers.' },
  { icon: '💬', color: 'rose',   title: 'Community Support',     desc: 'Join thousands of learners in our Discord community and get help when you need it.' },
  { icon: '📱', color: 'blue',   title: 'Learn Anywhere',        desc: 'Fully responsive platform — learn on desktop, tablet or mobile, any time.' },
]

const TESTIMONIALS = [
  {
    stars: 5,
    quote: '"Skillora transformed my career. The Full-Stack course was incredibly practical — I landed my first dev job within 3 months of completing it."',
    name: 'Rahul Mehta',
    role: 'Full-Stack Developer at Razorpay',
    initials: 'RM',
    bg: 'linear-gradient(135deg,#7C5CFC,#5A3DE8)',
  },
  {
    stars: 5,
    quote: '"The React course is the best I\'ve taken online. The instructor explains complex patterns in such a clear, concise way. Worth every rupee!"',
    name: 'Priya Sharma',
    role: 'Frontend Engineer at Swiggy',
    initials: 'PS',
    bg: 'linear-gradient(135deg,#0E3B2E,#14B87F)',
  },
  {
    stars: 5,
    quote: '"I\'ve tried many platforms but Skillora\'s project-based approach finally made concepts click. The Node.js API course alone paid for itself."',
    name: 'Aditya Nair',
    role: 'Backend Developer at PhonePe',
    initials: 'AN',
    bg: 'linear-gradient(135deg,#2A1A00,#E8A33D)',
  },
]

const NAV_LINKS = [
  { label: 'Home',    href: '#home' },
  { label: 'Courses', href: '/courses' },
  { label: 'About',   href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

/* ─────────────────────────────────────────────────────────
   Scroll Reveal Hook
───────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.14 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─────────────────────────────────────────────────────────
   Navbar
───────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar" aria-label="Main navigation">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Skillora home">
          <div className="navbar__logo-icon">⚡</div>
          <span>Skillora</span>
        </Link>

        <ul className="navbar__nav" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="navbar__link">{label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/login"  className="btn-ghost"   id="btn-login">Login ↓</Link>
          <Link to="/signup" className="btn-primary" id="btn-get-started">Get Started ✦</Link>
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero-section" id="home" aria-label="Hero">
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${(i * 8.3) % 100}%`,
            animationDuration: `${8 + (i % 5) * 2}s`,
            animationDelay: `${(i * 0.7) % 5}s`,
            width:  `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
          }} />
        ))}
      </div>

      <div className="hero-content">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-eyebrow" aria-label="Platform tagline">
            <span className="hero-eyebrow__dot" />
            <span className="hero-eyebrow__text">New courses every month</span>
          </div>

          <h1 className="hero-heading">
            Your next skill should become your{' '}
            <span className="accent">next product.</span>
          </h1>

          <p className="hero-desc">
            Practical courses for developers who want real-world skills and
            build amazing products. From zero to production-ready.
          </p>

          <div className="hero-cta">
            <a href="#courses" className="btn-primary-lg" id="btn-explore-hero">
              <span>Explore Courses</span><span>→</span>
            </a>
            <a href="#about" className="btn-secondary-lg" id="btn-how-it-works">
              <span className="play-icon">▶</span>
              <span>How it works</span>
            </a>
          </div>

          <div className="hero-stats" role="list" aria-label="Platform statistics">
            {[
              { value: '3+',    label: 'Courses' },
              { value: '500+',  label: 'Students' },
              { value: '4.9 ★', label: 'Average Rating' },
              { value: '100+',  label: 'Hours of Content' },
            ].map((s, i) => (
              <>
                {i > 0 && <div key={`sep-${i}`} className="hero-stat-divider" aria-hidden="true" />}
                <div key={s.label} className="hero-stat" role="listitem">
                  <span className="hero-stat__value">{s.value}</span>
                  <span className="hero-stat__label">{s.label}</span>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Right — Dashboard preview card */}
        <div className="hero-right">
          <div className="hero-dashboard">
            <div className="dashboard-card" aria-label="Learning progress preview">
              <div className="dashboard-card__header">
                <span className="dashboard-card__title">Learning Progress</span>
                <span className="dashboard-card__badge">On Track ✓</span>
              </div>

              <div className="progress-ring-container">
                <div className="progress-ring-wrapper">
                  <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#7C5CFC" />
                        <stop offset="100%" stopColor="#2DD4E0" />
                      </linearGradient>
                    </defs>
                    <circle className="progress-ring-bg"   cx="45" cy="45" r="39" />
                    <circle className="progress-ring-fill" cx="45" cy="45" r="39" />
                  </svg>
                  <div className="progress-ring-label" aria-label="72 percent complete">
                    <span className="progress-ring-percent">72%</span>
                    <span className="progress-ring-sub">Complete</span>
                  </div>
                </div>

                <div className="progress-info">
                  <div className="progress-info__title">Full-Stack Foundations</div>
                  <div className="progress-info__subtitle">Beginner → Intermediate</div>
                  <div className="progress-bar-track" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar-fill" />
                  </div>
                </div>
              </div>

              <div className="dashboard-streak" aria-label="Current learning streak">
                <div className="streak-left">
                  <span className="streak-label">Your Streak</span>
                  <span className="streak-value">12<span className="streak-unit">days</span></span>
                </div>
                <span className="streak-emoji" aria-hidden="true">🔥</span>
              </div>
            </div>

            <div className="float-card float-card-1" aria-hidden="true">
              <div className="float-card-inner">
                <div className="float-card-icon purple">🏆</div>
                <div>
                  <div className="float-card-text__title">Achievement Unlocked!</div>
                  <div className="float-card-text__sub">7-day streak 🔥</div>
                </div>
              </div>
            </div>

            <div className="float-card float-card-2" aria-hidden="true">
              <div className="float-card-inner">
                <div className="float-card-icon green">✅</div>
                <div>
                  <div className="float-card-text__title">Lesson Complete</div>
                  <div className="float-card-text__sub">API Authentication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   Stats Band
───────────────────────────────────────────────────────── */
function StatsBand() {
  const items = [
    { icon: '📚', bg: 'rgba(124,92,252,0.10)', value: '3+',    label: 'Expert Courses' },
    { icon: '👨‍💻', bg: 'rgba(45,212,224,0.10)', value: '500+',  label: 'Active Students' },
    { icon: '⭐', bg: 'rgba(251,146,60,0.10)',  value: '4.9/5', label: 'Average Rating' },
    { icon: '🎓', bg: 'rgba(74,222,128,0.10)', value: '200+',  label: 'Certificates Issued' },
  ]
  return (
    <div className="stats-band" id="stats" role="region" aria-label="Platform statistics">
      <div className="stats-band__inner">
        {items.map((s) => (
          <div key={s.label} className="stat-item fade-up">
            <div className="stat-item__icon" style={{ background: s.bg }}>{s.icon}</div>
            <span className="stat-item__value">{s.value}</span>
            <span className="stat-item__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Features
───────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="section features-section" id="about" role="region" aria-labelledby="features-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-eyebrow">✦ Why Skillora?</div>
          <h2 className="section-title" id="features-heading">
            Everything you need to go from zero to hired
          </h2>
          <p className="section-subtitle">
            Skillora is built by developers, for developers. Every feature is
            designed to make learning faster, stickier and more rewarding.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`feature-card fade-up fade-up-delay-${(i % 5) + 1}`}>
              <div className={`feature-card__icon ${f.color}`}>{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   Courses
───────────────────────────────────────────────────────── */
function CoursesSection() {
  const tabs = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
  const [activeTab, setActiveTab] = useState('All Levels')

  return (
    <section className="section courses-section" id="courses" role="region" aria-labelledby="courses-heading">
      <div className="section-inner">
        <div className="courses-header-row">
          <div className="section-header fade-up">
            <div className="section-eyebrow">📖 Explore Courses</div>
            <h2 className="section-title" id="courses-heading">
              Choose a course and start your learning journey.
            </h2>
          </div>
          <div className="courses-tabs" role="tablist" aria-label="Course level filter">
            {tabs.map((tab) => (
              <button
                key={tab} role="tab"
                aria-selected={activeTab === tab}
                className={`courses-tab${activeTab === tab ? ' active' : ''}`}
                id={`tab-${tab.toLowerCase().replace(' ', '-')}`}
                onClick={() => setActiveTab(tab)}
                type="button"
              >{tab}</button>
            ))}
          </div>
        </div>

        <div className="courses-grid" role="list" aria-label="Course listings">
          {COURSES.map((course, i) => (
            <div
              key={course.id}
              className={`course-card fade-up fade-up-delay-${i + 1}`}
              role="listitem" tabIndex={0}
              aria-label={`Course: ${course.title}`}
            >
              <div className={`course-card__thumb ${course.thumbClass}`}>
                {course.bestseller && <div className="course-card__bestseller">Best Seller</div>}
                <span className="course-card__thumb-icon" aria-hidden="true">{course.thumb}</span>
              </div>
              <div className="course-card__body">
                <div className="course-card__level">{course.level}</div>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.desc}</p>
                <div className="course-card__meta">
                  <span className="course-meta-item"><span aria-hidden="true">⏱</span>{course.hours}</span>
                  <span className="course-meta-item"><span aria-hidden="true">📋</span>{course.lessons} Lessons</span>
                  <span className="course-meta-item"><span aria-hidden="true">🎓</span>Certificate</span>
                </div>
                <div className="course-card__footer">
                  <div className="course-card__price">{course.price}<span>/ lifetime</span></div>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="btn-view-course"
                    id={`btn-view-course-${course.id}`}
                    aria-label={`View course: ${course.title}`}
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   Testimonials
───────────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials" role="region" aria-labelledby="testimonials-heading">
      <div className="section-inner">
        <div className="section-header fade-up">
          <div className="section-eyebrow">💬 Student Stories</div>
          <h2 className="section-title" id="testimonials-heading">Loved by developers across India</h2>
          <p className="section-subtitle">Don't take our word for it. Here's what our students say.</p>
        </div>
        <div className="testimonials-grid" role="list">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testimonial-card fade-up fade-up-delay-${i + 1}`} role="listitem">
              <div className="testimonial-card__stars" aria-label={`${t.stars} out of 5 stars`}>
                {Array.from({ length: t.stars }).map((_, j) => <span key={j} aria-hidden="true">⭐</span>)}
              </div>
              <p className="testimonial-card__quote">{t.quote}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-avatar" style={{ background: t.bg }} aria-hidden="true">{t.initials}</div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   CTA
───────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="cta-section" id="pricing" aria-labelledby="cta-heading">
      <div className="cta-inner">
        <div className="section-eyebrow fade-up" style={{ display: 'inline-flex', marginBottom: 20, color: '#9B87FF', background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.25)' }}>
          ✦ Start Today
        </div>
        <h2 className="cta-title fade-up" id="cta-heading">
          Ready to level up your <span className="accent">developer career?</span>
        </h2>
        <p className="cta-desc fade-up fade-up-delay-1">
          Join 500+ developers who are already building real products with Skillora.
          One-time payment. Lifetime access. No subscription.
        </p>
        <div className="cta-actions fade-up fade-up-delay-2">
          <Link to="/signup" className="btn-primary-lg" id="btn-explore-cta">
            <span>Get Started — ₹799</span><span>→</span>
          </Link>
          <a href="#courses" className="btn-secondary-lg" id="btn-browse-cta"
            style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)' }}>
            Browse All Courses
          </a>
        </div>
        <div className="cta-note fade-up fade-up-delay-3">
          {['30-day money-back guarantee', 'No subscription required', 'Lifetime access'].map((note) => (
            <span key={note} className="cta-note-item">
              <span aria-hidden="true">✓</span> {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { heading: 'Courses', links: ['Full-Stack Foundations', 'React Product Engineering', 'Node.js API Architecture', 'Coming Soon'] },
    { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { heading: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
  ]
  return (
    <footer className="footer" id="contact" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand__logo">
              <div className="navbar__logo-icon">⚡</div>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#FFF' }}>Skillora</span>
            </div>
            <p className="footer-brand__desc">
              Practical courses for developers who want real-world skills and build amazing products.
            </p>
            <div className="footer-social" aria-label="Social media links">
              {['𝕏', '▶', 'in', '💬'].map((icon, i) => (
                <a key={i} href="#" className="footer-social-btn" id={`footer-social-${i}`} aria-label={`Social link ${i + 1}`}>{icon}</a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <div className="footer-col__heading">{col.heading}</div>
              <ul className="footer-col__links" role="list">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="footer-col__link">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-divider" aria-hidden="true" />
        <div className="footer-bottom">
          <p className="footer-bottom__copy">© {new Date().getFullYear()} Skillora. All rights reserved. Made with ❤️ in India.</p>
          <div className="footer-bottom__links">
            {['Privacy', 'Terms', 'Cookies'].map((l) => (
              <a key={l} href="#" className="footer-bottom__link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────
   Landing Page — root export
───────────────────────────────────────────────────────── */
export default function LandingPage() {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <FeaturesSection />
        <CoursesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
