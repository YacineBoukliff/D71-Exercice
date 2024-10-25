const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const providerRoutes = require('./routes/providerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

// Load env vars
dotenv.config();

const app = express();

// Connect to database
require('./config/database');

// Body parser
app.use(express.json());

// Mount routes
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Error handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Server Error'
    });
});

// Seulement démarrer le serveur si ce n'est pas un test
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

module.exports = app;