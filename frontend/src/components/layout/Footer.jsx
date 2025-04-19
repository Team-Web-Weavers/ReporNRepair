import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ReportNRepair</h3>
            <p className="text-sm text-gray-300">
              Making it easy for citizens to report problems and help create a better community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/report" className="text-gray-300 hover:text-white transition-colors">Report a Problem</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {year} ReportNRepair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
