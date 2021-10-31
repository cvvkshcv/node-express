const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const protectedRouter = require('./routes/protected');
const { jwtDecode } = require('./utils/jwt-verify');

const app = express();

if (process.env.NODE_ENV === "production") {
  require('./prod')(app);
}

mongoose.connect('mongodb+srv://resume-user:iEv9qki77tzhPJBr@cluster0.ikjil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log('Connect to MongoDB...'))
  .catch((e) => console.log(e));

if (!config.get('jwtPrivateKey')) {
  console.error('JWT private error')
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/protected', jwtDecode, protectedRouter);

app.listen(3000, () => {
  console.log('App is running in port 3000');
});
