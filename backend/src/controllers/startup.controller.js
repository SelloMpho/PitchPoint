const Startup = require('../models/startup.model');

// Create a new startup
exports.createStartup = async (req, res) => {
  try {
    // Add owner from authenticated user
    req.body.owner = req.user.id;
    
    const startup = await Startup.create(req.body);
    
    res.status(201).json({
      success: true,
      data: startup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating startup',
      error: error.message
    });
  }
};

// Get all startups with filtering
exports.getStartups = async (req, res) => {
  try {
    // Build query
    let query = {};
    
    // Filter by industry
    if (req.query.industry) {
      query.industry = { $in: req.query.industry.split(',') };
    }
    
    // Filter by location
    if (req.query.location) {
      query.location = req.query.location;
    }
    
    // Filter by funding stage
    if (req.query.fundingStage) {
      query.fundingStage = req.query.fundingStage;
    }
    
    // Filter by verified status
    if (req.query.isVerified) {
      query.isVerified = req.query.isVerified === 'true';
    }
    
    // Filter by featured status
    if (req.query.isFeatured) {
      query.isFeatured = req.query.isFeatured === 'true';
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Execute query
    const startups = await Startup.find(query)
      .skip(skip)
      .limit(limit)
      .populate('owner', 'firstName lastName email');
    
    // Get total count
    const total = await Startup.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: startups.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: startups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting startups',
      error: error.message
    });
  }
};

// Get single startup
exports.getStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate('owner', 'firstName lastName email');
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }
    
    // Increment view count
    startup.analytics.views += 1;
    await startup.save();
    
    res.status(200).json({
      success: true,
      data: startup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting startup',
      error: error.message
    });
  }
};

// Update startup
exports.updateStartup = async (req, res) => {
  try {
    let startup = await Startup.findById(req.params.id);
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }
    
    // Check if user is owner or admin
    if (startup.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this startup'
      });
    }
    
    startup = await Startup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: startup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating startup',
      error: error.message
    });
  }
};

// Delete startup
exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    
    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }
    
    // Check if user is owner or admin
    if (startup.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this startup'
      });
    }
    
    await startup.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting startup',
      error: error.message
    });
  }
};