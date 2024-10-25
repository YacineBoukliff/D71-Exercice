const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_PORT === '465',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

// Vérifier la configuration email au démarrage
transporter.verify((error, success) => {
  if (error) {
    logger.error('Email configuration error:', error);
  } else {
    logger.info('Email server is ready to send messages');
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_FROM,
      to,
      subject,
      text,
      html
    });
    
    logger.info('Email sent:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Email sending error:', error);
    throw error;
  }
};

const emailTemplates = {
  newProvider: (provider) => ({
    subject: 'Bienvenue sur notre plateforme !',
    text: `Bonjour ${provider.name},\n\nBienvenue sur notre plateforme de gestion de prestataires.`,
    html: `
      <h1>Bienvenue ${provider.name} !</h1>
      <p>Votre compte prestataire a été créé avec succès.</p>
    `
  }),
  
  updateProvider: (provider) => ({
    subject: 'Mise à jour de votre compte',
    text: `Bonjour ${provider.name},\n\nVotre compte a été mis à jour avec succès.`,
    html: `
      <h1>Compte mis à jour</h1>
      <p>Bonjour ${provider.name},</p>
      <p>Vos informations ont été mises à jour avec succès.</p>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
};