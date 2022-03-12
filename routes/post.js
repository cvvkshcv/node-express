const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  res.json({ message: 'Post get working'});
});


router.post('/', async (req, res) => {
  res.json({ message: 'Post get working'});
});


router.put('/', async (req, res) => {
  res.json({ message: 'Post get working'});
});


router.delete('/', async (req, res) => {
  res.json({ message: 'Post get working'});
});

module.exports = router;
