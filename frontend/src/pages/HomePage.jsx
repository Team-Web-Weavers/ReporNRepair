import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiUsers, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

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
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
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
                className="btn btn-success h-16"
              >
                Report a Problem
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://media.licdn.com/dms/image/D4D12AQH_22tmXTwUEA/article-cover_image-shrink_720_1280/0/1701773505898?e=2147483647&v=beta&t=an37z2_ncb3MkUdo58YZDn65Ri8mqho8pinTq494ygc" 
                alt="Community reporting" 
                className="rounded-lg shadow-lg"
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
      <section className="py-16 bg-gradient-to-r from-emerald-200 to-emerald-300">
        <div className="container mx-auto px-4 text-gray-700">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
              <p className="text-neutral-600">
                Submit details about the problem you've noticed in your community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">We Process It</h3>
              <p className="text-neutral-600">
                Your report is verified and forwarded to the relevant department.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
              <p className="text-neutral-600">
                Track the progress and get notified when the issue is resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">What Can You Report?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-600">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-card border border-neutral-200 hover:border-primary-300 transition-colors">
                <div className="text-primary-500 mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-neutral-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-200 to-emerald-300">
        <div className="container mx-auto px-4 text-gray-700">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">Making an Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
              <p className="text-lg text-neutral-700">Issues Reported</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">85%</div>
              <p className="text-lg text-neutral-700">Resolution Rate</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">12</div>
              <p className="text-lg text-neutral-700">Communities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-12">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-heading">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of active citizens and help make your area a better place to live.
          </p>
          <button
            onClick={handleReportClick}
            className="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-md text-lg font-medium transition-colors text-gray-600"
          >
            Report a Problem Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
