import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ReportPage from '../pages/ReportPage';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'about', element: <AboutPage /> },
      { 
        path: 'report', 
        element: <ProtectedRoute><ReportPage /></ProtectedRoute> 
      },
      { path: 'admindashboard', element: <AdminDashboardPage /> },
      { path: 'userdashboard', element: <UserDashboardPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export default router;
