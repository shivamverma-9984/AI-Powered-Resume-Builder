const express = require('express');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all resumes for user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const query = { userId: req.user._id };
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const resumes = await Resume.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Resume.countDocuments(query);

    res.json({
      resumes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ 
      message: 'Error fetching resumes',
      error: error.message 
    });
  }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ 
      message: 'Error fetching resume',
      error: error.message 
    });
  }
});

// Create new resume
router.post('/', auth, async (req, res) => {
  try {
    const { title, templateId, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Resume title is required' });
    }

    const resume = new Resume({
      userId: req.user._id,
      title,
      templateId: templateId || 'modern',
      content: content || {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          website: ''
        },
        summary: '',
        workExperience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
      }
    });

    await resume.save();

    res.status(201).json({
      message: 'Resume created successfully',
      resume
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ 
      message: 'Error creating resume',
      error: `New Error ${error.message} `
    });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, templateId, content, atsScore } = req.body;

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Update fields
    if (title) resume.title = title;
    if (templateId) resume.templateId = templateId;
    if (content) resume.content = content;
    if (atsScore !== undefined) resume.atsScore = atsScore;

    await resume.save();

    res.json({
      message: 'Resume updated successfully',
      resume
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ 
      message: 'Error updating resume',
      error: error.message 
    });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ 
      message: 'Error deleting resume',
      error: error.message 
    });
  }
});

// Generate share link
router.post('/:id/share', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Generate unique share token
    resume.shareToken = uuidv4();
    resume.isPublic = true;
    await resume.save();

    res.json({
      message: 'Share link generated successfully',
      shareUrl: `${process.env.CLIENT_URL}/share/${resume.shareToken}`
    });
  } catch (error) {
    console.error('Share resume error:', error);
    res.status(500).json({ 
      message: 'Error generating share link',
      error: error.message 
    });
  }
});

// Get shared resume (public)
router.get('/share/:token', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      shareToken: req.params.token,
      isPublic: true
    }).populate('userId', 'fullName');

    if (!resume) {
      return res.status(404).json({ message: 'Shared resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get shared resume error:', error);
    res.status(500).json({ 
      message: 'Error fetching shared resume',
      error: error.message 
    });
  }
});

// Track download
router.post('/:id/download', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.downloadCount += 1;
    await resume.save();

    res.json({ message: 'Download tracked successfully' });
  } catch (error) {
    console.error('Track download error:', error);
    res.status(500).json({ 
      message: 'Error tracking download',
      error: error.message 
    });
  }
});

module.exports = router;