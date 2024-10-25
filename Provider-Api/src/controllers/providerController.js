// src/controllers/providerController.js
const Provider = require('../models/Provider');
const { sendEmail } = require('../services/mailService');
const logger = require('../utils/logger');

exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json({ success: true, data: providers });
  } catch (error) {
    logger.error('Error getting providers:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de la récupération des prestataires' });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const provider = await Provider.create(req.body);
    
    // Envoyer un email de confirmation
    await sendEmail({
      to: provider.email,
      subject: 'Bienvenue sur notre plateforme',
      text: `Bonjour ${provider.name}, votre compte prestataire a été créé avec succès!`
    });

    res.status(201).json({ success: true, data: provider });
  } catch (error) {
    logger.error('Error creating provider:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!provider) {
      return res.status(404).json({ success: false, error: 'Prestataire non trouvé' });
    }

    res.status(200).json({ success: true, data: provider });
  } catch (error) {
    logger.error('Error updating provider:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({ success: false, error: 'Prestataire non trouvé' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    logger.error('Error deleting provider:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// src/controllers/serviceController.js
const Service = require('../models/Service');
const logger = require('../utils/logger');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'name email');
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    logger.error('Error getting services:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de la récupération des services' });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    logger.error('Error creating service:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('provider', 'name email');

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service non trouvé' });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    logger.error('Error updating service:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service non trouvé' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    logger.error('Error deleting service:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};