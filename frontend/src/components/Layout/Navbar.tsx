import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center sm:space-x-3 relative">
            <div className="relative">
              <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                ResumeAI
              </span>
              <div className="text-xs text-gray-500 font-medium -mt-1">
                AI-Powered
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/templates"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/features"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* User Menu & Mobile Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">
                      {user.fullName || user.email}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          Mobile Side Drawer + Overlay
      =========================== */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link
            to="/"
            className="group flex items-center sm:space-x-3 relative"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <div className="flex w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                ResumeAI
              </span>
              <div className="text-xs text-gray-500 font-medium -mt-1">
                AI-Powered
              </div>
            </div>
          </Link>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col p-4 space-y-4">
          {/* Always visible links */}
          <Link
            to="/templates"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Templates
          </Link>
          <Link
            to="/features"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>

          {user ? (
            // Logged-in user section
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    {user.fullName || "User"}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[160px]">
                    {user.email}
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </button>
            </div>
          ) : (
            // Guest section
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
