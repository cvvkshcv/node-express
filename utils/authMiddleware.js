const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.header('Authorization') || '' ;
  const decoded = jwt.decode(token, secretKey);
  if (!decoded) {
    return res.status(401).json({
      message: "Invalid JSON web token"
    });
  }
  req.user = decoded;
  next();
};
