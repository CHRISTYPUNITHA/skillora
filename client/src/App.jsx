
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'


import LandingPage      from './pages/LandingPage'
import CoursesPage      from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage        from './pages/auth/LoginPage'
import SignupPage       from './pages/auth/SignupPage'
import DashboardPage    from './pages/dashboard/DashboardPage'
import {useAuth} from './context/AuthContext'

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

      <Route path="*"                 element={<Navigate to="/" replace />} />
    </Routes>
  )
}

