export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  isEmailVerified?: boolean;
  created_at: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  content: ResumeContent;
  created_at: string;
  updated_at: string;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  url?: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  category: string;
  isPremium: boolean;
}

export interface AIResponse {
  suggestions: string[];
  optimizedContent: string;
  atsScore: number;
  improvements: string[];
}