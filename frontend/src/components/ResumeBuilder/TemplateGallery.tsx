import React, { useState } from 'react';
import { Check, Crown, Star, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  isPremium: boolean;
  features: string[];
  rating: number;
  downloads: number;
}

interface TemplateGalleryProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ selectedTemplate, onTemplateChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design perfect for tech roles',
      category: 'professional',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['ATS Optimized', 'Clean Layout', 'Professional'],
      rating: 4.8,
      downloads: 15420,
    },
    {
      id: 'classic',
      name: 'Classic Traditional',
      description: 'Traditional format ideal for corporate positions',
      category: 'professional',
      preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Traditional', 'Corporate', 'Timeless'],
      rating: 4.6,
      downloads: 12350,
    },
    {
      id: 'creative',
      name: 'Creative Bold',
      description: 'Eye-catching design for creative industries',
      category: 'creative',
      preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Creative', 'Colorful', 'Artistic'],
      rating: 4.7,
      downloads: 9870,
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant layout with plenty of white space',
      category: 'professional',
      preview: 'https://images.pexels.com/photos/590018/pexels-photo-590018.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Minimalist', 'Clean', 'Simple'],
      rating: 4.5,
      downloads: 8960,
    },
    {
      id: 'executive',
      name: 'Executive Elite',
      description: 'Sophisticated design for senior-level positions',
      category: 'professional',
      preview: 'https://images.pexels.com/photos/590024/pexels-photo-590024.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: true,
      features: ['Executive Level', 'Sophisticated', 'Premium'],
      rating: 4.9,
      downloads: 5670,
    },
    {
      id: 'designer',
      name: 'Designer Portfolio',
      description: 'Portfolio-focused layout for designers and creatives',
      category: 'creative',
      preview: 'https://images.pexels.com/photos/590026/pexels-photo-590026.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: true,
      features: ['Portfolio Style', 'Creative', 'Visual'],
      rating: 4.8,
      downloads: 4320,
    },
    {
      id: 'tech',
      name: 'Tech Innovator',
      description: 'Modern design tailored for tech professionals',
      category: 'tech',
      preview: 'https://images.pexels.com/photos/590028/pexels-photo-590028.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: true,
      features: ['Tech-Focused', 'Modern', 'Skills-Heavy'],
      rating: 4.9,
      downloads: 7890,
    },
    {
      id: 'academic',
      name: 'Academic Scholar',
      description: 'Perfect for academic and research positions',
      category: 'academic',
      preview: 'https://images.pexels.com/photos/590030/pexels-photo-590030.jpeg?auto=compress&cs=tinysrgb&w=300',
      isPremium: false,
      features: ['Academic', 'Research-Focused', 'Publications'],
      rating: 4.4,
      downloads: 3210,
    },
  ];

  const categories = ['all', 'professional', 'creative', 'tech', 'academic'];

  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : ''
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </div>
                )}
                
                {/* Selected Badge */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                      {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="capitalize">{template.category}</span>
                  <span>{template.downloads.toLocaleString()} downloads</span>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTemplateChange(template.id);
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedTemplate === template.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedTemplate === template.id ? 'Selected' : 'Use This Template'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;