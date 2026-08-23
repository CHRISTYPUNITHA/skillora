import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom'

import LandingPage      from './pages/LandingPage'
import CoursesPage      from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage        from './pages/auth/LoginPage'
import SignupPage       from './pages/auth/SignupPage'
import CheckoutPage     from './pages/CheckoutPage'
import MyLearningPage   from './pages/MyLearningPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import LearnPage        from './pages/LearnPage'
import { useAuth } from './context/AuthContext';


import ProtectedRoute from './utils/ProtectedRoute';

const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (user && ['/', '/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/courses" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/:slug", element: <CourseDetailPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout/:courseId", element: <CheckoutPage /> },
          { path: "/my-learning", element: <MyLearningPage /> },
          { path: "/payment-success", element: <PaymentSuccessPage /> },
          { path: "/learn/:slug", element: <LearnPage /> },
        ]
      },
      
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
