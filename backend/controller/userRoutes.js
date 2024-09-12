const express = require('express');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// In-memory store for OTPs (for demo purposes)
const otpStore = {};

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied.' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.userId = decoded.id;
    next();
  });
};

// Signup endpoint
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, phone, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found\n")
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Incorrect password")
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Request OTP endpoint
router.post('/request-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
    otpStore[email] = otp; // Save OTP temporarily

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}`
    });
    console.log("OTP sent to email\n")
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.log("OTP sent to email\n")
    res.status(500).json({ message: 'Error sending OTP', error });
  }
});


// Reset password endpoint
router.post('/forget-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    if (otpStore[email] !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email]; // Remove OTP after use
    console.log("Password updated successfully\n")
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log("Error resetting password\n")
    res.status(500).json({ message: 'Error resetting password', error });
  }
});

// Get user info endpoint
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
