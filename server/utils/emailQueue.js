import { Queue } from 'bull';
import nodemailer from 'nodemailer';

// Create a queue
const emailQueue = new Queue('email queue', {
  redis: { host: '127.0.0.1', port: 6379 } // Update with your Redis config
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Process jobs
emailQueue.process(async (job) => {
  const { to, firstName, type } = job.data;
  
  const mailOptions = {
    from: 'dr.truth@buildydn.com',
    to,
    subject: "Here's Your Secret Weapon 🦷",
    html: `
      <p>Hi ${firstName},</p>
      
      <p>Your Dentist's Secret Weapon is ready!</p>
      
      <p>
        <a href="https://drive.google.com/uc?export=download&id=1q9FCxsqiJ3LQtYdTBl1Sm4eP-59enVlY">
          Click here to access the guide.
        </a>
      </p>
      
      <p>Take your first step toward a smarter, more profitable practice.</p>
      
      <p>To your success,<br>
      Dr. Truth<br>
      Your Dental Network</p>
      
      <p><small>P.S. Want to see how we can help you implement these strategies? Join YDN and see yourself.</small></p>
    `
  };

  await transporter.sendMail(mailOptions);
});

export default emailQueue;