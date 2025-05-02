const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

// Initialize Express app
const app = express();

// Define port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Vibe API!' });
});

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});