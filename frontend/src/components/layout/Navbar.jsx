import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { FiMenu, FiX, FiTool } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user?.userType) return null;
    
    switch (user.userType) {
      case 'Admin':
        return <Link to="/admindashboard" className="hover:text-teal-300 transition-colors">Admin Dashboard</Link>;
      case 'Worker':
        return <Link to="/workerdashboard" className="hover:text-teal-300 transition-colors">Worker Dashboard</Link>;
      default:
        return <Link to="/userdashboard" className="hover:text-teal-300 transition-colors">User Dashboard</Link>;
    }
  };

  const handleReportClick = () => {
    if (isAuthenticated) {
      navigate('/report');
    } else {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="font-heading text-xl font-semibold flex items-center">
          <img 
    src="\src\assets\logo.png" 
    alt="ReportNRepair Logo" 
    className="w-16 h-16" 
  />
            <span className="text-white">ReportNRepair</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="hover:text-teal-300 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-teal-300 transition-colors">About</Link>
          <Link to="/track" className="hover:text-teal-300 transition-colors my-4">Track Report</Link>
            {/* Show dashboard based on user type */}

            {isAuthenticated && getDashboardLink()}
            {isAuthenticated && user?.userType !== 'Worker' && user?.userType !== 'Admin' && (
            <button 
              onClick={handleReportClick}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Report a Problem
            </button>
          )}

            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="border border-white hover:bg-white hover:text-sky-600 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="border border-white hover:bg-white hover:text-sky-600 px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-3">
            <Link to="/" className="block hover:text-teal-300 transition-colors py-2">Home</Link>
            <Link to="/about" className="block hover:text-teal-300 transition-colors py-2">About</Link>
            <Link to="/track" className="block hover:text-teal-300 transition-colors py-2 my-4">Track Report</Link>
            {/* Show dashboard based on user type */}
            {isAuthenticated && getDashboardLink()}
            {isAuthenticated && user?.userType !== 'Worker' && user?.userType !== 'Admin' && (
              <button 
                onClick={handleReportClick}
                className="block w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Report a Problem
              </button>
            )}
            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="block w-full border border-white hover:bg-white hover:text-sky-600 px-4 py-2 my-4 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block w-full text-center border border-white hover:bg-white hover:text-sky-600 px-4 py-2 my-4 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;