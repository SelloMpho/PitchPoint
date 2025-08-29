const Message = require('../models/message.model');
const User = require('../models/user.model');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { recipient, content, startup, attachments } = req.body;
    
    // Check if recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }
    
    // Create message
    const message = await Message.create({
      sender: req.user.id,
      recipient,
      content,
      startup,
      attachments: attachments || []
    });
    
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Get conversation between two users
exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get messages between current user and specified user
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: userId },
        { sender: userId, recipient: req.user.id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'firstName lastName profilePicture')
    .populate('recipient', 'firstName lastName profilePicture');
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting conversation',
      error: error.message
    });
  }
};

// Get all conversations for current user
exports.getConversations = async (req, res) => {
  try {
    // Get all unique users the current user has messaged with
    const sentMessages = await Message.find({ sender: req.user.id })
      .distinct('recipient');
      
    const receivedMessages = await Message.find({ recipient: req.user.id })
      .distinct('sender');
      
    // Combine and remove duplicates
    const conversationUserIds = [...new Set([...sentMessages, ...receivedMessages])];
    
    // Get the latest message for each conversation
    const conversations = [];
    
    for (const userId of conversationUserIds) {
      const latestMessage = await Message.findOne({
        $or: [
          { sender: req.user.id, recipient: userId },
          { sender: userId, recipient: req.user.id }
        ]
      })
      .sort({ createdAt: -1 })
      .populate('sender', 'firstName lastName profilePicture')
      .populate('recipient', 'firstName lastName profilePicture');
      
      if (latestMessage) {
        // Get unread count
        const unreadCount = await Message.countDocuments({
          sender: userId,
          recipient: req.user.id,
          isRead: false
        });
        
        conversations.push({
          user: userId,
          latestMessage,
          unreadCount
        });
      }
    }
    
    // Sort by latest message date
    conversations.sort((a, b) => 
      b.latestMessage.createdAt - a.latestMessage.createdAt
    );
    
    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting conversations',
      error: error.message
    });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Update all unread messages from specified user to current user
    await Message.updateMany(
      { sender: userId, recipient: req.user.id, isRead: false },
      { isRead: true, readAt: Date.now() }
    );
    
    res.status(200).json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking messages as read',
      error: error.message
    });
  }
};

// Flag a message
exports.flagMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { flagReason } = req.body;
    
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    // Check if user is part of the conversation
    if (message.sender.toString() !== req.user.id && 
        message.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to flag this message'
      });
    }
    
    // Update message
    message.isFlagged = true;
    message.flagReason = flagReason || 'Inappropriate content';
    await message.save();
    
    res.status(200).json({
      success: true,
      message: 'Message flagged successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error flagging message',
      error: error.message
    });
  }
};