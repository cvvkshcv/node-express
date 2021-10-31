const mongoose = require('mongoose');
const Joi = require('joi');

const User = new mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    maxlength: 500
  }
}));

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().max(500).min(1).required()
  });
  return schema.validate(user);
}

function validateRegister(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(150).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().max(500).min(1).required()
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validateLogin,
  validateRegister
};
