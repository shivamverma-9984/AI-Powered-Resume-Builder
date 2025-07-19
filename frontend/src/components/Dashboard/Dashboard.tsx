// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Plus, FileText, Edit, Trash2, Calendar, Search, Filter, TrendingUp, Download, Users } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { resumeAPI, userAPI } from '../../lib/api';
// import toast from 'react-hot-toast';

// interface Resume {
//   _id: string;
//   title: string;
//   templateId: string;
//   updatedAt: string;
//   atsScore?: number;
//   downloadCount: number;
// }

// interface DashboardStats {
//   totalResumes: number;
//   totalDownloads: number;
//   averageAtsScore: number;
//   recentResumes: Resume[];
//   subscription: string;
//   memberSince: string;
// }

// const Dashboard: React.FC = () => {
//   const { user } = useAuth();
//   const [resumes, setResumes] = useState<Resume[]>([]);
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     loadDashboardData();
//   }, [user, currentPage, searchTerm]);

//   const loadDashboardData = async () => {
//     if (!user) return;

//     try {
//       setLoading(true);
      
//       // Load resumes and stats in parallel
//       const [resumesResponse, statsResponse] = await Promise.all([
//         resumeAPI.getAll({ 
//           page: currentPage, 
//           limit: 12, 
//           search: searchTerm 
//         }),
//         userAPI.getDashboardStats()
//       ]);

//       setResumes(resumesResponse.resumes || []);
//       setTotalPages(resumesResponse.totalPages || 1);
//       setStats(statsResponse);
//     } catch (error: any) {
//       toast.error('Failed to load dashboard data');
//       console.error('Dashboard load error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteResume = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this resume?')) return;

//     try {
//       await resumeAPI.delete(id);
//       toast.success('Resume deleted successfully');
//       setResumes(resumes.filter(resume => resume._id !== id));
      
//       // Reload stats
//       const statsResponse = await userAPI.getDashboardStats();
//       setStats(statsResponse);
//     } catch (error: any) {
//       toast.error('Failed to delete resume');
//     }
//   };

//   const filteredResumes = resumes.filter(resume => {
//     const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = selectedFilter === 'all' || resume.templateId === selectedFilter;
//     return matchesSearch && matchesFilter;
//   });

//   if (loading && !stats) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Welcome back, {user?.fullName?.split(' ')[0]}!
//               </h1>
//               <p className="text-gray-600">Manage and enhance your resume collection</p>
//             </div>
//             <Link
//               to="/builder"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//             >
//               <Plus className="h-5 w-5" />
//               <span>Create New Resume</span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       {stats && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <FileText className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Total Resumes</p>
//                   <p className="text-2xl font-semibold text-gray-900">{stats.totalResumes}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <Download className="h-8 w-8 text-green-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Total Downloads</p>
//                   <p className="text-2xl font-semibold text-gray-900">{stats.totalDownloads}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <TrendingUp className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Avg ATS Score</p>
//                   <p className="text-2xl font-semibold text-gray-900">{stats.averageAtsScore}%</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <Users className="h-8 w-8 text-orange-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Subscription</p>
//                   <p className="text-2xl font-semibold text-gray-900 capitalize">{stats.subscription}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search and Filters */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search resumes..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <select
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
//               value={selectedFilter}
//               onChange={(e) => setSelectedFilter(e.target.value)}
//             >
//               <option value="all">All Templates</option>
//               <option value="modern">Modern</option>
//               <option value="classic">Classic</option>
//               <option value="creative">Creative</option>
//               <option value="minimal">Minimal</option>
//             </select>
//           </div>
//         </div>

//         {/* Resume Grid */}
//         {filteredResumes.length === 0 ? (
//           <div className="text-center py-16">
//             <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes found</h3>
//             <p className="text-gray-600 mb-6">
//               {searchTerm || selectedFilter !== 'all' 
//                 ? 'Try adjusting your search or filter settings.'
//                 : 'Get started by creating your first resume.'}
//             </p>
//             <Link
//               to="/builder"
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="h-5 w-5 mr-2" />
//               Create Your First Resume
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredResumes.map((resume) => (
//                 <div key={resume._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <FileText className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-900">{resume.title}</h3>
//                         <p className="text-sm text-gray-500 capitalize">{resume.templateId} Template</p>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/builder/${resume._id}`}
//                         className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDeleteResume(resume._id)}
//                         className="p-2 text-gray-400 hover:text-red-600 transition-colors"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         Updated {new Date(resume.updatedAt).toLocaleDateString()}
//                       </div>
//                       {resume.atsScore && (
//                         <div className="flex items-center">
//                           <TrendingUp className="h-4 w-4 mr-1" />
//                           {resume.atsScore}% ATS
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Download className="h-4 w-4 mr-2" />
//                       {resume.downloadCount} downloads
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
//                     <Link
//                       to={`/builder/${resume._id}`}
//                       className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                     >
//                       Edit Resume
//                     </Link>
//                     <Link
//                       to={`/preview/${resume._id}`}
//                       className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                     >
//                       Preview
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-8">
//                 <div className="flex space-x-2">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => setCurrentPage(page)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === page
//                           ? 'bg-blue-600 text-white'
//                           : 'bg-white text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Edit, 
  Trash2, 
  Calendar, 
  Search, 
  Filter, 
  TrendingUp, 
  Download, 
  Users,
  Sparkles,
  Star,
  Award,
  Zap,
  Eye,
  MoreVertical,
  ArrowRight,
  Target,
  Clock,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { resumeAPI, userAPI } from '../../lib/api';
import toast from 'react-hot-toast';

interface Resume {
  _id: string;
  title: string;
  templateId: string;
  updatedAt: string;
  atsScore?: number;
  downloadCount: number;
}

interface DashboardStats {
  totalResumes: number;
  totalDownloads: number;
  averageAtsScore: number;
  recentResumes: Resume[];
  subscription: string;
  memberSince: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadDashboardData();
  }, [user, currentPage, searchTerm]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Load resumes and stats in parallel
      const [resumesResponse, statsResponse] = await Promise.all([
        resumeAPI.getAll({ 
          page: currentPage, 
          limit: 12, 
          search: searchTerm 
        }),
        userAPI.getDashboardStats()
      ]);

      setResumes(resumesResponse.resumes || []);
      setTotalPages(resumesResponse.totalPages || 1);
      setStats(statsResponse);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      await resumeAPI.delete(id);
      toast.success('Resume deleted successfully');
      setResumes(resumes.filter(resume => resume._id !== id));
      
      // Reload stats
      const statsResponse = await userAPI.getDashboardStats();
      setStats(statsResponse);
    } catch (error: any) {
      toast.error('Failed to delete resume');
    }
  };

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || resume.templateId === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTemplateColor = (templateId: string) => {
    const colors = {
      modern: 'from-blue-500 to-cyan-500',
      classic: 'from-purple-500 to-pink-500',
      creative: 'from-green-500 to-emerald-500',
      minimal: 'from-gray-500 to-slate-500',
      default: 'from-indigo-500 to-purple-500'
    };
    return colors[templateId as keyof typeof colors] || colors.default;
  };

  const getAtsScoreColor = (score?: number) => {
    if (!score) return 'text-gray-400';
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Dashboard</h3>
          <p className="text-gray-600">Preparing your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Welcome back, 
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ml-2">
                      {user?.fullName?.split(' ')[0]}!
                    </span>
                  </h1>
                  <p className=" text-gray-600 font-medium">Ready to create something amazing today?</p>
                </div>
              </div>
            </div>
            
            <Link
              to="/builder"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-3 font-bold  hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative">Create New Resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-">
            {[
              {
                icon: FileText,
                label: 'Total Resumes',
                value: stats.totalResumes,
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'from-blue-50 to-cyan-50',
                change: '+12%',
                changeColor: 'text-green-500'
              },
              {
                icon: Download,
                label: 'Total Downloads',
                value: stats.totalDownloads,
                color: 'from-green-500 to-emerald-500',
                bgColor: 'from-green-50 to-emerald-50',
                change: '+8%',
                changeColor: 'text-green-500'
              },
              {
                icon: TrendingUp,
                label: 'Avg ATS Score',
                value: `${stats.averageAtsScore}%`,
                color: 'from-purple-500 to-pink-500',
                bgColor: 'from-purple-50 to-pink-50',
                change: '+5%',
                changeColor: 'text-green-500'
              },
              {
                icon: Award,
                label: 'Subscription',
                value: stats.subscription,
                color: 'from-orange-500 to-red-500',
                bgColor: 'from-orange-50 to-red-50',
                change: 'Active',
                changeColor: 'text-blue-500'
              }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`text-sm font-semibold ${stat.changeColor} flex items-center space-x-1`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mb-8">
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search your resumes..."
                className="w-full pl-12 pr-4 py-4 bg-transparent border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              <select
                className="pl-12 pr-8 py-4 bg-transparent border-0 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none min-w-[200px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Templates</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="creative">Creative</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resume Grid */}
        {filteredResumes.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-purple-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm || selectedFilter !== 'all' ? 'No matches found' : 'Ready to create magic?'}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter settings to find what you\'re looking for.'
                : 'Your resume journey starts here. Create your first professional resume with AI assistance.'}
            </p>
            <Link
              to="/builder"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative">Create Your First Resume</span>
              <Sparkles className="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredResumes.map((resume, index) => (
                <div key={resume._id} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getTemplateColor(resume.templateId)}/10 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getTemplateColor(resume.templateId)} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-purple-700 transition-colors duration-300">
                            {resume.title}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize font-medium">
                            {resume.templateId} Template
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/builder/${resume._id}`}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteResume(resume._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                        </div>
                        {resume.atsScore && (
                          <div className={`flex items-center text-sm font-semibold ${getAtsScoreColor(resume.atsScore)}`}>
                            <Target className="w-4 h-4 mr-1" />
                            <span>{resume.atsScore-5}% ATS</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Download className="w-4 h-4 mr-2" />
                        <span>{resume.downloadCount} downloads</span>
                        <div className="ml-auto flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Link
                        to={`/builder/${resume._id}`}
                        className={`flex-1 bg-gradient-to-r ${getTemplateColor(resume.templateId)} text-white text-center p-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105`}
                      >
                        Edit Resume
                      </Link>
                      <Link
                        to={`/preview/${resume._id}`}
                        className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-center py-3 px-4 rounded-xl hover:bg-gray-50 hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;