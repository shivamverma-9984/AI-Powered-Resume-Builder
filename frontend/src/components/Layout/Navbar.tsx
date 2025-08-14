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
        className={`fixed top-0 left-0 w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
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
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
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

          {!user && (
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




// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import {
//   FileText,
//   User,
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   Shield,
//   Crown,
//   ChevronDown,
//   Home,
//   Layout,
//   Zap,
//   CreditCard
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// const Navbar: React.FC = () => {
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       toast.success('Signed out successfully');
//       navigate('/');
//       setIsUserMenuOpen(false);
//     } catch (error) {
//       toast.error('Error signing out');
//     }
//   };

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word.charAt(0))
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const isActive = (path: string) => location.pathname === path;

//   const navLinks = [
//     { path: '/templates', label: 'Templates', icon: Layout },
//     { path: '/features', label: 'Features', icon: Zap },
//     { path: '/pricing', label: 'Pricing', icon: CreditCard },
//   ];

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled
//           ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-white/20'
//           : 'bg-white/80 backdrop-blur-sm'
//       }`}>
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <Link to="/" className="group flex items-center space-x-3 relative">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/25">
//                   <FileText className="h-6 w-6 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <Sparkles className="w-2 h-2 text-white" />
//                 </div>
//               </div>
//               <div>
//                 <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
//                   ResumeAI
//                 </span>
//                 <div className="text-xs text-gray-500 font-medium -mt-1">AI-Powered</div>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
//                     isActive(link.path)
//                       ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-lg'
//                       : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700'
//                   }`}
//                 >
//                   <link.icon className={`w-4 h-4 transition-transform duration-300 ${
//                     isActive(link.path) ? 'rotate-12' : 'group-hover:rotate-12'
//                   }`} />
//                   <span>{link.label}</span>
//                   {isActive(link.path) && (
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl"></div>
//                   )}
//                 </Link>
//               ))}
//             </div>

//             {/* User Menu */}
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     to="/dashboard"
//                     className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-2"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <Home className="w-4 h-4 relative group-hover:rotate-12 transition-transform duration-300" />
//                     <span className="relative">Dashboard</span>
//                   </Link>

//                   <div className="relative">
//                     <button
//                       onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                       className="group flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                     >
//                       <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:rotate-12 transition-transform duration-300">
//                         {getInitials(user.fullName || user.email || 'U')}
//                       </div>
//                       <div className="hidden sm:block text-left">
//                         <div className="text-sm font-semibold text-gray-900 truncate max-w-32">
//                           {user.fullName || 'User'}
//                         </div>
//                         <div className="text-xs text-gray-500 flex items-center">
//                           <Crown className="w-3 h-3 mr-1" />
//                           Pro Member
//                         </div>
//                       </div>
//                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
//                         isUserMenuOpen ? 'rotate-180' : ''
//                       }`} />
//                     </button>

//                     {/* User Dropdown */}
//                     {isUserMenuOpen && (
//                       <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-fade-in">
//                         <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-white/20">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">
//                               {getInitials(user.fullName || user.email || 'U')}
//                             </div>
//                             <div>
//                               <div className="font-semibold text-gray-900">{user.fullName || 'User'}</div>
//                               <div className="text-sm text-gray-600 truncate">{user.email}</div>
//                               <div className="text-xs text-purple-600 font-medium flex items-center mt-1">
//                                 <Shield className="w-3 h-3 mr-1" />
//                                 Verified Account
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="p-2">
//                           <Link
//                             to="/profile"
//                             onClick={() => setIsUserMenuOpen(false)}
//                             className="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 rounded-2xl transition-all duration-300"
//                           >
//                             <Settings className="h-4 w-4 mr-3 group-hover:rotate-12 transition-transform duration-300" />
//                             Profile Settings
//                           </Link>
//                           <button
//                             onClick={handleSignOut}
//                             className="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 rounded-2xl transition-all duration-300"
//                           >
//                             <LogOut className="h-4 w-4 mr-3 group-hover:rotate-12 transition-transform duration-300" />
//                             Sign Out
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     to="/signin"
//                     className="text-gray-700 hover:text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-all duration-300"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <span className="relative">Sign Up</span>
//                   </Link>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 className="lg:hidden p-3 rounded-2xl text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 transform hover:scale-110"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="lg:hidden border-t border-white/20 py-6 animate-fade-in">
//               <div className="space-y-3">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`group flex items-center space-x-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
//                       isActive(link.path)
//                         ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
//                         : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700'
//                     }`}
//                   >
//                     <link.icon className={`w-5 h-5 transition-transform duration-300 ${
//                       isActive(link.path) ? 'rotate-12' : 'group-hover:rotate-12'
//                     }`} />
//                     <span>{link.label}</span>
//                   </Link>
//                 ))}

//                 {!user && (
//                   <div className="pt-4 border-t border-white/20 space-y-3">
//                     <Link
//                       to="/signin"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="block w-full text-center bg-white/60 backdrop-blur-sm border border-white/20 text-gray-700 px-4 py-3 rounded-2xl hover:bg-white/80 transition-all duration-300 font-semibold"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       to="/signup"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg"
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Spacer to prevent content from hiding behind fixed navbar */}
//       <div className="h-20"></div>

//       {/* Click outside handler for user menu */}
//       {isUserMenuOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setIsUserMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;
