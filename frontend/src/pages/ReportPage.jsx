import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useContext } from 'react';
import {
  FiMapPin, FiAlertCircle, FiPhone, FiMail, FiCalendar, FiUpload, FiCheck, FiX
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const ReportPage = () => {
  const { user } = useAuth();
  const problemTypes = [
    'Road Damage', 'Streetlight Issue', 'Water Leak', 'Illegal Dumping',
    'Fallen Tree/Branch', 'Sidewalk Damage', 'Traffic Signal Problem',
    'Public Safety Concern', 'Other'
  ];

  const [formData, setFormData] = useState({
    location: '',
    problemType: '',
    description: '',
    phone: '',
    userid:user.userid,
    email: '',
    image: null,
    date: new Date().toISOString().substr(0, 10),
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageValidation, setImageValidation] = useState({
    isLoading: false,
    isValid: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.problemType) newErrors.problemType = 'Please select a problem type';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 10) newErrors.description = 'Minimum 10 characters required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.image) newErrors.image = 'Please upload a valid image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImageValidation({ isLoading: true, isValid: null, message: '' });

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(',')[1]; // remove data:image/png;base64,
          const response = await axios.post('http://localhost:5000/imgdetect/detect-problems', {
            image: base64String,
            problemType: formData.problemType
          },{headers: { "Content-Type": "application/json" }},{ withCredentials: true });

          setImageValidation({
            isLoading: false,
            isValid: true,
            message: response.data.message
          });

          setFormData((prev) => ({ ...prev, image: selectedFile }));
          setPreviewImage(reader.result);
        } catch (error) {
          const errMsg = error?.response?.data?.message || 'Image validation failed';
          setImageValidation({ isLoading: false, isValid: false, message: errMsg });
          setErrors((prev) => ({ ...prev, image: errMsg }));
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => payload.append(key, val));

      // Add the user ID to the form data
      payload.append('userid', user.userid);
      console.log(formData)

      // Replace with your actual API endpoint
      await axios.post('http://localhost:5000/complaints/submit-complaints', formData);

      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          location: '',
          problemType: '',
          description: '',
          phone: '',
          userid:'',
          email: '',
          image: null,
          date: new Date().toISOString().substr(0, 10),
        });
        setPreviewImage(null);
        setIsSubmitted(false);
        setErrors({});
      }, 3000);
    } catch (error) {
      alert("Something went wrong while submitting. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12 px-4 min-h-screen text-gray-700">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-sky-600 text-center mb-8">Report a Problem</h1>

        {isSubmitted ? (
          <div className="text-center">
            <div className="bg-green-500 text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FiCheck size={32} />
            </div>
            <h2 className="text-xl font-semibold">Thank you!</h2>
            <p className="text-gray-600">Your report was successfully submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hidden User ID Input */}
            <input type="hidden" name="userid" value={user.userid} />

            {/* Location */}
            <div>
              <label className="block text-sm mb-1 font-medium">Location *</label>
              <div className="relative">
                <FiMapPin className="absolute top-2.5 left-3 text-gray-400" />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`pl-10 pr-3 py-2 w-full rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-sky-500`}
                  placeholder="Enter location"
                />
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Problem Type */}
            <div>
              <label className="block text-sm mb-1 font-medium">Problem Type *</label>
              <div className="relative">
                <FiAlertCircle className="absolute top-2.5 left-3 text-gray-400" />
                <select
                  name="problemType"
                  value={formData.problemType}
                  onChange={handleChange}
                  className={`pl-10 pr-3 py-2 w-full rounded-md border ${errors.problemType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-sky-500`}
                >
                  <option value="">Select problem type</option>
                  {problemTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {errors.problemType && <p className="text-red-500 text-sm mt-1">{errors.problemType}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm mb-1 font-medium">Description *</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-sky-500`}
                placeholder="Describe the issue in detail"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">Phone</label>
                <div className="relative">
                  <FiPhone className="absolute top-2.5 left-3 text-gray-400" />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`pl-10 pr-3 py-2 w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-sky-500`}
                    placeholder="Phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Email</label>
                <div className="relative">
                  <FiMail className="absolute top-2.5 left-3 text-gray-400" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 pr-3 py-2 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-sky-500`}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Date (readonly) */}
            <div>
              <label className="block text-sm mb-1 font-medium">Date</label>
              <div className="relative">
                <FiCalendar className="absolute top-2.5 left-3 text-gray-400" />
                <input
                  type="text"
                  readOnly
                  value={formData.date}
                  className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm mb-1 font-medium">Upload Image *</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
                />
              </div>
              {imageValidation.isLoading && <p className="text-sm text-sky-500 mt-1">Validating image...</p>}
              {imageValidation.message && (
                <p className={`text-sm mt-1 ${imageValidation.isValid ? 'text-green-600' : 'text-red-500'}`}>
                  {imageValidation.message}
                </p>
              )}
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className={`px-6 py-3 bg-sky-600 text-white rounded-md w-full ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
