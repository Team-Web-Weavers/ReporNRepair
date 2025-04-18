import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ReportPage from '../pages/ReportPage';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { 
        path: 'report', 
        element: <ProtectedRoute><ReportPage /></ProtectedRoute> 
      },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export default router;
