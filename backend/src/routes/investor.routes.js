const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investor.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', investorController.getInvestors);
router.get('/:id', investorController.getInvestor);

// Protected routes
router.get('/profile/me', 
  authMiddleware.protect, 
  investorController.getCurrentInvestorProfile
);

router.post('/profile', 
  authMiddleware.protect, 
  investorController.createUpdateInvestorProfile
);

router.post('/bookmark', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('investor', 'admin'),
  investorController.bookmarkStartup
);

router.delete('/bookmark/:startupId', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('investor', 'admin'),
  investorController.removeBookmark
);

module.exports = router;