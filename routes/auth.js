const express = require('express');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const User = require('../schemas/UserSchema');

router.get('/', (req, res) => {
  res.json({
    message: 'User route'
  })
});


router.post('/register', async (req, res) => {
  const { email, password, name, username } = req.body;
  const encPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    email,
    name,
    username,
    password: encPassword 
  });
  try {
    const result = await user.save();
    res.json({
      message: 'Registred successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      data: error
    });
  }

});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ $or: [ { username: email }, { email } ] });
    
    if (!user) {
      res.status(401).json({
        message: "Email/Password is wrong"
      });
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      const { name, email, _id } = user;
      const token = jsonwebtoken.sign({ name, email, _id }, process.env.SECRET_KEY, { expiresIn: '2d'});
      res.json({
        message: 'Login success',
        user,
        jwt: token
      });
    } else {
      res.status(401).json({
        message: "Email/Password is wrong"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
  
});

module.exports = router;