import express from 'express';
import Donor from '../models/donor.model.js';
import Notification from '../models/notification.model.js';

const router = express.Router();

router.post('/:donorId', async (req, res) => {
  const { donorId } = req.params;
  const { contactName, contactNumber, message } = req.body;

  try {

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const newNotification = new Notification({
      donorId,
      contactName,
      contactNumber,
      message,
    });

    await newNotification.save();

    res.status(200).json({ message: 'Request submitted and notification sent to the donor.' });
  } catch (err) {
    console.error('Error handling request:', err.message);
    res.status(500).json({ message: 'Failed to handle request.' });
  }
});

export default router;