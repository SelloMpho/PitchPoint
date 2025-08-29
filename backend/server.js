require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pitchpoint';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PitchPoint API' });
});

// Import and use route files
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/startups', require('./src/routes/startup.routes'));
app.use('/api/investors', require('./src/routes/investor.routes'));
app.use('/api/messages', require('./src/routes/message.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});