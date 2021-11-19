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

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/uigems')
  .then(() => console.log('Connect to MongoDB...'))
  .catch((e) => console.log(e));

if (!config.get('jwtPrivateKey')) {
  console.error('JWT private error')
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Working in heroku!'));

app.use('/auth', authRouter);
app.use('/protected', jwtDecode, protectedRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running in port ${PORT}`);
});
