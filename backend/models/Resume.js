const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  website: { type: String, default: '' }
});

const workExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: [{ type: String }],
  location: { type: String, default: '' }
},{ _id: false });

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  gpa: { type: String, default: '' },
  description: { type: String, default: '' }
},{ _id: false });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true 
  },
  category: { type: String, required: true }
},{ _id: false });

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  url: { type: String, default: '' },
  github: { type: String, default: '' }
},{ _id: false });

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  expiryDate: { type: String, default: '' },
  url: { type: String, default: '' }
},{ _id: false });

const resumeContentSchema = new mongoose.Schema({
  personalInfo: personalInfoSchema,
  summary: { type: String, default: '' },
  workExperience: [workExperienceSchema],
  education: [educationSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  certifications: [certificationSchema]
});

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  templateId: {
    type: String,
    required: true,
    default: 'modern'
  },
  content: {
    type: resumeContentSchema,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  },
  atsScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  lastAIEnhancement: {
    type: Date,
    default: null
  },
  downloadCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
resumeSchema.index({ userId: 1, updatedAt: -1 });
resumeSchema.index({ shareToken: 1 });

module.exports = mongoose.model('Resume', resumeSchema);