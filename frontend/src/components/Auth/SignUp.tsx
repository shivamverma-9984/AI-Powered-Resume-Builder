import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(formData.fullName, formData.email, formData.password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Sparkles, text: 'AI-Powered Resume Enhancement' },
    { icon: Shield, text: 'Secure & Private Data Protection' },
    { icon: CheckCircle, text: 'ATS-Optimized Templates' },
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
        {/* Left Side - Benefits */}
        <div className="-mt-12 hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Join the Future of
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-1">
                Resume Building
              </span>
            </h1>

            <p className="text-xl text-purple-100 mb-8">
              Create stunning, ATS-optimized resumes with the power of AI and land your dream job faster.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm  flex items-center justify-center border border-purple-400/20 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <span className="text-purple-100 font-medium text-lg">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {['SJ', 'MC', 'ER'].map((avatar, index) => (
                    <div key={index} className={`w-10 h-10 bg-gradient-to-br ${index === 0 ? 'from-purple-500 to-pink-500' : index === 1 ? 'from-blue-500 to-cyan-500' : 'from-green-500 to-emerald-500'} rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-slate-900`}>
                      {avatar}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold">Join 100K+ Users</div>
                  <div className="text-purple-200 text-sm">Who've landed their dream jobs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 ">
          <div className="w-full max-w-md">
            {/* Form Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl "></div>
              <div className="relative bg-white/10 back p-4 md:px-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white ">Create Account</h2>
                  <p className="text-purple-200">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-purple-300 hover:text-purple-100 font-semibold transition-colors duration-300 underline decoration-purple-400/50 hover:decoration-purple-300">
                      Sign in here
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name Field */}
                  <div className="group -mt-2">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-purple-200 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                        <User className="h-5 w-5 text-purple-300 group-focus-within:text-purple-200 transition-colors duration-300" />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        className="w-full pl-8 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-purple-200 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                        <Mail className="h-5 w-5 text-purple-300 group-focus-within:text-purple-200 transition-colors duration-300" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full pl-8 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-semibold text-purple-200 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                        <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-200 transition-colors duration-300" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="w-full pl-8 pr-12 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-200 transition-colors duration-300 z-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="group">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-purple-200 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                        <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-200 transition-colors duration-300" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className="w-full pl-8 pr-12 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-200 transition-colors duration-300 z-10"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-6  font-semibold text-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Terms */}
                  <div className="text-xs text-purple-200 text-center leading-relaxed">
                    By signing up, you agree to our{' '}
                    <Link to="/terms" className="text-purple-300 hover:text-purple-100 font-semibold transition-colors duration-300 underline decoration-purple-400/50 hover:decoration-purple-300">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-purple-300 hover:text-purple-100 font-semibold transition-colors duration-300 underline decoration-purple-400/50 hover:decoration-purple-300">
                      Privacy Policy
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;