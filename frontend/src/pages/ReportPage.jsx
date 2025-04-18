import { useState } from 'react';
import { FiMapPin, FiAlertCircle, FiPhone, FiMail, FiCalendar, FiUpload, FiCheck } from 'react-icons/fi';

const ReportPage = () => {
  // Problem types for dropdown
  const problemTypes = [
    'Road Damage',
    'Streetlight Issue',
    'Water Leak',
    'Illegal Dumping',
    'Graffiti',
    'Fallen Tree/Branch',
    'Sidewalk Damage',
    'Traffic Signal Problem',
    'Public Safety Concern',
    'Other'
  ];

  // Form state
  const [formData, setFormData] = useState({
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: selectedFile
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.problemType) {
      newErrors.problemType = 'Problem type is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // In a real app, you would send the form data to your backend
    // For the hackathon frontend-only version, we'll simulate a submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after showing success
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
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-200 to-emerald-300 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8 font-heading text-gray-600">Report a Problem</h1>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-success text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiCheck size={32} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
              <p className="text-neutral-600 mb-4">Your report has been submitted successfully.</p>
              <p className="text-neutral-500">You will receive updates on the progress of your report.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                  Location <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-neutral-500" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.location ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-600`}
                    placeholder="Enter address or describe location"
                  />
                </div>
                {errors.location && <p className="mt-1 text-sm text-error">{errors.location}</p>}
              </div>
              
              {/* Problem Type dropdown */}
              <div>
                <label htmlFor="problemType" className="block text-sm font-medium text-neutral-700 mb-1">
                  Problem Type <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiAlertCircle className="text-neutral-500" />
                  </div>
                  <select
                    id="problemType"
                    name="problemType"
                    value={formData.problemType}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.problemType ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-600`}
                  >
                    <option value="" disabled>Select a problem type</option>
                    {problemTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                {errors.problemType && <p className="mt-1 text-sm text-error">{errors.problemType}</p>}
              </div>
              
              {/* Description textarea */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.description ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-600`}
                  placeholder="Please describe the problem in detail"
                />
                {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
              </div>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-neutral-500" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-600`}
                      placeholder="Your phone number"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-neutral-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-600`}
                      placeholder="Your email address"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
                </div>
              </div>
              
              {/* Date and Image Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-neutral-500" />
                    </div>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-600"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-neutral-700 mb-1">
                    Upload Image
                  </label>
                  <div className="flex items-center">
                    <label className="relative cursor-pointer bg-white py-2 px-4 border border-neutral-300 rounded-md shadow-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <FiUpload className="inline-block mr-2" />
                      <span>Choose file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <span className="ml-3 text-sm text-neutral-500">
                      {formData.image ? formData.image.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Image Preview */}
              {previewImage && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Image Preview</label>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-40 rounded-md"
                  />
                </div>
              )}
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-success w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
