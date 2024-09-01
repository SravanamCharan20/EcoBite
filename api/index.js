import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import Donor from './models/donor.model.js';
import cors from 'cors';
import requestRoutes from './routes/request.route.js'
import notificationRoutes from './routes/notification.route.js';



dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/notifications', notificationRoutes);

// Donor Routes
app.post('/api/donorlist', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: 'Donor information submitted successfully.' });
  } catch (err) {
    console.error('Error submitting donor information:', err.message);
    res.status(400).json({ message: 'Error submitting donor information.' });
  }
});

app.get('/api/donorlist', async (req, res) => {
  try {
    const donors = await Donor.find();
    // console.log(donors)
    res.status(200).json(donors);
  } catch (error) {
    console.error('Error fetching donor list:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// SPA Handling
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });