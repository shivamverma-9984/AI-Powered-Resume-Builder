// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { User, Mail, Lock, Save, Upload, Camera } from 'lucide-react';
// import toast from 'react-hot-toast';

// const ProfilePage: React.FC = () => {
//   const { user, updateProfile, changePassword } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     email: '',
//     avatarUrl: '',
//     bio: '',
//     phone: '',
//     location: '',
//     website: '',
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         fullName: user.fullName || '',
//         email: user.email || '',
//         avatarUrl: user.avatar || '',
//         bio: user.bio || '',
//         phone: user.phone || '',
//         location: user.location || '',
//         website: user.website || '',
//       });
//     }
//   }, [user]);

//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { error } = await updateProfile({
//         fullName: profileData.fullName,
//         bio: profileData.bio,
//         phone: profileData.phone,
//         location: profileData.location,
//         website: profileData.website,
//       });

//       if (error) {
//         toast.error(error.message);
//       } else {
//         toast.success('Profile updated successfully!');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }

//     if (passwordData.newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error } = await changePassword(passwordData.currentPassword, passwordData.newPassword);

//       if (error) {
//         toast.error(error.message);
//       } else {
//         toast.success('Password updated successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: '',
//         });
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to update password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // For now, we'll just show a placeholder message
//     // In a real app, you'd upload to your server or cloud storage
//     toast.success('Avatar upload feature coming soon!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-sm">
//           {/* Header */}
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
//             <p className="text-gray-600">Manage your account information and preferences</p>
//           </div>

//           <div className="p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Profile Picture */}
//               <div className="lg:col-span-1">
//                 <div className="text-center">
//                   <div className="relative inline-block">
//                     <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                       {profileData.avatarUrl ? (
//                         <img
//                           src={profileData.avatarUrl}
//                           alt="Profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <User className="h-16 w-16 text-gray-400" />
//                       )}
//                     </div>
//                     <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
//                       <Camera className="h-4 w-4" />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleAvatarUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900">{profileData.fullName}</h3>
//                   <p className="text-gray-600">{profileData.email}</p>
//                 </div>
//               </div>

//               {/* Profile Form */}
//               <div className="lg:col-span-2 space-y-8">
//                 <form onSubmit={handleProfileUpdate}>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                         Personal Information
//                       </h3>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Full Name
//                           </label>
//                           <input
//                             type="text"
//                             value={profileData.fullName}
//                             onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter your full name"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Email Address
//                           </label>
//                           <input
//                             type="email"
//                             value={profileData.email}
//                             disabled
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
//                           />
//                           <p className="text-xs text-gray-500 mt-1">
//                             Email cannot be changed
//                           </p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Phone Number
//                           </label>
//                           <input
//                             type="tel"
//                             value={profileData.phone}
//                             onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter your phone number"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Location
//                           </label>
//                           <input
//                             type="text"
//                             value={profileData.location}
//                             onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="City, State"
//                           />
//                         </div>

//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Website
//                           </label>
//                           <input
//                             type="url"
//                             value={profileData.website}
//                             onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="https://your-website.com"
//                           />
//                         </div>

//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Bio
//                           </label>
//                           <textarea
//                             value={profileData.bio}
//                             onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//                             rows={4}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Tell us about yourself..."
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex justify-end">
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                       >
//                         <Save className="h-4 w-4 mr-2" />
//                         {loading ? 'Saving...' : 'Save Changes'}
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 {/* Password Change Form */}
//                 <div className="border-t border-gray-200 pt-8">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Change Password
//                   </h3>
                  
//                   <form onSubmit={handlePasswordUpdate}>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Current Password
//                         </label>
//                         <input
//                           type="password"
//                           value={passwordData.currentPassword}
//                           onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Enter current password"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           New Password
//                         </label>
//                         <input
//                           type="password"
//                           value={passwordData.newPassword}
//                           onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Enter new password"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Confirm New Password
//                         </label>
//                         <input
//                           type="password"
//                           value={passwordData.confirmPassword}
//                           onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Confirm new password"
//                         />
//                       </div>

//                       <div className="flex justify-end">
//                         <button
//                           type="submit"
//                           disabled={loading}
//                           className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                         >
//                           <Lock className="h-4 w-4 mr-2" />
//                           {loading ? 'Updating...' : 'Update Password'}
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;






import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Save, 
  Upload, 
  Camera, 
  Phone, 
  MapPin, 
  Globe, 
  FileText,
  Sparkles,
  Shield,
  Edit3,
  CheckCircle,
  Eye,
  EyeOff,
  Settings,
  Award,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    avatarUrl: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        avatarUrl: user.avatar || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
        website: user.website || '',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await updateProfile({
        fullName: profileData.fullName,
        bio: profileData.bio,
        phone: profileData.phone,
        location: profileData.location,
        website: profileData.website,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await changePassword(passwordData.currentPassword, passwordData.newPassword);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For now, we'll just show a placeholder message
    // In a real app, you'd upload to your server or cloud storage
    toast.success('Avatar upload feature coming soon!');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl rotate-12 animate-bounce delay-300"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl rotate-45 animate-bounce delay-1000"></div>

      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5"></div>
          <div className="relative px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                  Profile Settings
                </h1>
                <p className=" text-gray-600 font-medium">Manage your account and personalize your experience</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="xl:col-span-1">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-all duration-500">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="relative">
                      {profileData.avatarUrl ? (
                        <img
                          src={profileData.avatarUrl}
                          alt="Profile"
                          className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
                          <span className="text-3xl font-bold text-white">
                            {getInitials(profileData.fullName || 'User')}
                          </span>
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <label className="absolute bottom-0 right-0 group/upload cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white">
                        <Camera className="w-5 h-5 text-white group-hover/upload:rotate-12 transition-transform duration-300" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {profileData.fullName || 'Your Name'}
                    </h3>
                    <p className="text-gray-600 font-medium flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {profileData.email}
                    </p>
                    {profileData.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed bg-gray-50/80 rounded-2xl p-4">
                        {profileData.bio}
                      </p>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">12</div>
                      <div className="text-xs text-gray-600 font-medium">Resumes</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pro</div>
                      <div className="text-xs text-gray-600 font-medium">Member</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="xl:col-span-2 space-y-8">
            {/* Profile Information Form */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                    <p className="text-gray-600">Update your profile details and preferences</p>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="group/field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <User className="h-5 w-5 text-gray-400 group-focus-within/field:text-blue-500 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group/field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={profileData.email}
                          disabled
                          className="w-full pl-12 pr-4 py-3 bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        Email cannot be changed for security reasons
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="group/field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Phone className="h-5 w-5 text-gray-400 group-focus-within/field:text-green-500 transition-colors duration-300" />
                        </div>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-300 hover:bg-white/80"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="group/field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <MapPin className="h-5 w-5 text-gray-400 group-focus-within/field:text-red-500 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all duration-300 hover:bg-white/80"
                          placeholder="City, State, Country"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div className="md:col-span-2 group/field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Website
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Globe className="h-5 w-5 text-gray-400 group-focus-within/field:text-purple-500 transition-colors duration-300" />
                        </div>
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/80"
                          placeholder="https://your-website.com"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2 group/field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 hover:bg-white/80 resize-none"
                        placeholder="Tell us about yourself, your experience, and what makes you unique..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative flex items-center">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                            Save Changes
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Password Change Form */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
                    <p className="text-gray-600">Update your password to keep your account secure</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  {/* Current Password */}
                  <div className="group/field">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within/field:text-red-500 transition-colors duration-300" />
                      </div>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all duration-300 hover:bg-white/80"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="group/field">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within/field:text-green-500 transition-colors duration-300" />
                      </div>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-300 hover:bg-white/80"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-300"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="group/field">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within/field:text-blue-500 transition-colors duration-300" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-amber-800">Password Requirements</h4>
                        <ul className="text-xs text-amber-700 mt-1 space-y-1">
                          <li>• At least 6 characters long</li>
                          <li>• Mix of letters, numbers, and symbols recommended</li>
                          <li>• Avoid using personal information</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative flex items-center">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                            Update Password
                          </>
                        )}
                      </span>
                    </button>
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

export default ProfilePage;