const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let employees = [
    { id: 1, name : 'Abc', designation: 'Software developer'},
    { id: 2, name : 'DEF', designation: 'Software developer II'},
    { id: 3, name : 'Ghi', designation: 'Software developer'},
  ];
  if (id) {
    employees = employees.filter(emp => emp.id === id);
  }
  res.json({ employees })
});


router.get('/employees/:id?', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let employees = [
    { id: 1, name : 'Abc', designation: 'Software developer'},
    { id: 2, name : 'DEF', designation: 'Software developer II'},
    { id: 3, name : 'Ghi', designation: 'Software developer'},
  ];
  if (id) {
    employees = employees.filter(emp => emp.id === id);
  }
  res.json({ employees })
});


module.exports = router;