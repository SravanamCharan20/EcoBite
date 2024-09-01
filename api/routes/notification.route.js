import express from 'express';
import Notification from '../models/notification.model.js';

const router = express.Router();

// Endpoint to create a new notification
router.post('/create', async (req, res) => {
  const { donorId, contactName, contactNumber, message } = req.body;

  try {
    const newNotification = new Notification({
      donorId,
      contactName,
      contactNumber,
      message,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully.' });
  } catch (err) {
    console.error('Error creating notification:', err.message);
    res.status(500).json({ message: 'Failed to create notification.' });
  }
});

router.get('/', async (req, res) => {
    try {
      const notifications = await Notification.find(); 
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
      res.status(500).json({ message: 'Failed to fetch notifications.' });
    }
  });

export default router;