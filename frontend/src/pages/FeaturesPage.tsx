// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Bot, 
//   FileText, 
//   Download, 
//   Zap, 
//   Shield, 
//   Users,
//   CheckCircle,
//   ArrowRight,
//   Sparkles,
//   Target,
//   Clock,
//   Award
// } from 'lucide-react';

// const FeaturesPage: React.FC = () => {
//   const mainFeatures = [
//     {
//       icon: Bot,
//       title: 'AI-Powered Content Enhancement',
//       description: 'Our advanced AI analyzes your content and provides intelligent suggestions to improve your resume\'s impact and effectiveness.',
//       benefits: [
//         'Smart content optimization',
//         'Industry-specific suggestions',
//         'Grammar and style corrections',
//         'Impact-driven language recommendations'
//       ],
//       image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'
//     },
//     {
//       icon: Target,
//       title: 'ATS Optimization',
//       description: 'Ensure your resume passes Applicant Tracking Systems with our advanced optimization algorithms.',
//       benefits: [
//         'Keyword optimization',
//         'Format compatibility',
//         'ATS-friendly layouts',
//         'Scoring and feedback'
//       ],
//       image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600'
//     },
//     {
//       icon: FileText,
//       title: 'Professional Templates',
//       description: 'Choose from dozens of professionally designed templates crafted by industry experts.',
//       benefits: [
//         '50+ premium templates',
//         'Industry-specific designs',
//         'Customizable layouts',
//         'Mobile-responsive previews'
//       ],
//       image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600'
//     },
//     {
//       icon: Zap,
//       title: 'Real-Time Collaboration',
//       description: 'Get instant feedback and collaborate with mentors, career coaches, or peers.',
//       benefits: [
//         'Live editing and preview',
//         'Comment and suggestion system',
//         'Version history tracking',
//         'Export and sharing options'
//       ],
//       image: 'https://images.pexels.com/photos/7688047/pexels-photo-7688047.jpeg?auto=compress&cs=tinysrgb&w=600'
//     }
//   ];

//   const additionalFeatures = [
//     { icon: Download, title: 'Multiple Export Formats', description: 'PDF, Word, and HTML formats' },
//     { icon: Shield, title: 'Privacy & Security', description: 'Bank-level encryption and data protection' },
//     { icon: Clock, title: 'Auto-Save', description: 'Never lose your progress with automatic saving' },
//     { icon: Award, title: 'Industry Recognition', description: 'Templates approved by HR professionals' },
//     { icon: Users, title: 'Team Collaboration', description: 'Share and collaborate with your team' },
//     { icon: Sparkles, title: 'Smart Suggestions', description: 'AI-powered recommendations for improvement' }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Powerful Features to
//               <span className="text-blue-600"> Boost Your Career</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Discover how ResumeAI's advanced features can help you create compelling resumes 
//               that stand out to employers and pass through ATS systems.
//             </p>
//             <Link
//               to="/signup"
//               className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
//             >
//               Start Building Free
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Main Features */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="space-y-20">
//             {mainFeatures.map((feature, index) => (
//               <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
//                 <div className="flex-1">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
//                     <feature.icon className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                     {feature.title}
//                   </h3>
//                   <p className="text-lg text-gray-600 mb-6">
//                     {feature.description}
//                   </p>
//                   <ul className="space-y-3">
//                     {feature.benefits.map((benefit, benefitIndex) => (
//                       <li key={benefitIndex} className="flex items-center">
//                         <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
//                         <span className="text-gray-700">{benefit}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="flex-1">
//                   <div className="rounded-xl overflow-hidden shadow-lg">
//                     <img
//                       src={feature.image}
//                       alt={feature.title}
//                       className="w-full h-64 md:h-80 object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Additional Features Grid */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               More Amazing Features
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Everything you need to create the perfect resume and land your dream job.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {additionalFeatures.map((feature, index) => (
//               <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
//                   <feature.icon className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* AI-Powered Section */}
//       <section className="py-20 bg-blue-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Bot className="h-8 w-8 text-white" />
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               AI That Understands Your Career Goals
//             </h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
//               Our AI doesn't just format your resume—it understands your industry, analyzes job market trends, 
//               and provides personalized suggestions to help you stand out.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">95%</div>
//                 <div className="text-blue-100">Success Rate</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">2.3x</div>
//                 <div className="text-blue-100">More Interviews</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">24/7</div>
//                 <div className="text-blue-100">AI Assistance</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//             Ready to Transform Your Career?
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Join thousands of professionals who've already boosted their careers with ResumeAI.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/signup"
//               className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
//             >
//               Start Building Free
//             </Link>
//             <Link
//               to="/templates"
//               className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
//             >
//               Browse Templates
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FeaturesPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  FileText, 
  Download, 
  Zap, 
  Shield, 
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  Award,
  Star,
  TrendingUp,
  Eye,
  Layers,
  Globe,
  Rocket,
  Heart,
  Lightbulb
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const mainFeatures = [
    {
      icon: Bot,
      title: 'AI-Powered Content Enhancement',
      description: 'Our advanced AI analyzes your content and provides intelligent suggestions to improve your resume\'s impact and effectiveness with cutting-edge machine learning.',
      benefits: [
        'Smart content optimization with neural networks',
        'Industry-specific AI recommendations',
        'Advanced grammar and style corrections',
        'Impact-driven language enhancement'
      ],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Target,
      title: 'Advanced ATS Optimization',
      description: 'Ensure your resume passes Applicant Tracking Systems with our state-of-the-art optimization algorithms and real-time scoring.',
      benefits: [
        'Dynamic keyword optimization',
        'Multi-format compatibility testing',
        'ATS-friendly layout validation',
        'Real-time scoring and feedback'
      ],
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: FileText,
      title: 'Premium Template Collection',
      description: 'Choose from our extensive library of professionally designed templates crafted by industry experts and top designers.',
      benefits: [
        '100+ premium templates',
        'Industry-specific designs',
        'Fully customizable layouts',
        'Mobile-responsive previews'
      ],
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Zap,
      title: 'Real-Time Collaboration Hub',
      description: 'Get instant feedback and collaborate seamlessly with mentors, career coaches, or peers in our advanced collaboration environment.',
      benefits: [
        'Live editing and preview',
        'Advanced comment system',
        'Version history tracking',
        'Multi-format export options'
      ],
      image: 'https://images.pexels.com/photos/7688047/pexels-photo-7688047.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const additionalFeatures = [
    { 
      icon: Download, 
      title: 'Multi-Format Export', 
      description: 'PDF, Word, HTML, and more formats',
      color: 'from-blue-500 to-purple-500'
    },
    { 
      icon: Shield, 
      title: 'Enterprise Security', 
      description: 'Bank-level encryption and data protection',
      color: 'from-green-500 to-blue-500'
    },
    { 
      icon: Clock, 
      title: 'Smart Auto-Save', 
      description: 'Never lose progress with intelligent saving',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Award, 
      title: 'Industry Certified', 
      description: 'Templates approved by HR professionals',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: Users, 
      title: 'Team Collaboration', 
      description: 'Share and collaborate with your team',
      color: 'from-pink-500 to-red-500'
    },
    { 
      icon: Lightbulb, 
      title: 'Smart Insights', 
      description: 'AI-powered recommendations for improvement',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '95%', label: 'Success Rate', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { number: '2.3x', label: 'More Interviews', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { number: '24/7', label: 'AI Assistance', icon: Bot, color: 'from-purple-500 to-pink-500' },
    { number: '100K+', label: 'Happy Users', icon: Heart, color: 'from-red-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl rotate-12 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl rotate-45 animate-bounce delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Advanced AI Features
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Powerful Features
            </span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              Boost Your Career
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover how ResumeAI's revolutionary features help you create compelling resumes 
            that captivate employers and dominate ATS systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/signup"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center">
                Start Building Free
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link
              to="/templates"
              className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-white hover:border-purple-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center">
                <Layers className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Browse Templates
              </span>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="relative py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-8">
              <Rocket className="w-4 h-4 mr-2" />
              Core Features
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Revolutionary
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> AI Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of resume building with our cutting-edge features.
            </p>
          </div>

          <div className="space-y-32">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
                <div className="flex-1 group">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-all duration-500">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 group-hover:text-purple-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-4">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center group/item">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-gray-700 font-medium group-hover/item:text-gray-900 transition-colors duration-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-1 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="relative py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium text-green-800 mb-8">
              <Star className="w-4 h-4 mr-2" />
              Additional Features
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Everything You
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Need & More</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools to create the perfect resume and accelerate your career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 shadow-lg"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M50%2050c0-5.5%204.5-10%2010-10s10%204.5%2010%2010-4.5%2010-10%2010-10-4.5-10-10zm-20%200c0-5.5%204.5-10%2010-10s10%204.5%2010%2010-4.5%2010-10%2010-10-4.5-10-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              AI That Understands
              <span className="block">Your Career Dreams</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Our revolutionary AI doesn't just format your resume—it understands your industry, 
              analyzes global job market trends, and provides hyper-personalized suggestions to make you irresistible to employers.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="group text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Globe className="w-16 h-16 text-purple-600 mx-auto mb-8 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Ready to Transform
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Career Forever?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the revolution and create resumes that don't just get noticed—they get you hired.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/signup"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center">
                Start Building Free
                <Rocket className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link
              to="/templates"
              className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white hover:border-purple-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center">
                <Eye className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Browse Templates
              </span>
            </Link>
          </div>
          
          <p className="text-gray-500 mt-8 text-lg">
            No credit card required • Start in seconds • Join 100K+ professionals
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;