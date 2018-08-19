const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: String,
  media: [{
    type: String,
    required: true
  }],
  created: { 
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post