const User = require('../models/User');
const { genPassword } = require('../lib/passwordUtils');

const registerUser = (req, res) => {
  const { username, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const saltHash = genPassword(password);

  const { salt, hash } = saltHash;

  const newUser = new User({
    username,
    hash,
    salt,
  });

  return newUser
    .save()
    .then((user) => {
      console.log(user);
      return res.status(200).json({ message: 'Registration successful!' });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'That user already exists.' });
      }
      return res.status(400).json({ message: 'An error occurred. Please try again later.' });
    });
};

const login = (req, res) => res.status(200).json({ message: 'Login successful!' });

const logout = (req, res) => {
  req.logout();
  // returns you to the home page
  return res.redirect('/');
};

const getUsername = (req, res) => {
  const username = req?.user?.username;
  if (username) {
    return res.status(200).json({ username });
  }
  return res.status(200).json({ username: '' });
};

module.exports = {
  registerUser,
  login,
  logout,
  getUsername,
};
