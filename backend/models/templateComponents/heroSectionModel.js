const mongoose = require('mongoose');

const HeroSectionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    paragraph: { type: String, required: true },
    image: { type: String, required: true }  // URL or path to the image
});
  

const HeroSection = mongoose.model('HeroSection', HeroSectionSchema);

module.exports = HeroSection;