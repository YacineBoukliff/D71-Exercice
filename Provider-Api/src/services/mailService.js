const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: '"Provider Services API" <notifications@provider-services.com>',
      to,
      subject,
      text
    });
    logger.info('Email sent:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
};