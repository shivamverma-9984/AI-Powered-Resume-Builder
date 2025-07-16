const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['professional', 'creative', 'tech', 'academic', 'modern']
  },
  preview: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  features: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  downloads: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Template', templateSchema);