import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiUsers, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import homeImage from '../assets/home-image.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleReportClick = () => {
    if (isAuthenticated) {
      navigate('/report');
    } else {
      navigate('/login');
    }
  };

  const handleEmergencyClick = () => {
    if (isAuthenticated) {
      navigate('/emergency');
    } else {
      navigate('/emergency');
    }
  };

  // Sample problem categories
  const categories = [
    {
      icon: <FiMapPin size={24} />,
      title: 'Road Issues',
      description: 'Report potholes, damaged signs, road blockages'
    },
    {
      icon: <FiAlertCircle size={24} />,
      title: 'Public Safety',
      description: 'Unsafe conditions, broken streetlights, etc.'
    },
    {
      icon: <FiUsers size={24} />,
      title: 'Community Concerns',
      description: 'Noise complaints, unauthorized activities'
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: 'Civic Services',
      description: 'Trash collection, water supply issues'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                Make Your Community Better
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Report civic issues in your area and help create a better living environment for everyone.
              </p>
              <button
                onClick={handleReportClick}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors cursor-pointer"
              >
                Report a Problem
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src={homeImage} 
                alt="Community reporting" 
                className="rounded-lg shadow-xl/30"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Community+Reporting';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-gray-600 text-3xl font-bold text-center mb-12 font-heading">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
            <div className="bg-white p-6 rounded-lg shadow-card text-center shadow-xl/10">
              <div className="bg-sky-100 text-sky-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
              <p className="text-gray-600">
                Submit details about the problem you've noticed in your community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card text-center shadow-xl/10">
              <div className="bg-sky-100 text-sky-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">We Process It</h3>
              <p className="text-gray-600">
                Your report is verified and forwarded to the relevant department.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card text-center shadow-xl/10">
              <div className="bg-sky-100 text-sky-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
              <p className="text-gray-600">
                Track the progress and get notified when the issue is resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-gray-100 text-3xl font-bold text-center mb-12 font-heading">What Can You Report?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-600">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-card border border-gray-200 hover:border-sky-300 transition-colors">
                <div className="text-sky-500 mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-gray-600 text-3xl font-bold text-center mb-12 font-heading">Making an Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-500 mb-2">500+</div>
              <p className="text-lg text-gray-700">Issues Reported</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-500 mb-2">85%</div>
              <p className="text-lg text-gray-700">Resolution Rate</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-500 mb-2">12</div>
              <p className="text-lg text-gray-700">Communities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-gray-100 text-3xl font-bold mb-4 font-heading">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of active citizens and help make your area a better place to live.
          </p>
          <button
            onClick={handleReportClick}
            className="bg-white text-sky-600 hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-medium transition-colors m-5"
          >
            Report a Problem Now
          </button>
          <button 
  onClick={handleEmergencyClick}
  className="bg-red-400 text-sky-100 hover:bg-red-500 px-6 py-3 rounded-md text-lg font-medium transition-colors m-5"
>
  Emergency Report
</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
