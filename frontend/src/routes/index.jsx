import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ReportPage from '../pages/ReportPage';
import ContactPage from '../pages/ContactPage';
import EmergencyReportPage from '../pages/EmergencyReportPage';
import StatusTrackingPage from '../pages/StatusTrackingPage';
import FAQPage from '../pages/FAQPage';

import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import WorkerDashboardPage from '../pages/WorkerDashboardPage';

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
      { path: 'admindashboard/:userid', element: <AdminDashboardPage /> },
      { path: 'userdashboard/:userid', element: <UserDashboardPage /> },
      { path: 'workerdashboard/:userid', element: <WorkerDashboardPage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'emergency', element: <EmergencyReportPage /> },
      { path: 'track', element: <StatusTrackingPage /> }
    ]
  }
]);

export default router;
