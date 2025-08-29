const express = require('express');
const router = express.Router();
const startupController = require('../controllers/startup.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', startupController.getStartups);
router.get('/:id', startupController.getStartup);

// Protected routes
router.post('/', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('entrepreneur', 'admin'), 
  startupController.createStartup
);

router.put('/:id', 
  authMiddleware.protect, 
  startupController.updateStartup
);

router.delete('/:id', 
  authMiddleware.protect, 
  startupController.deleteStartup
);

module.exports = router;