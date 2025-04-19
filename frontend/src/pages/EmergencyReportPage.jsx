import { useState } from 'react';
import { FiMapPin, FiAlertCircle, FiPhone, FiMail, FiCalendar, FiUpload, FiCheck, FiX, FiUser} from 'react-icons/fi';

const EmergencyReportPage = () => {
  // Emergency problem types
  const emergencyTypes = [
    'Medical Emergency',
    'Fire Hazard',
    'Gas Leak',
    'Power Line Down',
    'Major Water Leak',
    'Road Collapse',
    'Building Structural Issue',
    'Other Emergency'
  ];

  // Form state
  // Update the formData state
const [formData, setFormData] = useState({
  name: '',
  location: '',
  problemType: '',
  description: '',
  phone: '',
  email: '',
  image: null,
  date: new Date().toISOString().substr(0, 10),
});

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageValidation, setImageValidation] = useState({
    isLoading: false,
    isValid: null,
    message: ''
  });

  // Reuse the same handlers from ReportPage with stricter validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required for emergency response';
    }
    
    if (!formData.problemType) {
      newErrors.problemType = 'Emergency type is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description of emergency is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required for emergency contact';
    } else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with priority flag
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call with emergency flag
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Emergency Report submitted:', { ...formData, isEmergency: true });
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          location: '',
          problemType: '',
          description: '',
          phone: '',
          email: '',
          image: null,
          date: new Date().toISOString().substr(0, 10),
        });
        setPreviewImage(null);
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting emergency report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reuse handleChange and handleImageChange from ReportPage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-red-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-red-500">
          <h1 className="text-3xl font-bold text-center mb-4 text-red-600">Emergency Report</h1>
          
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">
              Use this form for urgent issues that require immediate attention.
              For non-emergency issues, please use the standard report form.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiCheck size={32} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Emergency Report Submitted!</h2>
              <p className="text-gray-600 mb-4">Your emergency has been reported.</p>
              <p className="text-red-600 font-semibold">Emergency services will be notified immediately.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
              {/* Reuse the same form fields structure but with emergency styling */}
              {/* Location field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-red-500" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500`}
                    placeholder="Enter exact location for emergency response"
                  />
                </div>
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
              </div>

              {/* Emergency Type dropdown */}
              <div>
                <label htmlFor="problemType" className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiAlertCircle className="text-red-500" />
                  </div>
                  <select
                    id="problemType"
                    name="problemType"
                    required
                    value={formData.problemType}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.problemType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500`}
                  >
                    <option value="" disabled>Select emergency type</option>
                    {emergencyTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                {errors.problemType && <p className="mt-1 text-sm text-red-500">{errors.problemType}</p>}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-red-500" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

<div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
    Phone Number <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiPhone className="text-red-500" />
    </div>
    <input
      id="phone"
      name="phone"
      type="tel"
      required
      value={formData.phone}
      onChange={handleChange}
      className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500`}
      placeholder="Enter your phone number"
    />
  </div>
  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
</div>
              

              {/* Rest of the form fields with emergency styling */}
              {/* ... */}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Emergency Report...' : 'Submit Emergency Report'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyReportPage;