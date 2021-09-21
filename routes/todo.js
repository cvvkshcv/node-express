const express = require('express');
const pool = require('../db-connection');
const router = express.Router();

router.get('/all', async (req, res) => {
  const result = await pool.query('SELECT * FROM todo');
  res.json({
    result
  })
});

router.get('/', (req, res) => {

});


router.get('/', (req, res) => {

});


router.get('/', (req, res) => {

});


router.get('/', (req, res) => {

});

module.exports = router;