const jwt = require('jsonwebtoken');

const secret = '!^U*2@%44JwK';

const withAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Unauthorized: Invalid token' });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = { withAuth };
