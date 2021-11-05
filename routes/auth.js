const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const pick = require('lodash.pick');
const jwt = require('jsonwebtoken');
const { jwtEncode, jwtDecode } =  require('../utils/jwt-verify');
const { User, validateLogin, validateRegister } = require('../models/user');

// Get self data
router.post('/me', jwtDecode, async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user).select('-password -__v');
  console.log(user);
  res.json(user);
});

// Login authentication
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('User is not registered');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    user = pick(user, ['_id', 'name', 'email']);
    const token = jwtEncode(user);
    return res.json({...user, token });
  } catch (_err) {
    return res.status(400).send(_err);
  }
});

// Register new user
router.post('/register', async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPwd
  });
  try {
    await user.save();
    const token = jwtEncode(pick(user, ['_id', 'name', 'email']));
    return res.header('x-auth-token', token).send('Registered successfully');
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;