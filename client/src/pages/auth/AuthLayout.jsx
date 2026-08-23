/**
 * AuthLayout.jsx
 * Shared two-column layout for Login & Signup pages.
 * Left: dark brand panel with animated orbs + course previews + testimonial
 * Right: white form card (injected via children)
 */
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/* Course preview data for the left panel */
const PREVIEW_COURSES = [
  { icon: '🚀', title: 'Full-Stack Foundations', sub: 'Beginner → Intermediate', bg: 'linear-gradient(135deg,#100D2E,#6C4CF0)', delay: '100ms' },
  { icon: '⚛️', title: 'React Product Engineering', sub: 'Intermediate',            bg: 'linear-gradient(135deg,#0E3B2E,#14B87F)', delay: '250ms' },
  { icon: '🛠️', title: 'Node.js API Architecture',  sub: 'Intermediate',            bg: 'linear-gradient(135deg,#2A1A00,#E8A33D)', delay: '400ms' },
]

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-navy-950 overflow-hidden">
      {/* ── Left Brand Panel ─────────────────────────────── */}
      <aside 
        className="relative hidden md:flex flex-col justify-between py-10 px-14 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(rgba(124,92,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(124,92,252,0.05)_1px,transparent_1px)] before:bg-[size:48px_48px] before:[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] before:pointer-events-none" 
        aria-hidden="true"
      >
        {/* Decorative orbs */}
        <div className="absolute rounded-full blur-[70px] pointer-events-none w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,92,252,0.22)_0%,transparent_70%)] -top-20 -left-20 animate-auth-orb-drift" />
        <div className="absolute rounded-full blur-[70px] pointer-events-none w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(45,212,224,0.12)_0%,transparent_70%)] bottom-15 -right-15 animate-auth-orb-drift [animation-direction:reverse]" />
        <div className="absolute rounded-full blur-[70px] pointer-events-none w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(90,62,232,0.15)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-auth-orb-drift [animation-delay:2s]" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 relative z-10" aria-label="Skillora home">
          <img src="/logo_skillora.png" alt="Skillora Logo" className="h-12 w-auto object-contain" />
        </Link>

        {/* Center — tagline + course previews */}
        <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
          <div>
            <h2 className="text-[clamp(26px,3vw,36px)] font-extrabold text-white leading-[1.15] tracking-tight">
              Learn. Build.<br />
              <span className="bg-gradient-to-br from-[#9B87FF] to-[#2DD4E0] bg-clip-text text-transparent">Ship Products.</span>
            </h2>
            <p className="mt-3.5 text-[14.5px] text-white/50 leading-relaxed max-w-[380px]">
              Join 500+ developers mastering real-world skills
              with project-based courses designed to get you hired.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-7">
            <div className="flex flex-col gap-1">
              <span className="text-[22px] font-extrabold text-white tracking-tight">500+</span>
              <span className="text-[11.5px] font-medium text-white/40">Students</span>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="flex flex-col gap-1">
              <span className="text-[22px] font-extrabold text-white tracking-tight">4.9★</span>
              <span className="text-[11.5px] font-medium text-white/40">Rating</span>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="flex flex-col gap-1">
              <span className="text-[22px] font-extrabold text-white tracking-tight">3+</span>
              <span className="text-[11.5px] font-medium text-white/40">Courses</span>
            </div>
          </div>

          {/* Course previews */}
          <div className="flex flex-col gap-3 max-w-[340px]">
            {PREVIEW_COURSES.map((c) => (
              <div 
                key={c.title} 
                className="flex items-center gap-3.5 px-4.5 py-3.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md transition-all duration-300 hover:border-[#7C5CFC]/25 hover:translate-x-1 animate-preview-card-in"
                style={{ animationDelay: c.delay }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: c.bg }}
                >
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white mb-0.5">{c.title}</div>
                  <div className="text-[11px] text-white/40">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Testimonial */}
        
      </aside>

      {/* ── Right Form Panel ─────────────────────────────── */}
      <main className="flex items-center justify-center px-5 py-8 md:px-10 md:py-12 bg-gray-50 relative min-h-screen md:min-h-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(124,92,252,0.07)_1px,transparent_1px)] before:bg-[size:28px_28px] before:pointer-events-none">
        <Link 
          to="/" 
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-purple-600 transition-colors z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        {children}
      </main>
    </div>
  )
}
