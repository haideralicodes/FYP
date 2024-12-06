const express = require('express');
const Navbar = require('../models/templateComponents/navbarModel'); 

const router = express.Router();

// Endpoint to get navbar data
router.get('/navbar', async (req, res) => {
  try {
    const navbarData = await Navbar.findOne(); 
    if (!navbarData) {
      return res.status(404).json({ message: 'Navbar data not found' });
    }
    res.json(navbarData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
