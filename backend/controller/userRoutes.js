const express = require('express');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const Post = require('../models/savedPostModel');
const ScheduledPost = require('../models/scheduledPost');
const fetch = require('node-fetch');
const cron = require('node-cron'); 
const moment = require('moment');
const axios = require('axios');


require('dotenv').config();

const router = express.Router();

// GoDaddy API credentials
const apiKey = "3mM44UdC76QLvV_FvuuDVqxL46Ax8rbLjEUnT";
const apiSecret = "7Ku8WPC3cLxzTjdkM6pXBa";

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

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '900h' });
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

// Delete post endpoint
router.delete('/posts/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  
  try {
    const post = await Post.findOneAndDelete({ _id: postId, userId: req.userId });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

// Route to save a scheduled post
router.post('/scheduled-posts', async (req, res) => {
  try {
      const newPost = new ScheduledPost(req.body);
      await newPost.save();
      res.status(201).json(newPost);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving scheduled post' });
  }
});

// Route to fetch scheduled posts
router.get('/get-scheduled-posts', async (req, res) => {
  try {
      const posts = await ScheduledPost.find();
      res.status(200).json(posts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching scheduled posts' });
  }
});

// Route to schedule a Facebook post
router.post('/schedule-facebook-post', async (req, res) => {
  const { accessToken, pageId, message, imageUrl, scheduledTime } = req.body;

  if (!accessToken || !pageId || !message || !imageUrl || !scheduledTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Validate scheduledTime format
    const scheduledMoment = moment(scheduledTime);
    if (!scheduledMoment.isValid()) {
      return res.status(400).json({ error: 'Invalid scheduled time format' });
    }

    // Calculate delay in milliseconds
    const delay = scheduledMoment.diff(moment());

    // Ensure the scheduled time is at least 10 minutes in the future
    if (delay < 600000) {
      return res.status(400).json({ error: 'Scheduled time must be at least 10 minutes in the future' });
    }

    // Schedule the task using setTimeout
    setTimeout(async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: imageUrl,
            caption: message,
            access_token: accessToken,
          }),
        });

        const data = await response.json();

        if (data.error) {
          console.error('Error posting to Facebook:', data.error);
        } else {
          console.log('Facebook post scheduled successfully:', data);
        }
      } catch (error) {
        console.error('Error scheduling post to Facebook:', error);
      }
    }, delay); // Schedule the task after the calculated delay

    res.status(200).json({ success: 'Post scheduling initialized' });
  } catch (error) {
    console.error('Error scheduling post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to search for available domains
router.get("/domains/available", async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: "Domain name is required." });
  }

  try {
    const response = await axios.get(
      `https://api.ote-godaddy.com/v1/domains/available?domain=${domain}`,
      {
        headers: {
          Authorization: `sso-key ${apiKey}:${apiSecret}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data)

    res.json(response.data);

    
  } catch (error) {
    console.error("Error fetching domain information:", error.message);
    res.status(500).json({ error: "An error occurred while fetching domain information." });
  }
});

router.post("/domains/purchase", async (req, res) => {
  const { domain, consent, contactAdmin, contactBilling, contactRegistrant, contactTech, nameServers, period, privacy, renewAuto } = req.body;

  try {
    const response = await axios.post(
      "https://api.ote-godaddy.com/v1/domains/purchase",
      {
        domain,
        consent,
        contactAdmin,
        contactBilling,
        contactRegistrant,
        contactTech,
        nameServers,
        period,
        privacy,
        renewAuto,
      },
      {
        headers: {
          Authorization: `sso-key ${apiKey}:${apiSecret}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Domain purchased successfully!", data: response.data });
  } catch (error) {
    console.error("Error purchasing domain:", error);
    res.status(500).json({ error: "Failed to purchase domain." });
  }
});

router.post('/business-details', async (req, res) => {

  const { businessName, businessStory, businessLocation } = req.body;

  console.log("Received data:", { businessName, businessStory, businessLocation });

  try {
    const newBusiness = new businessDetails({
      businessName,
      businessStory,
      businessLocation,
    });
    await newBusiness.save();

    res.status(201).json({ message: "Business Details saved successfully." });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/user', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Ensure all fields are provided
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findByIdAndUpdate(req.userId, {
      firstName,
      lastName,
      email,
      phone,
      password, 
    }, { new: true }); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
