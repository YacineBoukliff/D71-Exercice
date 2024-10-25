const Service = require('../models/Service');
const logger = require('../utils/logger');
const cacheService = require('../services/cacheService');

// Initialiser le cache au démarrage
cacheService.connect().catch(console.error);

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const cacheKey = 'all_services';
        const cachedServices = await cacheService.get(cacheKey);

        if (cachedServices) {
            logger.info('Returning services from cache');
            return res.status(200).json({
                success: true,
                fromCache: true,
                data: cachedServices
            });
        }

        const services = await Service.find().populate('provider', 'name email');
        await cacheService.set(cacheKey, services, 3600);

        res.status(200).json({
            success: true,
            fromCache: false,
            data: services
        });
    } catch (error) {
        logger.error('Error getting services:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Create service
exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        await cacheService.del('all_services');
        
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        logger.error('Error creating service:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update service
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('provider', 'name email');

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service non trouvé'
            });
        }

        await cacheService.del('all_services');

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        logger.error('Error updating service:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service non trouvé'
            });
        }

        await cacheService.del('all_services');

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        logger.error('Error deleting service:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};