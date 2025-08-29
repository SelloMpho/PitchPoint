const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes are protected
router.use(authMiddleware.protect);

// Send a message
router.post('/', messageController.sendMessage);

// Get all conversations
router.get('/conversations', messageController.getConversations);

// Get conversation with specific user
router.get('/conversations/:userId', messageController.getConversation);

// Mark messages as read
router.put('/read/:userId', messageController.markAsRead);

// Flag a message
router.put('/flag/:messageId', messageController.flagMessage);

module.exports = router;