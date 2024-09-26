const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  text: { 
    type: String, 
    required: true 
  },
  hashtags: { 
    type: String, 
    required: false 
  },
  imageUrl: { 
    type: String, 
    required: true 
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
