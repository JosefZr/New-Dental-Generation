import express from'express';
import webpush from 'web-push'
const router = express.Router();

// Replace these with your VAPID keys
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  publicVapidKey,
  privateVapidKey
);

// Store subscriptions (in a real app, you'd use a database)
const subscriptions = new Set();

// Subscribe route
router.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.add(subscription);
  res.status(201).json({});
});

// Notify route
router.post('/api/notify', async (req, res) => {
  const notification = {
    title: req.body.title,
    body: req.body.body,
    icon: req.body.icon
  };

  const errors = [];
  
  // Send notification to all subscribed clients
  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(notification));
    } catch (error) {
      errors.push(error);
      subscriptions.delete(subscription);
    }
  }

  if (errors.length > 0) {
    res.status(500).json({ errors });
  } else {
    res.status(200).json({ message: 'Notifications sent successfully' });
  }
});

module.exports = router;