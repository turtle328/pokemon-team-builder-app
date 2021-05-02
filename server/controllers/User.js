const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = '!^U*2@%44JwK';

const registerUser = (req, res) => {
  const { username, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(401).json({ message: 'Passwords do not match' });
  }
  const user = new User({ username, password });
  user.save(err => {
    if (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'User is already in use.' });
      }
      return res
        .status(500)
        .json({ message: `An error occurred when trying to create the account.` });
    } else {
      res.status(200).json({ message: `Successfully registered!` });
    }
  });
};

const tryServeToken = (userDoc, username, password, res) => {
  userDoc.isCorrectPassword(password, (err, same) => {
    if (err) {
      res.status(500).json({ message: 'Internal error please try again' });
    } else if (!same) {
      res.status(401).json({ message: 'Incorrect email or password' });
    } else {
      const payload = { username };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }
  });
};

const authenticate = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal error please try again' });
    } else if (!user) {
      res.status(401).json({ message: 'Incorrect email or password' });
    } else {
      tryServeToken(user, username, password, res);
    }
  });
};

module.exports = {
  registerUser,
  authenticate,
};
