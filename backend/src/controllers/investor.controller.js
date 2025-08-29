const Investor = require('../models/investor.model');
const User = require('../models/user.model');

// Create or update investor profile
exports.createUpdateInvestorProfile = async (req, res) => {
  try {
    // Check if investor profile already exists
    let investor = await Investor.findOne({ user: req.user.id });
    
    if (investor) {
      // Update existing profile
      investor = await Investor.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      req.body.user = req.user.id;
      investor = await Investor.create(req.body);
      
      // Update user role if needed
      if (req.user.role !== 'investor') {
        await User.findByIdAndUpdate(req.user.id, { role: 'investor' });
      }
    }
    
    res.status(200).json({
      success: true,
      data: investor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating/updating investor profile',
      error: error.message
    });
  }
};

// Get all investors with filtering
exports.getInvestors = async (req, res) => {
  try {
    // Build query
    let query = {};
    
    // Filter by investor type
    if (req.query.investorType) {
      query['investorType'] = req.query.investorType;
    }
    
    // Filter by industry preferences
    if (req.query.industry) {
      query['investmentPreferences.industries'] = { $in: req.query.industry.split(',') };
    }
    
    // Filter by verified status
    if (req.query.isVerified) {
      query.isVerified = req.query.isVerified === 'true';
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Execute query
    const investors = await Investor.find(query)
      .skip(skip)
      .limit(limit)
      .populate('user', 'firstName lastName email profilePicture');
    
    // Get total count
    const total = await Investor.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: investors.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: investors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting investors',
      error: error.message
    });
  }
};

// Get single investor
exports.getInvestor = async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id)
      .populate('user', 'firstName lastName email profilePicture');
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        message: 'Investor not found'
      });
    }
    
    // Increment profile views
    investor.analytics.profileViews += 1;
    await investor.save();
    
    res.status(200).json({
      success: true,
      data: investor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting investor',
      error: error.message
    });
  }
};

// Get current investor profile
exports.getCurrentInvestorProfile = async (req, res) => {
  try {
    const investor = await Investor.findOne({ user: req.user.id });
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        message: 'Investor profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: investor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting investor profile',
      error: error.message
    });
  }
};

// Bookmark a startup
exports.bookmarkStartup = async (req, res) => {
  try {
    const { startupId } = req.body;
    
    if (!startupId) {
      return res.status(400).json({
        success: false,
        message: 'Startup ID is required'
      });
    }
    
    const investor = await Investor.findOne({ user: req.user.id });
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        message: 'Investor profile not found'
      });
    }
    
    // Check if startup is already bookmarked
    if (investor.bookmarkedStartups.includes(startupId)) {
      return res.status(400).json({
        success: false,
        message: 'Startup already bookmarked'
      });
    }
    
    // Add startup to bookmarks
    investor.bookmarkedStartups.push(startupId);
    await investor.save();
    
    res.status(200).json({
      success: true,
      message: 'Startup bookmarked successfully',
      data: investor.bookmarkedStartups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error bookmarking startup',
      error: error.message
    });
  }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const investor = await Investor.findOne({ user: req.user.id });
    
    if (!investor) {
      return res.status(404).json({
        success: false,
        message: 'Investor profile not found'
      });
    }
    
    // Remove startup from bookmarks
    investor.bookmarkedStartups = investor.bookmarkedStartups.filter(
      id => id.toString() !== startupId
    );
    
    await investor.save();
    
    res.status(200).json({
      success: true,
      message: 'Bookmark removed successfully',
      data: investor.bookmarkedStartups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing bookmark',
      error: error.message
    });
  }
};