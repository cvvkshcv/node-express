const jwt = require('jsonwebtoken');
const config = require('config');

const jwtDecode = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.decode(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid token');
  }
};

const jwtEncode = function(user) {
  return jwt.sign(user, config.get('jwtPrivateKey'));
};

module.exports = {
  jwtEncode,
  jwtDecode
};
