const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@example.com',
    password: 'your-email-password',
  },
});

module.exports = transporter;
