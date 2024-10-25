const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

module.exports = mongoose;