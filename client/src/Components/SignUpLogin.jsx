import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const SignUpLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // Clear error when toggling between sign up and sign in
  useEffect(() => {
    setError('');
    setFieldErrors({});
  }, [isSignUp]);

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific errors when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error when user types
    if (error) {
      setError('');
    }

    // Real-time validation for specific fields
    if (name === 'password' && value.length > 0 && value.length < 6) {
      setFieldErrors(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters'
      }));
    }
    
    if (name === 'confirmPassword' && formData.password && value !== formData.password) {
      setFieldErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
    } else if (name === 'confirmPassword' && formData.password && value === formData.password) {
      setFieldErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
    
    if (name === 'email' && value && !validateEmail(value)) {
      setFieldErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    }
  };

  // Email validation helper
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Full form validation
  const validateForm = () => {
    const errors = {};
    
    if (isSignUp) {
      if (!formData.fullName) errors.fullName = 'Full name is required';
      if (!formData.username) errors.username = 'Username is required';
      if (!formData.email) errors.email = 'Email is required';
      else if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email';
      if (!formData.password) errors.password = 'Password is required';
      else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
      else if (formData.confirmPassword !== formData.password) errors.confirmPassword = 'Passwords do not match';
    } else {
      if (!formData.email) errors.email = 'Email is required';
      else if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email';
      if (!formData.password) errors.password = 'Password is required';
    }
    
    return errors;
  };

  // Handle sign-up form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    
    // Full form validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the errors before submitting');
      return;
    }
    
    setLoading(true);
    
    // Here you would typically send the data to your backend
    console.log('Sign Up Data:', formData);
    
    // Simulate API call and success response
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1500);
  };

  // Handle sign-in form submission
  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    
    // Full form validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the errors before submitting');
      return;
    }
    
    setLoading(true);
    
    // Here you would typically authenticate with your backend
    console.log('Sign In Data:', {
      email: formData.email,
      password: formData.password
    });
    
    // Simulate API call - for demo we'll just accept any input
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1500);
  };

  // Toggle between sign up and sign in modes
  const handleToggleMode = (mode) => {
    if ((mode === 'signin' && !isSignUp) || (mode === 'signup' && isSignUp)) {
      return; // Already in the correct mode
    }
    setIsSignUp(mode === 'signup');
    setSuccess(false);
    setError('');
    setFieldErrors({});
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-indigo-900 via-black to-pink-900 text-white">
      <div className="relative w-full max-w-md bg-black bg-opacity-70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-cyan-500 border-opacity-30">
        {/* Animated neon glow effect with intensified glow when processing */}
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-500 to-cyan-500 rounded-xl blur-md animate-pulse
                     ${loading ? 'opacity-40' : 'opacity-20'}
                     ${success ? 'opacity-60 via-green-500' : ''}`}
        ></div>
        
        {/* Title with success animation */}
        <div className={`text-center text-3xl font-bold mb-6 transition-colors duration-500 ${
          success ? 'text-green-400' : 'text-indigo-400'
        } tracking-wide`}>
          {success ? 'Success!' : isSignUp ? 'Create an Account' : 'Welcome Back'}
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-5 gap-4">
          <button
            onClick={() => handleToggleMode('signin')}
            disabled={loading}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              !isSignUp
                ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.5)]'
                : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-600 hover:opacity-70'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="button"
          >
            Sign In
          </button>
          <button
            onClick={() => handleToggleMode('signup')}
            disabled={loading}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              isSignUp
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-emerald-500 hover:opacity-70'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm text-center mb-4 bg-red-900 bg-opacity-20 py-2 px-3 rounded-md border border-red-800 animate-pulse">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="text-green-400 text-sm text-center mb-4 bg-green-900 bg-opacity-20 py-2 px-3 rounded-md border border-green-800 animate-pulse">
            {isSignUp ? 'Account created successfully!' : 'Signed in successfully!'} Redirecting...
          </div>
        )}

        {/* Conditional Forms */}
        {isSignUp ? (
          <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
            <div className="relative">
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.fullName ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                value={formData.fullName}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.fullName}</p>
              )}
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="username"
                placeholder="Username" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.username ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.username && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.username}</p>
              )}
            </div>

            <div className="relative">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.email ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.email}</p>
              )}
            </div>

            <div className="relative">
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number (Optional)" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.phone ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading || success}
              />
              {fieldErrors.phone && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.phone}</p>
              )}
            </div>

            <div className="relative">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.password ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.password}</p>
              )}
            </div>

            <div className="relative">
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.confirmPassword ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500 shadow-[0_0_8px_rgba(0,255,0,0.3)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || success || Object.keys(fieldErrors).length > 0}
              className={`relative overflow-hidden bg-gradient-to-r from-cyan-500 via-green-500 to-emerald-500 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(20,184,166,0.4)] hover:shadow-[0_0_15px_rgba(20,184,166,0.6)] hover:scale-105 ${loading || success || Object.keys(fieldErrors).length > 0 ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : success ? 'Account Created!' : 'Sign Up'}
              
              {!loading && !success && (
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 via-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              )}
            </button>
            
            <div className="text-center text-gray-400 text-sm">or</div>
            
            <button
              type="button"
              disabled={loading || success}
              className={`flex items-center justify-center gap-2 border border-purple-900 bg-black bg-opacity-60 text-white py-2.5 rounded-lg hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300 ${loading || success ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FcGoogle size={20} />
              <span className="font-medium">Sign Up with Google</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
            <div className="relative">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.email ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300`}
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.email}</p>
              )}
            </div>

            <div className="relative">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className={`form-input w-full bg-black bg-opacity-50 border ${fieldErrors.password ? 'border-red-500 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'border-purple-900'} rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300`}
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading || success}
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.password}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                className="text-pink-400 text-sm hover:text-pink-300 transition-colors"
                disabled={loading || success}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || success || Object.keys(fieldErrors).length > 0}
              className={`relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(219,39,119,0.4)] hover:shadow-[0_0_15px_rgba(219,39,119,0.6)] hover:scale-105 ${loading || success || Object.keys(fieldErrors).length > 0 ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : success ? 'Signed In!' : 'Sign In'}
            </button>

            <div className="text-center text-gray-400 text-sm">or</div>
            
            <button
              type="button"
              disabled={loading || success}
              className={`flex items-center justify-center gap-2 border border-purple-900 bg-black bg-opacity-60 text-white py-2.5 rounded-lg hover:border-pink-500 hover:shadow-[0_0_15px_rgba(219,39,119,0.3)] transition-all duration-300 ${loading || success ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FcGoogle size={20} />
              <span className="font-medium">Sign In with Google</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpLogin;
