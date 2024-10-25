const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

// Load env vars
dotenv.config();

// Connect to database
require('./config/database');

const app = express();

// Body parser
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});