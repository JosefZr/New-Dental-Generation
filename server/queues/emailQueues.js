import Queue from 'bull';
import nodemailer from "nodemailer";

// Initialize Bull queue (Redis is required)
export  const emailQueue = new Queue('email', {
    redis: { host: '127.0.0.1', port: 6379 }
});

// Create transporter once (don't recreate in each route)
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: true
  }
});

// Process emails from the queue
emailQueue.process(async (job) => {
  try {
    const { mailOptions } = job.data;
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', mailOptions.to);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error; // Will trigger automatic retry
  }
});
