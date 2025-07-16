// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FileText, 
//   Bot, 
//   Download, 
//   Zap, 
//   Users, 
//   Shield,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Play
// } from 'lucide-react';

// const LandingPage: React.FC = () => {
//   const features = [
//     {
//       icon: Bot,
//       title: 'AI-Powered Enhancement',
//       description: 'Get intelligent suggestions to improve your resume content and make it ATS-friendly.',
//     },
//     {
//       icon: FileText,
//       title: 'Professional Templates',
//       description: 'Choose from dozens of professionally designed templates tailored for different industries.',
//     },
//     {
//       icon: Download,
//       title: 'Export to PDF',
//       description: 'Download your resume as a high-quality PDF ready for job applications.',
//     },
//     {
//       icon: Zap,
//       title: 'Real-time Preview',
//       description: 'See your changes instantly with our live preview feature.',
//     },
//     {
//       icon: Users,
//       title: 'ATS Optimization',
//       description: 'Ensure your resume passes Applicant Tracking Systems with our optimization tools.',
//     },
//     {
//       icon: Shield,
//       title: 'Secure & Private',
//       description: 'Your data is encrypted and secure. We never share your information.',
//     },
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Software Engineer',
//       company: 'Google',
//       content: 'ResumeAI helped me land my dream job at Google! The AI suggestions were spot-on.',
//       rating: 5,
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Marketing Manager',
//       company: 'Microsoft',
//       content: 'The templates are professional and the AI optimization really made a difference.',
//       rating: 5,
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Data Scientist',
//       company: 'Meta',
//       content: 'Best resume builder I\'ve used. The ATS optimization feature is game-changing.',
//       rating: 5,
//     },
//   ];

//   const stats = [
//     { number: '100K+', label: 'Resumes Created' },
//     { number: '95%', label: 'Success Rate' },
//     { number: '50+', label: 'Templates' },
//     { number: '24/7', label: 'AI Support' },
//   ];

//   return (
//     <div className='min-h-screen bg-white'>
//       {/* Hero Section */}
//       <section className='relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center'>
//             <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
//               Build Your Perfect Resume with
//               <span className='text-blue-600'> AI Power</span>
//             </h1>
//             <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
//               Create professional, ATS-optimized resumes in minutes with our AI-powered builder. 
//               Get hired faster with intelligent suggestions and beautiful templates.
//             </p>
//             <div className='flex flex-col sm:flex-row gap-4 justify-center'>
//               <Link
//                 to='/signup'
//                 className='bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center'
//               >
//                 Start Building Free
//                 <ArrowRight className='ml-2 h-5 w-5' />
//               </Link>
//               <Link
//                 to='/templates'
//                 className='border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center'
//               >
//                 <Play className='mr-2 h-5 w-5' />
//                 Watch Demo
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className='py-16 bg-white'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
//             {stats.map((stat, index) => (
//               <div key={index} className='text-center'>
//                 <div className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
//                   {stat.number}
//                 </div>
//                 <div className='text-gray-600'>{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className='py-20 bg-gray-50'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-16'>
//             <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
//               Why Choose ResumeAI?
//             </h2>
//             <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
//               Our AI-powered platform makes it easy to create professional resumes that get noticed by employers.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//             {features.map((feature, index) => (
//               <div key={index} className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
//                 <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6'>
//                   <feature.icon className='h-6 w-6 text-blue-600' />
//                 </div>
//                 <h3 className='text-xl font-semibold text-gray-900 mb-3'>
//                   {feature.title}
//                 </h3>
//                 <p className='text-gray-600'>
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className='py-20 bg-white'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-16'>
//             <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
//               How It Works
//             </h2>
//             <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
//               Create your perfect resume in just three simple steps.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
//             <div className='text-center'>
//               <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
//                 <span className='text-2xl font-bold text-blue-600'>1</span>
//               </div>
//               <h3 className='text-xl font-semibold text-gray-900 mb-3'>
//                 Choose Template
//               </h3>
//               <p className='text-gray-600'>
//                 Select from our collection of professional templates designed for different industries.
//               </p>
//             </div>
            
//             <div className='text-center'>
//               <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
//                 <span className='text-2xl font-bold text-blue-600'>2</span>
//               </div>
//               <h3 className='text-xl font-semibold text-gray-900 mb-3'>
//                 Add Your Info
//               </h3>
//               <p className='text-gray-600'>
//                 Fill in your details and let our AI assistant help optimize your content.
//               </p>
//             </div>
            
//             <div className='text-center'>
//               <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
//                 <span className='text-2xl font-bold text-blue-600'>3</span>
//               </div>
//               <h3 className='text-xl font-semibold text-gray-900 mb-3'>
//                 Download & Apply
//               </h3>
//               <p className='text-gray-600'>
//                 Export your resume as a PDF and start applying to your dream jobs.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className='py-20 bg-gray-50'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-16'>
//             <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
//               What Our Users Say
//             </h2>
//             <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
//               Join thousands of professionals who've successfully landed their dream jobs.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className='bg-white rounded-xl p-8 shadow-sm'>
//                 <div className='flex items-center mb-4'>
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className='h-5 w-5 text-yellow-400 fill-current' />
//                   ))}
//                 </div>
//                 <p className='text-gray-600 mb-6 italic'>
//                   '{testimonial.content}'
//                 </p>
//                 <div>
//                   <div className='font-semibold text-gray-900'>{testimonial.name}</div>
//                   <div className='text-gray-500'>
//                     {testimonial.role} at {testimonial.company}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className='py-20 bg-blue-600'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//           <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
//             Ready to Build Your Perfect Resume?
//           </h2>
//           <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
//             Join thousands of professionals who've transformed their careers with ResumeAI.
//           </p>
//           <Link
//             to='/signup'
//             className='bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center'
//           >
//             Get Started Free
//             <ArrowRight className='ml-2 h-5 w-5' />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FileText, 
//   Bot, 
//   Download, 
//   Zap, 
//   Users, 
//   Shield,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Play
// } from 'lucide-react';

// const LandingPage: React.FC = () => {
//   const features = [
//     {
//       icon: Bot,
//       title: 'AI-Powered Enhancement',
//       description: 'Get intelligent suggestions to improve your resume content and make it ATS-friendly.',
//     },
//     {
//       icon: FileText,
//       title: 'Professional Templates',
//       description: 'Choose from dozens of professionally designed templates tailored for different industries.',
//     },
//     {
//       icon: Download,
//       title: 'Export to PDF',
//       description: 'Download your resume as a high-quality PDF ready for job applications.',
//     },
//     {
//       icon: Zap,
//       title: 'Real-time Preview',
//       description: 'See your changes instantly with our live preview feature.',
//     },
//     {
//       icon: Users,
//       title: 'ATS Optimization',
//       description: 'Ensure your resume passes Applicant Tracking Systems with our optimization tools.',
//     },
//     {
//       icon: Shield,
//       title: 'Secure & Private',
//       description: 'Your data is encrypted and secure. We never share your information.',
//     },
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Software Engineer',
//       company: 'Google',
//       content: 'ResumeAI helped me land my dream job at Google! The AI suggestions were spot-on.',
//       rating: 5,
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Marketing Manager',
//       company: 'Microsoft',
//       content: 'The templates are professional and the AI optimization really made a difference.',
//       rating: 5,
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Data Scientist',
//       company: 'Meta',
//       content: 'Best resume builder I\'ve used. The ATS optimization feature is game-changing.',
//       rating: 5,
//     },
//   ];

//   const stats = [
//     { number: '100K+', label: 'Resumes Created' },
//     { number: '95%', label: 'Success Rate' },
//     { number: '50+', label: 'Templates' },
//     { number: '24/7', label: 'AI Support' },
//   ];

//   return (
//     <div className='min-h-screen bg-white'>
//       {/* Hero Section */}
//       <section className='relative overflow-hidden'>
//         <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'></div>
//         <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]'></div>
//         <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]'></div>
        
//         <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32'>
//           <div className='text-center'>
//             <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight'>
//               Build Your Perfect Resume with
//               <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'> AI Power</span>
//             </h1>
//             <p className='text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed'>
//               Create professional, ATS-optimized resumes in minutes with our AI-powered builder. 
//               Get hired faster with intelligent suggestions and beautiful templates.
//             </p>
//             <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center'>
//               <Link
//                 to='/signup'
//                 className='group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]'
//               >
//                 Start Building Free
//                 <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
//               </Link>
//               <Link
//                 to='/templates'
//                 className='group border-2 border-gray-300 text-gray-700 px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center min-w-[200px]'
//               >
//                 <Play className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform' />
//                 Watch Demo
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className='py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
//             {stats.map((stat, index) => (
//               <div key={index} className='text-center group'>
//                 <div className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300'>
//                   {stat.number}
//                 </div>
//                 <div className='text-sm sm:text-base text-gray-600 font-medium'>{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className='py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
//             <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6'>
//               Why Choose ResumeAI?
//             </h2>
//             <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//               Our AI-powered platform makes it easy to create professional resumes that get noticed by employers.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
//             {features.map((feature, index) => (
//               <div key={index} className='group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2'>
//                 <div className='w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
//                   <feature.icon className='h-7 w-7 text-blue-600' />
//                 </div>
//                 <h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4'>
//                   {feature.title}
//                 </h3>
//                 <p className='text-gray-600 leading-relaxed'>
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className='py-16 sm:py-20 lg:py-24 bg-white'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
//             <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6'>
//               How It Works
//             </h2>
//             <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//               Create your perfect resume in just three simple steps.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
//             {[
//               {
//                 step: 1,
//                 title: 'Choose Template',
//                 description: 'Select from our collection of professional templates designed for different industries.'
//               },
//               {
//                 step: 2,
//                 title: 'Add Your Info',
//                 description: 'Fill in your details and let our AI assistant help optimize your content.'
//               },
//               {
//                 step: 3,
//                 title: 'Download & Apply',
//                 description: 'Export your resume as a PDF and start applying to your dream jobs.'
//               }
//             ].map((item, index) => (
//               <div key={index} className='relative text-center group'>
//                 {index < 2 && (
//                   <div className='hidden md:block absolute top-8 left-1/2 transform translate-x-1/2 w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 z-0'></div>
//                 )}
//                 <div className='relative z-10'>
//                   <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
//                     <span className='text-2xl sm:text-3xl font-bold text-white'>{item.step}</span>
//                   </div>
//                   <h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4'>
//                     {item.title}
//                   </h3>
//                   <p className='text-gray-600 leading-relaxed max-w-sm mx-auto'>
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className='py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
//             <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6'>
//               What Our Users Say
//             </h2>
//             <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//               Join thousands of professionals who've successfully landed their dream jobs.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1'>
//                 <div className='flex items-center mb-4 sm:mb-6'>
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className='h-5 w-5 text-yellow-400 fill-current' />
//                   ))}
//                 </div>
//                 <p className='text-gray-600 mb-6 sm:mb-8 italic leading-relaxed text-base sm:text-lg'>
//                   '{testimonial.content}'
//                 </p>
//                 <div className='border-t border-gray-100 pt-4 sm:pt-6'>
//                   <div className='font-semibold text-gray-900 text-lg'>{testimonial.name}</div>
//                   <div className='text-gray-500 text-sm sm:text-base'>
//                     {testimonial.role} at {testimonial.company}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className='relative py-16 sm:py-20 lg:py-24 overflow-hidden'>
//         <div className='absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700'></div>
//         <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]'></div>
//         <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]'></div>
        
//         <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//           <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>
//             Ready to Build Your Perfect Resume?
//           </h2>
//           <p className='text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed'>
//             Join thousands of professionals who've transformed their careers with ResumeAI.
//           </p>
//           <Link
//             to='/signup'
//             className='group bg-white text-blue-600 px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1'
//           >
//             Get Started Free
//             <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FileText, 
//   Bot, 
//   Download, 
//   Zap, 
//   Users, 
//   Shield,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Play,
//   Sparkles,
//   Target,
//   Award
// } from 'lucide-react';

// const LandingPage: React.FC = () => {
//   const features = [
//     {
//       icon: Bot,
//       title: 'AI-Powered Enhancement',
//       description: 'Get intelligent suggestions to improve your resume content and make it ATS-friendly.',
//       color: 'from-purple-500 to-pink-500',
//       bgColor: 'from-purple-50 to-pink-50'
//     },
//     {
//       icon: FileText,
//       title: 'Professional Templates',
//       description: 'Choose from dozens of professionally designed templates tailored for different industries.',
//       color: 'from-blue-500 to-cyan-500',
//       bgColor: 'from-blue-50 to-cyan-50'
//     },
//     {
//       icon: Download,
//       title: 'Export to PDF',
//       description: 'Download your resume as a high-quality PDF ready for job applications.',
//       color: 'from-green-500 to-emerald-500',
//       bgColor: 'from-green-50 to-emerald-50'
//     },
//     {
//       icon: Zap,
//       title: 'Real-time Preview',
//       description: 'See your changes instantly with our live preview feature.',
//       color: 'from-yellow-500 to-orange-500',
//       bgColor: 'from-yellow-50 to-orange-50'
//     },
//     {
//       icon: Users,
//       title: 'ATS Optimization',
//       description: 'Ensure your resume passes Applicant Tracking Systems with our optimization tools.',
//       color: 'from-indigo-500 to-purple-500',
//       bgColor: 'from-indigo-50 to-purple-50'
//     },
//     {
//       icon: Shield,
//       title: 'Secure & Private',
//       description: 'Your data is encrypted and secure. We never share your information.',
//       color: 'from-red-500 to-pink-500',
//       bgColor: 'from-red-50 to-pink-50'
//     },
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Software Engineer',
//       company: 'Google',
//       content: 'ResumeAI helped me land my dream job at Google! The AI suggestions were spot-on.',
//       rating: 5,
//       avatar: 'SJ',
//       color: 'from-purple-500 to-pink-500'
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Marketing Manager',
//       company: 'Microsoft',
//       content: 'The templates are professional and the AI optimization really made a difference.',
//       rating: 5,
//       avatar: 'MC',
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       name: 'Emily Rodriguez',
//       role: 'Data Scientist',
//       company: 'Meta',
//       content: 'Best resume builder I\'ve used. The ATS optimization feature is game-changing.',
//       rating: 5,
//       avatar: 'ER',
//       color: 'from-green-500 to-emerald-500'
//     },
//   ];

//   const stats = [
//     { number: '100K+', label: 'Resumes Created', icon: FileText, color: 'from-blue-500 to-purple-500' },
//     { number: '95%', label: 'Success Rate', icon: Target, color: 'from-green-500 to-blue-500' },
//     { number: '50+', label: 'Templates', icon: Award, color: 'from-purple-500 to-pink-500' },
//     { number: '24/7', label: 'AI Support', icon: Bot, color: 'from-orange-500 to-red-500' },
//   ];

//   return (
//     <div className='min-h-screen bg-white overflow-hidden'>
//       {/* Animated Background Elements */}
//       <div className='fixed inset-0 overflow-hidden pointer-events-none'>
//         <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse'></div>
//         <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
//         <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500'></div>
//       </div>

//       {/* Hero Section */}
//       <section className='relative min-h-screen flex items-center justify-center'>
//         <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30'></div>
        
//         {/* Floating Elements */}
//         <div className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl rotate-12 animate-bounce delay-300'></div>
//         <div className='absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-bounce delay-700'></div>
//         <div className='absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl rotate-45 animate-bounce delay-1000'></div>
        
//         <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10'>
//           <div className='mb-8'>
//             <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 mb-8 animate-fade-in'>
//               <Sparkles className='w-4 h-4 mr-2' />
//               AI-Powered Resume Builder
//             </div>
//           </div>
          
//           <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight'>
//             <span className='block bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent'>
//               Build Your
//             </span>
//             <span className='block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient'>
//               Dream Resume
//             </span>
//             <span className='block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-gray-600 mt-4'>
//               with AI Magic ✨
//             </span>
//           </h1>
          
//           <p className='text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light'>
//             Transform your career with our revolutionary AI-powered resume builder. 
//             Create stunning, ATS-optimized resumes that get you hired faster.
//           </p>
          
//           <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-16'>
//             <Link
//               to='/signup'
//               className='group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25'
//             >
//               <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
//               <span className='relative flex items-center'>
//                 Start Building Free
//                 <ArrowRight className='ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300' />
//               </span>
//             </Link>
            
//             <Link
//               to='/templates'
//               className='group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white hover:border-purple-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
//             >
//               <span className='flex items-center'>
//                 <Play className='mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300' />
//                 Watch Demo
//               </span>
//             </Link>
//           </div>
          
//           {/* Floating Stats */}
//           <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto'>
//             {stats.map((stat, index) => (
//               <div key={index} className='group relative'>
//                 <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl'>
//                   <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300`}>
//                     <stat.icon className='w-6 h-6 text-white' />
//                   </div>
//                   <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
//                     {stat.number}
//                   </div>
//                   <div className='text-gray-600 font-medium'>{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className='relative py-32 bg-gradient-to-b from-white to-gray-50'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-20'>
//             <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-8'>
//               <Zap className='w-4 h-4 mr-2' />
//               Powerful Features
//             </div>
//             <h2 className='text-5xl sm:text-6xl font-bold text-gray-900 mb-6'>
//               Why Choose
//               <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'> ResumeAI?</span>
//             </h2>
//             <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//               Experience the future of resume building with our cutting-edge AI technology.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//             {features.map((feature, index) => (
//               <div key={index} className='group relative'>
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}></div>
//                 <div className='relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100'>
//                   <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
//                     <feature.icon className='h-8 w-8 text-white' />
//                   </div>
//                   <h3 className='text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300'>
//                     {feature.title}
//                   </h3>
//                   <p className='text-gray-600 leading-relaxed'>
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className='relative py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden'>
//         <div className='absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20'></div>
        
//         <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-20'>
//             <div className='inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-8'>
//               <Target className='w-4 h-4 mr-2' />
//               Simple Process
//             </div>
//             <h2 className='text-5xl sm:text-6xl font-bold text-white mb-6'>
//               How It Works
//             </h2>
//             <p className='text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed'>
//               Create your perfect resume in just three magical steps.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative'>
//             {/* Connection Lines */}
//             <div className='hidden md:block absolute top-1/2 left-1/3 w-1/3 h-px bg-gradient-to-r from-purple-400 to-pink-400 transform -translate-y-1/2'></div>
//             <div className='hidden md:block absolute top-1/2 right-1/3 w-1/3 h-px bg-gradient-to-r from-pink-400 to-purple-400 transform -translate-y-1/2'></div>
            
//             {[
//               {
//                 step: 1,
//                 title: 'Choose Template',
//                 description: 'Select from our collection of stunning templates designed by professionals.',
//                 icon: FileText,
//                 color: 'from-purple-500 to-pink-500'
//               },
//               {
//                 step: 2,
//                 title: 'AI Enhancement',
//                 description: 'Let our AI analyze and optimize your content for maximum impact.',
//                 icon: Bot,
//                 color: 'from-pink-500 to-red-500'
//               },
//               {
//                 step: 3,
//                 title: 'Download & Shine',
//                 description: 'Export your masterpiece and start landing your dream interviews.',
//                 icon: Download,
//                 color: 'from-red-500 to-orange-500'
//               }
//             ].map((item, index) => (
//               <div key={index} className='relative text-center group'>
//                 <div className='relative z-10'>
//                   <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
//                     <item.icon className='h-12 w-12 text-white' />
//                   </div>
//                   <div className='bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105'>
//                     <div className={`text-6xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
//                       {item.step}
//                     </div>
//                     <h3 className='text-2xl font-bold text-white mb-4'>
//                       {item.title}
//                     </h3>
//                     <p className='text-purple-100 leading-relaxed'>
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className='relative py-32 bg-gradient-to-b from-gray-50 to-white'>
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='text-center mb-20'>
//             <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium text-green-800 mb-8'>
//               <Award className='w-4 h-4 mr-2' />
//               Success Stories
//             </div>
//             <h2 className='text-5xl sm:text-6xl font-bold text-gray-900 mb-6'>
//               What Our Users
//               <span className='bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'> Say</span>
//             </h2>
//             <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//               Join thousands of professionals who've transformed their careers.
//             </p>
//           </div>
          
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className='group relative'>
//                 <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 shadow-lg'></div>
//                 <div className='relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100'>
//                   <div className='flex items-center mb-6'>
//                     <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4`}>
//                       {testimonial.avatar}
//                     </div>
//                     <div className='flex'>
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className='h-5 w-5 text-yellow-400 fill-current' />
//                       ))}
//                     </div>
//                   </div>
//                   <p className='text-gray-700 mb-6 italic text-lg leading-relaxed'>
//                     '{testimonial.content}'
//                   </p>
//                   <div className='border-t border-gray-100 pt-6'>
//                     <div className='font-bold text-gray-900 text-lg'>{testimonial.name}</div>
//                     <div className='text-gray-500'>
//                       {testimonial.role} at <span className='font-semibold'>{testimonial.company}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className='relative py-32 overflow-hidden'>
//         <div className='absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600'></div>
//         <div className='absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20'></div>
        
//         <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//           <div className='mb-8'>
//             <Sparkles className='w-16 h-16 text-white/80 mx-auto mb-8 animate-pulse' />
//           </div>
          
//           <h2 className='text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight'>
//             Ready to Transform
//             <span className='block'>Your Career?</span>
//           </h2>
          
//           <p className='text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light'>
//             Join the revolution and create a resume that opens doors to your dream job.
//           </p>
          
//           <Link
//             to='/signup'
//             className='group relative inline-flex items-center bg-white text-purple-600 px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden'
//           >
//             <div className='absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
//             <span className='relative flex items-center'>
//               Get Started Free
//               <ArrowRight className='ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform duration-300' />
//             </span>
//           </Link>
          
//           <p className='text-white/70 mt-6 text-lg'>
//             No credit card required • Start in seconds
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;




import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Bot, 
  Download, 
  Zap, 
  Users, 
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Sparkles,
  Target,
  Award
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Enhancement',
      description: 'Get intelligent suggestions to improve your resume content and make it ATS-friendly.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: FileText,
      title: 'Professional Templates',
      description: 'Choose from dozens of professionally designed templates tailored for different industries.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Download,
      title: 'Export to PDF',
      description: 'Download your resume as a high-quality PDF ready for job applications.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Zap,
      title: 'Real-time Preview',
      description: 'See your changes instantly with our live preview feature.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      icon: Users,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes Applicant Tracking Systems with our optimization tools.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never share your information.',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Google',
      content: 'ResumeAI helped me land my dream job at Google! The AI suggestions were spot-on.',
      rating: 5,
      avatar: 'SJ',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      company: 'Microsoft',
      content: 'The templates are professional and the AI optimization really made a difference.',
      rating: 5,
      avatar: 'MC',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'Meta',
      content: 'Best resume builder I\'ve used. The ATS optimization feature is game-changing.',
      rating: 5,
      avatar: 'ER',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const stats = [
    { number: '100K+', label: 'Resumes Created', icon: FileText, color: 'from-blue-500 to-purple-500' },
    { number: '95%', label: 'Success Rate', icon: Target, color: 'from-green-500 to-blue-500' },
    { number: '50+', label: 'Templates', icon: Award, color: 'from-purple-500 to-pink-500' },
    { number: '24/7', label: 'AI Support', icon: Bot, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl rotate-12 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl rotate-45 animate-bounce delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-6 mt-2">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-800 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Resume Builder
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="block  bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Build Your  Dream Resume

            </span>
            {/* <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              Dream Resume
            </span> */}
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-gray-600 mt-4">
              with AI Magic ✨
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Transform your career with our revolutionary AI-powered resume builder. 
            Create stunning, ATS-optimized resumes that get you hired faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/signup"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center">
                Start Building Free
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link
              to="/templates"
              className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-14 py-4 rounded-xl text-xl font-bold hover:bg-white hover:border-purple-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center">
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </span>
            </Link>
          </div>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
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

      {/* Features Section */}
      <section className="relative py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> ResumeAI?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of resume building with our cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
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

      {/* How It Works Section */}
      <section className="relative py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-8">
              <Target className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Create your perfect resume in just three magical steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-px bg-gradient-to-r from-purple-400 to-pink-400 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-px bg-gradient-to-r from-pink-400 to-purple-400 transform -translate-y-1/2"></div>
            
            {[
              {
                step: 1,
                title: 'Choose Template',
                description: 'Select from our collection of stunning templates designed by professionals.',
                icon: FileText,
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: 2,
                title: 'AI Enhancement',
                description: 'Let our AI analyze and optimize your content for maximum impact.',
                icon: Bot,
                color: 'from-pink-500 to-red-500'
              },
              {
                step: 3,
                title: 'Download & Shine',
                description: 'Export your masterpiece and start landing your dream interviews.',
                icon: Download,
                color: 'from-red-500 to-orange-500'
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <div className={`text-6xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-purple-100 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium text-green-800 mb-8">
              <Award className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              What Our Users
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who've transformed their careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 shadow-lg"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4`}>
                      {testimonial.avatar}
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-500">
                      {testimonial.role} at <span className="font-semibold">{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M50%2050c0-5.5%204.5-10%2010-10s10%204.5%2010%2010-4.5%2010-10%2010-10-4.5-10-10zm-20%200c0-5.5%204.5-10%2010-10s10%204.5%2010%2010-4.5%2010-10%2010-10-4.5-10-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white/80 mx-auto mb-8 animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform
            <span className="block">Your Career?</span>
          </h2>
          
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join the revolution and create a resume that opens doors to your dream job.
          </p>
          
          <Link
            to="/signup"
            className="group relative inline-flex items-center bg-white text-purple-600 px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              Get Started Free
              <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
          
          <p className="text-white/70 mt-6 text-lg">
            No credit card required • Start in seconds
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;