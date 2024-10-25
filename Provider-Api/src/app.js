const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const providerRoutes = require('./routes/providerRoutes');

// Load env vars
dotenv.config();

const app = express();

// Connect to database
require('./config/database');

// Body parser
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Mount routes
app.use('/api/providers', providerRoutes);

// Handle basic errors
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;