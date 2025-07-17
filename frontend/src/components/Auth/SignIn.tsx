import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, FileText, Sparkles, Shield, CheckCircle, Zap, Users, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Zap, text: 'Lightning-Fast Resume Creation' },
    { icon: Shield, text: 'Bank-Level Security & Privacy' },
    { icon: CheckCircle, text: 'ATS-Optimized Templates' },
  ];

  const stats = [
    { number: '100K+', label: 'Active Users', icon: Users, color: 'from-blue-500 to-purple-500' },
    { number: '95%', label: 'Success Rate', icon: Award, color: 'from-green-500 to-blue-500' },
    { number: '24/7', label: 'AI Support', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl rotate-12 animate-bounce delay-300"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl rotate-45 animate-bounce delay-1000"></div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Welcome Back */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </Link>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome Back to
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Success
              </span>
            </h1>

            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              Continue building amazing resumes and landing your dream jobs with the power of AI.
            </p>

            <div className="space-y-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-400/20 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <span className="text-purple-100 font-medium text-lg">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:rotate-12 transition-transform duration-300`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent text-center`}>
                      {stat.number}
                    </div>
                    <div className="text-purple-200 text-xs text-center font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </Link>
            </div>

            {/* Form Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
                  <p className="text-purple-200">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-purple-300 hover:text-purple-100 font-semibold transition-colors duration-300 underline decoration-purple-400/50 hover:decoration-purple-300">
                      Sign up here
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-purple-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Mail className="h-5 w-5 text-purple-300 group-focus-within:text-purple-200 transition-colors duration-300" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-semibold text-purple-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-200 transition-colors duration-300" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-200 transition-colors duration-300 z-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10 backdrop-blur-sm"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-200 font-medium">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link to="/forgot-password" className="text-purple-300 hover:text-purple-100 font-semibold transition-colors duration-300 underline decoration-purple-400/50 hover:decoration-purple-300">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-purple-200 font-medium">
                        New to ResumeAI?
                      </span>
                    </div>
                  </div>

                  {/* Sign Up Link */}
                  <Link
                    to="/signup"
                    className="group relative w-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-2xl font-bold text-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <span className="relative flex items-center">
                      Create Account
                      <FileText className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;