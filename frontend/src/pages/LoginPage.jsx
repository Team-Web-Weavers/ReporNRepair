import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUserCheck } from 'react-icons/fi';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Citizen');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

/*
// Use this function to use the login process without postgreSQL

    const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !userType) {
      setError('Please fill in all fields');
      return;
    }
    
    login({ email, userType });
    navigate('/');
  };
*/  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !userType) {
      setError('Please fill in all fields');
      return;
    }
    const userData = {
      email: email,
      password: password,
      role: userType
    };
    console.log(userData);

    try {
      const response = await axios.post('http://localhost:5000/auth/login',userData,{headers: { "Content-Type": "application/json" }});

      // Optionally handle response data
      console.log( response.data.status==='success'?'Login Succesful':"Login Unsuccessful");
      const userid= response.data.userid
      login({userid,email, userType });
      navigate(userType === 'Admin' ? `/admindashboard${response.data.userid}` : userType === 'Worker' ?`/workerdashboard/${response.data.userid}`:`/userdashboard/${response.data.userid}`);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
    }
    
    
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-200 py-12 px-4 text-gray-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 font-heading text-sky-600">Log In</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUserCheck className="text-gray-500" />
              </div>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="Citizen">Citizen</option>
                <option value="Worker">Worker</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Log In
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
