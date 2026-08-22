/**
 * SignupPage.jsx
 * "Create Account 🚀" — Full name + Email + Password form,
 * terms checkbox, social auth, link back to Login
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import './auth.css'

/* Password visibility toggle icon */
function EyeIcon({ open }) {
  return open ? '🙈' : '👁️'
}

/* Compute password strength: 0=empty, 1=weak, 2=medium, 3=strong */
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

/* Simple inline validation */
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

  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [agreed, setAgreed]   = useState(false)
  const [errors, setErrors]   = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)

  const pwdStrength = getPasswordStrength(form.password)

  /* Update field + clear error */
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
    const errs = validate(form.name, form.email, form.password, agreed)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1600))
    setLoading(false)
    showToast('🎉', 'Account created! Welcome to Skillora 🚀')
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  return (
    <AuthLayout>
      <div className="auth-card" role="main">
        {/* Header */}
        <span className="auth-card__emoji" aria-hidden="true">🚀</span>
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Start your learning journey today.</p>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate aria-label="Create account form">

          {/* Full Name */}
          <div className="form-field">
            <label className="form-label" htmlFor="signup-name">Full name</label>
            <div className="form-input-wrap">
              <span className="form-input-icon" aria-hidden="true">👤</span>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`form-input${errors.name ? ' error' : ''}`}
                aria-describedby={errors.name ? 'signup-name-error' : undefined}
                aria-invalid={!!errors.name}
              />
            </div>
            {errors.name && (
              <span className="form-error" id="signup-name-error" role="alert">
                ⚠ {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-field">
            <label className="form-label" htmlFor="signup-email">Email address</label>
            <div className="form-input-wrap">
              <span className="form-input-icon" aria-hidden="true">✉️</span>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input${errors.email ? ' error' : ''}`}
                aria-describedby={errors.email ? 'signup-email-error' : undefined}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <span className="form-error" id="signup-email-error" role="alert">
                ⚠ {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-field">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <div className="form-input-wrap">
              <span className="form-input-icon" aria-hidden="true">🔒</span>
              <input
                id="signup-password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className={`form-input${errors.password ? ' error' : ''}`}
                aria-describedby="signup-pwd-strength signup-pwd-error"
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

            {/* Password strength bar */}
            {form.password && (
              <div id="signup-pwd-strength" aria-label={`Password strength: ${STRENGTH_LABELS[pwdStrength]}`}>
                <div className="pwd-strength" aria-hidden="true">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`pwd-strength-bar${pwdStrength >= level ? ` active-${STRENGTH_COLORS[pwdStrength]}` : ''}`}
                    />
                  ))}
                </div>
                <p className="pwd-strength-label">
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
              <span className="form-error" id="signup-pwd-error" role="alert">
                ⚠ {errors.password}
              </span>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="form-field">
            <div className="form-checkbox-row">
              <input
                id="signup-terms"
                type="checkbox"
                className="form-checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  if (errors.agreed) setErrors((er) => ({ ...er, agreed: null }))
                }}
                aria-describedby={errors.agreed ? 'signup-terms-error' : undefined}
              />
              <label className="form-checkbox-label" htmlFor="signup-terms">
                I agree to the{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </label>
            </div>
            {errors.agreed && (
              <span className="form-error" id="signup-terms-error" role="alert">
                ⚠ {errors.agreed}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-auth-submit"
            id="btn-signup-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              <>Sign Up →</>
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
              id="btn-google-signup"
              onClick={() => showToast('🔗', 'Google OAuth coming soon!')}
              aria-label="Sign up with Google"
            >
              <span className="btn-social__icon" aria-hidden="true">G</span>
              Google
            </button>
            <button
              type="button"
              className="btn-social"
              id="btn-github-signup"
              onClick={() => showToast('🔗', 'GitHub OAuth coming soon!')}
              aria-label="Sign up with GitHub"
            >
              <span className="btn-social__icon" aria-hidden="true">⌥</span>
              GitHub
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="auth-card__footer">
          Already have an account?{' '}
          <Link to="/login" id="link-to-login">Sign in</Link>
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
