import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-heading text-xl font-bold flex items-center">
            <span className="text-white">CivicReporter</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-secondary-300 transition-colors">Home</Link>
            <Link to="/" className="hover:text-secondary-300 transition-colors">About</Link>
            <Link to="/" className="hover:text-secondary-300 transition-colors">FAQs</Link>
            <button 
              onClick={handleReportClick}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Report a Problem
            </button>
            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="border border-white hover:bg-white hover:text-primary-600 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="border border-white hover:bg-white hover:text-primary-600 px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/" className="block hover:text-secondary-300 transition-colors py-2">Home</Link>
            <Link to="/" className="block hover:text-secondary-300 transition-colors py-2">About</Link>
            <Link to="/" className="block hover:text-secondary-300 transition-colors py-2">FAQs</Link>
            <button 
              onClick={handleReportClick}
              className="block w-full bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Report a Problem
            </button>
            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="block w-full border border-white hover:bg-white hover:text-primary-600 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block w-full text-center border border-white hover:bg-white hover:text-primary-600 px-4 py-2 rounded-md transition-colors"
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
