/* eslint-disable @typescript-eslint/no-require-imports */
const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailOptions = (email: string, link: string) => ({
  from: '"Your App" <no-reply@yourapp.com>',
  to: email,
  subject: 'Your Magic Sign-In Link ✨',
  html: `
    <h2>Hey there 👋</h2>
    <p>Click the link below to sign in:</p>
    <a href="${link}">${link}</a>
    <p>This link will expire in 15 minutes.</p>
  `,
});
