/**
 * AuthLayout.jsx
 * Shared two-column layout for Login & Signup pages.
 * Left: dark brand panel with animated orbs + course previews + testimonial
 * Right: white form card (injected via children)
 */
import { Link } from 'react-router-dom'

/* Course preview data for the left panel */
const PREVIEW_COURSES = [
  { icon: '🚀', title: 'Full-Stack Foundations', sub: 'Beginner → Intermediate', bg: 'linear-gradient(135deg,#100D2E,#6C4CF0)' },
  { icon: '⚛️', title: 'React Product Engineering', sub: 'Intermediate',            bg: 'linear-gradient(135deg,#0E3B2E,#14B87F)' },
  { icon: '🛠️', title: 'Node.js API Architecture',  sub: 'Intermediate',            bg: 'linear-gradient(135deg,#2A1A00,#E8A33D)' },
]

export default function AuthLayout({ children }) {
  return (
    <div className="auth-root">
      {/* ── Left Brand Panel ─────────────────────────────── */}
      <aside className="auth-left" aria-hidden="true">
        {/* Decorative orbs */}
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />

        {/* Logo */}
        <Link to="/" className="auth-logo" aria-label="Skillora home">
          <div className="auth-logo__icon">⚡</div>
          <span className="auth-logo__name">Skillora</span>
        </Link>

        {/* Center — tagline + course previews */}
        <div className="auth-left__center">
          <div>
            <h2 className="auth-left__tagline">
              Learn. Build.<br />
              <span className="accent">Ship Products.</span>
            </h2>
            <p className="auth-left__desc" style={{ marginTop: 14 }}>
              Join 500+ developers mastering real-world skills
              with project-based courses designed to get you hired.
            </p>
          </div>

          {/* Stats */}
          <div className="auth-left__stats">
            <div className="auth-left__stat">
              <span className="auth-left__stat-value">500+</span>
              <span className="auth-left__stat-label">Students</span>
            </div>
            <div className="auth-left__stat-sep" />
            <div className="auth-left__stat">
              <span className="auth-left__stat-value">4.9★</span>
              <span className="auth-left__stat-label">Rating</span>
            </div>
            <div className="auth-left__stat-sep" />
            <div className="auth-left__stat">
              <span className="auth-left__stat-value">3+</span>
              <span className="auth-left__stat-label">Courses</span>
            </div>
          </div>

          {/* Course previews */}
          <div className="auth-preview-cards">
            {PREVIEW_COURSES.map((c) => (
              <div key={c.title} className="auth-preview-card">
                <div
                  className="auth-preview-card__thumb"
                  style={{ background: c.bg }}
                >
                  {c.icon}
                </div>
                <div className="auth-preview-card__info">
                  <div className="auth-preview-card__title">{c.title}</div>
                  <div className="auth-preview-card__sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="auth-left__testimonial">
          <div className="auth-left__testimonial-avatar">RM</div>
          <div>
            <p className="auth-left__testimonial-text">
              "Skillora's Full-Stack course landed me my first developer job
              within 3 months. Absolutely worth it!"
            </p>
            <p className="auth-left__testimonial-author">
              Rahul Mehta — Full-Stack Dev at Razorpay
            </p>
          </div>
        </div>
      </aside>

      {/* ── Right Form Panel ─────────────────────────────── */}
      <main className="auth-right">
        {children}
      </main>
    </div>
  )
}
