const express = require('express');
const cors = require('cors')
const userRoute = require('./routes/user');
const app = express();
const PORT = 4444;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Post method'});
});
app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
