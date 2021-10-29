const express = require('express');
const pool = require('../db-connection');
const router = express.Router();

router.post('/login', async (req, res) => {
  const result = await pool.query('SELECT * FROM todo');
  res.json({
    result
  })
});

router.post('/register', (req, res) => {
  // const { username, password } = req.body;
  console.log(req.body);
  // console.log(password);
  // pool.query('INSERT INTO users (USERNAME, PASSWORD) VALUES (?, ?)', [

  // ])
  res.json({ body: req.body });
});

module.exports = router;