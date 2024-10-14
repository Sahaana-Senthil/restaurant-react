const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey'; // For JWT Token generation

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Enable Mongoose debugging (optional, for development)
mongoose.set('debug', true);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Model for Registration
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Table Reservation Model
const ReservationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  purpose: { type: String, required: true },
  persons: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

// Routes
// Sign Up (Registration)
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Incoming registration data:", req.body); // Log incoming data

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
});

// Table Reservation
app.post('/api/reserve', async (req, res) => {
  const { username, email, phone, date, purpose, persons } = req.body;
  console.log("Incoming reservation data:", req.body); // Log incoming data

  try {
    // Validate required fields
    if (!username || !email || !phone || !date || !purpose || !persons) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate date field is a valid date
    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Save reservation data
    const newReservation = new Reservation({ username, email, phone, date, purpose, persons });
    await newReservation.save();

    res.status(201).json({ message: 'Table reserved successfully' });
  } catch (error) {
    console.error('Error during reservation:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
});

// Global error handler (optional, for better error management)
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
