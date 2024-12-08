const express = require('express');
const HeroSection = require('../models/templateComponents/heroSectionModel'); // Ensure the model name is capitalized

const router = express.Router();

// Endpoint to fetch the HeroSection data
router.get('/heroSection', async (req, res) => {
  console.log("Get Request");
  try {
    const heroSection = await HeroSection.findOne(); 
    if (heroSection) {
      console.log("Data Found");
      return res.json(heroSection);
    } else {
      // If no hero section exists, create a new default one
      const defaultHeroSection = new HeroSection({
        heading: 'Discover Our Style', // Default heading
        paragraph: 'Fashion for All Ages', // Default paragraph
        image: '', // Default image placeholder
      });
      await defaultHeroSection.save();
      return res.json(defaultHeroSection);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Endpoint to update HeroSection data in DB
router.put('/heroSection', async (req, res) => {
  console.log("Put Request");
  const { heading, paragraph, image } = req.body;

  try {
    let heroSection = await HeroSection.findOne();
    if (!heroSection) {
      // If no record exists, create a new one
      heroSection = new HeroSection({ heading, paragraph, image });
    } else {
      // Update existing hero section data
      heroSection.heading = heading;
      heroSection.paragraph = paragraph;
      heroSection.image = image;
    }
    await heroSection.save();
    return res.json(heroSection);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
