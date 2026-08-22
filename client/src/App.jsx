/**
 * App.jsx — Root router
 * Routes:
 *   /                   → Landing Page
 *   /courses            → Courses (Explore) Page
 *   /courses/:slug      → Course Detail Page
 *   /login              → Login Page
 *   /signup             → Signup Page
 *   /dashboard          → Dashboard Page
 *   /checkout           → Checkout Page
 *   /my-learning        → My Learning Page
 *   /payment-success    → Payment Success Page
 *   *                   → Redirect to /
 */
import { Routes, Route, Navigate } from 'react-router-dom'


import LandingPage      from './pages/LandingPage'
import CoursesPage      from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage        from './pages/auth/LoginPage'
import SignupPage       from './pages/auth/SignupPage'
import DashboardPage    from './pages/dashboard/DashboardPage'
import CheckoutPage     from './pages/CheckoutPage'
import MyLearningPage   from './pages/MyLearningPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  console.log(user);
  

  if (user && ['/', '/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/"                 element={<LandingPage />}      />
      <Route path="/courses"          element={<CoursesPage />}      />
      <Route path="/courses/:slug"    element={<CourseDetailPage />} />
      <Route path="/login"            element={<LoginPage />}        />
      <Route path="/signup"           element={<SignupPage />}        />
      <Route path="/dashboard"        element={<DashboardPage />}    />
      <Route path="/checkout"          element={<CheckoutPage />}        />
      <Route path="/my-learning"       element={<MyLearningPage />}      />
      <Route path="/payment-success"   element={<PaymentSuccessPage />}  />
      {/* Fallback — redirect unknown paths to home */}
      <Route path="*"                 element={<Navigate to="/" replace />} />
    </Routes>
  )
}

