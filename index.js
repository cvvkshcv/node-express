const express = require('express');
const cors = require('cors')
const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');
const app = express();
const PORT = 4444;
const pool = require('./db-connection');

app.use(cors());

app.get('/', async (req, res) => {
  // const data = await pool.query('CREATE TABLE todo (tid SERIAL PRIMARY KEY, description VARCHAR(255))');
  // console.log(data);
  // res.json({ msg: 'success'})
});
app.use('/user', userRoute);
app.use('/todo', todoRoute);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
