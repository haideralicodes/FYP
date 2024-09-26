const express = require('express');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const Post = require('../models/savedPostModel');

require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
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
  console.log('\n Password at Signup:', password);

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('\n Hashed Password at Signup:', hashedPassword);

    const user = new User({ firstName, lastName, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
    console.log('\n Saved Password in DB is:', password);
    console.log('\n Saved Hashed Password in DB is:', hashedPassword);

  } 
  catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }

});

// Login endpoint
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    console.log("\n", email, " found!!! \n")

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('\n Password entered while Logging in:', password);
    console.log('\n Hashed password Stored in DB:', user.password);

    const match = await bcrypt.compare(password, user.password);

    console.log("\n", password, " and ", user.password, " matched ;-)");

    if (!match) {
      console.log('\n Password does not match :/');
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '100h' });
    return res.json({ token, userId: user._id });

  } 
  catch (error) {
    console.error('\n Server error......... ', error);
    return res.status(500).json({ message: 'Server error' });
  }

});

// Request OTP
router.post('/requestOtp', async (req, res) => {

  console.log("\n 1- Entered requestOtp endpoint");
  const { email } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      console.log("\n 1.5- User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("\n 2- User found");

    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
    otpStore[email] = otp;

    console.log("\n 3- The OTP is: ", otp);

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}`
    });

    res.status(200).json({ message: 'OTP sent to email' });

  } 
  catch (error) {
    console.log("\n 5-", error, "\n");
    res.status(500).json({ message: 'Error sending OTP', error });
  }
});


// Verify OTP endpoint
router.post('/verify-otp', (req, res) => {

  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    
    delete otpStore[email]; 
    console.log("\n 6- OTP Matched :).", "\n");
    res.status(200).json({ message: 'OTP verified successfully' });

  } 
  else {
    console.log("\n 5.5- OTP Doesn't Matched :(", "\n");
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body; 

  console.log("\n 7- Updated password entered by user is: ", newPassword)

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    console.log("\n 8- Updated Hashed Password: ", hashedPassword)

    // Update password in DB
    const user = await User.findOneAndUpdate(
      { email }, 
      { password: hashedPassword }, // Update password
      { new: true }
    );

    console.log("\n ******____ User's Password Updated ____******");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error });
  }
});


// Save post endpoint
router.post('/posts/save', verifyToken, async (req, res) => {
  const { text, hashtags, imageUrl } = req.body;
  const userId = req.userId; 

  try {
    const newPost = new Post({ userId, text, hashtags, imageUrl });
    await newPost.save();
    res.status(201).json({ message: 'Post saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving post', error });
  }
});

// Get saved posts endpoint
router.get('/posts/saved', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved posts', error });
  }
});


// Get user info endpoint
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});


module.exports = router;
