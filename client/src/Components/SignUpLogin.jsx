import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUpLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-indigo-900 via-black to-pink-900 text-white">
      <div className="relative w-full max-w-md bg-black bg-opacity-70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-cyan-500 border-opacity-30">
        {/* Animated neon glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-500 to-cyan-500 rounded-xl opacity-20 blur-md animate-pulse"></div>
        {/* Title */}
        <div className="text-center text-3xl font-bold mb-6 text-indigo-400 tracking-wide">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-5 gap-4">
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              !isSignUp
                ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.5)]'
                : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-600 hover:opacity-70'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              isSignUp
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-emerald-500 hover:opacity-70'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Conditional Forms */}
        {isSignUp ? (
          <form className="flex flex-col space-y-4">
            <input type="text" placeholder="Full Name" className="form-input" />
            <input type="text" placeholder="Username" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <input type="tel" placeholder="Phone Number" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <input type="password" placeholder="Confirm Password" className="form-input" />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 via-green-500 to-emerald-500 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(20,184,166,0.4)] hover:shadow-[0_0_15px_rgba(20,184,166,0.6)] hover:scale-105"
            >
              Sign Up
            </button>
            <div className="text-center text-gray-400 text-sm">or</div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-700 bg-white text-black py-2.5 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <FcGoogle size={20} />
              <span className="font-medium">Sign Up with Google</span>
            </button>
          </form>
        ) : (
          <form className="flex flex-col space-y-4">
            <input type="email" placeholder="Email" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(219,39,119,0.4)] hover:shadow-[0_0_15px_rgba(219,39,119,0.6)] hover:scale-105"
            >
              Sign In
            </button>
            <div className="text-center text-gray-400 text-sm">or</div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-700 bg-white text-black py-2.5 rounded-lg hover:shadow-md transition-all duration-300"
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
