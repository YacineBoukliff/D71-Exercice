const Provider = require('../models/Provider');
const logger = require('../utils/logger');

// Get all providers
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json({
            success: true,
            count: providers.length,
            data: providers
        });
    } catch (error) {
        logger.error('Error getting providers:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur'
        });
    }
};

// Create provider
exports.createProvider = async (req, res) => {
    try {
        const provider = await Provider.create(req.body);
        res.status(201).json({
            success: true,
            data: provider
        });
    } catch (error) {
        logger.error('Error creating provider:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update provider
exports.updateProvider = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!provider) {
            return res.status(404).json({
                success: false,
                error: 'Prestataire non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: provider
        });
    } catch (error) {
        logger.error('Error updating provider:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete provider
exports.deleteProvider = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id);

        if (!provider) {
            return res.status(404).json({
                success: false,
                error: 'Prestataire non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        logger.error('Error deleting provider:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};