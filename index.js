const express = require('express');
const cors = require('cors')
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());

const PORT = 4444;

// Database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch((e) => console.log(e));

const authMiddleware = require('./utils/authMiddleware');

// Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');


app.use('/auth', authRoute);
app.use('/post', authMiddleware, postRoute);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
