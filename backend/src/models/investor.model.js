const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    trim: true
  },
  investorType: {
    type: String,
    required: [true, 'Investor type is required'],
    enum: ['Angel Investor', 'Venture Capital', 'Private Equity', 'Corporate Investor', 'Mentor', 'Incubator/Accelerator', 'Other']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  investmentPreferences: {
    industries: [{
      type: String,
      enum: ['AgriTech', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'SaaS', 'CleanTech', 'AI/ML', 'IoT', 'Other']
    }],
    stages: [{
      type: String,
      enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'Established']
    }],
    locations: [{
      type: String,
      enum: ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape']
    }],
    minInvestment: Number,
    maxInvestment: Number
  },
  portfolio: [{
    companyName: String,
    description: String,
    investmentYear: Number,
    website: String
  }],
  verificationDocuments: {
    idDocument: String,
    proofOfFunds: String,
    businessRegistration: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  website: String,
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  bookmarkedStartups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup'
  }],
  analytics: {
    profileViews: { type: Number, default: 0 },
    startupViews: { type: Number, default: 0 },
    messagesSent: { type: Number, default: 0 }
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

const Investor = mongoose.model('Investor', investorSchema);

module.exports = Investor;