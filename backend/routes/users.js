const express = require('express');
const User = require('../models/User');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user dashboard stats
router.get('/dashboard-stats', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get resume stats
    const resumes = await Resume.find({ userId });
    const totalResumes = resumes.length;
    const totalDownloads = resumes.reduce((sum, resume) => sum + resume.downloadCount, 0);
    
    // Calculate average ATS score
    const resumesWithATS = resumes.filter(r => r.atsScore !== null);
    const averageAtsScore = resumesWithATS.length > 0 
      ? resumesWithATS.reduce((sum, r) => sum + r.atsScore, 0) / resumesWithATS.length 
      : 0;

    // Recent activity
    const recentResumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title updatedAt templateId');

    const stats = {
      totalResumes,
      totalDownloads,
      averageAtsScore: Math.round(averageAtsScore),
      recentResumes,
      subscription: req.user.subscription,
      memberSince: req.user.createdAt
    };

    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard stats',
      error: error.message 
    });
  }
});

// Update user subscription
router.put('/subscription', auth, async (req, res) => {
  try {
    const { subscription } = req.body;

    if (!['free', 'pro', 'enterprise'].includes(subscription)) {
      return res.status(400).json({ 
        message: 'Invalid subscription type' 
      });
    }

    const user = await User.findById(req.user._id);
    user.subscription = subscription;
    await user.save();

    res.json({
      message: 'Subscription updated successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Subscription update error:', error);
    res.status(500).json({ 
      message: 'Error updating subscription',
      error: error.message 
    });
  }
});

// Get user activity log
router.get('/activity', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('title updatedAt createdAt templateId atsScore downloadCount');

    const activities = resumes.map(resume => ({
      id: resume._id,
      type: 'resume_update',
      title: `Updated "${resume.title}"`,
      timestamp: resume.updatedAt,
      metadata: {
        templateId: resume.templateId,
        atsScore: resume.atsScore,
        downloadCount: resume.downloadCount
      }
    }));

    res.json({
      activities,
      hasMore: resumes.length === limit
    });
  } catch (error) {
    console.error('Activity log error:', error);
    res.status(500).json({ 
      message: 'Error fetching activity log',
      error: error.message 
    });
  }
});

module.exports = router;