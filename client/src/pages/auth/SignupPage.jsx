
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import { useAuth } from '../../context/AuthContext'

function EyeIcon({ open }) {
  return open ? '🙈' : '👁️'
}

function getPasswordStrength(pwd) {
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8)               score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

const STRENGTH_LABELS = ['', 'Weak', 'Medium', 'Strong']
const STRENGTH_COLORS = ['', 'weak', 'medium', 'strong']


function validate(name, email, password, agreed) {
  const errors = {}
  if (!name.trim())                      errors.name     = 'Full name is required.'
  if (!email)                            errors.email    = 'Email is required.'
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email    = 'Enter a valid email.'
  if (!password)                         errors.password = 'Password is required.'
  else if (password.length < 8)          errors.password = 'Minimum 8 characters.'
  if (!agreed)                           errors.agreed   = 'You must accept the terms.'
  return errors
}

export default function SignupPage() {
  const navigate = useNavigate()
  const { signupUser } = useAuth()

  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [agreed, setAgreed]   = useState(false)
  const [errors, setErrors]   = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)

  const pwdStrength = getPasswordStrength(form.password)


  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }))
  }


  function showToast(icon, msg) {
    setToast({ icon, msg })
    setTimeout(() => setToast(null), 3200)
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form.name, form.email, form.password, agreed);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setLoading(true);
      const res = await signupUser(form);
      if (res && res.success !== false) {
        showToast('🎉', 'Account created! Welcome to Skillora 🚀');
        setTimeout(() => navigate('/courses'), 1000);
      } else {
        showToast('❌', res?.message || 'Registration Failed');
      }
    } catch (error) {
      console.error(error);
      showToast('❌', error.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-[20px] md:rounded-[24px] px-[22px] py-[28px] pb-6 md:p-10 md:pb-9 relative z-10 animate-card-slide-up" role="main">
        {/* Header */}
        <span className="text-[32px] mb-2 block" aria-hidden="true">🚀</span>
        <h1 className="text-[22px] font-extrabold text-gray-900 tracking-[-0.02em] mb-1">Create Account</h1>
        <p className="text-[13.5px] text-gray-500 mb-7">Start your learning journey today.</p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate aria-label="Create account form">

          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-700 tracking-[0.01em]" htmlFor="signup-name">Full name</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[15px] text-gray-400 pointer-events-none z-10 leading-none" aria-hidden="true">👤</span>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`w-full h-11 pl-[42px] pr-3.5 text-[13.5px] text-gray-900 bg-gray-25 border-[1.5px] rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(124,92,252,0.12)] ${errors.name ? 'border-red-400 shadow-[0_0_0_3.5px_rgba(248,113,113,0.10)]' : 'border-gray-200'}`}
                aria-describedby={errors.name ? 'signup-name-error' : undefined}
                aria-invalid={!!errors.name}
                required
              />
            </div>
            {errors.name && (
              <span className="text-[11.5px] text-red-400 flex items-center gap-[5px]" id="signup-name-error" role="alert">
                ⚠ {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-700 tracking-[0.01em]" htmlFor="signup-email">Email address</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[15px] text-gray-400 pointer-events-none z-10 leading-none" aria-hidden="true">✉️</span>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`w-full h-11 pl-[42px] pr-3.5 text-[13.5px] text-gray-900 bg-gray-25 border-[1.5px] rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(124,92,252,0.12)] ${errors.email ? 'border-red-400 shadow-[0_0_0_3.5px_rgba(248,113,113,0.10)]' : 'border-gray-200'}`}
                aria-describedby={errors.email ? 'signup-email-error' : undefined}
                aria-invalid={!!errors.email}
                required
              />
            </div>
            {errors.email && (
              <span className="text-[11.5px] text-red-400 flex items-center gap-[5px]" id="signup-email-error" role="alert">
                ⚠ {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-700 tracking-[0.01em]" htmlFor="signup-password">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[15px] text-gray-400 pointer-events-none z-10 leading-none" aria-hidden="true">🔒</span>
              <input
                id="signup-password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className={`w-full h-11 pl-[42px] pr-3.5 text-[13.5px] text-gray-900 bg-gray-25 border-[1.5px] rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(124,92,252,0.12)] ${errors.password ? 'border-red-400 shadow-[0_0_0_3.5px_rgba(248,113,113,0.10)]' : 'border-gray-200'}`}
                aria-describedby="signup-pwd-strength signup-pwd-error"
                aria-invalid={!!errors.password}
                required
              />
              <button
                type="button"
                className="absolute right-3.5 bg-transparent border-none cursor-pointer text-gray-400 text-[15px] p-1 flex items-center transition-colors duration-200 hover:text-gray-600 z-10"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>

            {/* Password strength bar */}
            {form.password && (
              <div id="signup-pwd-strength" aria-label={`Password strength: ${STRENGTH_LABELS[pwdStrength]}`}>
                <div className="mt-1.5 flex gap-1" aria-hidden="true">
                  {[1, 2, 3].map((level) => {
                    let bg = 'bg-gray-200'
                    if (pwdStrength >= level) {
                      if (pwdStrength === 1) bg = 'bg-red-400'
                      if (pwdStrength === 2) bg = 'bg-orange-400'
                      if (pwdStrength === 3) bg = 'bg-green-400'
                    }
                    return (
                      <div
                        key={level}
                        className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${bg}`}
                      />
                    )
                  })}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Strength:{' '}
                  <strong
                    style={{
                      color: pwdStrength === 1 ? '#F87171' : pwdStrength === 2 ? '#FB923C' : '#4ADE80',
                    }}
                  >
                    {STRENGTH_LABELS[pwdStrength]}
                  </strong>
                  {' '}· At least 8 characters
                </p>
              </div>
            )}

            {errors.password && (
              <span className="text-[11.5px] text-red-400 flex items-center gap-[5px]" id="signup-pwd-error" role="alert">
                ⚠ {errors.password}
              </span>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2.5 -mt-1">
              <input
                id="signup-terms"
                type="checkbox"
                className="w-4 h-4 accent-purple-500 mt-[1px] shrink-0 cursor-pointer"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  if (errors.agreed) setErrors((er) => ({ ...er, agreed: null }))
                }}
                aria-describedby={errors.agreed ? 'signup-terms-error' : undefined}
              />
              <label className="text-[12.5px] text-gray-500 leading-relaxed [&>a]:text-purple-500 [&>a]:font-medium [&>a:hover]:underline" htmlFor="signup-terms">
                I agree to the{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </label>
            </div>
            {errors.agreed && (
              <span className="text-[11.5px] text-red-400 flex items-center gap-[5px]" id="signup-terms-error" role="alert">
                ⚠ {errors.agreed}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-[46px] text-sm font-bold text-orange-400 bg-[#6C4CF0] border-none rounded-xl cursor-pointer transition-all duration-250 flex items-center justify-center gap-2 mt-1 hover:-translate-y-[1px] hover:bg-[#5A3DE8] active:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none"
            id="btn-signup-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              <>Sign Up →</>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-[13px] text-gray-500 [&>a]:text-purple-500 [&>a]:font-semibold [&>a]:transition-colors [&>a:hover]:text-purple-600 [&>a:hover]:underline">
          Already have an account?{' '}
          <Link to="/login" id="link-to-login">Sign in</Link>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2.5 px-4.5 py-3.5 bg-gray-900 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] animate-toast-in" role="status" aria-live="polite">
          <span className="text-[18px]">{toast.icon}</span>
          <span className="text-[13px] font-medium text-white/85">{toast.msg}</span>
        </div>
      )}
    </AuthLayout>
  )
}
