const Provider = require('../models/provider.model');
const { sendEmail, emailTemplates } = require('../config/mailer');
const logger = require('../utils/logger');

// Récupérer tous les prestataires
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ active: true });
    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers
    });
  } catch (error) {
    logger.error('Get all providers error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des prestataires'
    });
  }
};

// Créer un nouveau prestataire
exports.createProvider = async (req, res) => {
  try {
    const provider = new Provider(req.body);
    const newProvider = await provider.save();

    // Envoi email de bienvenue
    try {
      await sendEmail({
        to: newProvider.email,
        ...emailTemplates.newProvider(newProvider)
      });
    } catch (emailError) {
      logger.error('Welcome email error:', emailError);
    }

    res.status(201).json({
      success: true,
      data: newProvider
    });
  } catch (error) {
    logger.error('Create provider error:', error);
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création du prestataire',
      error: error.message
    });
  }
};

// Modifier un prestataire
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
        message: 'Prestataire non trouvé'
      });
    }

    // Envoi email de mise à jour
    try {
      await sendEmail({
        to: provider.email,
        ...emailTemplates.updateProvider(provider)
      });
    } catch (emailError) {
      logger.error('Update email error:', emailError);
    }

    res.status(200).json({
      success: true,
      data: provider
    });
  } catch (error) {
    logger.error('Update provider error:', error);
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour du prestataire',
      error: error.message
    });
  }
};

// Supprimer un prestataire
exports.deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Prestataire non trouvé'
      });
    }

    // Soft delete
    provider.active = false;
    await provider.save();

    res.status(200).json({
      success: true,
      message: 'Prestataire supprimé avec succès'
    });
  } catch (error) {
    logger.error('Delete provider error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du prestataire'
    });
  }
};