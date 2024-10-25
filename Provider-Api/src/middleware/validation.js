const { body, validationResult } = require('express-validator');

exports.validateProvider = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').trim().isEmail().withMessage('Email invalide'),
  body('phone').optional().trim(),
  body('address').optional().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

exports.validateService = [
  body('name').trim().notEmpty().withMessage('Le nom du service est requis'),
  body('description').optional().trim(),
  body('price').isNumeric().withMessage('Le prix doit être un nombre'),
  body('provider').notEmpty().withMessage('L\'ID du prestataire est requis'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];