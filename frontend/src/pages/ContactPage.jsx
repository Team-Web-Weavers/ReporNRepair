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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;