import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import {useAuth} from '../../context/AuthContext'

function EyeIcon({ open }) {
  return open ? "🙈" : "👁️";
}

function validate(email, password) {
  const errors = {};
  if (!email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Enter a valid email.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Minimum 6 characters.";
  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }));
  }

  function showToast(icon, msg) {
    setToast({ icon, msg });
    setTimeout(() => setToast(null), 3200);
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form.email, form.password)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    /* Simulate API call */
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    showToast('✅', 'Signed in! Taking you to courses…')
    setTimeout(() => navigate('/courses'), 1000)
  }

  return (
    <AuthLayout>
      <div
        className="w-full max-w-[420px] bg-white border border-gray-200 rounded-[20px] md:rounded-[24px] px-[22px] py-[28px] pb-6 md:p-10 md:pb-9 relative z-10 animate-card-slide-up"
        role="main"
      >
        {/* Header */}
        <span className="text-[32px] mb-2 block" aria-hidden="true">
          👋
        </span>
        <h1 className="text-[22px] font-extrabold text-gray-900 tracking-[-0.02em] mb-1">
          Welcome Back
        </h1>
        <p className="text-[13.5px] text-gray-500 mb-7">
          Sign in to continue your learning journey.
        </p>

        {/* Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Sign in form"
        >
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[12.5px] font-semibold text-gray-700 tracking-[0.01em]"
              htmlFor="login-email"
            >
              Email address
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 text-[15px] text-gray-400 pointer-events-none z-10 leading-none"
                aria-hidden="true"
              >
                ✉️
              </span>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`w-full h-11 pl-[42px] pr-3.5 text-[13.5px] text-gray-900 bg-gray-25 border-[1.5px] rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(124,92,252,0.12)] ${errors.email ? "border-red-400 shadow-[0_0_0_3.5px_rgba(248,113,113,0.10)]" : "border-gray-200"}`}
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
                }
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <span
                className="text-[11.5px] text-red-400 flex items-center gap-[5px]"
                id="login-email-error"
                role="alert"
              >
                ⚠ {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[12.5px] font-semibold text-gray-700 tracking-[0.01em]"
              htmlFor="login-password"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 text-[15px] text-gray-400 pointer-events-none z-10 leading-none"
                aria-hidden="true"
              >
                🔒
              </span>
              <input
                id="login-password"
                name="password"
                type={showPwd ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={`w-full h-11 pl-[42px] pr-3.5 text-[13.5px] text-gray-900 bg-gray-25 border-[1.5px] rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(124,92,252,0.12)] ${errors.password ? "border-red-400 shadow-[0_0_0_3.5px_rgba(248,113,113,0.10)]" : "border-gray-200"}`}
                aria-describedby={
                  errors.password ? "login-pwd-error" : undefined
                }
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="absolute right-3.5 bg-transparent border-none cursor-pointer text-gray-400 text-[15px] p-1 flex items-center transition-colors duration-200 hover:text-gray-600 z-10"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPwd} />
              </button>
            </div>
            {errors.password && (
              <span
                className="text-[11.5px] text-red-400 flex items-center gap-[5px]"
                id="login-pwd-error"
                role="alert"
              >
                ⚠ {errors.password}
              </span>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex items-center justify-between -mt-1">
            <span />
            <button
              type="button"
              className="text-[12.5px] text-purple-500 font-medium transition-colors duration-200 hover:text-purple-600 hover:underline bg-transparent border-none cursor-pointer p-0"
              id="btn-forgot-password"
              onClick={() => showToast("📧", "Password reset email sent!")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-[46px] text-sm font-bold text-orange-400 bg-[#6C4CF0] border-none rounded-xl cursor-pointer transition-all duration-250 flex items-center justify-center gap-2 mt-1 hover:-translate-y-[1px] hover:bg-[#5A3DE8] active:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none"
            id="btn-signin-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin"
                  aria-hidden="true"
                />
                Signing in…
              </>
            ) : (
              <>Sign In →</>
            )}
          </button>

          {/* Divider */}
          {/* <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div> */}

          {/* Social buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              className="flex-1 h-[42px] flex items-center justify-center gap-[9px] text-[13px] font-semibold text-gray-700 bg-gray-25 border-[1.5px] border-gray-200 rounded-[11px] cursor-pointer transition-all duration-200 hover:bg-white hover:border-gray-300 hover:shadow-[0_2px_8px_rgba(10,8,30,0.07)] hover:-translate-y-[1px]"
              id="btn-google-login"
              onClick={() => showToast('🔗', 'Google OAuth coming soon!')}
              aria-label="Continue with Google"
            >
              <span className="text-[17px] leading-none" aria-hidden="true">G</span>
              Google
            </button>
            <button
              type="button"
              className="flex-1 h-[42px] flex items-center justify-center gap-[9px] text-[13px] font-semibold text-gray-700 bg-gray-25 border-[1.5px] border-gray-200 rounded-[11px] cursor-pointer transition-all duration-200 hover:bg-white hover:border-gray-300 hover:shadow-[0_2px_8px_rgba(10,8,30,0.07)] hover:-translate-y-[1px]"
              id="btn-github-login"
              onClick={() => showToast('🔗', 'GitHub OAuth coming soon!')}
              aria-label="Continue with GitHub"
            >
              <span className="text-[17px] leading-none" aria-hidden="true">⌥</span>
              GitHub
            </button>
          </div> */}
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-[13px] text-gray-500 [&>a]:text-purple-500 [&>a]:font-semibold [&>a]:transition-colors [&>a:hover]:text-purple-600 [&>a:hover]:underline">
          Don't have an account?{" "}
          <Link to="/signup" id="link-to-signup">
            Sign up
          </Link>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[999] flex items-center gap-2.5 px-4.5 py-3.5 bg-gray-900 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] animate-toast-in"
          role="status"
          aria-live="polite"
        >
          <span className="text-[18px]">{toast.icon}</span>
          <span className="text-[13px] font-medium text-white/85">
            {toast.msg}
          </span>
        </div>
      )}
    </AuthLayout>
  );
}
