const mongoose = require('mongoose');

const User  = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', User);