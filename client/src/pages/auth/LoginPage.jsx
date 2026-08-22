/**
 * LoginPage.jsx
 * "Welcome Back 👋" — Email + Password form, social auth, link to Signup
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import './auth.css'

/* Password visibility toggle icon */
function EyeIcon({ open }) {
  return open ? '🙈' : '👁️'
}

/* Simple inline validation */
function validate(email, password) {
  const errors = {}
  if (!email)                          errors.email    = 'Email is required.'
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email  = 'Enter a valid email.'
  if (!password)                        errors.password = 'Password is required.'
  else if (password.length < 6)         errors.password = 'Minimum 6 characters.'
  return errors
}

export default function LoginPage() {
  const navigate = useNavigate()

  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)

  /* Update field + clear error on type */
  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }))
  }

  /* Show temp toast */
  function showToast(icon, msg) {
    setToast({ icon, msg })
    setTimeout(() => setToast(null), 3200)
  }

  /* Submit handler (mocked) */
  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form.email, form.password)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    /* Simulate API call */
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    showToast('✅', 'Signed in! Taking you to your dashboard…')
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  return (
    <AuthLayout>
      <div className="auth-card" role="main">
        {/* Header */}
        <span className="auth-card__emoji" aria-hidden="true">👋</span>
        <h1 className="auth-card__title">Welcome Back</h1>
        <p className="auth-card__subtitle">Sign in to continue your learning journey.</p>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate aria-label="Sign in form">

          {/* Email */}
          <div className="form-field">
            <label className="form-label" htmlFor="login-email">Email address</label>
            <div className="form-input-wrap">
              <span className="form-input-icon" aria-hidden="true">✉️</span>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input${errors.email ? ' error' : ''}`}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <span className="form-error" id="login-email-error" role="alert">
                ⚠ {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-field">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="form-input-wrap">
              <span className="form-input-icon" aria-hidden="true">🔒</span>
              <input
                id="login-password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={`form-input${errors.password ? ' error' : ''}`}
                aria-describedby={errors.password ? 'login-pwd-error' : undefined}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="form-pwd-toggle"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>
            {errors.password && (
              <span className="form-error" id="login-pwd-error" role="alert">
                ⚠ {errors.password}
              </span>
            )}
          </div>

          {/* Forgot password */}
          <div className="form-row">
            <span />
            <button
              type="button"
              className="form-link"
              id="btn-forgot-password"
              onClick={() => showToast('📧', 'Password reset email sent!')}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-auth-submit"
            id="btn-signin-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              <>Sign In →</>
            )}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider__line" />
            <span className="auth-divider__text">or continue with</span>
            <div className="auth-divider__line" />
          </div>

          {/* Social buttons */}
          <div className="auth-socials">
            <button
              type="button"
              className="btn-social"
              id="btn-google-login"
              onClick={() => showToast('🔗', 'Google OAuth coming soon!')}
              aria-label="Continue with Google"
            >
              <span className="btn-social__icon" aria-hidden="true">G</span>
              Google
            </button>
            <button
              type="button"
              className="btn-social"
              id="btn-github-login"
              onClick={() => showToast('🔗', 'GitHub OAuth coming soon!')}
              aria-label="Continue with GitHub"
            >
              <span className="btn-social__icon" aria-hidden="true">⌥</span>
              GitHub
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="auth-card__footer">
          Don't have an account?{' '}
          <Link to="/signup" id="link-to-signup">Sign up</Link>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="auth-toast" role="status" aria-live="polite">
          <span className="auth-toast__icon">{toast.icon}</span>
          <span className="auth-toast__msg">{toast.msg}</span>
        </div>
      )}
    </AuthLayout>
  )
}
