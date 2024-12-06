const mongoose = require('mongoose');

const schedulePostSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  hashtags: { 
    type: [String], 
    required: false 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  scheduledTime: {
    type: Date, // both date & time
    required: true 
  }
});

const scheduledPost = mongoose.model('scheduledPost', schedulePostSchema);
module.exports = scheduledPost;
