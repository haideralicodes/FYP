const mongoose = require('mongoose');

const OurStorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true }  // URL or path to the image
});  
  
const OurStory = mongoose.model('OurStory', OurStorySchema);

module.exports = OurStory;
