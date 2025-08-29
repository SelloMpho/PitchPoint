const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Business description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  industry: [{
    type: String,
    required: [true, 'At least one industry tag is required'],
    enum: ['AgriTech', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'SaaS', 'CleanTech', 'AI/ML', 'IoT', 'Other']
  }],
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape']
  },
  foundingYear: {
    type: Number,
    required: [true, 'Founding year is required']
  },
  fundingStage: {
    type: String,
    required: [true, 'Funding stage is required'],
    enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'Established']
  },
  fundingAmount: {
    type: Number,
    required: [true, 'Funding amount is required']
  },
  equityOffered: {
    type: Number,
    min: [0, 'Equity offered cannot be negative'],
    max: [100, 'Equity offered cannot exceed 100%']
  },
  useOfFunds: {
    type: String,
    required: [true, 'Use of funds is required'],
    trim: true
  },
  pitchDeck: {
    type: String,
    default: ''
  },
  pitchVideo: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    trim: true
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  teamMembers: [{
    name: String,
    position: String,
    bio: String,
    photo: String
  }],
  traction: {
    revenue: Number,
    users: Number,
    growth: String,
    metrics: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  analytics: {
    views: { type: Number, default: 0 },
    contactRequests: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;