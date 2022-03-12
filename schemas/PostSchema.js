const mongoose = require('mongoose');

const Comments = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  postedAt: {
    type: Date,
    default: Date.now
  }
});

const Post  = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true 
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  comments: [Comments]
});

module.exports = mongoose.model('Post', Post);