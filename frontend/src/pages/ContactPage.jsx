import { useState } from 'react';
import { FiMail, FiMessageSquare, FiUser, FiSend } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  
  // Add handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-sky-600">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-gray-600">
            <div>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <FiMail className="mr-2" />
                  support@reportnrepair.com
                </p>
                <p>24/7 Support for Emergency Issues</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Office Location</h2>
              <p>123 Civic Center Road</p>
              <p>Community Hub, Suite 101</p>
              <p>Mumbai, India</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FiMessageSquare className="text-gray-500" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Type your message here..."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                <FiSend className="mr-2" />
                Send Message
              </button>
            </div>
          </form>
          

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;