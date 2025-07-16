const mongoose = require('mongoose');
const Template = require('../models/Template');
require('dotenv').config();

const templates = [
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
  }
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-resume-builder');
    
    console.log('Connected to MongoDB');
    
    // Clear existing templates
    await Template.deleteMany({});
    console.log('Cleared existing templates');
    
    // Insert new templates
    await Template.insertMany(templates);
    console.log('Templates seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
}

seedTemplates();