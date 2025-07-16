const express = require('express');
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

const router = express.Router();

// Mock AI service - replace with actual OpenAI/Gemini integration
class AIService {
  static async enhanceResume(resumeContent, jobDescription = '', targetRole = '') {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const suggestions = [
      {
        type: 'improvement',
        section: 'summary',
        title: 'Strengthen Your Professional Summary',
        description: 'Add quantifiable achievements and specific metrics to make your summary more impactful.',
        before: resumeContent.summary,
        after: `Results-driven ${targetRole || 'professional'} with 5+ years of experience delivering measurable outcomes. Increased team productivity by 30% and reduced project delivery time by 25%. Proven track record of leading cross-functional teams and implementing innovative solutions.`,
        impact: 'high'
      },
      {
        type: 'improvement',
        section: 'experience',
        title: 'Use Action Verbs and Quantify Results',
        description: 'Replace weak verbs with strong action verbs and add specific numbers to demonstrate impact.',
        before: 'Responsible for managing projects',
        after: 'Led 15+ cross-functional projects, resulting in $2M cost savings and 40% improvement in delivery time',
        impact: 'high'
      },
      {
        type: 'addition',
        section: 'skills',
        title: 'Add Industry-Relevant Skills',
        description: 'Include trending skills and technologies relevant to your target role.',
        keywords: ['Machine Learning', 'Data Analytics', 'Cloud Computing', 'Agile Methodology'],
        impact: 'medium'
      }
    ];

    const atsScore = Math.floor(Math.random() * 20) + 75;

    return {
      suggestions,
      atsScore,
      optimizedContent: resumeContent,
      improvements: [
        'Use more action verbs',
        'Add quantifiable results',
        'Include relevant keywords',
        'Improve formatting for ATS'
      ]
    };
  }

  static async optimizeForATS(resumeContent, jobDescription) {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Extract keywords from job description (simplified)
    const jobWords = jobDescription.toLowerCase().split(/\s+/);
    const resumeText = JSON.stringify(resumeContent).toLowerCase();
    
    const importantKeywords = [
      'leadership', 'management', 'project', 'team', 'development',
      'analysis', 'strategy', 'implementation', 'optimization', 'innovation',
      'collaboration', 'communication', 'problem-solving', 'results-driven'
    ];

    const missingKeywords = importantKeywords.filter(keyword => 
      jobWords.includes(keyword) && !resumeText.includes(keyword)
    );

    const atsScore = Math.floor(Math.random() * 15) + 80;

    return {
      atsScore,
      missingKeywords,
      recommendations: [
        'Include more industry-specific keywords',
        'Use standard section headings',
        'Quantify achievements with numbers',
        'Match job requirements more closely'
      ],
      optimizedSections: {
        summary: 'Enhanced summary with relevant keywords...',
        skills: missingKeywords
      }
    };
  }

  static async generateKeywordSuggestions(jobDescription, currentResume) {
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const suggestions = [
      'React.js', 'Node.js', 'MongoDB', 'Express.js',
      'JavaScript', 'TypeScript', 'REST APIs', 'GraphQL',
      'AWS', 'Docker', 'Kubernetes', 'CI/CD',
      'Agile', 'Scrum', 'Team Leadership', 'Project Management'
    ];

    return {
      keywords: suggestions.slice(0, 8),
      relevanceScore: Math.floor(Math.random() * 20) + 75,
      industryTrends: [
        'AI/ML integration is trending in tech roles',
        'Cloud computing skills are in high demand',
        'DevOps practices are becoming essential'
      ]
    };
  }
}

// Enhance resume with AI
router.post('/enhance', auth, async (req, res) => {
  try {
    const { resumeId, jobDescription, targetRole } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'Resume ID is required' });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const enhancement = await AIService.enhanceResume(
      resume.content,
      jobDescription,
      targetRole
    );

    // Update resume with AI enhancement timestamp and ATS score
    resume.lastAIEnhancement = new Date();
    resume.atsScore = enhancement.atsScore;
    await resume.save();

    res.json({
      message: 'Resume enhanced successfully',
      ...enhancement
    });
  } catch (error) {
    console.error('AI enhancement error:', error);
    res.status(500).json({ 
      message: 'Error enhancing resume',
      error: error.message 
    });
  }
});

// Optimize for ATS
router.post('/optimize-ats', auth, async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({ 
        message: 'Resume ID and job description are required' 
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const optimization = await AIService.optimizeForATS(
      resume.content,
      jobDescription
    );

    // Update ATS score
    resume.atsScore = optimization.atsScore;
    await resume.save();

    res.json({
      message: 'ATS optimization completed',
      ...optimization
    });
  } catch (error) {
    console.error('ATS optimization error:', error);
    res.status(500).json({ 
      message: 'Error optimizing for ATS',
      error: error.message 
    });
  }
});

// Get keyword suggestions
router.post('/keywords', auth, async (req, res) => {
  try {
    const { jobDescription, resumeId } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ 
        message: 'Job description is required' 
      });
    }

    let currentResume = null;
    if (resumeId) {
      currentResume = await Resume.findOne({
        _id: resumeId,
        userId: req.user._id
      });
    }

    const suggestions = await AIService.generateKeywordSuggestions(
      jobDescription,
      currentResume?.content
    );

    res.json({
      message: 'Keyword suggestions generated',
      ...suggestions
    });
  } catch (error) {
    console.error('Keyword suggestions error:', error);
    res.status(500).json({ 
      message: 'Error generating keyword suggestions',
      error: error.message 
    });
  }
});

// Get AI usage stats for user
router.get('/stats', auth, async (req, res) => {
  try {
    const userResumes = await Resume.find({ userId: req.user._id });
    
    const stats = {
      totalResumes: userResumes.length,
      enhancedResumes: userResumes.filter(r => r.lastAIEnhancement).length,
      averageAtsScore: userResumes.reduce((sum, r) => sum + (r.atsScore || 0), 0) / userResumes.length || 0,
      totalDownloads: userResumes.reduce((sum, r) => sum + r.downloadCount, 0),
      lastEnhancement: userResumes
        .filter(r => r.lastAIEnhancement)
        .sort((a, b) => new Date(b.lastAIEnhancement) - new Date(a.lastAIEnhancement))[0]?.lastAIEnhancement
    };

    res.json(stats);
  } catch (error) {
    console.error('AI stats error:', error);
    res.status(500).json({ 
      message: 'Error fetching AI stats',
      error: error.message 
    });
  }
});

module.exports = router;